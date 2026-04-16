import React, { useState } from 'react';
import { PageTitle } from '../components/ui/PageTitle';
import { SignalCard } from '../components/ui/SignalCard';
import { RefreshCw, Info } from 'lucide-react';


export const Dashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Mock signals
  const signals = [
    {
      id: "1",
      score: 86,
      classification: "INFORMED_MOVE" as const,
      marketId: "osun-election",
      marketTitle: "Osun Election winner",
      priceDelta: "0.52 → 0.64 (+12%)",
      liquidity: "NGN 2.1M",
      orders: 842,
      volRatio: 3.2,
      aiInsight: "Significant high-conviction buying detected across multiple independent addresses.",
      timestamp: "2m ago"
    },
    {
      id: "2",
      score: 48,
      classification: "UNCERTAIN" as const,
      marketId: "arsenal-city",
      marketTitle: "EPL Winner: Arsenal",
      priceDelta: "0.25 → 0.28 (+3%)",
      liquidity: "NGN 1.2M",
      orders: 156,
      volRatio: 1.1,
      timestamp: "14m ago"
    },
    {
      id: "3",
      score: 22,
      classification: "NOISE" as const,
      marketId: "naira-usd",
      marketTitle: "Naira/USD @ 1600: YES",
      priceDelta: "0.85 → 0.88 (+3%)",
      liquidity: "NGN 40k",
      orders: 4,
      volRatio: 0.9,
      timestamp: "21m ago"
    }
  ];

  const filteredSignals = activeFilter === 'ALL' 
    ? signals 
    : signals.filter(s => s.classification === activeFilter);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header Area */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <PageTitle title="Signal Feed" subtitle="" className="mb-0" />
          <div className="flex items-center gap-2 mt-1">
             <div className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse"></div>
             <span className="font-mono text-[10px] text-prism-text-3 uppercase tracking-widest">Live · last updated 12s ago</span>
          </div>
        </div>
        <button className="p-2 text-prism-text-3 hover:text-prism-text-1 transition-colors hover:rotate-180 duration-500">
           <RefreshCw size={18} />
        </button>
      </div>

      {/* Mobile Stats Strip */}
      <div className="md:hidden flex gap-3 overflow-x-auto pb-4 mb-6 border-b border-prism-navy-3">
         <div className="bg-prism-navy-3 px-4 py-2 rounded-full border border-prism-steel whitespace-nowrap">
            <span className="font-mono text-[10px] text-prism-text-2">24 TOTAL</span>
         </div>
         <div className="bg-signal-green-bg px-4 py-2 rounded-full border border-signal-green-muted whitespace-nowrap">
            <span className="font-mono text-[10px] text-signal-green font-bold">10 INFORMED</span>
         </div>
         <div className="bg-signal-amber-bg px-4 py-2 rounded-full border border-signal-amber-muted whitespace-nowrap">
            <span className="font-mono text-[10px] text-signal-amber font-bold">8 UNCERTAIN</span>
         </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-prism-navy-3 mb-8">
        <div className="flex items-center gap-2">
           {['ALL', 'INFORMED_MOVE', 'UNCERTAIN', 'NOISE'].map(filter => (
             <button
               key={filter}
               onClick={() => setActiveFilter(filter)}
               className={`px-3 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-widest transition-all border ${
                 activeFilter === filter 
                   ? 'bg-prism-navy-3 border-prism-accent text-white' 
                   : 'bg-prism-navy-2 border-prism-navy-3 text-prism-text-3 hover:border-prism-steel'
               }`}
             >
               {filter.replace('_', ' ')}
             </button>
           ))}
        </div>
        <div className="flex items-center gap-2 text-prism-text-3">
            <span className="font-mono text-[10px] uppercase">Sort by:</span>
            <select className="bg-transparent border-none font-mono text-[10px] text-white focus:ring-0 cursor-pointer">
               <option>RELEVANCE</option>
               <option>LATEST</option>
               <option>SCORE</option>
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          {filteredSignals.map(sig => (
            <SignalCard key={sig.id} signal={sig} />
          ))}
          
          <button className="w-full py-4 font-mono text-[10px] text-prism-text-3 uppercase tracking-widest hover:text-white transition-colors border border-dashed border-prism-navy-4 rounded-lg mt-8">
            Load More Signals
          </button>
        </div>

        {/* Stats Panel */}
        <div className="hidden lg:flex flex-col gap-6 sticky top-20 h-fit">
           {/* Section 1: Overview */}
           <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-5">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-prism-text-3 mb-4 flex justify-between">
                <span>Today's Overview</span>
                <Info size={12} className="opacity-40" />
              </h4>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-prism-text-1">24 <span className="text-prism-text-3 text-[10px]">TOTAL</span></span>
                      <span className="text-prism-text-3">100%</span>
                    </div>
                    <div className="h-1 bg-prism-navy-4 rounded-full overflow-hidden flex">
                       <div className="h-full bg-signal-green" style={{ width: '42%' }}></div>
                       <div className="h-full bg-signal-amber" style={{ width: '33%' }}></div>
                       <div className="h-full bg-signal-red" style={{ width: '25%' }}></div>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-y-3">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-sm bg-signal-green"></div>
                       <span className="font-mono text-[10px] text-prism-text-2">10 INFORMED</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-sm bg-signal-amber"></div>
                       <span className="font-mono text-[10px] text-prism-text-2">8 UNCERTAIN</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-sm bg-signal-red"></div>
                       <span className="font-mono text-[10px] text-prism-text-2">6 NOISE</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 2: Active Markets */}
           <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-prism-navy-3 bg-prism-navy-3/30">
                 <h4 className="font-mono text-[10px] uppercase tracking-widest text-prism-text-3 font-bold">Active Markets</h4>
              </div>
              <div className="divide-y divide-prism-navy-3/50">
                 {[
                   { name: 'Osun Election', liq: '2.1M' },
                   { name: 'Arsenal: EPL', liq: '890k' },
                   { name: 'Bitcoin Price', liq: '450k' },
                 ].map((m, i) => (
                   <div key={i} className="p-4 flex justify-between items-center group cursor-pointer hover:bg-prism-navy-3 transition-colors">
                      <span className="text-xs text-prism-text-2 group-hover:text-white transition-colors">{m.name}</span>
                      <span className="font-mono text-xs text-prism-text-mono">{m.liq}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
