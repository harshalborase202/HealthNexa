import React, { useState } from 'react';
import Header from './components/Header';
import LanguageConsentScreen from './components/LanguageConsentScreen';
import ConversationScreen from './components/ConversationScreen';
import DocumentScanScreen from './components/DocumentScanScreen';
import SessionCompleteScreen from './components/SessionCompleteScreen';
import PhysicianDashboard from './components/PhysicianDashboard';
import { GENERAL_QUESTIONS, AYUSH_QUESTIONS, LANGUAGES } from './types/data';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1); // 1: Welcome, 2: Intake, 3: Scan, 4: Complete, 5: Doctor
  const [selectedLang, setSelectedLang] = useState('hi'); // Default Hindi for Indian Hospital context
  const [mode, setMode] = useState('ayush'); // 'ayush' or 'general'
  const [patientType, setPatientType] = useState('new'); // 'new' or 'returning'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRedFlagActive, setIsRedFlagActive] = useState(false);
  const [recordedAnswers, setRecordedAnswers] = useState({});

  const activeQuestions = mode === 'ayush' ? AYUSH_QUESTIONS : GENERAL_QUESTIONS;

  // Web Speech API Voice Guidance Synthesizer
  const speakText = (text) => {
    if (isMuted || !text) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any pending utterances
      const utterance = new SpeechSynthesisUtterance(text);
      const langConfig = LANGUAGES.find(l => l.id === selectedLang);
      if (langConfig) {
        utterance.lang = langConfig.voiceCode;
      }
      utterance.rate = 0.95; // Clearer for elderly listeners
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStart = () => {
    setCurrentQuestionIndex(0);
    setCurrentScreen(2);
  };

  const handleFinishIntake = (answers) => {
    setRecordedAnswers(answers);
    setCurrentScreen(3);
  };

  const handleCompleteDocs = () => {
    setCurrentScreen(4);
  };

  const handleSkipDocs = () => {
    setCurrentScreen(4);
  };

  const handleResetSession = () => {
    setCurrentScreen(1);
    setCurrentQuestionIndex(0);
    setIsRedFlagActive(false);
    setRecordedAnswers({});
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-teal-200">
      {/* Top Universal Header */}
      <Header
        currentScreen={currentScreen}
        setScreen={setCurrentScreen}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        mode={mode}
        setMode={setMode}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isRedFlagActive={isRedFlagActive}
        setIsRedFlagActive={setIsRedFlagActive}
      />

      {/* Screen Views */}
      <main className="flex-1">
        {currentScreen === 1 && (
          <LanguageConsentScreen
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            mode={mode}
            setMode={setMode}
            patientType={patientType}
            setPatientType={setPatientType}
            onStart={handleStart}
            speakText={speakText}
          />
        )}

        {currentScreen === 2 && (
          <ConversationScreen
            questions={activeQuestions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            selectedLang={selectedLang}
            mode={mode}
            onFinishIntake={handleFinishIntake}
            onGoHome={() => setCurrentScreen(1)}
            isRedFlagActive={isRedFlagActive}
            setIsRedFlagActive={setIsRedFlagActive}
            speakText={speakText}
          />
        )}

        {currentScreen === 3 && (
          <DocumentScanScreen
            selectedLang={selectedLang}
            onCompleteDocs={handleCompleteDocs}
            onSkipDocs={handleSkipDocs}
            speakText={speakText}
          />
        )}

        {currentScreen === 4 && (
          <SessionCompleteScreen
            selectedLang={selectedLang}
            mode={mode}
            onReset={handleResetSession}
            onOpenDoctorView={() => setCurrentScreen(5)}
            speakText={speakText}
          />
        )}

        {currentScreen === 5 && (
          <PhysicianDashboard
            onBackToKiosk={() => setCurrentScreen(1)}
            isRedFlagActive={isRedFlagActive}
          />
        )}
      </main>
    </div>
  );
}
