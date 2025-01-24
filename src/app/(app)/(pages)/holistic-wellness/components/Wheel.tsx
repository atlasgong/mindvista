import React from "react";
import { Slice } from "./Slice";

/**
 * props for the wheel component
 *
 * @param radius - size of the wheel
 * @param className - additional styling classes
 * @param sliceColors - array of colors for each slice
 * @param dimensions - array of wellness dimensions with title and description
 * @param activeIndex - index of the currently active slice
 * @param onSliceClick - handler for slice click events
 * @param onSliceHover - handler for slice hover events
 * @param isTouch - whether the device has touch capabilities
 */
interface WheelProps {
    radius?: number;
    className?: string;
    sliceColors?: string[];
    dimensions?: Array<{
        title: string;
        description: string;
        color: string;
    }>;
    activeIndex?: number | null;
    onSliceClick?: (index: number) => void;
    onSliceHover?: (index: number | null) => void;
    isTouch?: boolean;
}

/**
 * renders an interactive wheel with 8 slices representing wellness dimensions
 * handles both touch and mouse interactions for exploring wellness content
 */
export const Wheel: React.FC<WheelProps> = ({ radius = 200, className = "", sliceColors = Array(8).fill("#E5E7EB"), dimensions = [], activeIndex = null, onSliceClick, onSliceHover, isTouch = false }) => {
    // calculate view box size and center coordinates
    const viewBoxSize = radius * 2;
    const center = viewBoxSize / 2;
    const centerRadius = radius * 0.45;

    return (
        // SVG element with dynamic view box size and class name
        <svg width="100%" height="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className={className}>
            {/* drop shadow filter for center circle */}
            <defs>
                <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="2" dy="2" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* group element with translation to center coordinates */}
            <g transform={`translate(${center}, ${center})`}>
                {/* wheel slices */}
                {Array.from({ length: 8 }, (_, index) => (
                    <Slice key={index} index={index} radius={radius} color={sliceColors[index]} isActive={activeIndex === index} hasActiveSlice={activeIndex !== null} title={dimensions[index]?.title || ""} onClick={() => onSliceClick?.(index)} onMouseEnter={() => onSliceHover?.(index)} onMouseLeave={() => onSliceHover?.(null)} />
                ))}

                {/* center circle with content */}
                <g className={activeIndex !== null ? 'animate-gentle-pulse' : ''}>
                    <circle r={centerRadius} fill="white" className="drop-shadow-lg filter" filter="url(#dropShadow)" />
                    <foreignObject x={-centerRadius * 0.8} y={-centerRadius * 0.8} width={centerRadius * 1.6} height={centerRadius * 1.6}>
                        {activeIndex === null ? (
                            // default content when no slice is active
                            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full p-4 text-center">
                                <p className="font-medium text-black">{isTouch ? "Tap a section to learn more!" : "Hover over a section to learn more!"}</p>
                            </div>
                        ) : (
                            // content when a slice is active
                            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full p-4 text-center">
                                <p className="text-sm leading-snug text-black">{dimensions[activeIndex].description}</p>
                            </div>
                        )}
                    </foreignObject>
                </g>
            </g>
        </svg>
    );
};
