"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Github, Globe2, ChevronRight, Tag, Filter, Sparkles, ExternalLink, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  title: string;
  slug: string;
  summary: string;
  outcome?: string;
  stack: string[];
  links: { github?: string; live?: string; doc?: string };
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    title: "StructRAG – Code Generator & Knowledge Base",
    slug: "structrag",
    summary:
      "RAG-based system that ingests docs, builds a domain KB, and generates code with guardrails. Built with FastAPI, LangChain, local LLMs, and Chroma.",
    outcome:
      "Reduced manual debugging by ~40% and improved model evaluation flows by ~30% with dashboards.",
    stack: ["FastAPI", "LangChain", "Python", "Chroma", "LLaMA 3.2", "NiceGUI"],
    links: {
      github: "https://github.com/Aakanksh94310/StructRAG",
    },
    tags: ["AI", "RAG", "Backend", "Dashboards"],
  },
  {
    title: "Smart Retail Analytics Dashboard",
    slug: "smart-retail-dashboard",
    summary:
      "Real-time retail analytics with a React frontend, FastAPI backend, and SingleStoreDB for streaming metrics, cohorts, and store KPIs.",
    outcome:
      "Faster insights for ops teams; reusable UI components cut interface build time by ~50%.",
    stack: ["React", "Next.js", "Tailwind", "FastAPI", "Python", "SingleStoreDB"],
    links: {
      github: "https://github.com/Aakanksh94310/Smart-Retail-Dashboard",
    },
    tags: ["Web", "Analytics", "Backend", "Dashboards"],
  },
  {
    title: "JSON Graph Explorer – LikeC4 DSL",
    slug: "json-graph-explorer",
    summary:
      "Visualizes complex JSON/AST as interactive LikeC4 diagrams. NiceGUI frontend triggers pipeline to render the LikeC4 viewer.",
    outcome:
      "Rapid architecture comprehension; deterministic DSL output for review + iteration.",
    stack: ["NiceGUI", "Python", "LikeC4", "Vite", "TypeScript"],
    links: {
      github: "https://github.com/Aakanksh94310/JSON-Graph-Explorer",
    },
    tags: ["Visualization", "Tools", "Python"],
  },
  {
    title: "Code Generator Tool",
    slug: "code-generator",
    summary:
      "Generates boilerplate and structured code from documentation using RAG + embeddings pipeline. Integrates LangChain, vector DB, and local LLMs.",
    outcome:
      "Boosted dev productivity by auto-creating scaffolds, cutting setup time by 30–40%.",
    stack: ["LangChain", "Python", "Vector DB", "Embeddings", "LLMs"],
    links: {
      github: "https://github.com/Aakanksh94310",
    },
    tags: ["AI", "Tools", "RAG"],
  },
];

const ALL_TAGS = Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort();

export default function ProjectsPage() {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (activeTags.length === 0) return PROJECTS;
    return PROJECTS.filter((p) => activeTags.every((t) => p.tags.includes(t)));
  }, [activeTags]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="relative min-h-screen pt-24 pb-20 px-6 lg:px-8">
      {/* Abstract Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300 mb-6 backdrop-blur-md">
            <Activity className="h-3.5 w-3.5" /> Systems & Applications
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Selected <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-400">
            A showcase of high-performance backend systems, AI workflows, and modern web applications built for scale.
          </p>
          
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest border border-white/10 backdrop-blur-md">
              <Filter className="h-3.5 w-3.5" /> Filter by tech
            </div>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all backdrop-blur-md ${
                  activeTags.includes(tag)
                    ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
            {activeTags.length > 0 && (
              <button
                onClick={() => setActiveTags([])}
                className="text-xs font-bold text-slate-500 hover:text-white transition px-2"
              >
                Reset
              </button>
            )}
          </div>
        </motion.section>

        {/* Grid */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, index) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={p.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl glass-card p-8 transition-all hover:border-cyan-500/30"
              >
                {/* Glow effect on hover */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/0 blur-[50px] transition-all duration-500 group-hover:bg-cyan-500/20" />

                <div className="relative z-10">
                  <div className="mb-6 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{p.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{p.summary}</p>
                  
                  {p.outcome && (
                    <div className="mt-6 rounded-2xl bg-white/5 p-4 border border-white/5 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500" />
                      <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Measured Impact
                      </p>
                      <p className="text-sm text-slate-200">"{p.outcome}"</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 relative z-10">
                  <div className="mb-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-slate-300 uppercase tracking-wider backdrop-blur-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {p.links.github && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-slate-200 hover:scale-105"
                      >
                        <Github className="h-4 w-4" /> View Source
                      </a>
                    )}
                    {p.links.live && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 hover:border-white/30 backdrop-blur-md"
                      >
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </section>

        {/* Footer CTA */}
        <motion.section 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          className="mt-24 relative overflow-hidden rounded-[2.5rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-12 text-center backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent pointer-events-none" />
          <h3 className="relative z-10 text-3xl font-extrabold text-white mb-4">Want to see more code?</h3>
          <p className="relative z-10 text-slate-400 mb-8 max-lg mx-auto text-lg">
            Check out my GitHub for open-source contributions, scripts, and deeper architectural explorations.
          </p>
          <div className="relative z-10 flex justify-center">
            <a
              href="https://github.com/Aakanksh94310"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-cyan-500 px-8 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:-translate-y-1"
            >
              <Github className="h-5 w-5" /> Explore GitHub
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}