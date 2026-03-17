import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import {
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  VideoDemosSection,
  EducationSection,
  ContactSection,
  AISection,
  Footer,
} from "./components/ContentSections";

function App() {
  return (
    <div className="App min-h-screen bg-[#050505] text-white font-['Figtree',sans-serif] overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AISection />
        <VideoDemosSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
