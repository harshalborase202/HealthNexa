import React from 'react';
import { 
  Mic, 
  Volume2, 
  ShieldCheck, 
  UserPlus, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Leaf, 
  Stethoscope, 
  Play, 
  FileText 
} from 'lucide-react';
import { LANGUAGES, UI_STRINGS } from '../types/data';

export default function LanguageConsentScreen({
  selectedLang,
  setSelectedLang,
  mode,
  setMode,
  patientType,
  setPatientType,
  onStart,
  speakText
}) {
  const strings = UI_STRINGS[selectedLang] || UI_STRINGS.en;

  const handleSpeakWelcome = () => {
    const speech = `${strings.welcomeHeading}. ${strings.welcomeSub}. ${strings.privacyCardTitle}`;
    speakText(speech);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 flex flex-col justify-between min-h-[calc(100vh-140px)]">
      {/* Top Patient Type & OPD Stream Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm">
        {/* Patient Status: New vs Returning */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setPatientType('new')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm sm:text-base font-bold transition-all ${
              patientType === 'new'
                ? 'bg-kiosk-teal-800 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-5 h-5" />
            <span>{strings.newPatient}</span>
          </button>
          <button
            onClick={() => setPatientType('returning')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm sm:text-base font-bold transition-all ${
              patientType === 'returning'
                ? 'bg-kiosk-teal-800 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <RotateCcw className="w-5 h-5" />
            <span>{strings.returningPatient}</span>
          </button>
        </div>

        {/* Clinical Stream Selection: General vs AYUSH */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
            Department:
          </span>
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setMode('general')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                mode === 'general'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>{strings.generalMode}</span>
            </button>
            <button
              onClick={() => setMode('ayush')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                mode === 'ayush'
                  ? 'bg-emerald-700 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-200" />
              <span>{strings.ayushMode}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="text-center my-6 sm:my-8 space-y-6">
        {/* Welcome Banner */}
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-kiosk-teal-900 px-4 py-2 rounded-full text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>AI-Powered Pre-Consultation System • Zero Training Needed</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {strings.welcomeHeading}
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto font-medium leading-relaxed">
          {strings.welcomeSub}
        </p>

        {/* 5 Prominent Native Language Selector Buttons (Row Layout, >=64px touch target) */}
        <div className="pt-2">
          <label className="block text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
            {strings.selectLang}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLang === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => {
                    setSelectedLang(lang.id);
                    // short voice greeting in the language if supported
                  }}
                  className={`min-h-[72px] rounded-2xl p-3 flex flex-col items-center justify-center border-3 transition-all duration-200 ${
                    isSelected
                      ? 'bg-kiosk-teal-800 text-white border-kiosk-teal-900 shadow-lg scale-105 ring-4 ring-teal-200'
                      : 'bg-white text-slate-800 border-slate-300 hover:border-kiosk-teal-600 hover:bg-slate-50 shadow-sm'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-2xl font-black leading-none">{lang.label}</span>
                  <span className={`text-xs mt-1 font-semibold ${isSelected ? 'text-teal-200' : 'text-slate-500'}`}>
                    {lang.sub}
                  </span>
                  {isSelected && (
                    <span className="mt-1 flex items-center text-[10px] bg-teal-700/70 px-2 py-0.5 rounded-full font-bold">
                      <Check className="w-3 h-3 mr-1" /> Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Friendly Big Start Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto min-h-[72px] px-10 rounded-2xl bg-gradient-to-r from-kiosk-amber-500 via-amber-600 to-kiosk-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xl sm:text-2xl shadow-xl flex items-center justify-center gap-4 transition-all hover:scale-102 active:scale-98 border-2 border-amber-300"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-950/20 flex items-center justify-center">
              <Mic className="w-6 h-6 text-slate-950" />
            </div>
            <span>{strings.startBtn}</span>
            <ArrowRight className="w-7 h-7 text-slate-950" />
          </button>

          {/* Audio Guidance Cue Badge */}
          <div className="inline-flex items-center gap-2 text-sm text-slate-600 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm">
            <Volume2 className="w-5 h-5 text-kiosk-teal-700 animate-pulse" />
            <span className="font-semibold">{strings.audioAvailable}</span>
          </div>
        </div>
      </div>

      {/* Bottom Privacy & Audio Consent Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-300 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Shield & Privacy Notice */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 flex-shrink-0 flex items-center justify-center text-kiosk-teal-800 border border-teal-300">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {strings.privacyCardTitle}
              </h3>
              <p className="text-sm text-slate-600 font-medium mt-1 leading-snug">
                {strings.privacyCardBody}
              </p>
            </div>
          </div>

          {/* Consent Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Listen Audio Button */}
            <button
              onClick={handleSpeakWelcome}
              className="flex-1 md:flex-initial min-h-[60px] px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              title="Listen to privacy notice aloud"
            >
              <Volume2 className="w-5 h-5 text-kiosk-teal-700" />
              <span>{strings.listenBtn}</span>
            </button>

            {/* Large I Agree & Continue CTA */}
            <button
              onClick={onStart}
              className="flex-1 md:flex-initial min-h-[60px] px-8 rounded-xl bg-kiosk-teal-800 hover:bg-kiosk-teal-900 text-white font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all"
            >
              <span>{strings.agreeBtn}</span>
              <ArrowRight className="w-5 h-5 text-teal-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
