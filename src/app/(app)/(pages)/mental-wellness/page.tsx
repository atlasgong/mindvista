import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";

export default function MentalWellnessPage() {
    return (
        <div className="mx-[5vw] my-[10vh] lg:mx-[10vw] xl:mx-[15vw] [&_h1]:leading-tight [&_h1]:tracking-tighter">
            <h1 className="mb-6 text-center text-[10vmin] font-bold">What is Mental Wellness?</h1>
            <h1 className="mb-6 text-center text-[5vmin] font-bold">COMING SOON &mdash; Stay Tuned!</h1>
            <p className="mt-4 text-center text-lg">We’re crafting a space dedicated to mental wellness—your journey to a healthier, happier mind begins here. While we fine-tune the details, remember: your mental health matters every single day. Check back soon for tips, insights, and resources to support your well-being!</p>
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("mental-wellness");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
