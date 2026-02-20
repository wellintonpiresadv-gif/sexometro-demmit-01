/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Info, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Constants & Data ---

const HEALTH_MESSAGES = [
  "Dia 1: Queda nos níveis de ocitocina pós-ato. Risco de irritabilidade leve.",
  "Dia 2: Acúmulo de tensão. O sistema nervoso sente a falta de relaxamento.",
  "Dia 3: Aumento da irritabilidade e impaciência. Pico de testosterona em curso.",
  "Dia 4: Inquietação motora. Dificuldade leve em manter o foco.",
  "Dia 5: Acúmulo de tensão na região pélvica. Alerta de reatividade alta.",
  "Dia 6: Tensão muscular pélvica. Energia não canalizada gera estresse.",
  "Dia 7: Aumento do cortisol (estresse) por falta de escape. Vigor instável.",
  "Dia 8: Insônia leve. O cérebro busca picos de dopamina compensatórios.",
  "Dia 9: Névoa mental. A energia não transmutada causa confusão.",
  "Dia 10: Sistema imune menos ativo (queda de IgA). Alerta de saúde.",
  "Dia 11: Congestão pélvica. Sensação de peso e desconforto lombar.",
  "Dia 12: Ansiedade latente. O sistema de recompensa em abstinência.",
  "Dia 13: Flutuação de libido. Risco de perda de interesse súbito.",
  "Dia 14: Dificuldade maior em pegar no sono. Déficit de descanso profundo.",
  "Dia 15: Sono fragmentado. O corpo exige renovação biológica.",
  "Dia 16: Irritabilidade crônica. Reações desproporcionais a problemas.",
  "Dia 17: Queda na Imunidade: Estresse prolongado enfraquece as defesas.",
  "Dia 18: Bloqueio criativo. Mente obcecada por desejos básicos.",
  "Dia 19: Fadiga adrenal. Gasto excessivo de energia na gestão da tensão.",
  "Dia 20: Risco de sonhos eróticos e polução noturna. Alerta biológico.",
  "Dia 21: Perda de foco. Dificuldade extrema em tarefas de paciência.",
  "Dia 22: Instabilidade emocional. Crises de mau humor sem causa.",
  "Dia 23: Metabolismo lento. O corpo entra em modo de conservação.",
  "Dia 24: Tensão Crônica: Dores de cabeça e rigidez no pescoço.",
  "Dia 25: Isolamento social. Tendência ao afastamento por falta de empatia.",
  "Dia 26: Envelhecimento celular. Aumento do estresse oxidativo.",
  "Dia 27: Desequilíbrio químico. Neurotransmissores em nível crítico.",
  "Dia 28: Visão pessimista. Foco exclusivo em problemas e falhas.",
  "Dia 29: Desconexão total. Risco de apatia severa e perda de vitalidade.",
  "Dia 30: Risco de atrofia parcial da libido (desuso). Alerta de próstata.",
  "Dia 31: Alerta Máximo: Seu corpo exige renovação biológica imediata."
];

// --- Components ---

const LedDigit = ({ value, ...props }: { value: string; [key: string]: any }) => (
  <div className="bg-black border-2 border-zinc-800 rounded p-1 w-10 h-14 flex items-center justify-center shadow-inner" {...props}>
    <span className="font-mono text-3xl text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
      {value}
    </span>
  </div>
);

const Scoreboard = ({ count }: { count: number }) => {
  const digits = count.toString().padStart(3, '0').split('');
  return (
    <div className="flex flex-col items-end gap-1">
      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sim / Mês</span>
      <div className="flex gap-1 bg-zinc-900 p-2 rounded-lg border border-zinc-700 shadow-2xl">
        {digits.map((d, i) => <LedDigit key={i} value={d} />)}
      </div>
    </div>
  );
};

