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
    <section id="board" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/conference-room.webp" 
          alt="Boardroom" 
          className="w-full h-full object-cover object-center grayscale contrast-[1.2] brightness-50"
        />
        {/* Deep moody overlays for cinematic silhouette feel */}
        <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-color"></div>
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          {/* Subtle inner grid/texture to enhance the glassmorphism */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>
          
          <h3 className="relative z-10 text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed mb-6">
            Formal establishment and constitution of the ISECC Board are currently underway.
          </h3>
          <div className="relative z-10 w-12 h-1 bg-blue-400 mx-auto rounded-full mb-6"></div>
          <p className="relative z-10 text-blue-100 text-lg md:text-xl font-light">
            Further details in this regard will be announced shortly.
          </p>
        </div>
      </div>
    </section>
  );
}
