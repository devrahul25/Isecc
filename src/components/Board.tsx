import React from 'react';
import { motion } from 'motion/react';

export default function Board() {
  // Generate some random particles for the background
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: -Math.random() * 20, // Negative delay so they start already in motion
  }));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/conference-room.webp" 
            alt="Boardroom" 
            fetchpriority="high"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900"></div>
          <div className="absolute inset-0 bg-isecc-blue/10 mix-blend-overlay"></div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-blue-200/50 shadow-[0_0_12px_rgba(147,197,253,0.8)]"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.1, 0.8, 0.1],
                scale: [1, Math.random() * 1.5 + 1, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
                delay: p.delay
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-6">Our Board</h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight mb-8">
            Meet our Founding President
          </h2>
          <p className="text-xl text-blue-100/90 font-light max-w-3xl mx-auto leading-relaxed">
            We proudly welcome <strong className="text-blue-100/90 font-semibold"> Jayesh Menon</strong> as the <strong className="text-blue-100/90 font-semibold">Founding President</strong> of the <strong className="text-blue-100/90 font-semibold"> India Strategic Economic Corridors Council (ISECC)</strong>. His leadership and international experience will help shape ISECC's mission of advancing strategic economic partnerships and global corridor development.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24 lg:space-y-32">
          
          <article className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight text-center">
              Jayesh Menon
            </h3>
            <p className="text-center text-isecc-blue font-semibold tracking-wider text-lg md:text-xl mb-8">
              Ec.D&nbsp;&nbsp;|&nbsp;&nbsp;CI TP&nbsp;&nbsp;|&nbsp;&nbsp;FIBP&nbsp;&nbsp;|&nbsp;&nbsp;MBA
            </p>
            
            <div className="rounded-3xl flex justify-center mb-12">
              <div className="w-16 h-1.5 bg-isecc-blue rounded-full"></div>
            </div>
            
            <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[16/9] md:aspect-[21/9] group w-full mb-12">
              <img 
                src="/jayesh-menon.jpg" 
                alt="Jayesh Menon" 
                className="w-full h-full object-cover object-top transition-transform duration-700"
              />
              <div className="absolute inset-0 border border-black/10 rounded-3xl"></div>
            </div>

            <div className="space-y-8 text-slate-600 font-light text-lg md:text-xl leading-relaxed">
              <p>
                <strong className="text-slate-800 font-semibold">Jayesh Menon</strong> is the<strong className="text-slate-800 font-semibold"> Founder & Principal Advisor of Vars Boffin Business Advisors</strong>, an international advisory platform for international market entry, investment facilitation, and strategic expansion and collaboration. Jayesh is an international trade and investment professional with over 25 years of experience across global markets, working at the intersection of enterprise growth, institutional collaboration, and economic development.
              </p>
              <p>
                His work focuses on enabling organisations to move beyond market access and build sustainable international presence through structured advisory, institutional connectivity, and global partnerships. Jayesh's career spans engagements across North America, the Middle East, Asia, and emerging markets, where he has worked with:
              </p>
              
              <ul className="space-y-4 pl-2">
                {[
                  "Enterprises expanding into international markets",
                  "Government agencies and economic development institutions",
                  "Trade promotion organizations",
                  "Academic and industry platforms"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-isecc-blue mt-3.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

        </div>
      </section>

      {/* Formal Establishment Section */}
      <section className="relative py-24 overflow-hidden w-full bg-slate-950 text-center border-t border-slate-900">
        {/* Background Image covering full width */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/boardroom-table.png" 
            alt="Boardroom Table" 
            loading="lazy"
            className="w-full h-full object-cover object-center brightness-[0.95] contrast-[1.15]"
          />
          <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-950/40 to-slate-950/60"></div>
          <div className="absolute inset-0 bg-isecc-blue/5 mix-blend-color"></div>
        </div>
        
        {/* Formal Establishment Card matching the screenshot */}
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="bg-slate-900/45 backdrop-blur-md border border-white/10 p-12 md:p-20 rounded-[2.5rem] shadow-[0_24px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Subtle grid pattern overlay inside card matching ss */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:1.75rem_1.75rem] pointer-events-none"></div>
            
            <h3 className="relative z-10 text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed mb-6">
              Formal establishment and constitution of the ISECC Board are currently underway.
            </h3>
            
            <div className="relative z-10 w-12 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
            
            <p className="relative z-10 text-blue-100/80 text-lg md:text-xl font-light">
              Further details in this regard will be announced shortly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
