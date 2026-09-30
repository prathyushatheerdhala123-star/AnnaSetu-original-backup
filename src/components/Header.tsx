import React, { useState } from 'react';
import {
  Sparkles,
  Building2,
  Bell,
  CheckCircle2,
  Play,
  RotateCcw,
  Sliders,
  ChevronDown,
  Info,
  Layers,
  Leaf
} from 'lucide-react';
import { KitchenUnit } from '../types';

interface HeaderProps {
  kitchens: KitchenUnit[];
  selectedKitchen: KitchenUnit;
  onSelectKitchen: (kitchen: KitchenUnit) => void;
  isDemoActive: boolean;
  onToggleDemo: () => void;
  notificationCount: number;
  onOpenChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  kitchens,
  selectedKitchen,
  onSelectKitchen,
  isDemoActive,
  onToggleDemo,
  notificationCount,
  onOpenChat
}) => {
  const [showKitchenMenu, setShowKitchenMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <header id="annasetu-main-header" className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-500/20">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Annasetu <span className="text-emerald-600">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Hackathon Prototype
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                AI-Powered Food Waste Reduction & Closed-Loop Logistics
              </p>
            </div>
          </div>

          {/* Center / Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Kitchen / Processing Unit Selector */}
            <div className="relative">
              <button
                type="button"
                id="kitchen-unit-selector-btn"
                onClick={() => setShowKitchenMenu(!showKitchenMenu)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                aria-label="Select Kitchen Unit"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="hidden md:inline max-w-[160px] truncate text-left">
                  {selectedKitchen.name}
                </span>
                <span className="md:hidden truncate max-w-[80px]">
                  {selectedKitchen.id.toUpperCase()}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showKitchenMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-40">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Production Facility
                  </div>
                  {kitchens.map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => {
                        onSelectKitchen(k);
                        setShowKitchenMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-start gap-2.5 ${
                        selectedKitchen.id === k.id
                          ? 'bg-emerald-50/80 text-emerald-900 font-semibold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">{k.name}</div>
                        <div className="text-[11px] text-slate-500">{k.location} • Cap: {k.dailyCapacity} meals/day</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Demo Mode Button */}
            <button
              type="button"
              id="header-demo-mode-button"
              onClick={onToggleDemo}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                isDemoActive
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400/50 animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              {isDemoActive ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Exit Demo</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                  <span className="hidden sm:inline">Interactive Demo</span>
                  <span className="sm:hidden">Demo</span>
                </>
              )}
            </button>

            {/* Gemini AI Copilot Button */}
            {onOpenChat && (
              <button
                type="button"
                id="header-open-chat-btn"
                onClick={onOpenChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-slate-900 to-emerald-950 text-emerald-300 hover:text-white border border-emerald-500/40 shadow-xs transition-all"
                title="Ask Gemini Kitchen AI Copilot"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Annasetu Copilot</span>
                <span className="sm:hidden">AI</span>
              </button>
            )}

            {/* Notification Icon */}
            <div className="relative">
              <button
                type="button"
                id="header-notifications-button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-40">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Operational Alerts & Updates</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                      {notificationCount} New
                    </span>
                  </div>
                  <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
                    <div className="p-2 bg-amber-50/70 border border-amber-200 rounded-lg text-xs">
                      <div className="font-semibold text-amber-900">Cold Storage #2 Spike Alert</div>
                      <div className="text-[11px] text-amber-800 mt-0.5">Exceeded 6.0°C threshold for 8 minutes. Automated fan cycle restored balance.</div>
                      <div className="text-[10px] text-amber-700/80 mt-1">Today at 09:22 AM</div>
                    </div>
                    <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs">
                      <div className="font-semibold text-emerald-900">Surplus Matched Successfully</div>
                      <div className="text-[11px] text-emerald-800 mt-0.5">30 Basmati Rice meals dispatched to Nearby Community Care Kitchen.</div>
                      <div className="text-[10px] text-emerald-700/80 mt-1">Today at 11:45 AM</div>
                    </div>
                    <div className="p-2 bg-blue-50/70 border border-blue-200 rounded-lg text-xs">
                      <div className="font-semibold text-blue-900">Forecast Model Calibrated</div>
                      <div className="text-[11px] text-blue-800 mt-0.5">Tomorrow's production baseline adjusted to 860 meals (-40 variance corrected).</div>
                      <div className="text-[10px] text-blue-700/80 mt-1">12 minutes ago</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile / Settings Button */}
            <button
              type="button"
              id="header-settings-button"
              onClick={() => setShowSettingsModal(true)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings / System Info Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Annasetu AI Ecosystem Config</h3>
                  <p className="text-[11px] text-slate-500">Prototype Environment & Parameters</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800">Closed-Loop Architecture</div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Predict → Prevent → Monitor → Detect → Redistribute → Measure → Learn
                </div>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span>Active Facility:</span>
                <span className="font-semibold text-slate-800">{selectedKitchen.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span>Data Simulator:</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized (Local State)
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span>Telemetry Ingestion:</span>
                <span className="font-semibold text-slate-800">ESP32 MQTT Mock Broker</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>ESG Standard:</span>
                <span className="font-semibold text-slate-800">GHG Protocol Scope 3 Category 5</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
