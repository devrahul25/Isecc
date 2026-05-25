import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-100 py-4' 
          : 'bg-white border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4">
          <img 
            src="/ISECC.png" 
            alt="ISECC Logo" 
            className="h-12 w-auto object-contain mix-blend-multiply"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.classList.contains('hidden')) {
                target.classList.add('hidden');
                // Show the fallback
                const fallback = target.nextElementSibling;
                if (fallback) fallback.classList.remove('hidden');
              }
            }}
          />
          {/* Fallback logo if image is missing */}
          <div className="flex items-center gap-4 hidden">
            <div className="w-12 h-12 bg-isecc-blue rounded-full flex items-center justify-center shadow-lg shadow-isecc-blue/20">
               <span className="text-white font-bold tracking-wider">IS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900">ISECC</span>
            </div>
          </div>
        </Link>
        
        <div className="hidden md:flex space-x-10 text-sm font-medium text-slate-600">
          <Link to="/#about" className="hover:text-isecc-blue transition-colors relative group">
            About Us
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-isecc-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
          </Link>
          
          <Link to="/global-perspectives" className="hover:text-isecc-blue transition-colors relative group">
            Global Perspectives
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-isecc-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
          </Link>
        </div>

        <Link 
          to="/#contact" 
          className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-isecc-blue transition-colors shadow-md hover:shadow-xl hover:shadow-isecc-blue/20 transform hover:-translate-y-0.5"
        >
          Institutional Enquiries
        </Link>
      </div>
    </nav>
  );
}
