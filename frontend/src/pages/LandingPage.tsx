import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroCanvas } from '../components/landing/HeroCanvas';
import { ScoreFlowDiagram } from '../components/landing/ScoreFlowDiagram';
import { Logo } from '../components/ui/Logo';
import { ScoreBadge } from '../components/ui/ScoreBadge';

import { ChevronDown, TrendingUp, Droplets, Zap, Users, ArrowRight, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const LandingPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // reveal headlines
      gsap.from(".hero-text", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
      });

      // section reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out"
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);



  return (
    <div ref={mainRef} className="bg-prism-navy text-prism-text-1 selection:bg-prism-accent/30 overflow-x-hidden">
      
      {/* 7.0 Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 bg-prism-navy/80 backdrop-blur-md border-b border-prism-navy-3">
         <Logo variant="full" />
         <div className="flex items-center gap-8">
            <a href="#methodology" className="hidden md:block font-sans text-sm text-prism-text-2 hover:text-white transition-colors">Methodology</a>
            <a href="/login" className="font-sans text-sm text-prism-text-2 hover:text-white transition-colors">Sign In</a>
            <a href="/register" className="bg-prism-accent hover:bg-prism-accent-2 text-white text-sm font-sans font-medium px-5 py-2 rounded-md transition-all">Get Access</a>
         </div>
      </nav>

      {/* 7.1 Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        <HeroCanvas />
        <div className="relative z-10 text-center px-6 max-w-4xl">
           <span className="hero-text block font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-prism-text-3 mb-6">
             Built on Market Microstructure Theory
           </span>
           <h1 className="hero-text font-display text-5xl md:text-7xl lg:text-8xl font-black text-prism-text-1 leading-tight tracking-tight">
             Separate Signal <br /> from Noise.
           </h1>
           <p className="hero-text font-sans text-base md:text-xl text-prism-text-2 mt-8 max-w-2xl mx-auto leading-relaxed">
             Prism quantifies whether a prediction market price move is informed trading, speculation, or noise — in real time.
           </p>
           
           <div className="hero-text flex flex-col sm:flex-row gap-4 mt-12 justify-center">
              <button className="bg-prism-accent hover:bg-prism-accent-2 text-white font-sans font-bold text-sm px-8 py-3.5 rounded-md transition-all shadow-lg shadow-prism-accent/20 flex items-center justify-center gap-3">
                 Get Started <ArrowRight size={18} />
              </button>
              <button className="border border-prism-steel text-prism-text-2 hover:border-prism-text-2 hover:text-white font-sans font-bold text-sm px-8 py-3.5 rounded-md transition-all">
                 View Live Signals
              </button>
           </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
           <ChevronDown size={24} />
        </div>
      </section>

      {/* 7.2 Problem Statement */}
      <section className="py-24 px-6 md:px-16 bg-prism-navy-2 border-y border-prism-navy-3 overflow-hidden">
        <div className="max-w-6xl mx-auto">
           <div className="reveal mb-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-prism-text-3 mb-3 block">The Problem</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-prism-text-1 leading-tight">
                One move. <br />
                Two completely different realities.
              </h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Bad Scenario */}
              <div className="reveal bg-signal-red-bg border border-signal-red-muted rounded-xl p-8 relative group overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-signal-red opacity-40 uppercase tracking-widest">Manipulation Trap</div>
                 <h3 className="text-xl font-bold text-prism-text-1 mb-6">Market jumps +20%</h3>
                 <div className="space-y-4 font-mono text-sm text-prism-text-3 border-b border-signal-red-muted pb-8 mb-8">
                    <div className="flex justify-between"><span>Liquidity</span> <span className="text-prism-text-2">NGN 40k</span></div>
                    <div className="flex justify-between"><span>Orders</span> <span className="text-prism-text-2">3</span></div>
                    <div className="flex justify-between"><span>Vol Spike</span> <span className="text-prism-text-2">1.1x</span></div>
                 </div>
                 <div className="flex items-center gap-4">
                    <ScoreBadge score={22} size="md" />
                    <p className="text-sm font-sans italic text-prism-text-3">"One person moved this entire market. You just got trapped."</p>
                 </div>
              </div>

              {/* Good Scenario */}
              <div className="reveal bg-signal-green-bg border border-signal-green-muted rounded-xl p-8 relative group overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-signal-green opacity-40 uppercase tracking-widest">Informed Move</div>
                 <h3 className="text-xl font-bold text-prism-text-1 mb-6">Market moves +8%</h3>
                 <div className="space-y-4 font-mono text-sm text-prism-text-2 border-b border-signal-green-muted pb-8 mb-8">
                    <div className="flex justify-between"><span>Liquidity</span> <span className="text-prism-text-1">NGN 2.1M</span></div>
                    <div className="flex justify-between"><span>Orders</span> <span className="text-prism-text-1">842</span></div>
                    <div className="flex justify-between"><span>Vol Spike</span> <span className="text-prism-text-1">3.2x</span></div>
                 </div>
                 <div className="flex items-center gap-4">
                    <ScoreBadge score={86} size="md" />
                    <p className="text-sm font-sans italic text-prism-text-2">"Broad participation. Deep liquidity. Pay attention."</p>
                 </div>
              </div>
           </div>
           
           <p className="reveal text-center text-prism-text-3 font-sans text-sm mt-12 italic">
             Retail traders cannot tell the difference. Prism can.
           </p>
        </div>
      </section>

      {/* 7.3 How It Works */}
      <section id="methodology" className="py-24 px-6 md:px-16 bg-prism-navy">
         <div className="max-w-6xl mx-auto">
            <div className="reveal flex flex-col items-center text-center mb-16">
               <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-prism-text-3 mb-3 block">Engine Blueprint</span>
               <h2 className="font-display text-3xl md:text-5xl font-bold text-prism-text-1 leading-tight">Four factors. One score. <br /> Instant clarity.</h2>
            </div>
            
            <div className="reveal">
               <ScoreFlowDiagram />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
               {[
                 { icon: TrendingUp, label: 'Price Delta', weight: '40%', desc: 'How large is the probability change?' },
                 { icon: Droplets, label: 'Liquidity', weight: '25%', desc: 'Market depth vs. size of the move.' },
                 { icon: Zap, label: 'Volume', weight: '20%', desc: 'Total participation during the move.' },
                 { icon: Users, label: 'Orders', weight: '15%', desc: 'Number of individual trades.' },
               ].map((item, i) => (
                 <div key={i} className="reveal bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-6 group hover:border-prism-accent transition-all">
                    <item.icon size={20} className="text-prism-accent mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-mono text-[10px] uppercase text-prism-text-3 mb-1">{item.label}</h4>
                    <p className="font-sans text-xs text-prism-text-2 mb-4 h-12">{item.desc}</p>
                    <span className="font-mono text-xs text-prism-accent font-bold">Weight: {item.weight}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7.6 Social Proof Strip */}
      <section className="py-12 bg-prism-navy-3 border-y border-prism-navy-4 overflow-hidden">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around gap-8 text-center">
            {[
              { val: '64%', label: 'Directional Accuracy' },
              { val: '847+', label: 'Signals Scored' },
              { val: '3.2x', label: 'vs. Random Baseline' }
            ].map((stat, i) => (
              <div key={i} className="reveal">
                 <p className="font-mono text-4xl font-bold text-white mb-1">{stat.val}</p>
                 <p className="font-sans text-[10px] uppercase tracking-widest text-prism-text-3">{stat.label}</p>
              </div>
            ))}
         </div>
      </section>

      {/* 7.7 CTA Section */}
      <section className="py-32 bg-prism-navy-2 relative overflow-hidden">
         <div className="absolute w-96 h-96 bg-prism-accent/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
         <div className="relative z-10 flex flex-col items-center text-center px-6">
            <Logo variant="mark" className="mb-8" />
            <h2 className="reveal font-display text-4xl md:text-5xl font-bold text-white mb-4">Ready to trade with clarity?</h2>
            <p className="reveal font-sans text-prism-text-2 mb-10 max-w-md">Join 800+ traders using institution-grade signal intelligence for the Bayse markets.</p>
            <div className="reveal flex gap-4">
               <a href="/register" className="bg-prism-accent hover:bg-prism-accent-2 text-white font-sans font-bold text-sm px-10 py-4 rounded-md transition-all shadow-xl shadow-prism-accent/20">Get Access Free</a>
            </div>
            <p className="reveal font-sans text-[10px] text-prism-text-3 mt-6 uppercase tracking-[0.2em]">Institutional Engine · Real-time Accuracy</p>
         </div>
      </section>

      {/* 7.8 Footer */}
      <footer className="py-12 px-6 md:px-16 border-t border-prism-navy-3 bg-prism-navy">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
               <Logo variant="mark" className="scale-75" />
               <span className="font-mono text-[10px] text-prism-text-3 uppercase tracking-widest">© 2026 PRISM SIGNAL INTELLIGENCE</span>
            </div>
            <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-prism-text-3">
               <a href="#" className="hover:text-white transition-colors">Methodology</a>
               <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><Globe size={12} /> GitHub</a>
               <a href="#" className="hover:text-white transition-colors">Login</a>
            </div>
         </div>
      </footer>
    </div>
  );
};
