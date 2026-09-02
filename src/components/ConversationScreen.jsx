import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Check, 
  Edit3, 
  AlertTriangle, 
  ShieldAlert, 
  Home, 
  Sparkles,
  PhoneCall,
  UserCheck,
  Languages,
  // Question Option Icons:
  Thermometer, 
  Utensils, 
  Wind, 
  HeartPulse, 
  Activity, 
  BatteryLow, 
  Clock, 
  Calendar, 
  CalendarDays, 
  History, 
  Smile, 
  Meh, 
  Frown, 
  Syringe, 
  Gauge, 
  CheckCircle2, 
  CheckCircle,
  Flame, 
  Droplets, 
  TrendingDown, 
  Shuffle, 
  AlertCircle, 
  Droplet, 
  Moon, 
  CloudRain, 
  Zap,
  Leaf
} from 'lucide-react';
import { UI_STRINGS } from '../types/data';

// Map icon string names to Lucide icon components
const ICON_MAP = {
  Thermometer, Utensils, Wind, HeartPulse, Activity, BatteryLow, Clock, Calendar, 
  CalendarDays, History, Smile, Meh, Frown, Syringe, Gauge, CheckCircle2, CheckCircle,
  Flame, Droplets, TrendingDown, Shuffle, Check, AlertCircle, Droplet, Moon, CloudRain, Zap, Leaf
};

