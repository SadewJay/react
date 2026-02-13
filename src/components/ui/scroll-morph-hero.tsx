"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { FlipText } from "@/components/ui/flip-text";
import RainingLetters from "@/components/ui/modern-animated-hero-section";
import { MorphingTextReveal } from "@/components/ui/morphing-text-reveal";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
}: FlipCardProps) {
    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}

            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt="Cinematic Portfolio Art"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-900 flex flex-col items-center justify-center p-4 border border-gray-700"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    {/* <div className="text-center">
                        <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest mb-1">View</p>
                        <p className="text-xs font-medium text-white">Details</p>
                    </div> */}
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;

// Unsplash Images
const IMAGES = [
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/91w6mQshd_L._AC_UF1000_1000_QL80__t3spau.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952772/The_Amazing_Spider-Man_2_poster_pt4zgp.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952772/MV5BNDdmZGYwOWEtN2FkZC00Y2ExLWJkY2UtNzFlODVlNzc3MGIzXkEyXkFqcGc._V1_FMjpg_UX1000__hk0mse.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952772/MV5BOTU2YmM5ZjctOGVlMC00YTczLTljM2MtYjhlNGI5YWMyZjFkXkEyXkFqcGc._V1_FMjpg_UX1000__t8uatx.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/91oCE_ZchRL._AC_UF1000_1000_QL80__pwatrc.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/godfather-image_safpoe.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/aa9e025f30aea3e2039222dc489d4105ae3772ee_ez1ess.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/91w6mQshd_L._AC_UF1000_1000_QL80__t3spau.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952772/The_Amazing_Spider-Man_2_poster_pt4zgp.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952772/MV5BNDdmZGYwOWEtN2FkZC00Y2ExLWJkY2UtNzFlODVlNzc3MGIzXkEyXkFqcGc._V1_FMjpg_UX1000__hk0mse.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952772/MV5BOTU2YmM5ZjctOGVlMC00YTczLTljM2MtYjhlNGI5YWMyZjFkXkEyXkFqcGc._V1_FMjpg_UX1000__t8uatx.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/91oCE_ZchRL._AC_UF1000_1000_QL80__pwatrc.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/godfather-image_safpoe.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/aa9e025f30aea3e2039222dc489d4105ae3772ee_ez1ess.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/91w6mQshd_L._AC_UF1000_1000_QL80__t3spau.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952772/The_Amazing_Spider-Man_2_poster_pt4zgp.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952772/MV5BNDdmZGYwOWEtN2FkZC00Y2ExLWJkY2UtNzFlODVlNzc3MGIzXkEyXkFqcGc._V1_FMjpg_UX1000__hk0mse.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952772/MV5BOTU2YmM5ZjctOGVlMC00YTczLTljM2MtYjhlNGI5YWMyZjFkXkEyXkFqcGc._V1_FMjpg_UX1000__t8uatx.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/91oCE_ZchRL._AC_UF1000_1000_QL80__pwatrc.jpg",
    "https://res.cloudinary.com/duuvpjlzd/image/upload/v1770952771/godfather-image_safpoe.jpg",
];

