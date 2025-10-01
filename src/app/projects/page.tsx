"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Github, Globe2, ChevronRight, Tag, Filter, Sparkles } from "lucide-react";

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
    stack: ["FastAPI", "LangChain", "Python", "Chroma", "LLaMA 3.2", "NiceGUI", "TypeScript"],
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
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      {/* Header band */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600/20 via-fuchsia-500/10 to-cyan-500/10 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Projects</h1>
            <p className="mt-1 text-slate-300">
              Selected work in AI, analytics, visualization, and engineering tools.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              <Sparkles className="h-4 w-4" /> Resume
            </Link>
            <a
              href="mailto:aakanksh.s10@gmail.com"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
            <Filter className="h-3.5 w-3.5" /> Filter by tags
          </span>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                activeTags.includes(tag)
                  ? "border-indigo-400 bg-indigo-500/20 text-white"
                  : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
            >
              <span className="inline-flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" /> {tag}
              </span>
            </button>
          ))}
          {activeTags.length > 0 && (
            <button
              onClick={() => setActiveTags([])}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 hover:bg-white/10"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((p) => (
          <article
            key={p.slug}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
          >
            {/* soft glow */}
            <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl transition group-hover:scale-110" />

            <h2 className="text-xl font-semibold text-white">{p.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{p.summary}</p>
            {p.outcome && (
              <p className="mt-2 text-sm text-slate-200">
                <span className="font-medium">Impact:</span> {p.outcome}
              </p>
            )}

            {/* stack pills */}
            <div className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* links */}
            <div className="mt-4 flex flex-wrap gap-3">
              {p.links.github && (
                <a
                  href={p.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
              {p.links.live && (
                <a
                  href={p.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
                >
                  <Globe2 className="h-4 w-4" /> Live
                </a>
              )}
              {p.links.doc && (
                <a
                  href={p.links.doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" /> Write-up
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* CTA band */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600/20 via-fuchsia-500/10 to-cyan-500/10 p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-semibold text-white">Want a deeper dive or a quick demo?</h3>
            <p className="text-sm text-slate-300">
              Happy to walk through architecture, trade-offs, and roadmap.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="mailto:aakanksh.s10@gmail.com"
              className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              Email Me
            </a>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Resume
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
