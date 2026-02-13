"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface MorphingTextRevealProps {
    texts: { text: string; author: string }[]
    className?: string
    interval?: number
    glitchOnHover?: boolean
}

export function MorphingTextReveal({
    texts,
    className,
    interval = 5000,
    glitchOnHover = true,
}: MorphingTextRevealProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [displayText, setDisplayText] = useState("")
    const [isAnimating, setIsAnimating] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const morphToNext = useCallback(() => {
        if (isAnimating) return

        setIsAnimating(true)
        const currentText = texts[currentIndex].text
        const nextIndex = (currentIndex + 1) % texts.length
        const nextText = texts[nextIndex].text

        // Determine the longer text for animation
        const maxLength = Math.max(currentText.length, nextText.length)

        // Animate character by character
        let step = 0
        const animateStep = () => {
            if (step <= maxLength) {
                let newText = ""

                for (let i = 0; i < maxLength; i++) {
                    if (i < step) {
                        // Show next character
                        newText += nextText[i] || ""
                    } else if (i < currentText.length) {
                        // Show current character with random glitch
                        const shouldGlitch = Math.random() > 0.7
                        newText += shouldGlitch ? getRandomChar() : currentText[i]
                    }
                }

                setDisplayText(newText)
                step++
                setTimeout(animateStep, 80)
            } else {
                setDisplayText(nextText)
                setCurrentIndex(nextIndex)
                setIsAnimating(false)
            }
        }

        animateStep()
    }, [currentIndex, texts, isAnimating])

    const getRandomChar = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
        return chars[Math.floor(Math.random() * chars.length)]
    }

    useEffect(() => {
        if (texts.length === 0) return
        setDisplayText(texts[0].text)
    }, [texts])

    useEffect(() => {
        if (texts.length <= 1) return

        const timer = setInterval(morphToNext, interval)
        return () => clearInterval(timer)
    }, [morphToNext, interval, texts.length])

    const handleMouseEnter = () => {
        if (glitchOnHover) {
            setIsHovered(true)
            setTimeout(() => setIsHovered(false), 300)
        }
    }

    if (texts.length === 0) return null

    return (
        <div className={cn("flex flex-col items-center justify-center text-center", className)} onMouseEnter={handleMouseEnter}>
            <div className="relative inline-block cursor-pointer select-none">
                <span className="text-white/50 mr-2 text-4xl">"</span>
                <span
                    className={cn(
                        "font-mono text-foreground transition-all duration-300",
                        isHovered && glitchOnHover && "glitch-effect",
                        "hover:text-primary",
                    )}
                    style={{
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "0.05em",
                    }}
                >
                    {displayText.split("").map((char, index) => (
                        <span
                            key={`${currentIndex}-${index}`}
                            className={cn(
                                "inline-block",
                                char === " " ? "whitespace-pre" : "", // Preserve space width
                                isAnimating && "morph-char"
                            )}
                            style={{
                                animationDelay: `${index * 35}ms`,
                            }}
                            suppressHydrationWarning
                        >
                            {char}
                        </span>
                    ))}
                </span>
                <span className="text-white/50 ml-2 text-4xl">"</span>

                {/* Cursor indicator */}
                <span
                    className={cn(
                        "inline-block w-0.5 h-[1em] bg-primary ml-1 transition-opacity duration-500 align-middle",
                        isAnimating ? "opacity-100" : "opacity-30",
                    )}
                    style={{
                        animation: "pulse 2s ease-in-out infinite",
                    }}
                />
            </div>

            <div
                className={cn(
                    "mt-4 text-base md:text-xl font-light tracking-widest text-white/60 uppercase transition-opacity duration-500",
                    isAnimating ? "opacity-0" : "opacity-100"
                )}
            >
                — {texts[currentIndex].author}
            </div>
        </div>
    )
}
