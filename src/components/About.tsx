import { Card } from "@/components/ui/card";
import { Brain, Code2, Database, Rocket } from "lucide-react";

export const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Enterprise AI systems with custom agents and workflow orchestration",
    },
    {
      icon: Code2,
      title: "Full Stack Dev",
      description: "End-to-end development from database to user interface",
    },
    {
      icon: Database,
      title: "Performance Optimization",
      description: "Reduced system response times from 20+ minutes to near-instant",
    },
    {
      icon: Rocket,
      title: "Rapid Innovation",
      description: "Building and deploying cutting-edge AI solutions at scale",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Results-driven AI engineer with a passion for transforming complex challenges 
              into elegant, high-performance solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-border hover:border-primary transition-all duration-300 hover:shadow-mint group"
              >
                <item.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 md:p-12 bg-gradient-card border-border">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <h3 className="text-2xl font-bold text-foreground mb-4">My Journey</h3>
              <p>
                My path to AI wasn't a straight line. I started as a passionate gamer in my youth, but as the repetition set in, 
                I knew I needed something more challenging. That drive led me to <span className="text-primary font-semibold">cybersecurity</span>, 
                where I dove deep into understanding systems, networks, and digital defense.
              </p>
              <p>
                Breaking into the industry wasn't easy. Job hunting in cybersecurity proved tough, and just when I was uncertain 
                about my path, I landed my first role in <span className="text-primary font-semibold">AI engineering</span>. Looking back, 
                I believe faith set me on exactly the right path—because I absolutely love what I do now.
              </p>
              <p>
                As a <span className="text-primary font-semibold">Junior Full Stack AI Engineer</span> at Misho ICT, 
                I specialize in building enterprise AI solutions that make real impact. One of my proudest achievements was 
                inheriting a system with 20+ minute database response times and engineering it to achieve 
                <span className="text-primary font-semibold"> near-instant responses</span> through custom tools and optimized architecture.
              </p>
              <p>
                My technical toolkit spans Python, JavaScript, C#, LangFlow, n8n, Docker, and extensive work with Large Language Models, 
                RAG systems, and database optimization. But more than the tech stack, I love bridging the gap between traditional 
                software development and cutting-edge AI technologies.
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-4 pt-4">My Vision</h3>
              <p>
                My goal is clear: to become a <span className="text-primary font-semibold">leader in AI</span>. I'm not just building 
                AI solutions today—I'm working to shape the future of how we interact with intelligent systems. Every project, 
                every challenge, and every line of code is a step toward mastering this incredible technology and helping others 
                understand its potential.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
