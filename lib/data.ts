export const navItems = [
  { id: "home", label: "Home", icon: "Home" },
  { id: "about", label: "About", icon: "User" },
  { id: "experience", label: "Experience", icon: "Briefcase" },
  { id: "stack", label: "Stack", icon: "Layers" },
  { id: "projects", label: "Projects", icon: "Code2" },
  { id: "publications", label: "Publications", icon: "BookOpen" },
  { id: "blog", label: "Blog", icon: "Newspaper" },
  { id: "contact", label: "Contact", icon: "Mail" },
] as const;

export const socialLinks = [
  {
    platform: "Email",
    url: "mailto:najarinaji2015@gmail.com",
    icon: "Mail",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/naji-najari",
    icon: "Linkedin",
  },
  {
    platform: "GitHub",
    url: "https://github.com/Naji-Najari",
    icon: "Github",
  },
  {
    platform: "Google Scholar",
    url: "https://scholar.google.com/citations?user=rkgpg1gAAAAJ",
    icon: "GraduationCap",
  },
] as const;

export interface Experience {
  company: string;
  logo: string;
  title: string;
  date: string;
  location: string;
  bullets: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    company: "Brevo",
    logo: "/logos/brevo.svg",
    title: "Senior AI Engineer",
    date: "Sep 2024 — Present · 1 yr 8 mos",
    location: "Paris, France",
    bullets: [
      "Built multiple production agents within a multi-agent AI platform used by end-users and internal teams: documentation Q&A (RAG), CRM contact management, campaign analytics and recommendation | LangChain, LangGraph, Google ADK",
      "Exposed Brevo's public APIs as MCP servers, enabling developers to use Brevo tools directly from AI coding assistants (Claude, Cursor) | FastMCP, FastAPI",
      "Implemented production-grade RAG pipelines for real-time customer query answering | Ragflow, LangChain",
      "Integrated Langfuse for end-to-end LLM tracing and monitoring; built LLM-as-a-judge evaluation with human-in-the-loop annotation",
      "Fine-tuned BERT for multilingual spam and fraud detection | HuggingFace Transformers, CI/CD",
      "Trained and deployed ML audience recommendation models | ZenML, MLOps, MLFlow",
    ],
    tags: [
      "LangGraph",
      "Google ADK",
      "RAG",
      "FastAPI",
      "Kubernetes",
      "Langfuse",
      "MCP",
    ],
  },
  {
    company: "FORVIA",
    logo: "/logos/forvia.svg",
    title: "Senior Data Scientist — Technical Leader",
    date: "Jan 2023 — Sep 2024 · 1 yr 9 mos",
    location: "Paris, France",
    bullets: [
      "Led a cross-functional team of 6-8 (data scientists, software engineers, front-end developers) delivering ML solutions for manufacturing plants at world's 4th largest automotive supplier",
      "Built predictive maintenance models: process parameter optimization, time series forecasting, anomaly detection",
      "Applied LLMs for advanced text analysis on manufacturing documentation and reports",
      "Recognized internally as Machine Learning Expert",
    ],
    tags: ["Machine Learning", "Time Series", "Predictive Maintenance", "Python"],
  },
  {
    company: "Orange",
    logo: "/logos/orange.svg",
    title: "Data Scientist — PhD Researcher (CIFRE)",
    date: "Nov 2019 — Feb 2023 · 3 yrs 4 mos",
    location: "Grenoble, France",
    bullets: [
      "Trained and deployed robust unsupervised anomaly detection models for real-time network traffic monitoring | PyTorch, PySpark, Docker",
      "Published 4 papers at top ML conferences: ECML-PKDD, IEEE COINS, AINA, SINConf",
      "Filed 2 international patents (INPI) for IoT anomaly detection and network traffic fingerprinting",
      'PhD thesis (CIFRE): "Robust Unsupervised Anomaly Detection"',
    ],
    tags: [
      "PyTorch",
      "PySpark",
      "Anomaly Detection",
      "Transformers",
      "Deep Learning",
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    title: "RagMaker — Agentic RAG Platform",
    description:
      "Co-developed an Agentic B2B SaaS platform enabling users to query multi-format documents and connect external tools via conversational AI. Hybrid Search (semantic + keyword), Text-to-SQL, MCP integration, LangGraph agentic workflows.",
    tags: [
      "LangGraph",
      "RAG",
      "PostgreSQL pgvector",
      "FastAPI",
      "MCP",
      "GCP",
      "Docker",
    ],
    liveUrl: "https://ragmaker.ai",
  },
  {
    title: "multi-agent-llm-stack",
    description:
      "End-to-end production ML stack: multi-agent RAG with LangGraph, LLM fine-tuning (LoRA/QLoRA), vLLM serving, Docker, Kubernetes, Prometheus monitoring. Full stack, open source.",
    tags: ["LangGraph", "RAG", "vLLM", "LoRA", "Kubernetes", "Prometheus"],
    comingSoon: true,
  },
];

