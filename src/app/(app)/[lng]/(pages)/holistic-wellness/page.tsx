import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";
import { WellnessWheel } from "./components/WellnessWheel";
import styles from "./styles.module.css";

export default function MentalWellnessPage() {
    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                {/* Hero Section */}
                <section className={`${styles.section} ${styles.heroSection}`}>
                    <h1 className={styles.heading1}>
                        What is <span className={styles.gradientText}>Holistic Wellness</span>?
                    </h1>
                    <p className={styles.heroParagraph}>Discover the interconnected dimensions of wellness and how they contribute to your overall well-being and mental health.</p>
                </section>

                {/* Wellness Wheel Section */}
                <section className={`${styles.section} ${styles.wheelSection}`}>
                    <div className={`${styles.card} ${styles.wheelCard}`}>
                        <h2 className={styles.heading2}>The Wellness Wheel</h2>
                        <p className={styles.paragraph}>The Wellness Wheel is a visual tool that highlights the interconnected aspects of wellness, demonstrating the balance needed for overall well-being. Each portion of the wheel represents an important dimension of wellness: Physical, Social, Intellectual, Emotional, Occupational, Environmental, Financial, and Spiritual.</p>
                        <div className={styles.wheelContainer}>
                            <WellnessWheel />
                        </div>
                        <div className={styles.textContent}>
                            <p className={styles.paragraph}>Together, these areas form a cumulative approach to wellness, and demonstrate how different aspects of life can influence and support each other.</p>
                            <p className={styles.paragraph}>By focusing on each dimension, individuals can create a more balanced, fulfilling, and resilient life. The Wellness Wheel promotes self-reflection and action, encouraging continuous growth and balance in order to foster mental wellness.</p>
                        </div>
                    </div>
                </section>

                {/* Additional Sections */}
                <section className={styles.section}>
                    <div className="grid gap-8 md:gap-12 lg:gap-16">
                        {/* Mental Wellness Section */}
                        <article className={styles.card}>
                            <h2 className={styles.heading2}>
                                Mental <span className="text-cAccent">Wellness</span> Is More Than Mental Health
                            </h2>
                            <div className={styles.textContent}>
                                <p className={styles.paragraph}>Mental wellness encompasses a range of factors that contribute to overall well-being, including emotional regulation, resilience, healthy coping mechanisms, positive self-esteem, and a sense of purpose or meaning in life. It involves the ability to manage stress, anxiety, and other challenges that arise in daily life, as well as the capacity to form and maintain healthy relationships with others.</p>
                                <p className={styles.paragraph}>Achieving and maintaining mental wellness requires ongoing effort and attention, which can be a difficult hurdle for many.</p>
                                <p className={styles.paragraph}>The willingness to seek support and treatment when necessary is crucial, and something we should all feel comfortable and supported reaching towards. Achieving mental wellness encompasses many factors, and could involve engaging in practices like mindfulness meditation, regular exercise, and self-care, as well as seeking therapy or other forms of professional support when facing mental health challenges.</p>
                                <p className={styles.paragraph}>Ultimately, mental wellness is about cultivating a sense of balance, resilience, and fulfillment in all aspects of life.</p>
                                <p className={styles.paragraph}>Evidence shows that improving our mental wellness can reduce our risk of developing mental illness, which is an underlying issue for not only university students, but our entire community as a whole.</p>
                            </div>
                        </article>

                        {/* MindVista Section */}
                        <article className={styles.card}>
                            <h2 className={styles.heading2}>
                                This is where <span className="text-cAccent">MindVista</span> comes in.
                            </h2>
                            <div className={styles.textContent}>
                                <p className={styles.paragraph}>MindVista is a student-led initiative at McGill to improve overall student wellbeing and engagement on-campus. We&apos;ve gathered a comprehensive list of information about all the resources available at McGill and around Montreal, in order to help you foster positive mental wellness practices with ease.</p>
                                <p className={styles.paragraph}>Given these benefits, MindVista strives to promote more attention towards mental illness prevention, and the awareness and improvement of overall mental wellness.</p>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("holistic-wellness");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
