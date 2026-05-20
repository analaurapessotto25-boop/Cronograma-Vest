import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  label: string;
  value: string | number;
  iconBgColor?: string;
}

export default function StatsCard({ icon, label, value, iconBgColor = 'bg-blue-50' }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="text-sm font-medium text-slate-600">{label}</h3>
      </div>
      <p className="text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
