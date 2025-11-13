"use client";

import { Home, Library, Settings } from "lucide-react";

interface NavigationProps {
  activeTab: "home" | "library" | "settings";
  onTabChange: (tab: "home" | "library" | "settings") => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "library", icon: Library, label: "Library" },
  ];

  return (
    <nav className="w-56 bg-background/50 backdrop-blur-sm border-r border-border/30 flex flex-col py-8 px-3 gap-8">
      <div className="px-2">
        <h1 className="text-xl font-bold text-white">placeholder</h1>
      </div>

      <div className="flex flex-col gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id as "home" | "library")}
            className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium text-sm ${
              activeTab === item.id
                ? "bg-primary/25 text-primary border border-primary/40"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            } cursor-pointer`}
          >
            <item.icon size={18} className="flex-shrink-0" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1" />

      <button
        onClick={() => onTabChange("settings")}
        className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-medium text-sm ${
          activeTab === "settings"
            ? "bg-primary/25 text-primary border border-primary/40"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
        } cursor-pointer`}
      >
        <Settings size={18} className="flex-shrink-0" />
        <span>Settings</span>
      </button>
    </nav>
  );
}
