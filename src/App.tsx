import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import PasswordGate from './components/PasswordGate';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Mandate from './components/Mandate';
import GlobalPerspectives from './components/GlobalPerspectives';
import Contact from './components/Contact';
import ThankYou from './components/ThankYou';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Mandate />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <PasswordGate>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-isecc-blue selection:text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/global-perspectives" element={<GlobalPerspectives />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </PasswordGate>
  );
}

