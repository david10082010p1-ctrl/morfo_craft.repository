import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export const TheoryGuide: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-teal-400 text-sm font-semibold mb-1">
          <BookOpen className="w-4 h-4" />
          Guia Teórico para o Ensino Médio
        </div>
        <h2 className="text-2xl font-extrabold text-white">Processos de Formação de Palavras</h2>
        <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
          Resumo esquemático e prático das regras da morfologia para o Ensino Médio. Aprenda as diferenças cruciais entre Derivação, Composição e Hibridismo sem rodeios!
        </p>
      </div>

      {/* CORE RULE 1: DERIVAÇÃO */}
      <section className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            Conceito 01
          </span>
          <h3 className="text-xl font-extrabold text-white mt-2">1. Derivação (Apenas 1 Radical)</h3>
          <p className="text-xs text-slate-400 mt-0.5">A partir de uma palavra primitiva (com apenas 1 radical), criam-se novas palavras derivadas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Prefixal */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-300 text-sm">Derivação Prefixal</h4>
            <p className="text-slate-300">Adição de prefixo <strong>ANTES</strong> do radical.</p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-slate-200">
              in- + feliz → <strong>Infeliz</strong>
            </div>
          </div>

          {/* Sufixal */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sky-300 text-sm">Derivação Sufixal</h4>
            <p className="text-slate-300">Adição de sufixo <strong>DEPOIS</strong> do radical.</p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-slate-200">
              feliz + -mente → <strong>Felizmente</strong>
            </div>
          </div>

          {/* Prefixal e Sufixal */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-purple-300 text-sm">Prefixal e Sufixal (Independente)</h4>
            <p className="text-slate-300">Prefixo e sufixo são <strong>INDEPENDENTES</strong>. Se tirar um, o outro continua existindo no vocabulário.</p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-slate-200">
              in- + feliz + -mente → <strong>Infelizmente</strong> (Existem "infeliz" e "felizmente")
            </div>
          </div>

          {/* Parassintática */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/40 bg-rose-950/10 space-y-2">
            <h4 className="font-bold text-rose-300 text-sm">Derivação Parassintática (Simultânea)</h4>
            <p className="text-slate-300">Prefixo e sufixo são anexados <strong>SIMULTANEMENTE</strong>. Se retirar qualquer um, a palavra restante NÃO EXISTE!</p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-500/30 font-mono text-rose-200">
              a- + noite + -ecer → <strong>Anoitecer</strong> (NÃO existem *"anoite"* nem *"noitecer"*)
            </div>
          </div>

          {/* Regressiva */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-300 text-sm">Derivação Regressiva (Deverbal)</h4>
            <p className="text-slate-300">Criação de substantivo abstrato de ação reduzindo-se o verbo correspondente.</p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-slate-200">
              pescar → <strong>a pesca</strong> | debater → <strong>o debate</strong>
            </div>
          </div>

          {/* Imprópria */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-violet-300 text-sm">Derivação Imprópria (Conversão)</h4>
            <p className="text-slate-300">Mudança de classe gramatical no contexto sem alterar a grafia.</p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-slate-200">
              "O <strong>não</strong> foi doloroso." (advérbio virou substantivo)
            </div>
          </div>

        </div>

        {/* GOLDEN RULE HIGHLIGHT BOX */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 block text-sm">💡 Dica de Ouro para o ENEM e Vestibulares:</strong>
            Para diferenciar <em>Parassíntese</em> de <em>Prefixal e Sufixal</em>, tente cobrir o prefixo. Se a palavra restante for uma palavra que realmente existe na língua portuguesa (ex: Cobrir 'in-' de 'infelizmente' &rarr; 'felizmente' existe), é Prefixal e Sufixal. Se a palavra resultante não existir (ex: Cobrir 'a-' de 'anoitecer' &rarr; 'noitecer' não existe), é Parassintática!
          </div>
        </div>
      </section>

      {/* CORE RULE 2: COMPOSIÇÃO */}
      <section className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
            Conceito 02
          </span>
          <h3 className="text-xl font-extrabold text-white mt-2">2. Composição (2 ou Mais Radicais)</h3>
          <p className="text-xs text-slate-400 mt-0.5">Formação de novas palavras pela união de dois ou mais radicais.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Justaposição */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-2">
            <h4 className="font-bold text-teal-300 text-sm">Justaposição (SEM perda de som)</h4>
            <p className="text-slate-300 leading-relaxed">
              Os radicais juntam-se lado a lado sem perder nenhuma letra ou fonema original.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-slate-200 space-y-1">
              <p>• beija + flor = <strong>Beija-flor</strong></p>
              <p>• passa + tempo = <strong>Passatempo</strong></p>
              <p>• gira + sol = <strong>Girassol</strong> (dobrou o 's' apenas por ortografia)</p>
            </div>
          </div>

          {/* Aglutinação */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-orange-500/40 space-y-2">
            <h4 className="font-bold text-orange-300 text-sm">Aglutinação (COM alteração/perda sonora)</h4>
            <p className="text-slate-300 leading-relaxed">
              Pelo menos um dos radicais sofre alteração ou perda de letras/sons ao se fundirem.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-slate-200 space-y-1">
              <p>• plano + alto = <strong>Planalto</strong> (perdeu o 'o')</p>
              <p>• perna + alta = <strong>Pernalta</strong> (perdeu o 'a')</p>
              <p>• vinho + acre = <strong>Vinagre</strong> (alteração fonética profunda)</p>
            </div>
          </div>

        </div>
      </section>

      {/* CORE RULE 3: HIBRIDISMO */}
      <section className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            Conceito 03
          </span>
          <h3 className="text-xl font-extrabold text-white mt-2">3. Hibridismo</h3>
          <p className="text-xs text-slate-400 mt-0.5">Formação com radicais ou morfemas vindos de idiomas diferentes.</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-indigo-300 block mb-1">Sociologia</strong>
              <span className="text-slate-400">socio (Latim) + logia (Grego)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-indigo-300 block mb-1">Televisão</strong>
              <span className="text-slate-400">tele (Grego) + visão (Latim)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-indigo-300 block mb-1">Automóvel</strong>
              <span className="text-slate-400">auto (Grego) + móvel (Latim)</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
