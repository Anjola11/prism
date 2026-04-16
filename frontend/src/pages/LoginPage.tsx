import React, { useState } from 'react';
import { Logo } from '../components/ui/Logo';
import { Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '@tanstack/react-router';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate({ to: '/dashboard' });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    try {
      await login('demo@prism.finance', 'demo123!');
      navigate({ to: '/dashboard' });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
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

        {/* Decorative background element */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-prism-blue rounded-full blur-[100px] opacity-20"></div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center items-center px-6 md:px-16 py-12">
        <div className="w-full max-w-sm">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-prism-text-3 mb-6 block text-center lg:text-left">PRISM</span>
          <h1 className="font-display text-3xl font-bold text-prism-text-1 mb-1 text-center lg:text-left">Sign in</h1>
          <p className="font-sans text-sm text-prism-text-3 mb-10 text-center lg:text-left">Access your signal dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-sans text-xs font-medium text-prism-text-2 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="prism-input"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-sans text-xs font-medium text-prism-text-2 uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-[10px] text-prism-accent hover:text-prism-accent-2 transition-colors uppercase tracking-widest">Forgot?</a>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-prism-accent hover:bg-prism-accent-2 text-white font-sans font-medium text-sm py-3 rounded-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-prism-navy-3"></div>
              <span className="flex-shrink-0 mx-4 text-prism-text-3 font-mono text-[10px] uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-prism-navy-3"></div>
            </div>
            <button 
              type="button" 
              onClick={handleDemoSignIn}
              disabled={isLoading}
              className="w-full bg-prism-navy-2 border border-prism-steel hover:border-prism-text-3 text-prism-text-1 font-sans font-medium text-sm py-3 rounded-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Sparkles size={16} className="text-prism-accent" />
              <span>Demo Login (Admin Access)</span>
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-prism-text-3">
            Don't have an account?{' '}
            <a href="#" className="text-prism-accent hover:underline">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
};
