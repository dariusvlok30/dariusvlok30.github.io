import React, { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 80;
      if (nearBottom) { setActiveSection("contact"); return; }
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]); return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? "top-4" : "top-6"}`}>

        {/* Desktop — nav pill wrapped in HoverBorderGradient */}
        <div className="hidden md:block">
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-full w-auto"
            className="p-0 bg-transparent rounded-full w-auto"
            duration={2}
          >
            <div className={`flex items-center gap-1 px-2 py-2 rounded-full backdrop-blur-2xl transition-all duration-500 ${
              scrolled ? "bg-black/70" : "bg-black/40"
            }`}>
              {/* Logo */}
              <a
                href="#hero"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="flex items-center gap-2 px-4 py-2 mr-1 rounded-full hover:bg-white/[0.08] transition-colors duration-300"
              >
                <Terminal className="w-4 h-4 text-[#4a90d9]" />
                <span className="text-sm font-semibold text-white tracking-wide font-mono">DV</span>
              </a>

              <div className="w-px h-5 bg-white/10 mr-1" />

              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-white bg-[#034694]/30 border border-[#034694]/40"
                        : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </HoverBorderGradient>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden">
          <HoverBorderGradient
            as="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            containerClassName="rounded-full"
            className="p-3 bg-black/60 rounded-full"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </HoverBorderGradient>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-2xl text-white/70 hover:text-white transition-colors duration-300"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
