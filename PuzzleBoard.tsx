import React, { useState } from 'react';
import { Morpheme, WordDefinition, CombinationResult } from '../types';
import { MORPHEMES_DATABASE, WORDS_DATABASE, PROCESS_LABELS } from '../data/morphemesData';
import { soundFx } from '../utils/audio';
import { 
  Puzzle, 
  Sparkles, 
  RotateCcw, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  ChevronRight,
  HelpCircle,
  Trophy,
  ArrowRight
} from 'lucide-react';

interface PuzzleBoardProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
  discoveredWords: string[];
  setDiscoveredWords: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  score,
  setScore,
  streak,
  setStreak,
  discoveredWords,
  setDiscoveredWords,
}) => {
  // Slots for morphemes: [slot0, slot1, slot2]
  const [placedSlots, setPlacedSlots] = useState<(Morpheme | null)[]>([null, null, null]);
  const [activeFilter, setActiveFilter] = useState<'todos' | 'prefixo' | 'radical' | 'sufixo'>('todos');
  const [lastResult, setLastResult] = useState<CombinationResult | null>(null);
  const [hintText, setHintText] = useState<string | null>(null);

  // Filtered scattered morphemes
  const availableMorphemes = MORPHEMES_DATABASE.filter(m => {
    // Hide morpheme if currently placed in a slot
    const isPlaced = placedSlots.some(slot => slot?.id === m.id);
    if (isPlaced) return false;

    if (activeFilter === 'todos') return true;
    return m.type === activeFilter;
  });

  // Handle clicking a scattered morpheme to place in the first empty slot
  const handleSelectMorpheme = (morpheme: Morpheme) => {
    soundFx.playSnap();
    setHintText(null);
    setLastResult(null);

    const firstEmptyIndex = placedSlots.findIndex(slot => slot === null);
    if (firstEmptyIndex !== -1) {
      const newSlots = [...placedSlots];
      newSlots[firstEmptyIndex] = morpheme;
      setPlacedSlots(newSlots);
    }
  };

  // Handle clicking a placed slot to remove it back to scattered area
  const handleRemoveSlot = (index: number) => {
    soundFx.playClick();
    setHintText(null);
    setLastResult(null);
    const newSlots = [...placedSlots];
    newSlots[index] = null;
    setPlacedSlots(newSlots);
  };

  // Clear all slots
  const handleClearSlots = () => {
    soundFx.playClick();
    setPlacedSlots([null, null, null]);
    setLastResult(null);
    setHintText(null);
  };

  // Test the current morpheme combination
  const handleTestCombination = () => {
    const activeMorphemes = placedSlots.filter((m): m is Morpheme => m !== null);
    if (activeMorphemes.length === 0) {
      soundFx.playError();
      setLastResult({
        isValid: false,
        feedbackTitle: 'Nenhum Morfema Selecionado',
        feedbackMessage: 'Escolha pelo menos 2 morfemas abaixo para testar o encaixe e formar uma palavra!',
        pointsEarned: 0
      });
      return;
    }

    const currentIds = activeMorphemes.map(m => m.id);

    // Search for match in database
    const matchedWord = WORDS_DATABASE.find(w => {
      if (w.morphemeIds.length !== currentIds.length) return false;
      return w.morphemeIds.every((id, idx) => id === currentIds[idx]);
    });

    if (matchedWord) {
      // Valid Word
      soundFx.playSuccess();
      const isAlreadyDiscovered = discoveredWords.includes(matchedWord.id);
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      const comboMultiplier = Math.min(newStreak, 4);
      const points = isAlreadyDiscovered ? 25 : 100 * comboMultiplier;
      setScore(prev => prev + points);

      if (!isAlreadyDiscovered) {
        setDiscoveredWords(prev => [...prev, matchedWord.id]);
      }

      setLastResult({
        isValid: true,
        formedWord: matchedWord.word,
        wordData: matchedWord,
        process: matchedWord.process,
        feedbackTitle: isAlreadyDiscovered ? `Palavra Repetida: "${matchedWord.word}"` : `✨ Palavra Formada: "${matchedWord.word}"!`,
        feedbackMessage: matchedWord.explanation,
        pointsEarned: points
      });
    } else {
      // Invalid combination
      soundFx.playError();
      setStreak(0);

      // Simple pedagogical feedback explaining why it didn't form a valid word
      const types = activeMorphemes.map(m => m.type);
      let customExplanation = 'Essa combinação de morfemas não forma uma palavra registrada na Língua Portuguesa.';
      
      if (types.filter(t => t === 'prefixo').length > 1) {
        customExplanation = 'Atenção: você colocou mais de um prefixo seguido. Em geral, formamos palavras com 1 prefixo + radical + sufixo.';
      } else if (types.filter(t => t === 'sufixo').length > 1) {
        customExplanation = 'Atenção: você acumulou sufixos. Experimente unir um Prefixo + Radical + Sufixo ou dois Radicais.';
      } else if (!types.includes('radical')) {
        customExplanation = 'Toda palavra necessita de pelo menos um Radical (a base com o significado principal). Adicione um radical ao meio!';
      } else {
        customExplanation = `A junção dos morfemas "${activeMorphemes.map(m => m.text).join(' + ')}" não existe no vocabulário oficial. Experimente trocar o prefixo ou o sufixo!`;
      }

      setLastResult({
        isValid: false,
        feedbackTitle: 'Encaixe Inválido',
        feedbackMessage: customExplanation,
        pointsEarned: 0
      });
    }
  };

  // Generate a pedagogical hint
  const handleGiveHint = () => {
    soundFx.playClick();
    
    // Find a word from the database not yet discovered
    const undiscovered = WORDS_DATABASE.filter(w => !discoveredWords.includes(w.id));
    const targetWord = undiscovered.length > 0 
      ? undiscovered[Math.floor(Math.random() * undiscovered.length)]
      : WORDS_DATABASE[Math.floor(Math.random() * WORDS_DATABASE.length)];

    const firstMorphemeId = targetWord.morphemeIds[0];
    const firstMorpheme = MORPHEMES_DATABASE.find(m => m.id === firstMorphemeId);

    if (firstMorpheme) {
      setHintText(`Dica: Que tal começar selecionando o morfema "${firstMorpheme.text}" (${firstMorpheme.type}) para formar a palavra "${targetWord.word}" (${targetWord.processName})?`);
    }
  };

  // Get color styles based on morpheme type
  const getMorphemeStyle = (type: string) => {
    switch (type) {
      case 'prefixo':
        return 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400';
      case 'radical':
        return 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400';
      case 'sufixo':
        return 'bg-sky-500/10 border-sky-500/40 text-sky-300 hover:bg-sky-500/20 hover:border-sky-400';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-1">
              <Puzzle className="w-4 h-4" />
              Laboratório de Formação de Palavras
            </div>
            <h2 className="text-2xl font-extrabold text-white">Quebra-Cabeça de Morfemas</h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-1">
              Selecione e encaixe os morfemas (prefixos, radicais e sufixos) nas lacunas abaixo. Teste a combinação para descobrir o processo gramatical envolvido!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGiveHint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold transition-all shadow-sm"
            >
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Pedir Dica
            </button>
            <button
              onClick={handleClearSlots}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Limpar Lacunas
            </button>
          </div>
        </div>

        {/* Hint Display */}
        {hintText && (
          <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2.5 animate-fadeIn">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{hintText}</span>
          </div>
        )}
      </div>

      {/* PUZZLE SLOTS (Morfema Snapping Area) */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6 relative">
        <div className="text-center">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Área de Encaixe de Morfemas
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">Monte a sua Palavra</h3>
        </div>

        {/* 3 Interactive Slots with Puzzle Notch Visual Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {placedSlots.map((morpheme, index) => (
            <div
              key={index}
              onClick={() => morpheme && handleRemoveSlot(index)}
              className={`h-28 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-3 relative cursor-pointer group ${
                morpheme
                  ? 'border-indigo-500/80 bg-indigo-950/40 shadow-lg shadow-indigo-500/10 scale-102'
                  : 'border-slate-700/80 bg-slate-950/40 hover:border-slate-600'
              }`}
            >
              {/* Puzzle Tab Notch Graphic on the right side if not last slot */}
              {index < 2 && (
                <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="w-4 h-6 bg-slate-800 rounded-r-md border-r border-t border-b border-slate-700" />
                </div>
              )}

              {morpheme ? (
                <div className="text-center space-y-1 animate-scaleIn w-full">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    morpheme.type === 'prefixo' ? 'bg-amber-500/20 text-amber-300' :
                    morpheme.type === 'radical' ? 'bg-indigo-500/20 text-indigo-300' :
                    'bg-sky-500/20 text-sky-300'
                  }`}>
                    {morpheme.type}
                  </span>
                  <div className="text-2xl font-extrabold text-white tracking-wide">
                    {morpheme.text}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate max-w-[180px] mx-auto">
                    {morpheme.meaning}
                  </div>
                  <span className="text-[10px] text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity block font-medium">
                    (Clique para remover)
                  </span>
                </div>
              ) : (
                <div className="text-center text-slate-500 space-y-1">
                  <div className="w-8 h-8 rounded-full border border-dashed border-slate-700 flex items-center justify-center mx-auto text-xs font-bold text-slate-600">
                    {index + 1}
                  </div>
                  <span className="text-xs block font-medium">
                    {index === 0 ? 'Prefixo / Radical' : index === 1 ? 'Radical' : 'Sufixo / Radical'}
                  </span>
                  <span className="text-[10px] text-slate-600">Vazio</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Button: Test Combination */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleTestCombination}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white font-bold text-base shadow-xl shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Sparkles className="w-5 h-5" />
            Testar Encaixe de Morfemas
          </button>
        </div>

        {/* IMMEDIATE CLEAR FEEDBACK CARD */}
        {lastResult && (
          <div className={`mt-6 p-6 rounded-2xl border transition-all duration-300 animate-slideUp ${
            lastResult.isValid 
              ? 'bg-slate-900/90 border-emerald-500/50 shadow-xl shadow-emerald-500/10' 
              : 'bg-slate-900/90 border-rose-500/50 shadow-xl shadow-rose-500/10'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                lastResult.isValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {lastResult.isValid ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className={`text-lg font-bold ${lastResult.isValid ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {lastResult.feedbackTitle}
                  </h4>

                  {lastResult.pointsEarned > 0 && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                      +{lastResult.pointsEarned} XP
                    </span>
                  )}
                </div>

                {/* Process Badge */}
                {lastResult.process && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Processo de Formação:</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${PROCESS_LABELS[lastResult.process].badgeColor}`}>
                      {PROCESS_LABELS[lastResult.process].name}
                    </span>
                  </div>
                )}

                {/* Clear Pedagogical Explanation */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 text-sm leading-relaxed">
                  <p className="font-medium text-slate-300">{lastResult.feedbackMessage}</p>
                  
                  {lastResult.wordData && (
                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs space-y-1.5 text-slate-400">
                      <p><strong className="text-indigo-300">Classe Gramatical:</strong> {lastResult.wordData.grammaticalClass}</p>
                      <p><strong className="text-indigo-300">Exemplo de Uso:</strong> <em>"{lastResult.wordData.exampleSentence}"</em></p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SCATTERED MORPHEME TILES BOARD */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Puzzle className="w-5 h-5 text-indigo-400" />
              Morfemas Espalhados
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Clique em qualquer peça para encaixá-la na área de montagem.
            </p>
          </div>

          {/* Type Filters */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
            {(['todos', 'prefixo', 'radical', 'sufixo'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => {
                  soundFx.playClick();
                  setActiveFilter(filter);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  activeFilter === filter
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {filter === 'todos' ? 'Todos' : `${filter}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Scattered Morpheme Grid with floating CSS animations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
          {availableMorphemes.map((morpheme, idx) => (
            <div
              key={morpheme.id}
              onClick={() => handleSelectMorpheme(morpheme)}
              className={`p-3.5 rounded-2xl border-2 transition-all duration-300 cursor-pointer select-none group hover:scale-105 active:scale-95 shadow-md hover:shadow-lg relative overflow-hidden ${getMorphemeStyle(morpheme.type)}`}
              style={{
                // Subtle staggered float animation
                animation: `float ${3 + (idx % 3)}s ease-in-out infinite alternate`,
                animationDelay: `${(idx % 5) * 0.2}s`
              }}
            >
              {/* Type Badge */}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                  {morpheme.type}
                </span>
                {morpheme.origin && (
                  <span className="text-[9px] text-slate-400 bg-slate-900/60 px-1.5 py-0.5 rounded">
                    {morpheme.origin}
                  </span>
                )}
              </div>

              {/* Morpheme Text */}
              <div className="text-xl font-black tracking-tight text-white group-hover:text-indigo-200">
                {morpheme.text}
              </div>

              {/* Meaning */}
              <div className="text-[11px] opacity-75 mt-1 line-clamp-1 leading-tight">
                {morpheme.meaning}
              </div>

              <div className="mt-2 text-[10px] text-indigo-300 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Encaixar</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {availableMorphemes.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            Nenhum morfema disponível nesta categoria. Tente mudar o filtro!
          </div>
        )}
      </div>

      {/* DISCOVERED WORDS COLLECTION */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Coleção de Palavras Descobertas
            </h3>
            <p className="text-xs text-slate-400">
              Você já encontrou {discoveredWords.length} de {WORDS_DATABASE.length} palavras possíveis no jogo!
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
            {Math.round((discoveredWords.length / WORDS_DATABASE.length) * 100)}% Concluído
          </span>
        </div>

        {/* List of discovered words */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {WORDS_DATABASE.map(word => {
            const isFound = discoveredWords.includes(word.id);
            return (
              <div
                key={word.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isFound
                    ? 'bg-slate-950 border-indigo-500/40 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-600 opacity-60'
                }`}
              >
                {isFound ? (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base font-bold text-white">{word.word}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${PROCESS_LABELS[word.process].badgeColor}`}>
                        {PROCESS_LABELS[word.process].name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{word.explanation}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 py-1">
                    <HelpCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span className="text-xs font-medium italic text-slate-600">Palavra ainda não descoberta...</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
