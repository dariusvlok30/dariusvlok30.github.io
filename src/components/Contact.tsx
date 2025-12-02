import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Linkedin, Github, ExternalLink } from "lucide-react";

export const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "dariusvlok30@gmail.com",
      href: "mailto:dariusvlok30@gmail.com",
      color: "text-primary",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+27 81 330 2747",
      href: "https://wa.me/27813302747",
      color: "text-primary",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "darius-vlok",
      href: "https://www.linkedin.com/in/darius-vlok/",
      color: "text-primary",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "dariusvlok",
      href: "https://github.com/dariusvlok",
      color: "text-primary",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how we can work together on your next project
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-gradient-card border-border">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="p-6 bg-secondary border-border hover:border-primary transition-all duration-300 hover:shadow-mint">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <method.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">
                          {method.label}
                        </p>
                        <p className="font-semibold group-hover:text-primary transition-colors">
                          {method.value}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            <div className="text-center pt-8 border-t border-border">
              <p className="text-muted-foreground mb-6">
                Available for freelance opportunities and full-time positions
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-mint"
                asChild
              >
                <a href="mailto:dariusvlok30@gmail.com">
                  Send Me an Email
                </a>
              </Button>
            </div>
          </Card>

          <div className="text-center mt-12">
            <a
              href="https://www.skills.google/public_profiles/74bcbc6a-3950-4c1a-98d7-2bff859cb0a1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span>View my Google Skills Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
