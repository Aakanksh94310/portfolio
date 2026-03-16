"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  MessageSquare, 
  Calendar, 
  User, 
  X,
  Send,
  PenLine
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  text: string;
  author: string;
  date: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  comments: Comment[];
  isInitial?: boolean;
}

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "What If You Need to Check 10 Million Usernames in Under 1 Millisecond?",
    author: "Aakanksh Singh",
    date: "March 15, 2024",
    content: `Every second, platforms like GitHub, Instagram, and X process thousands of username availability checks. A seemingly simple operation that becomes a critical performance bottleneck at scale.\n\nBuilt a production-grade performance experiment with Aakanksh Singh to answer a fundamental question: how do different architectures handle username availability checks when you have millions of existing users?\n\nWe tested three approaches against 10 million usernames under a sustained load of 1000 requests/second: same dataset, same traffic pattern, completely different performance characteristics.\n\nThe Results:\nPostgreSQL Direct Query: Simple, but it becomes the bottleneck. Every request hits the database, creating tight coupling and unavoidable network latency.\n\nRedis In-Memory Cache: 8x faster than PostgreSQL with zero database queries after initial load. Trade-off: requires 487MB memory for 10M usernames.\n\nBloom Filter: 300x faster than PostgreSQL. 95% of requests return instantly without touching the database. Uses only 9.6MB memory—50x more efficient than Redis. The remaining 5% verify with PostgreSQL, transparent to users.\n\nThe Architecture Difference:\nPostgreSQL creates a database dependency for every request. Redis eliminates queries but demands significant memory. Bloom Filters provide probabilistic guarantees with no false negatives, combining speed, memory efficiency, and acceptable accuracy.\n\nReal-World Impact:\nGitHub uses Bloom filters to check passwords against 10 billion leaked credentials in <1ms. Chrome detects malicious URLs locally. Medium filters already-read articles from feeds.\n\nThis is part of my What If Series—exploring system design decisions through production-ready experiments rather than theory.`,
    comments: [],
    isInitial: true
  },
  {
    id: "2",
    title: "What If Your Database Goes Down? REST vs Kafka Under Fire",
    author: "Aakanksh Singh",
    date: "February 28, 2024",
    content: `Built a production-grade chaos engineering POC with Aakanksh Singh to answer a fundamental question: how do synchronous and asynchronous architectures handle infrastructure failures?\n\nWe simulated a real-world scenario where PostgreSQL crashes for 2 minutes under constant load (50 requests/second). Same failure, same traffic, different architectures.\n\nThe Setup:\nAutomated k6 load testing with Docker-based chaos injection. Both systems processed location updates at identical rates when we killed the database mid-flight.\n\nThe Results:\nREST API: 50% error rate. Every request is blocked, waiting for the database; there is no buffering, no recovery, and immediate cascading failure.\n\nKafka: 0% error rate. Producer API kept accepting events. Messages are buffered in Kafka topics. Consumer circuit breaker detected the failure, paused processing, and automatically recovered when the database came back online.\n\nThe Architecture Difference:\nREST creates tight coupling between the API and the database. When one fails, both fail.\n\nKafka decouples producers from consumers. The event stream acts as a shock absorber during outages, allowing each component to operate independently.`,
    comments: [],
    isInitial: true
  },
  {
    id: "3",
    title: "What If.. Episode 1: What If Your LLM Didn’t Have to Think Twice?",
    author: "Aakanksh Singh and Bhupesh Chikara",
    date: "January 12, 2024",
    content: `In most AI systems, every user prompt is treated as a brand-new event. Same question. Same intent. Same tokens regenerated. This leads to unnecessary latency and wasted compute.\n\nSo we asked a simple question: What if the LLM was the last thing you called, not the first?\n\nThe What If Series: This series is a technical exploration into rethinking software architecture patterns and uncovering performance optimizations that are often overlooked in standard software stacks.\n\nInstead of optimizing the model itself, we focused on optimizing how often the model is invoked.\n\nStandard LLM Request Flow vs. Multi-Tiered Response Memoization\nWe engineered a three-tier orchestration layer that sits in front of the LLM and treats it as a compute-heavy resource, only accessed when smarter mechanisms fail.\n\nArchitecture Overview\n1. Deterministic Tier (Exact Match): Before any processing begins, the system hashes the prompt bundle using SHA-256. If an identical request has been seen before, the response is served directly from Redis in milliseconds, bypassing the model entirely.\n\n2. Semantic Tier (Meaning-Based Match): Human language is non-deterministic. By storing previous queries as vector embeddings, the system identifies semantically equivalent prompts and serves the existing response, avoiding redundant model calls.\n\n3. Concurrency Tier (Single-Flight Deduplication): When multiple identical requests hit the system simultaneously, they are collapsed into a single execution flight. The LLM is invoked once, and the generated response is shared with all waiting callers, preventing redundant work and reducing system strain.\n\nWhy This Matters: This approach transforms a stateless, repetitive LLM API into a stateful system that optimizes its own execution path.`,
    comments: [],
    isInitial: true
  }
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [activeCommentBlogId, setActiveCommentBlogId] = useState<string | null>(null);
  
  // Form states
  const [newBlog, setNewBlog] = useState({ title: "", content: "", author: "" });
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("aakanksh_blogs_v2");
    if (saved) {
      setBlogs(JSON.parse(saved));
    } else {
      setBlogs(INITIAL_BLOGS);
    }
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      localStorage.setItem("aakanksh_blogs_v2", JSON.stringify(blogs));
    }
  }, [blogs]);

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content || !newBlog.author) return;
    
    const blog: BlogPost = {
      id: Date.now().toString(),
      title: newBlog.title,
      content: newBlog.content,
      author: newBlog.author,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      comments: []
    };
    
    setBlogs([blog, ...blogs]);
    setNewBlog({ title: "", content: "", author: "" });
    setIsWriteModalOpen(false);
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const handleAddComment = (blogId: string) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: "Guest Developer",
      date: "Just now"
    };
    
    setBlogs(blogs.map(b => b.id === blogId ? { ...b, comments: [...b.comments, comment] } : b));
    setNewComment("");
  };

  return (
    <main className="relative min-h-screen pt-24 pb-20 px-6 lg:px-8">
      {/* Abstract Background Glow */}
      <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="mx-auto max-w-4xl relative z-10">
        
        {/* Header section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 mb-6 backdrop-blur-md">
              <PenLine className="h-3.5 w-3.5" /> Engineering Notes
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
              The <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">What If</span> Series
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-xl">
              Exploring system design decisions through production-ready experiments rather than theory.
            </p>
          </div>
          <button 
            onClick={() => setIsWriteModalOpen(true)}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" /> Write Post
          </button>
        </motion.section>

        <div className="space-y-12">
          <AnimatePresence>
            {blogs.map((blog, index) => (
              <motion.article 
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={blog.id} 
                className="group relative rounded-3xl glass-card p-8 md:p-10 transition-all hover:border-cyan-500/30 overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/0 blur-[60px] transition-all duration-700 group-hover:bg-cyan-500/10" />

                <div className="relative z-10">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5 text-cyan-400"><Calendar className="h-4 w-4" /> {blog.date}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-700" />
                      <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {blog.author}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="rounded-xl bg-red-500/10 p-2.5 text-red-400 opacity-0 transition-all hover:bg-red-500 hover:text-white group-hover:opacity-100"
                      title="Delete post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <h2 className="mb-6 text-3xl font-extrabold text-white leading-tight group-hover:text-cyan-300 transition-colors">{blog.title}</h2>
                  <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                    {blog.content}
                  </div>

                  {/* Comment Section Toggle */}
                  <div className="mt-10 pt-6 border-t border-white/10">
                    <button 
                      onClick={() => setActiveCommentBlogId(activeCommentBlogId === blog.id ? null : blog.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <MessageSquare className="h-4 w-4 text-cyan-400" /> 
                      {blog.comments.length} Discussion{blog.comments.length !== 1 && 's'}
                    </button>

                    <AnimatePresence>
                      {activeCommentBlogId === blog.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-8 space-y-4">
                            {blog.comments.map((c) => (
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={c.id} 
                                className="rounded-2xl bg-[#030712]/50 p-5 border border-white/5 backdrop-blur-md"
                              >
                                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                                  <span className="text-cyan-300 flex items-center gap-2"><User className="h-3 w-3" /> {c.author}</span>
                                  <span className="text-slate-500">{c.date}</span>
                                </div>
                                <p className="text-sm text-slate-200">{c.text}</p>
                              </motion.div>
                            ))}
                            
                            <div className="flex gap-3 mt-6">
                              <input 
                                type="text" 
                                placeholder="Add to the discussion..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment(blog.id)}
                                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:bg-white/10 focus:outline-none transition-all backdrop-blur-md"
                              />
                              <button 
                                onClick={() => handleAddComment(blog.id)}
                                className="flex items-center justify-center rounded-2xl bg-cyan-500 p-3 text-slate-950 hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                              >
                                <Send className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Write Blog Modal */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#030712]/80 backdrop-blur-xl"
              onClick={() => setIsWriteModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f172a] shadow-2xl"
            >
              {/* Modal Header Glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-600" />
              
              <div className="p-8 sm:p-10">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-3xl font-extrabold text-white">Draft New Post</h2>
                  <button 
                    onClick={() => setIsWriteModalOpen(false)}
                    className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleCreateBlog} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Author Name</label>
                    <input 
                      required
                      type="text" 
                      value={newBlog.author}
                      onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                      placeholder="e.g. Satoshi Nakamoto"
                      className="w-full rounded-2xl border border-white/10 bg-[#030712]/50 px-5 py-4 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:bg-white/5 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Post Title</label>
                    <input 
                      required
                      type="text" 
                      value={newBlog.title}
                      onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                      placeholder="e.g. Architecting for 10M Concurrent Users"
                      className="w-full rounded-2xl border border-white/10 bg-[#030712]/50 px-5 py-4 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:bg-white/5 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Content</label>
                    <textarea 
                      required
                      rows={8}
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                      placeholder="Share your engineering insights, architectural decisions, or performance metrics..."
                      className="w-full resize-none rounded-2xl border border-white/10 bg-[#030712]/50 px-5 py-4 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:bg-white/5 focus:outline-none transition-all"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(34,211,238,0.3)] mt-4"
                  >
                    Publish to Network
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}