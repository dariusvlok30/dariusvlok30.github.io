import React, { useEffect, useRef, useState } from "react";
import {
  Code2, Brain, Server, Database, Workflow, Layout,
  Gauge, Lightbulb, Layers, Sparkles, TrendingUp, BookOpen,
  BarChart3, Bot, Shield, Zap, Globe,
  Mail, MessageCircle, Linkedin, MapPin, ArrowUpRight,
  GraduationCap, Terminal, Heart,
  Monitor, Cog,
} from "lucide-react";
import { CardSpotlight } from "./ui/card-spotlight";
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

/* ---------- Shared Components ---------- */
const GlassCard = ({ children, className = "" }) => (
  <CardSpotlight className={className}>
    {children}
  </CardSpotlight>
);

const SectionHeading = ({ label, title, subtitle }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <span className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-[#4a90d9]/60 mb-3 px-3 py-1 rounded-full border border-[#034694]/20 bg-[#034694]/5">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">{title}</h2>
      {subtitle && <p className="text-gray-400 max-w-xl text-base leading-relaxed">{subtitle}</p>}
    </div>
  );
};

/* ============ ABOUT (with AI content merged in) ============ */
const aiTools = [
  { name: "Claude Code", desc: "Autonomous CLI agent — scaffolds, refactors, debugs entire codebases", icon: Terminal },
  { name: "Claude in VS Code", desc: "Inline AI pair-programming directly inside the editor", icon: Code2 },
  { name: "Claude API", desc: "Custom AI agents, pipelines, and intelligent automations", icon: Bot },
  { name: "AI Workflows", desc: "End-to-end automated development & deployment pipelines", icon: Workflow },
];

