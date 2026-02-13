"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface RevealTextProps {
    text?: string;
    textColor?: string;
    overlayColor?: string;
    fontSize?: string;
    letterDelay?: number;
    overlayDelay?: number;
    overlayDuration?: number;
    springDuration?: number;
    letterImages?: string[];
}

export function RevealText({
    text = "STUNNING",
    textColor = "text-white",
    overlayColor = "text-red-500",
    fontSize = "text-[250px]",
    letterDelay = 0.08,
    overlayDelay = 0.05,
    overlayDuration = 0.4,
    springDuration = 600,
    letterImages = [
        "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770930509/red-bull-rb18-red-bull-racing-rb18-2022-formula-one-world-5485x3657-9060_xd6olo.avif",
        "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770930509/red-bull-rb18-red-bull-racing-rb18-2022-formula-one-world-5485x3657-9060_xd6olo.avif",
        "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770930509/red-bull-rb18-red-bull-racing-rb18-2022-formula-one-world-5485x3657-9060_xd6olo.avif",
        "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770930509/red-bull-rb18-red-bull-racing-rb18-2022-formula-one-world-5485x3657-9060_xd6olo.avif",
        "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770930509/red-bull-rb18-red-bull-racing-rb18-2022-formula-one-world-5485x3657-9060_xd6olo.avif",
        "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770930509/red-bull-rb18-red-bull-racing-rb18-2022-formula-one-world-5485x3657-9060_xd6olo.avif",
        "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770930509/red-bull-rb18-red-bull-racing-rb18-2022-formula-one-world-5485x3657-9060_xd6olo.avif",
        "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770930509/red-bull-rb18-red-bull-racing-rb18-2022-formula-one-world-5485x3657-9060_xd6olo.avif",
    ]
}: RevealTextProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showRedText, setShowRedText] = useState(false);

    useEffect(() => {
        // Calculate when the last letter animation completes
        // Last letter starts at (text.length - 1) * letterDelay seconds
        // Add springDuration for the spring animation to settle
        const lastLetterDelay = (text.length - 1) * letterDelay;
        const totalDelay = (lastLetterDelay * 1000) + springDuration;

        const timer = setTimeout(() => {
            setShowRedText(true);
        }, totalDelay);

        return () => clearTimeout(timer);
    }, [text.length, letterDelay, springDuration]);

    return (
        <div className="flex items-center justify-center relative">
            <div className="flex flex-wrap justify-center">
                {text.split("").map((letter, index) => (
                    <motion.span
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`${fontSize} font-black tracking-tight cursor-pointer relative overflow-hidden whitespace-pre`}
                        initial={{
                            scale: 0,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        transition={{
                            delay: index * letterDelay,
                            type: "spring",
                            damping: 8,
                            stiffness: 200,
                            mass: 0.8,
                        }}
                    >
                        {/* Base text layer */}
                        <motion.span
                            className={`absolute inset-0 ${textColor}`}
                            animate={{
                                opacity: hoveredIndex === index ? 0 : 1
                            }}
                            transition={{ duration: 0.1 }}
                            suppressHydrationWarning
                        >
                            {letter}
                        </motion.span>
                        {/* Image text layer with background panning */}
                        <motion.span
                            className="text-transparent bg-clip-text bg-cover bg-no-repeat"
                            animate={{
                                opacity: hoveredIndex === index ? 1 : 0,
                                backgroundPosition: hoveredIndex === index ? "10% center" : "0% center"
                            }}
                            transition={{
                                opacity: { duration: 0.1 },
                                backgroundPosition: {
                                    duration: 3,
                                    ease: "easeInOut"
                                }
                            }}
                            style={{
                                backgroundImage: `url('${letterImages[index % letterImages.length]}')`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                            suppressHydrationWarning
                        >
                            {letter}
                        </motion.span>

                        {/* Overlay text layer that sweeps across each letter */}
                        {showRedText && (
                            <motion.span
                                className={`absolute inset-0 ${overlayColor} pointer-events-none`}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 1, 0]
                                }}
                                transition={{
                                    delay: index * overlayDelay,
                                    duration: overlayDuration,
                                    times: [0, 0.1, 0.7, 1],
                                    ease: "easeInOut"
                                }}
                                suppressHydrationWarning
                            >
                                {letter}
                            </motion.span>
                        )}
                    </motion.span>
                ))}
            </div>
        </div>
    );
}
