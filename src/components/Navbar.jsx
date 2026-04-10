import React, { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";

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

        {/* Desktop nav pill */}
        <div className="hidden md:block">
          <div
            className="flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500"
            style={{
              background: scrolled ? "rgba(8,8,8,0.85)" : "rgba(8,8,8,0.65)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)" : "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 px-4 py-2 mr-1 rounded-full hover:bg-white/5 transition-colors duration-300"
            >
              <Terminal className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-white tracking-wide font-mono">DV</span>
            </a>

            <div className="w-px h-5 bg-white/8 mr-1" />

            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-red-400 bg-red-600/15 border border-red-600/25"
                      : "text-white/50 hover:text-white hover:bg-white/6"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-3 rounded-full transition-all duration-300"
            style={{
              background: "rgba(8,8,8,0.85)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <X className="w-5 h-5 text-white/70" />
              : <Menu className="w-5 h-5 text-white/70" />
            }
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden"
          style={{
            background: "rgba(5,5,5,0.96)",
            backdropFilter: "blur(32px)",
          }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-2xl text-white/60 hover:text-white transition-colors duration-300"
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
