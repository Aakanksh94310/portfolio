"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  GraduationCap,
  Code2,
  BookOpen,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "/projects", label: "Projects" },
    { href: "/academics", label: "Experience" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-50 selection:bg-cyan-500/30 font-sans overflow-hidden">
      
      {/* Background Animated Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/20 blur-[120px] animate-float mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-fuchsia-600/20 blur-[120px] animate-float-delayed mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[150px] animate-float mix-blend-screen" />
      </div>

      {/* Dynamic Cursor Light (Desktop Only) */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 hidden md:block transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      <div className={["relative z-10 transition-all duration-500", isMobileMenuOpen ? "blur-md opacity-40 pointer-events-none" : ""].join(" ")}>
        
        {/* Navigation */}
        <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#030712]/50 backdrop-blur-xl supports-[backdrop-filter]:bg-[#030712]/20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-transform group-hover:scale-105">
                <Terminal className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-wide text-white">AAKANKSH</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">
                  {item.label}
                </Link>
              ))}
              <div className="h-4 w-px bg-white/10" />
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-all hover:bg-white/10 hover:ring-white/20"
              >
                Let's Talk
                <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </nav>

            <button
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8 lg:pt-40">
          
          {/* Hero Section */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 mb-8 backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Available for Full-Time Roles
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              Building the <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">next generation</span> <br className="hidden sm:block" />
              of software.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              I am a Software Engineer & AI Researcher specializing in scalable backends, Agentic systems, and high-performance applications.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/projects"
                className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 text-sm font-bold text-slate-950 transition-transform hover:scale-105 active:scale-95"
              >
                View My Work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10 hover:border-white/20"
              >
                Download Resume
              </Link>
            </motion.div>
          </div>

          {/* Bento Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mt-24 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 auto-rows-[200px]"
          >
            {/* Box 1: Experience (Spans 2 cols, 1 row) */}
            <Link href="/academics" className="group relative col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1 overflow-hidden rounded-3xl glass-card p-8 flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-6 opacity-0 transform translate-x-4 -translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
                <ArrowUpRight className="h-6 w-6 text-white" />
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-purple-600/20 border border-fuchsia-500/30 flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-fuchsia-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Experience & Academics</h3>
                <p className="text-slate-400 text-sm">Rightworks, Ascendion, Syracuse University</p>
              </div>
              {/* Background gradient flare */}
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-fuchsia-600/20 rounded-full blur-[40px] group-hover:bg-fuchsia-500/30 transition-colors" />
            </Link>

            {/* Box 2: Tech Stack */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-2 overflow-hidden rounded-3xl glass-card p-8 relative">
              <h3 className="text-lg font-bold text-white mb-6">Core Arsenal</h3>
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Languages</span>
                  <span className="text-sm font-medium text-slate-200">Python, TypeScript, C++</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Backend</span>
                  <span className="text-sm font-medium text-slate-200">FastAPI, Node.js, PostgreSQL, Redis, Kafka</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">AI / ML</span>
                  <span className="text-sm font-medium text-slate-200">LangChain, PyTorch, RAG, Chroma</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Frontend</span>
                  <span className="text-sm font-medium text-slate-200">React, Next.js, Tailwind</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
            </div>

            {/* Box 3: Socials */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 overflow-hidden rounded-3xl glass-card p-6 flex flex-col justify-center gap-4">
              <a href="https://github.com/Aakanksh94310" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl bg-white/5 p-4 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">GitHub</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/aakankshsingh133/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl bg-white/5 p-4 border border-white/5 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-all">
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-slate-300 group-hover:text-[#0A66C2] transition-colors" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">LinkedIn</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Box 4: Blog (Spans 2 cols) */}
            <Link href="/blog" className="group relative col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1 overflow-hidden rounded-3xl glass-card p-8 flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-6 opacity-0 transform translate-x-4 -translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
                <ArrowUpRight className="h-6 w-6 text-white" />
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Engineering Blog</h3>
                <p className="text-slate-400 text-sm">Thoughts on System Design, Performance & AI architecture.</p>
              </div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-[40px] group-hover:bg-cyan-500/30 transition-colors" />
            </Link>

            {/* Box 5: Projects */}
            <Link href="/projects" className="group relative col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-1 overflow-hidden rounded-3xl glass-card p-8 flex flex-col justify-between bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/20 hover:border-blue-400/40">
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <ChevronRight className="h-5 w-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white">Projects</h3>
                <p className="text-blue-200 text-sm mt-1">StructRAG, Analytics & More</p>
              </div>
            </Link>
          </motion.div>

        </main>

        {/* Footer */}
        <footer className="mx-auto max-w-7xl px-6 py-12 border-t border-white/5 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Aakanksh Singh. Crafted with precision.</p>
          <div className="flex items-center gap-6">
            <a href="mailto:aakanksh.s10@gmail.com" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2">
              <Mail className="h-4 w-4" /> aakanksh.s10@gmail.com
            </a>
          </div>
        </footer>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#030712]/95 backdrop-blur-xl p-6"
          >
            <div className="flex justify-end mb-8">
              <button
                className="p-2 text-white bg-white/10 rounded-full hover:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-slate-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-bold text-cyan-400 mt-4"
              >
                Contact Me
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-medium text-slate-400 mt-8 flex items-center justify-center gap-2"
              >
                Resume <ArrowUpRight className="h-5 w-5" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}