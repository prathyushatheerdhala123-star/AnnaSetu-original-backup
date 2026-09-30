import React, { useState } from 'react';
import {
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Scale,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { OperationalInsight } from '../types';

interface InsightsViewProps {
  insights: OperationalInsight[];
  onApplyRecommendation?: (insightId: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  insights,
  onApplyRecommendation
}) => {
  const [appliedIds, setAppliedIds] = useState<Record<string, boolean>>({});

  const handleApply = (id: string) => {
    setAppliedIds((prev) => ({ ...prev, [id]: true }));
    if (onApplyRecommendation) {
      onApplyRecommendation(id);
    }
  };

  // Mock variance comparison data for visual chart
  const varianceComparisons = [
    { label: 'Food Prep Output vs Target', baseline: 100, actual: 112, diff: '+12%', color: '#f59e0b' },
    { label: 'Raw Ingredient Trim Scrap', baseline: 5, actual: 13.5, diff: '+8.5 kg', color: '#f43f5e' },
    { label: 'Oven & Steamer Idle Ratio', baseline: 10, actual: 19, diff: '+9%', color: '#3b82f6' },
    { label: 'Chiller Compressor Duty Cycle', baseline: 95, actual: 71, diff: '-24 min drop', color: '#6366f1' }
  ];

  return (
    <div className="space-y-6">
      {/* Title & Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              Operational Intelligence
            </span>
            <span className="text-xs text-slate-500 font-medium">Root Cause Analytics</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Kitchen Inefficiency & Anomaly Detection
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-correlating prediction variances with IoT sensor telemetry to isolate hidden operational losses. No additional hardware needed.
          </p>
        </div>
      </div>

      {/* OPERATIONAL ALERT CARDS (Prompt Mandate: Overproduction, Raw Material Loss, Machine Downtime, Excess Energy) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((item) => {
          const isResolved = appliedIds[item.id];

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all ${
                isResolved
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : item.severity === 'critical'
                  ? 'border-rose-200 bg-rose-50/10'
                  : 'border-slate-200/90'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      item.type === 'overproduction'
                        ? 'bg-amber-100 text-amber-800'
                        : item.type === 'loss'
                        ? 'bg-rose-100 text-rose-800'
                        : item.type === 'downtime'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.type === 'overproduction' && <TrendingUp className="w-4 h-4" />}
                    {item.type === 'loss' && <Scale className="w-4 h-4" />}
                    {item.type === 'downtime' && <Clock className="w-4 h-4" />}
                    {item.type === 'energy' && <Zap className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                    <div className="text-[11px] text-slate-500">{item.trend}</div>
                  </div>
                </div>

                <span
                  className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                    item.type === 'loss'
                      ? 'bg-rose-100 text-rose-900'
                      : item.type === 'overproduction'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {item.metric}
                </span>
              </div>

              <p className="text-xs text-slate-700 font-medium mt-3 leading-relaxed">
                “{item.description}”
              </p>

              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  AI Actionable Recommendation
                </div>
                <div className="text-slate-800 mt-1 font-medium leading-relaxed">
                  {item.recommendation}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Data derived from Prediction + IoT telemetry
                </span>
                <button
                  type="button"
                  id={`apply-insight-btn-${item.id}`}
                  onClick={() => handleApply(item.id)}
                  disabled={isResolved}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    isResolved
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isResolved ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Rule Enforced</span>
                    </>
                  ) : (
                    <>
                      <span>Apply Standard</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* SIMPLE VARIANCE & EFFICIENCY COMPARISON CHART */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900">
            Baseline vs. Anomaly Variance Metrics
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Visualizing kitchen operations compared to optimal target standards.
          </p>
        </div>

        <div className="space-y-4 mt-5">
          {varianceComparisons.map((bar) => (
            <div key={bar.label} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">{bar.label}</span>
                <span className="font-bold text-slate-900">{bar.diff} from standard</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-slate-300 rounded-full"
                  style={{ width: `${Math.min(100, bar.baseline)}%` }}
                  title="Standard baseline"
                />
                <div
                  className="h-full opacity-80"
                  style={{
                    backgroundColor: bar.color,
                    width: `${Math.max(10, Math.min(30, bar.actual - bar.baseline + 15))}%`
                  }}
                  title="Variance detected"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
          <span>Target Food Production Standard: HACCP & Lean Kitchen ISO 22000</span>
          <span className="font-bold text-emerald-700">+11% potential yield recovery</span>
        </div>
      </div>
    </div>
  );
};
