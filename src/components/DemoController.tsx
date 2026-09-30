import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  X,
  Repeat,
  CheckCircle2
} from 'lucide-react';
import { NavigationTab, DemoStep } from '../types';
import { DEMO_STEPS } from '../mockData';

interface DemoControllerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: NavigationTab) => void;
  onHighlightStage?: (stageNumber: number) => void;
}

export const DemoController: React.FC<DemoControllerProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  onHighlightStage
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const step = DEMO_STEPS[currentStepIndex];

  // Auto-advance timer when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStepIndex < DEMO_STEPS.length - 1) {
        goToStep(currentStepIndex + 1);
      } else {
        // Paused at final step
        setIsPlaying(false);
      }
    }, step.durationMs);

    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentStepIndex, step]);

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
    const targetStep = DEMO_STEPS[index];
    onNavigateToTab(targetStep.tab);
    if (onHighlightStage) {
      onHighlightStage(targetStep.stepNumber);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="demo-controller-floating-bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-950/95 backdrop-blur-md text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-emerald-500/40 ring-4 ring-emerald-500/10">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs">
              {step.stepNumber}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold">
                Live Hackathon Demo Mode • Stage {step.stepNumber} of 7
              </span>
              <h4 className="text-sm font-bold text-white tracking-tight">{step.title}</h4>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Step badges */}
            <div className="hidden sm:flex items-center gap-1 mr-2">
              {DEMO_STEPS.map((s, idx) => (
                <button
                  key={s.stepNumber}
                  type="button"
                  onClick={() => goToStep(idx)}
                  className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                    idx === currentStepIndex
                      ? 'bg-emerald-500 text-slate-950 scale-110 ring-2 ring-emerald-300'
                      : idx < currentStepIndex
                      ? 'bg-slate-800 text-emerald-400'
                      : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                  }`}
                  title={s.title}
                >
                  {s.stepNumber}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Exit Demo Mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step description and highlight callout */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1 max-w-xl">
            <p className="text-slate-300 text-[12px] leading-relaxed">
              {step.description}
            </p>
            <div className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/20">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{step.highlightText}</span>
            </div>
          </div>

          {/* Controls: Prev, Play/Pause, Next, Reset */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={() => goToStep(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Auto-Play</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => goToStep(Math.min(DEMO_STEPS.length - 1, currentStepIndex + 1))}
              disabled={currentStepIndex === DEMO_STEPS.length - 1}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              aria-label="Next step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => goToStep(0)}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors"
              title="Restart Demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
