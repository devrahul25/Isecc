import { Mail, Phone } from 'lucide-react';
import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-10">
            <div className="text-center md:text-left">
              <h2 className="text-sm font-bold text-isecc-blue uppercase tracking-[0.15em] mb-3">Get In Touch</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">Initiate Dialogue.</h3>
              <p className="text-slate-600 font-light leading-relaxed text-lg sm:text-xl">
                We welcome institutional enquiries regarding membership, and strategic partnerships. Fill out the form or reach out directly via email.
              </p>
            </div>

            <div className="space-y-8">
              {/* Email Item */}
              <div className="group flex items-start gap-6">
                <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-blue-50 transition-all flex-shrink-0">
                  <Mail className="w-6 h-6 text-isecc-blue" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col justify-center min-h-[3.5rem]">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</h4>
                  <a href="mailto:contact@isecc.in" className="text-lg text-slate-800 hover:text-isecc-blue transition-colors font-medium">
                    contact@isecc.in
                  </a>
                </div>
              </div>

              {/* Phone Item */}
              
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mix-blend-luminosity relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50/50 to-transparent rounded-tr-[2rem] -z-10"></div>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-slate-700">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-isecc-blue/20 focus:border-isecc-blue transition-all text-slate-900"
                      placeholder="Given Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-slate-700">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-isecc-blue/20 focus:border-isecc-blue transition-all text-slate-900"
                      placeholder="Surname" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Institutional Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-isecc-blue/20 focus:border-isecc-blue transition-all text-slate-900"
                    placeholder="name@institution.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-isecc-blue/20 focus:border-isecc-blue transition-all resize-none text-slate-900"
                    placeholder="How may we assist you?" 
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-isecc-blue transition-all shadow-md hover:shadow-xl hover:shadow-isecc-blue/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-isecc-blue"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
