import React, { useState } from 'react';
import {
  Activity,
  Thermometer,
  Droplets,
  Zap,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Radio,
  Server,
  Monitor,
  ArrowRight,
  RefreshCw,
  Clock,
  Check
} from 'lucide-react';
import { SensorData, SensorAlert } from '../types';

interface MonitorViewProps {
  sensors: SensorData[];
  alerts: SensorAlert[];
  onAcknowledgeAlert: (alertId: string) => void;
}

export const MonitorView: React.FC<MonitorViewProps> = ({
  sensors,
  alerts,
  onAcknowledgeAlert
}) => {
  const [selectedAlertForDetails, setSelectedAlertForDetails] = useState<SensorAlert | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Temperature line chart mock points (last 6 hours)
  const tempHistory = [
    { time: '06:00', temp: 3.9, safe: true },
    { time: '07:00', temp: 4.0, safe: true },
    { time: '08:00', temp: 4.2, safe: true },
    { time: '09:00', temp: 5.1, safe: true },
    { time: '09:22', temp: 6.8, safe: false }, // Spike point
    { time: '09:30', temp: 5.4, safe: true },
    { time: '10:00', temp: 4.4, safe: true },
    { time: '11:00', temp: 4.2, safe: true },
    { time: '12:00', temp: 4.1, safe: true }
  ];

  return (
    <div className="space-y-6">
      {/* Title & Stage Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
              Stage 3 • MONITOR
            </span>
            <span className="text-xs text-slate-500 font-medium">IoT Sensor Mesh</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Real-Time Kitchen Cold Chain & Energy Monitoring
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous telemetry prevents spoilage and equipment degradation before edible inventory is damaged.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Poll Telemetry</span>
          </button>
        </div>
      </div>

      {/* HARDWARE WORKFLOW BANNER (Prompt Mandate) */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Hardware Architecture Pipeline
            </div>
            <div className="text-sm font-extrabold text-white mt-0.5">
              Sensors → ESP32 → MQTT → Backend → Dashboard
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Ultra-low power microcontrollers stream edge temperature, ambient humidity, and motor vibrations via secure MQTT topics.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
              <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sensors</span>
            </div>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>ESP32</span>
            </div>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span>MQTT</span>
            </div>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
              <Server className="w-3.5 h-3.5 text-blue-400" />
              <span>Backend</span>
            </div>
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-1.5 rounded-lg border border-emerald-500/40 font-bold">
              <Monitor className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* SENSOR CARDS (Prompt: Temperature 4.2°C, Humidity 62%, Power 1.8 kW, Vibration Normal) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Temperature */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Temperature
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Normal
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">4.2</span>
            <span className="text-lg font-bold text-slate-500">°C</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex justify-between">
            <span>Walk-in Cold Storage #2</span>
            <span className="font-semibold text-slate-700">Target: 2°C - 6°C</span>
          </div>
        </div>

        {/* Card 2: Humidity */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Humidity
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Normal
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">62</span>
            <span className="text-lg font-bold text-slate-500">%</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex justify-between">
            <span>Dry Goods Pantry</span>
            <span className="font-semibold text-slate-700">Target: 50% - 68%</span>
          </div>
        </div>

        {/* Card 3: Power */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Power
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Normal
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">1.8</span>
            <span className="text-lg font-bold text-slate-500">kW</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex justify-between">
            <span>Induction & Steamers</span>
            <span className="font-semibold text-slate-700">Peak safe &lt; 2.5 kW</span>
          </div>
        </div>

        {/* Card 4: Vibration */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Vibration
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Normal
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">0.14</span>
            <span className="text-sm font-bold text-slate-500">mm/s</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex justify-between">
            <span>Compressor Motor #1</span>
            <span className="font-semibold text-slate-700">Harmonic Steady</span>
          </div>
        </div>
      </div>

      {/* SIMULATED ALERT CARD (Prompt: “Temperature exceeded safe threshold for 8 minutes.” with View Details and Acknowledge Alert) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Active IoT Threshold Incidents</h3>
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-2xl border transition-all ${
              alert.acknowledged
                ? 'bg-slate-50 border-slate-200 opacity-75'
                : 'bg-amber-50/90 border-amber-300 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    alert.acknowledged ? 'bg-slate-200 text-slate-600' : 'bg-amber-500 text-white'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{alert.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        alert.acknowledged ? 'bg-slate-200 text-slate-700' : 'bg-amber-200 text-amber-900'
                      }`}
                    >
                      {alert.acknowledged ? 'Acknowledged' : 'Action Required'}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {alert.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 font-medium">
                    “{alert.message}”
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  id={`view-details-btn-${alert.id}`}
                  onClick={() => setSelectedAlertForDetails(alert)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 shadow-xs"
                >
                  View Details
                </button>
                {!alert.acknowledged && (
                  <button
                    type="button"
                    id={`ack-alert-btn-${alert.id}`}
                    onClick={() => onAcknowledgeAlert(alert.id)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Acknowledge Alert</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIVE-LOOKING LINE CHART FOR TEMPERATURE (Prompt mandate) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Cold Storage Temperature Trend (Last 6 Hours)
            </h3>
            <p className="text-xs text-slate-500">
              Walk-in Unit #2 telemetry stream with safe threshold envelope (2.0°C - 6.0°C).
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-3 h-1 bg-emerald-500 rounded-full" />
              Safe Envelope
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-600 font-bold">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
              8-Min Spike (Restocking)
            </span>
          </div>
        </div>

        {/* Custom Responsive SVG Telemetry Line Chart */}
        <div className="mt-6">
          <div className="h-60 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 720 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Safe zone green band (2°C to 6°C) */}
              {/* y-range: 0°C to 8°C mapped to 200px to 20px */}
              <rect
                x="45"
                y={200 - (6 / 8) * 180}
                width="650"
                height={((6 - 2) / 8) * 180}
                fill="#ecfdf5"
                opacity="0.9"
              />
              <line
                x1="45"
                y1={200 - (6 / 8) * 180}
                x2="695"
                y2={200 - (6 / 8) * 180}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text x="695" y={200 - (6 / 8) * 180 - 4} textAnchor="end" fontSize="10" fill="#059669" fontWeight="bold">
                Max Safe: 6.0°C
              </text>

              {/* Grid Y labels */}
              {[0, 2, 4, 6, 8].map((t) => {
                const y = 200 - (t / 8) * 180;
                return (
                  <g key={t}>
                    <line x1="45" y1={y} x2="695" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                    <text x="35" y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
                      {t}°C
                    </text>
                  </g>
                );
              })}

              {/* Temperature Line Path */}
              <path
                d={`M 55 ${200 - (tempHistory[0].temp / 8) * 180} ` +
                  tempHistory.map((pt, i) => `L ${55 + i * 75} ${200 - (pt.temp / 8) * 180}`).join(' ')}
                fill="none"
                stroke="#0891b2"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data points */}
              {tempHistory.map((pt, i) => {
                const x = 55 + i * 75;
                const y = 200 - (pt.temp / 8) * 180;
                const isSpike = !pt.safe;

                return (
                  <g key={pt.time}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isSpike ? 7 : 4.5}
                      fill={isSpike ? '#f59e0b' : '#ffffff'}
                      stroke={isSpike ? '#b45309' : '#0891b2'}
                      strokeWidth={isSpike ? 2.5 : 2}
                    />
                    <text
                      x={x}
                      y={y - (isSpike ? 12 : 8)}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight={isSpike ? 'bold' : 'normal'}
                      fill={isSpike ? '#b45309' : '#1e293b'}
                    >
                      {pt.temp}°C
                    </text>
                    <text x={x} y="215" textAnchor="middle" fontSize="10" fill="#64748b">
                      {pt.time}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {selectedAlertForDetails && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Incident Diagnostic Timeline</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAlertForDetails(null)}
                className="text-slate-400 hover:text-slate-600 text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-900">
                <div className="font-bold">Incident Summary</div>
                <p className="mt-1">{selectedAlertForDetails.message}</p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Sensor Device:</span>
                  <span className="font-semibold text-slate-800">DS18B20 Digital Probe #2</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Microcontroller Node:</span>
                  <span className="font-semibold text-slate-800">ESP32 Kitchen Unit #4</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Maximum Temp Reached:</span>
                  <span className="font-bold text-amber-700">6.8°C (Safe limit: 6.0°C)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Duration Above Threshold:</span>
                  <span className="font-semibold text-slate-800">8 minutes</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Food Integrity Impact:</span>
                  <span className="text-emerald-700 font-bold">Zero spoil damage — thermal inertia preserved core.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedAlertForDetails(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl"
              >
                Close Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
