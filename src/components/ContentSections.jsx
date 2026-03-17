import React, { useEffect, useRef, useState } from "react";
import {
  Code2, Brain, Server, Database, Workflow, Layout,
  Gauge, Lightbulb, Layers, Sparkles, TrendingUp, BookOpen,
  BarChart3, Bot, Shield, Zap, Globe,
  Mail, MessageCircle, Linkedin, MapPin, ArrowUpRight,
  GraduationCap, Terminal, Heart,
  Monitor, Cog,
} from "lucide-react";
import { SplineScene } from "./ui/splite";
import { Spotlight } from "./ui/spotlight";
import { GlowingEffect } from "./ui/glowing-effect";
import { useMotionValue, useMotionTemplate, motion } from "motion/react";
import { Badge } from "../components/ui/badge";
import { personalInfo, skills, experience, projects, education, differentiators, videoDemos } from "../data/mock";

const iconMap = {
  Code2, Brain, Server, Database, Workflow, Layout,
  Gauge, Lightbulb, Layers, Sparkles, TrendingUp, BookOpen,
  BarChart3, Bot, Shield, Zap, Globe,
};

/* ---------- Scroll Reveal Hook ---------- */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* Chelsea blue corner decorator */
const CardDecorator = () => (
  <>
    <span className="absolute -left-px -top-px block size-2.5 border-l-2 border-t-2 border-[#034694] rounded-tl-sm z-10" />
    <span className="absolute -right-px -top-px block size-2.5 border-r-2 border-t-2 border-[#034694] rounded-tr-sm z-10" />
    <span className="absolute -bottom-px -left-px block size-2.5 border-b-2 border-l-2 border-[#034694] rounded-bl-sm z-10" />
    <span className="absolute -bottom-px -right-px block size-2.5 border-b-2 border-r-2 border-[#034694] rounded-br-sm z-10" />
  </>
);

/* Subtle Chelsea blue spotlight that follows the mouse — never obscures text */
const CardShimmer = ({ mouseX, mouseY }) => {
  const maskImage = useMotionTemplate`radial-gradient(220px at ${mouseX}px ${mouseY}px, rgba(3,70,148,0.18), transparent)`;
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover/card:opacity-100"
      style={{ background: maskImage }}
    />
  );
};

const GlassCard = ({ children, className = "", hover = true }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className={`group/card relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl overflow-hidden ${
        hover ? "hover:border-[#034694]/30 hover:shadow-[0_8px_40px_rgba(3,70,148,0.07)] transition-all duration-500" : ""
      } ${className}`}
    >
      <GlowingEffect disabled={false} spread={30} proximity={60} borderWidth={1.5} />
      <CardDecorator />
      <CardShimmer mouseX={mouseX} mouseY={mouseY} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const SectionHeading = ({ label, title, subtitle }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <span className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-white/30 mb-3 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">{title}</h2>
      {subtitle && <p className="text-white/30 max-w-xl text-base leading-relaxed">{subtitle}</p>}
    </div>
  );
};

/* ============ ABOUT + AI (combined) ============ */
const aiTools = [
  { name: "Claude Code", desc: "Autonomous CLI agent — scaffolds, refactors, debugs entire codebases" },
  { name: "Claude in VS Code", desc: "Inline AI pair-programming directly inside the editor" },
  { name: "Claude API", desc: "Custom AI agents, pipelines, and intelligent automations" },
  { name: "AI Workflows", desc: "End-to-end automated development & deployment pipelines" },
];

