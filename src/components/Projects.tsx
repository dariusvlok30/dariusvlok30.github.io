import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Lock, MessageSquare, QrCode, FileText, TrendingUp } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      icon: TrendingUp,
      title: "Performance Optimization System",
      description:
        "Engineered custom tools in LangFlow and built HTTP API server with MCP-style architecture, reducing database response times from 20+ minutes to near-instant.",
      technologies: ["LangFlow", "Python", "API Development", "Database Optimization"],
      impact: "99% response time reduction",
    },
    {
      icon: MessageSquare,
      title: "Enterprise AI Agent Suite",
      description:
        "Developed brand-specific agents for Pinnacle ICT including tender creation, HR policy search, and CV review automation with intelligent retrieval.",
      technologies: ["LangFlow", "RAG", "LLM Integration", "Knowledge Bases"],
      impact: "Automated enterprise workflows",
    },
    {
      icon: Lock,
      title: "Secure AI Chat Platform",
      description:
        "Built highly secure AI interfaces with email allowlist authentication and domain-specific access controls for sensitive enterprise deployments.",
      technologies: ["Open WebUI", "Docker", "OAuth", "Security Architecture"],
      impact: "Enterprise-grade security",
    },
    {
      icon: QrCode,
      title: "QR/Barcode Generation Bots",
      description:
        "Created automated agents for dynamic QR code and barcode generation integrated with business workflows and inventory systems.",
      technologies: ["n8n", "API Integration", "Automation"],
      impact: "Streamlined operations",
    },
    {
      icon: FileText,
      title: "Natural Language to SQL Agent",
      description:
        "Contributed to agent development enabling non-technical users to query databases using natural language, with intelligent query optimization.",
      technologies: ["Python", "SQL", "NLP", "LangFlow"],
      impact: "Democratized data access",
    },
    {
      icon: Database,
      title: "King Price Insurance Database",
      description:
        "Academic project: Designed and developed comprehensive SQL database with WPF/XAML front-end and C# back-end for user management.",
      technologies: ["SQL Server", "C#", "WPF/XAML", "Stored Procedures"],
      impact: "Full-stack solution",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Enterprise solutions and innovations in AI engineering
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-border hover:border-primary transition-all duration-300 hover:shadow-mint group"
              >
                <project.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <span className="text-primary font-semibold text-sm">
                      {project.impact}
                    </span>
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
