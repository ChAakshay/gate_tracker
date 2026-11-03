import React, { useState } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { 
  Check, 
  Flame, 
  BookOpen, 
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
        return 'bg-[#2a4358]/20 text-[#6cb2d1] border-[#385e78]/30';
      case 'System & Signal':
        return 'bg-[#3b3452]/20 text-[#a89fc9] border-[#4e466c]/30';
      case 'Speed & Accuracy':
        return 'bg-[#234233]/20 text-[#6dbb96] border-[#315d48]/30';
      case 'Logic & Physics':
        return 'bg-[#473620]/20 text-[#d8a86a] border-[#5d472a]/30';
      default:
        return 'bg-[#243752]/20 text-[#7ba5d6] border-[#344e73]/30';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* 🧭 CALM BENCHMARK PROGRESS BAR */}
      <div className="bg-[#141824] border border-[#1e2638] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#3b69a1]/15 text-[#6ba0de] border border-[#3b69a1]/30">
                BITS Pilani Target
              </span>
              <span className="text-xs text-slate-400">
                M.E. Embedded Systems Safe Space
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mt-1 flex items-baseline gap-2">
              <span>{securedMarks}</span>
              <span className="text-xs text-slate-400 font-normal">/ {bitsHdTargetMarks} Marks Target</span>
              <span className="text-xs font-mono font-medium text-[#5bb38c] ml-1">
                ({Math.min(100, Math.round((securedMarks / bitsHdTargetMarks) * 100))}% secured)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181d2c] border border-[#232b40] text-xs font-mono font-bold text-[#d49e5b]">
              <Flame className="w-3.5 h-3.5 fill-[#d49e5b] text-[#d49e5b]" />
              <span>{streak} Day Streak</span>
            </div>

            <button
              onClick={() => setActiveView('roadmap')}
              className="px-3 py-1.5 rounded-xl bg-[#181d2c] hover:bg-[#20273a] text-xs text-slate-300 font-semibold border border-[#232b40] transition-colors flex items-center gap-1.5"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#6ba0de]" />
              <span>Variety Hub ({getCompletedPairsCount()}/{topicPairs.length})</span>
            </button>
          </div>
        </div>

        {/* Soothing Gradient Progress Bar */}
        <div className="w-full bg-[#10131d] h-2.5 rounded-full overflow-hidden border border-[#1e2638] mt-4">
          <div 
            className="h-full bg-gradient-to-r from-[#3b69a1] via-[#527eaf] to-[#489874] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, (securedMarks / bitsHdTargetMarks) * 100)}%` }}
          />
        </div>
      </div>

      {/* 🎯 TODAY'S DUAL-TOPIC PAIR MISSION DECK */}
      <div className="bg-[#141824] border border-[#1e2638] rounded-2xl p-5 sm:p-7 shadow-sm space-y-5">
        
        {/* Navigation & Pair Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2638]">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#6ba0de] bg-[#1c2638] px-2.5 py-0.5 rounded-md border border-[#2d3e5b]">
                Pair #{currentPair.pairNumber} of {topicPairs.length}
              </span>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${getArchetypeBadgeClass(currentPair.archetype)}`}>
                {currentPair.archetype}
              </span>
              <span className="text-xs font-semibold text-[#5bb38c]">
                +{currentPair.combinedMarks} Marks Value
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
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
              className="p-2 rounded-lg bg-[#181d2c] hover:bg-[#20273a] disabled:opacity-30 text-slate-300 border border-[#232b40] transition-colors"
              title="Previous Pair"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={currentPair.id}
              onChange={(e) => setActivePairId(e.target.value)}
              className="bg-[#181d2c] border border-[#232b40] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono font-bold outline-none max-w-[200px] truncate"
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
              className="p-2 rounded-lg bg-[#181d2c] hover:bg-[#20273a] disabled:opacity-30 text-slate-300 border border-[#232b40] transition-colors"
              title="Next Pair"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimum Viable Day Toggle */}
        <div className="flex items-center justify-between bg-[#10141f] p-3 rounded-xl border border-[#1b2234] text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldAlert className={`w-4 h-4 ${isMvdMode ? 'text-[#d49e5b]' : 'text-slate-500'}`} />
            <span>
              <strong>Target Mode:</strong> {isMvdMode ? 'MVD Mode (5 Qs per topic = 10 total)' : 'Standard Mode (10 Qs per topic = 20 total)'}
            </span>
          </div>
          <button
            onClick={toggleMvdMode}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              isMvdMode ? 'bg-[#b5823e] text-white' : 'bg-[#181d2c] text-slate-400 hover:text-white border border-[#232b40]'
            }`}
          >
            {isMvdMode ? 'MVD Active' : 'Toggle MVD'}
          </button>
        </div>

        {/* 📚 DUAL-TOPIC SPLIT DECK (TOPIC A & TOPIC B) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* TOPIC A CARD (Calm Fjord Blue Hue) */}
          <div className={`p-4 rounded-xl border transition-all space-y-3.5 ${
            isTopicADone 
              ? 'bg-[#1a2336]/40 border-[#3b69a1]/40' 
              : 'bg-[#10141f] border-[#1d2536]'
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
                  <span className="text-[11px] font-semibold text-[#5bb38c] font-mono">
                    +{currentPair.topicA.marksWeight}M
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-100 mt-1.5 leading-snug">
                  {currentPair.topicA.topicName}
                </h3>
              </div>
            </div>

            {/* Book Reference Citation Pill (Clickable) */}
            <div 
              onClick={() => setActiveBookModal({ topicName: currentPair.topicA.topicName, bookRef: currentPair.topicA.bookRef })}
              className="cursor-pointer bg-[#141824] hover:bg-[#1a2130] p-2.5 rounded-lg border border-[#202738] transition-colors flex items-center justify-between text-xs group"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <BookOpen className="w-3.5 h-3.5 text-[#6ba0de] flex-shrink-0" />
                <div className="truncate">
                  <span className="font-semibold text-slate-200">{currentPair.topicA.bookRef.bookTitle}</span>
                  <span className="text-slate-400 text-[11px] ml-1">({currentPair.topicA.bookRef.pages})</span>
                </div>
              </div>
              <Info className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6ba0de] flex-shrink-0" />
            </div>

            {/* Topic A Checkbox: Theory */}
            <div
              onClick={() => toggleTopicField(currentPair.topicA.subjectId, currentPair.topicA.topicId, 'theoryCompleted')}
              className={`cursor-pointer p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2 text-xs ${
                liveTopicA?.theoryCompleted 
                  ? 'bg-[#3b69a1]/15 border-[#3b69a1]/40 text-[#9ac2f4]' 
                  : 'bg-[#151926] border-[#222a3c] text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded flex items-center justify-center ${
                  liveTopicA?.theoryCompleted ? 'bg-[#3b69a1] text-white' : 'border border-slate-600'
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
                <span className="font-mono font-bold text-slate-200">
                  {liveTopicA?.pyqsSolvedCount || 0} / {pyqGoalA} solved
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#151926] h-2 rounded-full overflow-hidden border border-[#222a3c]">
                  <div 
                    className="h-full bg-[#4c7cb8] transition-all duration-300"
                    style={{ width: `${Math.min(100, ((liveTopicA?.pyqsSolvedCount || 0) / pyqGoalA) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicA.subjectId, currentPair.topicA.topicId, Math.max(0, (liveTopicA?.pyqsSolvedCount || 0) - 1))}
                    className="px-1.5 py-0.5 rounded bg-[#181e2c] hover:bg-[#222a3e] text-slate-300 text-xs font-mono"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicA.subjectId, currentPair.topicA.topicId, (liveTopicA?.pyqsSolvedCount || 0) + 1)}
                    className="px-2 py-0.5 rounded bg-[#3b69a1] hover:bg-[#4c7cb8] text-white text-xs font-bold"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicA.subjectId, currentPair.topicA.topicId, (liveTopicA?.pyqsSolvedCount || 0) + 5)}
                    className="px-2 py-0.5 rounded bg-[#181e2c] hover:bg-[#222a3e] text-[#6ba0de] text-xs font-bold"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicA.subjectId, currentPair.topicA.topicId, pyqGoalA)}
                    className="px-2 py-0.5 rounded bg-[#181e2c] hover:bg-[#222a3e] text-slate-300 text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* TOPIC B CARD (Dusty Heather Lavender Hue) */}
          <div className={`p-4 rounded-xl border transition-all space-y-3.5 ${
            isTopicBDone 
              ? 'bg-[#251e34]/40 border-[#7c75a8]/40' 
              : 'bg-[#10141f] border-[#1d2536]'
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
                  <span className="text-[11px] font-semibold text-[#5bb38c] font-mono">
                    +{currentPair.topicB.marksWeight}M
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-100 mt-1.5 leading-snug">
                  {currentPair.topicB.topicName}
                </h3>
              </div>
            </div>

            {/* Book Reference Citation Pill (Clickable) */}
            <div 
              onClick={() => setActiveBookModal({ topicName: currentPair.topicB.topicName, bookRef: currentPair.topicB.bookRef })}
              className="cursor-pointer bg-[#141824] hover:bg-[#1a2130] p-2.5 rounded-lg border border-[#202738] transition-colors flex items-center justify-between text-xs group"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <BookOpen className="w-3.5 h-3.5 text-[#a89fc9] flex-shrink-0" />
                <div className="truncate">
                  <span className="font-semibold text-slate-200">{currentPair.topicB.bookRef.bookTitle}</span>
                  <span className="text-slate-400 text-[11px] ml-1">({currentPair.topicB.bookRef.pages})</span>
                </div>
              </div>
              <Info className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#a89fc9] flex-shrink-0" />
            </div>

            {/* Topic B Checkbox: Theory */}
            <div
              onClick={() => toggleTopicField(currentPair.topicB.subjectId, currentPair.topicB.topicId, 'theoryCompleted')}
              className={`cursor-pointer p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2 text-xs ${
                liveTopicB?.theoryCompleted 
                  ? 'bg-[#7c75a8]/15 border-[#7c75a8]/40 text-[#c8c2ed]' 
                  : 'bg-[#151926] border-[#222a3c] text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded flex items-center justify-center ${
                  liveTopicB?.theoryCompleted ? 'bg-[#7c75a8] text-white' : 'border border-slate-600'
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
                <span className="font-mono font-bold text-slate-200">
                  {liveTopicB?.pyqsSolvedCount || 0} / {pyqGoalB} solved
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#151926] h-2 rounded-full overflow-hidden border border-[#222a3c]">
                  <div 
                    className="h-full bg-[#7c75a8] transition-all duration-300"
                    style={{ width: `${Math.min(100, ((liveTopicB?.pyqsSolvedCount || 0) / pyqGoalB) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicB.subjectId, currentPair.topicB.topicId, Math.max(0, (liveTopicB?.pyqsSolvedCount || 0) - 1))}
                    className="px-1.5 py-0.5 rounded bg-[#181e2c] hover:bg-[#222a3e] text-slate-300 text-xs font-mono"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicB.subjectId, currentPair.topicB.topicId, (liveTopicB?.pyqsSolvedCount || 0) + 1)}
                    className="px-2 py-0.5 rounded bg-[#7c75a8] hover:bg-[#8e87be] text-white text-xs font-bold"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicB.subjectId, currentPair.topicB.topicId, (liveTopicB?.pyqsSolvedCount || 0) + 5)}
                    className="px-2 py-0.5 rounded bg-[#181e2c] hover:bg-[#222a3e] text-[#a89fc9] text-xs font-bold"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => updateTopicPyqCount(currentPair.topicB.subjectId, currentPair.topicB.topicId, pyqGoalB)}
                    className="px-2 py-0.5 rounded bg-[#181e2c] hover:bg-[#222a3e] text-slate-300 text-xs font-bold"
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
              ? 'bg-[#3b2d18]/30 border-[#c8924b]/40 text-slate-200' 
              : 'bg-[#10141f] border-[#1d2536] hover:border-slate-600 text-slate-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
              isRetentionDone ? 'bg-[#b5823e] text-white' : 'border border-slate-600'
            }`}>
              {isRetentionDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <span>3. Joint Formula Lock & 3-Line Error Trap Check</span>
                <span className="text-[10px] text-slate-400 font-normal">~30 mins</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Add 1 high-yield formula card for each topic to your Vault, and record any conceptual trap in the 3-Line Error Log.
              </p>
            </div>
          </div>
          <span className={`text-[11px] font-mono font-medium ${isRetentionDone ? 'text-[#d49e5b]' : 'text-slate-500'}`}>
            {isRetentionDone ? 'Done' : 'Pending'}
          </span>
        </div>

        {/* 🏆 COMPLETION CELEBRATION & ADVANCE (Restful Sage Green) */}
        {isPairComplete ? (
          <div className="p-4 rounded-xl bg-[#14261f]/50 border border-[#3d8564]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#5bb38c] flex-shrink-0" />
              <div>
                <div className="font-bold text-sm text-[#7cd6af]">
                  Pair #{currentPair.pairNumber} Complete!
                </div>
                <div className="text-xs text-[#5bb38c]/90">
                  +{currentPair.combinedMarks} Marks secured toward your 185+ BITS Pilani target.
                </div>
              </div>
            </div>

            <button
              onClick={handleAdvanceNextPair}
              className="px-4 py-2 rounded-xl bg-[#3d8564] hover:bg-[#4a9d77] text-white text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-sm"
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
              className="text-[#6ba0de] hover:text-[#8cbbf2] font-semibold flex items-center gap-1"
            >
              <span>Explore All Pairs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 📝 FORMULA / SHORTCUT TAKEAWAY MEMO */}
        <div className="pt-3 border-t border-[#1e2638] space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Today's Dual Formula / Trap Takeaway</span>
            </span>
            {notesSaved && <span className="text-[10px] text-[#5bb38c] font-mono">Saved</span>}
          </div>
          <input
            type="text"
            value={notesDraft}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="e.g. TRAP vector = 0024H; K-Map consensus theorem: AB + A'C + BC = AB + A'C..."
            className="w-full bg-[#10141f] border border-[#202738] rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#3b69a1]/60"
          />
        </div>

      </div>

      {/* 📖 MODAL: GRANULAR BOOK & CHAPTER ATLAS POPUP */}
      {activeBookModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141824] border border-[#232c40] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-[#3b69a1]/15 text-[#6ba0de] border border-[#3b69a1]/30">
                  Standard Textbook Guide
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-1.5">
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

            <div className="space-y-3 bg-[#10141f] p-4 rounded-xl border border-[#1e2536] text-xs">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Recommended Book</span>
                <div className="text-slate-100 font-bold text-sm mt-0.5">
                  {activeBookModal.bookRef.bookTitle}
                </div>
                <div className="text-slate-400 text-xs">
                  by <strong className="text-slate-300">{activeBookModal.bookRef.author}</strong> ({activeBookModal.bookRef.edition})
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e2536]">
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Chapter</span>
                  <span className="text-[#6ba0de] font-semibold">{activeBookModal.bookRef.chapters}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Exact Page Range</span>
                  <span className="text-[#5bb38c] font-semibold">{activeBookModal.bookRef.pages}</span>
                </div>
              </div>

              {activeBookModal.bookRef.keyConcepts && activeBookModal.bookRef.keyConcepts.length > 0 && (
                <div className="pt-2 border-t border-[#1e2536]">
                  <span className="text-slate-400 uppercase text-[10px] font-bold block mb-1.5">Key Concepts to Extract:</span>
                  <ul className="space-y-1">
                    {activeBookModal.bookRef.keyConcepts.map((kc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                        <span className="text-[#6ba0de] mt-0.5">•</span>
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
                className="px-4 py-2 rounded-xl bg-[#3b69a1] hover:bg-[#4c7cb8] text-white text-xs font-semibold"
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
