export const personalInfo = {
  name: "Darius Vlok",
  title: "Full Stack AI Engineer",
  tagline: "Building enterprise-grade AI solutions & scalable web applications",
  email: "dariusvlok30@gmail.com",
  phone: "+27 81 330 2747",
  whatsapp: "https://wa.me/27813302747",
  linkedin: "https://linkedin.com/in/darius-vlok",
  location: "South Africa",
  summary:
    "Dynamic Full Stack AI Engineer with proven expertise in developing enterprise-grade AI solutions and scalable web applications. Demonstrated ability to dramatically improve system performance through innovative architecture and intelligent automation. Leverages modern AI-assisted development tools like Claude Code CLI alongside deep technical expertise to accelerate delivery — from building websites and apps to managing deployments, optimizations, and debugging. Passionate about bridging cutting-edge AI technologies with practical business solutions.",
  stats: [
    { label: "Performance Gain", value: "99%+", description: "Query optimization" },
    { label: "Response Time", value: "<1s", description: "From 20+ minutes" },
    { label: "AI Agents", value: "10+", description: "Custom built" },
    { label: "Systems", value: "Enterprise", description: "Production grade" },
  ],
};

export const skills = {
  categories: [
    {
      name: "Full Stack Development",
      icon: "Code2",
      items: [
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "React", level: 88 },
        { name: "C#", level: 85 },
        { name: "Java", level: 80 },
        { name: "Node.js", level: 85 },
      ],
    },
    {
      name: "AI & Machine Learning",
      icon: "Brain",
      items: [
        { name: "LLM Integration", level: 95 },
        { name: "RAG Systems", level: 90 },
        { name: "Agent Development", level: 92 },
        { name: "Vector Embeddings", level: 88 },
        { name: "NL to SQL", level: 85 },
        { name: "LangFlow", level: 90 },
      ],
    },
    {
      name: "DevOps & Infrastructure",
      icon: "Server",
      items: [
        { name: "Docker", level: 88 },
        { name: "Cloud Deployment", level: 82 },
        { name: "OAuth / SSO", level: 85 },
        { name: "Git", level: 90 },
        { name: "CI/CD", level: 78 },
        { name: "Environment Mgmt", level: 88 },
      ],
    },
    {
      name: "Databases",
      icon: "Database",
      items: [
        { name: "SQL Server", level: 90 },
        { name: "PostgreSQL", level: 88 },
        { name: "Vector DBs", level: 85 },
        { name: "Stored Procedures", level: 88 },
        { name: "Query Optimization", level: 92 },
        { name: "MongoDB", level: 80 },
      ],
    },
    {
      name: "Automation & Integration",
      icon: "Workflow",
      items: [
        { name: "n8n", level: 92 },
        { name: "LangFlow", level: 90 },
        { name: "API Development", level: 90 },
        { name: "Process Automation", level: 88 },
        { name: "REST APIs", level: 92 },
        { name: "MCP Architecture", level: 85 },
      ],
    },
    {
      name: "Frontend & UI",
      icon: "Layout",
      items: [
        { name: "React", level: 88 },
        { name: "WPF/XAML", level: 82 },
        { name: "Responsive Design", level: 88 },
        { name: "UI/UX Principles", level: 85 },
        { name: "CSS3 / Tailwind", level: 88 },
        { name: "HTML5", level: 90 },
      ],
    },
  ],
  tools: [
    "Python", "JavaScript", "React", "C#", "Java", "SQL",
    "LangFlow", "n8n", "OpenAI API", "Open WebUI",
    "Docker", "Git", "PostgreSQL", "SQL Server",
    "Vector DBs", "REST APIs", "OAuth", "WPF/XAML",
    "Claude Code CLI",
  ],
};

export const experience = [
  {
    company: "Pinnacle ICT",
    role: "Junior Full Stack AI Engineer",
    period: "Present",
    location: "South Africa",
    description:
      "Leading development of enterprise AI solutions, performance optimization across all platforms, and intelligent automation systems.",
    achievements: [
      {
        title: "Performance Optimization \u2014 Database Chat Agent",
        description:
          "Inherited a system with 20+ minute database query response times across all platforms including the AI portal. Architected custom LangFlow tools and HTTP API server (MCP-style), reducing response times to near-instant \u2014 a 99%+ performance improvement.",
        tags: ["LangFlow", "MCP", "All Platforms", "Performance"],
      },
      {
        title: "Enterprise AI Platform",
        description:
          "Built comprehensive AI solution using Open WebUI with custom agents for tender management, HR policy automation, and recruitment workflows. Implemented QR code generators, barcode systems, and brand-specific product knowledge integration.",
        tags: ["Open WebUI", "AI Agents", "Automation"],
      },
      {
        title: "Advanced RAG System",
        description:
          "Designed and deployed knowledge base systems with optimized chunk sizing, top-k retrieval, and document embedding strategies. Expert in vector databases and retrieval optimization.",
        tags: ["RAG", "Vector DB", "Embeddings"],
      },
      {
        title: "Intelligent Automation Suite",
        description:
          "Developed comprehensive n8n workflow automations including web search tools, usage analytics dashboards, SQL database execution agents, and natural language to SQL query translation.",
        tags: ["n8n", "NL-to-SQL", "Analytics"],
      },
      {
        title: "Authentication & Security",
        description:
          "Implemented Microsoft OAuth integration, user management systems, and secure environment variable handling across Dockerized applications.",
        tags: ["OAuth", "Docker", "Security"],
      },
      {
        title: "Custom Agent Development",
        description:
          "Created specialized AI agents for HR recruitment (CV processing, candidate evaluation), tender review systems, and HR policy document retrieval.",
        tags: ["AI Agents", "HR", "Recruitment"],
      },
    ],
  },
];

