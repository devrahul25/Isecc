import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav
      ref={menuRef}
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

        {/* Desktop nav */}
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

        <div className="flex items-center gap-3">
          <Link
            to="/#contact"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-isecc-blue transition-colors shadow-md hover:shadow-xl hover:shadow-isecc-blue/20 transform hover:-translate-y-0.5"
          >
            Institutional Enquiries
          </Link>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden p-2 rounded-lg text-isecc-blue hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-isecc-blue/30"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-slate-100 shadow-lg px-6 py-5 flex flex-col space-y-1">
          <Link
            to="/#about"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl text-slate-700 font-medium hover:text-isecc-blue hover:bg-blue-50 transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/global-perspectives"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl text-slate-700 font-medium hover:text-isecc-blue hover:bg-blue-50 transition-colors"
          >
            Global Perspectives
          </Link>
          <div className="pt-3 border-t border-slate-100">
            <Link
              to="/#contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center w-full px-6 py-3 bg-isecc-blue text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md"
            >
              Institutional Enquiries
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
