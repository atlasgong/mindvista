"use client";

import React, { createContext, useContext, useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { ClubTag, ResourceTag, ClubTagCategory, ResourceTagCategory, Club, Resource } from "../../../../../payload-types";
import { fetchDirectoryData } from "./actions";
import { DirectoryItemBoxSkeleton } from "./components/skeletons/DirectoryItemBoxSkeleton";
import { FiltersSkeleton } from "./components/skeletons/FiltersSkeleton";
import { Filters } from "./components/Filters";
import { FaSearch } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

interface DirectoryContextType {
    filteredItems: Array<Club | Resource>;
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

interface TagsByCategory {
    [category: string]: {
        id: number;
        name: string;
        tags: Array<ClubTag | ResourceTag>;
    };
}

const DirectoryContext = createContext<DirectoryContextType>({
    filteredItems: [],
    isLoading: true,
    currentPage: 1,
    totalPages: 1,
    setCurrentPage: () => {},
});

export const useDirectory = () => useContext(DirectoryContext);

interface DirectoryProviderProps {
    children: React.ReactNode;
}

// TODO: use nextjs' native search params to handle filters (and search query?)
// https://nextjs.org/docs/app/api-reference/functions/use-search-params
export function DirectoryProvider({ children }: DirectoryProviderProps) {
    const pathname = usePathname();
    const isClubDirectory = pathname?.includes("/clubs");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
    const [tagsByCategory, setTagsByCategory] = useState<TagsByCategory>({});
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState<Array<Club | Resource>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = isClubDirectory ? 10 : 12;

    // fetch data on mount and directory type change
    useEffect(() => {
        setIsLoading(true);
        // reset filters when switching between clubs and resources
        setActiveFilters(new Set());
        setSearchQuery("");

        // use promise to handle async data fetching
        fetchDirectoryData(isClubDirectory)
            .then((data) => {
                setItems(data.items);

                const tagsByCat: TagsByCategory = {};

                // process categories
                if (data.categories) {
                    data.categories.forEach((category: ClubTagCategory | ResourceTagCategory) => {
                        tagsByCat[category.name] = {
                            id: category.id,
                            name: category.name,
                            tags: [],
                        };
                    });
                }

                // add virtual Location category for resources
                if (!isClubDirectory) {
                    const virtualCategory: ResourceTagCategory = {
                        id: -1, // use a unique negative ID to avoid conflicts
                        name: "Location",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };

                    tagsByCat["Location"] = {
                        id: -1,
                        name: "Location",
                        tags: [
                            {
                                id: -2, // use a unique negative ID to avoid conflicts
                                name: "On Campus",
                                category: virtualCategory,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                            } as ResourceTag,
                        ],
                    };
                }

                // process tags
                if (data.tags) {
                    data.tags.forEach((tag: ClubTag | ResourceTag) => {
                        if (tag.category && typeof tag.category !== "number") {
                            const categoryName = tag.category.name;
                            if (tagsByCat[categoryName]) {
                                tagsByCat[categoryName].tags.push(tag);
                            }
                        }
                    });
                }

                setTagsByCategory(tagsByCat);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setItems([]);
                setTagsByCategory({});
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                    item.tags.some((tag: ClubTag | ResourceTag | number) => {
                        if (typeof tag === "number") return false;
                        return tag.name.toLowerCase().includes(searchLower);
                    }));

            if (!matchesSearch) return false;
        }

        // tag filters
        if (activeFilters.size > 0) {
            const itemTagIds = Array.isArray(item.tags)
                ? item.tags.map((tag: ClubTag | ResourceTag | number) => {
                      if (typeof tag === "number") return String(tag);
                      return String(tag.id);
                  })
                : [];

            // check each active filter
            const hasAllSelectedTags = Array.from(activeFilters).every((filterId) => {
                // special handling for onCampus virtual tag
                if (filterId === "-2") {
                    return (item as Resource).onCampus === true;
                }
                return itemTagIds.includes(filterId);
            });

            if (!hasAllSelectedTags) return false;
        }

        return true;
    });

    // reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeFilters]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const renderPageButton = (page: number) => (
            <button key={page} onClick={() => handlePageChange(page)} className={`min-w-[2.5rem] rounded-lg px-3 py-2 ${currentPage === page ? "bg-indigo-600 text-white dark:bg-indigo-500" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"}`}>
                {page}
            </button>
        );

        const renderEllipsis = (key: string) => (
            <span key={key} className="px-2 text-gray-400">
                ...
            </span>
        );

        const getVisiblePages = () => {
            const delta = 1; // num of pages to show before and after current page
            const pages: (number | string)[] = [];

            // always include first page
            pages.push(1);

            // calculate range around current page
            const rangeStart = Math.max(2, currentPage - delta);
            const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

            // add ellipsis after first page if needed
            if (rangeStart > 2) {
                pages.push("ellipsis1");
            }

            // add pages around current page
            for (let i = rangeStart; i <= rangeEnd; i++) {
                pages.push(i);
            }

            // add ellipsis before last page if needed
            if (rangeEnd < totalPages - 1) {
                pages.push("ellipsis2");
            }

            // always include last page if not already included
            if (totalPages > 1) {
                pages.push(totalPages);
            }

            return pages;
        };

        return (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`rounded-lg px-3 py-2 ${currentPage === 1 ? "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500" : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"}`}>
                    Previous
                </button>
                <div className="flex items-center gap-1">{getVisiblePages().map((page) => (typeof page === "number" ? renderPageButton(page) : renderEllipsis(page)))}</div>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`rounded-lg px-3 py-2 ${currentPage === totalPages ? "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500" : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"}`}>
                    Next
                </button>
            </div>
        );
    };

    return (
        <DirectoryContext.Provider
            value={{
                filteredItems: paginatedItems,
                isLoading,
                currentPage,
                totalPages,
                setCurrentPage: handlePageChange,
            }}
        >
            <div className="min-h-screen bg-cBackground">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 md:px-12 lg:px-20">
                    <header className="mb-8 mt-8 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-cText">{isClubDirectory ? "Clubs Directory" : "Resources Directory"}</h1>
                        <p className="text-lg text-cTextOffset">{isClubDirectory ? "Browse and filter through all available clubs." : "Browse and filter through all available resources."}</p>
                    </header>

                    {/* Search - Always at top */}
                    <div className="relative mb-8">
                        <input type="text" className="w-full rounded-lg border border-cBorder bg-cBackgroundOffset p-4 pl-12 text-cText placeholder-cTextOffset transition-colors duration-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none dark:hover:border-blue-500 dark:focus:border-blue-400" placeholder={isClubDirectory ? "Search clubs..." : "Search resources..."} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <FaSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cTextOffset" />
                    </div>

                    {/* Responsive Layout */}
                    <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:gap-8">
                        {/* Filters - Sidebar on large screens, collapsible on small screens */}
                        <div className="mb-8 lg:mb-0">
                            <div className="rounded-lg border border-cBorder bg-cBackgroundOffset lg:p-6">
                                {/* Mobile Filter Toggle */}
                                <button className="flex w-full items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-cBackground lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-semibold text-cText">Filters</h2>
                                        <span className="text-sm text-cTextOffset">{activeFilters.size > 0 ? `(${activeFilters.size} active)` : ""}</span>
                                    </div>
                                    <RiArrowDropDownLine className={`h-9 w-9 transform text-cText transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
                                </button>

                                {/* Filters Content */}
                                <div className={`px-4 pb-4 pt-2 lg:block lg:p-0 ${showFilters ? "block" : "hidden"}`}>
                                    <Suspense fallback={<FiltersSkeleton />}>{isLoading ? <FiltersSkeleton /> : <Filters tagsByCategory={tagsByCategory} activeFilters={activeFilters} onFilterChange={handleFilterChange} />}</Suspense>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <main>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
                                {isLoading ? (
                                    <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
                                        {[...Array(6)].map((_, index) => (
                                            <DirectoryItemBoxSkeleton key={index} />
                                        ))}
                                    </div>
                                ) : filteredItems.length > 0 ? (
                                    <Suspense
                                        fallback={
                                            <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
                                                {[...Array(6)].map((_, index) => (
                                                    <DirectoryItemBoxSkeleton key={index} />
                                                ))}
                                            </div>
                                        }
                                    >
                                        {children}
                                    </Suspense>
                                ) : (
                                    <div className="col-span-full text-center text-cTextOffset">
                                        <p className="text-lg">No {isClubDirectory ? "clubs" : "resources"} found matching your criteria.</p>
                                    </div>
                                )}
                            </div>
                            {renderPagination()}
                        </main>
                    </div>
                </div>
            </div>
        </DirectoryContext.Provider>
    );
}
