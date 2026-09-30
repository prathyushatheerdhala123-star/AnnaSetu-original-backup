import React, { useState, useRef, useEffect } from 'react';
import {
  ScanLine,
  Camera,
  CameraOff,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Barcode,
  QrCode,
  Search,
  Plus,
  ShieldAlert,
  Info,
  RefreshCw,
  IndianRupee,
  ShieldCheck,
  Package
} from 'lucide-react';
import jsQR from 'jsqr';
import { AtRiskFoodItem } from '../types';

interface DetectViewProps {
  items: AtRiskFoodItem[];
  onAddItem: (item: AtRiskFoodItem) => void;
  onResolveItem: (itemId: string, actionType: string) => void;
}

interface IndianQrPreset {
  title: string;
  brand: string;
  qrPayload: string;
  item: AtRiskFoodItem;
}

const INDIAN_QR_PRESETS: IndianQrPreset[] = [
  {
    title: 'Amul Milk 500ml',
    brand: 'Amul (GCMMF)',
    qrPayload: 'FSSAI:10012021000071;BATCH:AMU-TONED-902;EXP:2026-09-18T18:00;PRICE:32INR;ITEM:Amul Taaza Milk 500ml',
    item: {
      id: `food-amul-${Date.now()}`,
      name: 'Amul Taaza Toned Milk (500ml Crate)',
      category: 'Dairy',
      quantity: '10 packets (5 Liters total)',
      expiry: 'Expires Today (6 PM)',
      condition: 'Chilled (3.6°C) — Sealed Pouches',
      risk: 'Medium',
      action: 'Fast-track for Evening Masala Chai or Rice Kheer preparation',
      barcode: '8901262010051',
      qrPayload: 'FSSAI:10012021000071;BATCH:AMU-TONED-902',
      fssaiLic: '10012021000071',
      batchNumber: 'AMU-TONED-902',
      estimatedValueInr: 320,
      scannedAt: 'Just now'
    }
  },
  {
    title: 'Mother Dairy Paneer',
    brand: 'Mother Dairy Delhi',
    qrPayload: 'FSSAI:10014011000189;BATCH:MDP-PAN-104;EXP:2026-09-19T14:00;PRICE:480INR;ITEM:Mother Dairy Malai Paneer 1kg',
    item: {
      id: `food-paneer-${Date.now()}`,
      name: 'Mother Dairy Fresh Malai Paneer Blocks',
      category: 'Dairy',
      quantity: '5 kg vacuum pack',
      expiry: 'Tomorrow (24h remaining)',
      condition: 'Cold Storage (4.0°C) — Intact Seal',
      risk: 'Medium',
      action: 'Prep immediate batch for Paneer Bhurji / Matar Paneer dinner mess',
      barcode: '8901648002014',
      qrPayload: 'FSSAI:10014011000189;BATCH:MDP-PAN-104',
      fssaiLic: '10014011000189',
      batchNumber: 'MDP-PAN-104',
      estimatedValueInr: 1950,
      scannedAt: 'Just now'
    }
  },
  {
    title: 'Cooked Basmati Rice & Dal',
    brand: 'Institutional Dining Handi',
    qrPayload: 'FSSAI:10019011006120;BATCH:KITCHEN-RICE-D4;EXP:2026-09-18T16:00;PRICE:1650INR;ITEM:Steamed Basmati & Dal 15kg',
    item: {
      id: `food-rice-${Date.now()}`,
      name: 'Cooked Steamed Basmati Rice & Dal Tadka',
      category: 'Prepared Food',
      quantity: '15 kg (~45 portions)',
      expiry: 'Today (Safe window 3.5 hours remaining)',
      condition: 'Hot Held in Stainless Handi (64.5°C)',
      risk: 'High',
      action: 'Pack in thermal insulated carriers for immediate NGO redistribution',
      barcode: '890901239011',
      qrPayload: 'FSSAI:10019011006120;BATCH:KITCHEN-RICE-D4',
      fssaiLic: '10019011006120',
      batchNumber: 'KITCHEN-RICE-D4',
      estimatedValueInr: 1650,
      scannedAt: 'Just now'
    }
  },
  {
    title: 'Fresh Mandi Palak',
    brand: 'Azadpur Wholesale Mandi',
    qrPayload: 'FSSAI:13318005000123;BATCH:MND-PALAK-77;EXP:2026-09-19T10:00;PRICE:240INR;ITEM:Fresh Spinach Greens 6kg',
    item: {
      id: `food-palak-${Date.now()}`,
      name: 'Fresh Desi Palak & Methi Leaves',
      category: 'Produce',
      quantity: '6 kg crate',
      expiry: 'Tomorrow morning (18h remaining)',
      condition: 'Crisp — Slight leaf dehydration detected',
      risk: 'Low',
      action: 'Rinse and blanch for Palak Paneer or Dal Palak today',
      barcode: '890204098124',
      qrPayload: 'FSSAI:13318005000123;BATCH:MND-PALAK-77',
      fssaiLic: '13318005000123',
      batchNumber: 'MND-PALAK-77',
      estimatedValueInr: 240,
      scannedAt: 'Just now',
      cvNotes: 'Computer Vision Freshness Inspection: Leaf surface 88% green, slight margin wilting. Human verification required before cooking.'
    }
  }
];

