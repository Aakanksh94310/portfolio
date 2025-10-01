import Link from "next/link";
import { GraduationCap, Briefcase, Building2, MapPin, CalendarDays, ExternalLink } from "lucide-react";

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
    school: "Syracuse University – College of Engineering & Computer Science",
    degree: "M.S. in Computer Science (CGPA 3.63/4.0)",
    place: "Syracuse, NY",
    period: "Expected: Dec 2025",
    details: [
      "Key Coursework: DSA, Systems & Network Programming, Formal Methods, DBMS, Algorithms, Computer Architecture, NLP",
    ],
  },
  {
    school: "SRM Institute of Science and Technology (SRMIST)",
    degree: "B.Tech in Electronics & Communication Engineering (CGPA 9.2/10)",
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
    period: "Sep 2025 – Present",
    bullets: [
      "Hands-on AI development with Spark AI for accounting workflows.",
      "Scalable AI pipelines for data transformation, quality evaluation, and automation.",
      "Cross-functional collaboration to ship reliable, production-ready features.",
    ],
  },
  {
    title: "Intern – Technology Track (Software Engineering)",
    company: "RIA Advisory LLC",
    place: "Remote, USA",
    period: "Jun 2025 – Aug 2025",
    bullets: [
      "Automated 200+ regression cases with Selenium; +30% test coverage, −25% release defects.",
      "Cross-browser testing, Jira defect logging, verification with devs.",
    ],
  },
  {
    title: "Software Engineering & AI Intern",
    company: "Ascendion",
    place: "Remote, USA",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Built LLM tools (RAG Extractor, Log Analyzer) & dashboards: −40% debugging time, +30% model eval speed.",
      "Reusable UIs with NiceGUI; 50% faster interface development.",
      "Contributed to MCP & Agentic AI research toward +25% inference efficiency.",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "InfluencivePress",
    place: "Bengaluru, India",
    period: "Jan 2023 – Dec 2023",
    bullets: [
      "Enhanced performance of 10+ systems by 15%, built 15+ scalable APIs (Node.js + MongoDB).",
      "Increased automated test coverage (Selenium/Jest, +50 cases).",
    ],
  },
];

export default function AcademicsAndExperiencePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      {/* Header band */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600/20 via-fuchsia-500/10 to-cyan-500/10 p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Academics & Work Experience
        </h1>
        <p className="mt-2 text-slate-300">
          A quick, visual snapshot of my education and roles—built for skimmability and clarity.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 inline-flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" /> Download Resume
          </Link>
          <a
            href="mailto:aakanksh.s10@gmail.com"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* Two-column grid: Education | Experience */}
      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Education */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <h2 className="text-xl font-semibold text-white">Education</h2>
          </div>

          <div className="space-y-4">
            {education.map((e, idx) => (
              <article
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{e.school}</h3>
                    <p className="text-sm text-slate-300">{e.degree}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-xs text-slate-300">
                      <CalendarDays className="h-4 w-4" /> {e.period}
                    </div>
                    <div className="mt-1 flex items-center justify-end gap-2 text-xs text-slate-300">
                      <MapPin className="h-4 w-4" /> {e.place}
                    </div>
                  </div>
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
                  {e.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            <h2 className="text-xl font-semibold text-white">Experience</h2>
          </div>

          <div className="space-y-4">
            {experience.map((r, idx) => (
              <article
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{r.title}</h3>
                    <p className="text-sm text-slate-300 flex items-center gap-2">
                      <Building2 className="h-4 w-4" /> {r.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-xs text-slate-300">
                      <CalendarDays className="h-4 w-4" /> {r.period}
                    </div>
                    <div className="mt-1 flex items-center justify-end gap-2 text-xs text-slate-300">
                      <MapPin className="h-4 w-4" /> {r.place}
                    </div>
                  </div>
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
                  {r.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Snapshot badges */}
      <section className="mt-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Focus & Tools
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Spark AI",
              "LangChain",
              "Agentic AI",
              "RAG",
              "Next.js",
              "React",
              "Tailwind",
              "Python",
              "FastAPI",
              "TypeScript",
              "TensorFlow",
              "PyTorch",
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
        </div>
      </section>
    </main>
  );
}