export const projects = [
  {
    title: "Pinnacle ICT \u2014 Internal Sales CRM",
    status: "In Development",
    description:
      "Building a comprehensive internal CRM system for Pinnacle ICT's sales operations. Features include sales representative management, brand & branch tracking, custom date filtering, real-time performance metrics, sales pipelines, opportunity management, and a full product catalog.",
    tags: [
      "Sales Rep Tracking",
      "Brand Management",
      "Branch Tracking",
      "Date Filtering",
      "Performance Metrics",
      "Pipelines",
      "Opportunities",
      "Product Catalog",
    ],
    icon: "BarChart3",
    highlight: true,
  },
  {
    title: "Misho AI Portal",
    status: "Production",
    description:
      "Full-featured AI portal with Google and Microsoft SSO authentication, multi-agent support, and an intelligent interface for enterprise workflows. Built with secure identity management and seamless single sign-on across providers.",
    tags: ["Google SSO", "Microsoft SSO", "AI Portal", "Multi-Agent", "Enterprise Auth"],
    icon: "Globe",
    highlight: false,
  },
  {
    title: "Enterprise AI Agent Ecosystem",
    status: "Production",
    description:
      "Multi-agent system including tender analysis, HR automation, and product knowledge specialists. Integrated natural language processing with structured database queries. Custom utility bots for QR codes, barcodes, and automated workflow processing.",
    tags: ["Multi-Agent", "NLP", "Production", "Workflow Automation"],
    icon: "Bot",
    highlight: false,
  },
  {
    title: "King Price Insurance Database System",
    status: "Completed",
    description:
      "Comprehensive SQL database with stored procedures, views, and triggers for insurance management. WPF/XAML desktop application with intuitive UI, C# backend with advanced user permission management and role-based access control.",
    tags: ["SQL", "WPF/XAML", "C#", "RBAC", "Desktop App"],
    icon: "Shield",
    highlight: false,
  },
  {
    title: "Performance Optimization Engine",
    status: "Production",
    description:
      "Transformed the Database Chat Agent and all connected platforms from 20+ minute query times into a near-instant response system. Built custom LangFlow tools and MCP-style HTTP API server achieving 99%+ performance gains across the board.",
    tags: ["LangFlow", "MCP", "99%+ Improvement", "All Platforms"],
    icon: "Zap",
    highlight: false,
  },
  {
    title: "n8n Automation Platform",
    status: "Production",
    description:
      "Self-hosted n8n instance managing end-to-end business automation. Features an AI agent connected via MCP that interacts directly with databases, Teams, email, and chat apps. Automates lead generation through web scraping, integrates cloud storage (Google Drive, OneDrive), and handles document workflows, notifications, and scheduling — all orchestrated as a full-stack automation backbone.",
    tags: [
      "n8n",
      "AI Agent",
      "MCP",
      "Database Integration",
      "Microsoft Teams",
      "Email Automation",
      "Web Scraping",
      "Lead Generation",
      "Google Drive",
      "OneDrive",
      "Chat Automation",
      "Self-Hosted",
    ],
    icon: "Workflow",
    highlight: false,
  },
];

export const videoDemos = [
  {
    title: "Pinnacle ICT \u2014 AI Platform Overview",
    description: "Full walkthrough of the enterprise AI platform including the Database Chat Agent, performance optimizations, and workflow automations.",
    category: "Platform",
    placeholder: true,
  },
  {
    title: "Misho AI Portal \u2014 SSO & Agents",
    description: "Demonstration of Google and Microsoft SSO authentication flow and multi-agent interaction within the Misho AI Portal.",
    category: "Authentication",
    placeholder: true,
  },
  {
    title: "AI Agents Demo",
    description: "Live demo of custom AI agents including tender analysis, HR recruitment automation, product knowledge specialists, and QR/barcode generators.",
    category: "AI Agents",
    placeholder: true,
  },
  {
    title: "Automation Demos",
    description: "Comprehensive showcase of n8n workflow automations, usage analytics dashboards, NL-to-SQL translation, and automated reporting systems.",
    category: "Automation",
    placeholder: true,
  },
];

export const education = {
  institution: "CTU Training Solutions",
  qualification: "IT Diploma",
  location: "South Africa",
  modules: [
    "Java",
    "C#",
    "Python",
    "Solutions Development",
    "Cloud Fundamentals",
    "Network Architecture",
    "Cybersecurity",
    "Robotics Development",
    "IT Project Management",
    "Web Development",
    "Advanced Design Patterns",
  ],
};

export const differentiators = [
  {
    icon: "Gauge",
    title: "Performance Optimizer",
    description: "Track record of dramatic system improvements \u2014 99%+ performance gains.",
  },
  {
    icon: "Lightbulb",
    title: "Problem Solver",
    description: "Thrives on complex challenges, turning technical obstacles into elegant solutions.",
  },
  {
    icon: "Layers",
    title: "Full Stack Versatility",
    description: "Comfortable working across the entire technology stack.",
  },
  {
    icon: "Sparkles",
    title: "AI-Augmented Development",
    description: "Pairs deep technical expertise with tools like Claude Code CLI to accelerate delivery across the full development lifecycle.",
  },
  {
    icon: "TrendingUp",
    title: "Business-Minded",
    description: "Technical solutions focused on delivering tangible business value.",
  },
  {
    icon: "BookOpen",
    title: "Continuous Learner",
    description: "Self-motivated with a passion for emerging technologies and best practices.",
  },
];
