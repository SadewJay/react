"use client";

import { RevealText } from "@/components/ui/reveal-text";

export default function ThingsILikePage() {
    return (
        // Top middle positioning: justify-start + pt-24 (padding top)
        <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-start pt-24 overflow-hidden">
            <RevealText
                text="things i like to do"
                textColor="text-white"
                overlayColor="text-red-500"
                fontSize="text-4xl md:text-7xl" // Scaled down for length
                letterDelay={0.05}
                overlayDelay={0.05}
                overlayDuration={0.4}
                springDuration={600}
            />
        </div>
    );
}
