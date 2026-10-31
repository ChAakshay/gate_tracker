import React, { useState } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { 
  Check, 
  Flame, 
  BookOpen, 
  Target, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Edit3,
  Info,
  Shuffle
} from 'lucide-react';
import { BookReference } from '../types/progress';

export const DailyEssentialsCard: React.FC = () => {
  const { 
    subjects,
    toggleTopicField,
    updateTopicPyqCount,
    activePairId,
    setActivePairId,
    topicPairs,
    dailyPairChecklist,
    updateDailyPairChecklist,
    isMvdMode, 
    toggleMvdMode, 
    streak,
    getSecuredMarks,
    setActiveView,
    getCompletedPairsCount
  } = useProgressStore();

  const [notesDraft, setNotesDraft] = useState<string>(dailyPairChecklist.notes || '');
  const [notesSaved, setNotesSaved] = useState<boolean>(false);
  const [activeBookModal, setActiveBookModal] = useState<{ topicName: string; bookRef: BookReference } | null>(null);

  const securedMarks = getSecuredMarks();
  const bitsHdTargetMarks = 185; // 185+ Safe space for BITS Pilani M.E. Embedded

  // Current active pair
  const currentPair = topicPairs.find(p => p.id === activePairId) || topicPairs[0];
  const currentPairIndex = topicPairs.findIndex(p => p.id === currentPair.id);

  // 🔗 REAL-TIME BI-DIRECTIONAL SYNC: Read directly from subjects (Single Source of Truth)
  const subA = subjects.find(s => s.id === currentPair.topicA.subjectId);
  const liveTopicA = subA?.topics.find(t => t.id === currentPair.topicA.topicId);

  const subB = subjects.find(s => s.id === currentPair.topicB.subjectId);
  const liveTopicB = subB?.topics.find(t => t.id === currentPair.topicB.topicId);

  const pyqGoalA = isMvdMode ? 5 : (liveTopicA?.targetPyqs ? Math.min(10, liveTopicA.targetPyqs) : 10);
  const pyqGoalB = isMvdMode ? 5 : (liveTopicB?.targetPyqs ? Math.min(10, liveTopicB.targetPyqs) : 10);

  const isTopicADone = !!liveTopicA?.theoryCompleted && (liveTopicA?.pyqsSolvedCount || 0) >= pyqGoalA;
  const isTopicBDone = !!liveTopicB?.theoryCompleted && (liveTopicB?.pyqsSolvedCount || 0) >= pyqGoalB;
  const isRetentionDone = !!(liveTopicA?.formulaCardAdded && liveTopicB?.formulaCardAdded) || dailyPairChecklist.retentionChecked;

  const isPairComplete = isTopicADone && isTopicBDone && isRetentionDone;

  // Notes update
  const handleNotesChange = (val: string) => {
    setNotesDraft(val);
    updateDailyPairChecklist({ notes: val });
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  // Retention Checkbox toggle: updates formulaCardAdded for both topics
  const handleRetentionToggle = () => {
    const nextVal = !isRetentionDone;
    updateDailyPairChecklist({ retentionChecked: nextVal });
    if (liveTopicA && liveTopicA.formulaCardAdded !== nextVal) {
      toggleTopicField(currentPair.topicA.subjectId, currentPair.topicA.topicId, 'formulaCardAdded');
    }
    if (liveTopicB && liveTopicB.formulaCardAdded !== nextVal) {
      toggleTopicField(currentPair.topicB.subjectId, currentPair.topicB.topicId, 'formulaCardAdded');
    }
  };

  // Next Pair
  const handleAdvanceNextPair = () => {
    if (currentPairIndex < topicPairs.length - 1) {
      const nextPair = topicPairs[currentPairIndex + 1];
      setActivePairId(nextPair.id);
      setNotesDraft('');
    }
  };

  const getArchetypeBadgeClass = (archetype: string) => {
    switch (archetype) {
      case 'Hardware Core':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'System & Signal':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Speed & Accuracy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Logic & Physics':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* 🧭 CALM FOCUS: PROGRESS & BENCHMARK BAR */}
      <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                BITS Pilani Target
              </span>
              <span className="text-xs text-slate-400">
                M.E. Embedded Systems Safe Space
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-baseline gap-2">
              <span>{securedMarks}</span>
              <span className="text-xs text-slate-400 font-normal">/ {bitsHdTargetMarks} Marks Target</span>
              <span className="text-xs font-mono font-medium text-emerald-400 ml-1">
                ({Math.min(100, Math.round((securedMarks / bitsHdTargetMarks) * 100))}% secured)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141824] border border-[#202738] text-xs font-mono font-bold text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{streak} Day Streak</span>
            </div>

            <button
              onClick={() => setActiveView('roadmap')}
              className="px-3 py-1.5 rounded-xl bg-[#141824] hover:bg-slate-800 text-xs text-slate-300 font-semibold border border-[#202738] transition-colors flex items-center gap-1.5"
            >
              <Shuffle className="w-3.5 h-3.5 text-blue-400" />
              <span>Variety Hub ({getCompletedPairsCount()}/{topicPairs.length})</span>
            </button>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full bg-[#161a26] h-2 rounded-full overflow-hidden border border-slate-800/80 mt-4">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, (securedMarks / bitsHdTargetMarks) * 100)}%` }}
          />
        </div>
      </div>

      {/* 🎯 TODAY'S DUAL-TOPIC PAIR MISSION DECK */}
      <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-5 sm:p-7 shadow-sm space-y-5">
        
        {/* Navigation & Pair Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1b2234]">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-900/60">
                Pair #{currentPair.pairNumber} of {topicPairs.length}
              </span>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${getArchetypeBadgeClass(currentPair.archetype)}`}>
                {currentPair.archetype}
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                +{currentPair.combinedMarks} Marks Value
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {currentPair.title}
            </h1>
            <p className="text-xs text-slate-400 italic">
              ⚡ Synergy: {currentPair.synergyRationale}
            </p>
          </div>

          {/* Quick Pair Stepper */}
          <div className="flex items-center gap-1.5 self-start sm:self-center">
            <button
              onClick={() => {
                if (currentPairIndex > 0) setActivePairId(topicPairs[currentPairIndex - 1].id);
              }}
              disabled={currentPairIndex <= 0}
              className="p-2 rounded-lg bg-[#141824] hover:bg-slate-800 disabled:opacity-30 text-slate-300 border border-[#202738] transition-colors"
              title="Previous Pair"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={currentPair.id}
              onChange={(e) => setActivePairId(e.target.value)}
              className="bg-[#141824] border border-[#202738] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono font-bold outline-none max-w-[200px] truncate"
            >
              {topicPairs.map(p => (
                <option key={p.id} value={p.id}>
                  #{p.pairNumber}: {p.title}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                if (currentPairIndex < topicPairs.length - 1) setActivePairId(topicPairs[currentPairIndex + 1].id);
              }}
              disabled={currentPairIndex >= topicPairs.length - 1}
              className="p-2 rounded-lg bg-[#141824] hover:bg-slate-800 disabled:opacity-30 text-slate-300 border border-[#202738] transition-colors"
              title="Next Pair"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimum Viable Day Toggle */}
        <div className="flex items-center justify-between bg-[#141824]/60 p-3 rounded-xl border border-[#1b2234] text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldAlert className={`w-4 h-4 ${isMvdMode ? 'text-amber-400' : 'text-slate-500'}`} />
            <span>
              <strong>Target Mode:</strong> {isMvdMode ? 'MVD Mode (5 Qs per topic = 10 total)' : 'Standard Mode (10 Qs per topic = 20 total)'}
            </span>
          </div>
          <button
            onClick={toggleMvdMode}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              isMvdMode ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {isMvdMode ? 'MVD Active' : 'Toggle MVD'}
          </button>
        </div>

        {/* 📚 DUAL-TOPIC SPLIT DECK (TOPIC A & TOPIC B) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* TOPIC A CARD */}
          <div className={`p-4 rounded-xl border transition-all space-y-3.5 ${
            isTopicADone 
              ? 'bg-blue-950/20 border-blue-500/40' 
              : 'bg-[#141824] border-[#1f273a]'
          }`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                    style={{ 
                      backgroundColor: `${currentPair.topicA.subjectColor}15`, 
                      color: currentPair.topicA.subjectColor,
                      borderColor: `${currentPair.topicA.subjectColor}35`
                    }}
                  >
                    Topic A • {currentPair.topicA.subjectName.split('(')[0].trim()}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                    +{currentPair.topicA.marksWeight}M
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mt-1.5 leading-snug">
                  {currentPair.topicA.topicName}
                </h3>
              </div>
            </div>

            {/* Book Reference Citation Pill (Clickable) */}
            <div 
              onClick={() => setActiveBookModal({ topicName: currentPair.topicA.topicName, bookRef: currentPair.topicA.bookRef })}
              className="cursor-pointer bg-[#0e111a] hover:bg-[#161a29] p-2.5 rounded-lg border border-[#252c42] transition-colors flex items-center justify-between text-xs group"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <BookOpen className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <div className="truncate">
                  <span className="font-semibold text-slate-200">{currentPair.topicA.bookRef.bookTitle}</span>
                  <span className="text-slate-400 text-[11px] ml-1">({currentPair.topicA.bookRef.pages})</span>
                </div>
              </div>
              <Info className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 flex-shrink-0" />
            </div>

            {/* Topic A Checkbox: Theory */}
            <div
              onClick={() => toggleTopicField(currentPair.topicA.subjectId, currentPair.topicA.topicId, 'theoryCompleted')}
              className={`cursor-pointer p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2 text-xs ${
                liveTopicA?.theoryCompleted 
                  ? 'bg-blue-600/10 border-blue-500/40 text-blue-200' 
                  : 'bg-[#181d2c] border-[#22293b] text-slate-300 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded flex items-center justify-center ${
                  liveTopicA?.theoryCompleted ? 'bg-blue-600 text-white' : 'border border-slate-600'
                }`}>
                  {liveTopicA?.theoryCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="font-medium">1. Theory & Key Formulas</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">~1.0 hr</span>
            </div>

            {/* Topic A Counter: PYQs */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">2. Standard Questions</span>
                <span className="font-mono font-bold text-white">
                  {liveTopicA?.pyqsSolvedCount || 0} / {pyqGoalA} solved
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, ((liveTopicA?.pyqsSolvedCount || 0) / pyqGoalA) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicA.subjectId, currentPair.topicA.topicId, Math.max(0, (liveTopicA?.pyqsSolvedCount || 0) - 1))}
                    className="px-1.5 py-0.5 rounded bg-[#1c2233] hover:bg-slate-700 text-slate-300 text-xs font-mono"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicA.subjectId, currentPair.topicA.topicId, (liveTopicA?.pyqsSolvedCount || 0) + 1)}
                    className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicA.subjectId, currentPair.topicA.topicId, (liveTopicA?.pyqsSolvedCount || 0) + 5)}
                    className="px-2 py-0.5 rounded bg-[#1c2233] hover:bg-slate-700 text-blue-300 text-xs font-bold"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicA.subjectId, currentPair.topicA.topicId, pyqGoalA)}
                    className="px-2 py-0.5 rounded bg-[#1c2233] hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* TOPIC B CARD */}
          <div className={`p-4 rounded-xl border transition-all space-y-3.5 ${
            isTopicBDone 
              ? 'bg-purple-950/20 border-purple-500/40' 
              : 'bg-[#141824] border-[#1f273a]'
          }`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                    style={{ 
                      backgroundColor: `${currentPair.topicB.subjectColor}15`, 
                      color: currentPair.topicB.subjectColor,
                      borderColor: `${currentPair.topicB.subjectColor}35`
                    }}
                  >
                    Topic B • {currentPair.topicB.subjectName.split('(')[0].trim()}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                    +{currentPair.topicB.marksWeight}M
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mt-1.5 leading-snug">
                  {currentPair.topicB.topicName}
                </h3>
              </div>
            </div>

            {/* Book Reference Citation Pill (Clickable) */}
            <div 
              onClick={() => setActiveBookModal({ topicName: currentPair.topicB.topicName, bookRef: currentPair.topicB.bookRef })}
              className="cursor-pointer bg-[#0e111a] hover:bg-[#161a29] p-2.5 rounded-lg border border-[#252c42] transition-colors flex items-center justify-between text-xs group"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <BookOpen className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <div className="truncate">
                  <span className="font-semibold text-slate-200">{currentPair.topicB.bookRef.bookTitle}</span>
                  <span className="text-slate-400 text-[11px] ml-1">({currentPair.topicB.bookRef.pages})</span>
                </div>
              </div>
              <Info className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 flex-shrink-0" />
            </div>

            {/* Topic B Checkbox: Theory */}
            <div
              onClick={() => toggleTopicField(currentPair.topicB.subjectId, currentPair.topicB.topicId, 'theoryCompleted')}
              className={`cursor-pointer p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2 text-xs ${
                liveTopicB?.theoryCompleted 
                  ? 'bg-purple-600/10 border-purple-500/40 text-purple-200' 
                  : 'bg-[#181d2c] border-[#22293b] text-slate-300 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded flex items-center justify-center ${
                  liveTopicB?.theoryCompleted ? 'bg-purple-600 text-white' : 'border border-slate-600'
                }`}>
                  {liveTopicB?.theoryCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="font-medium">1. Theory & Key Formulas</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">~1.0 hr</span>
            </div>

            {/* Topic B Counter: PYQs */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">2. Standard Questions</span>
                <span className="font-mono font-bold text-white">
                  {liveTopicB?.pyqsSolvedCount || 0} / {pyqGoalB} solved
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, ((liveTopicB?.pyqsSolvedCount || 0) / pyqGoalB) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicB.subjectId, currentPair.topicB.topicId, Math.max(0, (liveTopicB?.pyqsSolvedCount || 0) - 1))}
                    className="px-1.5 py-0.5 rounded bg-[#1c2233] hover:bg-slate-700 text-slate-300 text-xs font-mono"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicB.subjectId, currentPair.topicB.topicId, (liveTopicB?.pyqsSolvedCount || 0) + 1)}
                    className="px-2 py-0.5 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicB.subjectId, currentPair.topicB.topicId, (liveTopicB?.pyqsSolvedCount || 0) + 5)}
                    className="px-2 py-0.5 rounded bg-[#1c2233] hover:bg-slate-700 text-purple-300 text-xs font-bold"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicB.subjectId, currentPair.topicB.topicId, pyqGoalB)}
                    className="px-2 py-0.5 rounded bg-[#1c2233] hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3. RETENTION & CROSS-TOPIC CONSOLIDATION CHECK */}
        <div
          onClick={handleRetentionToggle}
          className={`cursor-pointer p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
            isRetentionDone 
              ? 'bg-amber-950/20 border-amber-500/40 text-slate-200' 
              : 'bg-[#141824] border-[#1f273a] hover:border-slate-600 text-slate-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
              isRetentionDone ? 'bg-amber-600 text-white' : 'border border-slate-600'
            }`}>
              {isRetentionDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>3. Joint Formula Lock & 3-Line Error Trap Check</span>
                <span className="text-[10px] text-slate-400 font-normal">~30 mins</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Add 1 high-yield formula card for each topic to your Vault, and record any conceptual trap in the 3-Line Error Log.
              </p>
            </div>
          </div>
          <span className={`text-[11px] font-mono font-medium ${isRetentionDone ? 'text-amber-400' : 'text-slate-500'}`}>
            {isRetentionDone ? 'Done' : 'Pending'}
          </span>
        </div>

        {/* 🏆 COMPLETION CELEBRATION & ADVANCE */}
        {isPairComplete ? (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm text-emerald-300">
                  Pair #{currentPair.pairNumber} Complete!
                </div>
                <div className="text-xs text-emerald-400/80">
                  +{currentPair.combinedMarks} Marks secured toward your 185+ BITS Pilani target.
                </div>
              </div>
            </div>

            <button
              onClick={handleAdvanceNextPair}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Advance to Next Pair</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Tick off Theory, standard questions, and the retention check to secure this pair's marks.</span>
            <button
              onClick={() => setActiveView('roadmap')}
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>Explore All Pairs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 📝 FORMULA / SHORTCUT TAKEAWAY MEMO */}
        <div className="pt-3 border-t border-[#1b2234] space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Today's Dual Formula / Trap Takeaway</span>
            </span>
            {notesSaved && <span className="text-[10px] text-emerald-400 font-mono">Saved</span>}
          </div>
          <input
            type="text"
            value={notesDraft}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="e.g. TRAP vector = 0024H; K-Map consensus theorem: AB + A'C + BC = AB + A'C..."
            className="w-full bg-[#141824] border border-[#202738] rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50"
          />
        </div>

      </div>

      {/* 📖 MODAL: GRANULAR BOOK & CHAPTER ATLAS POPUP */}
      {activeBookModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121622] border border-[#232b40] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  Standard Textbook Guide
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">
                  {activeBookModal.topicName}
                </h3>
              </div>
              <button 
                onClick={() => setActiveBookModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 bg-[#161b2a] p-4 rounded-xl border border-[#20273c] text-xs">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Recommended Book</span>
                <div className="text-white font-bold text-sm mt-0.5">
                  {activeBookModal.bookRef.bookTitle}
                </div>
                <div className="text-slate-400 text-xs">
                  by <strong className="text-slate-200">{activeBookModal.bookRef.author}</strong> ({activeBookModal.bookRef.edition})
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/50">
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Chapter</span>
                  <span className="text-blue-300 font-semibold">{activeBookModal.bookRef.chapters}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Exact Page Range</span>
                  <span className="text-emerald-300 font-semibold">{activeBookModal.bookRef.pages}</span>
                </div>
              </div>

              {activeBookModal.bookRef.keyConcepts && activeBookModal.bookRef.keyConcepts.length > 0 && (
                <div className="pt-2 border-t border-slate-700/50">
                  <span className="text-slate-400 uppercase text-[10px] font-bold block mb-1.5">Key Concepts to Extract:</span>
                  <ul className="space-y-1">
                    {activeBookModal.bookRef.keyConcepts.map((kc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span>{kc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveBookModal(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
