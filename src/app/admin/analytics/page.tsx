'use client';

import { BarChart3, TrendingUp, Clock, Globe } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const categorySales = [
    { name: 'Living Room', revenue: 21990.00, percentage: 45 },
    { name: 'Dining Room', revenue: 14890.00, percentage: 31 },
    { name: 'Bedroom', revenue: 6890.00, percentage: 14 },
    { name: 'Office', revenue: 2890.00, percentage: 6 },
    { name: 'Outdoor', revenue: 1630.00, percentage: 4 },
  ];

  const weeklyTraffic = [
    { day: 'Mon', visits: 1200, sales: 12 },
    { day: 'Tue', visits: 1450, sales: 15 },
    { day: 'Wed', visits: 1800, sales: 24 },
    { day: 'Thu', visits: 1600, sales: 18 },
    { day: 'Fri', visits: 2100, sales: 30 },
    { day: 'Sat', visits: 2500, sales: 38 },
    { day: 'Sun', visits: 2200, sales: 28 },
  ];

  const maxVisits = Math.max(...weeklyTraffic.map((t) => t.visits));

  return (
    <div className="space-y-8 text-left">
      
      {/* Top Cards Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-body">Conversion Rate</h4>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-zinc-100 font-body">2.48%</h3>
            <p className="text-[10px] text-green-400 font-semibold">+0.32% vs last month</p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-body">Average Session</h4>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-zinc-100 font-body">4m 12s</h3>
            <p className="text-[10px] text-green-400 font-semibold">+18s vs last week</p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center">
              <Globe className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-body">Global Visits</h4>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-zinc-100 font-body">15,820</h3>
            <p className="text-[10px] text-green-400 font-semibold">+8.4% monthly traffic</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Weekly traffic bar chart (span 7) */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-heading text-lg font-bold text-zinc-100 flex items-center gap-2">
              <BarChart3 className="w-4.5 h-4.5 text-gold" />
              Weekly Traffic & Sales
            </h3>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-64 flex items-end justify-between gap-2 pt-6 border-b border-zinc-800 pb-2">
            {weeklyTraffic.map((t, idx) => {
              const heightPercentage = (t.visits / maxVisits) * 100;
              return (
                <div key={idx} className="flex flex-col items-center flex-grow group">
                  <span className="text-[9px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity mb-2 font-mono">
                    {t.visits}
                  </span>
                  
                  {/* Visual Bar with double fill (sales vs visits) */}
                  <div className="w-full bg-zinc-950 rounded-t-lg h-48 flex items-end relative overflow-hidden">
                    <div
                      style={{ height: `${heightPercentage}%` }}
                      className="w-full bg-zinc-800 group-hover:bg-gold/20 transition-all duration-300 rounded-t-md"
                    />
                    {/* Simulated Sales nested bar */}
                    <div
                      style={{ height: `${(t.sales / 40) * 100}%` }}
                      className="w-full bg-gold absolute bottom-0 left-0 rounded-t-sm"
                    />
                  </div>

                  <span className="text-[10px] text-zinc-400 font-body mt-2">{t.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 text-[10px] uppercase font-bold tracking-wider font-body pt-2">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-3 h-3 bg-zinc-800 rounded-sm border border-zinc-700" />
              <span>User Sessions</span>
            </div>
            <div className="flex items-center gap-1.5 text-gold">
              <span className="w-3 h-3 bg-gold rounded-sm" />
              <span>Checkout Sales</span>
            </div>
          </div>
        </div>

        {/* Category breakdown progress list (span 5) */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-heading text-lg font-bold text-zinc-100">Revenue by Category</h3>
          
          <div className="space-y-5">
            {categorySales.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold font-body">
                  <span className="text-zinc-200">{cat.name}</span>
                  <span className="text-gold font-bold">
                    ${cat.revenue.toLocaleString()} ({cat.percentage}%)
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${cat.percentage}%` }}
                    className="h-full bg-gold rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
