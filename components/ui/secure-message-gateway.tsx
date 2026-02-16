
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Plus, Mail, Check, X } from "lucide-react";
import { cn } from "../../lib/utils";
import TextCursorProximity from "./text-cursor-proximity";
import { motion, AnimatePresence } from "framer-motion";

export function CreateCorners({ children }: { children?: React.ReactNode }) {
  const positions = [
    "top-0 -left-3",
    "top-0 -right-3",
    "bottom-0 -left-3",
    "bottom-0 -right-3",
  ];

  return (
    <div className="absolute z-10 inset-0 pointer-events-none">
      {positions.map((pos, index) => (
        <section key={index} className={`absolute ${pos}`}>
          {children}
        </section>
      ))}
    </div>
  );
}

const QuestionItem: React.FC<{ 
  question: string; 
  index: number;
  labels?: string[];
}> = ({ question, index, labels = ["YES", "YES"] }) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3 group/q">
      <p className="text-[0.7rem] md:text-[0.75rem] font-mono leading-relaxed text-white/80 group-hover/q:text-white transition-colors">
        <span className="text-green-400 mr-2">0{index + 1}.</span> {question}
      </p>
      <div className="flex flex-wrap gap-3">
        {labels.map((label, boxIdx) => (
          <button
            key={boxIdx}
            type="button"
            onClick={() => setSelected(boxIdx)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border border-dashed transition-all duration-300 font-mono text-[0.65rem] tracking-widest uppercase",
              selected === boxIdx 
                ? "bg-green-400/20 border-green-400 text-green-400" 
                : "bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white/60"
            )}
          >
            <div className={cn(
              "w-3 h-3 border flex items-center justify-center transition-all flex-shrink-0",
              selected === boxIdx ? "border-green-400 bg-green-400" : "border-white/20"
            )}>
              {selected === boxIdx && <Check size={10} className="text-black font-bold" />}
            </div>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export const SecureMessageGateway = () => {
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const questions = [
    {
      text: "Do you want your weekly promotions, price updates, in-store leaflets and all your social media marketing to look really cool?",
      labels: ["YES", "YES"]
    },
    {
      text: "If attention grabbing social media posts could boost sales, would N$1400 p/month be worth it?",
      labels: ["YES", "YES"]
    },
    {
      text: "If marketing was one less thing to worry about, wouldn’t running the store be easier?",
      labels: ["YES", "YES"]
    },
    {
      text: "Your Weekly Specials + Our Creative Expertise = More Foot Traffic",
      labels: ["onawa studio", "N$1400 p/month"]
    }
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || pending) return;

    setPending(true);
    setTimeout(() => {
      setPending(false);
      setEmail("");
      setShowPopup(true);
    }, 1500);
  }

  return (
    <div className="flex items-center justify-center min-h-[300px] w-full p-4 bg-transparent text-white">
      <div className="relative w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 border-dashed shadow-sm p-6 sm:p-10 transition-all rounded-none">

        <CreateCorners>
          <Plus className="font-[200] text-green-300 w-6 h-6"/>
        </CreateCorners>
        
        <div className="min-h-full z-0 w-full bg-transparent absolute top-0 left-0 pointer-events-none">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
              maskImage: "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
            }}
          />
        </div>

        <div className="backdrop-blur-xs p-2 rounded-xs relative z-10">
          <div className="mb-8 z-10">
            <h2 className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/70 mb-1 flex border-b border-green-400/30 pb-2 items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">On-Demand Assessment</span>
            </h2>
            <h1 className="text-xl font-semibold text-white tracking-tight mt-4">
               Upgrade your <span className="text-green-400">Operation</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              {questions.map((q, i) => (
                <QuestionItem 
                  key={i} 
                  question={q.text} 
                  index={i} 
                  labels={q.labels}
                />
              ))}
            </div>

            <div className="h-px w-full bg-gradient-to-r from-green-400/20 via-white/5 to-transparent" />

            <div className="relative group">
              <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-green-400 opacity-0 group-focus-within:opacity-100 transition-all z-10" />
              <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-green-400 opacity-0 group-focus-within:opacity-100 transition-all z-10" />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-green-400 transition-colors z-10">
                <Mail size={14} />
              </div>
              <input
                type="email"
                placeholder="CONTACT EMAIL >>"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={pending}
                className={cn(
                  "w-full bg-white/5 border border-white/10 rounded-none h-12",
                  "font-mono text-[0.75rem] p-3 pl-10 outline-none transition-all",
                  "placeholder:text-white/30 text-white",
                  "focus:bg-green-900/10 focus:ring-1 focus:ring-green-400/20 focus:border-green-500 border-dashed",
                  pending && "opacity-50 cursor-not-allowed"
                )}
              />
            </div>

            <button
              type="submit"
              disabled={pending || !email.trim()}
              className={cn(
                "w-full h-12 border border-white/10 bg-white/5 font-bold uppercase text-[0.6rem] tracking-[0.2em] border-dashed transition-all flex items-center justify-center gap-2 rounded-none text-white",
                !pending && email.trim() && "hover:border-green-500 hover:text-green-400 hover:bg-green-900/20 active:scale-95",
                (pending || !email.trim()) && "opacity-40 cursor-not-allowed"
              )}
            >
              <Send size={12} className={cn(pending && "animate-bounce")} />
              <span>{pending ? "INITIATING..." : "SEND REQUEST"}</span>
            </button>
          </form>
        </div>

        <div className="mt-6 flex items-center justify-between relative z-10">
           <span className="text-[0.55rem] font-mono uppercase tracking-widest text-white/40">
              UPLINK: {pending ? <span className="text-white/60">Transmitting Data...</span> : <span className="text-green-500 border-b border-green-500/50">SECURE</span>}
           </span>
           <span className="text-[0.55rem] font-mono text-white/20">
              NODE_ID: 0x44FE1
           </span>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          >
            <div 
              ref={popupRef}
              className="relative w-full h-full flex flex-col items-center justify-center text-center cursor-default"
            >
              <div className="flex flex-col items-center space-y-2 md:space-y-4 max-w-4xl px-6">
                
                {/* LINE 1 */}
                <TextCursorProximity
                  label="Design + Motion + Social"
                  className="text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white"
                  containerRef={popupRef}
                  radius={150}
                  falloff="gaussian"
                  styles={{
                    transform: { from: "scale(1)", to: "scale(1.15)" },
                    opacity: { from: 0.4, to: 1 },
                  }}
                />

                {/* THE EXIT BUTTON (X in the equation) */}
                <div className="relative group py-8 md:py-12">
                   <button 
                     onClick={() => setShowPopup(false)}
                     className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-full border-2 border-dashed border-green-400 bg-green-400/10 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-500 scale-125 md:scale-150 relative z-10"
                   >
                     <X size={32} strokeWidth={3} />
                   </button>
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="text-[0.5rem] md:text-[0.6rem] font-mono tracking-widest text-green-400 uppercase">
                        Press X to exit
                     </span>
                   </div>
                </div>

                {/* LINE 2 */}
                <TextCursorProximity
                  label="More Sales, Less Stress"
                  className="text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white/70"
                  containerRef={popupRef}
                  radius={150}
                  falloff="gaussian"
                  styles={{
                    transform: { from: "scale(1)", to: "scale(1.1)" },
                    color: { from: "rgba(255,255,255,0.4)", to: "#ccff00" }
                  }}
                />

                {/* LINE 3 */}
                <div className="pt-4 md:pt-8">
                  <TextCursorProximity
                    label="= N$1400.00p/m"
                    className="text-3xl md:text-6xl lg:text-7xl font-black tracking-widest text-[#ccff00] drop-shadow-[0_0_25px_rgba(204,255,0,0.3)]"
                    containerRef={popupRef}
                    radius={200}
                    falloff="exponential"
                    styles={{
                      transform: { from: "scale(1)", to: "scale(1.2)" },
                    }}
                  />
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[160px] pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecureMessageGateway;
