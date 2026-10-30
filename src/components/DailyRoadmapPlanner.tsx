import React, { useState } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { PAIR_ARCHETYPES } from '../data/topicPairsData';
import { TopicPair, BookReference } from '../types/progress';
import { 
  CheckCircle2, 
  Circle, 
  Target, 
  BookOpen, 
  Sparkles, 
  Zap,
  ArrowRight,
  Filter,
  Check,
  Shuffle,
  Layers,
  Info,
  Clock,
  PlusCircle,
  HelpCircle
} from 'lucide-react';

export const DailyRoadmapPlanner: React.FC = () => {
  const { 
    topicPairs, 
    togglePairCompletion, 
    activePairId, 
    setActivePairId, 
    setActiveView,
    subjects,
    setCustomPair,
    getCompletedPairsCount
  } = useProgressStore();

  const [selectedArchetype, setSelectedArchetype] = useState<string>('All Pairs');
  const [activeBookModal, setActiveBookModal] = useState<{ topicName: string; bookRef: BookReference } | null>(null);
  const [showCustomBuilder, setShowCustomBuilder] = useState<boolean>(false);

  // Custom Pair Builder Form State
  const [customTopicA_Sub, setCustomTopicA_Sub] = useState<string>(subjects[0]?.id || 'math');
  const [customTopicA_Id, setCustomTopicA_Id] = useState<string>(subjects[0]?.topics[0]?.id || '');
  const [customTopicB_Sub, setCustomTopicB_Sub] = useState<string>(subjects[5]?.id || 'digital');
  const [customTopicB_Id, setCustomTopicB_Id] = useState<string>(subjects[5]?.topics[0]?.id || '');
  const [customTitle, setCustomTitle] = useState<string>('My Custom Variety Session');

  const completedCount = getCompletedPairsCount();

  const filteredPairs = topicPairs.filter(p => {
    if (selectedArchetype === 'All Pairs') return true;
    return p.archetype === selectedArchetype;
  });

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

  const handleCreateCustomPair = (e: React.FormEvent) => {
    e.preventDefault();
    const subA = subjects.find(s => s.id === customTopicA_Sub);
    const subB = subjects.find(s => s.id === customTopicB_Sub);
    const topA = subA?.topics.find(t => t.id === customTopicA_Id) || subA?.topics[0];
    const topB = subB?.topics.find(t => t.id === customTopicB_Id) || subB?.topics[0];

    if (!topA || !topB || !subA || !subB) return;

    const newPair: TopicPair = {
      id: `custom-${Date.now()}`,
      pairNumber: topicPairs.length + 1,
      title: customTitle || `${topA.name} + ${topB.name}`,
      archetype: 'Custom Mix',
      synergyRationale: `User-curated session pairing ${subA.name.split('(')[0].trim()} with ${subB.name.split('(')[0].trim()} to maintain focus and personal pacing.`,
      topicA: {
        subjectId: subA.id,
        subjectName: subA.name,
        subjectColor: subA.color,
        topicId: topA.id,
        topicName: topA.name,
        marksWeight: topA.marksWeight,
        targetPyqs: topA.targetPyqs,
        bookRef: topA.bookRef || {
          bookTitle: 'Standard Engineering Textbook',
          author: 'Subject Expert',
          edition: 'Latest Edition',
          chapters: 'Core Chapter',
          pages: 'Selected Pages'
        }
      },
      topicB: {
        subjectId: subB.id,
        subjectName: subB.name,
        subjectColor: subB.color,
        topicId: topB.id,
        topicName: topB.name,
        marksWeight: topB.marksWeight,
        targetPyqs: topB.targetPyqs,
        bookRef: topB.bookRef || {
          bookTitle: 'Standard Engineering Textbook',
          author: 'Subject Expert',
          edition: 'Latest Edition',
          chapters: 'Core Chapter',
          pages: 'Selected Pages'
        }
      },
      combinedMarks: Number((topA.marksWeight + topB.marksWeight).toFixed(1)),
      estMinutes: 180,
      isCompleted: false
    };

    setCustomPair(newPair);
    setShowCustomBuilder(false);
    setActiveView('today');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* 🧭 COMMAND BANNER: TOPIC PAIRING VARIETY HUB */}
      <div className="bg-gradient-to-br from-[#131b2e] via-[#10131f] to-[#0c0e17] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1.5 font-mono">
              <Shuffle className="w-4 h-4 text-blue-400" />
              <span>Anti-Burnout Topic Pairing Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Topic Pairs Variety Hub
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Eliminate single-subject fatigue. Every study session pairs two complementary topics across different subjects with exact textbook chapters and page citations.
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl border border-[#232b40] bg-[#141824]/90 text-xs font-bold font-mono flex items-center gap-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{completedCount} / {topicPairs.length} Pairs Completed</span>
            </div>

            <button
              onClick={() => setShowCustomBuilder(true)}
              className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Build Custom Pair</span>
            </button>
          </div>
        </div>

        {/* 📊 3 Variety Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-[#141824]/90 p-4 rounded-2xl border border-[#232b40]">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Session Architecture</div>
            <div className="text-xl font-bold text-white mt-1">Dual-Domain Fusion</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Calculation paired with Architecture/Logic</div>
          </div>

          <div className="bg-[#141824]/90 p-4 rounded-2xl border border-[#232b40]">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Average Session</div>
            <div className="text-xl font-bold text-blue-400 font-mono mt-1">~3.0 to 3.5 Hours</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Topic A (1.5h) + Topic B (1.5h) + Retention</div>
          </div>

          <div className="bg-[#141824]/90 p-4 rounded-2xl border border-[#232b40]">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Textbook Precision</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">100% Granular Citations</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Exact chapters & page numbers for every topic</div>
          </div>
        </div>
      </div>

      {/* 🔍 Archetype Filter Navigation Bar */}
      <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Filter className="w-4 h-4 text-blue-400" />
          <span>Filter by Pairing Archetype:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {PAIR_ARCHETYPES.map((arch) => (
            <button
              key={arch}
              onClick={() => setSelectedArchetype(arch)}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                selectedArchetype === arch 
                  ? 'bg-blue-600 text-white font-bold shadow-sm' 
                  : 'bg-[#141824] text-slate-400 hover:text-white border border-[#202738]'
              }`}
            >
              {arch}
            </button>
          ))}
        </div>
      </div>

      {/* 🗓️ List of Topic Pairs */}
      <div className="space-y-4">
        {filteredPairs.map((pair) => {
          const isActive = pair.id === activePairId;

          return (
            <div
              key={pair.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-4 ${
                pair.isCompleted
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : isActive
                  ? 'bg-blue-950/20 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                  : 'bg-[#10131d] border-[#1b2234] hover:border-slate-700'
              }`}
            >
              {/* Header: Pair Number, Archetype & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => togglePairCompletion(pair.id)}
                    className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors"
                    title={pair.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                  >
                    {pair.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60">
                        Pair #{pair.pairNumber}
                      </span>
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${getArchetypeBadgeClass(pair.archetype)}`}>
                        {pair.archetype}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        +{pair.combinedMarks} Marks
                      </span>
                      {isActive && (
                        <span className="text-[10px] uppercase font-mono font-extrabold px-2 py-0.5 rounded-full bg-blue-500 text-white animate-pulse">
                          Active Today
                        </span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                      {pair.title}
                    </h2>
                    <p className="text-xs text-slate-400 italic mt-0.5">
                      ⚡ Synergy: {pair.synergyRationale}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setActivePairId(pair.id);
                      setActiveView('today');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-[#141824] hover:bg-slate-800 text-slate-300 border border-[#202738]'
                    }`}
                  >
                    <span>{isActive ? 'Continue Session' : 'Study This Pair'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Subtopic Dual-Cards Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                
                {/* Topic A Block */}
                <div className="bg-[#141824] p-3.5 rounded-xl border border-[#1f273a] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span 
                      className="font-mono font-bold px-2 py-0.5 rounded text-[10px]"
                      style={{ 
                        backgroundColor: `${pair.topicA.subjectColor}15`, 
                        color: pair.topicA.subjectColor 
                      }}
                    >
                      Topic A • {pair.topicA.subjectName.split('(')[0].trim()}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">+{pair.topicA.marksWeight}M</span>
                  </div>
                  <div className="font-semibold text-xs text-slate-100">
                    {pair.topicA.topicName}
                  </div>
                  
                  {/* Book Citation Pill */}
                  <div 
                    onClick={() => setActiveBookModal({ topicName: pair.topicA.topicName, bookRef: pair.topicA.bookRef })}
                    className="cursor-pointer bg-[#0e111a] hover:bg-[#181d2c] p-2 rounded-lg border border-[#232a3e] flex items-center justify-between text-[11px] text-slate-300 group"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <BookOpen className="w-3 h-3 text-blue-400 flex-shrink-0" />
                      <span className="truncate">{pair.topicA.bookRef.bookTitle} ({pair.topicA.bookRef.pages})</span>
                    </div>
                    <Info className="w-3 h-3 text-slate-500 group-hover:text-blue-400 flex-shrink-0" />
                  </div>
                </div>

                {/* Topic B Block */}
                <div className="bg-[#141824] p-3.5 rounded-xl border border-[#1f273a] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span 
                      className="font-mono font-bold px-2 py-0.5 rounded text-[10px]"
                      style={{ 
                        backgroundColor: `${pair.topicB.subjectColor}15`, 
                        color: pair.topicB.subjectColor 
                      }}
                    >
                      Topic B • {pair.topicB.subjectName.split('(')[0].trim()}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">+{pair.topicB.marksWeight}M</span>
                  </div>
                  <div className="font-semibold text-xs text-slate-100">
                    {pair.topicB.topicName}
                  </div>
                  
                  {/* Book Citation Pill */}
                  <div 
                    onClick={() => setActiveBookModal({ topicName: pair.topicB.topicName, bookRef: pair.topicB.bookRef })}
                    className="cursor-pointer bg-[#0e111a] hover:bg-[#181d2c] p-2 rounded-lg border border-[#232a3e] flex items-center justify-between text-[11px] text-slate-300 group"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <BookOpen className="w-3 h-3 text-purple-400 flex-shrink-0" />
                      <span className="truncate">{pair.topicB.bookRef.bookTitle} ({pair.topicB.bookRef.pages})</span>
                    </div>
                    <Info className="w-3 h-3 text-slate-500 group-hover:text-purple-400 flex-shrink-0" />
                  </div>
                </div>

              </div>

            </div>
          );
        })}
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
                  <span className="text-slate-400 uppercase text-[10px] font-bold block mb-1.5">Key Concepts & Formulas:</span>
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

      {/* 🎲 MODAL: CUSTOM PAIR SHUFFLER & BUILDER */}
      {showCustomBuilder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateCustomPair} className="bg-[#121622] border border-[#232b40] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  Variety Shuffler
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Build Your Own Topic Pair
                </h3>
                <p className="text-xs text-slate-400">
                  Pick any two topics from different subjects to design your custom study mix.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setShowCustomBuilder(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">Session Title</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Eigenvalues & Op-Amp Derivations"
                  className="w-full bg-[#181d2c] border border-[#28324a] rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-blue-500"
                />
              </div>

              {/* Topic A Selection */}
              <div className="bg-[#161a28] p-3 rounded-xl border border-[#22293c] space-y-2">
                <span className="font-bold text-blue-400 uppercase text-[10px]">Topic 1 (Domain 1)</span>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={customTopicA_Sub}
                    onChange={(e) => {
                      setCustomTopicA_Sub(e.target.value);
                      const s = subjects.find(sub => sub.id === e.target.value);
                      if (s?.topics[0]) setCustomTopicA_Id(s.topics[0].id);
                    }}
                    className="bg-[#10131d] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 outline-none"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name.split('(')[0]}</option>
                    ))}
                  </select>

                  <select
                    value={customTopicA_Id}
                    onChange={(e) => setCustomTopicA_Id(e.target.value)}
                    className="bg-[#10131d] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 outline-none"
                  >
                    {subjects.find(s => s.id === customTopicA_Sub)?.topics.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Topic B Selection */}
              <div className="bg-[#161a28] p-3 rounded-xl border border-[#22293c] space-y-2">
                <span className="font-bold text-purple-400 uppercase text-[10px]">Topic 2 (Domain 2)</span>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={customTopicB_Sub}
                    onChange={(e) => {
                      setCustomTopicB_Sub(e.target.value);
                      const s = subjects.find(sub => sub.id === e.target.value);
                      if (s?.topics[0]) setCustomTopicB_Id(s.topics[0].id);
                    }}
                    className="bg-[#10131d] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 outline-none"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name.split('(')[0]}</option>
                    ))}
                  </select>

                  <select
                    value={customTopicB_Id}
                    onChange={(e) => setCustomTopicB_Id(e.target.value)}
                    className="bg-[#10131d] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 outline-none"
                  >
                    {subjects.find(s => s.id === customTopicB_Sub)?.topics.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowCustomBuilder(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
              >
                Launch Pair in Today's Essentials
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
