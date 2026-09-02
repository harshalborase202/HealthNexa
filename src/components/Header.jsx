import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Languages, 
  Stethoscope, 
  Monitor, 
  UserCheck, 
  AlertTriangle, 
  Sparkles,
  Home,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { LANGUAGES, UI_STRINGS } from '../types/data';

export default function Header({ 
  currentScreen, 
  setScreen, 
  selectedLang, 
  setSelectedLang, 
  mode, 
  setMode,
  isMuted, 
  setIsMuted,
  isRedFlagActive,
  setIsRedFlagActive
}) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const strings = UI_STRINGS[selectedLang] || UI_STRINGS.en;
  const activeLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  return (
    <header className="bg-white border-b-2 border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Top Utility & Mode Switcher Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-kiosk-teal-800 text-teal-100 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Kiosk #04 • Civil Hospital OPD
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-300">ABDM & AYUSH National Health Grid</span>
        </div>

        {/* View Switcher: Patient Kiosk vs Physician Dashboard */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-800 p-1 rounded-lg flex items-center border border-slate-700">
            <button
              onClick={() => {
                if (currentScreen === 5) setScreen(1);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                currentScreen !== 5 
                  ? 'bg-teal-500 text-slate-950 shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Switch to patient-facing 10-12 inch tablet kiosk screen"
            >
              <Monitor className="w-3.5 h-3.5" />
              Patient Kiosk
            </button>
            <button
              onClick={() => setScreen(5)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                currentScreen === 5 
                  ? 'bg-amber-500 text-slate-950 shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Switch to doctor desktop consultation dashboard"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Physician Desk
            </button>
          </div>

          {/* Red Flag Demonstration Toggle */}
          <button
            onClick={() => setIsRedFlagActive(!isRedFlagActive)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border transition-all ${
              isRedFlagActive 
                ? 'bg-red-600 text-white border-red-500 animate-pulse shadow-lg' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Simulate patient entering severe chest pain / emergency red-flag symptoms"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Simulate Red Flag</span>
          </button>
        </div>
      </div>

      {/* Main Kiosk Header (High Contrast, Large Touch-Friendly) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => setScreen(1)} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-kiosk-teal-700 to-kiosk-teal-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Stethoscope className="w-7 h-7 text-teal-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Medi<span className="text-kiosk-teal-700">Kiosk</span>
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                mode === 'ayush' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-blue-100 text-blue-800 border border-blue-300'
              }`}>
                {mode === 'ayush' ? '🌿 AYUSH Mode' : '🩺 General Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block font-medium">
              {strings.subtitle}
            </p>
          </div>
        </div>

        {/* Persistent Action Controls: Audio, Screen Nav, & Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Screen Selector (For presentation & review) */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
            <button 
              onClick={() => setScreen(1)} 
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${currentScreen === 1 ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'hover:bg-slate-200'}`}
            >
              1. Welcome
            </button>
            <button 
              onClick={() => setScreen(2)} 
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${currentScreen === 2 ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'hover:bg-slate-200'}`}
            >
              2. Voice Intake
            </button>
            <button 
              onClick={() => setScreen(3)} 
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${currentScreen === 3 ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'hover:bg-slate-200'}`}
            >
              3. Scan Docs
            </button>
            <button 
              onClick={() => setScreen(4)} 
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${currentScreen === 4 ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'hover:bg-slate-200'}`}
            >
              4. Complete
            </button>
          </div>

          {/* Audio Speaker Mute/Unmute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`h-12 w-12 rounded-xl flex items-center justify-center border-2 transition-all ${
              isMuted 
                ? 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200' 
                : 'bg-teal-50 border-teal-500 text-teal-800 hover:bg-teal-100 shadow-sm'
            }`}
            title={isMuted ? "Audio muted" : "Audio speaking active"}
            aria-label="Toggle Voice Guidance"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 text-kiosk-teal-700 animate-pulse" />}
          </button>

          {/* Persistent Language Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="h-12 px-3 sm:px-4 rounded-xl bg-white border-2 border-slate-300 hover:border-kiosk-teal-700 text-slate-900 font-bold flex items-center gap-2 shadow-sm transition-all text-sm sm:text-base focus:ring-2 focus:ring-kiosk-amber-500"
              aria-label="Change Language"
            >
              <Languages className="w-5 h-5 text-kiosk-teal-700" />
              <span>{activeLangObj.label}</span>
              <span className="text-xs text-slate-500 font-normal hidden sm:inline">({activeLangObj.sub})</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-2 border-slate-200 py-2 z-50">
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setSelectedLang(lang.id);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-teal-50 transition-colors font-semibold ${
                      selectedLang === lang.id ? 'bg-teal-50 text-kiosk-teal-800' : 'text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-base">{lang.label}</div>
                      <div className="text-xs text-slate-500 font-normal">{lang.sub}</div>
                    </div>
                    {selectedLang === lang.id && <CheckCircle2 className="w-5 h-5 text-kiosk-teal-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
