"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Building2, MapPin, CalendarDays, ExternalLink, TerminalSquare } from "lucide-react";

type Edu = {
  school: string;
  degree: string;
  place: string;
  period: string;
  details: string[];
};

type Role = {
  title: string;
  company: string;
  place: string;
  period: string;
  bullets: string[];
};

const education: Edu[] = [
  {
    school: "Syracuse University – College of Engineering",
    degree: "M.S. in Computer Science (CGPA 3.71/4.0)",
    place: "Syracuse, NY",
    period: "Dec 2025",
    details: [
      "Key Coursework: DSA, Systems Programming, Formal Methods, DBMS, Algorithms, Architecture, NLP",
    ],
  },
  {
    school: "SRM Institute of Science and Technology",
    degree: "B.Tech in Electronics & Communication (CGPA 9.2/10)",
    place: "Chennai, India",
    period: "Jun 2023",
    details: ["Coursework: Problem Solving (C/Python), Networks, Applied ML, Scientific Python"],
  },
];

const experience: Role[] = [
  {
    title: "Software Developer Intern",
    company: "Rightworks LLC",
    place: "Remote, USA",
    period: "Sep 2025 – Dec 2025",
    bullets: [
      "Hands-on AI development with Spark AI for complex accounting workflows.",
      "Engineered scalable AI pipelines for data transformation, quality evaluation, and automated validation.",
      "Partnered cross-functionally to ship reliable, production-ready enterprise features.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "RIA Advisory LLC",
    place: "Remote, USA",
    period: "Jun 2025 – Aug 2025",
    bullets: [
      "Automated 200+ regression cases using Selenium, achieving a 30% increase in test coverage.",
      "Reduced release defects by 25% through rigorous cross-browser testing and CI integration.",
    ],
  },
  {
    title: "Software Engineering & AI Intern",
    company: "Ascendion",
    place: "Remote, USA",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Architected LLM tools (RAG Extractor, Log Analyzer) that decreased debugging time by 40%.",
      "Accelerated model evaluation speed by 30% through custom dashboarding with NiceGUI.",
      "Contributed to Agentic AI research, pushing inference efficiency up by 25%.",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "InfluencivePress",
    place: "Bengaluru, India",
    period: "Jan 2023 – Dec 2023",
    bullets: [
      "Enhanced performance of 10+ core systems by 15% and deployed 15+ highly scalable APIs using Node.js and MongoDB.",
      "Drove test-driven development (TDD), increasing automated test cases via Jest and Selenium.",
    ],
  },
];

const techStack = [
  "Python", "TypeScript", "Node.js", "FastAPI", "React", "Next.js", 
  "Tailwind", "PostgreSQL", "MongoDB", "Redis", "Kafka", "Docker",
  "LangChain", "LLaMA", "PyTorch", "TensorFlow", "RAG", "NiceGUI"
];

export default function AcademicsAndExperiencePage() {
  return (
    <main className="relative min-h-screen pt-24 pb-20 px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute top-[10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-600/10 blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Header section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-300 mb-6 backdrop-blur-md mx-auto md:mx-0">
            <TerminalSquare className="h-3.5 w-3.5" /> Career Journey
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Experience & <span className="bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">Academics</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto md:mx-0">
            A timeline of building scalable systems, diving deep into AI research, and refining engineering fundamentals.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200 hover:scale-105"
            >
              <ExternalLink className="h-4 w-4" /> Download Resume
            </Link>
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-fuchsia-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Professional Experience</h2>
          </motion.div>

          <div className="relative space-y-12 before:absolute before:left-[19px] md:before:left-[23px] before:top-4 before:h-[calc(100%-32px)] before:w-0.5 before:bg-gradient-to-b before:from-fuchsia-500 before:via-purple-500/50 before:to-transparent">
            {experience.map((r, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx} 
                className="relative pl-12 md:pl-16"
              >
                {/* Glowing dot */}
                <div className="absolute left-[11px] md:left-[15px] top-5 h-4 w-4 rounded-full bg-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.8)] ring-4 ring-[#030712]" />
                
                <div className="glass-card rounded-3xl p-6 md:p-8 transition-all hover:border-fuchsia-500/30 group">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-fuchsia-300 transition-colors">{r.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm font-medium text-slate-400">
                        <span className="flex items-center gap-1.5 text-slate-200">
                          <Building2 className="h-4 w-4 text-fuchsia-400" /> {r.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" /> {r.place}
                        </span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold text-slate-300 backdrop-blur-md self-start">
                      <CalendarDays className="h-3.5 w-3.5 text-fuchsia-400" /> {r.period}
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {r.bullets.map((b, i) => (
                      <li key={i} className="flex gap-4 text-slate-300 text-sm md:text-base leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500/50" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Grid */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-blue-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Education</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {education.map((e, idx) => (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="glass-card rounded-3xl p-8 transition-all hover:border-blue-500/30 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <GraduationCap className="h-24 w-24 text-blue-400 group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <div className="relative z-10">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">
                    {e.period}
                  </div>
                  <h3 className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-blue-300 transition-colors pr-10">{e.school}</h3>
                  <p className="text-base font-medium text-slate-300 mb-4">{e.degree}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <MapPin className="h-4 w-4" /> {e.place}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Key Coursework</p>
                    <div className="flex flex-wrap gap-2">
                      {e.details[0].replace('Key Coursework: ', '').replace('Coursework: ', '').split(', ').map((course) => (
                        <span key={course} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300 backdrop-blur-sm">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Tech Arsenal */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-card rounded-[3rem] p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-transparent to-transparent pointer-events-none" />
            
            <h3 className="relative z-10 text-sm font-bold uppercase tracking-[0.3em] text-fuchsia-400 mb-8">
              Comprehensive Tech Stack
            </h3>
            <div className="relative z-10 flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm md:text-base font-bold text-slate-200 backdrop-blur-md transition-all hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10 hover:text-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(217,70,239,0.15)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}