export const AboutSection = () => {
  const [statsRef, statsVisible] = useReveal();
  const [toolsRef, toolsVisible] = useReveal();
  const [diffRef, diffVisible] = useReveal();

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="01 — About"
          title="About Me"
          subtitle="AI-first engineer building enterprise-grade solutions with intelligent tools."
        />

        {/* Summary */}
        <div className="mb-20">
          <GlassCard className="p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#034694]/15 border border-[#034694]/25 mb-6">
                  <Bot className="w-3.5 h-3.5 text-[#4a90d9]" />
                  <span className="text-xs text-[#4a90d9] font-mono tracking-wider uppercase">AI-First Engineer</span>
                </div>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-8">
                  {personalInfo.summary}
                </p>

                {/* Stats */}
                <div
                  ref={statsRef}
                  className={`grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-700 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  {personalInfo.stats.map((stat, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <div className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* AI Tools */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Built with Intelligent Tools</h3>
          <p className="text-sm text-gray-400 mb-8">How I leverage AI to accelerate development across the full lifecycle.</p>

          <div
            ref={toolsRef}
            className={`grid sm:grid-cols-2 gap-4 transition-all duration-700 ${toolsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {aiTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <GlassCard key={tool.name} className="p-5 group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center flex-shrink-0 group-hover/spotlight:bg-[#034694]/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#4a90d9]/60 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">{tool.name}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed break-words">{tool.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Differentiators */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">What Sets Me Apart</h3>
        <p className="text-sm text-gray-400 mb-8">My approach to engineering and problem-solving.</p>

        <div
          ref={diffRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${diffVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {differentiators.map((item, i) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <GlassCard key={i} className="p-6 group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center flex-shrink-0 group-hover/spotlight:bg-[#034694]/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#4a90d9]/60 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1.5">{item.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed break-words">{item.description}</p>
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
                  <div className="w-9 h-9 rounded-lg bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center group-hover/spotlight:bg-[#034694]/20 transition-colors duration-300">
                    <Icon className="w-4 h-4 text-[#4a90d9]/60 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-600 truncate">{cat.name}</h3>
                </div>
                <div className="space-y-3">
                  {cat.items.map((skill, j) => (
                    <div key={j}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 font-mono truncate mr-2">{skill.name}</span>
                        <span className="text-gray-300 flex-shrink-0">{skill.level}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-gray-50 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#034694] to-[#4a90d9] transition-all duration-1000 ease-out"
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
              className="px-3 py-1.5 text-xs font-mono text-gray-400 border border-gray-200 rounded-full bg-gray-50 hover:bg-[#034694]/10 hover:text-[#4a90d9]/70 hover:border-[#034694]/20 transition-all duration-300 cursor-default"
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
            <GlassCard className="p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 truncate">{exp.company}</h3>
                  <p className="text-sm text-gray-500">{exp.role}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Badge variant="outline" className="text-gray-500 border-white/10 bg-gray-50 rounded-full text-xs whitespace-nowrap">
                    <MapPin className="w-3 h-3 mr-1" />
                    {exp.location}
                  </Badge>
                  <Badge variant="outline" className="text-emerald-400/70 border-emerald-400/20 bg-emerald-400/[0.04] rounded-full text-xs whitespace-nowrap">
                    {exp.period}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed">{exp.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                {exp.achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:bg-[#034694]/5 hover:border-[#034694]/15 transition-all duration-300"
                  >
                    <h4 className="text-sm font-semibold text-gray-600 mb-2 hover:text-white/90 transition-colors duration-300">
                      {ach.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3 break-words">{ach.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ach.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-50 border border-gray-200 rounded-full whitespace-nowrap">
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
          className={`grid md:grid-cols-2 gap-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {projects.map((proj, i) => {
            const Icon = iconMap[proj.icon] || Zap;
            return (
              <GlassCard
                key={i}
                className={`p-7 group ${proj.highlight ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center flex-shrink-0 group-hover/spotlight:bg-[#034694]/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#4a90d9]/50 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
                  </div>
                  <Badge
                    variant="outline"
                    className={`rounded-full text-[10px] font-mono flex-shrink-0 whitespace-nowrap ${
                      proj.status === "In Development"
                        ? "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]"
                        : proj.status === "Production"
                        ? "text-emerald-400/70 border-emerald-400/20 bg-emerald-400/[0.04]"
                        : "text-[#4a90d9]/60 border-[#034694]/20 bg-[#034694]/5"
                    }`}
                  >
                    {proj.status}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2 group-hover/spotlight:text-gray-900 transition-colors duration-300 break-words">
                  {proj.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-5 break-words">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, j) => (
                    <span key={j} className="px-2.5 py-1 text-[10px] font-mono text-gray-400 bg-gray-50 border border-gray-200 rounded-full whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
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
          subtitle="I'll happily show snapshots or videos of my work upon request."
        />

        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Request card */}
          <GlassCard className="p-10 mb-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-7 h-7 text-[#4a90d9]/50" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-3">Available Upon Request</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-lg mx-auto mb-8">
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
                    <div className="w-10 h-10 rounded-xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center flex-shrink-0 group-hover/spotlight:bg-[#034694]/20 transition-colors duration-300">
                      <CategoryIcon className="w-5 h-5 text-[#4a90d9]/50 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[#4a90d9]/40 uppercase tracking-wider block mb-1">
                        {demo.category}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-600 mb-1 group-hover/spotlight:text-gray-700 transition-colors duration-300 break-words">
                        {demo.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed break-words">{demo.description}</p>
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
              <div className="w-12 h-12 rounded-xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-[#4a90d9]/50" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{education.institution}</h3>
                <p className="text-sm text-gray-500">{education.qualification}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {education.location}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {education.modules.map((mod, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-mono text-gray-400 border border-gray-200 rounded-full bg-gray-50 hover:bg-[#034694]/10 hover:text-[#4a90d9]/70 hover:border-[#034694]/20 transition-all duration-300"
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
              <div className="w-10 h-10 rounded-xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center group-hover/spotlight:bg-[#034694]/20 transition-colors duration-300">
                <Mail className="w-5 h-5 text-[#4a90d9]/50 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-0.5">Email</p>
                <p className="text-sm text-gray-600 group-hover/spotlight:text-gray-700 transition-colors duration-300 break-all">{personalInfo.email}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
            </a>
          </GlassCard>

          <GlassCard className="p-6 group">
            <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center group-hover/spotlight:bg-[#034694]/20 transition-colors duration-300">
                <MessageCircle className="w-5 h-5 text-[#4a90d9]/50 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-0.5">WhatsApp</p>
                <p className="text-sm text-gray-600 group-hover/spotlight:text-gray-700 transition-colors duration-300">{personalInfo.phone}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
            </a>
          </GlassCard>

          <GlassCard className="p-6 group">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center group-hover/spotlight:bg-[#034694]/20 transition-colors duration-300">
                <Linkedin className="w-5 h-5 text-[#4a90d9]/50 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-0.5">LinkedIn</p>
                <p className="text-sm text-gray-600 group-hover/spotlight:text-gray-700 transition-colors duration-300 truncate">linkedin.com/in/darius-vlok</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover/spotlight:text-[#4a90d9] transition-colors duration-300" />
            </a>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#034694]/10 border border-[#034694]/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#4a90d9]/50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-0.5">Location</p>
                <p className="text-sm text-gray-600">{personalInfo.location}</p>
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
  <footer className="border-t border-gray-200 py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Terminal className="w-4 h-4 text-[#4a90d9]/40" />
        <span className="text-sm text-gray-400 font-mono">
          {personalInfo.name} &copy; {new Date().getFullYear()}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-300">
        Built with <Heart className="w-3 h-3 text-[#4a90d9]/40 mx-1" /> & AI
      </div>
      <div className="flex items-center gap-4">
        <a href={`mailto:${personalInfo.email}`} className="text-gray-300 hover:text-[#4a90d9] transition-colors duration-300">
          <Mail className="w-4 h-4" />
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#4a90d9] transition-colors duration-300">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#4a90d9] transition-colors duration-300">
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>
    </div>
  </footer>
);
