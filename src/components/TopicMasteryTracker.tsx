import React, { useState } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Target, 
  FileCheck, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Zap,
  Filter,
  Info,
  Bookmark
} from 'lucide-react';
import { BookReference } from '../types/progress';

export const TopicMasteryTracker: React.FC = () => {
  const { subjects, toggleTopicField, updateTopicPyqCount, getSecuredMarks } = useProgressStore();
  
  const [expandedSubject, setExpandedSubject] = useState<string | null>('microprocessors');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [activeBookModal, setActiveBookModal] = useState<{ topicName: string; bookRef: BookReference } | null>(null);

  const toggleExpand = (subId: string) => {
    setExpandedSubject(expandedSubject === subId ? null : subId);
  };

  const filteredSubjects = subjects.filter(s => {
    if (filterTier === 'all') return true;
    if (filterTier === 'embedded') return s.id === 'microprocessors' || s.id === 'digital' || s.id === 'analog';
    if (filterTier === 'tier1') return s.priorityTier.includes('Tier 1');
    if (filterTier === 'tier2') return s.priorityTier.includes('Tier 2');
    if (filterTier === 'tier3') return s.priorityTier.includes('Tier 3');
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header & Filter Bar */}
      <div className="bg-[#141824] border border-[#1e2638] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-[#6ba4e8] text-xs font-bold uppercase tracking-wider mb-1 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BITS HD (ECE) Syllabus Atlas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Topic-by-Topic Syllabus & Book Reference Guide
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Every topic is mapped to recommended textbooks, exact chapters, and page ranges.
          </p>
        </div>

        {/* Tier Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#10141f] p-1.5 rounded-xl border border-[#1e2638] text-xs font-semibold">
          <button
            onClick={() => setFilterTier('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterTier === 'all' ? 'bg-[#3b69a1] text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Subjects
          </button>
          <button
            onClick={() => setFilterTier('embedded')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterTier === 'embedded' ? 'bg-[#489874] text-white font-bold' : 'text-[#7fd2a9] hover:text-white'
            }`}
          >
            Digital & MP
          </button>
          <button
            onClick={() => setFilterTier('tier1')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterTier === 'tier1' ? 'bg-[#527eaf] text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tier 1
          </button>
          <button
            onClick={() => setFilterTier('tier2')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterTier === 'tier2' ? 'bg-[#b5823e] text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tier 2
          </button>
          <button
            onClick={() => setFilterTier('tier3')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterTier === 'tier3' ? 'bg-[#7c75a8] text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tier 3
          </button>
        </div>
      </div>

      {/* Subjects Accordion List */}
      <div className="space-y-4">
        {filteredSubjects.map((sub) => {
          const isExpanded = expandedSubject === sub.id;
          
          // Calculate subject-level completion
          let subSecured = 0;
          sub.topics.forEach(t => {
            let f = 0;
            if (t.theoryCompleted) f += 0.35;
            f += Math.min(1, t.pyqsSolvedCount / (t.targetPyqs || 20)) * 0.45;
            if (t.formulaCardAdded) f += 0.10;
            if (t.errorLogged) f += 0.10;
            subSecured += t.marksWeight * f;
          });

          return (
            <div
              key={sub.id}
              className="bg-[#141824] border border-[#1e2638] rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              {/* Subject Summary Header */}
              <div
                onClick={() => toggleExpand(sub.id)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#161c28] transition-colors select-none"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-sm font-mono"
                    style={{ backgroundColor: `${sub.color}20`, color: sub.color, border: `1px solid ${sub.color}40` }}
                  >
                    {sub.shortCode}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">{sub.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#10141f] text-slate-300 border border-[#1e2638]">
                        {sub.priorityTier.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Weight: <strong className="text-slate-200">{sub.totalMarksRange}</strong> • {sub.topics.length} Key Subtopics
                    </div>
                  </div>
                </div>

                {/* Subject Progress Indicator */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-white">
                      {subSecured.toFixed(1)} / {sub.targetMarks} Marks
                    </div>
                    <div className="w-28 sm:w-36 bg-[#10141f] h-2 rounded-full overflow-hidden mt-1 border border-[#1e2638]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, (subSecured / sub.targetMarks) * 100)}%`,
                          backgroundColor: sub.color 
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#10141f] text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Subtopics Checklist Expanded View */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#1e2638] space-y-3 bg-[#10141f]/70">
                  <div className="text-xs font-semibold text-slate-400 mb-2 px-1">
                    Check off each essential and inspect book chapters to secure marks:
                  </div>

                  {sub.topics.map((topic) => {
                    const isFullyMastered = topic.theoryCompleted && topic.pyqsSolvedCount >= topic.targetPyqs && topic.formulaCardAdded;

                    return (
                      <div
                        key={topic.id}
                        className={`p-4 rounded-xl border transition-all space-y-3 ${
                          isFullyMastered 
                            ? 'bg-[#101a18] border-[#489874]/40 shadow-sm' 
                            : 'bg-[#141824] border-[#1e2638]'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                          
                          {/* Topic Name & Marks */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {topic.isHighYield && (
                                <span className="p-1 rounded-md bg-[#b5823e]/15 text-[#e0b579] border border-[#b5823e]/30" title="High Yield 80/20 Topic">
                                  <Zap className="w-3 h-3 fill-[#e0b579]" />
                                </span>
                              )}
                              {topic.isEmbeddedCore && (
                                <span className="px-2 py-0.5 rounded-md bg-[#489874]/15 text-[#7fd2a9] border border-[#489874]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                                  Core Topic
                                </span>
                              )}
                              <h4 className="font-bold text-sm text-slate-100">{topic.name}</h4>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                              <span>Weight: <strong className="text-[#7fd2a9]">+{topic.marksWeight} Marks</strong></span>
                              <span>•</span>
                              <span>Target: <strong>{topic.targetPyqs} Questions</strong></span>
                            </div>
                          </div>

                          {/* 4 Interactive Essentials Checkboxes */}
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            
                            {/* 1. Theory */}
                            <button
                              onClick={() => toggleTopicField(sub.id, topic.id, 'theoryCompleted')}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                                topic.theoryCompleted 
                                  ? 'bg-[#3b69a1] text-white border-[#527eaf] shadow-sm' 
                                  : 'bg-[#10141f] text-slate-400 border-[#1e2638] hover:text-white hover:border-slate-500'
                              }`}
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Theory</span>
                              {topic.theoryCompleted ? '✓' : ''}
                            </button>

                            {/* 2. PYQ Counter */}
                            <div className="flex items-center bg-[#10141f] border border-[#1e2638] rounded-lg px-2 py-1 gap-2">
                              <Target className="w-3.5 h-3.5 text-[#b0a9db]" />
                              <span className="text-xs font-mono font-bold text-slate-200">
                                {topic.pyqsSolvedCount}/{topic.targetPyqs}
                              </span>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => updateTopicPyqCount(sub.id, topic.id, topic.pyqsSolvedCount - 5)}
                                  className="w-5 h-5 rounded bg-[#161c28] hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center font-bold"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() => updateTopicPyqCount(sub.id, topic.id, topic.pyqsSolvedCount + 5)}
                                  className="w-5 h-5 rounded bg-[#7c75a8] hover:bg-[#8f88bd] text-white text-xs flex items-center justify-center font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* 3. Formula Card */}
                            <button
                              onClick={() => toggleTopicField(sub.id, topic.id, 'formulaCardAdded')}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                                topic.formulaCardAdded 
                                  ? 'bg-[#489874] text-white border-[#5bb38c] shadow-sm' 
                                  : 'bg-[#10141f] text-slate-400 border-[#1e2638] hover:text-white hover:border-slate-500'
                              }`}
                            >
                              <FileCheck className="w-3.5 h-3.5" />
                              <span>Formula</span>
                              {topic.formulaCardAdded ? '✓' : ''}
                            </button>

                            {/* 4. Error Log */}
                            <button
                              onClick={() => toggleTopicField(sub.id, topic.id, 'errorLogged')}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                                topic.errorLogged 
                                  ? 'bg-[#b5823e] text-white border-[#d49e5b] shadow-sm' 
                                  : 'bg-[#10141f] text-slate-400 border-[#1e2638] hover:text-white hover:border-slate-500'
                              }`}
                            >
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>Error Log</span>
                              {topic.errorLogged ? '✓' : ''}
                            </button>

                          </div>

                        </div>

                        {/* 📖 Book Citation Pill with Chapter & Page details */}
                        {topic.bookRef && (
                          <div 
                            onClick={() => setActiveBookModal({ topicName: topic.name, bookRef: topic.bookRef! })}
                            className="cursor-pointer bg-[#0e1117] hover:bg-[#161c28] p-2.5 rounded-lg border border-[#1e2638] transition-colors flex items-center justify-between text-xs group"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <BookOpen className="w-3.5 h-3.5 text-[#6ba4e8] flex-shrink-0" />
                              <span className="font-semibold text-slate-200">{topic.bookRef.bookTitle}</span>
                              <span className="text-slate-400">• {topic.bookRef.chapters}</span>
                              <span className="text-[#7fd2a9] font-mono font-medium">({topic.bookRef.pages})</span>
                            </div>
                            <span className="text-[11px] text-[#6ba4e8] group-hover:underline flex items-center gap-1 flex-shrink-0 ml-2">
                              <span>Read Guide</span>
                              <Info className="w-3 h-3" />
                            </span>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 📖 MODAL: GRANULAR BOOK & CHAPTER ATLAS POPUP */}
      {activeBookModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#141824] border border-[#222c40] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-[#3b69a1]/15 text-[#6ba4e8] border border-[#3b69a1]/30">
                  Standard Textbook Guide
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">
                  {activeBookModal.topicName}
                </h3>
              </div>
              <button 
                onClick={() => setActiveBookModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a2233]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 bg-[#10141f] p-4 rounded-xl border border-[#1e2638] text-xs">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Recommended Book</span>
                <div className="text-white font-bold text-sm mt-0.5">
                  {activeBookModal.bookRef.bookTitle}
                </div>
                <div className="text-slate-400 text-xs">
                  by <strong className="text-slate-200">{activeBookModal.bookRef.author}</strong> ({activeBookModal.bookRef.edition})
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e2638]">
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Chapter</span>
                  <span className="text-[#6ba4e8] font-semibold">{activeBookModal.bookRef.chapters}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Exact Page Range</span>
                  <span className="text-[#7fd2a9] font-semibold">{activeBookModal.bookRef.pages}</span>
                </div>
              </div>

              {activeBookModal.bookRef.keyConcepts && activeBookModal.bookRef.keyConcepts.length > 0 && (
                <div className="pt-2 border-t border-[#1e2638]">
                  <span className="text-slate-400 uppercase text-[10px] font-bold block mb-1.5">Key Concepts to Extract:</span>
                  <ul className="space-y-1">
                    {activeBookModal.bookRef.keyConcepts.map((kc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                        <span className="text-[#6ba4e8] mt-0.5">•</span>
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
                className="px-4 py-2 rounded-xl bg-[#3b69a1] hover:bg-[#4a7cb8] text-white text-xs font-semibold shadow-md shadow-[#3b69a1]/20 transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
