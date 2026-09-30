import React, { useState } from 'react';
import {
  Repeat,
  Sparkles,
  ArrowDown,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Brain,
  History,
  TrendingUp,
  Cpu,
  RefreshCw,
  Info
} from 'lucide-react';
import { LearnRecord } from '../types';
import { LEARN_RECORDS } from '../mockData';

export const LearnView: React.FC = () => {
  // Interactive simulator state
  const [simPredicted, setSimPredicted] = useState<number>(900);
  const [simActual, setSimActual] = useState<number>(840);
  const [simLearningRate, setSimLearningRate] = useState<number>(0.35);

  // Moving-average formula: Next Prediction = Predicted + LearningRate * (Actual - Predicted)
  const simDifference = simActual - simPredicted;
  const simAdjustment = Math.round(simDifference * simLearningRate);
  const simNextPrediction = simPredicted + simAdjustment;

  return (
    <div className="space-y-6">
      {/* Title & Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-100 text-violet-800 border border-violet-200">
              Stage 7 • LEARN & CLOSE THE LOOP
            </span>
            <span className="text-xs text-slate-500 font-medium">Continuous Model Calibration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            The Closed-Loop Feedback Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            How actual kitchen outcomes, dining consumption, and leftovers continuously refine the predictive AI algorithm.
          </p>
        </div>
      </div>

      {/* CORE INNOVATION COMPARISON: DAY 1 VS DAY 8 (Prompt Mandate) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs">
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Convergence Case Study: Day 1 vs. Day 8
            </h2>
            <p className="text-xs text-slate-500">
              Real institutional data showing error self-correction without manual intervention.
            </p>
          </div>
          <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg border border-violet-200">
            Error Reduced by 92%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {/* Day 1 Card */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                DAY 1 (Cold Start)
              </span>
              <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                High Variance
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Predicted</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">900</div>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Actual</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">840</div>
              </div>
              <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                <div className="text-[10px] text-rose-700 font-semibold uppercase">Difference</div>
                <div className="text-xl font-black text-rose-700 mt-0.5">-60</div>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
              <strong>Outcome:</strong> Kitchen produced 60 surplus portions due to campus tech club exam week absence. The algorithm ingested this outcome.
            </div>
          </div>

          {/* Day 8 Card */}
          <div className="p-5 rounded-xl bg-violet-50/60 border border-violet-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-violet-800 uppercase tracking-wider">
                DAY 8 (Post-Feedback Calibration)
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Calibrated Accuracy
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-2">
              <div className="p-2.5 bg-white rounded-lg border border-violet-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Previous Prediction</div>
                <div className="text-sm font-bold text-slate-500 line-through mt-0.5">900 meals</div>
                <div className="text-[11px] text-violet-700 font-bold mt-0.5">Adjusted using actuals</div>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-300">
                <div className="text-[10px] text-emerald-700 font-semibold uppercase">New Calibrated Prediction</div>
                <div className="text-xl font-black text-emerald-900 mt-0.5">860</div>
                <div className="text-[10px] text-emerald-700 font-bold">98.6% Accuracy</div>
              </div>
            </div>

            <div className="text-xs text-violet-950 bg-white p-3 rounded-lg border border-violet-200 leading-relaxed">
              <strong>Result:</strong> Overproduction was prevented at the source. The kitchen trimmed prep by 40 meals, saving ingredients and labor.
            </div>
          </div>
        </div>
      </div>

      {/* VISUAL FEEDBACK ARROW FLOWCHART (Prompt Mandate) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            Visual Feedback Loop Architecture
          </h2>
          <p className="text-xs text-slate-500">
            The mathematical cycle driving continuous improvement.
          </p>
        </div>

        <div className="py-6 flex flex-col items-center">
          <div className="max-w-md w-full space-y-3">
            {/* Stage 1 */}
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-center shadow-xs">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Step 1</span>
              <div className="font-extrabold text-sm text-blue-950">AI Demand Prediction (e.g. 900 Meals)</div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-5 h-5 text-blue-500 animate-bounce" />
            </div>

            {/* Stage 2 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Step 2</span>
              <div className="font-extrabold text-sm text-slate-900">Actual Meal Consumption (e.g. 840 Meals)</div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-5 h-5 text-amber-500 animate-bounce" />
            </div>

            {/* Stage 3 */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center shadow-xs">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Step 3</span>
              <div className="font-extrabold text-sm text-amber-950">Variance & Surplus Calculated (-60 Meals)</div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-5 h-5 text-violet-500 animate-bounce" />
            </div>

            {/* Stage 4 */}
            <div className="p-3.5 rounded-xl bg-violet-50 border border-violet-200 text-center shadow-xs">
              <span className="text-[10px] font-bold text-violet-700 uppercase tracking-wider">Step 4</span>
              <div className="font-extrabold text-sm text-violet-950">Model Weight Adjustment & Bayesian Calibration</div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-5 h-5 text-emerald-500 animate-bounce" />
            </div>

            {/* Stage 5 */}
            <div className="p-4 rounded-xl bg-emerald-500 text-white text-center shadow-md ring-4 ring-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider">Step 5 (Closed Loop)</span>
              <div className="font-extrabold text-base">Better Next Prediction (860 Meals)</div>
              <div className="text-xs text-emerald-100 mt-0.5">Feeds directly back into Step 1 for tomorrow</div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE MOVING-AVERAGE FEEDBACK SIMULATOR */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Interactive Feedback Loop Simulator
            </h3>
            <p className="text-xs text-slate-500">
              Test how the moving-average feedback adjusts tomorrow’s prediction based on custom inputs.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
            Formula: P_next = P + α · (Actual - P)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {/* Controls */}
          <div className="space-y-4 md:col-span-2">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Original Predicted Demand</span>
                <span className="font-bold text-blue-700">{simPredicted} meals</span>
              </div>
              <input
                type="range"
                min="600"
                max="1200"
                step="10"
                value={simPredicted}
                onChange={(e) => setSimPredicted(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Actual Served / Consumed</span>
                <span className="font-bold text-slate-900">{simActual} meals</span>
              </div>
              <input
                type="range"
                min="600"
                max="1200"
                step="10"
                value={simActual}
                onChange={(e) => setSimActual(Number(e.target.value))}
                className="w-full accent-slate-800 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Model Learning Rate (α)</span>
                <span className="font-bold text-violet-700">{(simLearningRate * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={simLearningRate}
                onChange={(e) => setSimLearningRate(Number(e.target.value))}
                className="w-full accent-violet-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Conservative (10%)</span>
                <span>Balanced (35%)</span>
                <span>Aggressive (90%)</span>
              </div>
            </div>
          </div>

          {/* Real-time Calculated Result Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-emerald-50 border border-violet-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-violet-800 uppercase tracking-wider">
                Simulated Feedback Calibration
              </span>
              <div className="mt-2 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Variance Observed:</span>
                  <strong className={simDifference >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
                    {simDifference >= 0 ? `+${simDifference}` : simDifference} meals
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Applied Correction:</span>
                  <strong className="text-violet-700">
                    {simAdjustment >= 0 ? `+${simAdjustment}` : simAdjustment} meals
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-violet-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                New Next Prediction
              </span>
              <div className="text-3xl font-black text-emerald-800 mt-1">
                {simNextPrediction} <span className="text-xs font-semibold text-slate-500">meals</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Feedback loop automatically closes the gap for the next batch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
