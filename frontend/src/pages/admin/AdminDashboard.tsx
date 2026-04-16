import React from 'react';
import { PageTitle } from '../../components/ui/PageTitle';
import { Activity, Globe, Database, Cpu } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const kpis = [
    { label: "Total Markets", value: "142", icon: Globe, sub: "+3 today", color: "text-prism-text-1" },
    { label: "Signals (24H)", value: "24", icon: Activity, sub: "Trending up", color: "text-signal-green" },
    { label: "AI Insights", value: "18", icon: Cpu, sub: "92% coverage", color: "text-prism-accent" },
    { label: "Snapshots", value: "8.4k", icon: Database, sub: "Healthy", color: "text-prism-text-3" },
  ];

  const statuses = [
    { label: "Bayse API", state: "CONNECTED", theme: "green" },
    { label: "PostgreSQL", state: "HEALTHY", theme: "green" },
    { label: "Redis", state: "CONNECTED", theme: "green" },
    { label: "Gemini API", state: "DEGRADED", theme: "amber" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <PageTitle title="Admin Dashboard" subtitle="Real-time system health and ingestion metrics." />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
               <span className="font-mono text-[10px] uppercase tracking-widest text-prism-text-3">{kpi.label}</span>
               <kpi.icon size={14} className="text-prism-text-3" />
            </div>
            <p className={`font-mono text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="font-sans text-[10px] text-prism-text-3 mt-1.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* System Status */}
      <div className="flex flex-wrap gap-3 mb-10">
        {statuses.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-prism-navy-2 border border-prism-navy-3 rounded-full px-4 py-2 font-mono text-[10px] transition-all hover:border-prism-steel cursor-default">
             <div className={`w-2 h-2 rounded-full animate-pulse ${
               s.theme === 'green' ? 'bg-signal-green' : 'bg-signal-amber'
             }`} />
             <span className="text-prism-text-3 uppercase tracking-widest">{s.label}</span>
             <span className={`font-bold ${
               s.theme === 'green' ? 'text-signal-green' : 'text-signal-amber'
             }`}>{s.state}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Recent Jobs */}
         <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-prism-navy-3 bg-prism-navy-3/30">
               <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-prism-text-2 font-bold">Recent Jobs Activity</h3>
            </div>
            <div className="p-0 overflow-x-auto">
               <table className="w-full text-left font-mono text-[10px]">
                  <thead>
                     <tr className="border-b border-prism-navy-3 text-prism-text-3">
                        <th className="px-4 py-3 uppercase tracking-widest">Job Name</th>
                        <th className="px-4 py-3 uppercase tracking-widest">Duration</th>
                        <th className="px-4 py-3 uppercase tracking-widest">Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="border-b border-prism-navy-3/50 hover:bg-prism-navy-3 transition-colors">
                        <td className="px-4 py-3 text-prism-text-1">ingestion_cycle</td>
                        <td className="px-4 py-3 text-prism-text-3">1.4s</td>
                        <td className="px-4 py-3 text-signal-green">SUCCESS</td>
                     </tr>
                     <tr className="border-b border-prism-navy-3/50 hover:bg-prism-navy-3 transition-colors">
                        <td className="px-4 py-3 text-prism-text-1">signal_scorer</td>
                        <td className="px-4 py-3 text-prism-text-3">0.8s</td>
                        <td className="px-4 py-3 text-signal-green">SUCCESS</td>
                     </tr>
                     <tr className="hover:bg-prism-navy-3 transition-colors">
                        <td className="px-4 py-3 text-prism-text-1">gemini_analysis</td>
                        <td className="px-4 py-3 text-prism-text-3">2.1s</td>
                        <td className="px-4 py-3 text-signal-amber">DEGRADED</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         {/* Admin Logs */}
         <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-prism-navy-3 bg-prism-navy-3/30">
               <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-prism-text-2 font-bold">Admin Audit Log</h3>
            </div>
            <div className="p-4 space-y-4">
               <div className="flex gap-4 items-start">
                  <span className="font-mono text-[9px] text-prism-text-3 mt-1 underline">14:02:11</span>
                  <p className="text-xs text-prism-text-2">
                    <span className="text-prism-text-1 font-bold">sys_admin</span> manually triggered <span className="text-prism-accent">ingestion_job</span>
                  </p>
               </div>
               <div className="flex gap-4 items-start">
                  <span className="font-mono text-[9px] text-prism-text-3 mt-1 underline">13:42:02</span>
                  <p className="text-xs text-prism-text-2">
                    <span className="text-prism-text-1 font-bold">sys_admin</span> updated scoring weights for <span className="text-prism-accent">Price Delta</span>
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