export default function ConversationScreen({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedLang,
  mode,
  onFinishIntake,
  onGoHome,
  isRedFlagActive,
  setIsRedFlagActive,
  speakText
}) {
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);

  const strings = UI_STRINGS[selectedLang] || UI_STRINGS.en;
  const currentQ = questions[currentQuestionIndex] || questions[0];
  const totalQuestions = questions.length;
  const currentStep = currentQuestionIndex + 1;

  // Speak question automatically when question changes
  useEffect(() => {
    const questionText = currentQ.question[selectedLang] || currentQ.question.en;
    speakText(questionText);
    // Reset listening animation
    setIsListening(true);
    setTranscript('');
  }, [currentQuestionIndex, selectedLang]);

  // Handle Touch Option Click
  const handleSelectOption = (option) => {
    const optionText = option.text[selectedLang] || option.text.en;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionText
    });
    setTranscript(optionText);

    // If this option triggers a clinical red flag
    if (option.isRedFlag) {
      setIsRedFlagActive(true);
      speakText(`${strings.redFlagTitle}. ${strings.redFlagDesc}`);
    } else {
      speakText(optionText);
    }
  };

  // Toggle voice listening
  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate hearing an answer if no speech API or quiet
      setTimeout(() => {
        if (!transcript) {
          const firstOpt = currentQ.options[0];
          const heard = firstOpt.text[selectedLang] || firstOpt.text.en;
          setTranscript(heard);
          setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: heard }));
        }
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onFinishIntake(selectedAnswers);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onGoHome();
    }
  };

  const handleRepeat = () => {
    const questionText = currentQ.question[selectedLang] || currentQ.question.en;
    speakText(questionText);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-140px)]">
      
      {/* 🚨 RED FLAG ALERT STATE (Top Slide-In Priority Banner) */}
      {isRedFlagActive && (
        <div className="mb-4 bg-red-600 text-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-red-300 animate-bounce-short transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white text-red-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <ShieldAlert className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <div className="inline-block bg-red-800 text-red-100 text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                  {strings.redFlagTitle}
                </div>
                <h2 className="text-xl sm:text-2xl font-black leading-snug">
                  {strings.redFlagDesc}
                </h2>
                <p className="text-sm text-red-100 font-semibold mt-1">
                  {strings.connectNurse} • Triage Priority Level 1 (Immediate)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsRedFlagActive(false)}
              className="self-end sm:self-center bg-red-800 hover:bg-red-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-red-400"
            >
              Dismiss / Test Reset
            </button>
          </div>
        </div>
      )}

      {/* Top Bar: Progress, Department, & Controls */}
      <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-sm flex items-center justify-between gap-4">
        {/* Step Indicator */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onGoHome}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            title="Return to Welcome"
          >
            <Home className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs font-extrabold text-kiosk-teal-800 uppercase tracking-wider">
              {currentQ.category || (mode === 'ayush' ? 'Dashavidha Pariksha' : 'Clinical History')}
            </div>
            <div className="text-base sm:text-lg font-black text-slate-900">
              {strings.step} {currentStep} {strings.of} {totalQuestions}
            </div>
          </div>
        </div>

        {/* Visual Progress Pills */}
        <div className="hidden sm:flex items-center gap-1.5 flex-1 max-w-xs mx-4">
          {questions.map((_, idx) => (
            <div 
              key={idx}
              className={`h-3 rounded-full flex-1 transition-all ${
                idx < currentStep ? 'bg-kiosk-teal-700' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Emergency Help / Nurse Call Button */}
        <button
          onClick={() => {
            setIsRedFlagActive(true);
            speakText(`${strings.redFlagTitle}. ${strings.redFlagDesc}`);
          }}
          className="min-h-[50px] px-3.5 sm:px-4 rounded-xl bg-rose-50 border-2 border-rose-300 hover:bg-rose-100 text-rose-800 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm"
          title="Emergency Help"
        >
          <PhoneCall className="w-4 h-4 text-rose-600 animate-pulse" />
          <span className="hidden sm:inline">{strings.nurseHelp}</span>
          <span className="sm:hidden">Help</span>
        </button>
      </div>

      {/* Center AI Avatar / Waveform & Main Question Card */}
      <div className="my-5 text-center space-y-4">
        
        {/* Animated Calming Voice Waveform Visualizer */}
        <div className="inline-flex items-center justify-center gap-1.5 bg-slate-900 text-teal-300 px-6 py-3 rounded-full shadow-inner border-2 border-slate-700">
          <div className="wave-bar w-1.5 bg-teal-400 rounded-full" style={{ animationDelay: '0.1s' }}></div>
          <div className="wave-bar w-1.5 bg-teal-300 rounded-full" style={{ animationDelay: '0.3s' }}></div>
          <div className="wave-bar w-1.5 bg-amber-400 rounded-full" style={{ animationDelay: '0.5s' }}></div>
          <div className="wave-bar w-1.5 bg-teal-300 rounded-full" style={{ animationDelay: '0.2s' }}></div>
          <div className="wave-bar w-1.5 bg-teal-400 rounded-full" style={{ animationDelay: '0.4s' }}></div>
          
          <span className="ml-3 text-xs sm:text-sm font-bold text-slate-100 tracking-wide">
            {isListening ? strings.listening : strings.speakNow}
          </span>
        </div>

        {/* Large High-Contrast Question Heading (WCAG AAA) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-md max-w-4xl mx-auto">
          {currentQ.pariksha && (
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              <Leaf className="w-3.5 h-3.5" />
              <span>AYUSH Assessment: {currentQ.pariksha}</span>
            </div>
          )}
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-snug">
            {currentQ.question[selectedLang] || currentQ.question.en}
          </h2>
        </div>
      </div>

      {/* Dual Input Area: Central Pulsing Microphone + Large Touch Answer Choices */}
      <div className="space-y-6 max-w-4xl mx-auto w-full">
        
        {/* Mode 1: Central Pulsing Voice Microphone Button (Touch Target >= 80px) */}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={toggleListening}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all shadow-xl active:scale-95 ${
              isListening
                ? 'bg-gradient-to-tr from-kiosk-amber-500 to-amber-600 text-slate-950 ring-8 ring-amber-200 animate-pulse border-4 border-amber-300'
                : 'bg-kiosk-teal-800 hover:bg-kiosk-teal-900 text-white ring-4 ring-teal-200 border-4 border-teal-700'
            }`}
            aria-label="Voice microphone input"
          >
            {isListening ? (
              <>
                <Mic className="w-10 h-10 sm:w-12 sm:h-12" />
                <span className="text-[10px] font-black uppercase tracking-wider mt-1">Speaking</span>
              </>
            ) : (
              <>
                <MicOff className="w-10 h-10 sm:w-12 sm:h-12" />
                <span className="text-[10px] font-black uppercase tracking-wider mt-1">Tap to speak</span>
              </>
            )}
          </button>
          <span className="text-xs font-bold text-slate-600 mt-2">
            {isListening ? "Listening... speak clearly" : "Tap microphone to speak your answer"}
          </span>
        </div>

        {/* Mode 2: Large Tappable Answer Choice Cards (Min 64px Height, Icon + Label) */}
        <div>
          <div className="text-center mb-3">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider bg-slate-200 px-3 py-1 rounded-full">
              — Or Tap an Option Below —
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((option) => {
              const IconComp = ICON_MAP[option.icon] || Activity;
              const optionLabel = option.text[selectedLang] || option.text.en;
              const isSelected = selectedAnswers[currentQ.id] === optionLabel;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  className={`min-h-[70px] px-5 py-4 rounded-2xl flex items-center justify-between border-3 text-left transition-all duration-150 ${
                    isSelected
                      ? 'bg-kiosk-teal-800 text-white border-kiosk-teal-950 shadow-lg ring-4 ring-teal-200 scale-101'
                      : option.isRedFlag
                        ? 'bg-red-50 text-red-950 border-red-300 hover:border-red-500 hover:bg-red-100 shadow-sm'
                        : 'bg-white text-slate-900 border-slate-300 hover:border-kiosk-teal-600 hover:bg-teal-50/50 shadow-sm'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected 
                        ? 'bg-teal-900 text-teal-200' 
                        : option.isRedFlag 
                          ? 'bg-red-200 text-red-800' 
                          : 'bg-slate-100 text-kiosk-teal-700'
                    }`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-base sm:text-lg font-bold block leading-snug">
                        {optionLabel}
                      </span>
                      {option.isRedFlag && (
                        <span className="text-xs font-extrabold text-red-600 flex items-center gap-1 mt-0.5">
                          <AlertTriangle className="w-3 h-3" /> Urgent Symptom
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                    isSelected 
                      ? 'bg-amber-400 border-amber-500 text-slate-950' 
                      : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Live Transcript Strip & Nav Controls */}
      <div className="mt-6 space-y-3">
        {/* Live Transcript Confirmation Strip */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-slate-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-kiosk-teal-800 flex items-center justify-center flex-shrink-0 font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mr-2">
                {strings.iHeard}
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900">
                {transcript || selectedAnswers[currentQ.id] || "..."}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {transcript && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" /> {strings.confirmAnswer}
              </span>
            )}
            <button
              onClick={() => {
                const manual = prompt('Type or amend what you said:', transcript);
                if (manual) {
                  setTranscript(manual);
                  setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: manual }));
                }
              }}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-200"
              title="Edit transcript"
            >
              <Edit3 className="w-4 h-4" />
              <span>{strings.editAnswer}</span>
            </button>
          </div>
        </div>

        {/* Bottom Actions: Repeat Question, Back, & Next/Continue */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="min-h-[60px] px-5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm sm:text-base flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{strings.back}</span>
            </button>

            <button
              onClick={handleRepeat}
              className="min-h-[60px] px-4 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-800 font-bold text-sm sm:text-base flex items-center gap-2 transition-colors shadow-sm"
              title="Listen to question again"
            >
              <Volume2 className="w-5 h-5 text-kiosk-teal-700" />
              <span className="hidden sm:inline">{strings.repeatQuestion}</span>
            </button>
          </div>

          {/* Primary Action Button (>=64px touch target) */}
          <button
            onClick={handleNext}
            className="min-h-[64px] px-8 rounded-2xl bg-kiosk-teal-800 hover:bg-kiosk-teal-900 text-white font-black text-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
          >
            <span>{currentQuestionIndex === totalQuestions - 1 ? strings.next : strings.next}</span>
            <ArrowRight className="w-6 h-6 text-teal-200" />
          </button>
        </div>
      </div>
    </div>
  );
}
