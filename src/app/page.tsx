"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import type { Variants } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  GraduationCap,
  Code,
  BookOpenText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const letters = Array.from("Aakanksh");

// Typed variants (no spring union issues)
const brandVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    scale: 1,
    // keep TS happy: use duration/ease instead of spring union type
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function PortfolioLanding() {
  const [open, setOpen] = useState(false);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navItems = useMemo(
    () => [
      { href: "/academics", label: "Academics & Experience", icon: GraduationCap },
      { href: "/projects", label: "Projects", icon: Code },
      { href: "/blog", label: "Blog", icon: BookOpenText },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased pb-24 md:pb-0">
      {/* ====== PAGE CONTENT (blur + disable clicks when menu is open) ====== */}
      <div
        className={[
          "transition duration-200",
          open ? "blur-md brightness-75 pointer-events-none select-none" : "",
        ].join(" ")}
      >
        {/* Top gradient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="mx-auto h-[60vh] w-[120vw] max-w-none -translate-y-1/3 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-700/20 via-fuchsia-500/10 to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
            <Link href="/" className="group inline-flex items-center gap-2">
              <div className="h-3.5 w-3.5 rounded-full bg-indigo-500 transition-all group-hover:scale-110" />
              <span className="text-sm font-medium tracking-wide text-slate-300 group-hover:text-white">
                Aakanksh
              </span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/15 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
              >
                Resume
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              aria-label="Open menu"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/10 md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Hero */}
        <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 md:px-6 md:pt-20">
          <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Left: Brand + subtitle + CTAs */}
            <div>
              {/* Netflix-ish staggered brand */}
              <motion.h1
                variants={brandVariants}
                initial="hidden"
                animate="show"
                className="mb-3 flex flex-wrap text-5xl font-extrabold tracking-tight md:text-7xl"
              >
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    className="mr-[1px] inline-block bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(99,102,241,0.25)]"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle with blinking caret */}
              <div className="mb-6 flex items-center gap-2 text-lg text-slate-300 md:text-xl">
                <span>Ready to code</span>
                <span className="inline-block h-6 w-[2px] animate-pulse rounded bg-slate-400/70" />
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
                >
                  View Projects
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Contact Me
                </Link>
              </div>
            </div>

            {/* Right: Logo tiles */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <Link
                href="/academics"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl transition group-hover:scale-110" />
                <div className="relative flex h-full flex-col items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Academics & Experience
                  </h3>
                  <p className="text-sm text-slate-300">
                    Coursework, internships, impact, timeline.
                  </p>
                </div>
              </Link>

              <Link
                href="/projects"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-2xl transition group-hover:scale-110" />
                <div className="relative flex h-full flex-col items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Projects</h3>
                  <p className="text-sm text-slate-300">
                    RAG, FEA, Android, dashboards & more.
                  </p>
                </div>
              </Link>

              <Link
                href="/blog"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-2xl transition group-hover:scale-110" />
                <div className="relative flex h-full flex-col items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10">
                    <BookOpenText className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Blog</h3>
                  <p className="text-sm text-slate-300">
                    Short notes, deep dives, experiments.
                  </p>
                </div>
              </Link>

              {/* Empty spacer card for balance on md+ */}
              <div className="hidden rounded-2xl border border-white/10 bg-white/5 md:block" />
            </div>
          </section>

          {/* Highlights + CTA band */}
          <section className="mx-auto mt-6 max-w-6xl px-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Core Focus</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  AI Engineering • RAG • Agentic Systems
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Recent Impact</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  −40% debugging time • +30% eval speed
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Currently</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Software Dev Intern @ Rightworks
                </p>
              </div>
            </div>

            {/* Tech badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Next.js",
                "React",
                "Tailwind",
                "Framer Motion",
                "LangChain",
                "FastAPI",
                "Python",
                "TypeScript",
                "LLaMA 3.2",
                "Chroma",
                "NiceGUI",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Contact / CTA band */}
            <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600/20 via-fuchsia-500/10 to-cyan-500/10 p-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Open to full-time roles & collaborations
                </h3>
                <p className="text-sm text-slate-300">
                  Backend/Full-stack AI • RAG • Data • Platform tooling
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
                <Link
                  href="/projects"
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  See Projects
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer (desktop) */}
        <footer className="mx-auto hidden max-w-6xl items-center justify-between gap-4 px-4 pb-12 md:flex md:px-6">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Aakanksh Singh
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Aakanksh94310"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/aakankshsingh133/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="mailto:aakanksh.s10@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </footer>

        {/* Mobile sticky contact bar (hide when menu is open) */}
        {!open && (
          <div className="fixed inset-x-0 bottom-4 z-40 mx-auto w-[92%] md:hidden">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-2 backdrop-blur pointer-events-none">
              <div className="flex items-center justify-around pointer-events-auto">
                <a
                  aria-label="GitHub"
                  href="https://github.com/Aakanksh94310"
                  className="rounded-lg p-2 hover:bg-white/10"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/in/aakankshsingh133/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 hover:bg-white/10"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  aria-label="Email"
                  href="mailto:aakanksh.s10@gmail.com"
                  className="rounded-lg p-2 hover:bg-white/10"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====== OVERLAY MENU (on top; no backdrop-blur dependency) ====== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-slate-950/55"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mx-auto flex max-w-md flex-col gap-6 px-6 py-8 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close menu"
                className="self-end rounded-lg p-2 text-slate-200 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>

              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg text-white hover:bg-white/10"
                >
                  <Icon className="h-5 w-5" /> {label}
                </Link>
              ))}

              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg text-white hover:bg-white/10"
              >
                Resume
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}