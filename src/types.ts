export type NavigationTab =
  | 'dashboard'
  | 'predict'
  | 'monitor'
  | 'detect'
  | 'redistribute'
  | 'insights'
  | 'sustainability'
  | 'learn';

export interface KitchenUnit {
  id: string;
  name: string;
  location: string;
  type: string;
  dailyCapacity: number;
}

export interface KpiMetrics {
  foodWastePreventedKg: number;
  foodWastePreventedTrend: string;
  surplusMealsRedistributed: number;
  surplusMealsTrend: string;
  co2eAvoidedKg: number;
  co2eAvoidedTrend: string;
  costSavedInr: number;
  costSavedTrend: string;
}

export interface TodayStatus {
  predictedMeals: number;
  actualMealsProduced: number;
  surplusDetectedMeals: number;
  itemsRequiringAttention: number;
  redistributionStatus: 'Pending' | 'Matching' | 'Dispatched' | 'Completed';
  lastUpdated: string;
}

export interface HistoricalDemandPoint {
  day: string;
  historical: number;
  predicted: number;
  actual?: number;
}

export interface SensorData {
  id: string;
  name: string;
  type: 'temperature' | 'humidity' | 'power' | 'vibration';
  value: string;
  numericValue: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  threshold: string;
  lastReading: string;
}

export interface SensorAlert {
  id: string;
  sensorId: string;
  title: string;
  message: string;
  severity: 'warning' | 'critical';
  time: string;
  duration: string;
  acknowledged: boolean;
}

export interface AtRiskFoodItem {
  id: string;
  name: string;
  category: 'Dairy' | 'Produce' | 'Prepared Food' | 'Bakery' | 'Meat & Poultry';
  quantity: string;
  expiry: string;
  condition: string;
  risk: 'Low' | 'Medium' | 'High';
  action: string;
  barcode?: string;
  qrPayload?: string;
  fssaiLic?: string;
  batchNumber?: string;
  estimatedValueInr?: number;
  scannedAt?: string;
  cvNotes?: string;
}

export interface RecipientNode {
  id: string;
  name: string;
  address: string;
  city: string;
  type: 'Community' | 'Faith-Based' | 'Shelter / NGO' | 'Labor Support';
  distanceKm: number;
  capacityMeals: number;
  status: 'Available' | 'Full' | 'Notified' | 'En Route' | 'Delivered';
  contactPerson: string;
  phone: string;
  estimatedArrivalMin: number;
  urgencyFitScore: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: 'gemini-3.8-flash' | 'fallback';
}

export interface OperationalInsight {
  id: string;
  title: string;
  metric: string;
  trend: string;
  type: 'overproduction' | 'loss' | 'downtime' | 'energy';
  description: string;
  severity: 'info' | 'warning' | 'critical';
  recommendation: string;
}

export interface LearnRecord {
  day: string;
  date: string;
  predicted: number;
  actual: number;
  variance: number;
  aiAdjustment: string;
  confidence: number;
}

export interface DemoStep {
  stepNumber: number;
  title: string;
  stageName: string;
  tab: NavigationTab;
  description: string;
  highlightText: string;
  durationMs: number;
}
