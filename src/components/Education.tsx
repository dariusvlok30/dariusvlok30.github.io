import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

export const Education = () => {
  const subjects = [
    "Java Programming",
    "C# Programming",
    "Python Programming",
    "Solutions Development",
    "DevOps Engineering",
    "Programme Design",
    "Robotics Development",
    "Web Development",
    "Cloud Fundamentals",
    "Cyber Security",
    "Network Architecture",
    "IT Project Management",
  ];

  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Education & <span className="text-primary">Certifications</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Formal education and continuous learning
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-8 md:p-10 bg-gradient-card border-border hover:border-primary/50 transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Diploma in Information Technology
                  </h3>
                  <p className="text-lg text-muted-foreground">CTU Training Solutions</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Subjects & Specializations:</h4>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-card border-border hover:border-primary/50 transition-all">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Additional Certifications</h3>
                <a
                  href="https://www.skills.google/public_profiles/74bcbc6a-3950-4c1a-98d7-2bff859cb0a1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <span>View Google Skills Profile</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
