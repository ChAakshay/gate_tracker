import React, { useState } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { 
  Target, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Cpu, 
  Compass, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const BitsHdBlueprint: React.FC = () => {
  const { getSecuredMarks, setActiveView } = useProgressStore();
  const securedMarks = getSecuredMarks();

  const [activeTab, setActiveTab] = useState<'blueprint' | 'cutoffs' | 'strategy' | 'microprocessor'>('blueprint');

  const campusCutoffs = [
    {
      campus: 'BITS Pilani (Main Campus)',
      program: 'M.E. Embedded Systems',
      cutoffRound1: 152,
      cutoffFinal: 144,
      safeSpace: 185,
      cushion: '+33 Marks Cushion',
      status: 'Primary Goal (Iteration 1 Guarantee)',
      bg: 'border-blue-500/30 bg-[#121624]'
    },
    {
      campus: 'BITS Goa Campus',
      program: 'M.E. Embedded Systems',
      cutoffRound1: 142,
      cutoffFinal: 134,
      safeSpace: 170,
      cushion: '+28 Marks Cushion',
      status: 'Assured Backup',
      bg: 'border-emerald-500/30 bg-[#10191c]'
    },
    {
      campus: 'BITS Hyderabad Campus',
      program: 'M.E. Embedded Systems',
      cutoffRound1: 136,
      cutoffFinal: 128,
      safeSpace: 165,
      cushion: '+29 Marks Cushion',
      status: 'Safety Net',
      bg: 'border-purple-500/30 bg-[#161224]'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">

      {/* 🏛️ EXECUTIVE HEADER */}
      <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                BITS HD (ECE/EEE) Strategy
              </span>
              <span className="text-xs text-slate-400">
                Target: M.E. Embedded Systems Seat
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              185+ Safe Space Master Blueprint
            </h1>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              The BITS HD test is the standard ECE/EEE exam (100 MCQs in 150 minutes; +3, -1). By banking 185+ marks, you lock in direct Round 1 admission to <strong>M.E. Embedded Systems at BITS Pilani</strong> without cutoff anxiety.
            </p>
          </div>

          <div className="bg-[#141824] p-4 rounded-xl border border-[#202738] text-right self-start sm:self-center">
            <div className="text-[11px] text-slate-400 uppercase font-mono">Current Marks</div>
            <div className="text-2xl font-bold text-white font-mono mt-0.5">
              {securedMarks} <span className="text-xs text-slate-500">/ 185M</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">Safe Space Target</div>
          </div>
        </div>

        {/* Minimal Tab Bar */}
        <div className="flex gap-2 pt-3 border-t border-[#1b2234] overflow-x-auto scrollbar-none">
          {[
            { id: 'blueprint', label: 'Score Blueprint (193/300)' },
            { id: 'cutoffs', label: 'Campus Cutoffs Matrix' },
            { id: 'strategy', label: '1.5-Min Exam Velocity' },
            { id: 'microprocessor', label: '8085 Quick Reference' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-[#141824] text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: 300-MARK SCORE BLUEPRINT (THE REALISTIC MODEL)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'blueprint' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Test I Card */}
            <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1b2234]">
                <div>
                  <h3 className="text-sm font-bold text-white">TEST I: Foundation & Aptitude</h3>
                  <div className="text-[11px] text-slate-400">30 Qs • 45 Mins • 90 Marks (+3, -1)</div>
                </div>
                <span className="text-xs font-mono font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                  Target: 73 / 90 (81%)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-[#141824] border border-[#1d2334]">
                  <div>
                    <span className="font-semibold text-slate-200">English Language (10 Qs)</span>
                    <div className="text-[10px] text-slate-400">Grammar, Prepositions, Vocab</div>
                  </div>
                  <strong className="text-emerald-400 font-mono">26 / 30 Mks</strong>
                </div>

                <div className="flex justify-between p-2.5 rounded-lg bg-[#141824] border border-[#1d2334]">
                  <div>
                    <span className="font-semibold text-slate-200">Logical Reasoning (5 Qs)</span>
                    <div className="text-[10px] text-slate-400">Series, Coding, Direction, Syllogisms</div>
                  </div>
                  <strong className="text-emerald-400 font-mono">15 / 15 Mks</strong>
                </div>

                <div className="flex justify-between p-2.5 rounded-lg bg-[#141824] border border-[#1d2334]">
                  <div>
                    <span className="font-semibold text-slate-200">Engineering Mathematics (15 Qs)</span>
                    <div className="text-[10px] text-slate-400">Linear Algebra, Calculus, Differential Eqns</div>
                  </div>
                  <strong className="text-blue-400 font-mono">32 / 45 Mks</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                💡 <strong>The Secret Weapon:</strong> Test I accounts for 30% of the entire exam. Banking 41 marks from English + Logic in 15 minutes gives you a massive cushion before technical Test II.
              </p>
            </div>

            {/* Test II Card */}
            <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1b2234]">
                <div>
                  <h3 className="text-sm font-bold text-white">TEST II: ECE/EEE Core</h3>
                  <div className="text-[11px] text-slate-400">70 Qs • 105 Mins • 210 Marks (+3, -1)</div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  Target: 120 / 210 (57%)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-[#141824] border border-[#1d2334]">
                  <div>
                    <span className="font-semibold text-slate-200">Digital Circuits & 8085</span>
                    <div className="text-[10px] text-slate-400">FSMs, Counters, 8085 Timing, Interrupts</div>
                  </div>
                  <strong className="text-emerald-400 font-mono">49 / 66 Mks</strong>
                </div>

                <div className="flex justify-between p-2.5 rounded-lg bg-[#141824] border border-[#1d2334]">
                  <div>
                    <span className="font-semibold text-slate-200">Analog Circuits & Op-Amps</span>
                    <div className="text-[10px] text-slate-400">Op-Amps, Comparators, Schmitt Triggers</div>
                  </div>
                  <strong className="text-blue-400 font-mono">31 / 48 Mks</strong>
                </div>

                <div className="flex justify-between p-2.5 rounded-lg bg-[#141824] border border-[#1d2334]">
                  <div>
                    <span className="font-semibold text-slate-200">Signals, Networks & Control</span>
                    <div className="text-[10px] text-slate-400">Z-Transform, 1st Order Transients, Bode</div>
                  </div>
                  <strong className="text-amber-400 font-mono">40 / 96 Mks</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                🎯 <strong>Key Insight:</strong> Because of your strong Test I cushion, you only need <strong>57% net yield in Test II</strong> to achieve the 185+ Safe Space composite score!
              </p>
            </div>

          </div>

          <div className="bg-[#10131d] border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400">Composite Target Total: </span>
              <strong className="text-white font-mono text-sm">73 (Test I) + 120 (Test II) = 193 / 300 Marks</strong>
            </div>
            <span className="text-emerald-400 font-bold font-mono">
              +33 Marks over BITS Pilani Cutoff
            </span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: CAMPUS CUTOFFS MATRIX
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'cutoffs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {campusCutoffs.map((item, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${item.bg} space-y-2`}>
                <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">{item.status}</div>
                <h4 className="text-sm font-bold text-white">{item.campus}</h4>
                <div className="text-xs text-slate-400">{item.program}</div>

                <div className="space-y-1 text-xs pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Round 1 Cutoff:</span>
                    <strong className="text-white font-mono">{item.cutoffRound1} / 300</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Final Iteration:</span>
                    <strong className="text-slate-300 font-mono">{item.cutoffFinal} / 300</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800/60">
                    <span className="text-emerald-400 font-semibold">Safe Space Target:</span>
                    <strong className="text-emerald-400 font-mono font-bold">{item.safeSpace}+</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-4 text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-white">Why Aim for 185+ instead of 152?</div>
            <p>
              Scoring right at the boundary (~145–150) subjects candidates to multi-round waitlists, campus shifting, or losing out to tie-breakers. A score of 185+ guarantees your seat at <strong>BITS Pilani in Iteration 1</strong> without waiting.
            </p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: 1.5-MINUTE EXAM VELOCITY (THE TRIAGE PROTOCOL)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'strategy' && (
        <div className="space-y-4">
          <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">The 1.5-Minute Triage Protocol</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                100 questions in 150 minutes means you have an average of 90 seconds per question. Never get stuck on 4-minute derivations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#141824] p-3.5 rounded-xl border border-emerald-500/30 space-y-1.5">
                <div className="text-emerald-400 font-mono font-bold uppercase text-[10px]">Tier A: Instant Recall (0–30s)</div>
                <div className="text-white font-semibold">Solve & Bank Immediately</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  English vocabulary, logic series, 8085 interrupt vectors, op-amp configurations. Pure memory and direct formulas.
                </p>
              </div>

              <div className="bg-[#141824] p-3.5 rounded-xl border border-blue-500/30 space-y-1.5">
                <div className="text-blue-400 font-mono font-bold uppercase text-[10px]">Tier B: 1-Step Calculation (30–75s)</div>
                <div className="text-white font-semibold">Execute & Lock</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Thevenin equivalent with dependent source, second-order damping ratio, 8085 instruction timing calculation.
                </p>
              </div>

              <div className="bg-[#141824] p-3.5 rounded-xl border border-rose-500/30 space-y-1.5">
                <div className="text-rose-400 font-mono font-bold uppercase text-[10px]">Tier C: Quagmire (&gt;90s)</div>
                <div className="text-white font-semibold">Flag & Defer to Pass 2</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Multi-loop differential equations, complex random processes. Skip immediately to protect your pace.
                </p>
              </div>
            </div>

            {/* The 2-Option Guessing Rule */}
            <div className="p-3.5 rounded-xl bg-[#141824] border border-emerald-500/30 text-xs space-y-1">
              <div className="font-bold text-emerald-300">The 2-Option Elimination Rule (+3, -1)</div>
              <p className="text-slate-300 text-[11px]">
                If you can eliminate 2 wrong options, your expected value is <strong className="text-emerald-400">½(+3) + ½(-1) = +1.0 Mark</strong>. You must always attempt questions where 2 choices are eliminated.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: 8085 MICROPROCESSOR QUICK REFERENCE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'microprocessor' && (
        <div className="space-y-4">
          <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">8085 Microprocessor High-Frequency Essentials</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Common direct question topics in BITS HD Test II that are not in GATE ECE.
              </p>
            </div>

            {/* Interrupt Table */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold">Vector Interrupts & Priority</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { name: 'TRAP (RST 4.5)', vec: '0024H', pri: '1 (Highest)', type: 'Non-maskable, Edge + Level' },
                  { name: 'RST 7.5', vec: '003CH', pri: '2', type: 'Maskable, Edge Triggered' },
                  { name: 'RST 6.5', vec: '0034H', pri: '3', type: 'Maskable, Level Triggered' },
                  { name: 'RST 5.5', vec: '002CH', pri: '4', type: 'Maskable, Level Triggered' },
                  { name: 'INTR', vec: 'External opcode', pri: '5 (Lowest)', type: 'Maskable, Level Triggered' },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#141824] border border-[#1d2334] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.type}</div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-cyan-400 font-bold">{item.vec}</span>
                      <div className="text-[10px] text-slate-500">Pri: {item.pri}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Formulas */}
            <div className="p-3.5 rounded-xl bg-[#141824] border border-[#1d2334] text-xs space-y-1.5">
              <div className="font-bold text-slate-200">Key 8085 Exam Formulas</div>
              <ul className="list-disc list-inside text-slate-400 space-y-1 text-[11px]">
                <li><strong className="text-slate-200">Software Interrupt Vector:</strong> Vector Address = <code className="text-cyan-300">n × 8</code> (in hex). e.g., RST 7 = 7 × 8 = 56 = 0038H.</li>
                <li><strong className="text-slate-200">Operating Clock:</strong> Operating Frequency = Crystal Frequency ÷ 2 (e.g., 6 MHz crystal → 3 MHz internal clock).</li>
                <li><strong className="text-slate-200">Clock Period (T):</strong> T = 1 / f_internal (e.g., at 3 MHz, T = 333.3 ns).</li>
                <li><strong className="text-slate-200">Flag Register:</strong> D7(S), D6(Z), D5(X), D4(AC), D3(X), D2(P), D1(1), D0(CY).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Return to Today Button */}
      <div className="text-center pt-2">
        <button
          onClick={() => setActiveView('today')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
        >
          <span>Return to Today's Essentials</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
