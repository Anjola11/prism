import React, { useState } from 'react';
import { PageTitle } from '../../components/ui/PageTitle';
import { ScoreBadge } from '../../components/ui/ScoreBadge';

import { ChevronDown, ChevronUp, Sparkles, Download } from 'lucide-react';

export const AdminSignals: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const signals = [
    { id: '1042', market: 'Osun Election winner', score: 86, class: 'INFORMED_MOVE', move: '+12%', liquid: '2.1M', vol: 3.2, orders: 842, ai: true, time: '2m ago' },
    { id: '1041', market: 'Arsenal vs City: Result', score: 48, class: 'UNCERTAIN', move: '+2%', liquid: '1.2M', vol: 1.1, orders: 156, ai: false, time: '14m ago' },
    { id: '1040', market: 'Naira/USD @ 1600: YES', score: 22, class: 'NOISE', move: '+4%', liquid: '40k', vol: 0.9, orders: 4, ai: false, time: '21m ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-end mb-8">
        <PageTitle title="Signal Log" subtitle="Audit trail of all signals detected and scored by the engine." className="mb-0" />
        <button className="flex items-center gap-2 px-4 py-2 bg-prism-navy-2 border border-prism-steel rounded-md text-prism-text-3 hover:text-white transition-colors">
          <Download size={14} />
          <span className="font-mono text-[10px] uppercase tracking-widest">Export CSV</span>
        </button>
      </div>

      <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-prism-navy-3/30 border-b border-prism-navy-3">
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Signal ID</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Score</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Market</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Move</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">AI</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((s) => (
                <React.Fragment key={s.id}>
                  <tr 
                    className={`border-b border-prism-navy-3/50 hover:bg-prism-navy-3/50 transition-colors cursor-pointer ${expandedId === s.id ? 'bg-prism-navy-3/40' : ''}`}
                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                  >
                    <td className="py-4 px-6 font-mono text-[10px] text-prism-text-3">#{s.id}</td>
                    <td className="py-4 px-6"><ScoreBadge score={s.score} size="sm" /></td>
                    <td className="py-4 px-6 font-sans text-sm text-prism-text-1 font-medium">{s.market}</td>
                    <td className={`py-4 px-6 font-mono text-xs font-bold ${s.class === 'INFORMED_MOVE' ? 'text-signal-green' : 'text-prism-text-2'}`}>
                      {s.move}
                    </td>
                    <td className="py-4 px-6">
                      {s.ai && <Sparkles size={14} className="text-prism-accent" />}
                    </td>
                    <td className="py-4 px-6 text-prism-text-3">
                      {expandedId === s.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </td>
                  </tr>
                  
                  {expandedId === s.id && (
                    <tr className="bg-prism-navy-3/20 border-b border-prism-navy-3">
                      <td colSpan={6} className="p-8">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                               <h4 className="font-mono text-[10px] uppercase tracking-widest text-prism-text-3 font-bold">Scoring Factors Breakdown</h4>
                               {[
                                 { label: 'Price Delta', val: 0.87, weight: '40%' },
                                 { label: 'Liquidity', val: 0.72, weight: '25%' },
                                 { label: 'Volume Ratio', val: 0.95, weight: '20%' },
                                 { label: 'Order Size', val: 0.61, weight: '15%' },
                               ].map((f, i) => (
                                 <div key={i}>
                                   <div className="flex justify-between text-[10px] font-mono mb-2">
                                     <span className="text-prism-text-2">{f.label} <span className="text-prism-text-3">({f.weight})</span></span>
                                     <span className="text-prism-accent">{(f.val * 10).toFixed(1)}</span>
                                   </div>
                                   <div className="h-1 bg-prism-navy-3 rounded-full overflow-hidden">
                                      <div className="h-full bg-prism-accent" style={{ width: `${f.val * 100}%` }}></div>
                                   </div>
                                 </div>
                               ))}
                            </div>
                            <div className="bg-prism-navy-2 border border-prism-steel rounded-lg p-5">
                               <h4 className="font-mono text-[10px] uppercase tracking-widest text-prism-text-3 font-bold mb-4">Internal Stats</h4>
                               <div className="space-y-3 font-mono text-[10px]">
                                  <div className="flex justify-between"><span className="text-prism-text-3">Raw Volume:</span> <span className="text-prism-text-2">NGN 6.4M</span></div>
                                  <div className="flex justify-between"><span className="text-prism-text-3">Unique Addresses:</span> <span className="text-prism-text-2">42</span></div>
                                  <div className="flex justify-between"><span className="text-prism-text-3">Informed Prob:</span> <span className="text-signal-green">87.4%</span></div>
                               </div>
                            </div>
                         </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
