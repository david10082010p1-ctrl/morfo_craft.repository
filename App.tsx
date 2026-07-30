import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { PuzzleBoard } from './components/PuzzleBoard';
import { QuizView } from './components/QuizView';
import { MorphemeDictionary } from './components/MorphemeDictionary';
import { TheoryGuide } from './components/TheoryGuide';
import { WORDS_DATABASE } from './data/morphemesData';
import { soundFx } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('puzzle');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [discoveredWords, setDiscoveredWords] = useState<string[]>([]);

  // Load saved state from localStorage if available
  useEffect(() => {
    try {
      const savedDiscovered = localStorage.getItem('morfocraft_discovered');
      if (savedDiscovered) {
        setDiscoveredWords(JSON.parse(savedDiscovered));
      }
      const savedScore = localStorage.getItem('morfocraft_score');
      if (savedScore) {
        setScore(parseInt(savedScore, 10));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save discovered words and score
  useEffect(() => {
    try {
      localStorage.setItem('morfocraft_discovered', JSON.stringify(discoveredWords));
      localStorage.setItem('morfocraft_score', score.toString());
    } catch {
      // Ignore
    }
  }, [discoveredWords, score]);

  const handleQuizScoreAward = (points: number) => {
    setScore(prev => prev + points);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        score={score}
        streak={streak}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        discoveredCount={discoveredWords.length}
        totalWordsCount={WORDS_DATABASE.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'puzzle' && (
          <PuzzleBoard
            score={score}
            setScore={setScore}
            streak={streak}
            setStreak={setStreak}
            discoveredWords={discoveredWords}
            setDiscoveredWords={setDiscoveredWords}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onGoToTheory={() => setActiveTab('theory')}
            onQuizCompleteScore={handleQuizScoreAward}
          />
        )}

        {activeTab === 'dictionary' && (
          <MorphemeDictionary />
        )}

        {activeTab === 'theory' && (
          <TheoryGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            <strong className="text-indigo-400">Morfocraft</strong> — Jogo Digital Educativo de Língua Portuguesa para o Ensino Médio
          </p>
          <p className="text-slate-500">
            Morfologia • Derivação, Composição e Hibridismo
          </p>
        </div>
      </footer>

    </div>
  );
}
