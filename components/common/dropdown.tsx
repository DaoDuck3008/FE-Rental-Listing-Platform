"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  title: string;
}

export default function Dropdown({ title }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-slate-100  text-slate-700  font-semibold text-sm transition-colors"
      >
        <span>{title}</span>
        <span className="material-symbols-outlined text-lg">
          <ChevronDown />
        </span>
      </button>

      {open && (
        <div className="absolute mt-2 w-40 rounded-md bg-white shadow-lg">
          <div className="px-4 py-2 hover:bg-gray-100">Giá thấp → cao</div>
          <div className="px-4 py-2 hover:bg-gray-100">Giá cao → thấp</div>
        </div>
      )}
    </div>
  );
}
