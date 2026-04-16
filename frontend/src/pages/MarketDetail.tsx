import React from 'react';
import { ArrowLeft, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { ProbabilityChart } from '../components/charts/ProbabilityChart';
import { SignalCard } from '../components/ui/SignalCard';
import { DataRow } from '../components/ui/DataRow';

export const MarketDetail: React.FC = () => {


  // Mock data for demonstration
  const market = {
    title: "Osun State Gubernatorial Election: Winner",
    category: "POLITICS",
    probability: 0.64,
    liquidity: "NGN 2,100,500",
    orders: 1422,
    lastUpdated: "2m ago"
  };

  const chartData = Array.from({ length: 24 }, (_, i) => ({
    date: new Date(Date.now() - (23 - i) * 3600000),
    value: 0.45 + Math.random() * 0.25
  }));

  const signals = [
    {
      id: "1",
      score: 86,
      classification: "INFORMED_MOVE" as const,
      priceDelta: "+12%",
      timestamp: "2m ago",
      liquidity: "NGN 2.1M",
      orders: 842,
      volRatio: 3.2,
      aiInsight: "Significant high-conviction buying detected across 42 individual addresses. Volume spike indicates structural position entry.",
      marketTitle: market.title,
      marketId: "osun-election"
    },
    {
      id: "2",
      score: 42,
      classification: "UNCERTAIN" as const,
      priceDelta: "+3%",
      timestamp: "4h ago",
      liquidity: "NGN 1.8M",
      orders: 156,
      volRatio: 1.1,
      marketTitle: market.title,
      marketId: "osun-election"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Header */}
      <Link to="/dashboard" className="flex w-fit items-center gap-2 text-prism-text-3 hover:text-prism-text-1 transition-colors group mb-6">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-sans text-sm font-medium">Back to Feed</span>
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
             <h1 className="font-display text-2xl md:text-3xl font-bold text-prism-text-1">{market.title}</h1>
             <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 bg-prism-navy-3 border border-prism-steel rounded-full text-prism-text-3">
               {market.category}
             </span>
          </div>
          <p className="text-prism-text-3 text-sm mt-1 font-sans">Market ID: osun-state-election-2026</p>
        </div>
      </div>

      {/* Snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-prism-navy-3 mb-8">
        <div>
          <p className="font-sans text-xs text-prism-text-3 uppercase tracking-widest mb-1">PROBABILITY</p>
          <p className="font-mono text-4xl font-bold text-prism-text-1">{(market.probability * 100).toFixed(0)}%</p>
        </div>
        <div>
          <p className="font-sans text-xs text-prism-text-3 uppercase tracking-widest mb-1">LIQUIDITY</p>
          <p className="font-mono text-lg font-bold text-prism-text-mono mt-2">{market.liquidity}</p>
        </div>
        <div>
          <p className="font-sans text-xs text-prism-text-3 uppercase tracking-widest mb-1">TOTAL ORDERS</p>
          <p className="font-mono text-lg font-bold text-prism-text-mono mt-2">{market.orders}</p>
        </div>
        <div>
          <p className="font-sans text-xs text-prism-text-3 uppercase tracking-widest mb-1 text-right">LAST UPDATED</p>
          <p className="font-mono text-xs text-prism-text-3 mt-3 text-right">{market.lastUpdated}</p>
        </div>
      </div>

      {/* Probability Chart */}
      <div className="mb-12">
        <h2 className="font-sans text-sm font-semibold text-prism-text-2 uppercase tracking-widest mb-4 flex items-center gap-2">
          <TrendingUp size={16} />
          Probability Flow (24H)
        </h2>
        <ProbabilityChart 
          data={chartData} 
          signals={signals.map(s => ({ timestamp: new Date(), score: s.score, classification: s.classification }))} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Signals History */}
        <div className="lg:col-span-2">
           <h2 className="font-sans text-sm font-semibold text-prism-text-2 uppercase tracking-widest mb-4 flex items-center gap-2">
             <Clock size={16} />
             Signal History
           </h2>
           <div className="space-y-3">
             {signals.map(sig => (
               <SignalCard key={sig.id} signal={sig} mode="full" />
             ))}
           </div>
        </div>

        {/* Top Analysis */}
        <div className="space-y-6">
           <div className="bg-signal-green-bg border border-signal-green-muted rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                 <Sparkles size={16} className="text-signal-green" />
                 <h3 className="font-mono text-[10px] uppercase tracking-widest text-signal-green font-bold">LATEST AI INSIGHT</h3>
              </div>
              <p className="text-sm italic leading-relaxed text-prism-text-1">
                "Significant high-conviction buying detected across multiple independent addresses. This suggests the move is driven by informed participants repositioning ahead of expected volatility."
              </p>
           </div>

           <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-prism-text-3 mb-4">MARKET METRICS</h3>
              <div className="space-y-1">
                <DataRow label="Depth Ratio" value="1.42x" />
                <DataRow label="Volatility" value="Low" mono={false} />
                <DataRow label="Spread" value="0.01" />
                <DataRow label="Active Traders" value="482" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
