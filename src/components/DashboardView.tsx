import React from 'react';
import {
  TrendingDown,
  Truck,
  Leaf,
  IndianRupee,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Thermometer,
  Zap,
  Activity
} from 'lucide-react';
import {
  KpiMetrics,
  TodayStatus,
  NavigationTab,
  AtRiskFoodItem,
  SensorAlert
} from '../types';
import { WorkflowLoop } from './WorkflowLoop';

interface DashboardViewProps {
  kpis: KpiMetrics;
  todayStatus: TodayStatus;
  atRiskFood: AtRiskFoodItem[];
  sensorAlerts: SensorAlert[];
  onNavigate: (tab: NavigationTab) => void;
  onOpenDemo: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  kpis,
  todayStatus,
  atRiskFood,
  sensorAlerts,
  onNavigate,
  onOpenDemo
}) => {
  const unacknowledgedAlerts = sensorAlerts.filter(a => !a.acknowledged);

  return (
    <div className="space-y-6">
      {/* Welcome & Quick Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Closed-Loop Institutional Kitchen OS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Stop Food Waste Before and After Cooking
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            Annasetu orchestrates demand forecasting, smart prep planning, real-time IoT monitoring, quality detection, and surplus distribution — then feeds actual outcomes back into future predictions.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              id="dashboard-start-demo-btn"
              onClick={onOpenDemo}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <span>Run Interactive Demo (2 Mins)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              id="dashboard-view-demand-btn"
              onClick={() => onNavigate('predict')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-all border border-white/20"
            >
              Adjust Today's Demand Plan
            </button>
          </div>
        </div>

        {/* Ambient subtle decorative circle */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Food Waste Prevented
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {kpis.foodWastePreventedKg} <span className="text-sm font-semibold text-slate-500">kg</span>
            </span>
          </div>
          <div className="mt-2 text-xs font-medium text-emerald-700 flex items-center gap-1">
            <span>{kpis.foodWastePreventedTrend}</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Surplus Redistributed
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {kpis.surplusMealsRedistributed} <span className="text-sm font-semibold text-slate-500">meals</span>
            </span>
          </div>
          <div className="mt-2 text-xs font-medium text-teal-700 flex items-center gap-1">
            <span>{kpis.surplusMealsTrend}</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              CO₂e Avoided
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {kpis.co2eAvoidedKg} <span className="text-sm font-semibold text-slate-500">kg</span>
            </span>
            <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
              Estimated
            </span>
          </div>
          <div className="mt-2 text-xs font-medium text-blue-700 truncate">
            {kpis.co2eAvoidedTrend}
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Estimated Cost Saved
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              ₹{kpis.costSavedInr.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-2 text-xs font-medium text-indigo-700">
            {kpis.costSavedTrend}
          </div>
        </div>
      </div>

      {/* TODAY'S STATUS SECTION */}
      <div id="todays-status-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Today's Kitchen Operational Status
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time synchronization between production, cold chain IoT, and redistribution.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{todayStatus.lastUpdated}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mt-5">
          {/* Status 1: Predicted Meals */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Predicted Meals
            </div>
            <div className="text-2xl font-extrabold text-blue-900 mt-1">
              {todayStatus.predictedMeals}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <span>Forecast: 87% conf.</span>
            </div>
          </div>

          {/* Status 2: Actual Meals Produced */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Actual Produced
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {todayStatus.actualMealsProduced}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              Optimized -30 meals
            </div>
          </div>

          {/* Status 3: Surplus Detected */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
              Surplus Detected
            </div>
            <div className="text-2xl font-extrabold text-amber-900 mt-1">
              {todayStatus.surplusDetectedMeals} <span className="text-xs font-semibold">meals</span>
            </div>
            <div className="text-[11px] text-amber-800 font-medium mt-1">
              Safe & Fresh Basmati Rice
            </div>
          </div>

          {/* Status 4: Items Requiring Attention */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
            <div className="text-[11px] font-bold text-rose-900 uppercase tracking-wider">
              Items At Risk
            </div>
            <div className="text-2xl font-extrabold text-rose-900 mt-1">
              {atRiskFood.length} <span className="text-xs font-semibold">items</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('detect')}
              className="text-[11px] text-rose-700 hover:underline font-semibold mt-1 inline-flex items-center gap-0.5"
            >
              <span>Inspect items</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Status 5: Redistribution Status */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 col-span-2 md:col-span-1">
            <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
              Redistribution
            </div>
            <div className="text-base sm:text-lg font-extrabold text-emerald-900 mt-1 truncate">
              {todayStatus.redistributionStatus}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('redistribute')}
              className="text-[11px] text-emerald-700 hover:underline font-semibold mt-1 inline-flex items-center gap-0.5"
            >
              <span>View recipient nodes</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* CLOSED-LOOP WORKFLOW VISUAL SECTION */}
      <WorkflowLoop
        currentTab="dashboard"
        onSelectTab={onNavigate}
      />

      {/* TWO-COLUMN QUICK ACTIONS & REAL-TIME SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* At-Risk Priority Items Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <h3 className="font-bold text-sm text-slate-900">Immediate Expiry & At-Risk Actions</h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('detect')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Scan / Manage →
            </button>
          </div>
          <div className="divide-y divide-slate-100 mt-3">
            {atRiskFood.slice(0, 3).map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{item.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {item.quantity} • {item.expiry}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.risk === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : item.risk === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.risk} Risk
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('detect')}
                    className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cold Storage & Telemetry Quick Snapshot */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600" />
              <h3 className="font-bold text-sm text-slate-900">IoT Telemetry & Health Stream</h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('monitor')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Full Monitor →
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {unacknowledgedAlerts.length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-amber-900">{unacknowledgedAlerts[0].title}</div>
                  <div className="text-[11px] text-amber-800 mt-0.5">{unacknowledgedAlerts[0].message}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('monitor')}
                  className="shrink-0 px-2.5 py-1 text-[11px] font-semibold bg-amber-200 text-amber-900 rounded-md hover:bg-amber-300"
                >
                  Review
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="text-slate-500 text-[11px]">Walk-in Cold Storage #2</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">4.2°C</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Safe (2°C - 6°C)</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="text-slate-500 text-[11px]">Kitchen Power Load</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">1.8 kW</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Normal baseline</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>Hardware Link: ESP32 → MQTT Broker</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Live Heartbeat (10s)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
