"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ClubTag, ResourceTag, ClubTagCategory, ResourceTagCategory, Club, Resource } from "../../../../../payload-types";

interface DirectoryLayoutProps {
    children: React.ReactNode;
}

interface TagsByCategory {
    [category: string]: {
        id: number;
        name: string;
        tags: Array<ClubTag | ResourceTag>;
    };
}

interface DirectoryContextType {
    filteredItems: Array<Club | Resource>;
    isLoading: boolean;
}

const DirectoryContext = createContext<DirectoryContextType>({
    filteredItems: [],
    isLoading: true,
});

export const useDirectory = () => useContext(DirectoryContext);

export default function DirectoryLayout({ children }: DirectoryLayoutProps) {
    const pathname = usePathname();
    const isClubDirectory = pathname?.includes("/clubs");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
    const [tagsByCategory, setTagsByCategory] = useState<TagsByCategory>({});
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState<Array<Club | Resource>>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // fetch items (clubs or resources)
                const itemsRes = await fetch(`/api/${isClubDirectory ? "clubs" : "resources"}`);
                if (!itemsRes.ok) {
                    throw new Error(`Failed to fetch items: ${itemsRes.status}`);
                }
                const itemsData = await itemsRes.json();
                setItems(itemsData.docs || []);

                // fetch tags and categories
                const [tagsRes, categoriesRes] = await Promise.all([fetch(`/api/${isClubDirectory ? "club-tags" : "resource-tags"}`), fetch(`/api/${isClubDirectory ? "club-tag-categories" : "resource-tag-categories"}`)]);

                if (!tagsRes.ok || !categoriesRes.ok) {
                    throw new Error("Failed to fetch tags or categories");
                }

                const [tagsData, categoriesData] = await Promise.all([tagsRes.json(), categoriesRes.json()]);

                const tagsByCat: TagsByCategory = {};

                // process categories
                if (categoriesData?.docs) {
                    categoriesData.docs.forEach((category: ClubTagCategory | ResourceTagCategory) => {
                        tagsByCat[category.name] = {
                            id: category.id,
                            name: category.name,
                            tags: [],
                        };
                    });
                }

                // process tags
                if (tagsData?.docs) {
                    tagsData.docs.forEach((tag: ClubTag | ResourceTag) => {
                        if (tag.category && typeof tag.category !== "number") {
                            const categoryName = tag.category.name;
                            if (tagsByCat[categoryName]) {
                                tagsByCat[categoryName].tags.push(tag);
                            }
                        }
                    });
                }

                setTagsByCategory(tagsByCat);
            } catch (error) {
                console.error("Error fetching data:", error);
                setItems([]);
                setTagsByCategory({});
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        // reset filters when switching between clubs and resources
        setActiveFilters(new Set());
        setSearchQuery("");
    }, [isClubDirectory]);

    const handleFilterChange = (tagId: string) => {
        setActiveFilters((prev) => {
            const newFilters = new Set(prev);
            if (newFilters.has(tagId)) {
                newFilters.delete(tagId);
            } else {
                newFilters.add(tagId);
            }
            return newFilters;
        });
    };

    const filteredItems = (items || []).filter((item) => {
        // search filter
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                item.title.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower) ||
                (Array.isArray(item.tags) &&
                    item.tags.some((tag) => {
                        if (typeof tag === "number") return false;
                        return tag.name.toLowerCase().includes(searchLower);
                    }));

            if (!matchesSearch) return false;
        }

        // tag filters
        if (activeFilters.size > 0) {
            const itemTagIds = Array.isArray(item.tags)
                ? item.tags.map((tag) => {
                      if (typeof tag === "number") return String(tag);
                      return String(tag.id);
                  })
                : [];
            const hasMatchingTag = Array.from(activeFilters).some((filterId) => itemTagIds.includes(filterId));
            if (!hasMatchingTag) return false;
        }

        return true;
    });

    const renderFilters = () => (
        <div className="space-y-6">
            {/* Tag Filters */}
            {Object.entries(tagsByCategory).map(([categoryName, { tags }]) => (
                <div key={categoryName} className="filter-section">
                    <h3 className="mb-4 text-lg font-semibold text-cText">{categoryName}</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <label key={tag.id} className={`inline-flex cursor-pointer items-center rounded-full px-3 py-1 text-sm transition-colors ${activeFilters.has(tag.id.toString()) ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"}`}>
                                <input type="checkbox" className="form-checkbox hidden" onChange={() => handleFilterChange(tag.id.toString())} checked={activeFilters.has(tag.id.toString())} />
                                <span>{tag.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <DirectoryContext.Provider value={{ filteredItems, isLoading }}>
            <div className="min-h-screen bg-cBackground">
                <div className="mx-auto max-w-7xl px-6 py-8 sm:px-12 lg:px-20">
                    <header className="mb-12 mt-8 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-cText">{isClubDirectory ? "Clubs Directory" : "Resources Directory"}</h1>
                        <p className="text-xl text-cTextOffset">{isClubDirectory ? "Browse and filter through all available clubs." : "Browse and filter through all available resources."}</p>
                    </header>

                    {/* Search - Always at top */}
                    <div className="relative mb-8">
                        <input type="text" className="w-full rounded-lg border border-cBorder bg-cBackgroundOffset p-4 pl-12 text-cText placeholder-cTextOffset transition-colors duration-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none dark:hover:border-blue-500 dark:focus:border-blue-400" placeholder={isClubDirectory ? "Search clubs..." : "Search resources..."} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cTextOffset" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Responsive Layout */}
                    <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:gap-8">
                        {/* Filters - Sidebar on large screens, collapsible on small screens */}
                        <div className="mb-8 lg:mb-0">
                            {/* Mobile Filter Toggle */}
                            <button className="mb-4 flex w-full items-center justify-between rounded-lg border border-cBorder bg-cBackgroundOffset p-4 text-left transition-colors duration-200 hover:bg-cBackground lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-2xl font-semibold text-cText">Filters</h2>
                                    <span className="text-sm text-cTextOffset">{activeFilters.size > 0 ? `(${activeFilters.size} active)` : ""}</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform text-cText transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* Filters Content */}
                            <div className={`rounded-lg border border-cBorder bg-cBackgroundOffset p-6 lg:block ${showFilters ? "block" : "hidden"}`}>{renderFilters()}</div>
                        </div>

                        {/* Main Content */}
                        <main>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
                                {isLoading ? (
                                    <div className="col-span-full text-center text-cTextOffset">Loading...</div>
                                ) : filteredItems.length > 0 ? (
                                    children
                                ) : (
                                    <div className="col-span-full text-center text-cTextOffset">
                                        <p className="text-lg">No {isClubDirectory ? "clubs" : "resources"} found matching your criteria.</p>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </DirectoryContext.Provider>
    );
}
