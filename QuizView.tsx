import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { QuizResult, TopicPerformance, FormationProcess } from '../types';
import { QuizResults } from './QuizResults';
import { soundFx } from '../utils/audio';
import { 
  GraduationCap, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Lightbulb, 
  Timer,
  RotateCcw
} from 'lucide-react';

interface QuizViewProps {
  onGoToTheory: () => void;
  onQuizCompleteScore: (points: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  onGoToTheory,
  onQuizCompleteScore,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{
    questionId: number;
    selectedOptionId: string;
    isCorrect: boolean;
  }[]>([]);
  
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [finalResult, setFinalResult] = useState<QuizResult | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Timer effect
  useEffect(() => {
    if (isQuizCompleted) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isQuizCompleted]);

  // Handle option click
  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    const option = currentQuestion.options.find(o => o.id === optionId);
    if (!option) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const isCorrect = option.isCorrect;
    if (isCorrect) {
      soundFx.playSuccess();
    } else {
      soundFx.playError();
    }

    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOptionId: optionId,
        isCorrect
      }
    ]);
  };

  // Advance to next question or finalize quiz
  const handleNextQuestion = () => {
    soundFx.playClick();

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      // Finalize Quiz!
      calculateAndFinishQuiz();
    }
  };

  // Calculate scores and topic breakdown
  const calculateAndFinishQuiz = () => {
    const totalCorrect = userAnswers.filter(a => a.isCorrect).length;
    const percentage = (totalCorrect / totalQuestions) * 100;

    // Build topic breakdown
    const processCounts: Record<FormationProcess, { total: number; correct: number; name: string }> = {
      derivacao_prefixal: { total: 0, correct: 0, name: 'Derivação Prefixal' },
      derivacao_sufixal: { total: 0, correct: 0, name: 'Derivação Sufixal' },
      derivacao_prefixal_sufixal: { total: 0, correct: 0, name: 'Derivação Prefixal e Sufixal' },
      derivacao_parassintatica: { total: 0, correct: 0, name: 'Derivação Parassintática' },
      derivacao_regressiva: { total: 0, correct: 0, name: 'Derivação Regressiva' },
      derivacao_impropria: { total: 0, correct: 0, name: 'Derivação Imprópria' },
      composicao_justaposicao: { total: 0, correct: 0, name: 'Composição por Justaposição' },
      composicao_aglutinacao: { total: 0, correct: 0, name: 'Composição por Aglutinação' },
      hibridismo: { total: 0, correct: 0, name: 'Hibridismo' }
    };

    userAnswers.forEach(ans => {
      const q = QUIZ_QUESTIONS.find(item => item.id === ans.questionId);
      if (q) {
        processCounts[q.processTested].total += 1;
        if (ans.isCorrect) {
          processCounts[q.processTested].correct += 1;
        }
      }
    });

    const topicBreakdown: TopicPerformance[] = Object.entries(processCounts)
      .filter(([_, data]) => data.total > 0)
      .map(([key, data]) => ({
        process: key as FormationProcess,
        processName: data.name,
        category: 'Morfologia',
        total: data.total,
        correct: data.correct,
        percentage: (data.correct / data.total) * 100
      }));

    // Titles & badges
    let gradeTitle = 'Aprendiz da Morfologia';
    let gradeDescription = 'Você demonstrou bons conhecimentos iniciais. Vale a pena revisar alguns conceitos no Guia Teórico para consolidar o aprendizado!';
    let badge = 'Iniciante Morfológico';

    if (percentage >= 90) {
      gradeTitle = '🏆 Mestre Absoluto da Morfologia';
      gradeDescription = 'Excelente! Você domina com perfeição todos os processos de formação de palavras no nível do Ensino Médio!';
      badge = 'Mestre Morfológico';
    } else if (percentage >= 70) {
      gradeTitle = '🥇 Especialista em Morfemas';
      gradeDescription = 'Ótimo desempenho! Você compreende claramente a diferença entre derivação e composição.';
      badge = 'Especialista';
    } else if (percentage >= 50) {
      gradeTitle = '🥈 Praticante Gramatical';
      gradeDescription = 'Bom resultado! Atente-se à diferença fina entre Parassíntese e Derivação Prefixal/Sufixal.';
      badge = 'Praticante';
    }

    const quizResult: QuizResult = {
      score: totalCorrect,
      totalQuestions,
      percentage,
      timeSpentSeconds: timerSeconds,
      gradeTitle,
      gradeDescription,
      badge,
      topicBreakdown,
      userAnswers
    };

    setFinalResult(quizResult);
    setIsQuizCompleted(true);
    onQuizCompleteScore(totalCorrect * 50); // Award XP
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setTimerSeconds(0);
    setIsQuizCompleted(false);
    setFinalResult(null);
  };

  if (isQuizCompleted && finalResult) {
    return (
      <QuizResults
        result={finalResult}
        onRestartQuiz={handleRestart}
        onGoToTheory={onGoToTheory}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Top Bar with Progress */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
          <div className="flex items-center gap-2 text-purple-400">
            <GraduationCap className="w-5 h-5" />
            <span>Avaliação de Aprendizado • Ensino Médio</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-xl">
              <Timer className="w-3.5 h-3.5 text-indigo-400" />
              <span>{Math.floor(timerSeconds / 60)}m {timerSeconds % 60}s</span>
            </div>

            <span className="text-purple-300 font-bold">
              Pergunta {currentQuestionIndex + 1} de {totalQuestions}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        
        {/* Context / Word Badge */}
        <div className="inline-block px-3.5 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          Contexto: {currentQuestion.wordOrContext}
        </div>

        {/* Question Text */}
        <h3 className="text-xl font-bold text-white leading-relaxed">
          {currentQuestion.questionText}
        </h3>

        {/* Options Grid */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map(option => {
            const isSelected = selectedOptionId === option.id;
            let optionStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';

            if (isAnswered) {
              if (option.isCorrect) {
                optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium shadow-lg shadow-emerald-500/10';
              } else if (isSelected) {
                optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 font-medium';
              } else {
                optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-50';
              }
            } else if (isSelected) {
              optionStyle = 'bg-indigo-950/80 border-indigo-500 text-white font-medium';
            }

            return (
              <button
                key={option.id}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 text-sm ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold shrink-0 text-indigo-400 uppercase">
                    {option.id}
                  </span>
                  <span>{option.text}</span>
                </div>

                {isAnswered && option.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !option.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* IMMEDIATE RATIONALE & EXPLANATION CARD */}
        {isAnswered && (
          <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 text-xs space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Explicação Gramatical:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentQuestion.explanation}
            </p>
            {currentQuestion.tip && (
              <p className="text-amber-300/90 pt-1 border-t border-slate-800/80 font-medium">
                💡 {currentQuestion.tip}
              </p>
            )}
          </div>
        )}

        {/* Next Question Button */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
            >
              <span>{currentQuestionIndex < totalQuestions - 1 ? 'Próxima Pergunta' : 'Ver Resultado Final'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
