import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import useWeb3Forms from "@web3forms/react";

// define form scheme for input validation
const schema = z.object({
    name: z.string()
            .min(2, { message: "Must be at least 2 characters long." })
            .max(64, { message: "Must be at most 64 characters long." })
            .trim(),
    email: z.string()
            .email({ message: "You must enter a valid email address."})
            .trim(),
    subject: z.string()
            .min(4, { message: "Must be at least 4 characters long." })
            .max(78, { message: "Subject line must not be longer than 78 characters." })
            .trim(),
    message: z.string()
            .min(50, { message: "Please enter at least 50 characters." })
            .max(2048, { message: "Message cannot be longer than 2048 characters." }),
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
        access_key: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY,
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
        <form className="flex flex-col space-y-6" id="contactForm" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name" className="block text-cText font-medium mb-1">Name</label>
                <input 
                    id="name" 
                    {...register("name")} 
                    type="text" 
                    placeholder="Johnny Appleseed" 
                    className="w-full px-4 py-2 rounded-lg border-2 border-cBorder bg-cBackground text-cText placeholder:text-cTextOffset/50 focus:outline-none focus:border-cAccent transition-colors"
                />
                {errors.name && <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</div>}
            </div>

            <div>
                <label htmlFor="email" className="block text-cText font-medium mb-1">Email</label>
                <input 
                    id="email" 
                    {...register("email")} 
                    type="text" 
                    placeholder="johnny.appleseed@mail.mcgill.ca" 
                    className="w-full px-4 py-2 rounded-lg border-2 border-cBorder bg-cBackground text-cText placeholder:text-cTextOffset/50 focus:outline-none focus:border-cAccent transition-colors"
                />
                {errors.email && <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</div>}
            </div>

            <div>
                <label htmlFor="subject" className="block text-cText font-medium mb-1">Subject</label>
                <input 
                    id="subject" 
                    {...register("subject")} 
                    type="text" 
                    placeholder="A concise subject line" 
                    className="w-full px-4 py-2 rounded-lg border-2 border-cBorder bg-cBackground text-cText placeholder:text-cTextOffset/50 focus:outline-none focus:border-cAccent transition-colors"
                />
                {errors.subject && <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject.message}</div>}
            </div>

            <div>
                <label htmlFor="message" className="block text-cText font-medium mb-1">Message</label>
                <textarea
                    id="message"
                    {...register("message")}
                    placeholder="An interesting message."
                    className="w-full px-4 py-2 rounded-lg border-2 border-cBorder bg-cBackground text-cText placeholder:text-cTextOffset/50 focus:outline-none focus:border-cAccent transition-colors min-h-[150px] resize-none"
                ></textarea>
                {errors.message && <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</div>}
            </div>

            {/* HCaptcha Integration */}
            <div className="flex justify-center">
                <HCaptcha
                    sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                    reCaptchaCompat={false}
                    onVerify={onHCaptchaChange}
                    theme={theme}
                />
            </div>
            {errors.captcha && (
                <div className="text-center text-sm text-red-600 dark:text-red-400 -mt-4">
                    {errors.captcha.message}
                </div>
            )}

            {isSuccess === true && (
                <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Thank you for your message! We'll get back to you soon.
                </div>
            )}

            {isSuccess === false && (
                <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-slate-800 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                    Something went wrong. Please try again later or <a href="mailto:info@mindvista.ca" className="underline">email us directly</a>.
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto mx-auto px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-sky-800 to-sky-600 dark:from-emerald-300 dark:to-emerald-500 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSubmitting ? 'relative text-transparent' : ''
                }`}
            >
                Send Message
                {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </button>
        </form>
    );
}