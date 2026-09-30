import {
  KitchenUnit,
  KpiMetrics,
  TodayStatus,
  HistoricalDemandPoint,
  SensorData,
  SensorAlert,
  AtRiskFoodItem,
  RecipientNode,
  OperationalInsight,
  LearnRecord,
  DemoStep
} from './types';

export const KITCHEN_UNITS: KitchenUnit[] = [
  {
    id: 'k-1',
    name: 'Akshaya Patra Mega Kitchen — Bengaluru Hub',
    location: 'Peenya Industrial Area, Bengaluru, Karnataka 560058',
    type: 'Institutional Mid-Day Meal & Central Hub',
    dailyCapacity: 25000
  },
  {
    id: 'k-2',
    name: 'IIT Delhi Central Dining Hall & Hostel Mess',
    location: 'Nilgiri & Aravali Mess, Hauz Khas, New Delhi 110016',
    type: 'Higher Ed Student & Faculty Dining',
    dailyCapacity: 3200
  },
  {
    id: 'k-3',
    name: 'ISKCON Food for Life — South Delhi Mega Kitchen',
    location: 'Hare Krishna Hill, East of Kailash, New Delhi 110065',
    type: 'Community Relief & Langar Seva',
    dailyCapacity: 6500
  },
  {
    id: 'k-4',
    name: 'Tata Memorial Hospital Dietary Kitchen — Parel',
    location: 'Dr. E Borges Road, Parel, Mumbai, Maharashtra 400012',
    type: 'Healthcare Clinical Nutrition & Staff Mess',
    dailyCapacity: 2200
  }
];

export const INITIAL_KPIS: KpiMetrics = {
  foodWastePreventedKg: 128,
  foodWastePreventedTrend: '+18.4% vs last week',
  surplusMealsRedistributed: 340,
  surplusMealsTrend: '+42 meals today',
  co2eAvoidedKg: 320,
  co2eAvoidedTrend: 'Estimated ~715 km vehicle emission equivalent',
  costSavedInr: 152400,
  costSavedTrend: 'Est. raw ingredient savings (₹1.52 Lakh)'
};

export const INITIAL_TODAY_STATUS: TodayStatus = {
  predictedMeals: 920,
  actualMealsProduced: 890,
  surplusDetectedMeals: 30,
  itemsRequiringAttention: 3,
  redistributionStatus: 'Matching',
  lastUpdated: 'Updated 4 mins ago (Auto-synced via FSSAI Gateway)'
};

export const HISTORICAL_DEMAND: HistoricalDemandPoint[] = [
  { day: 'Mon', historical: 880, predicted: 890, actual: 885 },
  { day: 'Tue', historical: 910, predicted: 905, actual: 912 },
  { day: 'Wed', historical: 870, predicted: 865, actual: 860 },
  { day: 'Thu', historical: 940, predicted: 930, actual: 925 },
  { day: 'Fri', historical: 990, predicted: 975, actual: 980 },
  { day: 'Sat', historical: 720, predicted: 740, actual: 735 },
  { day: 'Sun (Today)', historical: 890, predicted: 920, actual: 890 }
];

export const INITIAL_SENSORS: SensorData[] = [
  {
    id: 'sens-temp',
    name: 'Dairy & Paneer Chiller Room (Cold Chain #1)',
    type: 'temperature',
    value: '4.2',
    numericValue: 4.2,
    unit: '°C',
    status: 'normal',
    threshold: '2.0°C - 5.0°C (FSSAI Cold Standard)',
    lastReading: '25s ago'
  },
  {
    id: 'sens-hum',
    name: 'Atta, Rice & Pulse Dry Storage Granary',
    type: 'humidity',
    value: '62',
    numericValue: 62,
    unit: '%',
    status: 'normal',
    threshold: '50% - 68% (Safe Moisture Level)',
    lastReading: '45s ago'
  },
  {
    id: 'sens-pow',
    name: 'Commercial Steamers & Roti Puffer Machine',
    type: 'power',
    value: '1.8',
    numericValue: 1.8,
    unit: 'kW',
    status: 'normal',
    threshold: 'Peak safe < 2.5 kW',
    lastReading: '10s ago'
  },
  {
    id: 'sens-vib',
    name: 'Refrigeration Compressor #1 (Walk-In Chiller)',
    type: 'vibration',
    value: '0.14',
    numericValue: 0.14,
    unit: 'mm/s',
    status: 'normal',
    threshold: 'Harmonic steady state (ISO 10816)',
    lastReading: '1m ago'
  }
];

