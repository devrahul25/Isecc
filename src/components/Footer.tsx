import { Shield } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <img 
              src="/ISECC.png" 
              alt="ISECC Logo" 
              className="h-16 w-auto object-contain mix-blend-multiply"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.classList.contains('hidden')) {
                  target.classList.add('hidden');
                  const fallback = target.nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }
              }}
            />
            <div className="flex flex-col items-center lg:items-start gap-4 hidden">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold tracking-wider">IS</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">
                  India Strategic Economic Corridors Council (ISECC)
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  Structured Industry Dialogue for Strategic Economic Corridors
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-end gap-8 text-sm font-medium text-slate-600">
            <Link to="/#about" className="hover:text-isecc-blue transition-colors">About Us</Link>
            <Link to="/our-board" className="hover:text-isecc-blue transition-colors">Our Board</Link>
            <Link to="/global-perspectives" className="hover:text-isecc-blue transition-colors">Global Perspectives</Link>
            <Link to="/#contact" className="hover:text-isecc-blue transition-colors">Contact</Link>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500 font-light text-center">
          <p className="order-2 md:order-1">&copy; {new Date().getFullYear()} ISECC. All rights reserved.</p>
          <p className="order-1 md:order-2 flex items-center justify-center flex-wrap gap-1">
            Built with <span role="img" aria-label="heart" className="text-red-500">❤</span> in India
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="w-full sm:w-auto text-center">
              Powered by&nbsp;
              <a href="https://jaiveeru.co.in" target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:underline whitespace-nowrap">
                Jai Veeru Creatives
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
