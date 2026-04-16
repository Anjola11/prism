import React, { useState } from 'react';
import { Logo } from '../components/ui/Logo';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-prism-navy grid grid-cols-1 lg:grid-cols-2">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-prism-navy-2 border-r border-prism-navy-3 relative overflow-hidden">
        <Logo variant="full" />
        
        <div className="relative z-10">
          <blockquote className="text-3xl font-light text-prism-text-2 italic leading-relaxed max-w-md">
            "A prism takes white light and reveals what's hidden inside complexity."
          </blockquote>
          <p className="mt-4 font-mono text-xs text-prism-text-3 uppercase tracking-widest">
            — Signal Intelligence Engine
          </p>
        </div>

        <div className="flex gap-8">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-signal-green"></div>
              <span className="font-mono text-[10px] text-signal-green uppercase tracking-widest">INFORMED</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-signal-amber"></div>
              <span className="font-mono text-[10px] text-signal-amber uppercase tracking-widest">UNCERTAIN</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-signal-red"></div>
              <span className="font-mono text-[10px] text-signal-red uppercase tracking-widest">NOISE</span>
           </div>
        </div>
        
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-prism-blue rounded-full blur-[100px] opacity-20"></div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center items-center px-6 md:px-16 py-12">
        <div className="w-full max-w-sm">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-prism-text-3 mb-6 block text-center lg:text-left">PRISM</span>
          <h1 className="font-display text-3xl font-bold text-prism-text-1 mb-1 text-center lg:text-left">Create account</h1>
          <p className="font-sans text-sm text-prism-text-3 mb-10 text-center lg:text-left">Start filtering signal from noise.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-sans text-xs font-medium text-prism-text-2 mb-2 uppercase tracking-wide">
                Full Name
              </label>
              <input type="text" placeholder="Your name" className="prism-input" required />
            </div>

            <div>
              <label className="block font-sans text-xs font-medium text-prism-text-2 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input type="email" placeholder="you@example.com" className="prism-input" required />
            </div>

            <div>
              <label className="block font-sans text-xs font-medium text-prism-text-2 mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="prism-input"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-prism-text-3 hover:text-prism-text-2 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="mt-2 flex gap-1 h-1">
                <div className="flex-1 bg-signal-green rounded-full"></div>
                <div className="flex-1 bg-signal-green rounded-full"></div>
                <div className="flex-1 bg-signal-green rounded-full"></div>
                <div className="flex-1 bg-prism-navy-3 rounded-full"></div>
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-medium text-prism-text-2 mb-2 uppercase tracking-wide">
                Confirm Password
              </label>
              <input type="password" placeholder="••••••••" className="prism-input" required />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-prism-accent hover:bg-prism-accent-2 text-white font-sans font-medium text-sm py-3 rounded-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-prism-text-3">
            Already have an account?{' '}
            <a href="#" className="text-prism-accent hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};
