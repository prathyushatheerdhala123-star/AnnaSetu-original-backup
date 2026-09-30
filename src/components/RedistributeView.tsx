import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Send,
  Navigation,
  ShieldCheck,
  Building,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RecipientNode } from '../types';

interface RedistributeViewProps {
  surplusMeals: number;
  recipients: RecipientNode[];
  onDispatchRecipient: (recipientId: string) => void;
}

export const RedistributeView: React.FC<RedistributeViewProps> = ({
  surplusMeals,
  recipients,
  onDispatchRecipient
}) => {
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Best match algorithm: nearest available node with capacity >= surplus
  const sortedNodes = [...recipients].sort((a, b) => {
    // Distance prioritized
    return a.distanceKm - b.distanceKm;
  });

  const bestMatch = sortedNodes.find(
    (n) => n.status === 'Available' && n.capacityMeals >= surplusMeals
  ) || sortedNodes[0];

  const handleNotifyRecipient = (node: RecipientNode) => {
    setDispatchingId(node.id);
    setNotificationMessage(`Sending dispatch alert to ${node.name} (${node.contactPerson})...`);

    setTimeout(() => {
      onDispatchRecipient(node.id);
      setDispatchingId(null);
      setNotificationMessage(`Dispatched ${surplusMeals} meals to ${node.name}! ETA: ${node.estimatedArrivalMin} mins.`);

      // Fire celebratory confetti for food saved
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {
        // graceful fallback
      }

      setTimeout(() => setNotificationMessage(null), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Title & Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
              Stage 5 • REDISTRIBUTE
            </span>
            <span className="text-xs text-slate-500 font-medium">Surplus Matching & Logistics</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Surplus Food Redistribution & Recipient Matching
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Safely route unserved, hot-held, or batch-packaged food to certified community recipients within safe transit timeframes.
          </p>
        </div>
      </div>

      {/* SURPLUS AVAILABLE PROMINENT BANNER (Prompt Mandate: SURPLUS AVAILABLE: 30 meals) */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center shrink-0">
            <Truck className="w-7 h-7 text-emerald-100" />
          </div>
          <div>
            <div className="text-xs font-extrabold tracking-widest text-emerald-200 uppercase">
              Surplus Available
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight mt-0.5">
              {surplusMeals} <span className="text-xl font-bold text-emerald-100">meals</span>
            </div>
            <p className="text-xs text-emerald-100 mt-1">
              Cooked Steamed Basmati Rice & Vegetarian Portions • Packaged in thermal food carriers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/20 self-start sm:self-auto">
          <Clock className="w-4 h-4 text-emerald-200" />
          <div className="text-xs">
            <div className="font-bold">Safe Transfer Window</div>
            <div className="text-emerald-100 text-[11px]">Under 45 minutes remaining</div>
          </div>
        </div>
      </div>

      {/* MATCHING PROCESS PIPELINE (Prompt Mandate: Surplus → Urgency Score → Distance → Best Match) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Algorithmic Routing Pipeline
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Step 1 */}
          <div className="w-full md:w-1/4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="font-bold text-slate-500 uppercase text-[10px]">1. Ingestion</div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5">Surplus ({surplusMeals} Meals)</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Verified food temperature</div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

          {/* Step 2 */}
          <div className="w-full md:w-1/4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <div className="font-bold text-amber-700 uppercase text-[10px]">2. Triage</div>
            <div className="text-sm font-extrabold text-amber-950 mt-0.5">Urgency Score (98/100)</div>
            <div className="text-[11px] text-amber-800 mt-0.5">Shelf life & packaging speed</div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

          {/* Step 3 */}
          <div className="w-full md:w-1/4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
            <div className="font-bold text-blue-700 uppercase text-[10px]">3. Geofence</div>
            <div className="text-sm font-extrabold text-blue-950 mt-0.5">Distance (1.2 km - 4.5 km)</div>
            <div className="text-[11px] text-blue-800 mt-0.5">Transit route within 25 min</div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden md:block" />

          {/* Step 4 */}
          <div className="w-full md:w-1/4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-center ring-2 ring-emerald-500/20">
            <div className="font-bold text-emerald-700 uppercase text-[10px]">4. Resolution</div>
            <div className="text-sm font-extrabold text-emerald-950 mt-0.5">Best Match Recipient</div>
            <div className="text-[11px] text-emerald-800 font-bold mt-0.5">Seva Bharati, R.K. Puram (1.2 km)</div>
          </div>
        </div>
      </div>

      {/* NOTIFICATION FEEDBACK TOAST */}
      {notificationMessage && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* RECIPIENT NODES LIST (Prompt Mandates: Nearby Community, Temple Food Distribution, NGO, Labor Community) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Certified Recipient Distribution Nodes
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            4 active nodes within 5km radius
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipients.map((node) => {
            const isOptimal = bestMatch.id === node.id && node.status === 'Available';
            const isDispatched = node.status === 'En Route' || node.status === 'Notified';

            return (
              <div
                key={node.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all relative ${
                  isOptimal
                    ? 'border-emerald-300 ring-2 ring-emerald-500/20 bg-gradient-to-br from-white to-emerald-50/20'
                    : 'border-slate-200/90'
                }`}
              >
                {isOptimal && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    AI Recommended Best Match
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{node.name}</h3>
                    <div className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                      <span>{node.address}, {node.city}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Type: {node.type} • Incharge: {node.contactPerson} {node.phone ? `• ${node.phone}` : ''}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Distance</span>
                    <div className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{node.distanceKm} km</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Capacity</span>
                    <div className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-teal-600" />
                      <span>{node.capacityMeals} meals</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Status</span>
                    <div className="mt-0.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          node.status === 'Available'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dispatch / Notify Action Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Est. Courier Transit: ~{node.estimatedArrivalMin} mins</span>
                  </div>

                  <button
                    type="button"
                    id={`notify-recipient-btn-${node.id}`}
                    onClick={() => handleNotifyRecipient(node)}
                    disabled={dispatchingId === node.id || isDispatched}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                      isDispatched
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : isOptimal
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {dispatchingId === node.id ? (
                      <span>Dispatching...</span>
                    ) : isDispatched ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Dispatched</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Notify Recipient</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
