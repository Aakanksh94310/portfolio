"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", sender: "bot", text: "Hi! I am an AI trained on Aakanksh's resume. Ask me anything about his experience or skills!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Worker
  useEffect(() => {
    // Only load worker when the chat is opened for the first time
    if (isOpen && !workerRef.current) {
      workerRef.current = new Worker(new URL("../worker.ts", import.meta.url), { type: "module" });

      workerRef.current.onmessage = (e) => {
        const { type, data, result, error } = e.data;

        if (type === "progress") {
          setLoadingStatus(`Loading AI Model... (${data.status})`);
          if (data.progress) {
            setLoadingProgress(Math.round(data.progress));
          }
        } else if (type === "ready") {
          setIsLoaded(true);
        } else if (type === "answer") {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), sender: "bot", text: result }
          ]);
        } else if (type === "error") {
          setIsTyping(false);
          console.error("Worker error:", error);
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), sender: "bot", text: "Oops! Something went wrong processing your question." }
          ]);
        }
      };

      // Tell worker to load the model
      workerRef.current.postMessage({ type: "load" });
    }

    return () => {
      // Cleanup if needed (though we might want to keep it alive across toggles)
    };
  }, [isOpen]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isLoaded || isTyping) return;

    const query = input.trim();
    setInput("");
    
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text: query }
    ]);
    setIsTyping(true);

    workerRef.current?.postMessage({ type: "ask", text: query });
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : ''}`}
        aria-label="Open Chat"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[100] flex h-[500px] w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#030712]/90 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Aakanksh AI</h3>
                  <p className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    In-Browser Transformer
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!isLoaded && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-slate-400">
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                  <div>
                    <p className="text-sm font-medium">{loadingStatus}</p>
                    <div className="mt-2 h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-400 transition-all duration-300"
                        style={{ width: `${loadingProgress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 max-w-[200px]">
                    Downloading a tiny (~65MB) ML model to your browser. This only happens once!
                  </p>
                </div>
              )}

              {isLoaded && messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.sender === "user" ? "bg-white/10 text-white" : "bg-cyan-500/20 text-cyan-400"}`}>
                    {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${msg.sender === "user" ? "bg-cyan-600 text-white rounded-tr-sm" : "bg-white/5 border border-white/5 text-slate-200 rounded-tl-sm"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 bg-white/5 p-3">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={!isLoaded || isTyping}
                  placeholder={!isLoaded ? "Loading AI..." : "Ask about Aakanksh..."}
                  className="flex-1 rounded-xl border border-white/10 bg-[#030712]/50 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none disabled:opacity-50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!isLoaded || isTyping || !input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}