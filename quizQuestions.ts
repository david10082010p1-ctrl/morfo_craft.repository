import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    wordOrContext: 'desfazer, Desleal, Subsolo',
    questionText: 'Qual é o processo de formação envolvido na criação das palavras "desfazer", "desleal" e "subsolo"?',
    processTested: 'derivacao_prefixal',
    explanation: 'Em todas essas palavras, houve o acréscimo de um prefixo ( des-, sub-) antes do radical de uma palavra já existente. Trata-se da Derivação Prefixal.',
    tip: 'Lembre-se: o prefixo é colocado ANTES do radical.',
    options: [
      { id: 'a', text: 'Derivação Sufixal', isCorrect: false },
      { id: 'b', text: 'Derivação Prefixal', isCorrect: true },
      { id: 'c', text: 'Derivação Parassintática', isCorrect: false },
      { id: 'd', text: 'Composição por Aglutinação', isCorrect: false }
    ]
  },
  {
    id: 2,
    wordOrContext: 'Lealdade, Pedreiro, Florista',
    questionText: 'Ao transformar "leal" em "lealdade" e "pedra" em "pedreiro", qual processo morfológico foi empregado?',
    processTested: 'derivacao_sufixal',
    explanation: 'Adicionou-se um sufixo (-dade, -eiro) APÓS o radical da palavra primitiva, caracterizando a Derivação Sufixal.',
    tip: 'O sufixo fica DEPOIS do radical e muitas vezes altera a classe gramatical.',
    options: [
      { id: 'a', text: 'Derivação Sufixal', isCorrect: true },
      { id: 'b', text: 'Derivação Prefixal', isCorrect: false },
      { id: 'c', text: 'Composição por Justaposição', isCorrect: false },
      { id: 'd', text: 'Hibridismo', isCorrect: false }
    ]
  },
  {
    id: 3,
    wordOrContext: 'Anoitecer e Envelhecer',
    questionText: 'Por que a palavra "anoitecer" é classificada como Derivação Parassintática e NÃO como Prefixal e Sufixal?',
    processTested: 'derivacao_parassintatica',
    explanation: 'Na parassíntese, o prefixo e o sufixo são anexados SIMULTANEAMENTE. Se retirarmos o prefixo "a-", a palavra *"noitecer"* não existe no português; da mesma forma, *"anoite"* como palavra primitiva não existe.',
    tip: 'Dica de ouro: Tente retirar o prefixo. Se a palavra resultante não existir no idioma, é Parassintática!',
    options: [
      { id: 'a', text: 'Porque possui apenas prefixo.', isCorrect: false },
      { id: 'b', text: 'Porque o prefixo e o sufixo foram anexados simultaneamente e dependentes (não existem "anoite" nem "noitecer").', isCorrect: true },
      { id: 'c', text: 'Porque não houve alteração no significado da palavra primitiva.', isCorrect: false },
      { id: 'd', text: 'Porque foi formada por junção de duas palavras estrangeiras.', isCorrect: false }
    ]
  },
  {
    id: 4,
    wordOrContext: 'Infelizmente vs Anoitecer',
    questionText: 'Diferente de "anoitecer", a palavra "infelizmente" é um exemplo de Derivação Prefixal e Sufixal. Qual o motivo?',
    processTested: 'derivacao_prefixal_sufixal',
    explanation: 'Em "infelizmente", o prefixo (in-) e o sufixo (-mente) são INDEPENDENTES. Se removermos o prefixo, sobra "felizmente" (palavra válida). Se removermos o sufixo, sobra "infeliz" (palavra válida).',
    tip: 'Se você puder remover um dos elementos e a palavra restante continuar existindo, é Prefixal e Sufixal!',
    options: [
      { id: 'a', text: 'Prefixos e sufixos atuam de forma independente (existem isoladamente "infeliz" e "felizmente").', isCorrect: true },
      { id: 'b', text: 'Houve perda de fonemas ao juntar os morfemas.', isCorrect: false },
      { id: 'c', text: 'É uma palavra composta derivada do latim e do grego.', isCorrect: false },
      { id: 'd', text: 'A palavra deriva de um verbo de ação.', isCorrect: false }
    ]
  },
  {
    id: 5,
    wordOrContext: 'O debate foi longo / A pesca começou cedo',
    questionText: 'Em "O debate foi longo" e "A pesca começou cedo", os substantivos "debate" e "pesca" derivam dos verbos "debater" e "pescar". Esse processo é chamado de:',
    processTested: 'derivacao_regressiva',
    explanation: 'Na Derivação Regressiva (ou Deverbal), um substantivo abstrato que indica ação é formado reduzindo-se a forma do verbo correspondente (debater -> debate, pescar -> pesca).',
    tip: 'Substantivo abstrato de ação formado a partir de verbo = Derivação Regressiva.',
    options: [
      { id: 'a', text: 'Derivação Imprópria', isCorrect: false },
      { id: 'b', text: 'Derivação Regressiva (Deverbal)', isCorrect: true },
      { id: 'c', text: 'Derivação Sufixal', isCorrect: false },
      { id: 'd', text: 'Composição por Aglutinação', isCorrect: false }
    ]
  },
  {
    id: 6,
    wordOrContext: '"O NÃO dos pais doeu no filho."',
    questionText: 'Na frase acima, a palavra "não" (originalmente um advérbio) funciona como um substantivo. Como se chama essa mudança de classe sem alterar a grafia da palavra?',
    processTested: 'derivacao_impropria',
    explanation: 'A Derivação Imprópria (ou Conversão) ocorre quando uma palavra muda de classe gramatical no contexto da frase sem sofrer nenhuma alteração em sua estrutura morfológica.',
    tip: 'Mesma palavra, nova classe gramatical no contexto = Derivação Imprópria.',
    options: [
      { id: 'a', text: 'Derivação Imprópria (Conversão)', isCorrect: true },
      { id: 'b', text: 'Derivação Regressiva', isCorrect: false },
      { id: 'c', text: 'Hibridismo', isCorrect: false },
      { id: 'd', text: 'Derivação Parassintática', isCorrect: false }
    ]
  },
  {
    id: 7,
    wordOrContext: 'Beija-flor, Guarda-chuva, Girassol',
    questionText: 'As palavras "beija-flor", "guarda-chuva" e "girassol" são compostas por qual processo?',
    processTested: 'composicao_justaposicao',
    explanation: 'Na Composição por Justaposição, dois ou mais radicais se unem sem que nenhum perca sua integridade sonora/fonética original (em "girassol", o "s" dobrado é apenas regra ortográfica).',
    tip: 'Justaposição = Lado a lado SEM perda de som/letras dos radicais originais.',
    options: [
      { id: 'a', text: 'Composição por Aglutinação', isCorrect: false },
      { id: 'b', text: 'Composição por Justaposição', isCorrect: true },
      { id: 'c', text: 'Hibridismo', isCorrect: false },
      { id: 'd', text: 'Derivação Prefixal', isCorrect: false }
    ]
  },
  {
    id: 8,
    wordOrContext: 'Planalto (Plano + Alto) e Pernalta (Perna + Alta)',
    questionText: 'Ao juntar "plano" + "alto" obtemos "planalto". Como houve perda fonética da vogal "o" de plano, esse processo de composição é:',
    processTested: 'composicao_aglutinacao',
    explanation: 'Na Composição por Aglutinação, a união dos radicais provoca a perda ou alteração de fonemas/letras de pelo menos um dos elementos originários.',
    tip: 'Aglutinação = Mistura com perda ou alteração fonética de elementos.',
    options: [
      { id: 'a', text: 'Composição por Justaposição', isCorrect: false },
      { id: 'b', text: 'Composição por Aglutinação', isCorrect: true },
      { id: 'c', text: 'Derivação Parassintática', isCorrect: false },
      { id: 'd', text: 'Abreviação Vocabular', isCorrect: false }
    ]
  },
  {
    id: 9,
    wordOrContext: 'Sociologia e Televisão',
    questionText: 'A palavra "Sociologia" une o radical latino "socius" ao sufixo grego "logia". Palavras formadas por morfemas de idiomas diferentes são frutos de:',
    processTested: 'hibridismo',
    explanation: 'O Hibridismo é o processo de formação de palavras em que se combinam elementos (morfemas) oriundos de línguas distintas (ex: Latim + Grego, Francês + Grego).',
    tip: 'Mistura de idiomas diferentes na mesma palavra = Hibridismo.',
    options: [
      { id: 'a', text: 'Hibridismo', isCorrect: true },
      { id: 'b', text: 'Neologismo', isCorrect: false },
      { id: 'c', text: 'Estrangeirismo puro', isCorrect: false },
      { id: 'd', text: 'Composição por Aglutinação', isCorrect: false }
    ]
  },
  {
    id: 10,
    wordOrContext: 'Empobrecer e Amadurecer',
    questionText: 'Identifique a opção que apresenta EXCLUSIVAMENTE palavras formadas por Parassíntese:',
    processTested: 'derivacao_parassintatica',
    explanation: 'Em "empobrecer" (em- + pobre + -ecer) e "amadurecer" (a- + maduro + -ecer), ambos os vocábulos exigem prefixo e sufixo simultâneos.',
    tip: 'Testar se a palavra existe sem o prefixo.',
    options: [
      { id: 'a', text: 'Infelizmente e Deslealdade', isCorrect: false },
      { id: 'b', text: 'Empobrecer e Amadurecer', isCorrect: true },
      { id: 'c', text: 'Beija-flor e Passatempo', isCorrect: false },
      { id: 'd', text: 'Planalto e Vinagre', isCorrect: false }
    ]
  },
  {
    id: 11,
    wordOrContext: 'Vinho + Acre = Vinagre',
    questionText: 'A palavra "vinagre" vem da junção do substantivo "vinho" com o adjetivo "acre" (azedo). Esse processo é classificado como:',
    processTested: 'composicao_aglutinacao',
    explanation: 'Houve a união de dois radicais com alteração sonora e estrutural profunda dos elementos originais, configurando Composição por Aglutinação.',
    tip: 'Mudança sonora perceptível entre os termos primitivos = Aglutinação.',
    options: [
      { id: 'a', text: 'Composição por Aglutinação', isCorrect: true },
      { id: 'b', text: 'Composição por Justaposição', isCorrect: false },
      { id: 'c', text: 'Derivação Regressiva', isCorrect: false },
      { id: 'd', text: 'Hibridismo', isCorrect: false }
    ]
  },
  {
    id: 12,
    wordOrContext: 'Busca (de buscar) / Canto (de cantar)',
    questionText: 'Assinale a alternativa em que a palavra destacada NÃO é formada por derivação regressiva:',
    processTested: 'derivacao_regressiva',
    explanation: 'Em "O vendedor ofereceu o produto", "vendedor" é formado por Derivação Sufixal (vender + -dor). Já "busca", "canto" e "venda" (substantivo) são deverbal regressivos.',
    tip: 'Fique atento: o sufixo "-dor" indica derivação sufixal de agente, não regressão!',
    options: [
      { id: 'a', text: 'A busca pelo livro foi intensa.', isCorrect: false },
      { id: 'b', text: 'O canto dos pássaros é suave.', isCorrect: false },
      { id: 'c', text: 'O vendedor ofereceu o produto.', isCorrect: true },
      { id: 'd', text: 'A venda foi concluída com sucesso.', isCorrect: false }
    ]
  },
  {
    id: 13,
    wordOrContext: 'Automóvel (Auto [grego] + Móvel [latim])',
    questionText: 'Qual das alternativas abaixo representa um caso típico de Hibridismo no português?',
    processTested: 'hibridismo',
    explanation: '"Burocracia" junta o francês "bureau" (escritório) com o grego "kratos/cracia" (poder), caracterizando hibridismo.',
    tip: 'Burocracia = bureau (francês) + cracia (grego).',
    options: [
      { id: 'a', text: 'Burocracia (bureau [francês] + cracia [grego])', isCorrect: true },
      { id: 'b', text: 'Passatempo (passa + tempo)', isCorrect: false },
      { id: 'c', text: 'Infeliz (in- + feliz)', isCorrect: false },
      { id: 'd', text: 'Livraria (livro + -aria)', isCorrect: false }
    ]
  },
  {
    id: 14,
    wordOrContext: 'Pancada (de panca) e Chuvada (de chuva)',
    questionText: 'Analisando os elementos mórficos de "pancada" e "chuvada", o sufixo "-ada" indica:',
    processTested: 'derivacao_sufixal',
    explanation: 'O sufixo "-ada" em "pancada" ou "chuvada" indica um golpe, ação coletiva ou intensidade através da Derivação Sufixal.',
    tip: 'Sufixos adicionam noções como intensidade, lugar, profissão ou coletivo.',
    options: [
      { id: 'a', text: 'Ação coletiva / intensidade via Derivação Sufixal.', isCorrect: true },
      { id: 'b', text: 'Negação do radical via Derivação Prefixal.', isCorrect: false },
      { id: 'c', text: 'Mudança de verbo para adjetivo via Aglutinação.', isCorrect: false },
      { id: 'd', text: 'Criação parassintética obrigatória.', isCorrect: false }
    ]
  },
  {
    id: 15,
    wordOrContext: 'Síntese de Morfologia',
    questionText: 'Assinale a alternativa correta sobre a diferença entre Composição e Derivação:',
    processTested: 'composicao_justaposicao',
    explanation: 'A Composição utiliza DOIS OU MAIS radicais (ex: guarda + chuva). A Derivação utiliza APENAS UM radical acrescido de afixos (prefixos/sufixos) ou com alterações de classe/forma.',
    tip: 'Número de radicais: Derivação = 1 radical; Composição = 2 ou mais radicais.',
    options: [
      { id: 'a', text: 'Na Composição há 2 ou mais radicais; na Derivação há apenas 1 radical.', isCorrect: true },
      { id: 'b', text: 'Na Derivação sempre ocorre perda sonora; na Composição nunca.', isCorrect: false },
      { id: 'c', text: 'A Composição só aceita termos em inglês.', isCorrect: false },
      { id: 'd', text: 'A Derivação Parassintática utiliza 3 radicais diferentes.', isCorrect: false }
    ]
  }
];