export const INITIAL_SENSOR_ALERTS: SensorAlert[] = [
  {
    id: 'alert-1',
    sensorId: 'sens-temp',
    title: 'Walk-in Dairy Chiller #1 Temp Spike',
    message: 'Temperature reached 6.8°C for 8 minutes during morning wholesale crate restocking. FSSAI threshold exceeded briefly.',
    severity: 'warning',
    time: '09:22 AM',
    duration: '8 minutes',
    acknowledged: false
  },
  {
    id: 'alert-2',
    sensorId: 'sens-pow',
    title: 'Steam Boiler Thermal Idle Warning',
    message: 'LPG steam jacketed kettle maintained high heat without active cooking batch for 35 minutes.',
    severity: 'warning',
    time: '07:15 AM',
    duration: '35 minutes',
    acknowledged: true
  }
];

export const INITIAL_AT_RISK_FOOD: AtRiskFoodItem[] = [
  {
    id: 'food-1',
    name: 'Amul Taaza Homogenised Toned Milk',
    category: 'Dairy',
    quantity: '12 packets (500 ml each)',
    expiry: 'Expires Today (6 PM)',
    condition: 'Chilled (3.8°C) — Fresh Sealed',
    risk: 'Medium',
    action: 'Channel to Kheer dessert or Evening Masala Chai',
    barcode: '8901262010051',
    qrPayload: 'FSSAI:10012021000071;BATCH:AMU-902;EXP:2026-09-18T18:00;PRICE:360INR;ITEM:Amul Milk 500ml',
    fssaiLic: '10012021000071',
    batchNumber: 'AMU-902',
    estimatedValueInr: 360,
    scannedAt: '08:40 AM'
  },
  {
    id: 'food-2',
    name: 'Fresh Mandi Mixed Subzi (Palak, Methi & Cauliflower)',
    category: 'Produce',
    quantity: '8 kg',
    expiry: 'Tomorrow morning (18h remaining)',
    condition: 'Crisp — Slight leaf dehydration',
    risk: 'Low',
    action: 'Prep immediate batch for Aloo Palak Lunch Service',
    barcode: '890204098124',
    qrPayload: 'FSSAI:13318005000123;BATCH:MND-PALAK-44;EXP:2026-09-19T10:00;PRICE:520INR;ITEM:Mixed Subzi 8kg',
    fssaiLic: '13318005000123',
    batchNumber: 'MND-PALAK-44',
    estimatedValueInr: 520,
    scannedAt: '09:12 AM',
    cvNotes: 'Computer Vision Freshness Inspection: Leaf surface 88% green, slight margin wilting. Human verification required before prep.'
  },
  {
    id: 'food-3',
    name: 'Cooked Steamed Basmati Rice & Dal Tadka',
    category: 'Prepared Food',
    quantity: '15 kg (~45 portions)',
    expiry: 'Today (Safe window 3.5h remaining)',
    condition: 'Hot Held in Stainless Handi (64°C)',
    risk: 'High',
    action: 'Package in thermal food containers for immediate NGO redistribution',
    barcode: '890901239011',
    qrPayload: 'FSSAI:10019011006120;BATCH:KITCHEN-RICE-B3;EXP:2026-09-18T16:00;PRICE:1650INR;ITEM:Basmati Rice & Dal 15kg',
    fssaiLic: '10019011006120',
    batchNumber: 'KITCHEN-RICE-B3',
    estimatedValueInr: 1650,
    scannedAt: '11:30 AM'
  },
  {
    id: 'food-4',
    name: 'Mother Dairy Fresh Malai Paneer Blocks',
    category: 'Dairy',
    quantity: '6 kg (Vacuum packed)',
    expiry: 'Tomorrow (24h remaining)',
    condition: 'Chilled (4.0°C) — Sealed',
    risk: 'Medium',
    action: 'Fast-track for Paneer Butter Masala Dinner Batch',
    barcode: '8901648002014',
    qrPayload: 'FSSAI:10014011000189;BATCH:MDP-PAN-88;EXP:2026-09-19T20:00;PRICE:2280INR;ITEM:Mother Dairy Paneer 6kg',
    fssaiLic: '10014011000189',
    batchNumber: 'MDP-PAN-88',
    estimatedValueInr: 2280,
    scannedAt: '07:45 AM'
  }
];

