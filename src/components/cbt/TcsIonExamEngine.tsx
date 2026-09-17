import React, { useState, useEffect } from 'react';
import { Question, QuestionStatus } from '../../types/gate';
import { MathView } from '../MathView';
import { calculateTotalScore } from '../../lib/scoringEngine';
import { useGateStore } from '../../store/useGateStore';
import { VirtualCalculator } from '../calculator/VirtualCalculator';
import { Calculator, CheckCircle2, RotateCcw, AlertOctagon } from 'lucide-react';

export const TcsIonExamEngine: React.FC = () => {
  const { questions, setActiveTab } = useGateStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, QuestionStatus>>({});
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [timeLeftSec, setTimeLeftSec] = useState(180 * 60); // 3 hours = 180 mins
  const [isFinished, setIsFinished] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  const currentQ = questions[currentIdx] || questions[0];

  // Timer Countdown
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeLeftSec(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  const formatExamTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateStatus = (status: QuestionStatus) => {
    setStatuses(prev => ({ ...prev, [currentQ.id]: status }));
  };

  const handleSaveAndNext = () => {
    if (responses[currentQ.id]) {
      updateStatus('answered');
    } else {
      updateStatus('not_answered');
    }
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
  };

  const handleMarkForReviewAndNext = () => {
    if (responses[currentQ.id]) {
      updateStatus('answered_marked_for_review');
    } else {
      updateStatus('marked_for_review');
    }
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
  };

  const handleClearResponse = () => {
    setResponses(prev => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
    updateStatus('not_answered');
  };

  // Palette button style calculator
  const getPaletteStyle = (qId: string, idx: number) => {
    const status = statuses[qId] || 'unseen';
    const isCurrent = idx === currentIdx;

    let base = 'w-9 h-9 font-bold text-xs flex items-center justify-center transition-transform ';
    if (isCurrent) base += 'ring-2 ring-blue-600 ring-offset-2 scale-105 ';

    switch (status) {
      case 'answered':
        return base + 'bg-[#28a745] text-white rounded-t-sm'; // Green in TCS iON
      case 'not_answered':
        return base + 'bg-[#dc3545] text-white rounded-b-lg'; // Red
      case 'marked_for_review':
        return base + 'bg-[#6f42c1] text-white rounded-full'; // Purple Circle
      case 'answered_marked_for_review':
        return base + 'bg-[#6f42c1] text-white rounded-full relative after:content-[""] after:absolute after:bottom-0 after:right-0 after:w-2.5 after:h-2.5 after:bg-[#28a745] after:rounded-full after:border after:border-white';
      default:
        return base + 'bg-slate-200 text-slate-800 border border-slate-300 rounded-sm';
    }
  };

  const examScore = isFinished ? calculateTotalScore(questions, responses) : null;

  if (isFinished && examScore) {
    return (
      <div className="max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl p-8 border border-slate-300 shadow-2xl space-y-6">
        <div className="text-center border-b pb-6">
          <div className="inline-flex p-3 rounded-full bg-blue-100 text-blue-700 mb-2">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">GATE Exam Result Summary</h2>
          <p className="text-slate-600 text-sm mt-1">Official TCS iON Scoring Rubric Applied</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-100 border">
            <div className="text-xs text-slate-500 font-semibold uppercase">Total Raw Score</div>
            <div className="text-3xl font-extrabold text-blue-700 font-mono mt-1">{examScore.rawScore}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-100 border">
            <div className="text-xs text-slate-500 font-semibold uppercase">Questions Attempted</div>
            <div className="text-3xl font-extrabold text-slate-800 font-mono mt-1">{examScore.totalAttempted}/{questions.length}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-100 border">
            <div className="text-xs text-slate-500 font-semibold uppercase">Correct Answers</div>
            <div className="text-3xl font-extrabold text-emerald-600 font-mono mt-1">{examScore.correctAttempts}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-100 border">
            <div className="text-xs text-slate-500 font-semibold uppercase">Accuracy Rate</div>
            <div className="text-3xl font-extrabold text-purple-600 font-mono mt-1">{examScore.accuracy.toFixed(1)}%</div>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => {
              setIsFinished(false);
              setResponses({});
              setStatuses({});
              setCurrentIdx(0);
              setTimeLeftSec(180 * 60);
            }}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Exam
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[85vh] bg-[#f8f9fa] text-slate-900 border border-slate-300 rounded-xl overflow-hidden shadow-2xl relative font-sans">
      
      {/* Floating Calculator if opened */}
      {showCalc && (
        <div className="absolute top-12 left-12 z-50 shadow-2xl">
          <VirtualCalculator onClose={() => setShowCalc(false)} />
        </div>
      )}

      {/* Main Examination Left View */}
      <div className="flex-1 flex flex-col justify-between border-r border-slate-300 bg-white">
        
        {/* TCS Header Bar */}
        <div className="bg-[#305280] text-white px-5 py-3 flex items-center justify-between shadow-md select-none">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-base sm:text-lg tracking-wide">GATE 2027 ECE - Mock Examination</h1>
            <span className="text-xs bg-blue-900/80 px-2.5 py-0.5 rounded text-blue-200 border border-blue-400/30">CBT Engine</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCalc(!showCalc)}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded flex items-center gap-1.5 shadow transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              Calculator
            </button>
            <div className="bg-[#1e3452] px-3.5 py-1 rounded text-white font-mono font-bold text-sm flex items-center gap-1.5">
              <span>Time Left:</span>
              <span className="text-amber-300">{formatExamTime(timeLeftSec)}</span>
            </div>
          </div>
        </div>

        {/* Section / Question Info */}
        <div className="bg-[#edf2f7] px-5 py-2.5 border-b border-slate-300 flex items-center justify-between text-xs font-bold text-slate-700">
          <div>Question No. {currentIdx + 1} of {questions.length}</div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-700">Marking: +{currentQ.marks}</span>
            <span className="text-red-700">Negative: {currentQ.type === 'MCQ' ? (currentQ.marks === 1 ? '0.33' : '0.66') : '0.00'}</span>
          </div>
        </div>

        {/* Question & Options Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="text-base text-slate-900 leading-relaxed font-sans border-b border-slate-200 pb-5">
            <MathView content={currentQ.textMarkdown} />
          </div>

          {/* Options / NAT input */}
          <div>
            {currentQ.type === 'NAT' ? (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Enter Value:</label>
                <input
                  type="number"
                  step="any"
                  value={(responses[currentQ.id] as string) || ''}
                  onChange={(e) => setResponses({ ...responses, [currentQ.id]: e.target.value })}
                  placeholder="Numerical answer"
                  className="border-2 border-slate-400 focus:border-blue-600 rounded px-4 py-2 text-lg font-mono w-64 outline-none"
                />
              </div>
            ) : (
              <div className="space-y-3">
                {currentQ.options?.map((opt, idx) => {
                  const isChecked = currentQ.type === 'MCQ' 
                    ? responses[currentQ.id] === opt.id 
                    : (responses[currentQ.id] as string[])?.includes(opt.id) || false;

                  return (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                        isChecked ? 'bg-blue-50 border-blue-500' : 'bg-slate-50 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type={currentQ.type === 'MCQ' ? 'radio' : 'checkbox'}
                        name="cbt_answer"
                        checked={isChecked}
                        onChange={() => {
                          if (currentQ.type === 'MCQ') {
                            setResponses({ ...responses, [currentQ.id]: opt.id });
                          } else {
                            const cur = (responses[currentQ.id] as string[]) || [];
                            if (cur.includes(opt.id)) {
                              setResponses({ ...responses, [currentQ.id]: cur.filter(id => id !== opt.id) });
                            } else {
                              setResponses({ ...responses, [currentQ.id]: [...cur, opt.id] });
                            }
                          }
                        }}
                        className="w-4 h-4 text-blue-600 accent-blue-600"
                      />
                      <span className="font-bold text-slate-600 text-xs">({String.fromCharCode(65 + idx)})</span>
                      <div className="text-sm text-slate-800">
                        <MathView content={opt.textMarkdown} />
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom TCS Action Buttons */}
        <div className="bg-[#edf2f7] px-6 py-3 border-t border-slate-300 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={handleMarkForReviewAndNext}
              className="px-4 py-2 rounded bg-white hover:bg-slate-100 border border-slate-400 text-slate-800 text-xs font-semibold shadow-sm"
            >
              Mark for Review & Next
            </button>
            <button
              onClick={handleClearResponse}
              className="px-4 py-2 rounded bg-white hover:bg-slate-100 border border-slate-400 text-slate-800 text-xs font-semibold shadow-sm"
            >
              Clear Response
            </button>
          </div>

          <button
            onClick={handleSaveAndNext}
            className="px-7 py-2 rounded bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs shadow-md"
          >
            Save & Next
          </button>
        </div>
      </div>

      {/* Right Question Palette Sidebar */}
      <div className="w-full lg:w-80 bg-[#eef2f7] flex flex-col justify-between border-t lg:border-t-0 select-none">
        {/* Candidate Profile Bar */}
        <div className="p-3 bg-white border-b border-slate-300 flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-300 rounded border border-slate-400 flex items-center justify-center font-bold text-slate-600 text-xs">
            PHOTO
          </div>
          <div>
            <div className="font-bold text-xs text-slate-900">AAKSH (GATE Aspirant)</div>
            <div className="text-[11px] text-slate-500">Target: IIIT Bangalore (ECE)</div>
          </div>
        </div>

        {/* Legend Summary */}
        <div className="p-3 bg-slate-50 border-b border-slate-300 grid grid-cols-2 gap-2 text-[11px] text-slate-700">
          <div className="flex items-center gap-1.5"><span className="w-4 h-4 bg-[#28a745] rounded-sm text-white flex items-center justify-center font-bold text-[9px]">A</span> Answered</div>
          <div className="flex items-center gap-1.5"><span className="w-4 h-4 bg-[#dc3545] rounded-sm text-white flex items-center justify-center font-bold text-[9px]">N</span> Not Answered</div>
          <div className="flex items-center gap-1.5"><span className="w-4 h-4 bg-slate-200 border border-slate-400 rounded-sm text-slate-800 flex items-center justify-center font-bold text-[9px]">U</span> Not Visited</div>
          <div className="flex items-center gap-1.5"><span className="w-4 h-4 bg-[#6f42c1] rounded-full text-white flex items-center justify-center font-bold text-[9px]">R</span> Review</div>
        </div>

        {/* Palette Grid */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          <div className="font-bold text-xs text-slate-800 uppercase tracking-wider">Question Palette</div>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={getPaletteStyle(q.id, idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Exam Button */}
        <div className="p-4 bg-white border-t border-slate-300">
          <button
            onClick={() => setIsFinished(true)}
            className="w-full py-2.5 bg-[#007bff] hover:bg-[#0069d9] text-white font-bold text-xs uppercase tracking-wider rounded shadow-md"
          >
            Submit Final Exam
          </button>
        </div>
      </div>
    </div>
  );
};
