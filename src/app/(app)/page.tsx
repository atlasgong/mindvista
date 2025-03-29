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
import { getPayloadClient } from "@/payloadClient";
import { SponsorLogos } from "./(pages)/sponsor/components/SponsorLogos";

export default async function Home() {
    return (
        <>
            <main className="flex min-h-screen flex-col [&_h2]:tracking-tighter [&_p]:tracking-tight">
                <section className="flex-1 overflow-x-hidden max-lg:hidden">
                    <div className="relative mx-auto flex min-h-[100vh] w-screen items-center justify-center">hacked mwahahahahahahaha</div>
                </section>
            </main>
        </>
    );
}
