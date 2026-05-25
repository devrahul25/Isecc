import React, { useState, useRef, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const SESSION_KEY = 'isecc_unlocked';
const CORRECT_PASSWORD = '1234567';

interface Props {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: Props) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  );
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!unlocked) inputRef.current?.focus();
  }, [unlocked]);

  const attempt = () => {
    if (value === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 2500);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') attempt();
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/ISECC.png"
            alt="ISECC"
            className="h-16 w-auto object-contain mix-blend-multiply"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        {/* Card */}
        <div
          className={`bg-white rounded-3xl border border-slate-100
            shadow-[0_8px_40px_rgb(0,0,0,0.07)] px-8 py-10 space-y-6
            transition-transform ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        >
          {/* Lock icon */}
          <div className="flex justify-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center
              transition-colors ${error ? 'bg-red-50' : 'bg-blue-50'}`}>
              <Lock className={`w-7 h-7 transition-colors
                ${error ? 'text-red-500' : 'text-isecc-blue'}`} strokeWidth={1.5} />
            </div>
          </div>

          {/* Text */}
          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold text-slate-900">Private Preview</h1>
            <p className="text-sm text-slate-500">Enter the access password to continue.</p>
          </div>

          {/* Input */}
          <div className="space-y-3">
            <div className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl
              bg-slate-50 border transition-all
              ${error
                ? 'border-red-300 ring-2 ring-red-100'
                : 'border-slate-200 focus-within:border-isecc-blue focus-within:ring-2 focus-within:ring-isecc-blue/20'
              }`}>
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={(e) => { setValue(e.target.value); setError(false); }}
                onKeyDown={handleKey}
                placeholder="Enter password"
                autoComplete="off"
                className="flex-1 bg-transparent text-slate-900 text-sm placeholder-slate-400
                           outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword
                  ? <EyeOff className="w-4 h-4" />
                  : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error message */}
            <p className={`text-xs text-red-500 text-center transition-opacity duration-300
              ${error ? 'opacity-100' : 'opacity-0'}`}>
              Incorrect password. Please try again.
            </p>

            {/* Submit button */}
            <button
              onClick={attempt}
              className="w-full py-3 bg-isecc-blue text-white text-sm font-semibold
                         rounded-xl hover:bg-blue-700 active:scale-[0.98]
                         transition-all shadow-md shadow-isecc-blue/20
                         focus:outline-none focus:ring-2 focus:ring-isecc-blue/40"
            >
              Unlock
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          India Strategic Economic Corridors Council &nbsp;·&nbsp; isecc.in
        </p>
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          15%      { transform: translateX(-8px); }
          30%      { transform: translateX(8px); }
          45%      { transform: translateX(-6px); }
          60%      { transform: translateX(6px); }
          75%      { transform: translateX(-3px); }
          90%      { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
}
