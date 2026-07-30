import React from 'react';
import { ActiveTab } from '../types';
import { Puzzle, GraduationCap, BookOpen, Library, Award, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  score: number;
  streak: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  discoveredCount: number;
  totalWordsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  score,
  streak,
  soundEnabled,
  setSoundEnabled,
  discoveredCount,
  totalWordsCount,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    soundFx.enabled = next;
    setSoundEnabled(next);
    if (next) soundFx.playClick();
  };

  const handleTabChange = (tab: ActiveTab) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center justify-between">
            <div 
              onClick={() => handleTabChange('puzzle')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
                <Puzzle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                    Morfocraft
                  </h1>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                    Ensino Médio
                  </span>
                </div>
                <p className="text-xs text-slate-400">Processos de Formação de Palavras</p>
              </div>
            </div>

            {/* Mobile Sound Toggle */}
            <button
              onClick={toggleSound}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700"
              title={soundEnabled ? 'Silenciar Áudio' : 'Ativar Áudio'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
            <button
              onClick={() => handleTabChange('puzzle')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'puzzle'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Puzzle className="w-4 h-4" />
              Quebra-Cabeça
            </button>

            <button
              onClick={() => handleTabChange('quiz')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Teste de 15 Perguntas
            </button>

            <button
              onClick={() => handleTabChange('dictionary')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'dictionary'
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Library className="w-4 h-4" />
              Banco de Morfemas
            </button>

            <button
              onClick={() => handleTabChange('theory')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'theory'
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Guia Teórico
            </button>
          </nav>

          {/* Score, Streak & Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Word Discovery Counter */}
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-medium">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">Descobertas:</span>
              <span className="text-amber-400 font-bold">{discoveredCount}/{totalWordsCount}</span>
            </div>

            {/* Score Badge */}
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-medium">
              <Award className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-300">XP:</span>
              <span className="text-indigo-300 font-bold text-sm">{score}</span>
            </div>

            {/* Streak Combo */}
            {streak > 1 && (
              <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-xl text-xs font-bold animate-pulse">
                🔥 {streak}x Combo!
              </div>
            )}

            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              className="p-2 text-slate-300 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              title={soundEnabled ? 'Silenciar Sons' : 'Ativar Sons'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
