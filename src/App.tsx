/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Info, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Constants & Data ---

const HEALTH_MESSAGES = [
  "Dia 1: Estabilidade hormonal. Seu corpo começa a regular os níveis de cortisol.",
  "Dia 2: Equilíbrio inicial. O sistema endócrino mantém a homeostase.",
  "Dia 3: Pico de testosterona. Você pode sentir um aumento na energia e leve irritabilidade.",
  "Dia 4: Foco mental. A energia física começa a ser canalizada para outras atividades.",
  "Dia 5: Sensibilidade aumentada. Receptores de dopamina começam a se recalibrar.",
  "Dia 6: Melhora na pele. A regulação hormonal pode reduzir a oleosidade excessiva.",
  "Dia 7: Alerta de estresse. Níveis de cortisol podem subir; busque atividades relaxantes.",
  "Dia 8: Vitalidade física. Aumento na disposição para exercícios de força.",
  "Dia 9: Clareza cognitiva. Menos 'névoa mental' relatada por muitos usuários.",
  "Dia 10: Estabilização do humor. O corpo se adapta ao novo ciclo biológico.",
  "Dia 11: Recuperação muscular. Otimização na síntese proteica natural.",
  "Dia 12: Autocontrole. Fortalecimento das vias neurais de gratificação tardia.",
  "Dia 13: Libido em transição. O desejo pode flutuar enquanto o corpo se ajusta.",
  "Dia 14: Queda na ocitocina. Você pode sentir mais necessidade de contato social não sexual.",
  "Dia 15: Sono profundo. Melhora na qualidade das fases REM do sono.",
  "Dia 16: Confiança. Sensação de domínio sobre os próprios impulsos.",
  "Dia 17: Imunidade. O sistema de defesa do corpo opera em níveis estáveis.",
  "Dia 18: Criatividade. A 'energia criativa' costuma atingir um novo patamar.",
  "Dia 19: Redução de ansiedade. Menos dependência de picos rápidos de dopamina.",
  "Dia 20: Saúde cardiovascular. Ritmo cardíaco em repouso tende a se estabilizar.",
  "Dia 21: Memória. Melhora na retenção de informações e foco prolongado.",
  "Dia 22: Resiliência. Maior capacidade de lidar com frustrações diárias.",
  "Dia 23: Metabolismo. Otimização na queima calórica e energia basal.",
  "Dia 24: Postura. Aumento na percepção corporal e presença física.",
  "Dia 25: Empatia. Melhora na leitura de sinais sociais e conexões humanas.",
  "Dia 26: Longevidade celular. Processos de renovação celular em ritmo constante.",
  "Dia 27: Equilíbrio emocional. Menos oscilações bruscas de humor.",
  "Dia 28: Visão de longo prazo. Foco em objetivos maiores e menos imediatistas.",
  "Dia 29: Desintoxicação. O sistema dopaminérgico está quase totalmente resetado.",
  "Dia 30: Atenção à próstata. Lembre-se: o desuso prolongado requer monitoramento médico.",
  "Dia 31: Mestre do Tempo. Você atingiu o ciclo completo de autoconhecimento biológico."
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
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-bold ${isToday ? 'text-zinc-900' : 'text-zinc-400'}`}>
              {day}
              {isToday && <span className="ml-1 text-[8px] uppercase tracking-tighter text-zinc-500 block">Hoje</span>}
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
          className="absolute inset-0 backface-hidden bg-zinc-900 rounded-xl shadow-xl border border-zinc-800 flex flex-col p-3 rotate-y-180"
          onClick={() => onAction('yes')} // Allow flipping back by clicking "Yes"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Saúde</span>
            <Info className="w-3 h-3 text-blue-400" />
          </div>
          <div className="flex-1 overflow-y-auto">
            <p className="text-[11px] leading-tight text-zinc-300 font-medium">
              {HEALTH_MESSAGES[Math.min(streak - 1, 30)]}
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-zinc-800 text-center">
            <span className="text-[9px] text-zinc-500 font-mono">Sequência: {streak}d</span>
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
      if (streak <= 3) return { 
        status: "Fase de Desintoxicação", 
        mood: "Oscilante / Expectativa", 
        fisiologia: "O corpo está processando o excesso de prolactina residual. Os receptores de dopamina iniciam um processo de 'upregulation' para recuperar a sensibilidade natural.",
        psicologia: "Pode haver uma leve ansiedade ou busca por recompensas rápidas (comida, redes sociais). É a fase de quebra de hábito.",
        planoAcao: [
          "Evite gatilhos visuais e digitais.",
          "Beba 500ml extras de água para auxiliar o sistema linfático.",
          "Pratique 5 min de respiração consciente ao sentir impulsos."
        ],
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        accent: "bg-blue-600"
      };
      if (streak <= 7) return { 
        status: "Pico de Testosterona", 
        mood: "Energético / Reativo", 
        fisiologia: "Estudos indicam um pico de testosterona livre por volta do 7º dia. Há um aumento na síntese de ATP e maior prontidão muscular.",
        psicologia: "Aumento da agressividade canalizável e da libido. A autoconfiança sobe, mas a paciência pode diminuir.",
        planoAcao: [
          "Canalize a energia em treinos de alta intensidade (HIIT ou Pesos).",
          "Use a agressividade para resolver problemas pendentes no trabalho.",
          "Evite discussões desnecessárias; sua reatividade está alta."
        ],
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        accent: "bg-amber-600"
      };
      if (streak <= 14) return { 
        status: "Homeostase Cognitiva", 
        mood: "Estável / Produtivo", 
        fisiologia: "Níveis de cortisol se estabilizam. A ocitocina começa a ser regulada por vias de conexão social profunda em vez de picos sexuais.",
        psicologia: "Melhora significativa na memória de curto prazo e na capacidade de leitura prolongada. Menos pensamentos intrusivos.",
        planoAcao: [
          "Inicie um curso ou leitura densa.",
          "Foque em conexões sociais olho no olho.",
          "Mantenha a rotina de sono rigorosa para consolidar os ganhos."
        ],
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        accent: "bg-indigo-600"
      };
      if (streak <= 30) return { 
        status: "Transmutação Energética", 
        mood: "Pleno / Criativo", 
        fisiologia: "O sistema nervoso central está operando em um novo patamar de eficiência. A energia que seria gasta em reprodução é redirecionada para reparo tecidual.",
        psicologia: "Sensação de 'Superpoder' ou clareza absoluta. Grande facilidade em ignorar distrações triviais.",
        planoAcao: [
          "Execute projetos criativos de longo prazo.",
          "Pratique meditação profunda para gerenciar a energia interna.",
          "Monitore a saúde física geral; seu corpo está em modo de manutenção."
        ],
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
        accent: "bg-purple-600"
      };
      return { 
        status: "Alerta de Estagnação", 
        mood: "Zen / Desconectado", 
        fisiologia: "Atenção: O desuso prolongado pode levar a uma leve atrofia temporária da libido e acúmulo de fluidos na próstata.",
        psicologia: "Risco de 'flatline' (perda total de interesse). Pode haver uma sensação de desapego excessivo.",
        planoAcao: [
          "Consulte um urologista se houver desconforto.",
          "Reavalie seus objetivos de saúde sexual.",
          "Não force o desapego se sentir que está afetando sua vitalidade."
        ],
        color: "text-rose-600",
        bg: "bg-rose-50",
        border: "border-rose-200",
        accent: "bg-rose-600"
      };
    } else if (type === 'yes') {
      if (streak <= 2) return { 
        status: "Recuperação Pós-Ápice", 
        mood: "Relaxado / Saciado", 
        fisiologia: "Liberação massiva de ocitocina, dopamina e prolactina. O sistema parassimpático assume o controle, induzindo relaxamento muscular profundo.",
        psicologia: "Sensação de contentamento e redução imediata de estresse. Foco reduzido para tarefas analíticas.",
        planoAcao: [
          "Priorize o sono de 8 horas hoje.",
          "Evite decisões financeiras ou lógicas complexas nas próximas 4 horas.",
          "Aproveite o momento para conexão emocional com o parceiro(a)."
        ],
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        accent: "bg-emerald-600"
      };
      return { 
        status: "Manutenção de Vínculo", 
        mood: "Afetivo / Estável", 
        fisiologia: "Manutenção de níveis saudáveis de hormônios sexuais. Circulação sanguínea pélvica otimizada e saúde da próstata em dia.",
        psicologia: "Estabilidade emocional e redução de ansiedade social. Sentimento de pertencimento e segurança.",
        planoAcao: [
          "Mantenha a hidratação e alimentação rica em zinco.",
          "Equilibre a atividade com exercícios aeróbicos.",
          "Pratique a gratidão pelo bem-estar físico alcançado."
        ],
        color: "text-pink-600",
        bg: "bg-pink-50",
        border: "border-pink-200",
        accent: "bg-pink-600"
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
            <div className={`w-1 h-3 rounded-full ${data.accent}`} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Impacto Fisiológico</h4>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed font-medium">{data.fisiologia}</p>
        </section>

        {/* Psicologia */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-1 h-3 rounded-full ${data.accent}`} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Estado Psicológico</h4>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed font-medium">{data.psicologia}</p>
        </section>

        {/* Plano de Ação */}
        <section className="bg-white/60 rounded-2xl p-4 border border-white/80">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className={`w-3 h-3 ${data.color}`} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Plano de Ação Sugerido</h4>
          </div>
          <ul className="space-y-2">
            {data.planoAcao.map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[11px] text-zinc-700 font-semibold">
                <span className={`${data.color} mt-0.5`}>•</span>
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
