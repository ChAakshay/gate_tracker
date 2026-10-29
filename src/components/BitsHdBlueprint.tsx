import React, { useState } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { 
  Award, 
  Target, 
  Cpu, 
  Clock, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  ChevronRight, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Flame, 
  ArrowRight, 
  Calculator,
  Compass,
  FileText,
  Activity,
  BookmarkCheck,
  Check
} from 'lucide-react';

export const BitsHdBlueprint: React.FC = () => {
  const { getSecuredMarks, setActiveView } = useProgressStore();
  const securedMarks = getSecuredMarks();

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'overview' | 'admissions' | 'syllabus' | 'psychometrics' | 'daily'>('overview');

  // Agent 1: Selected campus for comparison
  const [selectedCampus, setSelectedCampus] = useState<'pilani' | 'goa' | 'hyderabad'>('pilani');

  // Agent 2: 8085 Microprocessor Terminal interactive state
  const [mpTab, setMpTab] = useState<'interrupts' | 'flags' | 'timing'>('interrupts');
  const [softwareInterruptN, setSoftwareInterruptN] = useState<number>(7);
  const [crystalFreqMHz, setCrystalFreqMHz] = useState<number>(6);
  const [selectedInstruction, setSelectedInstruction] = useState<'MOV' | 'MVI' | 'LXI' | 'LDA' | 'STA' | 'CALL'>('LDA');

  // Agent 3: Bayesian guess simulator state
  const [simEliminated, setSimEliminated] = useState<0 | 1 | 2>(2);
  const [simulatedScore, setSimulatedScore] = useState<{ attempts: number; netMarks: number; history: number[] } | null>(null);

  // Agent 4: Daily 3-Box Tracker saved locally
  const [dailyBox1, setDailyBox1] = useState<boolean>(() => {
    return localStorage.getItem('bitshd_box1_done') === 'true';
  });
  const [dailyBox2, setDailyBox2] = useState<boolean>(() => {
    return localStorage.getItem('bitshd_box2_done') === 'true';
  });
  const [dailyBox3, setDailyBox3] = useState<boolean>(() => {
    return localStorage.getItem('bitshd_box3_done') === 'true';
  });

  const toggleDailyBox = (box: 1 | 2 | 3) => {
    if (box === 1) {
      const next = !dailyBox1;
      setDailyBox1(next);
      localStorage.setItem('bitshd_box1_done', String(next));
    } else if (box === 2) {
      const next = !dailyBox2;
      setDailyBox2(next);
      localStorage.setItem('bitshd_box2_done', String(next));
    } else {
      const next = !dailyBox3;
      setDailyBox3(next);
      localStorage.setItem('bitshd_box3_done', String(next));
    }
  };

  // Campus Cutoffs Data
  const campusData = {
    pilani: {
      name: 'BITS Pilani (Main Campus)',
      spec: 'M.E. Embedded Systems',
      round1: 152,
      final: 144,
      safeSpace: 185,
      cushion: '+33 Marks',
      tag: 'Apex Target (Iteration 1 Guarantee)',
      bg: 'from-blue-600/20 via-indigo-600/10 to-transparent border-blue-500/40'
    },
    goa: {
      name: 'BITS Goa Campus',
      spec: 'M.E. Embedded Systems',
      round1: 142,
      final: 134,
      safeSpace: 170,
      cushion: '+28 Marks',
      tag: 'High Certainty Backup',
      bg: 'from-emerald-600/20 via-teal-600/10 to-transparent border-emerald-500/40'
    },
    hyderabad: {
      name: 'BITS Hyderabad Campus',
      spec: 'M.E. Embedded Systems',
      round1: 136,
      final: 128,
      safeSpace: 165,
      cushion: '+29 Marks',
      tag: 'Ultra-Safe Floor',
      bg: 'from-purple-600/20 via-pink-600/10 to-transparent border-purple-500/40'
    }
  };

  // 8085 Instruction Timing Database
  const instructionDb = {
    MOV: { tStates: 4, machineCycles: '1 (Opcode Fetch: 4T)', description: 'Copy register to register (e.g. MOV A, B)' },
    MVI: { tStates: 7, machineCycles: '2 (Opcode Fetch: 4T + Memory Read: 3T)', description: 'Move immediate 8-bit data into register' },
    LXI: { tStates: 10, machineCycles: '3 (Opcode Fetch: 4T + Memory Read: 3T + Memory Read: 3T)', description: 'Load register pair with 16-bit immediate data' },
    LDA: { tStates: 13, machineCycles: '4 (Fetch: 4T + MemRead: 3T + MemRead: 3T + MemRead: 3T)', description: 'Load accumulator direct from 16-bit address' },
    STA: { tStates: 13, machineCycles: '4 (Fetch: 4T + MemRead: 3T + MemRead: 3T + MemWrite: 3T)', description: 'Store accumulator direct to 16-bit memory' },
    CALL: { tStates: 18, machineCycles: '5 (Fetch: 4T/6T + 2 MemRead: 6T + 2 StackWrite: 6T)', description: 'Unconditional subroutine call' }
  };

  // Calculate clock period & execution time
  const clockFreqMHz = crystalFreqMHz / 2;
  const clockPeriodNs = (1 / clockFreqMHz) * 1000;
  const curInstr = instructionDb[selectedInstruction];
  const executionTimeUs = ((curInstr.tStates * clockPeriodNs) / 1000).toFixed(2);

  // Bayesian simulation runner
  const runBayesianSimulation = () => {
    let net = 0;
    const history: number[] = [];
    for (let i = 0; i < 10; i++) {
      if (simEliminated === 0) {
        // 1 in 4 chance
        const isCorrect = Math.random() < 0.25;
        const pts = isCorrect ? 3 : -1;
        net += pts;
        history.push(pts);
      } else if (simEliminated === 1) {
        // 1 in 3 chance
        const isCorrect = Math.random() < 0.3333;
        const pts = isCorrect ? 3 : -1;
        net += pts;
        history.push(pts);
      } else {
        // 1 in 2 chance (2 eliminated)
        const isCorrect = Math.random() < 0.5;
        const pts = isCorrect ? 3 : -1;
        net += pts;
        history.push(pts);
      }
    }
    setSimulatedScore({ attempts: 10, netMarks: net, history });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">

      {/* 🚀 HERO APEX MISSION BANNER */}
      <div className="relative bg-gradient-to-br from-[#111625] via-[#0d101a] to-[#07080d] border border-blue-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/15 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                BITS HD Apex Target
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Safe Space: 185–190+ Marks
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              M.E. Embedded Systems Blueprint
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Engineered by the 4-Agent Consortium. Complete pivot from GATE quagmires to high-velocity BITS HD architecture: <strong className="text-white">100 MCQs in 150 minutes</strong> (+3, -1) with a <strong className="text-emerald-400">73-mark Test I cushion</strong>.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="bg-[#141926]/90 border border-[#252f47] p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-xl">
            <div className="text-center sm:text-left">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Target Score Floor</div>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                185+ <span className="text-sm font-bold text-slate-400">/ 300</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Iteration 1 Pilani Assured</div>
            </div>

            <div className="h-10 w-[1px] bg-slate-800 hidden sm:block" />

            <div className="text-center sm:text-left">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Current Secured Marks</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {securedMarks}M
              </div>
              <div className="text-[11px] text-slate-400 font-semibold mt-0.5">
                Gap: <span className="text-amber-400">{Math.max(0, 185 - securedMarks).toFixed(1)}M to safe space</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs for Consortium Agents */}
        <div className="flex overflow-x-auto gap-2 pt-6 mt-6 border-t border-[#1d2436] scrollbar-none">
          {[
            { id: 'overview', label: '1. Executive Strategy', icon: Compass },
            { id: 'admissions', label: '2. Cutoffs & 300M Model', icon: Award },
            { id: 'syllabus', label: '3. Embedded Core & 8085', icon: Cpu },
            { id: 'psychometrics', label: '4. 1.5-Min Triage & Odds', icon: Zap },
            { id: 'daily', label: '5. Daily "Rule of 3" Loop', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 bg-[#131724]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: EXECUTIVE STRATEGY & OVERVIEW
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#111420] border border-[#1e2538] p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-400 font-mono uppercase">Single Target Focus</div>
              <div className="text-base font-bold text-white">BITS Pilani M.E. Embedded</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aiming directly for the 185+ safe space floor guarantees round 1 seat allocation without cutoff anxiety.
              </p>
            </div>

            <div className="bg-[#111420] border border-[#1e2538] p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-400 font-mono uppercase">The Secret Weapon</div>
              <div className="text-base font-bold text-white">Test I: 73 / 90 Marks (81%)</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                English (10 Qs) + Logic (5 Qs) banked in 15 minutes. Provides a massive safety cushion before technical Test II.
              </p>
            </div>

            <div className="bg-[#111420] border border-[#1e2538] p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-400 font-mono uppercase">The Exclusive Pillar</div>
              <div className="text-base font-bold text-white">8085 & 8086 Microprocessors</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Excluded from GATE ECE, but carries 5–8 direct MCQs in BITS HD Test II. Mastering this gives +20 marks lead.
              </p>
            </div>

            <div className="bg-[#111420] border border-[#1e2538] p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-400 font-mono uppercase">Cognitive Pace</div>
              <div className="text-base font-bold text-white">1.50 Mins / Question</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                100 pure MCQs (+3, -1). No virtual calculator, no 4-minute derivations. Fast pattern matching & triage rule.
              </p>
            </div>
          </div>

          {/* Strategic Shift Table */}
          <div className="bg-[#111420] border border-[#1e2538] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span>Strategic Pivot: How the Game Changes</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#1f273d] text-slate-400 font-mono uppercase text-[11px]">
                    <th className="pb-3 font-semibold">Strategic Dimension</th>
                    <th className="pb-3 font-semibold text-slate-400">Old Track (GATE Only)</th>
                    <th className="pb-3 font-semibold text-blue-400">New Apex Track (BITS HD Overhaul)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182033] text-slate-300">
                  <tr>
                    <td className="py-3.5 font-bold text-white">Primary Metric</td>
                    <td className="py-3.5 text-slate-400">AIR Rank & Normalization formulas</td>
                    <td className="py-3.5 font-bold text-emerald-400">Raw Composite Score $\ge 185 / 300$</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-white">Question Velocity</td>
                    <td className="py-3.5 text-slate-400">2.77 Mins/Q (Slow, multi-layer derivations)</td>
                    <td className="py-3.5 font-bold text-blue-400">1.50 Mins/Q (Fast recall, 1-step formula, triage)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-white">Aptitude & English</td>
                    <td className="py-3.5 text-slate-400">15% of Exam (Math + GA)</td>
                    <td className="py-3.5 font-bold text-blue-400">30% of Exam (Test I: 90 Marks total!)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-white">Microprocessors</td>
                    <td className="py-3.5 text-slate-400">Completely skipped (Not in GATE ECE)</td>
                    <td className="py-3.5 font-bold text-amber-400">Core High-Yield Focus (8085 & 8086 instruction sets)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-white">Calculus & Cascodes</td>
                    <td className="py-3.5 text-slate-400">Heavy multi-pole frequency derivations</td>
                    <td className="py-3.5 font-bold text-emerald-400">Demoted/Pruned in favor of Op-Amps & FSMs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('admissions')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-600/30"
              >
                <span>View Cutoffs & 300M Model</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('syllabus')}
                className="px-4 py-2 rounded-xl bg-[#1a2030] hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all border border-[#253047]"
              >
                <span>Open 8085 Microprocessor Terminal</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: CUTOFFS & 300-MARK SCORE DECOMPOSITION
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'admissions' && (
        <div className="space-y-6">
          {/* Campus Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['pilani', 'goa', 'hyderabad'] as const).map((campusKey) => {
              const c = campusData[campusKey];
              const isSelected = selectedCampus === campusKey;
              return (
                <div
                  key={campusKey}
                  onClick={() => setSelectedCampus(campusKey)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                    isSelected 
                      ? `bg-gradient-to-b ${c.bg} shadow-lg ring-1 ring-blue-400/40` 
                      : 'bg-[#111420] border-[#1e2538] hover:border-slate-600 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300">
                      {c.tag}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                  </div>
                  <h4 className="text-base font-black text-white">{c.name}</h4>
                  <div className="text-xs text-slate-400 mb-4">{c.spec}</div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Round 1 Cutoff:</span>
                      <strong className="text-white font-mono">{c.round1} / 300</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Final Iteration:</span>
                      <strong className="text-slate-300 font-mono">{c.final} / 300</strong>
                    </div>
                    <div className="flex justify-between border-t border-slate-700/60 pt-1.5">
                      <span className="text-emerald-400 font-bold">Safe Space Target:</span>
                      <strong className="text-emerald-400 font-mono font-black">{c.safeSpace}+</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* The Mathematical 300-Mark Score Model */}
          <div className="bg-[#111420] border border-[#1e2538] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">Mathematical Score Engine</span>
                <h3 className="text-xl font-black text-white">How to Bank 193 / 300 Marks Comfortably</h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                Net Accuracy Required in Test II: Only 57%
              </div>
            </div>

            {/* Test I vs Test II Visual Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Test I Box */}
              <div className="bg-[#141826] border border-[#232b40] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      T1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Test I: Foundation & Speed</h4>
                      <div className="text-[11px] text-slate-400">30 Qs • 45 Mins • 90 Marks</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Target Yield</div>
                    <div className="text-base font-black text-blue-400 font-mono">73 / 90 (81%)</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-[#0e111a] p-3 rounded-xl flex items-center justify-between border border-[#1c2233]">
                    <div>
                      <span className="font-bold text-slate-200">English Language</span>
                      <div className="text-[10px] text-slate-400">Prepositions, Vocab, Sentence Completion</div>
                    </div>
                    <div className="font-mono text-emerald-400 font-bold">10 Qs $\to$ 26 Marks</div>
                  </div>

                  <div className="bg-[#0e111a] p-3 rounded-xl flex items-center justify-between border border-[#1c2233]">
                    <div>
                      <span className="font-bold text-slate-200">Logical Reasoning</span>
                      <div className="text-[10px] text-slate-400">Series, Coding, Blood Relations, Syllogisms</div>
                    </div>
                    <div className="font-mono text-emerald-400 font-bold">5 Qs $\to$ 15 Marks</div>
                  </div>

                  <div className="bg-[#0e111a] p-3 rounded-xl flex items-center justify-between border border-[#1c2233]">
                    <div>
                      <span className="font-bold text-slate-200">Engineering Mathematics</span>
                      <div className="text-[10px] text-slate-400">Linear Algebra, Calculus, Differential Eqns</div>
                    </div>
                    <div className="font-mono text-blue-400 font-bold">15 Qs $\to$ 32 Marks</div>
                  </div>
                </div>
              </div>

              {/* Test II Box */}
              <div className="bg-[#141826] border border-[#232b40] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      T2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Test II: ECE/EEE Core</h4>
                      <div className="text-[11px] text-slate-400">70 Qs • 105 Mins • 210 Marks</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Target Yield</div>
                    <div className="text-base font-black text-amber-400 font-mono">120 / 210 (57%)</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-[#0e111a] p-3 rounded-xl flex items-center justify-between border border-[#1c2233]">
                    <div>
                      <span className="font-bold text-slate-200">Embedded Core (Microprocessors + Digital)</span>
                      <div className="text-[10px] text-slate-400">8085/8086, FSMs, Counters, Setup/Hold Slack</div>
                    </div>
                    <div className="font-mono text-emerald-400 font-bold">22 Qs $\to$ 49 Marks</div>
                  </div>

                  <div className="bg-[#0e111a] p-3 rounded-xl flex items-center justify-between border border-[#1c2233]">
                    <div>
                      <span className="font-bold text-slate-200">Analog Circuits & Op-Amps</span>
                      <div className="text-[10px] text-slate-400">Op-Amps, Schmitt Triggers, Diodes, Biasing</div>
                    </div>
                    <div className="font-mono text-blue-400 font-bold">16 Qs $\to$ 31 Marks</div>
                  </div>

                  <div className="bg-[#0e111a] p-3 rounded-xl flex items-center justify-between border border-[#1c2233]">
                    <div>
                      <span className="font-bold text-slate-200">Signals, Networks & Harvesters</span>
                      <div className="text-[10px] text-slate-400">Z-Transform, DTFT, 1st Order Transients, Bode</div>
                    </div>
                    <div className="font-mono text-amber-400 font-bold">32 Qs $\to$ 40 Marks</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: EMBEDDED SYLLABUS & 8085 MICROPROCESSOR TERMINAL
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'syllabus' && (
        <div className="space-y-6">
          {/* 8085 Interactive Engineering Terminal */}
          <div className="bg-[#0f131f] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Exclusive BITS HD Embedded Accelerator</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">8085 & 8086 Microprocessor Terminal</h3>
                <p className="text-slate-400 text-xs mt-1">
                  Master the vector interrupts, flag bit maps, and machine cycle calculations that other GATE students skip.
                </p>
              </div>

              {/* Sub-tabs for Microprocessor */}
              <div className="flex items-center gap-1.5 bg-[#141a29] p-1.5 rounded-xl border border-[#212c44] text-xs">
                {(['interrupts', 'flags', 'timing'] as const).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setMpTab(sub)}
                    className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-all ${
                      mpTab === sub ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-view 1: Interrupts & Vector Formula */}
            {mpTab === 'interrupts' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Hardware Interrupts Priority Table */}
                  <div className="bg-[#141a29] border border-[#212c44] p-4 rounded-2xl space-y-3">
                    <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold">Hardware Interrupt Priority Hierarchy</h4>
                    <div className="space-y-2 text-xs">
                      {[
                        { name: 'TRAP', vec: '0024H', type: 'Edge + Level', priority: '1 (Highest)', mask: 'Non-maskable' },
                        { name: 'RST 7.5', vec: '003CH', type: 'Edge Triggered', priority: '2', mask: 'Maskable (SIM)' },
                        { name: 'RST 6.5', vec: '0034H', type: 'Level Sensitive', priority: '3', mask: 'Maskable (SIM)' },
                        { name: 'RST 5.5', vec: '002CH', type: 'Level Sensitive', priority: '4', mask: 'Maskable (SIM)' },
                        { name: 'INTR', vec: 'Supplied by ext (RST/CALL)', type: 'Level Sensitive', priority: '5 (Lowest)', mask: 'Maskable (EI/DI)' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c101a] border border-[#1b2336]">
                          <div>
                            <span className="font-bold text-white">{item.name}</span>
                            <span className="ml-2 text-[10px] text-slate-400">({item.mask}, {item.type})</span>
                          </div>
                          <div className="text-right font-mono">
                            <span className="text-cyan-400 font-bold">{item.vec}</span>
                            <span className="ml-2 text-[10px] text-slate-500">Pri: {item.priority}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Software Interrupt Calculator */}
                  <div className="bg-[#141a29] border border-[#212c44] p-4 rounded-2xl space-y-3 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold">Software Interrupt Vector Formula</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        In BITS HD, you will be asked the vector address of <code className="text-cyan-300">RST n</code>. Formula: <code className="text-emerald-400 font-bold">Vector = n × 8 (in hex)</code>.
                      </p>

                      <div className="mt-4 space-y-3">
                        <label className="text-xs font-semibold text-slate-300 flex justify-between">
                          <span>Select RST operand (n: 0 to 7):</span>
                          <span className="font-mono text-cyan-400 font-bold">RST {softwareInterruptN}</span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="7"
                          value={softwareInterruptN}
                          onChange={(e) => setSoftwareInterruptN(parseInt(e.target.value, 10))}
                          className="w-full accent-cyan-500"
                        />

                        {/* Calculated Address Display */}
                        <div className="bg-[#0b0e17] p-4 rounded-xl border border-cyan-500/30 text-center space-y-1 mt-2">
                          <div className="text-[11px] text-slate-400">Calculation: {softwareInterruptN} × 8 = {softwareInterruptN * 8} decimal</div>
                          <div className="text-2xl font-black font-mono text-cyan-400">
                            00{(softwareInterruptN * 8).toString(16).toUpperCase().padStart(2, '0')}H
                          </div>
                          <div className="text-[11px] text-emerald-400 font-medium">Memory Vector Location in 8085 ROM</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 border-t border-[#1e263a] pt-2">
                      💡 <strong>Pro Tip</strong>: Note that <code className="text-slate-300">RST 4.5</code> is the hardware equivalent name for <code className="text-slate-300">TRAP</code> (4.5 × 8 = 36 = 0024H).
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-view 2: Flag Register */}
            {mpTab === 'flags' && (
              <div className="space-y-4">
                <div className="bg-[#141a29] border border-[#212c44] p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold">8085 Flag Register (8-Bit Structure)</h4>
                  <div className="grid grid-cols-8 gap-2 text-center font-mono">
                    {[
                      { bit: 'D7', name: 'S (Sign)', active: true, desc: 'Set if D7 of result is 1 (Negative number in 2s comp)' },
                      { bit: 'D6', name: 'Z (Zero)', active: true, desc: 'Set if accumulator result is completely 00H' },
                      { bit: 'D5', name: 'X', active: false, desc: 'Don’t Care / Unused (Reserved bit)' },
                      { bit: 'D4', name: 'AC (Aux Carry)', active: true, desc: 'Carry from D3 to D4 bit (Used for DAA instruction)' },
                      { bit: 'D3', name: 'X', active: false, desc: 'Don’t Care / Unused (Reserved bit)' },
                      { bit: 'D2', name: 'P (Parity)', active: true, desc: 'Set if even number of 1s in result (Even parity)' },
                      { bit: 'D1', name: '1', active: false, desc: 'Fixed to 1 in standard 8085' },
                      { bit: 'D0', name: 'CY (Carry)', active: true, desc: 'Set if arithmetic carry or borrow generated' },
                    ].map((f, i) => (
                      <div key={i} className={`p-2.5 rounded-xl border ${f.active ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300' : 'bg-[#0c101a] border-slate-800 text-slate-500'}`}>
                        <div className="text-[10px] text-slate-400">{f.bit}</div>
                        <div className="font-bold text-xs mt-1">{f.name.split(' ')[0]}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#0c101a] p-4 rounded-xl border border-[#1e263a] text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>DAA Instruction Requirement</span>
                    </div>
                    <p className="text-slate-400 text-xs">
                      The Decimal Adjust Accumulator (<code className="text-cyan-300">DAA</code>) instruction adds <code className="text-amber-400">06H</code> if lower nibble &gt; 9 or if <code className="text-cyan-300">AC=1</code>, and adds <code className="text-amber-400">60H</code> if higher nibble &gt; 9 or if <code className="text-cyan-300">CY=1</code>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-view 3: Instruction Timing */}
            {mpTab === 'timing' && (
              <div className="space-y-4">
                <div className="bg-[#141a29] border border-[#212c44] p-5 rounded-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold">Machine Cycles & Execution Time Calculator</h4>
                      <p className="text-xs text-slate-400">BITS HD frequently asks the exact execution time in microseconds (μs) for an instruction.</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="text-xs text-slate-400">Crystal Oscillator:</label>
                      <select
                        value={crystalFreqMHz}
                        onChange={(e) => setCrystalFreqMHz(Number(e.target.value))}
                        className="bg-[#0b0e17] border border-cyan-500/40 rounded-xl px-3 py-1.5 text-xs text-cyan-300 font-mono"
                      >
                        <option value={6}>6.0 MHz (Operating: 3.0 MHz)</option>
                        <option value={4}>4.0 MHz (Operating: 2.0 MHz)</option>
                        <option value={5}>5.0 MHz (Operating: 2.5 MHz)</option>
                      </select>
                    </div>
                  </div>

                  {/* Instruction Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(instructionDb) as Array<keyof typeof instructionDb>).map((inst) => (
                      <button
                        key={inst}
                        onClick={() => setSelectedInstruction(inst)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                          selectedInstruction === inst
                            ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                            : 'bg-[#0b0e17] text-slate-400 hover:text-white border border-[#1b2336]'
                        }`}
                      >
                        {inst}
                      </button>
                    ))}
                  </div>

                  {/* Calculation Result */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-[#0b0e17] p-3.5 rounded-xl border border-[#1b2336]">
                      <div className="text-[11px] text-slate-400">T-States Required</div>
                      <div className="text-xl font-bold font-mono text-cyan-400 mt-1">{curInstr.tStates} T-States</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{curInstr.machineCycles}</div>
                    </div>

                    <div className="bg-[#0b0e17] p-3.5 rounded-xl border border-[#1b2336]">
                      <div className="text-[11px] text-slate-400">Clock Period (T)</div>
                      <div className="text-xl font-bold font-mono text-white mt-1">{clockPeriodNs.toFixed(1)} ns</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Freq = {crystalFreqMHz}MHz ÷ 2 = {clockFreqMHz}MHz</div>
                    </div>

                    <div className="bg-[#0b0e17] p-3.5 rounded-xl border border-cyan-500/40">
                      <div className="text-[11px] text-cyan-300 font-semibold">Total Execution Time</div>
                      <div className="text-xl font-black font-mono text-emerald-400 mt-1">{executionTimeUs} μs</div>
                      <div className="text-[10px] text-emerald-400/80 mt-0.5">({curInstr.tStates} × {clockPeriodNs.toFixed(1)}ns)</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: PSYCHOMETRICS, 1.5-MIN TRIAGE & BAYESIAN GUESSING
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'psychometrics' && (
        <div className="space-y-6">
          {/* Bayesian Guessing Simulator */}
          <div className="bg-[#111420] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Psychometric Expected Value Engine</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">The Bayesian Two-Option Elimination Rule</h3>
                <p className="text-slate-400 text-xs mt-1">
                  In a (+3, -1) exam, random guessing has neutral value (Expected Value = 0). But eliminating options unlocks statistical profit.
                </p>
              </div>

              <button
                onClick={runBayesianSimulation}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <Calculator className="w-4 h-4" />
                <span>Simulate 10 Guesses</span>
              </button>
            </div>

            {/* Expected Value Mathematical Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => setSimEliminated(0)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  simEliminated === 0 ? 'bg-slate-800/80 border-slate-500 text-white' : 'bg-[#151926] border-[#22293d] text-slate-400'
                }`}
              >
                <div className="text-[11px] font-mono uppercase">0 Options Eliminated</div>
                <div className="text-lg font-bold text-slate-300 mt-1">E[X] = 0.00 Marks</div>
                <div className="text-xs text-slate-400 mt-1">¼(+3) + ¾(-1) = 0. Pure gamble. Do not attempt.</div>
              </div>

              <div
                onClick={() => setSimEliminated(1)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  simEliminated === 1 ? 'bg-blue-900/40 border-blue-500 text-white' : 'bg-[#151926] border-[#22293d] text-slate-400'
                }`}
              >
                <div className="text-[11px] font-mono uppercase text-blue-400 font-bold">1 Option Eliminated</div>
                <div className="text-lg font-bold text-blue-300 mt-1">E[X] = +0.33 Marks</div>
                <div className="text-xs text-slate-400 mt-1">⅓(+3) + ⅔(-1) = +0.33. Positive mathematical expectation.</div>
              </div>

              <div
                onClick={() => setSimEliminated(2)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  simEliminated === 2 ? 'bg-emerald-950/70 border-emerald-500 text-white ring-1 ring-emerald-500/50' : 'bg-[#151926] border-[#22293d] text-slate-400'
                }`}
              >
                <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold">2 Options Eliminated (The Rule)</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">E[X] = +1.00 Mark!</div>
                <div className="text-xs text-slate-300 mt-1">½(+3) + ½(-1) = +1.00. You MUST guess! +10 marks gain over 10 Qs.</div>
              </div>
            </div>

            {/* Simulation History Display */}
            {simulatedScore && (
              <div className="bg-[#0d101a] p-4 rounded-2xl border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    Simulated 10 Questions with <strong className="text-white">{simEliminated} options eliminated</strong>:
                  </span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    Net Score: {simulatedScore.netMarks > 0 ? `+${simulatedScore.netMarks}` : simulatedScore.netMarks} Marks
                  </span>
                </div>

                <div className="flex gap-1.5 flex-wrap">
                  {simulatedScore.history.map((pt, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded-lg font-mono text-xs font-bold ${
                        pt > 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}
                    >
                      Q{idx + 1}: {pt > 0 ? '+3' : '-1'}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 1.5-Minute Triage Decision Rule */}
          <div className="bg-[#111420] border border-[#1e2538] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>The 1.5-Minute Triage Protocol</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#141926] p-4 rounded-2xl border border-emerald-500/30 space-y-2">
                <div className="text-emerald-400 font-mono font-bold uppercase text-[11px]">Tier A: Instant Recall (0–30s)</div>
                <div className="text-white font-bold text-sm">Solve & Bank Immediately</div>
                <p className="text-slate-400">
                  English vocab, logic series, 8085 interrupt addresses, standard op-amp gains. Takes zero scratchpad calculation.
                </p>
              </div>

              <div className="bg-[#141926] p-4 rounded-2xl border border-blue-500/30 space-y-2">
                <div className="text-blue-400 font-mono font-bold uppercase text-[11px]">Tier B: Single-Pass (30–75s)</div>
                <div className="text-white font-bold text-sm">Execute & Lock</div>
                <p className="text-slate-400">
                  Thevenin with single dependent source, 2nd order damping ratio, instruction timing cycles, K-Map simplification.
                </p>
              </div>

              <div className="bg-[#141926] p-4 rounded-2xl border border-rose-500/30 space-y-2">
                <div className="text-rose-400 font-mono font-bold uppercase text-[11px]">Tier C: Quagmire (&gt;90s)</div>
                <div className="text-white font-bold text-sm">Flag & Defer to Pass 2</div>
                <p className="text-slate-400">
                  Multi-mesh AC transients, 3-stage cascode cascades, complex random variables. Never surrender 4 minutes to 1 question!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: DAILY "RULE OF 3" QUEST LOOP
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'daily' && (
        <div className="space-y-6">
          <div className="bg-[#111420] border border-[#1e2538] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">Habit & Execution Engine</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">The Daily "Rule of 3" Quest Loop</h3>
                <p className="text-slate-400 text-xs mt-1">
                  Replace overwhelming schedules with 3 strictly guarded boxes every single day (4.5 hours total).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Today's Progress:</span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {[dailyBox1, dailyBox2, dailyBox3].filter(Boolean).length} / 3 Completed
                </span>
              </div>
            </div>

            {/* The 3 Boxes */}
            <div className="space-y-4">
              {/* Box 1 */}
              <div
                onClick={() => toggleDailyBox(1)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  dailyBox1 ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-[#151926] border-[#22293d] hover:border-slate-600'
                }`}
              >
                <div className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center ${dailyBox1 ? 'bg-emerald-500 text-black' : 'border border-slate-600'}`}>
                  {dailyBox1 && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">BOX 1: Concept & Shortcut Sheet Formulation (2.0 Hours)</span>
                    <span className="text-xs font-mono text-slate-400">Deep Extraction</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Extract exact formulas, pinouts, and timing cycles. Produce 1 concise cheat sheet without passive reading.
                  </p>
                </div>
              </div>

              {/* Box 2 */}
              <div
                onClick={() => toggleDailyBox(2)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  dailyBox2 ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-[#151926] border-[#22293d] hover:border-slate-600'
                }`}
              >
                <div className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center ${dailyBox2 ? 'bg-emerald-500 text-black' : 'border border-slate-600'}`}>
                  {dailyBox2 && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">BOX 2: High-Velocity Speed Drill (30 Qs in 45 Mins) (1.75 Hours)</span>
                    <span className="text-xs font-mono text-amber-400 font-semibold">Triage Practice</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Solve 30 MCQs under strict stopwatch pressure (75–90s/Q). Eliminate 2 options immediately before calculating.
                  </p>
                </div>
              </div>

              {/* Box 3 */}
              <div
                onClick={() => toggleDailyBox(3)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  dailyBox3 ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-[#151926] border-[#22293d] hover:border-slate-600'
                }`}
              >
                <div className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center ${dailyBox3 ? 'bg-emerald-500 text-black' : 'border border-slate-600'}`}>
                  {dailyBox3 && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">BOX 3: Test I Rapid Reps & 3-Line Error Journal (45 Minutes)</span>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">Zero-Fatigue Bank</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    20 mins: 15 English & Logic questions. 25 mins: 3-line error summary (What concept was missing? What was the trap? What is the 10-second shortcut?).
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions to other parts of the site */}
            <div className="pt-4 border-t border-[#1d2538] flex flex-wrap gap-3">
              <button
                onClick={() => setActiveView('quiz')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 flex items-center gap-1.5"
              >
                <span>Launch Timed Speed Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveView('syllabus')}
                className="px-4 py-2 rounded-xl bg-[#141824] hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-[#232b40] flex items-center gap-1.5"
              >
                <span>Update Topic Mastery Tracker</span>
                <Layers className="w-4 h-4 text-emerald-400" />
              </button>
              <button
                onClick={() => setActiveView('errors')}
                className="px-4 py-2 rounded-xl bg-[#141824] hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-[#232b40] flex items-center gap-1.5"
              >
                <span>Open 3-Line Error Log</span>
                <FileText className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