const QUOTES = [
    { text: "May the Force be with you.", author: "Han Solo (Star Wars)" },
    { text: "I'm going to make him an offer he can't refuse.", author: "Vito Corleone (The Godfather)" },
    { text: "Simply lovely.", author: "Max Verstappen" },
    { text: "Carpe diem. Seize the day, boys.", author: "John Keating (Dead Poets Society)" },
    { text: "To infinity and beyond!", author: "Buzz Lightyear (Toy Story)" },
    { text: "Life moves pretty fast.", author: "Ferris Bueller (Ferris Bueller's Day Off)" },
    { text: "Loyalty is a two-way street. If I ask for it from you, then you're getting it from me.", author: "Harvey Specter (Suits)" },
    { text: "Whatever you do in this life, it's not legendary, unless your friends are there to see it.", author: "Barney Stinson (How I Met Your Mother)" },
    { text: "The name's Bond, James Bond.", author: "James Bond (Dr. No)" },
    { text: "I'll be back.", author: "The Terminator (The Terminator)" },
    { text: "Elementary, my dear Watson.", author: "Sherlock Holmes" }
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        // We need the viewport size for calculations, but the sticky container size for scroll
        const updateSize = () => {
            setContainerSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // --- Native Scroll Logic (useScroll) ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    // Mapped to the first 20% of the scroll section
    const morphProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation (Shuffling): Starts after morph
    // Mapped to the rest of the scroll section
    const scrollRotate = useTransform(scrollYProgress, [0.2, 1], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    // (Simpler implementation needed for sticky context)
    const [mouseX, setMouseX] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            setMouseX(normalizedX * 100);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter Positions ---
    const [scatterPositions, setScatterPositions] = useState(
        IMAGES.map(() => ({ x: 0, y: 0, rotation: 0, scale: 0.6, opacity: 0 }))
    );

    useEffect(() => {
        setScatterPositions(
            IMAGES.map(() => ({
                x: (Math.random() - 0.5) * 1500,
                y: (Math.random() - 0.5) * 1000,
                rotation: (Math.random() - 0.5) * 180,
                scale: 0.6,
                opacity: 0,
            }))
        );
    }, []);

    // --- Render Loop ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);

    useMotionValueEvent(smoothMorph, "change", (latest) => setMorphValue(latest));
    useMotionValueEvent(smoothScrollRotate, "change", (latest) => setRotateValue(latest));

    // --- Content Opacity ---
    // Fade in content when arc is formed (morphValue > 0.8)
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        // This container creates the scroll space (e.g. 300vh)
        <div ref={containerRef} className="relative h-[300vh] w-full">

            {/* Sticky Viewport: Remains fixed while we scroll through the 300vh container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent">

                {/* 3D Scene Container */}
                <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                    {/* Intro Text (Fades out) */}
                    <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                            transition={{ duration: 1 }}
                        >
                            <FlipText
                                word="WELCOME"
                                duration={0.5}
                                delayMultiple={0.08}
                                className="text-2xl font-medium tracking-tight text-white md:text-4xl"
                            />
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-400" // Changed text color to gray-400
                        >
                            TO MY WORLD
                        </motion.p>
                    </div>

                    {/* Arc Active Content (Fades in) */}
                    <motion.div
                        style={{ opacity: contentOpacity, y: contentY }}
                        className="absolute inset-0 z-10 pointer-events-none bg-transparent flex flex-col items-center justify-center"
                    >
                        <div className="absolute inset-0 z-0">
                            <RainingLetters />
                        </div>
                        <div className="z-10 bg-transparent flex flex-col items-center justify-center">
                            <MorphingTextReveal
                                texts={QUOTES}
                                className="text-xl md:text-3xl font-light text-white"
                                interval={5000}
                            />
                        </div>
                    </motion.div>

                    {/* Image Cards */}
                    <div className="relative flex items-center justify-center w-full h-full">
                        {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                            // 1. Intro Phases (Scatter -> Line)
                            if (introPhase === "scatter") {
                                target = scatterPositions[i];
                            } else if (introPhase === "line") {
                                const lineSpacing = 70;
                                const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                                const lineX = i * lineSpacing - lineTotalWidth / 2;
                                target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                            } else {
                                // 2. Circle Phase & Morph Logic
                                const isMobile = containerSize.width < 768;
                                const minDimension = Math.min(containerSize.width, containerSize.height);

                                // A. Calculate Circle Position
                                const circleRadius = Math.min(minDimension * 0.35, 350);
                                const circleAngle = (i / TOTAL_IMAGES) * 360;
                                const circleRad = (circleAngle * Math.PI) / 180;
                                const circlePos = {
                                    x: Math.cos(circleRad) * circleRadius,
                                    y: Math.sin(circleRad) * circleRadius,
                                    rotation: circleAngle + 90,
                                };

                                // B. Calculate Bottom Arc Position
                                const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                                const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                                const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                                const arcCenterY = arcApexY + arcRadius;
                                const spreadAngle = isMobile ? 100 : 130;
                                const startAngle = -90 - (spreadAngle / 2);
                                const step = spreadAngle / (TOTAL_IMAGES - 1);

                                // Scroll Rotation Logic
                                const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                                const maxRotation = spreadAngle * 0.8;
                                const boundedRotation = -scrollProgress * maxRotation;

                                const currentArcAngle = startAngle + (i * step) + boundedRotation;
                                const arcRad = (currentArcAngle * Math.PI) / 180;

                                const arcPos = {
                                    x: Math.cos(arcRad) * arcRadius + mouseX,
                                    y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                    rotation: currentArcAngle + 90,
                                    scale: isMobile ? 1.4 : 1.8,
                                };

                                // C. Interpolate (Morph)
                                target = {
                                    x: lerp(circlePos.x, arcPos.x, morphValue),
                                    y: lerp(circlePos.y, arcPos.y, morphValue),
                                    rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                    scale: lerp(1, arcPos.scale, morphValue),
                                    opacity: 1,
                                };
                            }

                            return (
                                <FlipCard
                                    key={i}
                                    src={src}
                                    index={i}
                                    total={TOTAL_IMAGES}
                                    phase={introPhase} // Pass intro phase for initial animations
                                    target={target}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
