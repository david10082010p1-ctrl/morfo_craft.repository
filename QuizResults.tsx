import React, { useEffect } from 'react';
import { QuizResult } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { PROCESS_LABELS } from '../data/morphemesData';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Target, 
  BookOpen, 
  ChevronRight,
  Sparkles,
  BarChart3
} from 'lucide-react';

interface QuizResultsProps {
  result: QuizResult;
  onRestartQuiz: () => void;
  onGoToTheory: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  result,
  onRestartQuiz,
  onGoToTheory,
}) => {
  useEffect(() => {
    if (result.percentage >= 60) {
      soundFx.playFanfare();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result.percentage]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 pb-12 animate-fadeIn">
      
      {/* FINAL RESULT HERO CARD */}
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 border border-indigo-500/30 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex p-4 rounded-3xl bg-indigo-500/20 border border-indigo-500/40 text-amber-300 shadow-xl shadow-indigo-500/20">
            <Trophy className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Avaliação Concluída • {result.totalQuestions} Perguntas
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              {result.gradeTitle}
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
              {result.gradeDescription}
            </p>
          </div>

          {/* Big Score Display */}
          <div className="flex items-center justify-center gap-6 py-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 min-w-[140px]">
              <div className="text-3xl font-black text-indigo-400">
                {result.score} / {result.totalQuestions}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Acertos Totais</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 min-w-[140px]">
              <div className="text-3xl font-black text-emerald-400">
                {Math.round(result.percentage)}%
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Rendimento</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 min-w-[140px] hidden sm:block">
              <div className="text-3xl font-black text-amber-400">
                {Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Tempo Gasto</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                soundFx.playClick();
                onRestartQuiz();
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              Refazer Avaliação
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onGoToTheory();
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              Revisar Regras no Guia Teórico
            </button>
          </div>
        </div>
      </div>

      {/* TOPIC PROFICIENCY BREAKDOWN */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Desempenho por Tópico Gramatical</h3>
              <p className="text-xs text-slate-400">Diagnóstico pedagógico baseado nas regras da morfologia</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.topicBreakdown.map((topic, idx) => {
            const label = PROCESS_LABELS[topic.process];
            const isGood = topic.percentage >= 70;

            return (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">
                    {topic.processName}
                  </span>
                  <span className={`text-xs font-extrabold ${isGood ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {topic.correct} / {topic.total} ({Math.round(topic.percentage)}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      topic.percentage >= 80 ? 'bg-emerald-500' :
                      topic.percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 pt-1">
                  {topic.percentage === 100 ? 'Domínio excelente!' :
                   topic.percentage >= 50 ? 'Bom desempenho, vale uma breve revisão.' :
                   'Recomendado reforçar este conceito no Guia Teórico.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAILED QUESTION REVIEW */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Revisão Detalhada das 15 Perguntas</h3>
            <p className="text-xs text-slate-400">Confira cada resposta dada e aprenda com as explicações</p>
          </div>
        </div>

        <div className="space-y-4">
          {result.userAnswers.map((ans, idx) => {
            const question = QUIZ_QUESTIONS.find(q => q.id === ans.questionId)!;
            const selectedOpt = question.options.find(o => o.id === ans.selectedOptionId);
            const correctOpt = question.options.find(o => o.isCorrect);

            return (
              <div
                key={question.id}
                className={`p-5 rounded-2xl border transition-all ${
                  ans.isCorrect
                    ? 'bg-slate-950/80 border-emerald-500/30'
                    : 'bg-slate-950/80 border-rose-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {question.wordOrContext}
                    </h4>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                    ans.isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {ans.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correto
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Incorreto
                      </>
                    )}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-3">{question.questionText}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className={`p-2.5 rounded-xl border ${
                    ans.isCorrect ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                  }`}>
                    <strong>Sua Resposta:</strong> {selectedOpt?.text}
                  </div>

                  {!ans.isCorrect && (
                    <div className="p-2.5 rounded-xl border bg-emerald-950/30 border-emerald-500/30 text-emerald-300">
                      <strong>Gabarito Correto:</strong> {correctOpt?.text}
                    </div>
                  )}
                </div>

                <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-indigo-400">Explicação:</strong> {question.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
