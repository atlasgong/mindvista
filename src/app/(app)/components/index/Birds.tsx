import styles from "./birds.module.css";

export default function Birds() {
    return (
        <>
            <div className={`${styles.birdContainer} ${styles.birdContainerOne}`}>
                <div className={`${styles.bird} ${styles.birdOne} brightness-0 invert-[85%] saturate-100 filter-none dark:filter`}></div>
            </div>
            <div className={`${styles.birdContainer} ${styles.birdContainerTwo}`}>
                <div className={`${styles.bird} ${styles.birdTwo} brightness-0 invert-[85%] saturate-100 filter-none dark:filter`}></div>
            </div>
            <div className={`${styles.birdContainer} ${styles.birdContainerThree}`}>
                <div className={`${styles.bird} ${styles.birdThree} brightness-0 invert-[85%] saturate-100 filter-none dark:filter`}></div>
            </div>
            <div className={`${styles.birdContainer} ${styles.birdContainerFour}`}>
                <div className={`${styles.bird} ${styles.birdFour} brightness-0 invert-[85%] saturate-100 filter-none dark:filter`}></div>
            </div>
        </>
    );
}
