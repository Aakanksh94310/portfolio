"use client";

import React, { useState } from "react";
import { Mail, Linkedin, Github, Send, CheckCircle2, MessageSquareCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate network request
    setTimeout(() => {
      setFormState("sent");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <main className="relative min-h-screen pt-24 pb-20 px-6 lg:px-8 flex items-center justify-center">
      {/* Background Orbs */}
      <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-fuchsia-600/10 blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="mx-auto w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          
          {/* Left side: Info (Spans 2 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300 mb-6 backdrop-blur-md self-start">
              <MessageSquareCode className="h-3.5 w-3.5" /> Initialize Connection
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white mb-6 md:text-6xl">
              Let's build <br className="hidden lg:block"/> something <span className="bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent">epic.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-12 leading-relaxed">
              Open for full-time opportunities, architectural discussions, or just a chat about the latest in AI and backend systems. Drop a payload below.
            </p>

            <div className="flex flex-col gap-4">
              <a 
                href="mailto:aakanksh.s10@gmail.com" 
                className="group flex items-center gap-5 rounded-3xl glass-card p-4 transition-all hover:border-blue-500/40 hover:bg-blue-500/5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-300 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Direct Line</p>
                  <p className="text-slate-200 font-semibold group-hover:text-white transition-colors">aakanksh.s10@gmail.com</p>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/aakankshsingh133/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-3xl glass-card p-4 transition-all hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-300 group-hover:text-[#0A66C2] group-hover:border-[#0A66C2]/30 transition-all">
                  <Linkedin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Professional Network</p>
                  <p className="text-slate-200 font-semibold group-hover:text-white transition-colors">in/aakankshsingh133</p>
                </div>
              </a>

              <a 
                href="https://github.com/Aakanksh94310" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-3xl glass-card p-4 transition-all hover:border-white/40 hover:bg-white/5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-300 group-hover:text-white group-hover:border-white/30 transition-all">
                  <Github className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Open Source</p>
                  <p className="text-slate-200 font-semibold group-hover:text-white transition-colors">Aakanksh94310</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right side: Form (Spans 3 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 relative"
          >
            {/* Form glowing border effect */}
            <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-br from-blue-500/30 via-fuchsia-500/10 to-transparent z-0 opacity-50" />
            
            <div className="relative z-10 rounded-[2.5rem] bg-[#030712]/80 backdrop-blur-2xl p-8 sm:p-12 border border-white/5 shadow-2xl">
              <AnimatePresence mode="wait">
                {formState !== "sent" ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Identifier</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your Name"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Return Address</label>
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="you@domain.com"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Payload</label>
                      <textarea 
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Describe the opportunity or project..."
                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none transition-all"
                      />
                    </div>
                    <button 
                      disabled={formState === "sending"}
                      type="submit"
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-4 text-sm font-bold text-slate-950 transition-all hover:bg-blue-400 hover:shadow-[0_0_30px_rgba(96,165,250,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:shadow-none"
                    >
                      {formState === "sending" ? "Transmitting..." : (
                        <>Transmit Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="mb-8 relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-[30px] opacity-40 animate-pulse" />
                      <CheckCircle2 className="h-20 w-20 text-blue-400 relative z-10" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-4">Transmission Successful</h2>
                    <p className="text-slate-400 mb-10 max-w-sm">Payload received. I'll parse the data and initialize a response shortly.</p>
                    <button 
                      onClick={() => setFormState("idle")}
                      className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10"
                    >
                      Send another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}