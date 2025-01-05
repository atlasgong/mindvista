"use client";

import React, { createContext, useContext, useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { ClubTag, ResourceTag, ClubTagCategory, ResourceTagCategory, Club, Resource } from "../../../../../payload-types";
import { fetchDirectoryData } from "./actions";
import { DirectoryItemBoxSkeleton } from "./components/skeletons/DirectoryItemBoxSkeleton";
import { FiltersSkeleton } from "./components/skeletons/FiltersSkeleton";
import { Filters } from "./components/Filters";

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

    // Fetch data on mount and directory type change
    useEffect(() => {
        setIsLoading(true);
        // reset filters when switching between clubs and resources
        setActiveFilters(new Set());
        setSearchQuery("");

        // Use Promise to handle async data fetching
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
            const hasMatchingTag = Array.from(activeFilters).some((filterId) => itemTagIds.includes(filterId));
            if (!hasMatchingTag) return false;
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
            const delta = 1; // # of pages to show before and after current page
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
                            <div className={`rounded-lg border border-cBorder bg-cBackgroundOffset p-6 lg:block ${showFilters ? "block" : "hidden"}`}>
                                <Suspense fallback={<FiltersSkeleton />}>{isLoading ? <FiltersSkeleton /> : <Filters tagsByCategory={tagsByCategory} activeFilters={activeFilters} onFilterChange={handleFilterChange} />}</Suspense>
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
