import React, { useState, useEffect, useCallback } from 'react';
import { 
  TECHNICAL_WRITING_QUIZ_DATA, 
  QuizQuestion 
} from '../../data/quizQuestions';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Award, 
  Play, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  SlidersHorizontal, 
  Printer, 
  Repeat, 
  History, 
  BookOpen, 
  Layers, 
  ArrowLeft 
} from 'lucide-react';

export interface QuizAttemptRecord {
  id: string;
  date: string;
  scope: string;
  mode: string;
  negativeMarking: boolean;
  totalQuestions: number;
  totalCorrect: number;
  totalWrong: number;
  totalUnattempted: number;
  rawScore: number;
  percentage: string;
  accuracy: string;
  timeSpentSec: number;
  unit1: { correct: number; wrong: number; unattempted: number; total: number };
  unit2: { correct: number; wrong: number; unattempted: number; total: number };
  answers: Record<string, string>;
  questions: QuizQuestion[];
}

const STORAGE_KEY_HISTORY = 'tech_writing_quiz_history_v1';

export const QuizArena: React.FC = () => {
  // Views: 'setup' | 'test' | 'results'
  const [view, setView] = useState<'setup' | 'test' | 'results'>('setup');
  
  // Setup configuration
  const [scope, setScope] = useState<'all' | 'unit1' | 'unit2'>('all');
  const [mode, setMode] = useState<'exam' | 'practice'>('exam');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(60);
  const [negativeMarking, setNegativeMarking] = useState<boolean>(false);

  // Active test state
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<'unit-1' | 'unit-2'>('unit-1');
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({});

  // Timer
  const [timeRemaining, setTimeRemaining] = useState<number>(3600);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Results & Review
  const [result, setResult] = useState<QuizAttemptRecord | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted' | 'marked'>('all');
  const [history, setHistory] = useState<QuizAttemptRecord[]>([]);

  // Load history on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (raw) setHistory(JSON.parse(raw));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveToHistory = (res: QuizAttemptRecord) => {
    const updated = [res, ...history].slice(0, 30);
    setHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const clearHistory = () => {
    if (window.confirm('Clear all test attempt history?')) {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
      setHistory([]);
    }
  };

  // Start Test
  const startTest = (
    customScope = scope, 
    customMode = mode, 
    customTime = timeLimitMinutes, 
    customNeg = negativeMarking, 
    customList: QuizQuestion[] | null = null
  ) => {
    let qList: QuizQuestion[] = [];
    if (customList) {
      qList = customList;
    } else {
      if (customScope === 'all' || customScope === 'unit1') {
        qList = qList.concat(TECHNICAL_WRITING_QUIZ_DATA.unit1.questions);
      }
      if (customScope === 'all' || customScope === 'unit2') {
        qList = qList.concat(TECHNICAL_WRITING_QUIZ_DATA.unit2.questions);
      }
    }

    setActiveQuestions(qList);
    setCurrentIndex(0);
    setActiveSection(qList[0].unit);
    setAnswers({});
    setMarkedForReview({});
    setVisited({ [qList[0].id]: true });

    setTimeRemaining(customTime * 60);
    setTimerRunning(customTime > 0);
    setView('test');
  };

  // Timer Tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (view === 'test' && timerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            submitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [view, timerRunning, timeRemaining]);

  const submitTest = useCallback(() => {
    setTimerRunning(false);

    let u1Correct = 0, u1Wrong = 0, u1Unattempted = 0;
    let u2Correct = 0, u2Wrong = 0, u2Unattempted = 0;

    activeQuestions.forEach(q => {
      const userAns = answers[q.id];
      const isU1 = (q.unit === 'unit-1');

      if (!userAns) {
        if (isU1) u1Unattempted++; else u2Unattempted++;
      } else if (userAns === q.answer) {
        if (isU1) u1Correct++; else u2Correct++;
      } else {
        if (isU1) u1Wrong++; else u2Wrong++;
      }
    });

    const totalQuestions = activeQuestions.length;
    const totalCorrect = u1Correct + u2Correct;
    const totalWrong = u1Wrong + u2Wrong;
    const totalUnattempted = u1Unattempted + u2Unattempted;

    const penalty = negativeMarking ? 0.25 : 0;
    const rawScore = totalCorrect - (totalWrong * penalty);
    const accuracy = (totalCorrect + totalWrong) > 0 ? ((totalCorrect / (totalCorrect + totalWrong)) * 100).toFixed(1) : '0.0';
    const percentage = ((totalCorrect / totalQuestions) * 100).toFixed(1);

    const timeSpentSec = (timeLimitMinutes * 60) - timeRemaining;

    const res: QuizAttemptRecord = {
      id: 'test-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      scope,
      mode,
      negativeMarking,
      totalQuestions,
      totalCorrect,
      totalWrong,
      totalUnattempted,
      rawScore: parseFloat(rawScore.toFixed(2)),
      percentage,
      accuracy,
      timeSpentSec: timeSpentSec > 0 ? timeSpentSec : 0,
      unit1: { correct: u1Correct, wrong: u1Wrong, unattempted: u1Unattempted, total: TECHNICAL_WRITING_QUIZ_DATA.unit1.total },
      unit2: { correct: u2Correct, wrong: u2Wrong, unattempted: u2Unattempted, total: TECHNICAL_WRITING_QUIZ_DATA.unit2.total },
      answers: { ...answers },
      questions: [...activeQuestions]
    };

    saveToHistory(res);
    setResult(res);
    setView('results');
    setReviewFilter('all');
  }, [activeQuestions, answers, negativeMarking, timeLimitMinutes, timeRemaining, scope, mode]);

  const retakeMissedQuestions = () => {
    if (!result) return;
    const missed = result.questions.filter(q => result.answers[q.id] !== q.answer);
    if (missed.length === 0) {
      alert('100% Score! No missed questions to retake.');
      return;
    }
    startTest('all', 'practice', Math.ceil(missed.length * 1.2), false, missed);
  };

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    const q = activeQuestions[currentIndex];
    if (!q) return;
    setAnswers(prev => {
      if (prev[q.id] === opt) {
        const next = { ...prev };
        delete next[q.id];
        return next;
      }
      return { ...prev, [q.id]: opt };
    });
  };

  const clearOption = () => {
    const q = activeQuestions[currentIndex];
    if (!q) return;
    setAnswers(prev => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
  };

  const toggleReview = () => {
    const q = activeQuestions[currentIndex];
    if (!q) return;
    setMarkedForReview(prev => ({
      ...prev,
      [q.id]: !prev[q.id]
    }));
  };

  const nextQ = () => {
    if (currentIndex < activeQuestions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      const nextItem = activeQuestions[nextIdx];
      setVisited(v => ({ ...v, [nextItem.id]: true }));
      setActiveSection(nextItem.unit);
    }
  };

  const prevQ = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      const prevItem = activeQuestions[prevIdx];
      setVisited(v => ({ ...v, [prevItem.id]: true }));
      setActiveSection(prevItem.unit);
    }
  };

  const jumpTo = (idx: number) => {
    if (idx >= 0 && idx < activeQuestions.length) {
      setCurrentIndex(idx);
      const target = activeQuestions[idx];
      setVisited(v => ({ ...v, [target.id]: true }));
      setActiveSection(target.unit);
    }
  };

  const formatTime = (secs: number) => {
    if (secs < 0) secs = 0;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // Keyboard shortcut listener
  useEffect(() => {
    if (view !== 'test') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k === '1' || k === 'A') handleSelectOption('A');
      else if (k === '2' || k === 'B') handleSelectOption('B');
      else if (k === '3' || k === 'C') handleSelectOption('C');
      else if (k === '4' || k === 'D') handleSelectOption('D');
      else if (k === 'ENTER') nextQ();
      else if (k === 'ARROWLEFT') prevQ();
      else if (k === 'ARROWRIGHT') nextQ();
      else if (k === 'M') toggleReview();
      else if (k === 'ESCAPE') clearOption();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, currentIndex, activeQuestions]);

  // ==========================================
  // VIEW: SETUP / HOME
  // ==========================================
  if (view === 'setup') {
    const bestPct = history.reduce((max, c) => (parseFloat(c.percentage) > max ? parseFloat(c.percentage) : max), 0);

    return (
      <div className="max-w-4xl mx-auto w-full p-4 sm:p-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Two-Section Technical Writing Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            Unit I & Unit II Exam Simulator
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            100 verified questions with automated forensic grading, timing metrics, and targeted error replay.
          </p>
        </div>

        {/* 4 Overview Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#101522] border border-[#1e2638] p-4 rounded-2xl text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Total Question Bank</div>
            <div className="text-2xl font-black text-white">100 MCQs</div>
            <div className="text-[10px] text-blue-400 font-mono mt-0.5">50 + 50 Equal Split</div>
          </div>
          <div className="bg-[#101522] border border-[#1e2638] p-4 rounded-2xl text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Section 1 (Unit I)</div>
            <div className="text-2xl font-black text-emerald-400">50 Qs</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Intro to Tech Comm</div>
          </div>
          <div className="bg-[#101522] border border-[#1e2638] p-4 rounded-2xl text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Section 2 (Unit II)</div>
            <div className="text-2xl font-black text-indigo-400">50 Qs</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Research & Analysis</div>
          </div>
          <div className="bg-[#101522] border border-[#1e2638] p-4 rounded-2xl text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Personal Best</div>
            <div className="text-2xl font-black text-amber-400">{history.length > 0 ? `${bestPct}%` : '—'}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{history.length} Attempt(s) logged</div>
          </div>
        </div>

        {/* Configuration Box */}
        <div className="bg-[#101522] border border-[#1e2638] rounded-3xl p-6 sm:p-8 shadow-2xl mb-6">
          <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-400" />
            Configure Your Test Session
          </h2>

          {/* Scope Selector */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Exam Scope
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setScope('all')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  scope === 'all'
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                    : 'bg-[#151b2b] border-[#252f47] text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="font-bold text-sm flex items-center justify-between">
                  <span>Full Exam (Both Sections)</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">100 Qs</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Section 1: Unit I (50) + Section 2: Unit II (50)</div>
              </button>

              <button
                type="button"
                onClick={() => setScope('unit1')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  scope === 'unit1'
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                    : 'bg-[#151b2b] border-[#252f47] text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="font-bold text-sm flex items-center justify-between">
                  <span>Unit I Only</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">50 Qs</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Introduction to Technical Communication</div>
              </button>

              <button
                type="button"
                onClick={() => setScope('unit2')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  scope === 'unit2'
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                    : 'bg-[#151b2b] border-[#252f47] text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="font-bold text-sm flex items-center justify-between">
                  <span>Unit II Only</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">50 Qs</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Research Process & Evaluation Stages</div>
              </button>
            </div>
          </div>

          {/* Mode & Timer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Test Format</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('exam')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    mode === 'exam'
                      ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-md'
                      : 'bg-[#151b2b] border-[#252f47] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-sm">⏱️ Timed Exam</div>
                  <div className="text-[11px] opacity-80 mt-0.5">Submit to grade</div>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('practice')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    mode === 'practice'
                      ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-md'
                      : 'bg-[#151b2b] border-[#252f47] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-sm">🎯 Practice Mode</div>
                  <div className="text-[11px] opacity-80 mt-0.5">Instant check & feedback</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Timer Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {[60, 90, 0].map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setTimeLimitMinutes(mins)}
                    className={`p-3 rounded-xl border text-center text-xs transition-all ${
                      timeLimitMinutes === mins
                        ? 'bg-blue-600 text-white font-bold border-blue-500'
                        : 'bg-[#151b2b] border-[#252f47] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mins === 0 ? 'Untimed' : `${mins} Mins`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Negative Marking Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#151b2b] border border-[#252f47] mb-6">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Negative Marking (-0.25)</span>
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${negativeMarking ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-300'}`}>
                  {negativeMarking ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Deduct 0.25 marks for each incorrect response</div>
            </div>
            <button
              type="button"
              onClick={() => setNegativeMarking(!negativeMarking)}
              className={`w-12 h-6 rounded-full transition-colors relative ${negativeMarking ? 'bg-blue-600' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${negativeMarking ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          {/* Launch Button */}
          <button
            type="button"
            onClick={() => startTest()}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Launch Examination</span>
          </button>
        </div>

        {/* History Table */}
        {history.length > 0 && (
          <div className="bg-[#101522] border border-[#1e2638] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" />
                Previous Test Runs ({history.length})
              </h3>
              <button
                type="button"
                onClick={clearHistory}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Clear History
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#212a40] text-slate-400">
                    <th className="pb-2.5 font-semibold">Date</th>
                    <th className="pb-2.5 font-semibold">Scope</th>
                    <th className="pb-2.5 font-semibold">Score</th>
                    <th className="pb-2.5 font-semibold">Unit 1</th>
                    <th className="pb-2.5 font-semibold">Unit 2</th>
                    <th className="pb-2.5 font-semibold">Accuracy</th>
                    <th className="pb-2.5 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2638]">
                  {history.slice(0, 5).map(item => (
                    <tr key={item.id} className="hover:bg-[#141b2c] transition-colors">
                      <td className="py-2.5 font-mono text-slate-400">{item.date}</td>
                      <td className="py-2.5 capitalize font-bold text-slate-200">{item.scope}</td>
                      <td className="py-2.5">
                        <span className={`font-bold font-mono ${parseFloat(item.percentage) >= 80 ? 'text-emerald-400' : parseFloat(item.percentage) >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                          {item.rawScore} / {item.totalQuestions} ({item.percentage}%)
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-slate-300">{item.unit1.correct}/{item.unit1.total}</td>
                      <td className="py-2.5 font-mono text-slate-300">{item.unit2.correct}/{item.unit2.total}</td>
                      <td className="py-2.5 font-mono text-blue-400 font-bold">{item.accuracy}%</td>
                      <td className="py-2.5 font-mono text-slate-400">{formatTime(item.timeSpentSec)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    );
  }

  // ==========================================
  // VIEW: ACTIVE TEST TAKING
  // ==========================================
  if (view === 'test') {
    const q = activeQuestions[currentIndex];
    const total = activeQuestions.length;
    const currentAns = answers[q?.id];
    const isMarked = !!markedForReview[q?.id];

    const u1Questions = activeQuestions.filter(item => item.unit === 'unit-1');
    const u2Questions = activeQuestions.filter(item => item.unit === 'unit-2');
    const u1Answered = u1Questions.filter(item => !!answers[item.id]).length;
    const u2Answered = u2Questions.filter(item => !!answers[item.id]).length;
    const totalAnswered = Object.keys(answers).length;
    const totalMarked = Object.keys(markedForReview).length;

    return (
      <div className="flex-1 flex flex-col">
        {/* Sticky Exam Top Bar */}
        <div className="sticky top-0 z-30 bg-[#0d121f]/95 backdrop-blur border-b border-[#1f283d] px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-xs shadow-md shadow-blue-500/20">
                TW
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-xs text-white flex items-center gap-2">
                  <span>Unit I & II CBT Exam</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${mode === 'practice' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {mode === 'practice' ? 'Practice' : 'Exam'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Total: {total} Questions</div>
              </div>
            </div>

            {/* Section Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-[#141b2c] p-1 rounded-2xl border border-[#232f4a]">
              {u1Questions.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection('unit-1');
                    const idx = activeQuestions.findIndex(item => item.unit === 'unit-1');
                    if (idx !== -1) jumpTo(idx);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeSection === 'unit-1' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>Sec 1: Unit I</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${activeSection === 'unit-1' ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-300'}`}>
                    {u1Answered}/{u1Questions.length}
                  </span>
                </button>
              )}

              {u2Questions.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection('unit-2');
                    const idx = activeQuestions.findIndex(item => item.unit === 'unit-2');
                    if (idx !== -1) jumpTo(idx);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeSection === 'unit-2' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>Sec 2: Unit II</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${activeSection === 'unit-2' ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-300'}`}>
                    {u2Answered}/{u2Questions.length}
                  </span>
                </button>
              )}
            </div>

            {/* Timer & Finish */}
            <div className="flex items-center gap-2.5">
              {timeLimitMinutes > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141b2c] border border-[#232f4a] text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span className={`font-bold ${timeRemaining < 300 ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Are you ready to submit your test and view detailed forensics?')) {
                    submitTest();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Submit Test</span>
              </button>
            </div>

          </div>
        </div>

        {/* Main Work Area */}
        <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Question Card (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-[#101522] border border-[#1e2638] rounded-3xl p-6 sm:p-8 shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-[#1f283d] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold">
                    Q{currentIndex + 1} of {total}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {q?.unitName} (Q{q?.number})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isMarked && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                      <Flag className="w-3 h-3 fill-current" />
                      Marked
                    </span>
                  )}
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    +1.0 / {negativeMarking ? '-0.25' : '0.0'}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed mb-6">
                {q?.question}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {(['A', 'B', 'C', 'D'] as const).map(optKey => {
                  const optText = q?.options[optKey] || '';
                  const isSelected = (currentAns === optKey);
                  let btnClass = 'bg-[#151b2b] border-[#252f47] text-slate-300 hover:border-slate-500';

                  if (mode === 'practice' && currentAns) {
                    if (optKey === q?.answer) {
                      btnClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-100 font-bold';
                    } else if (isSelected && optKey !== q?.answer) {
                      btnClass = 'bg-red-950/40 border-red-500 text-red-100 font-bold';
                    }
                  } else if (isSelected) {
                    btnClass = 'bg-blue-600/20 border-blue-500 text-white font-bold shadow-lg shadow-blue-500/10';
                  }

                  return (
                    <button
                      key={optKey}
                      type="button"
                      onClick={() => handleSelectOption(optKey)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${btnClass}`}
                    >
                      <div className="pt-0.5">
                        <div className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                          {optKey}
                        </div>
                      </div>
                      <div className="text-sm leading-snug flex-1">{optText}</div>
                    </button>
                  );
                })}
              </div>

              {/* Practice Mode Feedback */}
              {mode === 'practice' && currentAns && (
                <div className={`p-4 rounded-2xl mb-6 ${currentAns === q?.answer ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200' : 'bg-red-950/40 border border-red-500/40 text-red-200'}`}>
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    {currentAns === q?.answer ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{currentAns === q?.answer ? 'Correct Answer!' : 'Incorrect Choice'}</span>
                  </div>
                  <div className="text-xs opacity-90">
                    The verified correct option is <strong>{q?.answer}: {q?.options[q.answer]}</strong>.
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1f283d]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevQ}
                    disabled={currentIndex === 0}
                    className="px-4 py-2.5 rounded-xl bg-[#171f33] hover:bg-[#1f2a45] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    onClick={clearOption}
                    disabled={!currentAns}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleReview}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      isMarked ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-[#171f33] border-[#252f47] text-slate-300 hover:text-white'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{isMarked ? 'Unmark Review' : 'Mark for Review'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={nextQ}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition-all"
                  >
                    <span>{currentIndex === total - 1 ? 'Last Question' : 'Save & Next'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Keyboard Hints */}
              <div className="hidden sm:flex items-center justify-between text-[11px] text-slate-500 font-mono mt-4 pt-2 border-t border-slate-800/40">
                <span>[1-4 / A-D] Choose Option</span>
                <span>[Enter] Next Question</span>
                <span>[M] Toggle Mark</span>
                <span>[Esc] Clear</span>
              </div>
            </div>

          </div>

          {/* Question Palette Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-[#101522] border border-[#1e2638] rounded-3xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#1f283d]">
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    {activeSection === 'unit-1' ? 'Section 1: Unit I' : 'Section 2: Unit II'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {activeSection === 'unit-1' ? 'Introduction to Technical Comm' : 'Research Process & Evaluation'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-blue-400">
                    {totalAnswered}/{total} Answered
                  </div>
                  <div className="text-[10px] text-amber-400 font-mono">
                    {totalMarked} Marked
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-400 mb-4 bg-[#141b2c] p-2.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-emerald-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-amber-500" />
                  <span>Marked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-purple-500" />
                  <span>Answered & Marked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-slate-700" />
                  <span>Unvisited</span>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-2 max-h-[360px] overflow-y-auto pr-1">
                {activeQuestions.map((item, idx) => {
                  if (item.unit !== activeSection && scope === 'all') return null;

                  const hasAns = !!answers[item.id];
                  const hasMarked = !!markedForReview[item.id];
                  const isCurrent = (idx === currentIndex);

                  let bgClass = 'bg-slate-800 text-slate-400 hover:bg-slate-700';
                  if (hasAns && hasMarked) {
                    bgClass = 'bg-purple-600 text-white font-bold';
                  } else if (hasAns) {
                    bgClass = 'bg-emerald-600 text-white font-bold';
                  } else if (hasMarked) {
                    bgClass = 'bg-amber-600 text-white font-bold';
                  } else if (visited[item.id]) {
                    bgClass = 'bg-slate-700 text-slate-300';
                  }

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => jumpTo(idx)}
                      className={`h-9 rounded-xl text-xs font-mono font-bold transition-all ${bgClass} ${
                        isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-[#101522]' : ''
                      }`}
                    >
                      {item.number}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Switcher */}
            <div className="mt-4 pt-3 border-t border-[#1f283d] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveSection('unit-1');
                  const idx = activeQuestions.findIndex(item => item.unit === 'unit-1');
                  if (idx !== -1) jumpTo(idx);
                }}
                className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all ${
                  activeSection === 'unit-1' ? 'bg-blue-600 text-white' : 'bg-[#151b2b] text-slate-400 hover:text-slate-200'
                }`}
              >
                Unit I (1–50)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveSection('unit-2');
                  const idx = activeQuestions.findIndex(item => item.unit === 'unit-2');
                  if (idx !== -1) jumpTo(idx);
                }}
                className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all ${
                  activeSection === 'unit-2' ? 'bg-blue-600 text-white' : 'bg-[#151b2b] text-slate-400 hover:text-slate-200'
                }`}
              >
                Unit II (1–50)
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: RESULTS & FORENSICS
  // ==========================================
  if (!result) return null;

  const pct = parseFloat(result.percentage);
  let gradeBadge = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
  let gradeLabel = 'Mastery Achieved (Grade A+)';
  let gradeColor = 'text-emerald-400';

  if (pct < 60) {
    gradeBadge = 'bg-red-500/20 text-red-400 border border-red-500/30';
    gradeLabel = 'Needs Revision';
    gradeColor = 'text-red-400';
  } else if (pct < 80) {
    gradeBadge = 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    gradeLabel = 'Strong Foundation (Grade B)';
    gradeColor = 'text-amber-400';
  }

  let filteredReview = result.questions;
  if (reviewFilter === 'correct') {
    filteredReview = result.questions.filter(q => result.answers[q.id] === q.answer);
  } else if (reviewFilter === 'incorrect') {
    filteredReview = result.questions.filter(q => !!result.answers[q.id] && result.answers[q.id] !== q.answer);
  } else if (reviewFilter === 'unattempted') {
    filteredReview = result.questions.filter(q => !result.answers[q.id]);
  } else if (reviewFilter === 'marked') {
    filteredReview = result.questions.filter(q => !!markedForReview[q.id]);
  }

  return (
    <div className="max-w-5xl mx-auto w-full p-4 sm:p-8">
      {/* Top Breadcrumb Actions */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => setView('setup')}
          className="px-3.5 py-2 rounded-xl bg-[#151b2b] hover:bg-[#1f283d] text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Setup</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-[#151b2b] hover:bg-[#1f283d] text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <button
            type="button"
            onClick={retakeMissedQuestions}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/20 flex items-center gap-1.5 transition-all"
          >
            <Repeat className="w-4 h-4" />
            <span>Drill Missed Qs ({result.totalWrong + result.totalUnattempted})</span>
          </button>

          <button
            type="button"
            onClick={() => startTest(result.scope as any, result.mode as any, 60, result.negativeMarking)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Full Test</span>
          </button>
        </div>
      </div>

      {/* Hero Scorecard */}
      <div className="bg-[#101522] border border-[#1e2638] rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#1f283d]">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${gradeBadge} text-xs font-bold uppercase tracking-wider mb-2`}>
              <Award className="w-3.5 h-3.5" />
              <span>{gradeLabel}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Forensic Exam Performance Report
            </h1>
            <div className="text-xs text-slate-400 font-mono mt-1">
              Completed on {result.date} • Scope: {result.scope.toUpperCase()} • Mode: {result.mode.toUpperCase()}
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className={`text-4xl sm:text-5xl font-black font-mono ${gradeColor}`}>
              {result.rawScore} <span className="text-xl text-slate-400">/ {result.totalQuestions}</span>
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1">
              Score Percentage: <strong className="text-white">{result.percentage}%</strong>
            </div>
          </div>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-[#151b2b] border border-[#232f4a] text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Accuracy Rate</div>
            <div className="text-2xl font-black text-blue-400 font-mono">{result.accuracy}%</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{result.totalCorrect} / {result.totalCorrect + result.totalWrong} attempted</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#151b2b] border border-[#232f4a] text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Correct Answers</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">{result.totalCorrect}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">+{result.totalCorrect} marks earned</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#151b2b] border border-[#232f4a] text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Incorrect Answers</div>
            <div className="text-2xl font-black text-red-400 font-mono">{result.totalWrong}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{result.negativeMarking ? `-${(result.totalWrong * 0.25).toFixed(2)} penalty` : 'No penalty'}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#151b2b] border border-[#232f4a] text-center">
            <div className="text-xs text-slate-400 font-semibold mb-1">Total Time Spent</div>
            <div className="text-2xl font-black text-amber-400 font-mono">{formatTime(result.timeSpentSec)}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Avg {(result.timeSpentSec / result.totalQuestions).toFixed(0)}s per question</div>
          </div>
        </div>

        {/* Section Comparison */}
        <div className="pt-4 border-t border-[#1f283d]">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Two-Section Comparative Breakdown
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#141b2c] border border-[#232f4a]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">Section 1: Unit I (Intro to Tech Comm)</span>
                <span className="font-mono text-xs font-bold text-blue-400">
                  {result.unit1.correct} / {result.unit1.total} ({((result.unit1.correct / result.unit1.total)*100).toFixed(0)}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden mb-2">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(result.unit1.correct / result.unit1.total)*100}%` }} />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Correct: <strong className="text-emerald-400">{result.unit1.correct}</strong></span>
                <span>Wrong: <strong className="text-red-400">{result.unit1.wrong}</strong></span>
                <span>Skipped: <strong className="text-slate-400">{result.unit1.unattempted}</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141b2c] border border-[#232f4a]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">Section 2: Unit II (Research Process)</span>
                <span className="font-mono text-xs font-bold text-indigo-400">
                  {result.unit2.correct} / {result.unit2.total} ({((result.unit2.correct / result.unit2.total)*100).toFixed(0)}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden mb-2">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(result.unit2.correct / result.unit2.total)*100}%` }} />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Correct: <strong className="text-emerald-400">{result.unit2.correct}</strong></span>
                <span>Wrong: <strong className="text-red-400">{result.unit2.wrong}</strong></span>
                <span>Skipped: <strong className="text-slate-400">{result.unit2.unattempted}</strong></span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Review Box */}
      <div className="bg-[#101522] border border-[#1e2638] rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283d] mb-6">
          <div>
            <h3 className="font-bold text-lg text-white">Question Forensic Review</h3>
            <p className="text-xs text-slate-400">Review your chosen responses against the verified answer key</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${reviewFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
            >
              All ({result.totalQuestions})
            </button>
            <button
              type="button"
              onClick={() => setReviewFilter('incorrect')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${reviewFilter === 'incorrect' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
            >
              ❌ Incorrect ({result.totalWrong})
            </button>
            <button
              type="button"
              onClick={() => setReviewFilter('unattempted')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${reviewFilter === 'unattempted' ? 'bg-slate-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
            >
              ⚪ Skipped ({result.totalUnattempted})
            </button>
            <button
              type="button"
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${reviewFilter === 'correct' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
            >
              ✅ Correct ({result.totalCorrect})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReview.map(q => {
            const userAns = result.answers[q.id];
            const isCorrect = (userAns === q.answer);
            const isSkipped = !userAns;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : isSkipped
                    ? 'bg-slate-900/40 border-slate-800'
                    : 'bg-red-950/20 border-red-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                      isCorrect ? 'bg-emerald-600 text-white' : isSkipped ? 'bg-slate-700 text-slate-300' : 'bg-red-600 text-white'
                    }`}>
                      Q{q.number} ({q.unit === 'unit-1' ? 'Unit I' : 'Unit II'})
                    </span>
                    <span className="text-xs text-slate-400">{q.unitName}</span>
                  </div>

                  <div className="text-xs font-bold flex items-center gap-1.5">
                    {isCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Correct (+1.0)
                      </span>
                    ) : isSkipped ? (
                      <span className="text-slate-400">Skipped (0.0)</span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect ({result.negativeMarking ? '-0.25' : '0.0'})
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm font-semibold text-slate-100 mb-3 leading-snug">
                  {q.question}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                  {(['A', 'B', 'C', 'D'] as const).map(optKey => {
                    const optText = q.options[optKey] || '';
                    let optStyle = 'bg-[#151b2b] border-[#252f47] text-slate-400';

                    if (optKey === q.answer) {
                      optStyle = 'bg-emerald-900/40 border-emerald-500 text-emerald-200 font-bold';
                    } else if (userAns === optKey && !isCorrect) {
                      optStyle = 'bg-red-900/40 border-red-500 text-red-200 font-bold';
                    }

                    return (
                      <div key={optKey} className={`p-2.5 rounded-xl border flex items-start gap-2 ${optStyle}`}>
                        <span className="font-mono font-bold">{optKey})</span>
                        <span className="leading-tight">{optText}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-4 pt-2 border-t border-[#1f283d]">
                  <span>Your Response: <strong className={isCorrect ? 'text-emerald-400' : isSkipped ? 'text-slate-400' : 'text-red-400'}>{userAns || 'None (Unattempted)'}</strong></span>
                  <span>Correct Key: <strong className="text-emerald-400">{q.answer}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default QuizArena;
