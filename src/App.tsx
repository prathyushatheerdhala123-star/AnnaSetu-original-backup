/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Menu,
  X,
  Repeat,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  NavigationTab,
  KitchenUnit,
  KpiMetrics,
  TodayStatus,
  SensorData,
  SensorAlert,
  AtRiskFoodItem,
  RecipientNode,
  OperationalInsight
} from './types';
import {
  KITCHEN_UNITS,
  INITIAL_KPIS,
  INITIAL_TODAY_STATUS,
  INITIAL_SENSORS,
  INITIAL_SENSOR_ALERTS,
  INITIAL_AT_RISK_FOOD,
  INITIAL_RECIPIENTS,
  INITIAL_INSIGHTS
} from './mockData';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { PredictView } from './components/PredictView';
import { MonitorView } from './components/MonitorView';
import { DetectView } from './components/DetectView';
import { RedistributeView } from './components/RedistributeView';
import { InsightsView } from './components/InsightsView';
import { SustainabilityView } from './components/SustainabilityView';
import { LearnView } from './components/LearnView';
import { DemoController } from './components/DemoController';
import { GeminiChatbox } from './components/GeminiChatbox';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Kitchen Unit State
  const [selectedKitchen, setSelectedKitchen] = useState<KitchenUnit>(KITCHEN_UNITS[0]);

  // Operational State
  const [kpis, setKpis] = useState<KpiMetrics>(INITIAL_KPIS);
  const [todayStatus, setTodayStatus] = useState<TodayStatus>(INITIAL_TODAY_STATUS);
  const [sensors, setSensors] = useState<SensorData[]>(INITIAL_SENSORS);
  const [sensorAlerts, setSensorAlerts] = useState<SensorAlert[]>(INITIAL_SENSOR_ALERTS);
  const [atRiskFood, setAtRiskFood] = useState<AtRiskFoodItem[]>(INITIAL_AT_RISK_FOOD);
  const [recipients, setRecipients] = useState<RecipientNode[]>(INITIAL_RECIPIENTS);
  const [insights, setInsights] = useState<OperationalInsight[]>(INITIAL_INSIGHTS);

  // Demo Walkthrough Mode State
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [activeStageNumber, setActiveStageNumber] = useState<number>(1);

  // Handlers
  const handleUpdatePrediction = (newPredicted: number, newProduction: number) => {
    const surplus = Math.max(0, newProduction - newPredicted + 30);
    setTodayStatus((prev) => ({
      ...prev,
      predictedMeals: newPredicted,
      actualMealsProduced: newProduction,
      surplusDetectedMeals: surplus,
      lastUpdated: 'Adjusted by Kitchen Manager just now'
    }));

    // Update KPIs to reflect manager intervention
    setKpis((prev) => ({
      ...prev,
      costSavedInr: prev.costSavedInr + 9800,
      foodWastePreventedKg: prev.foodWastePreventedKg + 15
    }));
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setSensorAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
  };

  const handleAddAtRiskFood = (newItem: AtRiskFoodItem) => {
    setAtRiskFood((prev) => [newItem, ...prev]);
    setTodayStatus((prev) => ({
      ...prev,
      itemsRequiringAttention: prev.itemsRequiringAttention + 1
    }));
  };

  const handleResolveFoodItem = (itemId: string, actionType: string) => {
    setAtRiskFood((prev) => prev.filter((item) => item.id !== itemId));
    setTodayStatus((prev) => ({
      ...prev,
      itemsRequiringAttention: Math.max(0, prev.itemsRequiringAttention - 1)
    }));
  };

  const handleDispatchRecipient = (recipientId: string) => {
    setRecipients((prev) =>
      prev.map((r) =>
        r.id === recipientId
          ? { ...r, status: 'En Route' }
          : r
      )
    );

    const dispatchedMeals = todayStatus.surplusDetectedMeals;

    // Update today status and KPIs
    setTodayStatus((prev) => ({
      ...prev,
      redistributionStatus: 'Dispatched',
      surplusDetectedMeals: 0
    }));

    setKpis((prev) => ({
      ...prev,
      surplusMealsRedistributed: prev.surplusMealsRedistributed + dispatchedMeals,
      co2eAvoidedKg: prev.co2eAvoidedKg + Math.round(dispatchedMeals * 1.8),
      foodWastePreventedKg: prev.foodWastePreventedKg + Math.round(dispatchedMeals * 0.45)
    }));
  };

  const unreadAlerts = sensorAlerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 selection:bg-emerald-200">
      {/* Top Header */}
      <Header
        kitchens={KITCHEN_UNITS}
        selectedKitchen={selectedKitchen}
        onSelectKitchen={setSelectedKitchen}
        isDemoActive={isDemoActive}
        onToggleDemo={() => setIsDemoActive(!isDemoActive)}
        notificationCount={unreadAlerts + (atRiskFood.length > 0 ? 1 : 0)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Mobile Navigation Toggle Bar */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
        >
          {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Ecosystem Navigation</span>
        </button>

        <span className="text-xs font-extrabold text-emerald-700 capitalize">
          {currentTab === 'dashboard' ? 'Overview' : currentTab}
        </span>
      </div>

      {/* Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            currentTab={currentTab}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            unreadAlertCount={unreadAlerts}
            atRiskCount={atRiskFood.length}
            surplusMeals={todayStatus.surplusDetectedMeals}
          />
        </div>

        {/* Mobile Slide-Over Sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-slate-900/50 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full shadow-2xl overflow-y-auto">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">Annasetu Modules</span>
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Sidebar
                currentTab={currentTab}
                onSelectTab={(tab) => {
                  setCurrentTab(tab);
                  setIsMobileSidebarOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                unreadAlertCount={unreadAlerts}
                atRiskCount={atRiskFood.length}
                surplusMeals={todayStatus.surplusDetectedMeals}
              />
            </div>
            <div
              className="flex-1"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 pb-24">
          {currentTab === 'dashboard' && (
            <DashboardView
              kpis={kpis}
              todayStatus={todayStatus}
              atRiskFood={atRiskFood}
              sensorAlerts={sensorAlerts}
              onNavigate={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenDemo={() => setIsDemoActive(true)}
            />
          )}

          {currentTab === 'predict' && (
            <PredictView
              todayStatus={todayStatus}
              onUpdatePrediction={handleUpdatePrediction}
            />
          )}

          {currentTab === 'monitor' && (
            <MonitorView
              sensors={sensors}
              alerts={sensorAlerts}
              onAcknowledgeAlert={handleAcknowledgeAlert}
            />
          )}

          {currentTab === 'detect' && (
            <DetectView
              items={atRiskFood}
              onAddItem={handleAddAtRiskFood}
              onResolveItem={handleResolveFoodItem}
            />
          )}

          {currentTab === 'redistribute' && (
            <RedistributeView
              surplusMeals={todayStatus.surplusDetectedMeals}
              recipients={recipients}
              onDispatchRecipient={handleDispatchRecipient}
            />
          )}

          {currentTab === 'insights' && (
            <InsightsView
              insights={insights}
            />
          )}

          {currentTab === 'sustainability' && (
            <SustainabilityView
              kpis={kpis}
            />
          )}

          {currentTab === 'learn' && (
            <LearnView />
          )}
        </main>
      </div>

      {/* Interactive Hackathon Demo Controller (Floating Dock) */}
      <DemoController
        isOpen={isDemoActive}
        onClose={() => setIsDemoActive(false)}
        onNavigateToTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onHighlightStage={setActiveStageNumber}
      />

      {/* Annapurna Gemini AI Kitchen Assistant Chatbox */}
      <GeminiChatbox
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onNavigateToTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
