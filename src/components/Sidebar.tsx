import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Activity,
  ScanLine,
  Truck,
  Lightbulb,
  Leaf,
  Repeat,
  ChevronRight,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unreadAlertCount: number;
  atRiskCount: number;
  surplusMeals: number;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  stageNumber?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unreadAlertCount,
  atRiskCount,
  surplusMeals
}) => {
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Main Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'predict',
      label: 'Demand Prediction',
      stageNumber: '01 & 02',
      icon: TrendingUp
    },
    {
      id: 'monitor',
      label: 'IoT Monitoring',
      stageNumber: '03',
      icon: Activity,
      badge: unreadAlertCount > 0 ? `${unreadAlertCount} Alert` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'detect',
      label: 'Food Detection',
      stageNumber: '04',
      icon: ScanLine,
      badge: atRiskCount > 0 ? `${atRiskCount} Items` : undefined,
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    {
      id: 'redistribute',
      label: 'Redistribution',
      stageNumber: '05',
      icon: Truck,
      badge: surplusMeals > 0 ? `${surplusMeals} Meals` : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'insights',
      label: 'Operational Insights',
      icon: Lightbulb
    },
    {
      id: 'sustainability',
      label: 'Sustainability',
      stageNumber: '06',
      icon: Leaf
    },
    {
      id: 'learn',
      label: 'Learn / Feedback',
      stageNumber: '07',
      icon: Repeat,
      badge: 'Feedback Loop',
      badgeColor: 'bg-violet-100 text-violet-800'
    }
  ];

  return (
    <aside id="main-navigation-sidebar" className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        <div>
          <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-item-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive ? (
                      <ChevronRight className="w-3.5 h-3.5 text-white/80" />
                    ) : (
                      item.stageNumber && (
                        <span className="text-[10px] text-slate-400 font-mono hidden group-hover:inline">
                          {item.stageNumber}
                        </span>
                      )
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Closed-Loop Visual Reminder in Sidebar */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Closed-Loop Active</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Every redistribution and variance observation trains tomorrow’s production forecast.
          </p>
          <div className="mt-3 flex items-center justify-between text-[10px] text-emerald-700 font-bold">
            <span>Stage 1 to 7 Connected</span>
            <CheckCircle className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 space-y-1">
        <div className="flex justify-between">
          <span>Engine Status:</span>
          <span className="text-emerald-600 font-medium">Operational</span>
        </div>
        <div className="flex justify-between">
          <span>Telemetry Protocol:</span>
          <span className="text-slate-600 font-medium">MQTT / JSON</span>
        </div>
        <div className="text-[10px] text-slate-400 pt-1">
          Annasetu • v1.0 Prototype
        </div>
      </div>
    </aside>
  );
};
