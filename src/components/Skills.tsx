import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Database, 
  Cloud, 
  Workflow, 
  Bot, 
  Container,
  MessageSquare,
  Mail,
  BrainCircuit,
  Boxes,
  Server,
  Network
} from "lucide-react";

export const Skills = () => {
  const techStack = {
    aiModels: [
      { name: "ChatGPT", icon: BrainCircuit },
      { name: "Claude", icon: BrainCircuit },
      { name: "OpenAI", icon: BrainCircuit },
      { name: "Ollama", icon: Bot },
      { name: "vLLM", icon: Server },
    ],
    automation: [
      { name: "n8n", icon: Workflow },
      { name: "LangFlow", icon: Workflow },
      { name: "Open WebUI", icon: MessageSquare },
    ],
    infrastructure: [
      { name: "Docker", icon: Container },
      { name: "PostgreSQL", icon: Database },
      { name: "MySQL", icon: Database },
      { name: "SQL Server", icon: Database },
    ],
    communication: [
      { name: "Microsoft Teams", icon: MessageSquare },
      { name: "WhatsApp", icon: MessageSquare },
      { name: "Email Automation", icon: Mail },
    ],
    languages: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "C#", level: 80 },
      { name: "Java", level: 75 },
      { name: "SQL", level: 85 },
    ],
  };

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              Technical <span className="text-primary">Arsenal</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Modern tools and technologies powering enterprise AI solutions
            </p>
          </div>

          {/* Technology Badges */}
          <div className="space-y-8 mb-12">
            <Card className="p-8 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-semibold">AI Models & LLMs</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.aiModels.map((tech, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-4 py-2 text-base bg-primary/10 hover:bg-primary/20 border-primary/20 transition-all cursor-default"
                  >
                    <tech.icon className="w-4 h-4 mr-2" />
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Workflow className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-semibold">Workflow & Automation</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.automation.map((tech, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-4 py-2 text-base bg-coral/10 hover:bg-coral/20 border-coral/20 transition-all cursor-default"
                  >
                    <tech.icon className="w-4 h-4 mr-2" />
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Container className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-semibold">Infrastructure & Databases</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.infrastructure.map((tech, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-4 py-2 text-base bg-accent/10 hover:bg-accent/20 border-accent/20 transition-all cursor-default"
                  >
                    <tech.icon className="w-4 h-4 mr-2" />
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-semibold">Communication & Integration</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.communication.map((tech, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-4 py-2 text-base bg-secondary/50 hover:bg-secondary transition-all cursor-default"
                  >
                    <tech.icon className="w-4 h-4 mr-2" />
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Programming Languages with Progress Bars */}
          <Card className="p-8 bg-gradient-card border-border">
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-semibold">Programming Languages</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {techStack.languages.map((lang, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-sm text-muted-foreground font-mono">{lang.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary transition-all duration-1000 ease-out"
                      style={{ width: `${lang.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
