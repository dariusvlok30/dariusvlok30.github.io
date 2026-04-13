import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ParticleBackground from "./components/ParticleBackground";
import {
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  VideoDemosSection,
  EducationSection,
  ContactSection,
  Footer,
} from "./components/ContentSections";

function App() {
  return (
    <div className="App min-h-screen bg-white text-gray-900 font-['Figtree',sans-serif] overflow-x-hidden">
      {/* Fixed particle canvas — sits behind every section */}
      <ParticleBackground />

      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <VideoDemosSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
