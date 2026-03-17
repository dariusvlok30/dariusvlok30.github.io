import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, Mail, Linkedin, MapPin } from "lucide-react";
import { personalInfo } from "../data/mock";
import { Warp } from "@paper-design/shaders-react";

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
        () => setText(isDeleting ? currentWord.substring(0, text.length - 1) : currentWord.substring(0, text.length + 1)),
        isDeleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return (
    <span className="font-mono">
      {text}
      <span className="animate-pulse text-white/40">|</span>
    </span>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Warp shader background */}
      <div className="absolute inset-0">
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.3}
          swirl={0.9}
          swirlIterations={12}
          shape="checks"
          shapeScale={0.12}
          scale={1}
          rotation={0}
          speed={0.6}
          colors={[
            "hsl(215, 96%, 6%)",
            "hsl(215, 80%, 18%)",
            "hsl(215, 60%, 4%)",
            "hsl(210, 90%, 12%)",
          ]}
        />
      </div>

      {/* Overlay to darken + blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]/80 pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-white/60 font-mono tracking-wider uppercase">Available for opportunities</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-tight mb-4 animate-fade-in-up animation-delay-100">
          {personalInfo.name}
        </h1>

        {/* Typewriter */}
        <div className="text-xl sm:text-2xl md:text-3xl text-white/50 mb-6 h-10 animate-fade-in-up animation-delay-200">
          <TypeWriter
            words={[
              "Full Stack AI Engineer",
              "Performance Optimizer",
              "Enterprise Solution Architect",
              "AI Agent Developer",
              "Automation Specialist",
              "AI-Augmented Developer",
            ]}
          />
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-white/35 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-300">
          {personalInfo.tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-400">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group px-6 py-3 rounded-full bg-white text-black font-medium text-sm flex items-center gap-2 hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            View Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="group px-6 py-3 rounded-full border border-white/20 text-white/70 font-medium text-sm flex items-center gap-2 backdrop-blur-sm hover:bg-white/[0.08] hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </div>

        {/* Location + socials */}
        <div className="flex items-center justify-center gap-6 text-white/30 text-sm animate-fade-in-up animation-delay-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {personalInfo.location}
          </span>
          <span className="w-px h-4 bg-white/15" />
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white/60 transition-colors duration-300"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up animation-delay-600">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/25 font-mono uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
