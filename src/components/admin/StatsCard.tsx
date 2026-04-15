import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
}

export default function StatsCard({ label, value, change, changeLabel, icon: Icon }: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-admin-surface border border-admin-border rounded-xl p-5 hover:border-admin-accent/30 transition-colors duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-admin-accent/10 rounded-lg">
          <Icon className="w-5 h-5 text-admin-accent" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>
      <p className="text-2xl font-bold text-admin-text mb-1">{value}</p>
      <p className="text-xs text-admin-text-muted">{label} · {changeLabel}</p>
    </div>
  );
}
