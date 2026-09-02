import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  Printer, 
  QrCode, 
  Clock, 
  MapPin, 
  FileCheck, 
  Stethoscope, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck,
  Check,
  Leaf
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UI_STRINGS } from '../types/data';

export default function SessionCompleteScreen({
  selectedLang,
  mode,
  onReset,
  onOpenDoctorView,
  speakText
}) {
  const strings = UI_STRINGS[selectedLang] || UI_STRINGS.en;

  // Trigger cheerful celebratory confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#f59e0b', '#10b981']
    });

    speakText(`${strings.sessionDoneTitle}. ${strings.sessionDoneSub}`);
  }, []);

  const handlePrintSlip = () => {
    alert("🖨️ Printing MediKiosk OPD Token & Clinical Summary Slip...\nPlease collect your slip from the dispenser slot.");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col justify-between min-h-[calc(100vh-140px)]">
      
      {/* Central Success Hero */}
      <div className="text-center space-y-4">
        {/* Large Friendly Animated Success Checkmark */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-4 border-emerald-300 shadow-xl animate-bounce-short">
          <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 stroke-[2.5]" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {strings.sessionDoneTitle}
        </h1>

        <p className="text-lg sm:text-xl text-slate-700 max-w-xl mx-auto font-medium leading-relaxed">
          {strings.sessionDoneSub}
        </p>
      </div>

      {/* OPD Token & Room Pass Card */}
      <div className="my-6 bg-gradient-to-br from-kiosk-teal-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-teal-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-teal-800/80">
          
          {/* Token Number */}
          <div className="pt-2 sm:pt-0">
            <span className="text-xs font-black tracking-widest text-teal-300 uppercase block">
              {strings.tokenNo}
            </span>
            <span className="text-4xl sm:text-5xl font-black text-amber-400 block mt-1 tracking-wider">
              #A-42
            </span>
            <span className="text-xs text-teal-200 mt-1 block">Priority General Queue</span>
          </div>

          {/* OPD Room */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-xs font-black tracking-widest text-teal-300 uppercase block">
              {strings.opdRoom}
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <MapPin className="w-6 h-6 text-emerald-400" />
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                Room 108
              </span>
            </div>
            <span className="text-xs text-teal-200 mt-1 block">
              {mode === 'ayush' ? 'AYUSH & Panchakarma Wing' : 'General Medicine Wing'}
            </span>
          </div>

          {/* Estimated Wait */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-xs font-black tracking-widest text-teal-300 uppercase block">
              {strings.estWait}
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Clock className="w-6 h-6 text-amber-300" />
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                ~12 Mins
              </span>
            </div>
            <span className="text-xs text-teal-200 mt-1 block">2 patients ahead of you</span>
          </div>
        </div>
      </div>

      {/* Visual Capture Checklist & QR Code Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left: Simple Visual Summary Card with Green Checkmarks */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-300 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-wider">
            <FileCheck className="w-4 h-4 text-kiosk-teal-700" />
            <span>{strings.summaryCaptured}</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Clinical Symptoms & Onset Recorded
                  </div>
                  <div className="text-xs text-slate-500">
                    Chief complaints structured into EHR
                  </div>
                </div>
              </div>
              <span className="text-xs font-black text-teal-800 bg-white px-2.5 py-1 rounded-full border border-teal-300">
                Verified
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Prior Documents Digitized (OCR)
                  </div>
                  <div className="text-xs text-slate-500">
                    Prescriptions & test results attached
                  </div>
                </div>
              </div>
              <span className="text-xs font-black text-teal-800 bg-white px-2.5 py-1 rounded-full border border-teal-300">
                2 Files
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                  {mode === 'ayush' ? <Leaf className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {mode === 'ayush' ? 'Dashavidha Pariksha Profile Ready' : 'General Clinical History Drafted'}
                  </div>
                  <div className="text-xs text-slate-500">
                    Transferred securely to Doctor's desk
                  </div>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-300">
                Ready
              </span>
            </div>
          </div>
        </div>

        {/* Right: QR Code for Patient Phone / ABHA Link */}
        <div className="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-300 shadow-md text-center space-y-3">
          <div className="inline-block p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 shadow-inner">
            <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl flex items-center justify-center border border-slate-300 relative group">
              {/* Simulated QR graphic with healthcare cross */}
              <div className="w-full h-full bg-[radial-gradient(#0f766e_2px,transparent_2px)] [background-size:12px_12px] flex items-center justify-center">
                <div className="w-10 h-10 bg-kiosk-teal-800 rounded-lg flex items-center justify-center text-white shadow-md">
                  <QrCode className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Scan on Mobile (Optional)
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Sync token & receipt with your Ayushman Bharat ABHA app
            </p>
          </div>

          {/* Print Summary Button */}
          <button
            onClick={handlePrintSlip}
            className="w-full min-h-[54px] rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4 text-kiosk-teal-700" />
            <span>{strings.printSlip}</span>
          </button>
        </div>
      </div>

      {/* Bottom Kiosk Reset & Physician View CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={onReset}
          className="w-full sm:w-auto min-h-[60px] px-8 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-base flex items-center justify-center gap-3 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span>{strings.newSession}</span>
        </button>

        {/* View on Doctor Dashboard Quick Bridge */}
        <button
          onClick={onOpenDoctorView}
          className="w-full sm:w-auto min-h-[64px] px-8 rounded-2xl bg-gradient-to-r from-kiosk-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all border-2 border-amber-300"
        >
          <Stethoscope className="w-6 h-6" />
          <span>View on Physician Dashboard</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
