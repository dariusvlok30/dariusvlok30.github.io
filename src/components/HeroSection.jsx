import React, { useState, useEffect } from "react";
import { ArrowDown, Mail, Linkedin, MapPin } from "lucide-react";
import { personalInfo } from "../data/mock";
import BlobReveal from "./BlobReveal";

/* ── Typewriter ─────────────────────────────────────────────────────────── */
const TypeWriter = ({ words, speed = 80, pause = 2000 }) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;
    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(
        () =>
          setText(
            isDeleting
              ? currentWord.substring(0, text.length - 1)
              : currentWord.substring(0, text.length + 1)
          ),
        isDeleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return (
    <span className="font-mono">
      {text}
      <span className="animate-pulse text-[#034694]">|</span>
    </span>
  );
};

/* ── Speed lines (teal, subtle) ─────────────────────────────────────────── */
const lines = Array.from({ length: 10 }, (_, i) => ({
  top: `${10 + i * 8}%`,
  delay: `${(i * 0.4).toFixed(2)}s`,
  duration: `${1.6 + (i % 4) * 0.35}s`,
  width: `${38 + (i % 5) * 14}px`,
  opacity: 0.18 + (i % 3) * 0.07,
}));

/* ── HeroSection ────────────────────────────────────────────────────────── */
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Subtle blue grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(3,70,148,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(3,70,148,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Speed lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {lines.map((l, i) => (
          <div
            key={i}
            className="absolute h-px"
            style={{
              top: l.top,
              width: l.width,
              opacity: l.opacity,
              background: "linear-gradient(to right, transparent, #034694, transparent)",
              animation: `hero-shoot ${l.duration} linear ${l.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-24 pb-16 lg:py-0">

          {/* ── Portrait (left on desktop, top on mobile) ── */}
          <div className="flex flex-col items-center order-first lg:order-none">
            {/* Glow halo */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(3,70,148,0.12) 0%, transparent 70%)",
                  transform: "scale(1.4)",
                  animation: "glow-pulse 3.5s ease-in-out infinite",
                }}
              />

              {/* Portrait frame */}
              <div
                className="relative rounded-lg overflow-hidden border border-[#034694]/15 shadow-2xl"
                style={{
                  width: 340,
                  height: 453,
                  boxShadow: "0 30px 80px rgba(3,70,148,0.12), 0 0 0 1px rgba(3,70,148,0.08)",
                  animation: "portrait-float 5s ease-in-out infinite",
                }}
              >
                <BlobReveal
                  baseImageUrl="/images/portrait-main.png"
                  revealImageUrl="/images/portrait-alt.png"
                  blobRadius={0.24}
                  fadeSpeed={2}
                />
              </div>

              {/* Hint label */}
              <p className="text-center mt-3 text-[10px] font-mono tracking-[0.2em] uppercase text-[#034694]/30">
                Move your mouse
              </p>
            </div>
          </div>

          {/* ── Text (right on desktop, bottom on mobile) ── */}
          <div className="flex flex-col gap-5 text-center lg:text-left">

            {/* Status badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#034694]/06 border border-[#034694]/20 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-[#034694]/70 font-mono tracking-wider uppercase">
                  Available for opportunities
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="animate-fade-in-up animation-delay-100">
              <p className="text-sm font-mono text-[#034694]/50 tracking-widest uppercase mb-1">
                Hi, I'm
              </p>
              <h1
                className="font-extrabold tracking-tight leading-[0.88]"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                  background: "linear-gradient(135deg, #0a0a0a 0%, #034694 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {personalInfo.name.toUpperCase()}
              </h1>
            </div>

            {/* Typewriter */}
            <div className="text-lg sm:text-xl text-gray-500 h-8 animate-fade-in-up animation-delay-200">
              <TypeWriter
                words={[
                  "Full Stack AI Engineer",
                  "Performance Optimizer",
                  "Enterprise Solution Architect",
                  "AI Agent Developer",
                  "Automation Specialist",
                ]}
              />
            </div>

            {/* Tagline */}
            <p
              className="text-sm sm:text-base text-gray-500 max-w-md mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-300 border-l-2 border-[#034694]/40 pl-4 text-left"
            >
              Racing through development with AI
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 animate-fade-in-up animation-delay-400">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group px-7 py-3.5 rounded-full bg-[#034694] text-white font-semibold text-sm flex items-center gap-2 hover:bg-[#034694]/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(3,70,148,0.25)]"
              >
                View Projects
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group px-7 py-3.5 rounded-full border border-[#034694]/30 text-[#034694]/80 font-medium text-sm flex items-center gap-2 bg-[#034694]/05 hover:bg-[#034694]/10 hover:border-[#034694]/50 hover:text-[#034694] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </div>

            {/* Location + LinkedIn */}
            <div className="flex items-center justify-center lg:justify-start gap-5 text-gray-400 text-sm animate-fade-in-up animation-delay-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#034694]/50" />
                {personalInfo.location}
              </span>
              <span className="w-px h-4 bg-gray-200" />
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#034694] transition-colors duration-300"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up animation-delay-600">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-[#034694]/30 font-mono uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#034694]/30 to-transparent animate-scroll-line" />
        </div>
      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes hero-shoot {
          0%   { transform: translateX(-120px); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(110vw); opacity: 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 1; transform: scale(1.4); }
          50%       { opacity: 0.6; transform: scale(1.55); }
        }
        @keyframes portrait-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