export interface Publication {
  title: string;
  venue: string;
  year: number;
  authors: string;
  doi?: string;
  url?: string;
  highlight?: boolean;
}

export const publications: Publication[] = [
  {
    title:
      "RESIST: Robust Transformer for Unsupervised Time Series Anomaly Detection",
    venue: "ECML-PKDD 2022",
    year: 2022,
    authors: "N. Najari, S. Berlemont, G. Lefebvre, S. Duffner, C. Garcia",
    highlight: true,
  },
  {
    title:
      "Robust Variational Autoencoders and Normalizing Flows for Unsupervised Network Anomaly Detection",
    venue: "AINA 2022",
    year: 2022,
    authors: "N. Najari, S. Berlemont, G. Lefebvre, S. Duffner, C. Garcia",
    doi: "10.1007/978-3-030-99587-4_24",
    url: "https://link.springer.com/chapter/10.1007/978-3-030-99587-4_24",
  },
  {
    title: "RADON: Robust Autoencoder for Unsupervised Anomaly Detection",
    venue: "SINConf 2021",
    year: 2021,
    authors: "N. Najari, S. Berlemont, G. Lefebvre, S. Duffner, C. Garcia",
    doi: "10.1109/SIN54109.2021.9699174",
    url: "https://ieeexplore.ieee.org/document/9699174",
  },
  {
    title: "Network Traffic Modeling For IoT-device Re-identification",
    venue: "IEEE COINS 2020",
    year: 2020,
    authors: "N. Najari, S. Berlemont, G. Lefebvre, S. Duffner, C. Garcia",
    doi: "10.1109/COINS49042.2020.9191376",
    url: "https://ieeexplore.ieee.org/document/9191376",
  },
  {
    title: "Robust Unsupervised Anomaly Detection",
    venue: "PhD Thesis, INSA Lyon",
    year: 2022,
    authors: "N. Najari",
    highlight: true,
    url: "https://theses.fr/2022ISAL0124",
  },
];

export interface Patent {
  title: string;
  inventors: string;
  filed: string;
}

export const patents: Patent[] = [
  {
    title: "Contextual Anomaly Detection For The Maintenance Of IoT Devices",
    inventors: "N. Najari, S. Berlemont, G. Lefebvre",
    filed: "June 2022, Orange Meylan",
  },
  {
    title:
      "Assistance For The Identification Of Malfunctioning Devices Using Traffic Metadata",
    inventors: "S. Berlemont, N. Najari, G. Lefebvre",
    filed: "November 2020, Orange Meylan",
  },
];

export interface StackCategory {
  label: string;
  items: string[];
}

export const stackCategories: StackCategory[] = [
  {
    label: "AI / GenAI",
    items: [
      "LangGraph",
      "Google ADK",
      "LangChain",
      "RAG",
      "Langfuse",
      "MCP",
      "vLLM",
      "LiteLLM",
      "LoRA/QLoRA",
    ],
  },
  {
    label: "ML / Deep Learning",
    items: [
      "PyTorch",
      "HuggingFace Transformers",
      "scikit-learn",
      "TensorFlow",
      "PEFT",
    ],
  },
  {
    label: "Engineering",
    items: ["Python", "FastAPI", "Docker", "Kubernetes", "Kafka", "SQL", "CI/CD"],
  },
  {
    label: "Cloud & MLOps",
    items: [
      "GCP / Vertex AI",
      "AWS",
      "Palantir",
      "ZenML",
      "MLFlow",
      "Spark / PySpark",
    ],
  },
  {
    label: "Languages",
    items: ["French — Fluent", "English — Fluent", "Arabic — Native"],
  },
];
