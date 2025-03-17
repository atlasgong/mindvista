"use client";

import { ComponentProps, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import NextImage from "next/image";

type ImageProps = ComponentProps<typeof NextImage>;

export default function Image(props: ImageProps) {
    const [loading, setLoading] = useState(true);

    function onLoad() {
        setLoading(false);
    }

    return (
        <div className="relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <ThreeCircles visible={loading} color="#516de4" height="80" width="80" ariaLabel="grid-loading" />
                </div>
            )}
            <NextImage
                {...props}
                onLoad={onLoad}
                style={{
                    ...props.style,
                    opacity: loading ? 0 : 1,
                    transition: "opacity 0.2s",
                }}
            />
        </div>
    );
}
