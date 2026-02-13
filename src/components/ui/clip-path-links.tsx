"use client";

import React, { useState } from "react";
import {
    Instagram,
    Facebook,
    Linkedin,
    Mail,
    Check,
} from "lucide-react";
import { FaDiscord, FaSteam } from "react-icons/fa";
import { useAnimate, motion, AnimatePresence } from "framer-motion";

export const ClipPathLinks = () => {
    const [showToast, setShowToast] = useState(false);

    const copyDiscordId = () => {
        navigator.clipboard.writeText("sadew_jay");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <div className="relative divide-y border divide-neutral-700 border-neutral-700">
            <div className="grid grid-cols-2 divide-x divide-neutral-700">
                <LinkBox Icon={Mail} href="mailto:sadewprabuddha52@gmail.com" />
                <LinkBox Icon={FaDiscord} href="#" onClick={copyDiscordId} />
            </div>
            <div className="grid grid-cols-4 divide-x divide-neutral-700">
                <LinkBox Icon={FaSteam} href="https://steamcommunity.com/id/sadewjay/" />
                <LinkBox Icon={Linkedin} href="https://www.linkedin.com/in/sadew-jay-a24068307/" />
                <LinkBox Icon={Instagram} href="https://www.instagram.com/sadew_jayawardhana/" />
                <LinkBox Icon={Facebook} href="https://www.facebook.com/SadewJayawardhanaii/" />
            </div>

            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        className="absolute -top-16 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#d4ed31] text-black px-4 py-2 rounded-full font-bold shadow-lg z-50 whitespace-nowrap"
                    >
                        <Check size={18} />
                        <span>Discord ID Copied!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
    left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
    left: [NO_CLIP, TOP_RIGHT_CLIP],
    bottom: [NO_CLIP, TOP_RIGHT_CLIP],
    top: [NO_CLIP, TOP_RIGHT_CLIP],
    right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

interface LinkBoxProps {
    Icon: React.ElementType;
    href: string;
    imgSrc?: string;
    className?: string;
    onClick?: () => void;
}

const LinkBox = ({ Icon, href, imgSrc, className, onClick }: LinkBoxProps) => {
    const [scope, animate] = useAnimate();

    const getNearestSide = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const box = e.currentTarget.getBoundingClientRect();

        const proximityToLeft = {
            proximity: Math.abs(box.left - e.clientX),
            side: "left" as const,
        };
        const proximityToRight = {
            proximity: Math.abs(box.right - e.clientX),
            side: "right" as const,
        };
        const proximityToTop = {
            proximity: Math.abs(box.top - e.clientY),
            side: "top" as const,
        };
        const proximityToBottom = {
            proximity: Math.abs(box.bottom - e.clientY),
            side: "bottom" as const,
        };

        const sortedProximity = [
            proximityToLeft,
            proximityToRight,
            proximityToTop,
            proximityToBottom,
        ].sort((a, b) => a.proximity - b.proximity);

        return sortedProximity[0].side;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const side = getNearestSide(e);
        animate(scope.current, {
            clipPath: ENTRANCE_KEYFRAMES[side],
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const side = getNearestSide(e);
        animate(scope.current, {
            clipPath: EXIT_KEYFRAMES[side],
        });
    };

    return (
        <a
            href={href}
            target={onClick ? undefined : "_blank"}
            rel={onClick ? undefined : "noopener noreferrer"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();
                    onClick();
                }
            }}
            className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 text-white bg-[#0a0a0a] cursor-pointer"
        >
            {imgSrc ? (
                <img
                    src={imgSrc}
                    alt="custom icon"
                    className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
                />
            ) : (
                <Icon className="text-xl sm:text-3xl md:text-4xl" />
            )}

            <div
                ref={scope}
                style={{ clipPath: BOTTOM_RIGHT_CLIP }}
                className="absolute inset-0 grid place-content-center bg-[#d4ed31] text-black transition-colors duration-300"
            >
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt="custom icon hover"
                        className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
                    />
                ) : (
                    <Icon className="text-xl sm:text-3xl md:text-4xl" />
                )}
            </div>
        </a>
    );
};
