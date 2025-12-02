import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "Junior Full Stack AI Engineer",
      company: "Misho ICT",
      period: "April 2025 – Present",
      location: "South Africa",
      achievements: [
        "Engineered performance optimization reducing database response times from 20+ minutes to near-instant through custom MCP-style architecture",
        "Developed enterprise AI solutions for Pinnacle ICT including brand-specific agents for tender creation and HR operations",
        "Built secure AI chat interfaces with email allowlist and domain-based authentication for enterprise deployments",
        "Created custom agents for QR/Barcode generation, tender review, and policy management",
        "Implemented comprehensive knowledge bases with optimized chunk sizing and Top-K retrieval strategies",
      ],
      technologies: [
        "LangFlow",
        "Open WebUI",
        "n8n",
        "Python",
        "Docker",
        "SQL",
        "RAG",
        "LLM Integration",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Professional <span className="text-primary">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Building enterprise AI solutions at scale
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="p-8 md:p-10 bg-gradient-card border-border hover:border-primary/50 transition-all"
              >
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-lg text-foreground mb-1">
                        <Briefcase className="w-5 h-5" />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Key Achievements:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-primary mt-1.5">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