export const AboutSection = () => {
  const [statsRef, statsVisible] = useReveal();
  const [diffRef, diffVisible] = useReveal();

  return (
    <section id="about">

      {/* ── AI HERO BLOCK (full screen) ── */}
      <div className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden border-b border-white/[0.04]">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ background: "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(3,70,148,0.14), transparent)" }} className="absolute inset-0" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="white" />

        {/* Left — content */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-32 pb-16 lg:py-0 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#034694]/20 border border-[#034694]/30 mb-8 w-fit">
            <Bot className="w-3.5 h-3.5 text-[#4a90d9]" />
            <span className="text-xs text-[#4a90d9] font-mono tracking-wider uppercase">AI-First Engineer</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Built with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#4a90d9]">
              Intelligent Tools
            </span>
          </h2>

          <p className="text-white/40 text-base leading-relaxed mb-10 max-w-lg">
            {personalInfo.summary}
          </p>

          {/* AI tools grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                className="relative p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-[#034694]/10 hover:border-[#034694]/30 transition-all duration-300"
              >
                <CardDecorator />
                <span className="text-sm font-semibold text-white/80 block mb-1">{tool.name}</span>
                <span className="text-xs text-white/30 leading-relaxed">{tool.desc}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div
            ref={statsRef}
            className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {personalInfo.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Spline robot full height */}
        <div className="flex-1 relative min-h-[50vh] lg:min-h-screen">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* ── DIFFERENTIATORS ── */}
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="01 — About" title="Why I'm Different" subtitle="What sets my approach to engineering apart." />
          <div
            ref={diffRef}
            className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${diffVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {differentiators.map((item, i) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <GlassCard key={i} className="p-6 group" evervault={false}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#034694]/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#4a90d9]/60 group-hover:text-[#4a90d9] transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white/80 mb-1.5">{item.title}</h4>
                      <p className="text-xs text-white/30 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};

/* ============ SKILLS ============ */
export const SkillsSection = () => {
  const [ref, visible] = useReveal();
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="02 — Skills" title="Tech Arsenal" subtitle="Tools and technologies I work with daily to build production systems." />

        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {skills.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Code2;
            return (
              <GlassCard key={i} className="p-6 group">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center group-hover:bg-[#034694]/20 transition-colors duration-300">
                    <Icon className="w-4 h-4 text-[#4a90d9]/60 group-hover:text-[#4a90d9] transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-white/70">{cat.name}</h3>
                </div>
                <div className="space-y-3">
                  {cat.items.map((skill, j) => (
                    <div key={j}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/40 font-mono">{skill.name}</span>
                        <span className="text-white/20">{skill.level}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#034694] to-[#2468c0] transition-all duration-1000 ease-out"
                          style={{ width: visible ? `${skill.level}%` : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Tool tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {skills.tools.map((tool, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-xs font-mono text-white/30 border border-white/[0.06] rounded-full bg-white/[0.01] hover:bg-white/[0.04] hover:text-white/50 hover:border-white/[0.1] transition-all duration-300 cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============ EXPERIENCE ============ */
export const ExperienceSection = () => {
  const [ref, visible] = useReveal();
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="03 — Experience" title="Where I've Built" subtitle="Enterprise AI solutions and production systems." />

        {experience.map((exp, idx) => (
          <div key={idx} ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <GlassCard hover={false} className="p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.company}</h3>
                  <p className="text-sm text-white/40">{exp.role}</p>
                </div>
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <Badge variant="outline" className="text-white/40 border-white/10 bg-white/[0.02] rounded-full text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {exp.location}
                  </Badge>
                  <Badge variant="outline" className="text-emerald-400/70 border-emerald-400/20 bg-emerald-400/[0.04] rounded-full text-xs">
                    {exp.period}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-white/30 mb-8 leading-relaxed">{exp.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                {exp.achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 group"
                  >
                    <h4 className="text-sm font-semibold text-white/70 mb-2 group-hover:text-white/90 transition-colors duration-300">
                      {ach.title}
                    </h4>
                    <p className="text-xs text-white/25 leading-relaxed mb-3">{ach.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ach.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-0.5 text-[10px] font-mono text-white/25 bg-white/[0.03] border border-white/[0.04] rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ============ PROJECTS ============ */
export const ProjectsSection = () => {
  const [ref, visible] = useReveal();
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="04 — Projects" title="What I've Built" subtitle="From enterprise AI systems to internal tools and academic deep-dives." />

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {projects.map((proj, i) => {
            const Icon = iconMap[proj.icon] || Zap;
            return (
              <GlassCard
                key={i}
                className={`p-7 group relative overflow-hidden ${
                  proj.highlight ? "md:col-span-2 border-white/[0.1]" : ""
                }`}
              >
                {proj.highlight && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                )}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className={`rounded-full text-[10px] font-mono ${
                        proj.status === "In Development"
                          ? "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]"
                          : proj.status === "Production"
                          ? "text-emerald-400/70 border-emerald-400/20 bg-emerald-400/[0.04]"
                          : "text-white/40 border-white/10 bg-white/[0.02]"
                      }`}
                    >
                      {proj.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-white/80 mb-2 group-hover:text-white transition-colors duration-300">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-white/25 leading-relaxed mb-5">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag, j) => (
                      <span key={j} className="px-2.5 py-1 text-[10px] font-mono text-white/30 bg-white/[0.03] border border-white/[0.05] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============ DEMOS ON REQUEST ============ */
const categoryIcons = {
  Platform: Monitor,
  Authentication: Globe,
  "AI Agents": Bot,
  Automation: Cog,
};

export const VideoDemosSection = () => {
  const [ref, visible] = useReveal();
  return (
    <section id="demos" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="05 — Demos"
          title="Work Samples"
          subtitle="I'll happily show snapshots or videos of my work upon request — platforms, AI agents, automation workflows, and more."
        />

        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Request card */}
          <GlassCard hover={false} className="p-10 mb-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-6">
              <Mail className="w-7 h-7 text-white/30" />
            </div>
            <h3 className="text-xl font-bold text-white/80 mb-3">Available Upon Request</h3>
            <p className="text-sm text-white/30 leading-relaxed max-w-lg mx-auto mb-8">
              Reach out and I'll share snapshots or video walkthroughs of any project you'd like to see in action.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <Mail className="w-4 h-4" />
              Request Demos
            </a>
          </GlassCard>

          {/* Demo categories */}
          <div className="grid md:grid-cols-2 gap-4">
            {videoDemos.map((demo, i) => {
              const CategoryIcon = categoryIcons[demo.category] || Monitor;
              return (
                <GlassCard key={i} className="p-6 group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.08] transition-colors duration-300">
                      <CategoryIcon className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider block mb-1">
                        {demo.category}
                      </span>
                      <h4 className="text-sm font-semibold text-white/60 mb-1 group-hover:text-white/80 transition-colors duration-300">
                        {demo.title}
                      </h4>
                      <p className="text-xs text-white/25 leading-relaxed">{demo.description}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============ EDUCATION ============ */
export const EducationSection = () => {
  const [ref, visible] = useReveal();
  return (
    <section id="education" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="06 — Education" title="Foundation" />

        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <GlassCard className="p-8">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-white/40" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{education.institution}</h3>
                <p className="text-sm text-white/40">{education.qualification}</p>
                <p className="text-xs text-white/25 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {education.location}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {education.modules.map((mod, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-mono text-white/30 border border-white/[0.06] rounded-full bg-white/[0.02] hover:bg-white/[0.04] hover:text-white/50 transition-all duration-300"
                >
                  {mod}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

/* ============ CONTACT ============ */
export const ContactSection = () => {
  const [ref, visible] = useReveal();

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="07 — Contact" title="Let's Connect" subtitle="Have a project in mind or want to collaborate? Reach out." />

        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <GlassCard className="p-6 group">
            <a href={`mailto:${personalInfo.email}`} className="flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors duration-300">
                <Mail className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/30 mb-0.5">Email</p>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 break-all">{personalInfo.email}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors duration-300" />
            </a>
          </GlassCard>

          <GlassCard className="p-6 group">
            <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors duration-300">
                <MessageCircle className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/30 mb-0.5">WhatsApp</p>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">{personalInfo.phone}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors duration-300" />
            </a>
          </GlassCard>

          <GlassCard className="p-6 group">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors duration-300">
                <Linkedin className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/30 mb-0.5">LinkedIn</p>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">linkedin.com/in/darius-vlok</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors duration-300" />
            </a>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white/40" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/30 mb-0.5">Location</p>
                <p className="text-sm text-white/60">{personalInfo.location}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

/* ============ FOOTER ============ */
export const Footer = () => (
  <footer className="border-t border-white/[0.04] py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Terminal className="w-4 h-4 text-white/30" />
        <span className="text-sm text-white/30 font-mono">
          {personalInfo.name} &copy; {new Date().getFullYear()}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-white/20">
        Built with <Heart className="w-3 h-3 text-white/30 mx-1" /> & code
      </div>
      <div className="flex items-center gap-4">
        <a href={`mailto:${personalInfo.email}`} className="text-white/20 hover:text-white/50 transition-colors duration-300">
          <Mail className="w-4 h-4" />
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/50 transition-colors duration-300">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/50 transition-colors duration-300">
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>
    </div>
  </footer>
);
