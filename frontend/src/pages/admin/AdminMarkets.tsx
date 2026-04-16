import React from 'react';
import { Search, ExternalLink, Filter } from 'lucide-react';

export const AdminMarkets: React.FC = () => {
  const categories = ["ALL", "POLITICS", "SPORTS", "ECONOMY", "TECH"];

  const markets = [
    { id: '8454927884321', title: 'Osun State Election: Winner', cat: 'POLITICS', liq: '2.1M', orders: 1422, prob: 0.64, snapshots: 842 },
    { id: '1234765123423', title: 'EPL Winner: Arsenal', cat: 'SPORTS', liq: '890k', orders: 612, prob: 0.28, snapshots: 156 },
    { id: '9982312345123', title: 'Interest Rate Hike by Q3', cat: 'ECONOMY', liq: '150k', orders: 84, prob: 0.42, snapshots: 42 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-prism-text-1">Market Monitor</h1>
          <p className="font-sans text-sm text-prism-text-3 mt-1">All Bayse markets currently tracked and scored by the engine.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-prism-text-3" size={14} />
            <input 
              type="text" 
              placeholder="Search markets..." 
              className="bg-prism-navy-2 border border-prism-steel rounded-md pl-9 pr-4 py-2 font-mono text-xs text-prism-text-1 focus:outline-none focus:border-prism-accent w-full sm:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-prism-navy-2 border border-prism-steel rounded-md text-prism-text-3 hover:text-white transition-colors">
            <Filter size={14} />
            <span className="font-mono text-[10px] uppercase tracking-widest">Filter</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button 
            key={cat}
            className={`px-4 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-widest border transition-colors ${
              cat === 'ALL' 
                ? 'bg-prism-navy-3 border-prism-accent text-white' 
                : 'bg-prism-navy-2 border-prism-navy-3 text-prism-text-3 hover:border-prism-steel'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-prism-navy-3/30 border-b border-prism-navy-3">
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Market ID</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Title</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Category</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Liquidity</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Probability</th>
                <th className="py-4 px-6 font-mono text-[10px] uppercase text-prism-text-3 tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m) => (
                <tr key={m.id} className="border-b border-prism-navy-3/50 hover:bg-prism-navy-3/50 transition-colors">
                  <td className="py-4 px-6 font-mono text-[10px] text-prism-text-3">#{m.id.slice(-6)}</td>
                  <td className="py-4 px-6 font-sans text-sm text-prism-text-1 font-medium">{m.title}</td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-prism-navy-4 rounded text-prism-text-2 bg-prism-navy-3">
                      {m.cat}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-prism-text-mono">NGN {m.liq}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-1.5 bg-prism-navy-4 rounded-full overflow-hidden">
                        <div className="h-full bg-prism-accent" style={{ width: `${m.prob * 100}%` }}></div>
                      </div>
                      <span className="font-mono text-xs text-prism-text-1">{(m.prob * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button className="p-2 text-prism-text-3 hover:text-prism-accent transition-colors">
                      <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
