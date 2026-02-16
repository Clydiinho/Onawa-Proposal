import React from "react";
import { LinkPreview } from "./ui/link-preview";
import { Search, PenTool, Rocket } from "lucide-react";

export default function AboutMe() {
  const steps = [
    {
      number: "01",
      title: "Insight",
      description: "A deep dive into your brand's DNA to identify core friction points and opportunities for disruption.",
      icon: Search
    },
    {
      number: "02",
      title: "Creation",
      description: "High-fidelity execution where pixels meet purpose and motion design breathes life into your vision.",
      icon: PenTool
    },
    {
      number: "03",
      title: "Refinement",
      description: "Meticulous polishing and testing until the interface feels effortless, expensive, and pixel-perfect.",
      icon: Rocket
    }
  ];

  return (
    <section className="relative z-20 py-32 md:py-48 bg-black/40 backdrop-blur-md flex justify-center items-center overflow-hidden border-y border-white/5">
      <div className="container max-w-6xl px-6 md:px-12 relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Panel: The Operator */}
          <div className="flex flex-col items-start">
            <h2 className="text-xs md:text-sm font-mono text-[#ccff00] mb-6 uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#ccff00]/30"></span>
              The Operator
            </h2>
            
            <p className="text-neutral-400 text-xl md:text-2xl font-light leading-relaxed text-left">
              I’m the{" "}
              <LinkPreview
                url="https://unsplash.com/s/photos/human-portrait"
                isStatic
                imageSrc="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=640&auto=format&fit=crop"
                className="font-griffiths italic font-light text-xl md:text-2xl text-rose-500 hover:text-rose-400 transition-colors cursor-pointer relative z-30 inline-block align-middle px-1"
              >
                human
              </LinkPreview>{" "}
              behind this operation. I basically spend my life fueling my{" "}
              <LinkPreview
                url="https://unsplash.com/s/photos/engine"
                isStatic
                imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=640&auto=format&fit=crop"
                className="font-griffiths italic font-light text-xl md:text-2xl text-orange-500 hover:text-orange-400 transition-colors cursor-pointer relative z-30 inline-block align-middle px-1"
              >
                creative engine
              </LinkPreview>{" "}
              with questionable amounts of{" "}
              <LinkPreview
                url="https://unsplash.com/s/photos/coffee"
                isStatic
                imageSrc="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=640&auto=format&fit=crop"
                className="font-griffiths italic font-light text-xl md:text-2xl text-amber-600 hover:text-amber-500 transition-colors cursor-pointer relative z-30 inline-block align-middle px-1"
              >
                ricoffy
              </LinkPreview>{" "}
              and teaching computers how to look expensive.
              <br /><br />
              I built this agency so you can stop worrying about your brand’s vibe and get back to doing{" "}
              <LinkPreview
                url="https://unsplash.com/s/photos/office-work"
                isStatic
                imageSrc="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=640&auto=format&fit=crop"
                className="font-griffiths italic font-light text-xl md:text-2xl text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer relative z-30 inline-block align-middle px-1"
              >
                your actual job
              </LinkPreview>.
            </p>
          </div>

          {/* Right Panel: The Process */}
          <div className="flex flex-col items-start lg:border-l lg:border-white/5 lg:pl-16">
            <h2 className="text-xs md:text-sm font-mono text-white/40 mb-10 uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/20"></span>
              The Methodology
            </h2>

            <div className="space-y-12 w-full">
              {steps.map((step, idx) => (
                <div key={idx} className="group flex gap-6 items-start">
                  <div className="flex flex-col items-center">
                    <span className="text-[0.6rem] font-mono text-[#ccff00]/60 mb-2">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-[#ccff00]/10 group-hover:border-[#ccff00]/30 transition-all duration-500">
                      <step.icon size={16} className="text-white group-hover:text-[#ccff00] transition-colors" />
                    </div>
                    {idx !== steps.length - 1 && (
                      <div className="w-px h-16 bg-gradient-to-b from-white/10 to-transparent mt-4"></div>
                    )}
                  </div>
                  <div className="pt-6">
                    <h3 className="text-white text-lg font-semibold tracking-tight mb-2 group-hover:translate-x-1 transition-transform">
                      {step.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none opacity-20" />
    </section>
  );
}
