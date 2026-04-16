import React from 'react';
import { PageTitle } from '../components/ui/PageTitle';
import { Zap, Target, Layers } from 'lucide-react';

export const Methodology: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-12 space-y-16">
      <div className="text-center">
        <PageTitle 
          title="Methodology" 
          subtitle="Quantifying market microstructure and information asymmetry in prediction markets." 
          className="items-center text-center"
        />
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-prism-accent">
          <Target size={20} />
          <h2 className="font-display text-xl font-bold text-prism-text-1">The Core Thesis</h2>
        </div>
        <div className="prose prose-invert prose-sm">
          <p className="text-prism-text-2 leading-relaxed">
            In traditional high-liquidity markets, price movements are generally efficient and reflect information. In emerging or shallow prediction markets, price moves are frequently the result of <strong>Noise</strong>—liquidity providers being picked off, fat-finger errors, or retail manipulation—rather than <strong>Informed Trading</strong>.
          </p>
          <div className="border-l-4 border-prism-accent pl-6 py-2 my-8 italic text-prism-text-2 text-lg">
            "Prism quantifies the difference between real and fake moves by applying institutional microstructure theory to raw order flow."
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-3 text-prism-accent">
          <Layers size={20} />
          <h2 className="font-display text-xl font-bold text-prism-text-1">The Signal Strength Score</h2>
        </div>
        
        <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-6 font-mono text-sm text-prism-text-mono">
           <span className="text-prism-text-3 block mb-4 uppercase text-[10px]">Algorithm V1.0 (BETA)</span>
           <div className="space-y-1">
             <p>Score = 100 × (</p>
             <p className="pl-6">0.40 × <span className="text-white">PriceDeltaFactor</span></p>
             <p className="pl-6">0.25 × <span className="text-white">LiquidityFactor</span></p>
             <p className="pl-6">0.20 × <span className="text-white">VolumeFactor</span></p>
             <p className="pl-6">0.15 × <span className="text-white">OrderFlowFactor</span></p>
             <p>)</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { label: 'PRICE DELTA', desc: 'Normalized magnitude of probability change. Large moves without support are penalized.' },
             { label: 'LIQUIDITY', desc: 'Ratio of move size to available depth. High impact moves in thin markets are tagged as NOISE.' },
             { label: 'VOLUME', desc: 'Total participation during the scoring window. Verified against historical norms.' },
             { label: 'ORDER FLOW', desc: 'Individual trader count and address concentration. High concentration suggests manipulation.' }
           ].map((item, i) => (
             <div key={i} className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-5">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-prism-text-3 mb-2">{item.label}</h4>
                <p className="text-xs text-prism-text-2 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-prism-accent">
          <Zap size={20} />
          <h2 className="font-display text-xl font-bold text-prism-text-1">System Thresholds</h2>
        </div>
        
        <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg overflow-hidden">
           <table className="w-full text-left text-xs">
              <thead className="bg-prism-navy-3 text-prism-text-3 font-mono uppercase tracking-widest text-[9px]">
                 <tr>
                    <th className="px-6 py-4">Score Range</th>
                    <th className="px-6 py-4">Classification</th>
                    <th className="px-6 py-4">Actionability</th>
                 </tr>
              </thead>
              <tbody className="text-prism-text-2">
                 <tr className="border-b border-prism-navy-3/50">
                    <td className="px-6 py-4 font-mono">0 - 39</td>
                    <td className="px-6 py-4 text-signal-red font-bold">NOISE</td>
                    <td className="px-6 py-4 italic">High manipulation risk. Avoid.</td>
                 </tr>
                 <tr className="border-b border-prism-navy-3/50">
                    <td className="px-6 py-4 font-mono">40 - 69</td>
                    <td className="px-6 py-4 text-signal-amber font-bold">UNCERTAIN</td>
                    <td className="px-6 py-4 italic">Mixed signals. Monitor closely.</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 font-mono">70 - 100</td>
                    <td className="px-6 py-4 text-signal-green font-bold">INFORMED MOVE</td>
                    <td className="px-6 py-4 italic">High conviction. Price discovery active.</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      <footer className="pt-16 border-t border-prism-navy-3">
         <p className="font-mono text-[10px] text-prism-text-3 uppercase tracking-widest mb-4">References & Theory</p>
         <ul className="space-y-2 font-mono text-[10px] text-prism-text-3">
            <li>Kyle, A. S. (1985). Continuous Auctions and Insider Trading. Econometrica.</li>
            <li>Amihud, Y. (2002). Illiquidity and stock returns: cross-section and time-series effects.</li>
            <li>Glosten, L. R., & Milgrom, P. R. (1985). Bid, ask and transaction prices.</li>
         </ul>
      </footer>
    </div>
  );
};
