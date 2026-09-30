import React, { useState } from 'react';
import {
  TrendingUp,
  CloudRain,
  Calendar,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';
import { HistoricalDemandPoint, TodayStatus } from '../types';
import { HISTORICAL_DEMAND } from '../mockData';

interface PredictViewProps {
  todayStatus: TodayStatus;
  onUpdatePrediction: (newPredicted: number, newProduction: number) => void;
}

export const PredictView: React.FC<PredictViewProps> = ({
  todayStatus,
  onUpdatePrediction
}) => {
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustedValue, setAdjustedValue] = useState<number>(todayStatus.predictedMeals);
  const [plannedProductionValue, setPlannedProductionValue] = useState<number>(todayStatus.actualMealsProduced);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState<'daily' | 'mealShift'>('daily');

  const confidence = 87;
  const weather = {
    temp: '22°C',
    condition: 'Scattered Showers',
    rainProbability: '65%',
    icon: CloudRain
  };
  const event = {
    title: 'University Tech Fest & Alumni Gathering',
    impact: '+12% expected lunch attendance',
    type: 'Campus Event'
  };

  const handleSaveAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePrediction(adjustedValue, plannedProductionValue);
    setFeedbackSuccess(true);
    setTimeout(() => {
      setIsAdjustModalOpen(false);
      setFeedbackSuccess(false);
    }, 1800);
  };

  const calculatedSurplus = Math.max(0, plannedProductionValue - adjustedValue + 30);

  return (
    <div className="space-y-6">
      {/* Top Title & Explanation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              Stage 1 & 2 • Predict & Prevent
            </span>
            <span className="text-xs text-slate-500 font-medium">Demand & Surplus AI</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            AI Demand Prediction & Production Sizing
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Forecast customer demand using historical intake, meteorological forecasts, and scheduled events to prevent kitchen overproduction.
          </p>
        </div>

        <button
          type="button"
          id="adjust-prediction-main-btn"
          onClick={() => setIsAdjustModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Adjust Prediction</span>
        </button>
      </div>

      {/* Weather, Date & Event Context Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date & Day */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Production Date</div>
            <div className="text-sm font-bold text-slate-900">Wednesday, Sep 17</div>
            <div className="text-[11px] text-slate-500">Day 8 of Continuous Cycle</div>
          </div>
        </div>

        {/* Meteorological Forecast */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Weather Dampener</div>
            <div className="text-sm font-bold text-slate-900">
              {weather.temp} • {weather.condition}
            </div>
            <div className="text-[11px] text-slate-500">
              Rain chance: {weather.rainProbability} (reduces walk-ins ~4%)
            </div>
          </div>
        </div>

        {/* Event Indicator */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Event / Festival Indicator</div>
            <div className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{event.title}</div>
            <div className="text-[11px] text-amber-700 font-medium">{event.impact}</div>
          </div>
        </div>
      </div>

      {/* PRIMARY PREDICTION METRICS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Target Meal Forecast & Safety Buffer
            </h2>
            <p className="text-xs text-slate-500">
              Optimized procurement batch size for IIT Delhi Dining Mess.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Model Confidence:</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {confidence}% High
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
              Predicted Demand
            </div>
            <div className="text-3xl font-extrabold text-blue-950 mt-1">
              {todayStatus.predictedMeals}
            </div>
            <div className="text-xs text-blue-700 mt-1 font-medium">
              Forecasted diner consumption
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Expected Production
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">
              {todayStatus.actualMealsProduced}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Planned kitchen preparation
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
              Expected Surplus
            </div>
            <div className="text-3xl font-extrabold text-amber-900 mt-1">
              {todayStatus.surplusDetectedMeals} <span className="text-sm font-semibold">meals</span>
            </div>
            <div className="text-xs text-amber-800 mt-1 font-medium">
              Pre-allocated for redistribution
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
              Waste Prevented by Plan
            </div>
            <div className="text-3xl font-extrabold text-emerald-900 mt-1">
              -45 <span className="text-sm font-semibold">kg</span>
            </div>
            <div className="text-xs text-emerald-800 mt-1 font-medium">
              Averted before cooking
            </div>
          </div>
        </div>
      </div>

      {/* HISTORICAL DEMAND VS PREDICTED DEMAND CHART */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Historical Demand vs. AI Predicted Demand
            </h3>
            <p className="text-xs text-slate-500">
              Visualizing the narrowing variance gap over 7 daily meal shifts.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="text-slate-600">Historical Avg</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-blue-800">AI Predicted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-emerald-800">Actual Consumed</span>
            </div>
          </div>
        </div>

        {/* Custom SVG Responsive Chart */}
        <div className="mt-6">
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Background Grid Lines */}
              {[600, 700, 800, 900, 1000].map((val, i) => {
                const y = 220 - ((val - 600) / 400) * 190;
                return (
                  <g key={val}>
                    <line x1="40" y1={y} x2="680" y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="32" y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontFamily="sans-serif">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Bars: Historical Baseline */}
              {HISTORICAL_DEMAND.map((d, idx) => {
                const x = 70 + idx * 88;
                const barH = ((d.historical - 600) / 400) * 190;
                const y = 220 - barH;
                return (
                  <rect
                    key={d.day}
                    x={x - 14}
                    y={y}
                    width="28"
                    height={barH}
                    rx="4"
                    fill="#e2e8f0"
                    className="hover:fill-slate-300 transition-colors"
                  />
                );
              })}

              {/* Area & Line for Predicted */}
              <path
                d={`M 70 ${220 - ((HISTORICAL_DEMAND[0].predicted - 600) / 400) * 190} ` +
                  HISTORICAL_DEMAND.map((d, idx) => `L ${70 + idx * 88} ${220 - ((d.predicted - 600) / 400) * 190}`).join(' ') +
                  ` L ${70 + (HISTORICAL_DEMAND.length - 1) * 88} 220 L 70 220 Z`}
                fill="url(#predictedGrad)"
              />
              <path
                d={`M 70 ${220 - ((HISTORICAL_DEMAND[0].predicted - 600) / 400) * 190} ` +
                  HISTORICAL_DEMAND.map((d, idx) => `L ${70 + idx * 88} ${220 - ((d.predicted - 600) / 400) * 190}`).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Dots and Values for Predicted */}
              {HISTORICAL_DEMAND.map((d, idx) => {
                const x = 70 + idx * 88;
                const y = 220 - ((d.predicted - 600) / 400) * 190;
                return (
                  <g key={`dot-${d.day}`}>
                    <circle cx={x} cy={y} r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                    <text x={x} y={y - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e3a8a">
                      {d.predicted}
                    </text>
                  </g>
                );
              })}

              {/* Actual Outcome Line (Green) */}
              <path
                d={`M 70 ${220 - (((HISTORICAL_DEMAND[0].actual ?? 880) - 600) / 400) * 190} ` +
                  HISTORICAL_DEMAND.map((d, idx) => `L ${70 + idx * 88} ${220 - (((d.actual ?? d.predicted) - 600) / 400) * 190}`).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />

              {/* X Axis Day Labels */}
              {HISTORICAL_DEMAND.map((d, idx) => {
                const x = 70 + idx * 88;
                return (
                  <text key={`lbl-${d.day}`} x={x} y="238" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">
                    {d.day}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="mt-6 p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 flex items-start gap-3 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <div className="leading-relaxed">
            <span className="font-bold">Automated Closed-Loop Convergence:</span> Notice how the variance between predicted (blue) and actual demand (green dashed) narrowed from 60 meals on Monday to just 5-10 meals over the week. The feedback engine continuously updates the rolling demand model.
          </div>
        </div>
      </div>

      {/* ADJUST PREDICTION MODAL */}
      {isAdjustModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Manager Prediction Adjustment</h3>
                  <p className="text-[11px] text-slate-500">Fine-tune today's batch production quantity</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdjustModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAdjustment} className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Predicted Diner Demand</span>
                  <span className="font-bold text-blue-700">{adjustedValue} meals</span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="1200"
                  step="10"
                  value={adjustedValue}
                  onChange={(e) => setAdjustedValue(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>600 (Low)</span>
                  <span>Baseline: 920</span>
                  <span>1,200 (Peak)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Planned Production Batch (Kitchen Output)</span>
                  <span className="font-bold text-emerald-700">{plannedProductionValue} meals</span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="1200"
                  step="10"
                  value={plannedProductionValue}
                  onChange={(e) => setPlannedProductionValue(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Dynamic Surplus calculation */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <span className="text-slate-600">Calculated Expected Surplus:</span>
                <span className="font-extrabold text-amber-700">
                  {calculatedSurplus} meals
                </span>
              </div>

              {/* Core User Request Mandate Callout */}
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-emerald-900">
                  <div className="font-bold">“Your correction will improve future predictions.”</div>
                  <div className="text-[11px] text-emerald-800 mt-0.5">
                    Annasetu weights manager overrides into the Bayesian prior for subsequent Wednesday shifts.
                  </div>
                </div>
              </div>

              {feedbackSuccess && (
                <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Prediction updated! Feedback loop recorded adjustment.</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdjustModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="confirm-prediction-adjustment-btn"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <span>Apply & Train Feedback</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
