import React, { useState, useEffect } from 'react';
import { PageTitle } from '../../components/ui/PageTitle';
import { Zap, Database, Cpu, Clock } from 'lucide-react';

export const AdminSystem: React.FC = () => {
  const [countdown, setCountdown] = useState(55);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    { name: 'PostgreSQL', status: 'HEALTHY', latency: '4ms', details: 'Connections: 3/20', icon: Database, theme: 'green' },
    { name: 'Redis', status: 'CONNECTED', latency: '1ms', details: 'Memory: 12MB', icon: Zap, theme: 'green' },
    { name: 'Bayse API', status: 'DEGRADED', latency: '420ms', details: 'P99: 1.2s', icon: Globe, theme: 'amber' },
    { name: 'Gemini API', status: 'HEALTHY', latency: '850ms', details: 'Quota: 45%', icon: Cpu, theme: 'green' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <PageTitle title="System Health" subtitle="Global service status and background job orchestrator." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {services.map((s, i) => (
          <div key={i} className={`bg-prism-navy-2 border rounded-lg p-5 transition-all hover:bg-prism-navy-3 ${
            s.theme === 'green' ? 'border-signal-green-muted' : 'border-signal-amber-muted'
          }`}>
             <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-md ${s.theme === 'green' ? 'bg-signal-green-bg/50' : 'bg-signal-amber-bg/50'}`}>
                      <s.icon size={18} className={s.theme === 'green' ? 'text-signal-green' : 'text-signal-amber'} />
                   </div>
                   <div>
                      <h3 className="text-sm font-bold text-prism-text-1">{s.name}</h3>
                      <p className={`font-mono text-[9px] font-bold ${s.theme === 'green' ? 'text-signal-green' : 'text-signal-amber'}`}>
                        {s.status}
                      </p>
                   </div>
                </div>
                <span className="font-mono text-[10px] text-prism-text-3">{s.latency}</span>
             </div>
             <div className="pt-4 border-t border-prism-navy-3 flex justify-between items-center text-[10px] font-mono text-prism-text-3">
                <span>{s.details}</span>
                <span>Checked 12s ago</span>
             </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
         <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-prism-text-3" />
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-prism-text-3 font-bold">Job Scheduler (APScheduler)</h3>
         </div>
         
         <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-prism-navy-3/30 border-b border-prism-navy-3 text-[9px] font-mono uppercase tracking-[0.2em] text-prism-text-3">
                     <tr>
                        <th className="px-6 py-4">Job Name</th>
                        <th className="px-6 py-4">Frequency</th>
                        <th className="px-6 py-4">Last Run</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Next Run</th>
                     </tr>
                  </thead>
                  <tbody className="text-[10px] font-mono">
                     {[
                       { name: 'ingestion_job', freq: '60s', last: '5s ago', status: 'SUCCESS' },
                       { name: 'signal_scorer', freq: '60s', last: '5s ago', status: 'SUCCESS' },
                       { name: 'outcome_job', freq: '30m', last: '12m ago', status: 'SUCCESS' },
                     ].map((job, i) => (
                       <tr key={i} className="border-b border-prism-navy-3/50 hover:bg-prism-navy-3 transition-colors">
                          <td className="px-6 py-4 text-prism-text-1 font-bold">{job.name}</td>
                          <td className="px-6 py-4 text-prism-text-3">{job.freq}</td>
                          <td className="px-6 py-4 text-prism-text-3">{job.last}</td>
                          <td className="px-6 py-4 text-signal-green font-bold">{job.status}</td>
                          <td className="px-6 py-4 text-prism-accent font-bold">IN {countdown}s</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};

// Mock Globe icon if not available
const Globe = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
