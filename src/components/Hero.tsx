import { MoveRight } from 'lucide-react';
import React from 'react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" id="hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/bg.jpg" 
          alt="ISECC Background" 
          className="w-full h-full object-cover object-center" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-blue-300 font-semibold text-sm mb-8 border border-white/10 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            Non-Profit & Non-Partisan Platform
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-8">
            India Strategic <br />
            <span className="text-blue-400">Economic Corridors</span> <br />
            Council
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-300 font-light leading-relaxed mb-10 max-w-lg">
            Structured Industry Dialogue for Strategic Economic Corridors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 transform hover:-translate-y-1 group"
            >
              Contact Us
              <MoveRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
          </div>


        </div>
      </div>
    </section>
  );
}
