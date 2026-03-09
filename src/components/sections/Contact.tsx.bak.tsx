"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import resumeData from "@/data/resume.json";
import { Github, Linkedin, Send, CheckCircle, AlertCircle, Loader2, MessageSquare, X } from "lucide-react";
import clsx from "clsx";

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form
      
      // Revert button back to idle after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <section id="contact" className="w-full bg-obsidian py-32 px-4 md:px-16 border-t border-white/5 relative overflow-hidden">
      {/* Background glow effects to keep the aesthetics high */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center relative z-10 w-full">
        
        {/* Main Heading & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="pb-8 lg:pb-12 space-y-4">
            <p className="text-cyan uppercase tracking-[0.3em] font-bold text-sm mb-4">Let's Connect</p>
            <h2 className="text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-heading font-black text-offwhite tracking-tighter flex flex-col gap-4 w-full px-4">
              <span className="pb-2">Ready to build something</span>
              <span className="text-[clamp(3.5rem,9vw,9rem)] text-indigo-400 italic break-words max-w-full">extraordinary?</span>
            </h2>
            <p className="text-muted text-lg mx-auto mt-8 max-w-xl hidden md:block">
              Drop me a message to discuss product opportunities, collaborations, or simply to say hello.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 h-14 rounded-full bg-cyan text-obsidian font-bold uppercase tracking-widest text-sm hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <MessageSquare className="w-5 h-5" /> Let's Talk
            </button>
            <a 
              href="https://www.linkedin.com/in/shubham-singh-pm/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-offwhite hover:border-cyan hover:bg-cyan/10 hover:text-cyan hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/shubhamsingh93/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-offwhite hover:border-cyan hover:bg-cyan/10 hover:text-cyan hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

      </div>

      {/* Floating Chat Popup Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[9999] w-[calc(100vw-32px)] md:w-[450px]"
          >
            <div className="relative w-full p-6 md:p-8 rounded-3xl bg-[#0a0a0a]/95 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <h3 className="text-xl font-heading font-bold text-offwhite flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_rgba(0,243,255,0.8)] animate-pulse" />
                  Let's Talk
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-offwhite hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                
                <div className="flex flex-col gap-2 group">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] text-muted group-focus-within:text-cyan transition-colors font-bold">Name</label>
                  <input 
                    id="name"
                    name="name"
                    type="text" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="How should I address you?"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-offwhite placeholder:text-white/20 focus:outline-none focus:border-cyan transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2 group">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-muted group-focus-within:text-cyan transition-colors font-bold">Email</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Where can I reach you?"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-offwhite placeholder:text-white/20 focus:outline-none focus:border-cyan transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2 group mt-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] text-muted group-focus-within:text-cyan transition-colors font-bold">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    rows={4}
                    className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-sm text-offwhite placeholder:text-white/20 focus:outline-none focus:border-cyan transition-colors resize-none mt-1"
                  />
                </div>

                {/* Status Messages */}
                {status === "error" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 text-xs mt-1 p-3 bg-red-400/10 rounded-lg border border-red-400/20">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <p>{errorMessage}</p>
                  </motion.div>
                )}
                
                {status === "success" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-400 text-xs mt-1 p-3 bg-green-400/10 rounded-lg border border-green-400/20">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <p>Message secured and sent. I'll be in touch soon.</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={clsx(
                    "mt-4 w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all duration-300",
                    status === "idle" || status === "error" ? "bg-cyan text-obsidian hover:bg-white hover:-translate-y-1 shadow-[0_0_20px_rgba(0,255,255,0.3)]" : "",
                    status === "loading" ? "bg-cyan/50 text-obsidian cursor-not-allowed" : "",
                    status === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default" : ""
                  )}
                >
                  {status === "idle" && <><Send className="w-3.5 h-3.5" /> Send Message</>}
                  {status === "error" && "Try Again"}
                  {status === "loading" && <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Transmitting...</>}
                  {status === "success" && "Sent Successfully"}
                </button>

              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