const DayCard = ({ 
  day, 
  status, 
  streak, 
  isToday,
  onAction 
}: { 
  day: number; 
  status: 'yes' | 'no' | null; 
  streak: number;
  isToday: boolean;
  onAction: (status: 'yes' | 'no') => void;
}) => {
  const isFlipped = status === 'no';

  return (
    <div className="relative w-full aspect-square perspective-1000">
      <motion.div
        className="w-full h-full transition-all duration-500 preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className={`absolute inset-0 backface-hidden rounded-xl shadow-sm border flex flex-col p-2 transition-colors ${
          isToday ? 'bg-zinc-100 border-zinc-300 ring-2 ring-zinc-200' : 'bg-white border-zinc-100'
        }`}>
          {isToday && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-rose-500 text-[7px] font-black text-white px-1.5 py-0.5 rounded-full shadow-lg animate-pulse uppercase tracking-tighter">
                Hoje
              </div>
            </div>
          )}
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-bold ${isToday ? 'text-zinc-900' : 'text-zinc-400'}`}>
              {day}
            </span>
            {status === 'yes' && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <Check className="w-4 h-4 text-emerald-500" />
              </motion.div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col gap-1 justify-center">
            <button
              onClick={() => onAction('yes')}
              className={`flex-1 flex items-center justify-center rounded-lg transition-colors ${
                status === 'yes' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
              }`}
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={() => onAction('no')}
              className={`flex-1 flex items-center justify-center rounded-lg transition-colors ${
                status === 'no' ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Back Side (Health Info) */}
        <div 
          className="absolute inset-0 backface-hidden bg-zinc-900 rounded-xl shadow-xl border border-rose-900/50 flex flex-col p-3 rotate-y-180"
          onClick={() => onAction('yes')} 
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-tighter">Alerta de Saúde</span>
            <Info className="w-3 h-3 text-rose-500 animate-pulse" />
          </div>
          <div className="flex-1 overflow-y-auto">
            <p className="text-[11px] leading-tight text-rose-100 font-bold">
              {HEALTH_MESSAGES[Math.min(streak - 1, 30)]}
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-rose-900/50 text-center">
            <span className="text-[9px] text-rose-500 font-mono font-black">Risco Nível: {streak}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

const StatusCard = ({ streak, type }: { streak: number; type: 'yes' | 'no' | null }) => {
  const getDetailedAnalysis = () => {
    if (type === 'no') {
      if (streak <= 1) return { 
        status: "Fase de Reajuste", 
        mood: "Oscilante", 
        fisiologia: "Queda nos níveis de ocitocina pós-ato. O corpo inicia a privação de endorfinas habituais.",
        psicologia: "Pico de relaxamento e sono profundo, mas com início de quebra de hábito dopaminérgico.",
        planoAcao: [
          "Evite gatilhos visuais imediatos.",
          "Beba água extra para auxiliar o sistema linfático.",
          "Priorize o descanso reparador."
        ],
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        accent: "bg-blue-600"
      };
      if (streak <= 3) return { 
        status: "Alerta de Irritabilidade", 
        mood: "Impaciente", 
        fisiologia: "Aumento da irritabilidade e impaciência. O sistema nervoso busca recompensas rápidas.",
        psicologia: "Pico natural de testosterona em andamento (máximo em 7 dias). Autocontrole em teste.",
        planoAcao: [
          "Pratique 5 min de respiração consciente.",
          "Canalize a energia em tarefas produtivas rápidas.",
          "Mantenha o foco no objetivo de longo prazo."
        ],
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        accent: "bg-amber-600"
      };
      if (streak <= 6) return { 
        status: "Tensão Pélvica", 
        mood: "Energético / Tenso", 
        fisiologia: "Acúmulo de tensão na região pélvica. O corpo retém energia não canalizada.",
        psicologia: "Melhora no foco para atividades físicas e treinos pesados. Use essa força.",
        planoAcao: [
          "Intensifique treinos de perna ou core.",
          "Evite ficar sentado por períodos muito longos.",
          "Use a energia para resolver problemas complexos."
        ],
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
        accent: "bg-orange-600"
      };
      if (streak <= 9) return { 
        status: "Pico de Cortisol", 
        mood: "Estressado", 
        fisiologia: "Aumento do cortisol (estresse) por falta de escape. Estabilização da testosterona em níveis altos.",
        psicologia: "Maior vigor físico, mas com risco de reatividade emocional alta.",
        planoAcao: [
          "Pratique meditação ou yoga para baixar o cortisol.",
          "Evite cafeína em excesso hoje.",
          "Busque ambientes calmos e silenciosos."
        ],
        color: "text-rose-600",
        bg: "bg-rose-50",
        border: "border-rose-200",
        accent: "bg-rose-600"
      };
      if (streak <= 13) return { 
        status: "Alerta Imunológico", 
        mood: "Focado / Analítico", 
        fisiologia: "Sistema imune menos ativo (queda de IgA). Aumento da clareza mental por ausência de 'névoa'.",
        psicologia: "Capacidade analítica no ápice. Menos distrações sexuais intrusivas.",
        planoAcao: [
          "Reforce a ingestão de Vitamina C e Zinco.",
          "Aproveite para estudar ou planejar projetos.",
          "Mantenha a higiene do sono rigorosa."
        ],
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        accent: "bg-indigo-600"
      };
      if (streak <= 19) return { 
        status: "Déficit de Sono", 
        mood: "Determinado", 
        fisiologia: "Dificuldade maior em pegar no sono. Economia de energia física; maior disposição matinal.",
        psicologia: "Sensação de prontidão constante. O cérebro está altamente alerta.",
        planoAcao: [
          "Crie um ritual de desligamento digital 2h antes de dormir.",
          "Use a disposição matinal para as tarefas mais difíceis.",
          "Evite telas azuis à noite."
        ],
        color: "text-cyan-600",
        bg: "bg-cyan-50",
        border: "border-cyan-200",
        accent: "bg-cyan-600"
      };
      if (streak <= 29) return { 
        status: "Risco de Polução", 
        mood: "Disciplinado", 
        fisiologia: "Risco de sonhos eróticos e polução noturna. O corpo busca alívio biológico automático.",
        psicologia: "Desenvolvimento de maior autocontrole e disciplina mental profunda.",
        planoAcao: [
          "Esvazie a bexiga antes de dormir.",
          "Mantenha pensamentos limpos antes do sono.",
          "Pratique exercícios de Kegel para controle pélvico."
        ],
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
        accent: "bg-purple-600"
      };
      return { 
        status: "Risco de Atrofia", 
        mood: "Zen / Pleno", 
        fisiologia: "Risco de atrofia parcial da libido (desuso). Reestabilização total dos receptores de dopamina.",
        psicologia: "Clareza absoluta, mas com risco de desapego excessivo da vitalidade sexual.",
        planoAcao: [
          "Monitore a saúde da próstata.",
          "Reconecte-se com sua energia vital de forma consciente.",
          "Consulte um especialista se sentir apatia prolongada."
        ],
        color: "text-slate-600",
        bg: "bg-slate-50",
        border: "border-slate-200",
        accent: "bg-slate-600"
      };
    } else if (type === 'yes') {
      return { 
        status: "Reset Hormonal", 
        mood: "Saciado / Calmo", 
        fisiologia: "Liberação de ocitocina e prolactina. Queda temporária na testosterona livre e energia agressiva.",
        psicologia: "Pico de relaxamento e sono profundo. Redução imediata de ansiedade e tensão.",
        planoAcao: [
          "Aproveite para uma noite de sono longa.",
          "Evite tarefas de alta performance nas próximas horas.",
          "Hidrate-se para repor minerais."
        ],
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        accent: "bg-emerald-600"
      };
    }
    return { 
      status: "Aguardando Registro", 
      mood: "Indefinido", 
      fisiologia: "Seu perfil fisiológico será traçado assim que você registrar a atividade do dia.",
      psicologia: "O estado mental é influenciado diretamente pelos ciclos hormonais que monitoramos aqui.",
      planoAcao: [
        "Selecione 'Sim' ou 'Não' no calendário abaixo.",
        "Seja honesto consigo mesmo para dados precisos.",
        "Acompanhe diariamente para ver a evolução."
      ],
      color: "text-zinc-400",
      bg: "bg-white",
      border: "border-zinc-200",
      accent: "bg-zinc-400"
    };
  };

  const data = getDetailedAnalysis();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`mb-8 rounded-3xl border-2 ${data.border} ${data.bg} shadow-lg overflow-hidden`}
    >
      {/* Header da Ficha */}
      <div className={`${data.accent} p-4 text-white flex justify-between items-center`}>
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Ficha de Análise Bio-Psicossomática</h3>
          <p className="text-lg font-black tracking-tight">{data.status}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-[10px] font-bold uppercase">Humor: {data.mood}</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Fisiologia */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-1 h-3 rounded-full bg-rose-600`} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500">Risco Fisiológico</h4>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed font-medium">{data.fisiologia}</p>
        </section>

        {/* Psicologia */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-1 h-3 rounded-full bg-rose-600`} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500">Alerta Psicológico</h4>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed font-medium">{data.psicologia}</p>
        </section>

        {/* Plano de Ação */}
        <section className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100">
          <div className="flex items-center gap-2 mb-3">
            <Info className={`w-3 h-3 text-rose-600`} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-700">Medidas de Mitigação</h4>
          </div>
          <ul className="space-y-2">
            {data.planoAcao.map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[11px] text-zinc-700 font-semibold">
                <span className={`text-rose-600 mt-0.5`}>⚠</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeAnalysisDate, setActiveAnalysisDate] = useState<string>(() => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  });
  
  const [history, setHistory] = useState<Record<string, 'yes' | 'no'>>(() => {
    const saved = localStorage.getItem('sexometro_history');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('sexometro_history', JSON.stringify(history));
  }, [history]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthName = currentDate.toLocaleString('pt-BR', { month: 'long' });

  const handleAction = (day: number, status: 'yes' | 'no') => {
    const dateKey = `${year}-${month + 1}-${day}`;
    setHistory(prev => ({
      ...prev,
      [dateKey]: status
    }));
    setActiveAnalysisDate(dateKey);
  };

  const calculateStreak = (day: number, targetMonth: number, targetYear: number) => {
    let streak = 0;
    let checkDate = new Date(targetYear, targetMonth, day);
    const initialStatus = history[`${targetYear}-${targetMonth + 1}-${day}`];
    
    if (!initialStatus) return 0;

    while (true) {
      const key = `${checkDate.getFullYear()}-${checkDate.getMonth() + 1}-${checkDate.getDate()}`;
      if (history[key] === initialStatus) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  // Get status for the analysis card based on the last clicked date
  const [aYear, aMonth, aDay] = activeAnalysisDate.split('-').map(Number);
  const analysisStatus = history[activeAnalysisDate] || null;
  const analysisStreak = analysisStatus ? calculateStreak(aDay, aMonth - 1, aYear) : 0;

  const monthlyYesCount = useMemo(() => {
    return Object.entries(history).filter(([key, val]) => {
      const [y, m] = key.split('-').map(Number);
      return val === 'yes' && y === year && m === month + 1;
    }).length;
  }, [history, year, month]);

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans pb-10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-6 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter text-zinc-900 flex items-center gap-2">
            SEXÔMETRO <span className="text-rose-500">.</span>
          </h1>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Controle de Saúde</p>
        </div>
        <Scoreboard count={monthlyYesCount} />
      </header>

      <main className="max-w-md mx-auto px-2 mt-6">
        {/* Dynamic Status Card */}
        <div className="px-2">
          <StatusCard streak={analysisStreak} type={analysisStatus} />
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 mx-2">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-zinc-50 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-zinc-400" />
          </button>
          <h2 className="text-xl font-black capitalize text-zinc-800">
            {monthName} <span className="text-zinc-300 font-light">{year}</span>
          </h2>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-zinc-50 rounded-full transition-colors">
            <ChevronRight className="w-6 h-6 text-zinc-400" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3 px-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
            <div key={d} className="text-center text-xs font-black text-zinc-300 py-1">
              {d[0]}
            </div>
          ))}
          
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className={`aspect-square`} />
          ))}

          {(() => {
            const today = new Date();
            const tDay = today.getDate();
            const tMonth = today.getMonth();
            const tYear = today.getFullYear();

            return Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateKey = `${year}-${month + 1}-${day}`;
              const status = history[dateKey] || null;
              const streak = calculateStreak(day, month, year);
              
              const isToday = tDay === day && tMonth === month && tYear === year;

              return (
                <div key={day} className="min-h-[85px]">
                  <DayCard
                    day={day}
                    status={status}
                    streak={streak}
                    isToday={isToday}
                    onAction={(s) => handleAction(day, s)}
                  />
                </div>
              );
            });
          })()}
        </div>

        {/* Legend / Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-700 uppercase">Atividade</span>
            </div>
            <p className="text-2xl font-black text-emerald-600">{monthlyYesCount}</p>
            <p className="text-[10px] text-emerald-500 font-medium">Vezes este mês</p>
          </div>
          
          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
            <div className="flex items-center gap-2 mb-1">
              <Info className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-bold text-rose-700 uppercase">Sequência</span>
            </div>
            <p className="text-2xl font-black text-rose-600">
              {Math.max(0, ...Array.from({ length: daysInMonth }, (_, i) => calculateStreak(i + 1, month, year)))}
            </p>
            <p className="text-[10px] text-rose-500 font-medium">Maior pausa (dias)</p>
          </div>
        </div>
      </main>

      {/* Styles for Flip Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}} />
    </div>
  );
}
