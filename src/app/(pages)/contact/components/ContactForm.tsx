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
    email: z.string().email({ message: "You must enter a valid email address." }).trim(),
    subject: z.string().min(4, { message: "Must be at least 4 characters long." }).max(78, { message: "Subject line must not be longer than 78 characters." }).trim(),
    message: z.string().min(50, { message: "Please enter at least 50 characters." }).max(2048, { message: "Message cannot be longer than 2048 characters." }),
    captcha: z.string({ message: "Captcha verification is required!" }),
});

type FormFields = z.infer<typeof schema>;

export default function ContactForm() {
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

    const [theme, setTheme] = useState("light"); // default to light theme

    // handle theme change for hcaptcha
    useEffect(() => {
        setTheme(localStorage.getItem("theme") || "light"); // default to light if theme null
    }, []);

    // html form
    return (
        <form className="border-cBorder/20 bg-cBackground dark:border-cBorder mx-auto flex max-w-2xl flex-col space-y-8 rounded-xl border p-8 shadow-lg" id="contactForm" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name" className="text-cText/80 text-md mb-2 block font-semibold">
                    Name
                </label>
                <input id="name" {...register("name")} type="text" placeholder="Johnny Appleseed" className="bg-cBackgroundOffset/50 placeholder:text-cTextOffset/40 focus:ring-cAccent/20 focus:ring-cAccent/20 text-cText focus:border-cAccent dark:bg-cBackgroundOffset w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 dark:border-slate-600" />
                {errors.name && <div className="text-md text-cRed mt-2">{errors.name.message}</div>}
            </div>

            <div>
                <label htmlFor="email" className="text-cText/80 text-md mb-2 block font-semibold">
                    Email
                </label>
                <input id="email" {...register("email")} type="text" placeholder="johnny.appleseed@mail.mcgill.ca" className="bg-cBackgroundOffset/50 placeholder:text-cTextOffset/40 focus:ring-cAccent/20 focus:ring-cAccent/20 text-cText focus:border-cAccent dark:bg-cBackgroundOffset w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 dark:border-slate-600" />
                {errors.email && <div className="text-md text-cRed mt-2">{errors.email.message}</div>}
            </div>

            <div>
                <label htmlFor="subject" className="text-cText/80 text-md mb-2 block font-semibold">
                    Subject
                </label>
                <input id="subject" {...register("subject")} type="text" placeholder="A concise subject line" className="bg-cBackgroundOffset/50 placeholder:text-cTextOffset/40 focus:ring-cAccent/20 focus:ring-cAccent/20 text-cText focus:border-cAccent dark:bg-cBackgroundOffset w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 dark:border-slate-600" />
                {errors.subject && <div className="text-md text-cRed mt-2">{errors.subject.message}</div>}
            </div>

            <div>
                <label htmlFor="message" className="text-cText/80 text-md mb-2 block font-semibold">
                    Message
                </label>
                <textarea id="message" {...register("message")} placeholder="An interesting message..." className="bg-cBackgroundOffset/50 placeholder:text-cTextOffset/40 focus:ring-cAccent/20 focus:ring-cAccent/20 text-cText focus:border-cAccent dark:bg-cBackgroundOffset min-h-[150px] w-full resize-none rounded-xl border border-slate-300 px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 dark:border-slate-600"></textarea>
                {errors.message && <div className="text-md text-cRed mt-2">{errors.message.message}</div>}
            </div>

            <div className="flex justify-center">
                <HCaptcha sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2" reCaptchaCompat={false} onVerify={onHCaptchaChange} theme={theme} />
            </div>
            {errors.captcha && <div className="text-md text-cRed text-center">{errors.captcha.message}</div>}

            {isSuccess === true && <div className="bg-cAccent/10 border-cAccent/20 animate-fade-in text-cAccent rounded-lg border py-4 text-center font-medium">Thank you for your message! We&apos;ll get back to you soon.</div>}

            {isSuccess === false && (
                <div className="bg-cRed/10 border-cRed/20 animate-fade-in text-cRed rounded-lg border py-4 text-center">
                    Something went wrong. Please try again later or email us directly at{" "}
                    <a href="mailto:info@mindvista.ca" className="underline transition-opacity hover:opacity-80">
                        info@mindvista.ca
                    </a>
                    .
                </div>
            )}

            <button type="submit" disabled={isSubmitting} className={`from-cPurple to-cLightBlue text-cSoftWhite w-full rounded-lg bg-gradient-to-r py-3 font-semibold transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:px-8 ${isSubmitting ? "relative text-transparent" : ""}`}>
                Send Message
                {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="border-cSoftWhite h-5 w-5 animate-spin rounded-full border-2 border-r-transparent"></div>
                    </div>
                )}
            </button>
        </form>
    );
}
