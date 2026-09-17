import React, { useState, useEffect } from 'react';
import { Question, ErrorLogEntry } from '../../types/gate';
import { MathView } from '../MathView';
import { evaluateAnswer } from '../../lib/scoringEngine';
import { useGateStore } from '../../store/useGateStore';
import { Timer, AlertTriangle, CheckCircle, XCircle, ArrowRight, BookOpen, PenTool, Calculator } from 'lucide-react';

export const PyqArena: React.FC = () => {
  const { questions, currentQuestionIndex, setCurrentQuestionIndex, recordResponse, addErrorLog, toggleCalc } = useGateStore();
  const currentQ = questions[currentQuestionIndex] || questions[0];

  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // 3-Line Error Log Modal State
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorType, setErrorType] = useState<'conceptual' | 'calculation' | 'reading' | 'formula'>('calculation');
  const [errorLine1, setErrorLine1] = useState('');
  const [errorLine2, setErrorLine2] = useState('');
  const [errorLine3, setErrorLine3] = useState('');

  // Reset timer on question change
  useEffect(() => {
    setSeconds(0);
    setTimerRunning(true);
    setSelectedAnswer('');
    setIsSubmitted(false);
    setShowSolution(false);
  }, [currentQuestionIndex]);

  // Timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning && !isSubmitted) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, isSubmitted]);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 3-Pass Timer Stage Indicator
  const getTimerStage = () => {
    if (seconds < 180) {
      return { label: 'Pass 1 (Speed)', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40', badge: 'bg-emerald-500' };
    }
    if (seconds < 240) {
      return { label: 'Pass 2 (Standard)', color: 'text-amber-400 border-amber-500/30 bg-amber-950/40', badge: 'bg-amber-500' };
    }
    return { label: 'Bailout Zone (>4m)', color: 'text-red-400 border-red-500/30 bg-red-950/40 animate-pulse', badge: 'bg-red-500' };
  };

  const timerStage = getTimerStage();

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    if (currentQ.type === 'MCQ') {
      setSelectedAnswer(optId);
    } else if (currentQ.type === 'MSQ') {
      const current = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      if (current.includes(optId)) {
        setSelectedAnswer(current.filter(id => id !== optId));
      } else {
        setSelectedAnswer([...current, optId]);
      }
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimerRunning(false);
    recordResponse(currentQ.id, selectedAnswer);
  };

  const evalResult = isSubmitted ? evaluateAnswer(currentQ, selectedAnswer) : null;

  const handleSaveErrorLog = () => {
    if (!errorLine1 || !errorLine2) return;
    const summary = `1. ${errorLine1}\n2. ${errorLine2}\n3. ${errorLine3 || 'Review in next pass'}`;
    addErrorLog({
      questionId: currentQ.id,
      date: new Date().toISOString().split('T')[0],
      errorType,
      threeLineSummary: summary,
    });
    setShowErrorModal(false);
    setErrorLine1('');
    setErrorLine2('');
    setErrorLine3('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Question Navigation & Arena Controls */}
      <div className="bg-[#12141c] border border-[#1f2433] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-200">PYQ Arena</span>
          <span className="text-slate-600">•</span>
          <div className="flex gap-1.5">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  idx === currentQuestionIndex 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-400' 
                    : 'bg-[#181d2a] text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Timer & Calculator Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCalc}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181d2a] hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            Virtual Calc
          </button>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold ${timerStage.color}`}>
            <Timer className="w-4 h-4" />
            <span>{formatTimer(seconds)}</span>
            <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-900/60 font-sans">
              {timerStage.label}
            </span>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-[#12141c] border border-[#1f2433] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative">
        {/* Question Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f2433] text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold">
              {currentQ.type}
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-medium">
              GATE {currentQ.year}
            </span>
            <span className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-medium">
              Tier {currentQ.tier}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Marks: <strong className="text-emerald-400">+{currentQ.marks}</strong></span>
            <span>Penalty: <strong className="text-red-400">{currentQ.type === 'MCQ' ? (currentQ.marks === 1 ? '-0.33' : '-0.66') : '0.00'}</strong></span>
          </div>
        </div>

        {/* Question LaTeX Statement */}
        <div className="py-2 text-base sm:text-lg leading-relaxed text-slate-100 font-sans">
          <MathView content={currentQ.textMarkdown} />
        </div>

        {/* Options / NAT Input Form */}
        <div className="space-y-3 pt-2">
          {currentQ.type === 'NAT' ? (
            <div className="bg-[#181d2a] p-4 rounded-xl border border-[#242c40] space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Numerical Answer (Keyboard Input)
              </label>
              <input
                type="number"
                step="any"
                disabled={isSubmitted}
                value={typeof selectedAnswer === 'string' ? selectedAnswer : ''}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                placeholder="Enter exact numerical value..."
                className="w-full sm:w-72 bg-[#0d1017] border border-slate-700 rounded-lg px-4 py-3 text-lg font-mono text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options?.map((opt, idx) => {
                const isSelected = Array.isArray(selectedAnswer) 
                  ? selectedAnswer.includes(opt.id) 
                  : selectedAnswer === opt.id;
                
                let borderClass = 'border-[#242c40] hover:border-slate-600 bg-[#161a26]';
                if (isSubmitted) {
                  if (opt.isCorrect) borderClass = 'border-emerald-500 bg-emerald-950/30';
                  else if (isSelected && !opt.isCorrect) borderClass = 'border-red-500 bg-red-950/30';
                } else if (isSelected) {
                  borderClass = 'border-blue-500 bg-blue-950/30';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${borderClass}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div className="flex-1">
                      <MathView content={opt.textMarkdown} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1f2433]">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              Submit Answer
            </button>
          ) : (
            <div className="w-full space-y-4">
              {/* Result Banner */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                evalResult?.isCorrect 
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' 
                  : 'bg-red-950/40 border-red-500/50 text-red-300'
              }`}>
                <div className="flex items-center gap-3">
                  {evalResult?.isCorrect ? <CheckCircle className="w-6 h-6 text-emerald-400" /> : <XCircle className="w-6 h-6 text-red-400" />}
                  <div>
                    <div className="font-bold text-base">
                      {evalResult?.isCorrect ? 'Correct Answer!' : 'Incorrect / Missed'}
                    </div>
                    <div className="text-xs opacity-80">
                      Score: <strong>{(evalResult?.netScore ?? 0) > 0 ? `+${evalResult?.netScore}` : evalResult?.netScore} Marks</strong>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!evalResult?.isCorrect && (
                    <button
                      onClick={() => setShowErrorModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700 text-xs font-bold flex items-center gap-1.5"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      Log Error (3-Line)
                    </button>
                  )}
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {showSolution ? 'Hide Solution' : 'View Solution'}
                  </button>
                </div>
              </div>

              {/* Solution Accordion */}
              {showSolution && (
                <div className="p-5 rounded-xl bg-[#0e1118] border border-[#22293d] space-y-2 animate-in fade-in duration-300">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">Step-by-Step Pedagogical Derivation</h4>
                  <MathView content={currentQ.solutionMarkdown} className="text-sm text-slate-300 font-mono" />
                </div>
              )}

              {/* Next Question button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    if (currentQuestionIndex < questions.length - 1) {
                      setCurrentQuestionIndex(currentQuestionIndex + 1);
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3-Line Error Log Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#151924] border border-[#28324a] rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-slate-100">3-Line Error Log Protocol</h3>
              </div>
              <button onClick={() => setShowErrorModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-400">
              No emotional essays. Quantify the cognitive failure in 3 distinct lines.
            </p>

            {/* Error Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold">Taxonomy Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {(['conceptual', 'calculation', 'reading', 'formula'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setErrorType(t)}
                    className={`py-2 px-2.5 rounded-lg font-bold capitalize transition-colors ${
                      errorType === t ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Input lines */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Line 1: What was my misconception / calculation error?</label>
                <input
                  type="text"
                  value={errorLine1}
                  onChange={(e) => setErrorLine1(e.target.value)}
                  placeholder="e.g., Assumed GM equals AM without computing nullity"
                  className="w-full bg-[#0c0f16] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Line 2: What is the exact mathematical truth?</label>
                <input
                  type="text"
                  value={errorLine2}
                  onChange={(e) => setErrorLine2(e.target.value)}
                  placeholder="e.g., GM = n - rank(A - λI)"
                  className="w-full bg-[#0c0f16] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Line 3: Future Trigger / Safeguard</label>
                <input
                  type="text"
                  value={errorLine3}
                  onChange={(e) => setErrorLine3(e.target.value)}
                  placeholder="e.g., When matrix has non-diagonal entries, compute rank(A-λI) explicitly"
                  className="w-full bg-[#0c0f16] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button onClick={() => setShowErrorModal(false)} className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700">Cancel</button>
              <button onClick={handleSaveErrorLog} className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30">Save to Error Log</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
