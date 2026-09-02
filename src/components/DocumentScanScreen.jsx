import React, { useState } from 'react';
import { 
  Camera, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  ArrowRight, 
  Upload, 
  Sparkles, 
  Scan, 
  RefreshCw,
  Eye,
  Check,
  FileCheck2,
  Calendar,
  User,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { SAMPLE_DOCUMENTS, UI_STRINGS } from '../types/data';

export default function DocumentScanScreen({
  selectedLang,
  onCompleteDocs,
  onSkipDocs,
  speakText
}) {
  const [hasDocs, setHasDocs] = useState(true); // 'yes' or 'skip'
  const [scanState, setScanState] = useState('idle'); // 'idle', 'scanning', 'results'
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [scannedDocuments, setScannedDocuments] = useState([]);

  const strings = UI_STRINGS[selectedLang] || UI_STRINGS.en;
  const activeSample = SAMPLE_DOCUMENTS[currentDocIndex % SAMPLE_DOCUMENTS.length];

  const handleCapture = () => {
    setScanState('scanning');
    speakText(strings.analyzingDoc);

    setTimeout(() => {
      setScanState('results');
      setScannedDocuments(prev => [...prev, activeSample]);
      speakText(strings.ocrSuccess);
    }, 2000);
  };

  const handleAddAnother = () => {
    setCurrentDocIndex(prev => prev + 1);
    setScanState('idle');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col justify-between min-h-[calc(100vh-140px)]">
      
      {/* Top Heading & Yes / Skip Choice Pair */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-300 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-50 text-kiosk-teal-800 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              <Scan className="w-3.5 h-3.5" />
              <span>Step 3 of 4: Prior Prescriptions & Lab Reports</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {strings.ocrHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
              {strings.ocrSub}
            </p>
          </div>

          {/* Large Yes / Skip Pair */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setHasDocs(true)}
              className={`flex-1 sm:flex-initial min-h-[60px] px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all ${
                hasDocs 
                  ? 'bg-kiosk-teal-800 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileCheck2 className="w-5 h-5" />
              <span>Yes, Scan Paper</span>
            </button>
            <button
              onClick={onSkipDocs}
              className="flex-1 sm:flex-initial min-h-[60px] px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 font-black text-base flex items-center justify-center gap-2 transition-all"
            >
              <span>{strings.skip}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Center Camera Viewfinder & OCR States */}
      <div className="my-auto">
        {scanState === 'idle' && (
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl border-4 border-slate-800 max-w-2xl mx-auto">
            
            {/* Viewfinder Overlay Guides */}
            <div className="relative border-2 border-dashed border-teal-400/60 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
              
              {/* Corner Markers */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-amber-400 rounded-tl-lg"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-amber-400 rounded-tr-lg"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-amber-400 rounded-bl-lg"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-amber-400 rounded-br-lg"></div>

              {/* Animated Laser Scanning Line */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-scan"></div>

              <div className="w-20 h-20 rounded-3xl bg-slate-900/80 border border-teal-500/50 flex items-center justify-center text-teal-300 mb-4 shadow-inner">
                <FileText className="w-10 h-10" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black mb-1">
                Place Document Under Lens
              </h3>
              <p className="text-sm text-slate-300 max-w-md font-medium">
                Hold prescription flat or tap below to simulate high-speed OCR document capture
              </p>
            </div>

            {/* Large Capture Button (Touch Target >= 64px) */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleCapture}
                className="w-full sm:w-auto min-h-[64px] px-10 rounded-2xl bg-gradient-to-r from-kiosk-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform border-2 border-amber-300"
              >
                <Camera className="w-7 h-7" />
                <span>{strings.snapDoc}</span>
              </button>

              <button
                onClick={handleCapture}
                className="w-full sm:w-auto min-h-[64px] px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700"
              >
                <Upload className="w-5 h-5 text-teal-400" />
                <span>Load Sample Prescription</span>
              </button>
            </div>
          </div>
        )}

        {/* State 2: Processing OCR Animation */}
        {scanState === 'scanning' && (
          <div className="bg-white rounded-3xl p-10 text-center max-w-xl mx-auto border-3 border-teal-200 shadow-xl space-y-6">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-24 h-24 rounded-full border-4 border-teal-200 border-t-kiosk-teal-700 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-kiosk-teal-800">
                <Sparkles className="w-8 h-8 animate-pulse text-amber-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">
                {strings.analyzingDoc}
              </h3>
              <p className="text-slate-600 font-medium text-sm">
                Optical Character Recognition (OCR) is parsing doctor handwriting, dosage, and diagnostic findings...
              </p>
            </div>

            {/* Simulated Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-teal-500 to-amber-500 h-full rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        )}

        {/* State 3: Results Comparison Card (Scanned Thumb + Extracted Fields) */}
        {scanState === 'results' && (
          <div className="bg-white rounded-3xl p-6 border-3 border-emerald-300 shadow-xl max-w-5xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {strings.ocrSuccess}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Document Type: {activeSample.type} • Digitized into Patient EHR
                  </p>
                </div>
              </div>

              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-300">
                4 Clinical Fields Extracted
              </span>
            </div>

            {/* Split View: Left Scanned Thumbnail / Right Extracted Values */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left: Document Thumbnail Preview */}
              <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-3 border-2 border-slate-300 shadow-md">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-800">
                  <img 
                    src={activeSample.imageUrl} 
                    alt="Scanned Prescription Preview"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" 
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[11px] font-bold px-2 py-1 rounded-md backdrop-blur-sm flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Original Document Snapshot</span>
                  </div>
                </div>

                <div className="mt-3 px-2 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Prescribing Doctor:</span>
                    <span className="font-bold text-white">{activeSample.doctor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Clinic / Hospital:</span>
                    <span className="font-semibold text-slate-200">{activeSample.clinic}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Record Date:</span>
                    <span className="font-semibold text-teal-300">{activeSample.date}</span>
                  </div>
                </div>
              </div>

              {/* Right: Structured Data Card with Confidence Indicators */}
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                  AI Extracted Clinical Entities & Confidence
                </div>

                {activeSample.extractedFields.map((field, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between hover:bg-teal-50/50 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        {field.label}
                      </div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5">
                        {field.value}
                      </div>
                    </div>

                    {/* Confidence Indicator Tag */}
                    <div className="flex-shrink-0 ml-3">
                      {field.isHigh ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300" title="High confidence recognition">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{field.confidence}% Match</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-300" title="Physician verification suggested">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          <span>Verify ({field.confidence}%)</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions: Add Another & Done Continue */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        {scanState === 'results' ? (
          <>
            <button
              onClick={handleAddAnother}
              className="w-full sm:w-auto min-h-[60px] px-6 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-800 font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Plus className="w-5 h-5 text-kiosk-teal-700" />
              <span>{strings.addAnother}</span>
            </button>

            <button
              onClick={onCompleteDocs}
              className="w-full sm:w-auto min-h-[64px] px-10 rounded-2xl bg-kiosk-teal-800 hover:bg-kiosk-teal-900 text-white font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
            >
              <span>{strings.doneContinue}</span>
              <ArrowRight className="w-6 h-6 text-teal-200" />
            </button>
          </>
        ) : (
          <div className="flex justify-end w-full">
            <button
              onClick={onCompleteDocs}
              className="min-h-[60px] px-8 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-base flex items-center gap-2"
            >
              <span>Continue without adding docs</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