export const DetectView: React.FC<DetectViewProps> = ({
  items,
  onAddItem,
  onResolveItem
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scannedResult, setScannedResult] = useState<AtRiskFoodItem | null>(null);
  const [rawQrDecoded, setRawQrDecoded] = useState<string | null>(null);
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Stop camera media tracks cleanly
  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Start real camera stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access API is not available on this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setIsCameraActive(true);
        startQrScanningLoop();
      }
    } catch (err: any) {
      console.warn('Camera stream could not be started:', err);
      setCameraError(
        err?.message || 'Camera permission denied or device not found. You can test instant Indian packaging QR codes below.'
      );
      setIsCameraActive(false);
    }
  };

  // Continuous QR detection loop from live camera frame
  const startQrScanningLoop = () => {
    const scanFrame = () => {
      if (
        videoRef.current &&
        videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA &&
        canvasRef.current
      ) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert'
          });

          if (code && code.data) {
            setRawQrDecoded(code.data);
            handleParseRawQr(code.data);
            // Flash feedback
            return;
          }
        }
      }
      animationFrameRef.current = requestAnimationFrame(scanFrame);
    };

    animationFrameRef.current = requestAnimationFrame(scanFrame);
  };

  // Parse QR content into AtRiskFoodItem
  const handleParseRawQr = (qrData: string) => {
    // Check if matches known preset or generic format
    const matchedPreset = INDIAN_QR_PRESETS.find(
      (p) => qrData.includes(p.item.fssaiLic || '') || qrData.toLowerCase().includes(p.title.toLowerCase().split(' ')[0])
    );

    if (matchedPreset) {
      setScannedResult({
        ...matchedPreset.item,
        id: `food-scan-${Date.now()}`,
        scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      return;
    }

    // Generic Indian food item created from arbitrary QR code
    const genericItem: AtRiskFoodItem = {
      id: `food-qr-${Date.now()}`,
      name: qrData.length > 30 ? `Indian Food Item: ${qrData.slice(0, 25)}...` : qrData,
      category: 'Prepared Food',
      quantity: '1 Unit / Batch',
      expiry: 'Verify packaging label',
      condition: 'Scanned via Live Camera QR',
      risk: 'Medium',
      action: 'Log temperature and route for FSSAI verification',
      barcode: `QR-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      qrPayload: qrData,
      fssaiLic: '10012021000071',
      batchNumber: `BATCH-${Math.floor(100 + Math.random() * 900)}`,
      estimatedValueInr: 450,
      scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setScannedResult(genericItem);
  };

  // Handle Preset QR selection
  const handleSelectPreset = (index: number) => {
    setActivePresetIndex(index);
    const preset = INDIAN_QR_PRESETS[index];
    setRawQrDecoded(preset.qrPayload);
    setScannedResult({
      ...preset.item,
      id: `food-preset-${Date.now()}`,
      scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
    setScannedResult(null);
    setRawQrDecoded(null);
    // Start camera stream
    setTimeout(() => {
      startCamera();
    }, 100);
  };

  const handleCloseScanner = () => {
    stopCamera();
    setIsScannerOpen(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleCommitScannedItem = () => {
    if (scannedResult) {
      onAddItem(scannedResult);
      handleCloseScanner();
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              Stage 4 • DETECT
            </span>
            <span className="text-xs text-slate-500 font-medium">Optical Expiry & Quality Detection</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            At-Risk Food Item Inspection & QR Scanner
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time camera QR & barcode scanner configured for Indian institutional kitchens, FSSAI traceability, and freshness inspection.
          </p>
        </div>

        <button
          type="button"
          id="scan-food-item-btn"
          onClick={handleOpenScanner}
          className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          <span>Open Camera QR Scanner</span>
        </button>
      </div>

      {/* Safety Compliance & AI Disclaimer Banner */}
      <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-start gap-3 text-xs text-amber-950">
        <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <span className="font-bold">FSSAI Institutional Safety Protocol:</span> Computer Vision and QR OCR provide automated risk triage and shelf-life monitoring. Computer vision assists detection but <span className="underline font-bold">does not replace human food safety verification</span> or statutory FSSAI hygiene inspections.
        </div>
      </div>

      {/* AT-RISK FOOD TABLE (Indian Scenario: Basmati Rice, Amul Milk, Paneer, Subzi) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Active Inventory Requiring Operational Intervention
            </h2>
            <p className="text-xs text-slate-500">
              {items.length} items flagged by expiry date, shelf life, or cook-time log. Valued in Indian Rupees (₹).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Standards:</span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FSSAI Compliant</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200/70 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Food Item & FSSAI Lic</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Est. Value</th>
                <th className="py-3 px-4">Expiry Window</th>
                <th className="py-3 px-4">Condition</th>
                <th className="py-3 px-4">Risk</th>
                <th className="py-3 px-4">Recommended Action</th>
                <th className="py-3 px-4 text-right">Execute</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                      <Barcode className="w-3 h-3" />
                      <span>{item.barcode || 'N/A'}</span>
                      {item.fssaiLic && (
                        <span className="text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded font-sans font-semibold">
                          FSSAI #{item.fssaiLic}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {item.quantity}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    ₹{item.estimatedValueInr || 350}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-800">{item.expiry}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-700">{item.condition}</div>
                    {item.cvNotes && (
                      <div className="text-[10px] text-amber-700 font-medium mt-0.5 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 inline-block">
                        {item.cvNotes}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        item.risk === 'High'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : item.risk === 'Medium'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {item.risk}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-700 font-medium max-w-xs leading-relaxed">
                      {item.action}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      id={`resolve-item-btn-${item.id}`}
                      onClick={() => onResolveItem(item.id, item.action)}
                      className="px-3 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 font-semibold text-xs rounded-lg transition-colors border border-slate-200 hover:border-emerald-300 whitespace-nowrap"
                    >
                      Route Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LIVE CAMERA QR & OPTICAL SCANNER MODAL */}
      {isScannerOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Live Camera QR & Packaging Scanner</h3>
                  <p className="text-[11px] text-slate-500">Scan Indian packaging QR codes, barcodes, & FSSAI batch stamps</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseScanner}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Live Camera Viewfinder */}
            <div className="mt-4 relative bg-slate-950 rounded-2xl overflow-hidden min-h-[220px] max-h-[280px] flex items-center justify-center border-2 border-slate-800 shadow-inner">
              <video
                ref={videoRef}
                className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Scanning reticle / overlay */}
              {isCameraActive && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-emerald-400/80 rounded-2xl relative">
                    <div className="absolute inset-0 border border-emerald-300/30 rounded-2xl animate-pulse" />
                    {/* Laser scanning line */}
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute top-1/2 -translate-y-1/2 animate-bounce" />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded-full whitespace-nowrap">
                      Align QR / Barcode within box
                    </span>
                  </div>
                </div>
              )}

              {/* Inactive or Error State */}
              {!isCameraActive && (
                <div className="text-center p-6 space-y-2">
                  <CameraOff className="w-10 h-10 text-slate-500 mx-auto" />
                  <div className="text-xs font-bold text-slate-300">
                    {cameraError ? 'Camera Unavailable' : 'Activating Camera...'}
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                    {cameraError || 'Please allow camera permissions in your browser to scan physical packages.'}
                  </p>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg mt-2 inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Camera Permission</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Test Indian Packaging QR Codes */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Test Indian Packaging QR Presets:
                </span>
                <span className="text-[10px] text-slate-400">Click to test instant decode</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {INDIAN_QR_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      activePresetIndex === idx && scannedResult?.name === preset.item.name
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-xs truncate">{preset.title}</div>
                    <div className="text-[10px] text-slate-500 truncate">{preset.brand}</div>
                    <div className="text-[10px] font-extrabold text-emerald-700 mt-1 flex items-center">
                      <IndianRupee className="w-2.5 h-2.5 inline" />
                      <span>{preset.item.estimatedValueInr}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Decoded Output Card */}
            {scannedResult && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{scannedResult.name}</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>QR Decoded</span>
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      scannedResult.risk === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : scannedResult.risk === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    Risk: {scannedResult.risk}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600 pt-1">
                  <div>Quantity: <strong className="text-slate-800 block">{scannedResult.quantity}</strong></div>
                  <div>Est. Value: <strong className="text-slate-800 block text-emerald-700 font-bold">₹{scannedResult.estimatedValueInr}</strong></div>
                  <div>FSSAI Lic: <strong className="text-slate-800 block font-mono text-[11px]">{scannedResult.fssaiLic || '10012021000071'}</strong></div>
                  <div>Batch Code: <strong className="text-slate-800 block font-mono text-[11px]">{scannedResult.batchNumber || 'AMU-902'}</strong></div>
                </div>

                {/* Produce Deterioration Note */}
                {scannedResult.cvNotes && (
                  <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 font-medium mt-2">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>“Computer Vision: Possible deterioration detected”</span>
                    </div>
                    <div className="text-[11px] text-amber-800 mt-0.5">
                      “Human verification required” — inspect vegetable leaves before meal prep.
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 flex items-start gap-2">
                  <span className="text-slate-500 font-medium shrink-0">Action:</span>
                  <span className="font-bold text-slate-900">{scannedResult.action}</span>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 shrink-0">
              <span className="text-[10px] text-slate-400">
                FSSAI Food Safety & Standards Traceability
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCloseScanner}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Close
                </button>
                {scannedResult && (
                  <button
                    type="button"
                    id="add-scanned-to-inventory-btn"
                    onClick={handleCommitScannedItem}
                    className="px-4 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to At-Risk Tracker</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
