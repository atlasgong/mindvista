"use client";

import React from "react";
import { ClubTag, ResourceTag } from "@/payload-types";

interface FiltersProps {
    tagsByCategory: {
        [category: string]: {
            id: number;
            name: string;
            tags: Array<ClubTag | ResourceTag>;
        };
    };
    activeFilters: Set<string>;
    onFilterChange: (tagId: string) => void;
}

export function Filters({ tagsByCategory, activeFilters, onFilterChange }: FiltersProps) {
    return (
        <div className="space-y-6">
            {/* Tag Filters */}
            {Object.entries(tagsByCategory).map(([categoryName, { tags }]) => (
                <div key={categoryName} className="filter-section">
                    <h3 className="mb-4 text-lg font-semibold text-cText">{categoryName}</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <label key={tag.id} className={`inline-flex cursor-pointer items-center rounded-full px-3 py-1 text-sm transition-colors ${activeFilters.has(tag.id.toString()) ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"}`}>
                                <input type="checkbox" className="form-checkbox hidden" onChange={() => onFilterChange(tag.id.toString())} checked={activeFilters.has(tag.id.toString())} />
                                <span>{tag.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
