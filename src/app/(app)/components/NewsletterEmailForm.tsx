"use client";

import { useState } from "react";
import { addListMember } from "@/lib/addMailchimpSubscriber";

export default function NewsletterEmailForm() {
    const [email, setEmail] = useState<string>(""); // state to hold email input
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false); // state to track button successful status

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent default form submission

        try {
            // pass the email address to addListMember
            await addListMember(email);
            setIsSubscribed(true); // update subscription status on success
        } catch (error) {
            console.error("Failed to subscribe:", error);
            alert("There was an error subscribing. Please try again.");
        }
    };

    return (
        <form
            className="flex w-full flex-col items-center gap-3 self-center md:flex-row"
            onSubmit={handleFormSubmit} // handle form submit
        >
            <input
                type="email"
                value={email} // bind state to input
                onChange={(e) => setEmail(e.target.value)} // update state on input change
                placeholder="Enter your email"
                className="w-full rounded-lg border border-cBorder bg-cBackgroundOffset px-4 py-2 text-cText focus:border-cAccent focus:outline-none focus:ring-2 focus:ring-[color:rgb(var(--accent)/0.2)] md:py-4 md:text-lg"
                required
                disabled={isSubscribed} // disable input if subscribed
            />
            <button
                type="submit"
                className={`w-full rounded-lg px-6 py-2 font-semibold text-white transition-all duration-300 md:w-auto md:py-3 md:text-lg ${
                    isSubscribed
                        ? "cursor-not-allowed bg-cAccent opacity-100" // solid color, disabled style
                        : "bg-gradient-to-r from-cAccent to-cLightBlue hover:opacity-90"
                }`}
                disabled={isSubscribed} // disable button if subscribed
            >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
            </button>
        </form>
    );
}
