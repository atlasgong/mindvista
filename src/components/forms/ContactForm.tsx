import { useForm } from 'react-hook-form';
import { useState } from 'react';
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
    const { register, handleSubmit, setValue, trigger, reset, formState: { errors, isSubmitting } } = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: "onTouched", // triggers on first blur event, then on every change
    });

    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    // handle form submission
    const { submit: onSubmit } = useWeb3Forms({
        access_key: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY,
        settings: { from_name: "mindvista.ca" },
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


    // html form
    return (
        <form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Name</label>
            <input
                id="name"
                {...register("name")}
                type="text"
                placeholder="Johnny Appleseed"
            />
            {errors.name && <div className="fieldError">{errors.name.message}</div>}

            <label htmlFor="email">Email</label>
            <input
                id="email"
                {...register("email")}
                type="text"
                placeholder="johnny.appleseed@mail.mcgill.ca"
            />
            {errors.email && <div className="fieldError">{errors.email.message}</div>}

            <label htmlFor="subject">Subject</label>
            <input
                id="subject"
                {...register("subject")}
                type="text"
                placeholder="A concise subject line"
            />
            {errors.subject && <div className="fieldError">{errors.subject.message}</div>}

            <label htmlFor="message">Message</label>
            <textarea
                id="message"
                {...register("message")}
                placeholder="An interesting message."
                rows={15}
                cols={40}
            ></textarea>
            {errors.message && <div className="fieldError">{errors.message.message}</div>}

            {/* HCaptcha Integration, sitekey is publicly provided by Web3Forms */}
            <div className="hcaptcha"><HCaptcha
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2" // safe to include in client side code
                reCaptchaCompat={false}
                onVerify={onHCaptchaChange}
                theme="dark"
            /></div>
            {errors.captcha && <div className="fieldError captchaError">{errors.captcha.message}</div>}

            {/* {errors.root && <div className="fieldError">{errors.root.message}</div>} */}

            <button disabled={isSubmitting || isSuccess !== null} type="submit">
                {isSubmitting
                    ? "Sending..."
                    : isSuccess === true
                    ? "Sent!"
                    : isSuccess === false
                    ? "Something went wrong..."
                    : "Send Message!"
                }
            </button>

            {isSuccess !== null && (
                <div className={isSuccess ? "success" : "error"}>
                    {isSuccess ? (
                        "Thanks for the message! We will get back to you soon."
                    ) : (
                        <>
                            Something went wrong! Please try again later or email{" "}
                            <a href="mailto:contact@mindvista.ca">contact@mindvista.com</a>.
                        </>
                    )}
                </div>
            )}
            
        </form>
    );
}