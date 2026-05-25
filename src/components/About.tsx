import { Shield } from 'lucide-react';
import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           <div className="lg:col-span-5 flex flex-col justify-center">
             <h2 className="text-sm font-bold text-isecc-blue uppercase tracking-[0.15em] mb-4">About ISECC</h2>
             <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
               Bridging Regions Through Strategic Dialogue.
             </h3>
             <div className="w-16 h-1.5 bg-isecc-blue rounded-full mb-8"></div>
           </div>
           
           <div className="lg:col-span-7">
             <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
               {/* Decorative quote mark */}
               <div className="absolute top-6 right-8 text-8xl text-slate-50 font-serif leading-none select-none z-0">"</div>
               
               <div className="relative z-10 space-y-8 text-lg font-light text-slate-600 leading-relaxed">
                 <p className="text-xl md:text-2xl font-medium text-slate-800 leading-snug">
                   A non-profit, non-partisan platform for leaders to convene and develop economic partnerships between India and aligned regions.
                 </p>
                 
                 <p>
                   Our focus is practical alignment of capital, industry capability, and cross-border economic priorities in areas of strategic importance.
                 </p>
                 
                 <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                     <Shield className="w-5 h-5 text-isecc-blue" />
                   </div>
                   <p className="text-base text-slate-600">
                     The organisation facilitates discreet dialogues and discussions in areas of strategic economic significance operating under <strong className="text-slate-800 font-semibold">Chatham House rules</strong>.
                   </p>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
