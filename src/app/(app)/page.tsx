import MentalWellnessFact from "./components/index/MentalWellnessFact";
import NavBar from "./components/navbar/NavBar";
import NavigationController from "./components/index/NavigationController";
import Birds from "./components/index/Birds";
import Footer from "./components/Footer";
import Hr from "./components/Hr";
import Image from "next/image";
import HomeEventsSection from "./components/index/HomeEventsSection";

import lightThemeImage from "@public/landing/shifaaz-shamoon.webp";
import darkThemeImage from "@public/landing/jon-j_mk18.webp";

import { TbStretching2, TbHeartHandshake, TbCirclesRelation, TbApple, TbZzz, TbUserCheck } from "react-icons/tb";
import { HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";
import InfoSeparator from "./components/index/InfoSeparator";

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
                            <Image priority src={lightThemeImage} alt="Waves on the beach." className="h-full w-full object-cover dark:hidden" />
                            <div className="hidden dark:inline">
                                <Image priority src={darkThemeImage} alt="A mountain range with a big blue sky." className="h-full w-full object-cover" />
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
                    </div>

                    <InfoSeparator />
                </section>
                {/* TOP SECTION DESKTOP END */}

                {/* TOP SECTION MOBILE START */}
                <section className="pt-[10vh] lg:hidden"></section>
                {/* TOP SECTION MOBILE END */}
                {/* TOP SECTION END */}

                {/* FIRST SECTION */}
                <section className="px-[5vw] pb-12 pt-[10vh] text-center md:px-[7.5vw] lg:px-[10vw]">
                    <h2 className="text-5xl font-bold md:text-6xl">
                        The One-Stop-Shop for <span className="text-cAccent">Wellness</span> and <span className="text-cAccent">Engagement</span> at McGill.
                    </h2>

                    <p className="py-6 text-xl font-medium text-cTextOffset md:px-20 lg:px-28">
                        Welcome to <span className="font-semibold text-cAccent dark:text-mindvista-50">MindVista</span>, an innovative student-led initiative at McGill University committed to enhancing student wellness and engagement.
                        <span className="hidden md:inline"> Our passionate team of volunteers is devoted to regularly updating our website to simplify the process of accessing essential resources for your well-being. </span>
                    </p>
                </section>
                {/* END OF FIRST SECTION */}

                <Hr className="mx-[25vw]" />

                {/* MENTAL WELLNESS SECTION */}
                <section className="px-[5vw]">
                    <h2 className="mt-16 text-center text-3xl font-bold md:text-4xl">What is Mental Wellness?</h2>
                    <p className="py-3 text-center text-xl font-medium text-cTextOffset md:px-20 lg:px-28">Mental wellness includes a range of factors that contribute to one&apos;s overall well-being. Achieving mental wellness is a journey which requires ongoing effort and attention. This may feel intimidating at first, however, your willingness to improve is the first step! Here is a glimpse of what achieving further mental wellness involves.</p>

                    {/* prettier-ignore */}
                    <div className="mb-8 mt-10 grid grid-cols-1 grid-rows-3 gap-4 sm:mx-6 sm:grid-cols-2 sm:grid-rows-3 lg:mx-6 xl:mx-12">
                        <div className="p-4"><MentalWellnessFact icon={TbStretching2} title="Regular Physical Activity" description="Exercise releases endorphins, enhances sleep quality, and reduces stress. A daily walk, yoga, or gym session can enhance both physical and mental resilience." /></div>
                        <div className="hidden p-4 sm:grid"><MentalWellnessFact icon={TbHeartHandshake} title="Healthy Relationships" description="Meaningful connections with loved ones provide emotional support, reduce feelings of loneliness, and foster a sense of community. Prioritize quality time with friends and family to strengthen these bonds." /></div>
                        <div className="hidden p-4 sm:grid"><MentalWellnessFact icon={TbCirclesRelation} title="Mindfulness and Stress Management" description="Practices like meditation, deep breathing, and journaling help you manage emotions, reduce anxiety, and stay focused on the present. These techniques promote a calm and centered state of mind." /></div>
                        <div className="hidden p-4 sm:grid"><MentalWellnessFact icon={TbApple} title="A Balanced Diet" description="A nutrient-rich diet fuels your brain and body. Consuming omega-3s, whole grains, fruits, and vegetables positively affects mood and cognitive function." /></div>
                        <div className="p-4"><MentalWellnessFact icon={TbZzz} title="Quality Sleep" description="Restorative sleep is essential for memory, mood regulation, and decision-making. Aim for 7-9 hours per night and establish a consistent bedtime routine." /></div>
                        <div className="p-4"><MentalWellnessFact icon={TbUserCheck} title="Professional Support" description="Therapy or counseling provides practical tools to overcome challenges and encourages personal growth. Seeking professional support is a proactive way to strengthen your mental health." /></div>
                    </div>

                    <div className="flex justify-center">
                        <Link href="/holistic-wellness" className="flex items-center gap-3 rounded-lg border border-cBorder p-3 text-lg font-semibold transition-all duration-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-500 dark:hover:text-blue-400 dark:hover:shadow-blue-950/50">
                            Learn More <HiArrowLongRight />
                        </Link>
                    </div>
                </section>
                {/* END OF MENTAL WELLNESS SECTION */}

                <Hr className="mx-[25vw] my-16" />

                {/* EVENTS SECTION */}
                <HomeEventsSection />

                {/* SPONSORS SECTION */}
                <section className="mb-16 px-[5vw] md:px-[7.5vw] lg:px-[10vw]">
                    <h2 className="text-center text-3xl font-bold md:text-4xl">Big Thanks to Our Sponsors</h2>
                    <p className="py-3 text-center text-xl font-medium text-cTextOffset md:px-20 lg:px-28">We are incredibly grateful for the support and dedication of our sponsors who believe in our mission.</p>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 items-center justify-items-center gap-4">
                        <a href="https://www.caffettiera.ca/" target="_blank" className="w-full transition-all duration-200 hover:scale-110">
                            <Image src="/sponsors/caffettiera.png" alt="Caffettiera Logo" width={2029} height={1291} className="mx-auto max-w-32 md:max-w-44" />
                        </a>
                        <a href="https://www.ashtangamontreal.com/" target="_blank" className="w-full transition-all duration-200 hover:scale-110">
                            <Image src="/sponsors/aym.webp" alt="AYM Yoga Logo" width={1399} height={1578} className="mx-auto -mt-4 max-w-28 md:max-w-40" />
                        </a>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <Link href="/sponsor-us" className="flex items-center gap-3 rounded-lg border border-cBorder p-3 text-lg font-semibold transition-all duration-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-500 dark:hover:text-blue-400 dark:hover:shadow-blue-950/50">
                            Become a Sponsor <HiArrowLongRight />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
