"use client";

import { X } from "lucide-react";
import type * as React from "react";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  step?: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0F1115] shadow-2xl animate-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-primary/10 pointer-events-none rounded-2xl" />

        <div className="relative px-6 pt-6 pb-5 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110"
            >
              <X className="w-5 h-5 text-zinc-400 hover:text-white" />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">{children}</div>
      </div>
    </div>
  );
}
