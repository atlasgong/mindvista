"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import useWeb3Forms from "@web3forms/react";

// define form scheme for input validation
const schema = z.object({
    name: z.string().min(2, { message: "Must be at least 2 characters long." }).max(64, { message: "Must be at most 64 characters long." }).trim(),
    organization: z.optional(z.string().min(1, { message: "Must be at least 1 character long." }).max(32, { message: "Must be at most 32 characters long." }).trim()),
    email: z.string().email({ message: "You must enter a valid email address." }).trim(),
    subject: z.string().min(4, { message: "Must be at least 4 characters long." }).max(78, { message: "Subject line must not be longer than 78 characters." }).trim(),
    message: z.string().min(50, { message: "Please enter at least 50 characters." }).max(2048, { message: "Message cannot be longer than 2048 characters." }),
    captcha: z.string({ message: "Captcha verification is required!" }),
});

type FormFields = z.infer<typeof schema>;

const HCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

export default function ContactForm() {
    if (!HCAPTCHA_SITE_KEY) {
        console.error("NEXT_PUBLIC_HCAPTCHA_SITE_KEY NOT DEFINED");
    }

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: "onTouched", // triggers on first blur event, then on every change
    });

    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    // handle form submission
    const { submit: onSubmit } = useWeb3Forms({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
        settings: { from_name: "mindvista.ca" }, // fallback sender name
        onSuccess: () => {
            setIsSuccess(true);
            reset();
        },
        onError: () => {
            setIsSuccess(false);
        },
    });

    // handle captcha change event
    const onHCaptchaChange = (token: string | null) => {
        setValue("captcha", token || "");
        trigger("captcha");
    };

    const [theme, setTheme] = useState("dark"); // default to dark theme

    // handle theme change for hcaptcha
    useEffect(() => {
        setTheme(localStorage.getItem("theme") || "dark"); // default to dark if theme null
    }, []);

    // html form
    return (
        <form className="border-cBorder/20 mx-auto flex max-w-2xl flex-col space-y-8 rounded-xl border bg-cBackground p-8 shadow-lg dark:border-cBorder" id="contactForm" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name" className="text-cText/80 text-md mb-2 block font-semibold">
                    Name*
                </label>
                <input id="name" {...register("name")} type="text" className="bg-cBackgroundOffset/50 placeholder:text-cTextOffset/40 focus:ring-cAccent/20 focus:ring-cAccent/20 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-medium text-cText transition-all duration-200 focus:border-cAccent focus:outline-none focus:ring-2 dark:border-slate-600 dark:bg-cBackgroundOffset" />
                {errors.name && <div className="text-md mt-2 text-cRed">{errors.name.message}</div>}
            </div>

            <div>
                <label htmlFor="organization" className="text-cText/80 text-md mb-2 block font-semibold">
                    Organization
                </label>
                <input id="organization" {...register("organization")} type="text" className="bg-cBackgroundOffset/50 placeholder:text-cTextOffset/40 focus:ring-cAccent/20 focus:ring-cAccent/20 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-medium text-cText transition-all duration-200 focus:border-cAccent focus:outline-none focus:ring-2 dark:border-slate-600 dark:bg-cBackgroundOffset" />
                {errors.organization && <div className="text-md mt-2 text-cRed">{errors.organization.message}</div>}
            </div>

            <div>
                <label htmlFor="email" className="text-cText/80 text-md mb-2 block font-semibold">
                    Email*
                </label>
                <input id="email" {...register("email")} type="text" className="bg-cBackgroundOffset/50 placeholder:text-cTextOffset/40 focus:ring-cAccent/20 focus:ring-cAccent/20 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-medium text-cText transition-all duration-200 focus:border-cAccent focus:outline-none focus:ring-2 dark:border-slate-600 dark:bg-cBackgroundOffset" />
                {errors.email && <div className="text-md mt-2 text-cRed">{errors.email.message}</div>}
            </div>

            <div>
                <label htmlFor="subject" className="text-cText/80 text-md mb-2 block font-semibold">
                    Subject*
                </label>
                <input id="subject" {...register("subject")} type="text" className="bg-cBackgroundOffset/50 placeholder:text-cTextOffset/40 focus:ring-cAccent/20 focus:ring-cAccent/20 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-medium text-cText transition-all duration-200 focus:border-cAccent focus:outline-none focus:ring-2 dark:border-slate-600 dark:bg-cBackgroundOffset" />
                {errors.subject && <div className="text-md mt-2 text-cRed">{errors.subject.message}</div>}
            </div>

            <div>
                <label htmlFor="message" className="text-cText/80 text-md mb-2 block font-semibold">
                    Message*
                </label>
                <textarea id="message" {...register("message")} className="bg-cBackgroundOffset/50 placeholder:text-cTextOffset/40 focus:ring-cAccent/20 focus:ring-cAccent/20 min-h-[150px] w-full resize-none rounded-xl border border-slate-300 px-4 py-3 font-medium text-cText transition-all duration-200 focus:border-cAccent focus:outline-none focus:ring-2 dark:border-slate-600 dark:bg-cBackgroundOffset"></textarea>
                {errors.message && <div className="text-md mt-2 text-cRed">{errors.message.message}</div>}
            </div>

            <div className="flex justify-center">
                <HCaptcha sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string} reCaptchaCompat={false} onVerify={onHCaptchaChange} theme={theme} />
            </div>
            {errors.captcha && <div className="text-md text-center text-cRed">{errors.captcha.message}</div>}

            {isSuccess === true && <div className="bg-cAccent/10 border-cAccent/20 animate-fade-in rounded-lg border py-4 text-center font-medium text-cAccent">Thank you for your message! We&apos;ll get back to you soon.</div>}

            {isSuccess === false && (
                <div className="animate-fade-in rounded-lg border border-cRed py-4 text-center text-cRed">
                    Something went wrong. Please try again later or email us directly at{" "}
                    <a href="mailto:mindvista.mcgill@gmail.com" className="underline transition-opacity hover:opacity-80">
                        mindvista.mcgill@gmail.com
                    </a>
                    .
                </div>
            )}

            <button type="submit" disabled={isSubmitting} className={`w-full rounded-lg bg-gradient-to-r from-cPurple to-cLightBlue py-3 font-semibold text-cSoftWhite transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:px-8 ${isSubmitting ? "relative text-transparent" : ""}`}>
                Send Message
                {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-cSoftWhite border-r-transparent"></div>
                    </div>
                )}
            </button>
        </form>
    );
}
