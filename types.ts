export type MorphemeType = 'prefixo' | 'radical' | 'sufixo';

export type FormationProcess = 
  | 'derivacao_prefixal'
  | 'derivacao_sufixal'
  | 'derivacao_prefixal_sufixal'
  | 'derivacao_parassintatica'
  | 'derivacao_regressiva'
  | 'derivacao_impropria'
  | 'composicao_justaposicao'
  | 'composicao_aglutinacao'
  | 'hibridismo';

export interface Morpheme {
  id: string;
  text: string;
  type: MorphemeType;
  meaning: string;
  origin?: string; // e.g. "Latim", "Grego"
}

export interface WordDefinition {
  id: string;
  word: string;
  morphemeIds: string[]; // IDs of morphemes that combine to form this word
  process: FormationProcess;
  processName: string;
  explanation: string;
  category: 'Derivação' | 'Composição' | 'Outros';
  grammaticalClass: string;
  exampleSentence: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
}

export interface CombinationResult {
  isValid: boolean;
  formedWord?: string;
  wordData?: WordDefinition;
  feedbackTitle: string;
  feedbackMessage: string;
  process?: FormationProcess;
  pointsEarned: number;
}

export interface QuizQuestion {
  id: number;
  wordOrContext: string;
  questionText: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  processTested: FormationProcess;
  explanation: string;
  tip?: string;
}

export interface TopicPerformance {
  process: FormationProcess;
  processName: string;
  category: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  gradeTitle: string;
  gradeDescription: string;
  badge: string;
  topicBreakdown: TopicPerformance[];
  userAnswers: {
    questionId: number;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
}

export type ActiveTab = 'puzzle' | 'quiz' | 'dictionary' | 'theory';
