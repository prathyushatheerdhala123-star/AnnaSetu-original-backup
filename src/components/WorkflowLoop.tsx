import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Activity,
  ScanLine,
  Truck,
  BarChart3,
  Sparkles,
  ArrowRight,
  Repeat
} from 'lucide-react';
import { NavigationTab } from '../types';

interface WorkflowLoopProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  activeStageNumber?: number;
}

interface WorkflowStep {
  num: number;
  id: NavigationTab;
  name: string;
  subtitle: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badgeBg: string;
  borderColor: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    num: 1,
    id: 'predict',
    name: '1. PREDICT',
    subtitle: 'Demand & Surplus AI',
    desc: 'Forecast demand using historical data, weather and events.',
    icon: TrendingUp,
    color: 'text-blue-600',
    badgeBg: 'bg-blue-50',
    borderColor: 'border-blue-200 hover:border-blue-400'
  },
  {
    num: 2,
    id: 'predict',
    name: '2. PREVENT',
    subtitle: 'Smart Planning',
    desc: 'Optimize procurement and production to avoid overproduction.',
    icon: ShieldCheck,
    color: 'text-emerald-600',
    badgeBg: 'bg-emerald-50',
    borderColor: 'border-emerald-200 hover:border-emerald-400'
  },
  {
    num: 3,
    id: 'monitor',
    name: '3. MONITOR',
    subtitle: 'IoT Sensors',
    desc: 'Track temperature, humidity, vibration and power in real time.',
    icon: Activity,
    color: 'text-cyan-600',
    badgeBg: 'bg-cyan-50',
    borderColor: 'border-cyan-200 hover:border-cyan-400'
  },
  {
    num: 4,
    id: 'detect',
    name: '4. DETECT',
    subtitle: 'Expiry & Quality Detection',
    desc: 'Use barcode + OCR and computer vision to flag at-risk food.',
    icon: ScanLine,
    color: 'text-amber-600',
    badgeBg: 'bg-amber-50',
    borderColor: 'border-amber-200 hover:border-amber-400'
  },
  {
    num: 5,
    id: 'redistribute',
    name: '5. REDISTRIBUTE',
    subtitle: 'Surplus Matching & Logistics',
    desc: 'Match safe surplus with nearby recipient nodes.',
    icon: Truck,
    color: 'text-teal-600',
    badgeBg: 'bg-teal-50',
    borderColor: 'border-teal-200 hover:border-teal-400'
  },
  {
    num: 6,
    id: 'sustainability',
    name: '6. MEASURE',
    subtitle: 'Sustainability Dashboard',
    desc: 'Track food saved, CO₂e avoided and meals redistributed.',
    icon: BarChart3,
    color: 'text-indigo-600',
    badgeBg: 'bg-indigo-50',
    borderColor: 'border-indigo-200 hover:border-indigo-400'
  },
  {
    num: 7,
    id: 'learn',
    name: '7. LEARN',
    subtitle: 'AI Continuous Improvement',
    desc: 'Use actual outcomes and feedback to improve future predictions.',
    icon: Sparkles,
    color: 'text-violet-600',
    badgeBg: 'bg-violet-50',
    borderColor: 'border-violet-200 hover:border-violet-400'
  }
];

export const WorkflowLoop: React.FC<WorkflowLoopProps> = ({
  currentTab,
  onSelectTab,
  activeStageNumber
}) => {
  return (
    <div id="closed-loop-workflow-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Repeat className="w-3.5 h-3.5" />
              Closed-Loop Workflow
            </span>
            <span className="text-xs text-slate-500 font-medium">Core Innovation</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-1">
            The Continuous Predict-to-Learn Ecosystem
          </h2>
        </div>
        <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60 max-w-sm">
          Instead of just logging waste after it happens, Annasetu anticipates, protects, and continuously learns.
        </div>
      </div>

      {/* 7 Horizontal Workflow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5 lg:gap-3">
        {WORKFLOW_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCurrentTab = currentTab === step.id;
          const isHighlighted = activeStageNumber === step.num;

          return (
            <div key={step.num} className="relative flex flex-col">
              <button
                type="button"
                id={`workflow-step-${step.num}`}
                onClick={() => onSelectTab(step.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between h-full group ${
                  isHighlighted
                    ? 'ring-2 ring-emerald-500 bg-emerald-50/50 border-emerald-300 shadow-md scale-[1.02]'
                    : isCurrentTab
                    ? 'bg-slate-50/90 border-slate-300 shadow-sm'
                    : `bg-white ${step.borderColor}`
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-7 h-7 rounded-lg ${step.badgeBg} ${step.color} flex items-center justify-center font-bold text-xs`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 group-hover:text-slate-700">
                      #{step.num}
                    </span>
                  </div>
                  <div className="font-bold text-xs tracking-wide text-slate-900 uppercase">
                    {step.name}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600 mt-0.5 leading-tight">
                    {step.subtitle}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                    “{step.desc}”
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-400 group-hover:text-emerald-700">
                  <span>Explore module</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>

              {/* Arrow divider for larger screens (between cards) */}
              {idx < WORKFLOW_STEPS.length - 1 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-slate-100 border border-slate-200 items-center justify-center text-slate-400 pointer-events-none">
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prominent Feedback Loop Banner */}
      <div className="mt-5 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Repeat className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Feedback Loop</span>
              <span className="text-emerald-700">→</span>
              <span className="text-emerald-800">Improves the Next Prediction</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Actual meal demand, leftover yields, and consumption variances automatically calibrate tomorrow's forecast weights.
            </p>
          </div>
        </div>
        <button
          type="button"
          id="view-feedback-loop-button"
          onClick={() => onSelectTab('learn')}
          className="shrink-0 px-3.5 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100/90 hover:bg-emerald-200 rounded-lg transition-colors border border-emerald-300 flex items-center gap-1.5"
        >
          <span>View Calibration Engine</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
