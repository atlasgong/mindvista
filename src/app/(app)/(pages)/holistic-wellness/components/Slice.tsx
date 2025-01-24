import colors from "tailwindcss/colors";

/**
 * props for the slice component
 *
 * @param index - the index of the slice (0-7)
 * @param radius - the radius of the slice
 * @param color - the color of the slice (optional)
 * @param className - additional class names for the slice (optional)
 * @param isActive - whether the slice is active (optional)
 * @param hasActiveSlice - whether there is an active slice (optional)
 * @param title - the title of the slice (optional)
 * @param onClick - the click handler for the slice (optional)
 * @param onMouseEnter - the mouse enter handler for the slice (optional)
 * @param onMouseLeave - the mouse leave handler for the slice (optional)
 */
interface SliceProps {
    index: number; // 0-7, representing which slice this is
    radius: number;
    color?: string;
    className?: string;
    isActive?: boolean;
    hasActiveSlice?: boolean;
    title?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

/**
 * represents a single slice of the wellness wheel
 * handles geometry calculations and interactions for the slice shape
 */
export const Slice: React.FC<SliceProps> = ({ index, radius, color = "gray-200", className = "", isActive = false, hasActiveSlice = false, title = "", onClick, onMouseEnter, onMouseLeave }) => {
    // calculate angles for the slice (45 degrees or π/4 radians per slice)
    const startAngle = (index * Math.PI) / 4;
    const endAngle = ((index + 1) * Math.PI) / 4;
    const midAngle = (startAngle + endAngle) / 2;

    // define inner and outer radius to create donut shape
    const innerRadius = radius * 0.45;
    const outerRadius = radius;

    // calculate coordinates for the slice path
    const startX = Math.cos(startAngle);
    const startY = Math.sin(startAngle);
    const endX = Math.cos(endAngle);
    const endY = Math.sin(endAngle);

    const outerStartX = startX * outerRadius;
    const outerStartY = startY * outerRadius;
    const outerEndX = endX * outerRadius;
    const outerEndY = endY * outerRadius;

    const innerStartX = startX * innerRadius;
    const innerStartY = startY * innerRadius;
    const innerEndX = endX * innerRadius;
    const innerEndY = endY * innerRadius;

    // create SVG path using arc commands
    const pathData = `
    M ${innerStartX} ${innerStartY}
    L ${outerStartX} ${outerStartY}
    A ${outerRadius} ${outerRadius} 0 0 1 ${outerEndX} ${outerEndY}
    L ${innerEndX} ${innerEndY}
    A ${innerRadius} ${innerRadius} 0 0 0 ${innerStartX} ${innerStartY}
  `;

    // position text in middle of slice radius
    const textRadius = (innerRadius + outerRadius) * 0.5;
    const textX = Math.cos(midAngle) * textRadius;
    const textY = Math.sin(midAngle) * textRadius;

    // rotate text based on angle to ensure readability
    const textRotation = (midAngle * 180) / Math.PI;
    const adjustedRotation = textRotation > 90 && textRotation < 270 ? textRotation + 180 : textRotation;

    // calculate text opacity from active state
    const textOpacity = hasActiveSlice && !isActive ? 0.3 : 1;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick?.();
    };

    // helper function to get color values from Tailwind's color palette
    const getColorValue = (colorName: string) => {
        const [color, shade = "500"] = colorName.split("-");
        return colors[color as keyof typeof colors]?.[shade as keyof (typeof colors)[keyof typeof colors]] || colorName;
    };

    return (
        // group element for slice
        <g className="transition-transform duration-300" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={handleClick}>
            {/* slice path */}
            <path
                d={pathData}
                className={`${className} cursor-pointer transition-all duration-300 hover:brightness-110`}
                style={{
                    fill: getColorValue(color),
                    transition: "all 0.3s ease",
                }}
            />
            {/* overlay for dimming non-active slices */}
            {hasActiveSlice && !isActive && <path d={pathData} fill="black" className="pointer-events-none" style={{ opacity: 0.5 }} />}
            {/* text element */}
            <text x={textX} y={textY} textAnchor="middle" transform={`rotate(${adjustedRotation}, ${textX}, ${textY})`} className="pointer-events-none select-none text-sm font-medium" style={{ opacity: textOpacity }} fill="white">
                {title}
            </text>
        </g>
    );
};
