"use client";

import { useState, useEffect } from "react";
import { LuBadgeInfo } from "react-icons/lu";

// prettier-ignore
const infoBarMessages = [
    "Core Values: Empowerment, Accessibility, and Community Connection.",
    "Our Mission: A hub for growth, resilience, and engagement.",
    "Our Vision: A campus where students thrive and connect.",
    "Our Commitment: Adapting to student needs with innovation."
];

// generates a new info message on every page refresh
export default function InfoSeparator() {
    const [randomMessage, setRandomMessage] = useState("");

    useEffect(() => {
        const newMessage = infoBarMessages[Math.floor(Math.random() * infoBarMessages.length)];
        setRandomMessage(newMessage);
    }, []);

    return (
        <section className="flex min-h-[8vh] flex-row items-center justify-center gap-2 bg-mindvista-700 text-center text-lg font-bold text-white">
            <LuBadgeInfo /> {randomMessage}
        </section>
    );
}
