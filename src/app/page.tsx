"use client";

import IntroAnimation from "@/components/ui/scroll-morph-hero";
import { RevealText } from "@/components/ui/reveal-text";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { ClipPathLinks } from "@/components/ui/clip-path-links";
import TextMarquee from "@/components/ui/text-marque";



export default function Home() {
  return (
    <main className="w-full bg-[#0a0a0a] text-white">
      {/* Section 1 & 2: Scroll Morph Hero */}
      {/* This component keeps itself sticky for 300vh scroll distance */}
      <IntroAnimation />

      {/* Section 3: Contact Me */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 relative z-10">
        <div className="max-w-3xl w-full space-y-16">
          <TextBlockAnimation blockColor="#6366f1" duration={0.8}>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight" style={{ color: '#d4ed31' }}>
              CONTACT ME
            </h2>
          </TextBlockAnimation>

          <div className="w-full max-w-2xl mx-auto mt-12">
            <ClipPathLinks />
          </div>
        </div>
      </section>

      {/* Section 4: Footer Marquee */}
      <footer className="w-full pb-20 overflow-hidden">
        <TextMarquee
          baseVelocity={-2}
          className="font-black tracking-tighter text-[#d4ed31] uppercase"
        >
          SADEW JAY • © 2026 • SADEW JAY • © 2026 •
        </TextMarquee>
        <TextMarquee
          baseVelocity={2}
          className="font-black tracking-tighter text-white uppercase"
        >
          EHENM KOLLO API GIYA • EHENM KOLLO API GIYA •
        </TextMarquee>
      </footer>
    </main>
  );
}
