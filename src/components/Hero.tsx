import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, MessageCircle } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-mint/10 rounded-full blur-3xl -top-48 -left-48 animate-float" />
        <div className="absolute w-96 h-96 bg-mint/10 rounded-full blur-3xl -bottom-48 -right-48 animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-foreground">Darius</span>{" "}
              <span className="text-primary bg-clip-text">Vlok</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-muted-foreground font-mono">
              <span className="text-primary">{"<"}</span>
              <span>Junior Full Stack AI Engineer</span>
              <span className="text-primary">{"/>"}</span>
            </div>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building enterprise AI solutions with custom agents, workflow orchestration, 
            and cutting-edge technologies. Specialized in transforming complex systems 
            into high-performance AI applications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-mint hover:shadow-lg transition-all"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8">
            <a
              href="https://www.linkedin.com/in/darius-vlok/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/dariusvlok"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:dariusvlok30@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/27813302747"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>

          <div className="pt-12 animate-bounce">
            <button
              onClick={() => scrollToSection("about")}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowDown className="w-8 h-8 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
