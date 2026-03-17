import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, Mail, Linkedin, MapPin } from "lucide-react";
import { personalInfo } from "../data/mock";
import { SplineScene } from "./ui/splite";

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
        () => {
          setText(
            isDeleting
              ? currentWord.substring(0, text.length - 1)
              : currentWord.substring(0, text.length + 1)
          );
        },
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
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Mouse-following radial glow */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.04), transparent 60%)`,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-white/[0.015] rounded-full blur-3xl animate-float-slower" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl animate-float-medium" />

      {/* Split layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-0 min-h-screen">

        {/* Left: Text content */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left pt-24 lg:pt-0">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-8 animate-fade-in-up self-center lg:self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/50 font-mono tracking-wider uppercase">
              Available for opportunities
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-4 animate-fade-in-up animation-delay-100">
            {personalInfo.name}
          </h1>

          {/* Typewriter title */}
          <div className="text-xl sm:text-2xl text-white/40 mb-6 h-10 animate-fade-in-up animation-delay-200">
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
          <p className="text-base text-white/30 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed animate-fade-in-up animation-delay-300">
            {personalInfo.tagline}
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12 animate-fade-in-up animation-delay-400">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group px-6 py-3 rounded-full bg-white text-black font-medium text-sm flex items-center gap-2 hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              View Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group px-6 py-3 rounded-full border border-white/10 text-white/70 font-medium text-sm flex items-center gap-2 hover:bg-white/[0.04] hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </div>

          {/* Location + socials */}
          <div className="flex items-center justify-center lg:justify-start gap-6 text-white/25 text-sm animate-fade-in-up animation-delay-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {personalInfo.location}
            </span>
            <span className="w-px h-4 bg-white/10" />
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white/50 transition-colors duration-300"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right: Spline 3D scene */}
        <div className="flex-1 w-full lg:w-auto h-[400px] lg:h-screen max-h-screen relative">
          <SplineScene
            scene="https://prod.spline.design/wvlNwYcDf2sXTRgg/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up animation-delay-600">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/20 font-mono uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
