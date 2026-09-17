import React from 'react';
import { Target, CheckCircle, Clock, ShieldCheck, ChevronRight, Award } from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const phases = [
    {
      phase: 'Phase 1: Foundations & High-Yield Core',
      weeks: 'Weeks 1 – 6 (Aug 15 – Sep 30)',
      targetMarks: '~32–36 Marks',
      status: 'In Progress (Week 1)',
      subjects: [
        { name: 'Engineering Mathematics (Linear Algebra + Calculus)', weight: '13 Marks', status: 'Active (Week 1)' },
        { name: 'General Aptitude (Verbal + Numerical)', weight: '15 Marks', status: 'Active (Week 1-2)' },
        { name: 'Network Theory (Transients, AC Resonance, 2-Port)', weight: '8-10 Marks', status: 'Queued (Week 3-4)' },
        { name: 'Signals & Systems (LTI, Fourier, Laplace, Z-Transform)', weight: '7-9 Marks', status: 'Queued (Week 5-6)' }
      ]
    },
    {
      phase: 'Phase 2: Core Hardware & Systems',
      weeks: 'Weeks 7 – 12 (Oct 1 – Nov 15)',
      targetMarks: '~24–28 Marks',
      status: 'Upcoming',
      subjects: [
        { name: 'Control Systems (Time response, Routh, Nyquist, Bode)', weight: '8-9 Marks', status: 'Queued (Week 7-8)' },
        { name: 'Digital Circuits (Combinational, Sequential, Counters)', weight: '7-8 Marks', status: 'Queued (Week 9-10)' },
        { name: 'Analog Circuits (Op-Amps, Diode Clippers, Small Signal)', weight: '8-9 Marks', status: 'Queued (Week 11-12)' }
      ]
    },
    {
      phase: 'Phase 3: Deep Physics & 80/20 Selective Finish',
      weeks: 'Weeks 13 – 18 (Nov 16 – Dec 31)',
      targetMarks: '~18–22 Marks',
      status: 'Upcoming',
      subjects: [
        { name: 'Semiconductor Physics & EDC (PN Diode, BJT, MOSFET)', weight: '8-9 Marks', status: 'Queued (Week 13-14)' },
        { name: 'Communications (Analog & Digital Modulation, SNR, PCM)', weight: '9-10 Marks', status: 'Queued (Week 15-16)' },
        { name: 'Selective Electromagnetics (Transmission Lines & Plane Waves)', weight: '5-6 Marks', status: 'Queued (Week 17-18)' }
      ]
    },
    {
      phase: 'Phase 4: January Mock Simulation & IIIT-B Lock-In',
      weeks: 'Jan 1 – Jan 31, 2027',
      targetMarks: 'GATE Score ≥ 650',
      status: 'Final Simulation',
      subjects: [
        { name: '12-15 Full Length CBT 3-Hour Mock Tests (TCS iON)', weight: '100 Marks', status: 'Scheduled' },
        { name: '3-Line Error Log Deep Remediation', weight: 'Key to 70+ Raw', status: 'Scheduled' },
        { name: 'Formula Flash Card Rapid Fire Revisions', weight: 'Retention', status: 'Scheduled' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Target Scorecard Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 via-[#12141c] to-[#12141c] border border-blue-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Target Benchmark</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">IIIT Bangalore — M.Tech ECE</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Target: <strong>GATE Score ≥ 650</strong> • Raw Marks: <strong>~68–74 / 100</strong>
          </p>
        </div>

        <div className="flex gap-3">
          <div className="p-3 bg-[#181d2a] rounded-xl border border-slate-800 text-center">
            <div className="text-xl font-mono font-bold text-emerald-400">18 WEEKS</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Timeline</div>
          </div>
          <div className="p-3 bg-[#181d2a] rounded-xl border border-slate-800 text-center">
            <div className="text-xl font-mono font-bold text-purple-400">100%</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Syllabus Target</div>
          </div>
        </div>
      </div>

      {/* 4 Phases Timeline */}
      <div className="space-y-6">
        {phases.map((phase, pIdx) => (
          <div key={pIdx} className="bg-[#12141c] border border-[#1f2433] rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 text-xs flex items-center justify-center font-mono">
                    {pIdx + 1}
                  </span>
                  {phase.phase}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">{phase.weeks}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  {phase.targetMarks}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  pIdx === 0 ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40' : 'bg-slate-800 text-slate-400'
                }`}>
                  {phase.status}
                </span>
              </div>
            </div>

            {/* Subject Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {phase.subjects.map((sub, sIdx) => (
                <div key={sIdx} className="p-3.5 rounded-xl bg-[#161a26] border border-[#23293b] flex items-center justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="font-semibold text-xs text-slate-200">{sub.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Weight: <span className="text-slate-300 font-semibold">{sub.weight}</span></div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    sub.status.includes('Active') 
                      ? 'bg-blue-900/60 text-blue-200 border border-blue-700' 
                      : 'bg-slate-800/80 text-slate-400'
                  }`}>
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
