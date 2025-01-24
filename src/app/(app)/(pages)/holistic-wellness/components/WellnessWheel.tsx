"use client";

import { useState, useEffect } from "react";
import { Wheel } from "./Wheel";

/**
 * represents a dimension of wellness with its metadata
 */
interface WellnessDimension {
    title: string;
    description: string;
    color: string;
}

type WellnessPosition = "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left";

/**
 * renders a wellness dimension card with title and description
 * handles positioning and visibility animations
 */
const WellnessDimension = ({ title, description, position, isVisible }: { title: string; description: string; position: WellnessPosition; isVisible: boolean }) => {
    // define positions for each card from their slice location
    const positionClasses: Record<WellnessPosition, string> = {
        top: "-top-48 left-1/2 -translate-x-1/2",
        "top-right": "-right-48 top-0",
        right: "-right-48 top-1/2 -translate-y-1/2",
        "bottom-right": "-right-48 bottom-0",
        bottom: "-bottom-48 left-1/2 -translate-x-1/2",
        "bottom-left": "-left-48 bottom-0",
        left: "-left-48 top-1/2 -translate-y-1/2",
        "top-left": "-left-48 top-0",
    };

    return (
        <div className={`absolute w-64 transition-all duration-500 ease-in-out ${positionClasses[position]} ${isVisible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"} bg-cBackgroundOffset/90 group relative transform overflow-hidden rounded-xl p-6 shadow-xl backdrop-blur-sm hover:-translate-y-1 hover:shadow-2xl`}>
            <div className="relative z-10">
                <h3 className="group-hover:text-cAccentHover mb-3 text-xl font-bold text-cAccent transition-colors duration-300">{title}</h3>
                <p className="text-cTextOffset transition-opacity duration-300 group-hover:opacity-90">{description}</p>
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-mindvista-50/10 to-transparent opacity-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute -inset-1 -z-20 bg-gradient-to-br from-mindvista-50/5 via-transparent to-mindvista-50/5 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />
        </div>
    );
};

/**
 * wellness dimensions with their descriptions and colors
 * TODO: export to payload
 */
export const wellnessDimensions: WellnessDimension[] = [
    {
        title: "Intellectual",
        description: "Engaging in creative and mentally stimulating activities.",
        color: "violet-500",
    },
    {
        title: "Emotional",
        description: "Understanding and managing emotions, stress, and mental health.",
        color: "pink-500",
    },
    {
        title: "Occupational",
        description: "Finding satisfaction and enrichment in work and career pursuits.",
        color: "amber-500",
    },
    {
        title: "Environmental",
        description: "Creating and maintaining healthy living spaces and connection with nature.",
        color: "emerald-500",
    },
    {
        title: "Financial",
        description: "Managing resources and creating financial security and stability.",
        color: "red-500",
    },
    {
        title: "Spiritual",
        description: "Exploring meaning, purpose, and connection to something greater.",
        color: "indigo-500",
    },
    {
        title: "Physical",
        description: "Exercise, nutrition, sleep, and overall physical health maintenance.",
        color: "indigo-600",
    },
    {
        title: "Social",
        description: "Building and maintaining meaningful relationships and support networks.",
        color: "cyan-500",
    },
];

interface NavigatorExtended extends Navigator {
    msMaxTouchPoints?: number; // optional because not all browsers support it
}

/**
 * main wellness wheel component that handles interactions and state management
 * supports both touch and mouse-based interactions
 */
export function WellnessWheel() {
    const [activeSlice, setActiveSlice] = useState<number | null>(null);
    const [isTouch, setIsTouch] = useState(false);

    // check if device has touch capabilities
    useEffect(() => {
        const checkTouch = () => {
            const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || ((navigator as NavigatorExtended).msMaxTouchPoints ?? 0) > 0;
            setIsTouch(hasTouch);
        };

        checkTouch();
        window.addEventListener("resize", checkTouch);

        return () => window.removeEventListener("resize", checkTouch);
    }, []);

    // handle clicks outside the wheel to deselect active slice
    useEffect(() => {
        if (!isTouch) return;

        const handleDocumentClick = (e: MouseEvent) => {
            const wheelElement = document.querySelector(".wellness-wheel-container");
            const clickedElement = e.target as HTMLElement;

            // if click is outside the wheel container or on the container but not on an SVG element
            if (!wheelElement?.contains(clickedElement) || (wheelElement === clickedElement && !clickedElement.closest("svg"))) {
                setActiveSlice(null);
            }
        };

        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
    }, [isTouch]);

    const handleClick = (index: number) => {
        if (isTouch) {
            setActiveSlice(activeSlice === index ? null : index);
        }
    };

    const handleHover = (index: number | null) => {
        if (!isTouch) {
            setActiveSlice(index);
        }
    };

    return (
        <div className="wellness-wheel-container perspective-1000 relative h-full w-full">
            <Wheel radius={240} sliceColors={wellnessDimensions.map((d) => d.color)} dimensions={wellnessDimensions} activeIndex={activeSlice} onSliceClick={handleClick} onSliceHover={handleHover} isTouch={isTouch} className="relative mx-auto aspect-square max-w-[90vw] transform transition-all duration-500 ease-in-out md:max-w-[75vw]" />
        </div>
    );
}
