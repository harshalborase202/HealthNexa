import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  User, 
  Edit3, 
  Save, 
  ShieldAlert, 
  FileText, 
  Calendar, 
  Check, 
  Sparkles, 
  Leaf, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink,
  Activity,
  Heart,
  Thermometer,
  Eye,
  FileCheck,
  Send,
  AlertCircle
} from 'lucide-react';
import { MOCK_QUEUE, DASHAVIDHA_PARIKSHA_DATA, SAMPLE_DOCUMENTS } from '../types/data';

export default function PhysicianDashboard({ 
  onBackToKiosk,
  isRedFlagActive 
}) {
  const [patientList, setPatientList] = useState(MOCK_QUEUE);
  const [selectedPatientId, setSelectedPatientId] = useState('P-101');
  const [isEditing, setIsEditing] = useState({});
  const [isDashavidhaOpen, setIsDashavidhaOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' or 'documents'
  const [saveStatus, setSaveStatus] = useState(null);

  const selectedPatient = patientList.find(p => p.id === selectedPatientId) || patientList[0];

  // Dynamic red flag override if toggled globally
  const hasActiveRedFlag = isRedFlagActive || selectedPatient.isRedFlag;

  const handleInlineEdit = (section, newValue) => {
    setPatientList(prev => prev.map(p => {
      if (p.id === selectedPatientId) {
        return { ...p, [section]: newValue };
      }
      return p;
    }));
  };

  const handleSaveToEHR = () => {
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      
      {/* Top Clinical Navigation Bar */}
      <nav className="bg-slate-900 text-white px-6 py-3 border-b border-slate-800 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center font-black text-white shadow">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight">
                MediKiosk <span className="text-teal-400">Clinical Desk</span>
              </span>
              <span className="bg-teal-950 text-teal-300 border border-teal-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                OPD Room #108
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Consulting Physician: <strong className="text-slate-200">Dr. Rajeshwari Joshi, MD (Ayu / Med)</strong>
            </p>
          </div>
        </div>

        {/* Quick Kiosk Return Switch & Doctor Status */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">OPD Active • 3 Patients in Queue</span>
          </div>

          <button
            onClick={onBackToKiosk}
            className="bg-teal-600 hover:bg-teal-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow transition-colors"
          >
            <span>Return to Kiosk Mode</span>
          </button>
        </div>
      </nav>

      {/* Main Workspace: 3 Columns on Desktop (Queue | Summary | Timeline) */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= COLUMN 1: PATIENT QUEUE (Left Sidebar, 3 Cols) ================= */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-4 flex flex-col h-[calc(100vh-140px)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-teal-700" />
              Patient Waiting Queue
            </h2>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {patientList.length}
            </span>
          </div>

          {/* Search bar */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search token or name..." 
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-600 outline-none"
            />
          </div>

          {/* Queue List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {patientList.map((patient) => {
              const isSelected = patient.id === selectedPatientId;
              const isRed = (patient.id === selectedPatientId && isRedFlagActive) || patient.isRedFlag;

              return (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-teal-50/80 border-teal-600 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900">
                          {patient.name}
                        </span>
                        <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          {patient.token}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {patient.age}y • {patient.gender} • {patient.mode}
                      </div>
                    </div>

                    {/* Status Dot */}
                    <div className="flex items-center gap-1">
                      {isRed ? (
                        <span className="flex items-center gap-1 text-[10px] font-black text-red-700 bg-red-100 px-2 py-0.5 rounded-full border border-red-300 animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-red-600"></span>
                          ALERT
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          Ready
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-600 line-clamp-1 italic">
                    "{patient.chiefComplaint}"
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Summary Ready
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Red-Flag Alert
            </span>
          </div>
        </aside>

        {/* ================= COLUMN 2: STRUCTURED CLINICAL SUMMARY (Center, 6-7 Cols) ================= */}
        <main className="lg:col-span-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col h-[calc(100vh-140px)] overflow-y-auto">
          
          {/* Patient Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-900">
                  {selectedPatient.name}
                </h1>
                <span className="text-sm font-black bg-slate-900 text-amber-400 px-2.5 py-1 rounded-lg">
                  Token {selectedPatient.token}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                  selectedPatient.mode.includes('AYUSH') 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                    : 'bg-blue-50 text-blue-800 border-blue-300'
                }`}>
                  {selectedPatient.mode}
                </span>
              </div>

              <div className="text-xs text-slate-500 font-medium mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>UHID: <strong>{selectedPatient.uhid}</strong></span>
                <span>Age/Sex: <strong>{selectedPatient.age} Yrs / {selectedPatient.gender}</strong></span>
                <span>Time: <strong>{selectedPatient.time}</strong></span>
              </div>
            </div>

            {/* Top Action Buttons (Draft / Accept & Save) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert("Ready to annotate or edit this AI history draft.")}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors"
              >
                Amend
              </button>

              <button
                onClick={handleSaveToEHR}
                className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Accept & Save to EHR</span>
              </button>
            </div>
          </div>

          {/* Success Save Notice */}
          {saveStatus === 'saved' && (
            <div className="my-3 bg-emerald-100 border-2 border-emerald-400 text-emerald-900 px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Clinical history approved and committed to Ayushman Bharat ABDM EHR system.
              </span>
              <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded">Rx ID: #EHR-2026-9811</span>
            </div>
          )}

          {/* 🚨 Red Flag Trigger Banner */}
          {hasActiveRedFlag && (
            <div className="my-4 bg-red-50 border-2 border-red-500 rounded-2xl p-4 text-red-950 flex items-start gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-red-800">
                    Priority Clinical Triage Alert Triggered
                  </span>
                  <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Level 1 Immediate
                  </span>
                </div>
                <p className="text-sm font-black text-red-900 mt-1">
                  {selectedPatient.redFlagReason || "Acute chest heaviness, suspected coronary ischemia / severe dyspnea detected during intake."}
                </p>
                <p className="text-xs text-red-700 font-medium mt-0.5">
                  Nurse alerted • Immediate 12-lead ECG & vitals triage recommended before regular OPD consultation.
                </p>
              </div>
            </div>
          )}

          {/* Vitals Ribbon */}
          <div className="my-3 grid grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Blood Pressure</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">{selectedPatient.vitalSigns.bp}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Pulse</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">{selectedPatient.vitalSigns.pulse}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">SpO2</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">{selectedPatient.vitalSigns.spo2}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Temp</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">{selectedPatient.vitalSigns.temp}</span>
            </div>
          </div>

          {/* Clinical Draft Notice */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl px-3 py-1.5 text-xs text-amber-900 font-medium flex items-center justify-between mb-4">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <strong>AI Pre-Consultation Intake Draft</strong>: Patient-reported responses. Requires physician verification.
            </span>
            <span className="text-[10px] bg-amber-200/80 px-2 py-0.5 rounded font-bold">Unconfirmed Draft</span>
          </div>

          {/* Structured Clinical Sections (Inline Editable with Pencil Icon) */}
          <div className="space-y-4">
            
            {/* Section 1: Chief Complaint */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Chief Complaint
                </span>
                <button
                  onClick={() => {
                    const amended = prompt('Amend Chief Complaint:', selectedPatient.chiefComplaint);
                    if (amended !== null) handleInlineEdit('chiefComplaint', amended);
                  }}
                  className="text-slate-400 hover:text-teal-700 p-1"
                  title="Edit inline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm font-bold text-slate-900">
                {selectedPatient.chiefComplaint}
              </p>
            </div>

            {/* Section 2: History of Present Illness (HPI) */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  History of Present Illness (HPI)
                </span>
                <button
                  onClick={() => {
                    const amended = prompt('Amend HPI:', selectedPatient.hpi);
                    if (amended !== null) handleInlineEdit('hpi', amended);
                  }}
                  className="text-slate-400 hover:text-teal-700 p-1"
                  title="Edit inline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {selectedPatient.hpi}
              </p>
            </div>

            {/* Section 3: Past Medical History & Comorbidities */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Past Medical History & Comorbidities
                </span>
                <button
                  onClick={() => {
                    const amended = prompt('Amend PMH:', selectedPatient.pmh);
                    if (amended !== null) handleInlineEdit('pmh', amended);
                  }}
                  className="text-slate-400 hover:text-teal-700 p-1"
                  title="Edit inline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800">
                {selectedPatient.pmh}
              </p>
            </div>

            {/* Section 4: Drug & Allergy History */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Drug & Allergy History
                </span>
                <button
                  onClick={() => {
                    const amended = prompt('Amend Allergies:', selectedPatient.allergies);
                    if (amended !== null) handleInlineEdit('allergies', amended);
                  }}
                  className="text-slate-400 hover:text-teal-700 p-1"
                  title="Edit inline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800">
                {selectedPatient.allergies}
              </p>
            </div>

            {/* Section 5: Family & Social History */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Family History
                </span>
                <button
                  onClick={() => {
                    const amended = prompt('Amend Family History:', selectedPatient.familyHistory);
                    if (amended !== null) handleInlineEdit('familyHistory', amended);
                  }}
                  className="text-slate-400 hover:text-teal-700 p-1"
                  title="Edit inline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800">
                {selectedPatient.familyHistory}
              </p>
            </div>

            {/* ================= AYUSH MODE EXPANDABLE: DASHAVIDHA PARIKSHA MODULE ================= */}
            <div className="border-2 border-emerald-300 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setIsDashavidhaOpen(!isDashavidhaOpen)}
                className="w-full bg-emerald-50 hover:bg-emerald-100/70 px-4 py-3 flex items-center justify-between transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-emerald-950 block">
                      Dashavidha Pariksha (दशविध परीक्षा — 10 Ayurvedic Parameters)
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      Patient intake mapped to classical Charaka Samhita parameters
                    </span>
                  </div>
                </div>

                {isDashavidhaOpen ? <ChevronDown className="w-5 h-5 text-emerald-800" /> : <ChevronRight className="w-5 h-5 text-emerald-800" />}
              </button>

              {isDashavidhaOpen && (
                <div className="p-4 bg-white divide-y divide-slate-100 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-black uppercase text-[10px] tracking-wider border-b border-slate-200">
                        <th className="p-2.5">Parameter</th>
                        <th className="p-2.5">Clinical Meaning</th>
                        <th className="p-2.5">Patient Reported Finding</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {DASHAVIDHA_PARIKSHA_DATA.map((item, idx) => (
                        <tr key={idx} className="hover:bg-teal-50/40 transition-colors">
                          <td className="p-2.5 font-bold text-slate-900">
                            <div>{item.parameter}</div>
                            <span className="text-[11px] text-emerald-700 font-normal">{item.sanskrit}</span>
                          </td>
                          <td className="p-2.5 text-slate-600 max-w-[180px]">
                            {item.meaning}
                          </td>
                          <td className="p-2.5 font-semibold text-slate-900">
                            {item.collectedValue}
                          </td>
                          <td className="p-2.5 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.status === 'Patient Reported' 
                                ? 'bg-teal-100 text-teal-800 border border-teal-300' 
                                : item.status === 'Pending Exam'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : 'bg-blue-100 text-blue-800 border border-blue-300'
                            }`}>
                              {item.badge}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </main>

        {/* ================= COLUMN 3: DIGITIZED HISTORICAL DOCUMENTS (Right Sidebar, 3 Cols) ================= */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-4 flex flex-col h-[calc(100vh-140px)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-teal-700" />
              Digitized Documents Timeline
            </h2>
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {SAMPLE_DOCUMENTS.length} Files
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-3">
            Old records scanned at kiosk and parsed via OCR:
          </p>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {SAMPLE_DOCUMENTS.map((doc, idx) => (
              <div 
                key={doc.id}
                className="rounded-xl border-2 border-slate-200 p-3 bg-slate-50 hover:bg-white hover:border-teal-500 transition-all shadow-sm group"
              >
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    {doc.date}
                  </span>
                  <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[10px]">
                    {doc.type}
                  </span>
                </div>

                {/* Scanned Image Preview */}
                <div className="relative rounded-lg overflow-hidden h-28 bg-slate-900 mb-2">
                  <img 
                    src={doc.imageUrl} 
                    alt={doc.type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-md">
                      <Eye className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="font-bold text-slate-900">{doc.doctor}</div>
                  <div className="text-slate-500 text-[11px]">{doc.clinic}</div>
                </div>

                {/* OCR Entities Extracted */}
                <div className="mt-3 pt-2 border-t border-slate-200 space-y-1">
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Key Extracted Entities
                  </div>
                  {doc.extractedFields.slice(0, 2).map((f, i) => (
                    <div key={i} className="text-xs text-slate-700 flex items-center justify-between">
                      <span className="font-semibold text-slate-600 truncate max-w-[120px]">{f.label}:</span>
                      <span className="font-bold text-teal-800 truncate max-w-[120px]">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 text-center">
            <button
              onClick={() => alert("All past records verified.")}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-300 transition-colors"
            >
              Verify All Documents
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
}
