"use client";

import { useState } from "react";
import Image from "@/app/(app)/components/Image";
import { FiX } from "react-icons/fi";

interface ImageModalProps {
    url: string;
    altText: string;
    width?: number;
    height?: number;
    className?: string;
}

export default function ImageModal({ url, altText, width = 1000, height = 1000, className = "" }: ImageModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className={`relative cursor-pointer ${className}`}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                if ((e.target as HTMLElement).tagName === "IMG") {
                    setIsModalOpen(true);
                }
            }}
        >
            {/* Regular Image */}
            <Image src={url} alt={altText} width={width} height={height} className="mx-auto max-h-[40vh] min-h-[10vh] w-auto rounded-lg object-contain md:max-h-[50vh] lg:max-h-[60vh] xl:max-h-[70vh]" />
            <p className="mt-2 text-center text-sm text-cTextOffset md:px-[4vw] lg:px-[7vw]">{altText}</p>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setIsModalOpen(false)}>
                    <div className="relative max-h-[90vh] max-w-[90vw]">
                        <button
                            className="absolute -right-4 -top-4 rounded-full bg-cBackground p-2 text-cText shadow-lg hover:bg-cBackgroundOffset"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(false);
                            }}
                        >
                            <FiX className="h-6 w-6" />
                        </button>
                        <Image src={url} alt={altText} width={width} height={height} className="mx-auto max-h-[85vh] w-auto rounded-lg object-contain" />
                        <p className="mt-4 px-[7vw] text-center text-white md:px-[15vw] lg:px-[25vw]">{altText}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
