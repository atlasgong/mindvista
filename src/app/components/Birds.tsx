export default function Birds() {
    return (
        <>
            <div className="bird-container bird-container--one">
                <div className="bird bird--one"></div>
            </div>
            <div className="bird-container bird-container--two">
                <div className="bird bird--two"></div>
            </div>
            <div className="bird-container bird-container--three">
                <div className="bird bird--three"></div>
            </div>
            <div className="bird-container bird-container--four">
                <div className="bird bird--four"></div>
            </div>

            <style>
                {`
                /* Credits: Steven Roberts */

                @import url("https://fonts.googleapis.com/css?family=Arima+Madurai:300");

                .bird {
                    background-image: url("/birds.svg");
                    background-size: auto 100%;
                    width: 88px;
                    height: 125px;
                    will-change: background-position;
                    animation-name: fly-cycle;
                    animation-timing-function: steps(10);
                    animation-iteration-count: infinite;
                }

                /* change color of birds for dark mode */
                .dark .bird {
                    filter: brightness(0) saturate(100%) invert(85%);
                }

                .bird--one {
                    animation-duration: 1s;
                    animation-delay: -0.5s;
                }

                .bird--two {
                    animation-duration: 0.9s;
                    animation-delay: -0.75s;
                }

                .bird--three {
                    animation-duration: 1.25s;
                    animation-delay: -0.25s;
                }

                .bird--four {
                    animation-duration: 1.1s;
                    animation-delay: -0.5s;
                }

                .bird-container {
                    position: absolute;
                    top: 15%;
                    left: -10%;
                    transform: scale(0) translateX(-10vw);
                    will-change: transform;
                    animation-name: fly-right-one;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    pointer-events: none;
                    z-index: 10;
                }

                .bird-container--one {
                    animation-duration: 15s;
                    animation-delay: 0;
                }

                .bird-container--two {
                    animation-duration: 16s;
                    animation-delay: 1s;
                }

                .bird-container--three {
                    animation-duration: 14.6s;
                    animation-delay: 9.5s;
                }

                .bird-container--four {
                    animation-duration: 16s;
                    animation-delay: 10.25s;
                }

                @keyframes fly-cycle {
                    100% {
                        background-position: -900px 0;
                    }
                }

                @keyframes fly-right-one {
                    0% {
                        transform: scale(0.3) translateX(-10vw);
                    }

                    10% {
                        transform: translateY(2vh) translateX(10vw) scale(0.4);
                    }

                    20% {
                        transform: translateY(0vh) translateX(30vw) scale(0.5);
                    }

                    30% {
                        transform: translateY(4vh) translateX(50vw) scale(0.6);
                    }

                    40% {
                        transform: translateY(2vh) translateX(70vw) scale(0.6);
                    }

                    50% {
                        transform: translateY(0vh) translateX(90vw) scale(0.6);
                    }

                    60% {
                        transform: translateY(0vh) translateX(110vw) scale(0.6);
                    }

                    100% {
                        transform: translateY(0vh) translateX(110vw) scale(0.6);
                    }
                }
                `}
            </style>
        </>
    );
}
