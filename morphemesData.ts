import { Morpheme, WordDefinition, FormationProcess } from '../types';

export const PROCESS_LABELS: Record<FormationProcess, { name: string; color: string; badgeColor: string }> = {
  derivacao_prefixal: {
    name: 'Derivação Prefixal',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  derivacao_sufixal: {
    name: 'Derivação Sufixal',
    color: 'from-sky-500 to-blue-600',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
  },
  derivacao_prefixal_sufixal: {
    name: 'Derivação Prefixal e Sufixal',
    color: 'from-purple-500 to-indigo-600',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  derivacao_parassintatica: {
    name: 'Derivação Parassintática',
    color: 'from-rose-500 to-pink-600',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
  },
  derivacao_regressiva: {
    name: 'Derivação Regressiva (Deverbal)',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  derivacao_impropria: {
    name: 'Derivação Imprópria',
    color: 'from-violet-500 to-fuchsia-600',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-300'
  },
  composicao_justaposicao: {
    name: 'Composição por Justaposição',
    color: 'from-teal-500 to-cyan-600',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
  },
  composicao_aglutinacao: {
    name: 'Composição por Aglutinação',
    color: 'from-orange-500 to-red-600',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300'
  },
  hibridismo: {
    name: 'Hibridismo',
    color: 'from-indigo-500 to-purple-600',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  }
};

// Database of Morphemes (30+ morphemes: prefixes, roots, suffixes)
export const MORPHEMES_DATABASE: Morpheme[] = [
  // PREFIXOS
  { id: 'p_in', text: 'in-', type: 'prefixo', meaning: 'Negação, privação', origin: 'Latim' },
  { id: 'p_des', text: 'des-', type: 'prefixo', meaning: 'Ação contrária, negação', origin: 'Latim' },
  { id: 'p_re', text: 're-', type: 'prefixo', meaning: 'Repetição, intensidade', origin: 'Latim' },
  { id: 'p_a', text: 'a-', type: 'prefixo', meaning: 'Aproximação, transição de estado', origin: 'Latim/Grego' },
  { id: 'p_en', text: 'en-', type: 'prefixo', meaning: 'Mudança de estado, inserção', origin: 'Latim' },
  { id: 'p_em', text: 'em-', type: 'prefixo', meaning: 'Tornar-se, posição interior', origin: 'Latim' },
  { id: 'p_anti', text: 'anti-', type: 'prefixo', meaning: 'Oposição, contra', origin: 'Grego' },
  { id: 'p_pre', text: 'pre-', type: 'prefixo', meaning: 'Anterioridade, antes', origin: 'Latim' },
  { id: 'p_sub', text: 'sub-', type: 'prefixo', meaning: 'Abaixo, inferioridade', origin: 'Latim' },
  { id: 'p_es', text: 'es-', type: 'prefixo', meaning: 'Ação para fora, intensidade', origin: 'Latim' },
  { id: 'p_tele', text: 'tele-', type: 'prefixo', meaning: 'A distância, longe', origin: 'Grego' },
  { id: 'p_auto', text: 'auto-', type: 'prefixo', meaning: 'A si mesmo', origin: 'Grego' },

  // RADICAIS
  { id: 'r_feliz', text: 'feliz', type: 'radical', meaning: 'Contentamento, sorte', origin: 'Latim' },
  { id: 'r_leal', text: 'leal', type: 'radical', meaning: 'Fiel, honesto', origin: 'Latim' },
  { id: 'r_noite', text: 'noite', type: 'radical', meaning: 'Período noturno', origin: 'Latim' },
  { id: 'r_velho', text: 'velho', type: 'radical', meaning: 'Idoso, antigo', origin: 'Latim' },
  { id: 'r_pobre', text: 'pobre', type: 'radical', meaning: 'Sem recursos', origin: 'Latim' },
  { id: 'r_claro', text: 'claro', type: 'radical', meaning: 'Luminoso, evidente', origin: 'Latim' },
  { id: 'r_maduro', text: 'maduro', type: 'radical', meaning: 'Sazonado, pronto', origin: 'Latim' },
  { id: 'r_pedra', text: 'pedra', type: 'radical', meaning: 'Rocha, mineral', origin: 'Grego/Latim' },
  { id: 'r_flor', text: 'flor', type: 'radical', meaning: 'Estrutura reprodutiva vegetal', origin: 'Latim' },
  { id: 'r_livro', text: 'livro', type: 'radical', meaning: 'Obra impressa', origin: 'Latim' },
  { id: 'r_beija', text: 'beija', type: 'radical', meaning: 'Do verbo beijar', origin: 'Latim' },
  { id: 'r_passa', text: 'passa', type: 'radical', meaning: 'Do verbo passar', origin: 'Latim' },
  { id: 'r_tempo', text: 'tempo', type: 'radical', meaning: 'Duração, clima', origin: 'Latim' },
  { id: 'r_gira', text: 'gira', type: 'radical', meaning: 'Do verbo girar', origin: 'Latim' },
  { id: 'r_sol', text: 'sol', type: 'radical', meaning: 'Astro rei', origin: 'Latim' },
  { id: 'r_plano', text: 'plano', type: 'radical', meaning: 'Superfície reta', origin: 'Latim' },
  { id: 'r_alto', text: 'alto', type: 'radical', meaning: 'Elevado', origin: 'Latim' },
  { id: 'r_perna', text: 'perna', type: 'radical', meaning: 'Membro inferior', origin: 'Latim' },
  { id: 'r_vinho', text: 'vinho', type: 'radical', meaning: 'Bebida de uva', origin: 'Latim' },
  { id: 'r_acre', text: 'acre', type: 'radical', meaning: 'Azedo, picante', origin: 'Latim' },
  { id: 'r_socius', text: 'socio', type: 'radical', meaning: 'Sociedade, companheiro', origin: 'Latim' },
  { id: 'r_logia', text: 'logia', type: 'radical', meaning: 'Estudo, ciência', origin: 'Grego' },
  { id: 'r_visao', text: 'visão', type: 'radical', meaning: 'Ato de ver', origin: 'Latim' },
  { id: 'r_movel', text: 'móvel', type: 'radical', meaning: 'Que se move', origin: 'Latim' },
  { id: 'r_fazer', text: 'fazer', type: 'radical', meaning: 'Executar, criar', origin: 'Latim' },
  { id: 'r_corpo', text: 'corpo', type: 'radical', meaning: 'Massa física', origin: 'Latim' },
  { id: 'r_ver', text: 'ver', type: 'radical', meaning: 'Observar', origin: 'Latim' },
  { id: 'r_solo', text: 'solo', type: 'radical', meaning: 'Terra, chão', origin: 'Latim' },
  { id: 'r_calmo', text: 'calmo', type: 'radical', meaning: 'Tranquilo', origin: 'Latim' },
  { id: 'r_cantar', text: 'cantar', type: 'radical', meaning: 'Entoar música', origin: 'Latim' },
  { id: 'r_pescar', text: 'pescar', type: 'radical', meaning: 'Apanhar peixes', origin: 'Latim' },

  // SUFIXOS
  { id: 's_mente', text: '-mente', type: 'sufixo', meaning: 'Modo, maneira', origin: 'Latim' },
  { id: 's_dade', text: '-dade', type: 'sufixo', meaning: 'Qualidade, estado', origin: 'Latim' },
  { id: 's_ecer', text: '-ecer', type: 'sufixo', meaning: 'Início de ação ou estado', origin: 'Latim' },
  { id: 's_eiro', text: '-eiro', type: 'sufixo', meaning: 'Profissão, ocupação', origin: 'Latim' },
  { id: 's_ista', text: '-ista', type: 'sufixo', meaning: 'Ocupação, agente', origin: 'Grego' },
  { id: 's_aria', text: '-aria', type: 'sufixo', meaning: 'Lugar de comércio ou coleção', origin: 'Latim' },
  { id: 's_oso', text: '-oso', type: 'sufixo', meaning: 'Abundância, provido de', origin: 'Latim' },
  { id: 's_ar', text: '-ar', type: 'sufixo', meaning: 'Formador de verbo', origin: 'Latim' },
  { id: 's_acao', text: '-ção', type: 'sufixo', meaning: 'Ação ou resultado', origin: 'Latim' }
];

// Database of 30+ Valid Words formed by combinations of the morphemes above
export const WORDS_DATABASE: WordDefinition[] = [
  // DERIVAÇÃO PREFIXAL
  {
    id: 'w_infeliz',
    word: 'Infeliz',
    morphemeIds: ['p_in', 'r_feliz'],
    process: 'derivacao_prefixal',
    processName: 'Derivação Prefixal',
    explanation: 'Adicionou-se o prefixo de negação "in-" ao radical "feliz". A palavra "feliz" já existe autonomamente.',
    category: 'Derivação',
    grammaticalClass: 'Adjetivo',
    exampleSentence: 'Aquele resultado deixou o jogador infeliz.',
    difficulty: 'fácil'
  },
  {
    id: 'w_desleal',
    word: 'Desleal',
    morphemeIds: ['p_des', 'r_leal'],
    process: 'derivacao_prefixal',
    processName: 'Derivação Prefixal',
    explanation: 'Anexou-se o prefixo "des-" (negação/oposição) à palavra primitiva "leal".',
    category: 'Derivação',
    grammaticalClass: 'Adjetivo',
    exampleSentence: 'Trair um amigo é uma atitude desleal.',
    difficulty: 'fácil'
  },
  {
    id: 'w_refazer',
    word: 'Refazer',
    morphemeIds: ['p_re', 'r_fazer'],
    process: 'derivacao_prefixal',
    processName: 'Derivação Prefixal',
    explanation: 'Acréscimo do prefixo de repetição "re-" ao verbo "fazer".',
    category: 'Derivação',
    grammaticalClass: 'Verbo',
    exampleSentence: 'O aluno teve que refazer a redação.',
    difficulty: 'fácil'
  },
  {
    id: 'w_anticorpo',
    word: 'Anticorpo',
    morphemeIds: ['p_anti', 'r_corpo'],
    process: 'derivacao_prefixal',
    processName: 'Derivação Prefixal',
    explanation: 'Inclusão do prefixo grego "anti-" (contra) junto à palavra "corpo".',
    category: 'Derivação',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'A vacina estimula a produção de anticorpos.',
    difficulty: 'médio'
  },
  {
    id: 'w_prever',
    word: 'Prever',
    morphemeIds: ['p_pre', 'r_ver'],
    process: 'derivacao_prefixal',
    processName: 'Derivação Prefixal',
    explanation: 'Adição do prefixo "pre-" (antes) ao verbo "ver".',
    category: 'Derivação',
    grammaticalClass: 'Verbo',
    exampleSentence: 'É impossível prever o futuro com exatidão.',
    difficulty: 'fácil'
  },
  {
    id: 'w_subsolo',
    word: 'Subsolo',
    morphemeIds: ['p_sub', 'r_solo'],
    process: 'derivacao_prefixal',
    processName: 'Derivação Prefixal',
    explanation: 'Anexação do prefixo "sub-" (abaixo) ao substantivo "solo".',
    category: 'Derivação',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'O estacionamento fica no subsolo do shopping.',
    difficulty: 'fácil'
  },

  // DERIVAÇÃO SUFIXAL
  {
    id: 'w_felizmente',
    word: 'Felizmente',
    morphemeIds: ['r_feliz', 's_mente'],
    process: 'derivacao_sufixal',
    processName: 'Derivação Sufixal',
    explanation: 'Acrescentou-se o sufixo adverbial "-mente" ao adjetivo "feliz".',
    category: 'Derivação',
    grammaticalClass: 'Advérbio',
    exampleSentence: 'Felizmente, todos chegaram a tempo.',
    difficulty: 'fácil'
  },
  {
    id: 'w_lealdade',
    word: 'Lealdade',
    morphemeIds: ['r_leal', 's_dade'],
    process: 'derivacao_sufixal',
    processName: 'Derivação Sufixal',
    explanation: 'Anexou-se o sufixo "-dade" ao adjetivo "leal", transformando-o em um substantivo abstrato.',
    category: 'Derivação',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'A lealdade é uma virtude admirável.',
    difficulty: 'fácil'
  },
  {
    id: 'w_pedreiro',
    word: 'Pedreiro',
    morphemeIds: ['r_pedra', 's_eiro'],
    process: 'derivacao_sufixal',
    processName: 'Derivação Sufixal',
    explanation: 'Juntou-se o sufixo de profissão/agente "-eiro" ao radical de "pedra".',
    category: 'Derivação',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'O pedreiro construiu o muro com precisão.',
    difficulty: 'fácil'
  },
  {
    id: 'w_florista',
    word: 'Florista',
    morphemeIds: ['r_flor', 's_ista'],
    process: 'derivacao_sufixal',
    processName: 'Derivação Sufixal',
    explanation: 'Inclusão do sufixo "-ista" (ocupação) à palavra "flor".',
    category: 'Derivação',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'A florista preparou um belo buquê.',
    difficulty: 'fácil'
  },
  {
    id: 'w_livraria',
    word: 'Livraria',
    morphemeIds: ['r_livro', 's_aria'],
    process: 'derivacao_sufixal',
    processName: 'Derivação Sufixal',
    explanation: 'Acréscimo do sufixo "-aria" (lugar comercial) ao radical de "livro".',
    category: 'Derivação',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'Comprei um romance na livraria do centro.',
    difficulty: 'fácil'
  },

  // DERIVAÇÃO PREFIXAL E SUFIXAL
  {
    id: 'w_deslealdade',
    word: 'Deslealdade',
    morphemeIds: ['p_des', 'r_leal', 's_dade'],
    process: 'derivacao_prefixal_sufixal',
    processName: 'Derivação Prefixal e Sufixal',
    explanation: 'Prefixos e sufixos foram adicionados ao radical "leal" de forma independente. Se você retirar "des-", resta "lealdade" (palavra existente). Se retirar "-dade", resta "desleal" (palavra existente).',
    category: 'Derivação',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'A deslealdade acabou com a sociedade dos dois.',
    difficulty: 'difícil'
  },
  {
    id: 'w_infelizmente',
    word: 'Infelizmente',
    morphemeIds: ['p_in', 'r_feliz', 's_mente'],
    process: 'derivacao_prefixal_sufixal',
    processName: 'Derivação Prefixal e Sufixal',
    explanation: 'O prefixo "in-" e o sufixo "-mente" são independentes: existem tanto "infeliz" quanto "felizmente".',
    category: 'Derivação',
    grammaticalClass: 'Advérbio',
    exampleSentence: 'Infelizmente, o voo foi cancelado.',
    difficulty: 'médio'
  },

  // DERIVAÇÃO PARASSINTÁTICA
  {
    id: 'w_anoitecer',
    word: 'Anoitecer',
    morphemeIds: ['p_a', 'r_noite', 's_ecer'],
    process: 'derivacao_parassintatica',
    processName: 'Derivação Parassintática',
    explanation: 'O prefixo "a-" e o sufixo "-ecer" foram anexados SIMULTANEAMENTE ao radical "noite". Repare: não existem no português as palavras *"anoite"* nem *"noitecer"*.',
    category: 'Derivação',
    grammaticalClass: 'Verbo',
    exampleSentence: 'O céu ficou alaranjado ao anoitecer.',
    difficulty: 'difícil'
  },
  {
    id: 'w_envelhecer',
    word: 'Envelhecer',
    morphemeIds: ['p_en', 'r_velho', 's_ecer'],
    process: 'derivacao_parassintatica',
    processName: 'Derivação Parassintática',
    explanation: 'Anexação simultânea do prefixo "en-" e do sufixo "-ecer" a "velho". Não existem as formas *"envelho"* nem *"velhecer"*.',
    category: 'Derivação',
    grammaticalClass: 'Verbo',
    exampleSentence: 'Praticar esportes ajuda a envelhecer com saúde.',
    difficulty: 'difícil'
  },
  {
    id: 'w_empobrecer',
    word: 'Empobrecer',
    morphemeIds: ['p_em', 'r_pobre', 's_ecer'],
    process: 'derivacao_parassintatica',
    processName: 'Derivação Parassintática',
    explanation: 'Inclusão concomitante de "em-" e "-ecer" no radical "pobre". Sem um deles, a palavra perde o sentido no idioma (*"empobre"* ou *"pobrecer"* não existem).',
    category: 'Derivação',
    grammaticalClass: 'Verbo',
    exampleSentence: 'A crise financeira fez a população empobrecer.',
    difficulty: 'difícil'
  },
  {
    id: 'w_amadurecer',
    word: 'Amadurecer',
    morphemeIds: ['p_a', 'r_maduro', 's_ecer'],
    process: 'derivacao_parassintatica',
    processName: 'Derivação Parassintática',
    explanation: 'Juntou-se simultaneamente "a-" e "-ecer" a "maduro". Não existem *"amaduro"* nem *"madurecer"*.',
    category: 'Derivação',
    grammaticalClass: 'Verbo',
    exampleSentence: 'As frutas começaram a amadurecer no pé.',
    difficulty: 'difícil'
  },
  {
    id: 'w_esclarecer',
    word: 'Esclarecer',
    morphemeIds: ['p_es', 'r_claro', 's_ecer'],
    process: 'derivacao_parassintatica',
    processName: 'Derivação Parassintática',
    explanation: 'O prefixo "es-" e o sufixo "-ecer" atuam juntos sobre "claro" (*"esclaro"* e *"clarecer"* com essa forma não existem).',
    category: 'Derivação',
    grammaticalClass: 'Verbo',
    exampleSentence: 'O professor fez questão de esclarecer a dúvida.',
    difficulty: 'difícil'
  },
  {
    id: 'w_acalmar',
    word: 'Acalmar',
    morphemeIds: ['p_a', 'r_calmo', 's_ar'],
    process: 'derivacao_parassintatica',
    processName: 'Derivação Parassintática',
    explanation: 'O prefixo "a-" e o sufixo "-ar" foram anexados ao mesmo tempo sobre "calmo" (não existem *"acalmo"* como verbo nem *"calmar"* no vocabulário padrão).',
    category: 'Derivação',
    grammaticalClass: 'Verbo',
    exampleSentence: 'A música suave ajudou a acalmar o bebê.',
    difficulty: 'médio'
  },

  // COMPOSIÇÃO POR JUSTAPOSIÇÃO
  {
    id: 'w_beijaflor',
    word: 'Beija-flor',
    morphemeIds: ['r_beija', 'r_flor'],
    process: 'composicao_justaposicao',
    processName: 'Composição por Justaposição',
    explanation: 'União de dois radicais/palavras ("beija" + "flor") sem que nenhuma perca sua grafia ou som original.',
    category: 'Composição',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'O beija-flor visitou as orquídeas do jardim.',
    difficulty: 'fácil'
  },
  {
    id: 'w_passatempo',
    word: 'Passatempo',
    morphemeIds: ['r_passa', 'r_tempo'],
    process: 'composicao_justaposicao',
    processName: 'Composição por Justaposição',
    explanation: 'Junção dos radicais "passa" e "tempo" sem perda fonética.',
    category: 'Composição',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'A leitura é o meu passatempo favorito.',
    difficulty: 'fácil'
  },
  {
    id: 'w_girassol',
    word: 'Girassol',
    morphemeIds: ['r_gira', 'r_sol'],
    process: 'composicao_justaposicao',
    processName: 'Composição por Justaposição',
    explanation: 'Junção dos radicais "gira" e "sol". Nota: o acréscimo da letra "s" (giras+sol) serve apenas para manter o som forte de /s/, sem perder elementos fonéticos dos radicais originários.',
    category: 'Composição',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'O campo ficou amarelado com os girassóis.',
    difficulty: 'médio'
  },

  // COMPOSIÇÃO POR AGLUTINAÇÃO
  {
    id: 'w_planalto',
    word: 'Planalto',
    morphemeIds: ['r_plano', 'r_alto'],
    process: 'composicao_aglutinacao',
    processName: 'Composição por Aglutinação',
    explanation: 'Fusão de "plano" + "alto". Houve perda fonética da vogal "o" de plano (plano + alto = planalto).',
    category: 'Composição',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'O Palácio do Planalto fica em Brasília.',
    difficulty: 'médio'
  },
  {
    id: 'w_pernalta',
    word: 'Pernalta',
    morphemeIds: ['r_perna', 'r_alto'],
    process: 'composicao_aglutinacao',
    processName: 'Composição por Aglutinação',
    explanation: 'Fusão dos radicais "perna" + "alta", resultando na perda fonética do "a" de perna.',
    category: 'Composição',
    grammaticalClass: 'Adjetivo',
    exampleSentence: 'A garça é uma ave pernalta.',
    difficulty: 'médio'
  },
  {
    id: 'w_vinagre',
    word: 'Vinagre',
    morphemeIds: ['r_vinho', 'r_acre'],
    process: 'composicao_aglutinacao',
    processName: 'Composição por Aglutinação',
    explanation: 'Junção das palavras "vinho" + "acre" (azedo), com alteração e perda fonética acentuada ao longo da evolução.',
    category: 'Composição',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'Temperei a salada com vinagre de maçã.',
    difficulty: 'difícil'
  },

  // HIBRIDISMO
  {
    id: 'w_sociologia',
    word: 'Sociologia',
    morphemeIds: ['r_socius', 'r_logia'],
    process: 'hibridismo',
    processName: 'Hibridismo',
    explanation: 'Formada pela junção de elementos de idiomas diferentes: "socio" (do latim socius, companheiro) + "logia" (do grego logos, estudo).',
    category: 'Outros',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'A sociologia estuda os comportamentos sociais humanas.',
    difficulty: 'médio'
  },
  {
    id: 'w_televisao',
    word: 'Televisão',
    morphemeIds: ['p_tele', 'r_visao'],
    process: 'hibridismo',
    processName: 'Hibridismo',
    explanation: 'Mistura do elemento grego "tele-" (longe, a distância) com a palavra latina "visão" (do latim visio).',
    category: 'Outros',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'Assistimos ao telejornal na televisão.',
    difficulty: 'médio'
  },
  {
    id: 'w_automovel',
    word: 'Automóvel',
    morphemeIds: ['p_auto', 'r_movel'],
    process: 'hibridismo',
    processName: 'Hibridismo',
    explanation: 'Junção do radical grego "auto-" (por si mesmo) com o adjetivo latino "móvel" (do latim mobilis).',
    category: 'Outros',
    grammaticalClass: 'Substantivo',
    exampleSentence: 'O automóvel elétrico reduz a emissão de poluentes.',
    difficulty: 'médio'
  }
];
