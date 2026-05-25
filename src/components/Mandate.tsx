import { Building2, Globe2, Landmark } from 'lucide-react';
import React from 'react';

export default function Mandate() {
  return (
    <section id="mandate" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          {/* <h2 className="text-sm font-bold text-isecc-blue uppercase tracking-[0.15em] mb-4">Our Core Focus</h2>*/}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">Our Mandate</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* Background decorative element */}
          <div className="absolute top-1/2 left-0 w-full h-[60%] bg-blue-50/50 -z-10 -translate-y-1/2 rounded-[3rem] hidden lg:block"></div>

          {/* Card 1 */}
          <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-isecc-blue">
              <Globe2 className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h4 className="text-xl lg:text-[1.35rem] font-bold text-slate-900 mb-4 leading-tight min-h-[60px]">
              Structured economic corridor dialogue
            </h4>
            <p className="text-slate-500 font-light leading-relaxed">
              Establishing robust frameworks for continuous, meaningful engagement across international borders.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-isecc-blue">
              <Building2 className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h4 className="text-xl lg:text-[1.35rem] font-bold text-slate-900 mb-4 leading-tight min-h-[60px]">
              Industry-led strategic alignment
            </h4>
            <p className="text-slate-500 font-light leading-relaxed">
              Driving strategic priorities through industry expertise and leadership to ensure practical outcomes.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-isecc-blue">
              <Landmark className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h4 className="text-xl lg:text-[1.35rem] font-bold text-slate-900 mb-4 leading-tight min-h-[60px]">
              Capital & infrastructure facilitation
            </h4>
            <p className="text-slate-500 font-light leading-relaxed">
              Connecting necessary capital with critical infrastructure projects to accelerate development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
