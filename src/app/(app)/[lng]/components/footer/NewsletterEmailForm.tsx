"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { addListMember } from "@/lib/addMailchimpSubscriber";
import confetti from "canvas-confetti";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTranslation } from "@i18n/client";
import { Language } from "@i18n/settings";

const schema = z.object({
    email: z.string().email().trim(),
});

type FormFields = z.infer<typeof schema>;

export default function NewsletterEmailForm({ lng }: { lng: Language }) {
    const { t } = useTranslation(lng, "components/footer/NewsletterEmailForm");

    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
    });

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const onSubmit = async (data: FormFields) => {
        setError(null);

        try {
            await addListMember(data.email);
            setIsSubscribed(true);
            console.log("Someone successfully subscribed to the newsletter via the footer form!");

            if (!audioRef.current) {
                audioRef.current = new Audio("/confirmation-sfx.mp3");
            }
            audioRef.current.play();

            confetti({
                particleCount: 200,
                spread: 359,
                gravity: 0.5,
                disableForReducedMotion: true,
            });
        } catch (error) {
            console.error("NEWSLETTER FORM FAILED TO SUBSCRIBE:", error);
            setError(t("error.generic"));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center">
            <div className="w-full">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr,auto]">
                    <input
                        type="text"
                        {...register("email", {
                            required: t("email.validation"),
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: t("email.validation"),
                            },
                        })}
                        placeholder={t("email.placeholder")}
                        className={`w-full rounded-lg border border-cBorder bg-cBackgroundOffset px-4 py-3 text-base text-cText transition-all duration-200 focus:border-cAccent focus:outline-none focus:ring-2 focus:ring-[color:rgb(var(--accent)/0.2)] md:text-lg ${isSubmitting ? "cursor-wait" : ""}`}
                        disabled={isSubscribed || isSubmitting}
                    />
                    <button type="submit" className={`w-full rounded-lg px-4 py-2 text-base font-semibold text-white transition-all duration-200 md:text-lg ${isSubscribed ? "cursor-not-allowed bg-cAccent opacity-100" : isSubmitting ? "cursor-wait bg-cAccent" : "bg-gradient-to-r from-cAccent to-cLightBlue hover:opacity-90"}`} disabled={isSubscribed || isSubmitting}>
                        {isSubscribed ? t("button.subscribed") : isSubmitting ? t("button.subscribing") : t("button.subscribe")}
                    </button>
                </div>

                <div className="mt-3">
                    {errors.email && (
                        <p className="text-sm font-semibold text-cRed dark:text-red-400" role="alert">
                            {errors.email.message}
                        </p>
                    )}
                    {error && (
                        <Link href="/contact" className="text-sm font-semibold text-cRed dark:text-red-400" role="alert">
                            {error}
                        </Link>
                    )}
                </div>
            </div>
        </form>
    );
}