export const INITIAL_RECIPIENTS: RecipientNode[] = [
  {
    id: 'rec-1',
    name: 'Seva Bharati Community Care Center',
    address: 'Sector 4, R.K. Puram',
    city: 'New Delhi 110022',
    type: 'Community',
    distanceKm: 1.2,
    capacityMeals: 40,
    status: 'Available',
    contactPerson: 'Rajesh Sharma (Seva Incharge)',
    phone: '+91 98112 45678',
    estimatedArrivalMin: 15,
    urgencyFitScore: 98
  },
  {
    id: 'rec-2',
    name: 'Gurudwara Bangla Sahib Langar Seva',
    address: 'Ashoka Road, Connaught Place',
    city: 'New Delhi 110001',
    type: 'Faith-Based',
    distanceKm: 2.1,
    capacityMeals: 60,
    status: 'Available',
    contactPerson: 'Sardar Harpreet Singh (Langar Head)',
    phone: '+91 98710 33421',
    estimatedArrivalMin: 25,
    urgencyFitScore: 94
  },
  {
    id: 'rec-3',
    name: 'Robin Hood Army - South Delhi Distribution Hub',
    address: 'Community Center, Green Park Extension',
    city: 'New Delhi 110016',
    type: 'Shelter / NGO',
    distanceKm: 4.5,
    capacityMeals: 100,
    status: 'Available',
    contactPerson: 'Pooja Mehra (City Volunteer Lead)',
    phone: '+91 99580 12890',
    estimatedArrivalMin: 35,
    urgencyFitScore: 86
  },
  {
    id: 'rec-4',
    name: 'DUSIB Shramik Night Shelter & Rain Basera #42',
    address: 'Near AIIMS Flyover & Ansari Nagar',
    city: 'New Delhi 110029',
    type: 'Labor Support',
    distanceKm: 1.8,
    capacityMeals: 30,
    status: 'Available',
    contactPerson: 'Manoj Yadav (Shelter Supervisor)',
    phone: '+91 97184 90214',
    estimatedArrivalMin: 20,
    urgencyFitScore: 96
  }
];

export const INITIAL_INSIGHTS: OperationalInsight[] = [
  {
    id: 'ins-1',
    title: 'Rice & Roti Overproduction Variance',
    metric: '+12% above demand',
    trend: 'Past 3 Friday lunches',
    type: 'overproduction',
    description: 'Actual mess turnout dropped due to monsoon downpour and university exam schedule, resulting in unserved cooked portions.',
    severity: 'warning',
    recommendation: 'Incorporate real-time hostel biometric swipes and monsoon rainfall factor (-8%) into morning batch sizing.'
  },
  {
    id: 'ins-2',
    title: 'Vegetable Prep Trim Scrap Loss',
    metric: '8.5 kg unexplained scrap',
    trend: 'Subzi Cutting Line 2',
    type: 'loss',
    description: 'Discrepancy detected between wholesale mandi potato/cauliflower intake and ready-to-cook chopped yield.',
    severity: 'warning',
    recommendation: 'Enforce standard mechanical peeling blades to reduce edible potato skin discard by 4.2 kg/day.'
  },
  {
    id: 'ins-3',
    title: 'Cold Room Compressor Duty Drop',
    metric: '24 minutes idle',
    trend: 'Dairy Walk-In Chiller #1',
    type: 'downtime',
    description: 'Compressor cut off unexpectedly during peak ambient 38°C afternoon load. Risk of curd and paneer souring.',
    severity: 'critical',
    recommendation: 'Inspect condenser coil dust accumulation; service secondary fan capacitor immediately.'
  },
  {
    id: 'ins-4',
    title: 'LPG Cooking Boiler Thermal Idle',
    metric: '+9% above baseline',
    trend: 'Dal & Rice Steam Kettles',
    type: 'energy',
    description: 'Steam lines remained energized at 120°C for 45 minutes between lunch batch completions.',
    severity: 'info',
    recommendation: 'Install automated solenoid shutoff valves linked to thermal probe holding temperatures.'
  }
];

