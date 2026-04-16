import React from 'react';
import { BarChart3, Target, Activity } from 'lucide-react';
import { ScoreDistribution } from '../components/charts/ScoreDistribution';
import { PageTitle } from '../components/ui/PageTitle';
import { ClassificationChip } from '../components/ui/ClassificationChip';
import { ScoreBadge } from '../components/ui/ScoreBadge';

export const Performance: React.FC = () => {
  // Mock data
  const metrics = [
    { label: "Total Signals", value: "847", sub: "+24 today" },
    { label: "INFORMED Accuracy", value: "64%", sub: "+14pp vs random", color: "text-signal-green" },
    { label: "Avg Score", value: "52", sub: "Last 30 days" },
    { label: "Resolved", value: "612", sub: "72% of total" },
  ];

  const resolvedSignals = [
    { id: '1', market: 'Presidential Election 2027', score: 88, class: 'INFORMED_MOVE', call: '▲ YES', outcome: 'CORRECT' },
    { id: '2', market: 'EPL Winner: Arsenal', score: 72, class: 'INFORMED_MOVE', call: '▼ NO', outcome: 'CORRECT' },
    { id: '3', market: 'Interest Rate Hike: Q3', score: 54, class: 'UNCERTAIN', call: '▲ YES', outcome: 'REVERSED' },
    { id: '4', market: 'Tech IPO: Lagos Hub', score: 22, class: 'NOISE', call: '▲ YES', outcome: 'REVERSED' },
  ];

  const mockScores = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <PageTitle 
        title="Signal Performance" 
        subtitle="Historical accuracy analysis of Prism signal classifications and predictive power." 
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {metrics.map((m, i) => (
          <div key={i} className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-prism-text-3 mb-2">{m.label}</p>
            <p className={`font-mono text-3xl font-bold ${m.color || 'text-prism-text-1'}`}>{m.value}</p>
            <p className="font-sans text-[10px] text-prism-text-3 mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Distribution Chart */}
        <div className="lg:col-span-2">
           <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                 <BarChart3 size={18} className="text-prism-accent" />
                 <h3 className="font-sans text-sm font-semibold text-prism-text-1 uppercase tracking-widest">Score Distribution</h3>
              </div>
              <ScoreDistribution scores={mockScores} />
           </div>
        </div>

        {/* Accuracy Comparison */}
        <div className="space-y-6">
           <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                 <Target size={18} className="text-prism-accent" />
                 <h3 className="font-sans text-sm font-semibold text-prism-text-1 uppercase tracking-widest">Accuracy vs. Baseline</h3>
              </div>
              <div className="space-y-6">
                 <div>
                   <div className="flex justify-between text-xs font-mono mb-2">
                     <span className="text-prism-text-3">INFORMED (Score &gt; 70)</span>
                     <span className="text-signal-green">64%</span>
                   </div>
                   <div className="h-1.5 w-full bg-prism-navy-3 rounded-full overflow-hidden">
                     <div className="h-full bg-signal-green" style={{ width: '64%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-xs font-mono mb-2">
                     <span className="text-prism-text-3">UNCERTAIN (40-70)</span>
                     <span className="text-signal-amber">52%</span>
                   </div>
                   <div className="h-1.5 w-full bg-prism-navy-3 rounded-full overflow-hidden">
                     <div className="h-full bg-signal-amber" style={{ width: '52%' }}></div>
                   </div>
                 </div>
                 <div className="pt-6 border-t border-prism-navy-3">
                   <div className="flex justify-between text-xs font-mono mb-2">
                     <span className="text-prism-text-3 italic">Random Baseline</span>
                     <span className="text-prism-text-3">50%</span>
                   </div>
                   <div className="h-1.5 w-full bg-prism-navy-3 rounded-full border border-prism-steel border-dashed"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Resolved Signals Table */}
      <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-prism-navy-3 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <Activity size={18} className="text-prism-accent" />
              <h3 className="font-sans text-sm font-semibold text-prism-text-1 uppercase tracking-widest">Resolved Signals</h3>
           </div>
           <button className="font-mono text-[10px] text-prism-text-3 hover:text-prism-text-1 transition-colors uppercase tracking-widest">Export CSV ↓</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-prism-navy-2 px-6 border-b border-prism-navy-3">
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Market</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Score</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Direction</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {resolvedSignals.map((s) => (
                <tr key={s.id} className="border-b border-prism-navy-3/50 hover:bg-prism-navy-3 transition-colors group">
                  <td className="py-4 px-6 font-sans text-sm text-prism-text-1 font-medium">{s.market}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <ScoreBadge score={s.score} size="sm" />
                       <ClassificationChip classification={s.class as any} className="hidden md:block" />
                    </div>
                  </td>
                  <td className={`py-4 px-6 font-mono text-xs font-bold ${s.call.includes('▲') ? 'text-signal-green' : 'text-signal-red'}`}>
                    {s.call}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      s.outcome === 'CORRECT' ? 'bg-signal-green-bg text-signal-green border border-signal-green-muted' : 'bg-signal-red-bg text-signal-red border border-signal-red-muted'
                    }`}>
                      {s.outcome}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-prism-navy-2 border-t border-prism-navy-3 flex justify-center">
           <div className="flex gap-2">
              <button className="px-3 py-1 bg-prism-navy-3 text-prism-text-3 rounded text-[10px] font-mono hover:text-white transition-colors">← PREV</button>
              <span className="px-3 py-1 font-mono text-[10px] text-prism-text-2 tracking-widest">PAGE 1 OF 12</span>
              <button className="px-3 py-1 bg-prism-navy-3 text-prism-text-3 rounded text-[10px] font-mono hover:text-white transition-colors">NEXT →</button>
           </div>
        </div>
      </div>
    </div>
  );
};
