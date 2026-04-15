interface StatsCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
}

export default function StatsCard({ label, value, change, changeLabel, icon }: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-[2rem] p-6 hover:shadow-lg transition-all duration-500 group">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
          <span className="material-symbols-outlined text-[24px]">
            {icon}
          </span>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
          isPositive 
            ? 'bg-success-container/10 text-success border border-success/10' 
            : 'bg-error-container/10 text-error border border-error/10'
        }`}>
          <span className="material-symbols-outlined text-[14px]">
            {isPositive ? 'trending_up' : 'trending_down'}
          </span>
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>
      
      <p className="text-3xl font-black text-on-surface tracking-tighter mb-1 font-heading">{value}</p>
      <div className="flex items-center gap-2">
        <p className="text-xs font-bold text-outline uppercase tracking-widest">{label}</p>
        <span className="w-1 h-1 bg-outline/20 rounded-full"></span>
        <p className="text-[10px] font-medium text-on-surface-variant opacity-60">{changeLabel}</p>
      </div>
    </div>
  );
}

