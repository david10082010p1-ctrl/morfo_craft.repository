import React, { useState } from 'react';
import { MORPHEMES_DATABASE, WORDS_DATABASE, PROCESS_LABELS } from '../data/morphemesData';
import { FormationProcess } from '../types';
import { soundFx } from '../utils/audio';
import { Library, Search, Filter, BookOpen, Layers } from 'lucide-react';

export const MorphemeDictionary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcess, setSelectedProcess] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'words' | 'morphemes'>('words');

  // Filter words
  const filteredWords = WORDS_DATABASE.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          word.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProcess = selectedProcess === 'all' || word.process === selectedProcess;
    return matchesSearch && matchesProcess;
  });

  // Filter morphemes
  const filteredMorphemes = MORPHEMES_DATABASE.filter(m => {
    return m.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
           m.meaning.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-pink-950 to-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold mb-1">
            <Library className="w-4 h-4" />
            Banco de Dados de Morfemas & Palavras
          </div>
          <h2 className="text-2xl font-extrabold text-white">Dicionário de Formação de Palavras</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Explore os mais de 30 morfemas e palavras com suas decomposições completas, origens e explicações morfológicas.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              soundFx.playClick();
              setViewMode('words');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'words' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Palavras Formadas ({WORDS_DATABASE.length})
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setViewMode('morphemes');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'morphemes' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Morfemas Originais ({MORPHEMES_DATABASE.length})
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-slate-900/90 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row items-center gap-4">
        
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={viewMode === 'words' ? "Pesquisar por palavra ou explicação..." : "Pesquisar por morfema ou significado..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        {/* Process Filter */}
        {viewMode === 'words' && (
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedProcess}
              onChange={(e) => setSelectedProcess(e.target.value)}
              className="w-full md:w-auto bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-2.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-pink-500"
            >
              <option value="all">Todos os Processos</option>
              {Object.entries(PROCESS_LABELS).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* CONTENT GRID */}
      {viewMode === 'words' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWords.map(word => {
            const processInfo = PROCESS_LABELS[word.process];
            const wordMorphemes = word.morphemeIds.map(id => MORPHEMES_DATABASE.find(m => m.id === id)!);

            return (
              <div key={word.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-black text-white">{word.word}</h3>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${processInfo.badgeColor}`}>
                    {processInfo.name}
                  </span>
                </div>

                {/* Morpheme decomposition */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium mr-1">Estrutura:</span>
                  {wordMorphemes.map((m, idx) => (
                    <React.Fragment key={idx}>
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                        m.type === 'prefixo' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        m.type === 'radical' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                        'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      }`}>
                        {m.text}
                      </span>
                      {idx < wordMorphemes.length - 1 && <span className="text-slate-500 text-xs">+</span>}
                    </React.Fragment>
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  {word.explanation}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Classe: <strong className="text-slate-200">{word.grammaticalClass}</strong></span>
                  <span>Exemplo: <em className="text-slate-300">"{word.exampleSentence}"</em></span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMorphemes.map(morpheme => (
            <div key={morpheme.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  morpheme.type === 'prefixo' ? 'bg-amber-500/20 text-amber-300' :
                  morpheme.type === 'radical' ? 'bg-indigo-500/20 text-indigo-300' :
                  'bg-sky-500/20 text-sky-300'
                }`}>
                  {morpheme.type}
                </span>

                {morpheme.origin && (
                  <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    Origem: {morpheme.origin}
                  </span>
                )}
              </div>

              <div className="text-2xl font-black text-white">{morpheme.text}</div>
              <p className="text-xs text-slate-300">{morpheme.meaning}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