export const LEARN_RECORDS: LearnRecord[] = [
  {
    day: 'Day 1',
    date: 'Sep 10',
    predicted: 900,
    actual: 840,
    variance: -60,
    aiAdjustment: 'Trimmed base demand coefficient by 4.2% based on hostel holiday exodus',
    confidence: 81
  },
  {
    day: 'Day 2',
    date: 'Sep 11',
    predicted: 865,
    actual: 855,
    variance: -10,
    aiAdjustment: 'Fine-tuned monsoon weather dampener (-15 meals on heavy rainy days)',
    confidence: 84
  },
  {
    day: 'Day 3',
    date: 'Sep 12',
    predicted: 910,
    actual: 902,
    variance: -8,
    aiAdjustment: 'Calibrated Thursday guest lecture attendance factor',
    confidence: 86
  },
  {
    day: 'Day 4',
    date: 'Sep 13',
    predicted: 960,
    actual: 955,
    variance: -5,
    aiAdjustment: 'High precision achieved on Friday lunch rush',
    confidence: 88
  },
  {
    day: 'Day 8 (Today)',
    date: 'Sep 17',
    predicted: 860,
    actual: 860,
    variance: 0,
    aiAdjustment: 'Continuous feedback loop matched actual kitchen production with 98.6% accuracy',
    confidence: 93
  }
];

export const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'Predict: Demand & Surplus AI',
    stageName: 'PREDICT',
    tab: 'predict',
    description: 'AI analyzes 30-day historical orders, weather (monsoon rain), and campus hostel events to forecast 920 meals needed in Indian institutional dining.',
    highlightText: 'Forecast: 920 meals with 87% confidence',
    durationMs: 4500
  },
  {
    stepNumber: 2,
    title: 'Prevent: Smart Kitchen Planning',
    stageName: 'PREVENT',
    tab: 'predict',
    description: 'Smart batching adjusts procurement down to 900 planned portions to eliminate kitchen overproduction before cooking begins.',
    highlightText: 'Production optimized to 900 meals (-20 waste avoided)',
    durationMs: 4500
  },
  {
    stepNumber: 3,
    title: 'Monitor: Real-Time IoT Cold Chain',
    stageName: 'MONITOR',
    tab: 'monitor',
    description: 'ESP32 IoT telemetry streams temperature (4.2°C), humidity (62%), and vibration over MQTT into live FSSAI-compliant dashboard.',
    highlightText: 'Dairy & paneer storage verified safe within 2°C - 5°C',
    durationMs: 4500
  },
  {
    stepNumber: 4,
    title: 'Detect: Live Camera QR & Quality',
    stageName: 'DETECT',
    tab: 'detect',
    description: 'Live camera QR scanning decodes FSSAI license & batch details, while optical inspection flags 15 kg cooked rice nearing safe holding limits.',
    highlightText: 'Real-time Camera QR & FSSAI trace active',
    durationMs: 4500
  },
  {
    stepNumber: 5,
    title: 'Redistribute: Indian Recipient Matching',
    stageName: 'REDISTRIBUTE',
    tab: 'redistribute',
    description: 'Algorithmic urgency matcher pairs 30 surplus meals with Seva Bharati Community Center (1.2 km away, capacity: 40 meals) in New Delhi.',
    highlightText: 'Recipient matched & dispatched with 15-min ETA',
    durationMs: 4500
  },
  {
    stepNumber: 6,
    title: 'Measure: ESG & ₹ Cost Impact',
    stageName: 'MEASURE',
    tab: 'sustainability',
    description: 'Real-time counters tally 128 kg waste prevented, 340 meals redirected, ₹1,52,400 saved, and 320 kg estimated CO₂e avoided.',
    highlightText: 'ESG impact calculated & ₹ audit report ready',
    durationMs: 4500
  },
  {
    stepNumber: 7,
    title: 'Learn: Closed Feedback Loop',
    stageName: 'LEARN',
    tab: 'learn',
    description: 'The difference between predicted and actual consumption is fed back to calibrate tomorrow’s demand baseline.',
    highlightText: 'Continuous feedback closes the loop and increases accuracy!',
    durationMs: 5000
  }
];
