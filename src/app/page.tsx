import MentalWellnessFact from "./components/MentallWellnessFact";
import NavBar from "./components/NavBar";
import NavigationController from "./components/NavigationController";
import Birds from "./components/Birds";
import Footer from "./components/Footer";
import Hr from "./components/Hr";
import Image from "next/image";

import lightThemeImage from "@public/landing/meritt-thomas.webp";
import darkThemeImage from "@public/landing/jordan-steranka.webp";

import { TbStretching2, TbHeartHandshake, TbCirclesRelation, TbApple, TbZzz, TbUserCheck } from "react-icons/tb";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="max-lg:hidden">
                <NavigationController />
            </div>
            <div className="lg:hidden">
                <NavBar />
            </div>
            <main className="flex min-h-screen flex-col [&_h2]:tracking-tighter [&_p]:tracking-tight">
                {/* TOP SECTION START */}

                {/* TOP SECTION DESKTOP START */}
                <section className="flex-1 overflow-x-hidden max-lg:hidden">
                    <div className="relative mx-auto flex min-h-[100vh] w-screen items-center justify-center">
                        <Birds />

                        {/* "Est. 2023" */}
                        <p className="absolute left-[22vw] top-[20vh] z-10 font-serif text-[2vh] font-semibold text-slate-400 dark:text-slate-100">&copy; Est. 2023</p>

                        {/* Column Image */}
                        <div className="absolute inset-0 left-1/2 w-[25vw] -translate-x-1/2 transform">
                            <Image src={lightThemeImage} alt="A green leafy plant." className="h-full w-full object-cover dark:hidden" />
                            <div className="hidden dark:inline">
                                <Image src={darkThemeImage} alt="A green leafy plant." className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-black/30"></div>
                            </div>
                        </div>

                        {/* "MINDVISTA" */}
                        <div className="z-10 flex flex-row gap-0">
                            <h1 className="-mt-32 font-serif text-[12vw] font-semibold tracking-tight text-[#1D1D1B] dark:text-slate-100">MIND</h1>
                            <h1 className="-mt-32 font-serif text-[12vw] font-semibold tracking-tight text-[#1D1D1B] dark:text-slate-100">VISTA</h1>
                        </div>

                        {/* Quote */}
                        <div className="text-md absolute bottom-[20vh] right-[10vw] z-10 max-w-[20vw] text-[2vh] font-semibold text-[#1D1D1B] dark:text-slate-100">
                            <p>Mental wellness is an active process that helps us to build resilience, grow, and flourish.</p>
                            <p className="text-[#1D1D1B]/60 dark:text-slate-400">&mdash; Global Wellness Institute</p>
                        </div>

                        {/* TODO: add logo overlay to bottom left corner */}
                    </div>

                    {/* INFO BAR */}
                    <p className="min-h-[10vh] content-center bg-slate-300 text-center text-lg font-bold">SPONSORS HERE</p>
                </section>
                {/* TOP SECTION DESKTOP END */}

                {/* TOP SECTION MOBILE START */}
                <section className="pt-[10vh] lg:hidden"></section>
                {/* TOP SECTION MOBILE END */}
                {/* TOP SECTION END */}

                {/* FIRST SECTION */}
                <div className="px-[5vw] pb-12 pt-[10vh] text-center md:px-[7.5vw] lg:px-[10vw]">
                    <h2 className="text-5xl font-bold md:text-6xl">
                        Your Central Hub for <span className="text-cAccent">Wellness</span> and <span className="text-cAccent">Growth</span> at McGill
                        {/* <span className="hidden max-md:inline">Your Hub</span> <span className="hidden md:inline">The One-Stop-Shop</span> for <span className="text-cAccent">Wellness</span> and <span className="text-cAccent">Engagement</span> at McGill. */}
                    </h2>

                    <p className="text-cTextOffset py-6 text-xl font-medium md:px-20 lg:px-28">
                        Welcome to <span className="text-cAccent font-semibold">MindVista</span>, an innovative student-led initiative at McGill University committed to enhancing student wellness and engagement.
                        <span className="hidden md:inline"> Our passionate team of volunteers is devoted to regularly updating our website to simplify the process of accessing essential resources for your well-being. </span>
                    </p>
                </div>
                {/* END OF FIRST SECTION */}

                <Hr className="mx-[25vw]" />

                {/* MENTAL WELLNESS SECTION */}
                <div className="px-[5vw]">
                    <h2 className="mt-16 text-center text-3xl font-bold md:text-4xl">What is Mental Wellness?</h2>
                    <p className="text-cTextOffset py-3 text-center text-xl font-medium md:px-20 lg:px-28">Mental wellness includes a range of factors that all contribute to one’s overall well-being. Achieving mental wellness is a journey, which requires ongoing effort and attention.</p>

                    {/* prettier-ignore */}
                    <div className="mb-8 mt-10 grid grid-cols-1 grid-rows-3 gap-4 sm:mx-6 sm:grid-cols-2 sm:grid-rows-3 lg:mx-6 xl:mx-12">
                        <div className="p-4"><MentalWellnessFact icon={TbStretching2} title="Regular Physical Activity" description="Exercise boosts endorphins, improves sleep, and reduces stress. A daily walk, yoga, or gym session can enhance both physical and mental resilience." /></div>
                        <div className="hidden p-4 sm:grid"><MentalWellnessFact icon={TbHeartHandshake} title="Healthy Relationships" description="Meaningful connections provide emotional support, reduce feelings of loneliness, and foster a sense of belonging. Prioritize time with friends and family." /></div>
                        <div className="hidden p-4 sm:grid"><MentalWellnessFact icon={TbCirclesRelation} title="Mindfulness and Stress Management" description="Techniques like meditation, deep breathing, or journaling help regulate emotions, lower anxiety, and keep you grounded in the present moment." /></div>
                        <div className="hidden p-4 sm:grid"><MentalWellnessFact icon={TbApple} title="A Balanced Diet" description="A nutrient-rich diet fuels your brain and body. Consuming omega-3s, whole grains, fruits, and vegetables positively affects mood and cognitive function." /></div>
                        <div className="p-4"><MentalWellnessFact icon={TbZzz} title="Quality Sleep" description="Restorative sleep is essential for memory, mood regulation, and decision-making. Aim for 7-9 hours per night and establish a consistent bedtime routine." /></div>
                        <div className="p-4"><MentalWellnessFact icon={TbUserCheck} title="Professional Support" description="Therapy or counseling can provide strategies to manage challenges and foster growth. It\'s a proactive step toward building long-term mental strength." /></div>
                    </div>

                    <div className="flex justify-center">
                        <Link href="/mental-wellness" className="border-cText bg-cBackground rounded-full border-2 p-3 text-lg font-semibold">
                            Learn More
                        </Link>
                    </div>
                </div>
                {/* END OF MENTAL WELLNESS SECTION */}

                <div className="mt-16"></div>
            </main>
            <Footer />
        </>
    );
}
