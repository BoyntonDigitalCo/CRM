import React from 'react';
import { LayoutDashboard, Users, Briefcase, Calendar, Settings, LogOut, Wrench } from 'lucide-react';
import { cn } from '../lib/utils';

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-full bg-slate-900 text-slate-300 flex flex-col">
      <div className="p-6 flex items-center gap-3 text-white border-b border-slate-800">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Wrench className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">Carter Plumbing</h1>
          <p className="text-xs text-slate-400">CRM & Dispatch</p>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
