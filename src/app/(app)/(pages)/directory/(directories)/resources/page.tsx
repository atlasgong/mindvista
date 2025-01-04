"use client";

import React from "react";
import { useDirectory } from "../layout";
import { Resource } from "@/payload-types";
import { DirectoryItemBox } from "../components/DirectoryItemBox";

export default function ResourceDirectory() {
    const { filteredItems, isLoading } = useDirectory();
    const resources = filteredItems as Resource[];

    return (
        <>
            {resources.map((resource) => (
                <DirectoryItemBox key={resource.id} item={resource} type="resources" />
            ))}
        </>
    );
}