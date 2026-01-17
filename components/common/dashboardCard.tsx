import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  description?: string;
  iconSize?: number;
  iconColor: string;
  textIconColor?: string;
  bgIconColor?: string;
}

export default function DashboardCard({
  icon: Icon,
  title,
  value,
  description,
  iconSize,
  iconColor,
  textIconColor,
  bgIconColor,
}: DashboardCardProps) {
  return (
    <div className="bg-white border border-[#cfdbe7] rounded-xl p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 group">
      <div className="flex justify-between items-start">
        <p className="text-[#4c739a] text-sm font-semibold">{title}</p>
        <div
          className={`p-2 bg-${bgIconColor} rounded-lg text-${
            textIconColor || iconColor
          } group-hover:bg-${iconColor} group-hover:text-white transition-colors`}
        >
          <span className="material-symbols-outlined">
            <Icon size={iconSize || 20} />
          </span>
        </div>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-[#0d141b] text-2xl lg:text-3xl font-extrabold">
          {value}
        </p>
        <span className="text-[#078838] text-xs lg:text-sm font-bold pb-1 bg-green-50 px-2 py-0.5 rounded-full">
          {description}
        </span>
      </div>
    </div>
  );
}
