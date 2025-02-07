"use client";

import React from "react";
import { useDirectory } from "../DirectoryProvider";
import { Club } from "@/payload-types";
import { DirectoryItemBox } from "../components/DirectoryItemBox";

export default function ClubDirectoryClient() {
    const { filteredItems } = useDirectory();
    const clubs = filteredItems as Club[];

    return (
        <>
            {clubs.map((club) => (
                <DirectoryItemBox key={club.id} item={club} type="clubs" />
            ))}
        </>
    );
}
