import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  isLoading?: boolean;
  iconColor?: string;
  bgColor?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  isLoading = false,
  iconColor = 'text-primary',
  bgColor = 'bg-primary/10'
}: StatsCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="h-4 w-24 rounded bg-slate-200"></div>
            <div className="mt-3 h-8 w-16 rounded bg-slate-200"></div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-slate-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium text-slate-500">{title}</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
        </div>
        <div className={`rounded-xl ${bgColor} p-3 transition-all duration-300 group-hover:scale-110`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
