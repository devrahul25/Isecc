import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const REDIRECT_SECONDS = 6;

export default function ThankYou() {
  const navigate = useNavigate();
  const [count, setCount] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (count <= 0) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

  const progress = ((REDIRECT_SECONDS - count) / REDIRECT_SECONDS) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8">
        {/* Logo */}
       
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-slate-100 px-10 py-12 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-blue-50/50">
              <CheckCircle className="w-10 h-10 text-isecc-blue" strokeWidth={1.5} />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Enquiry Submitted!</h1>
            <p className="text-slate-500 text-base leading-relaxed">
              Thank you for reaching out to ISECC. Our team will review your enquiry and respond shortly.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Countdown */}
          <div className="space-y-3">
            <p className="text-sm text-slate-400">
              Redirecting to home in{' '}
              <span className="font-semibold text-isecc-blue tabular-nums">{count}</span> second{count !== 1 ? 's' : ''}…
            </p>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-isecc-blue rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Manual link */}
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-isecc-blue transition-colors shadow-md hover:shadow-xl hover:shadow-isecc-blue/20"
          >
            Return to Home
          </Link>
        </div>

    
      </div>
    </div>
  );
}
