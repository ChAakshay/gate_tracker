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
  Filter
} from 'lucide-react';

export const TopicMasteryTracker: React.FC = () => {
  const { subjects, toggleTopicField, updateTopicPyqCount, getSecuredMarks } = useProgressStore();
  
  const [expandedSubject, setExpandedSubject] = useState<string | null>('math');
  const [filterTier, setFilterTier] = useState<string>('all');

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
      <div className="bg-[#10131d] border border-[#1b2234] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BITS HD (ECE) Syllabus Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Topic-by-Topic Progress Tracker
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Check off essentials for each topic to steadily accumulate towards your 185+ marks target.
          </p>
        </div>

        {/* Tier Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#141824] p-1 rounded-xl border border-[#202738] text-xs font-semibold">
          <button
            onClick={() => setFilterTier('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterTier === 'all' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Subjects
          </button>
          <button
            onClick={() => setFilterTier('embedded')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterTier === 'embedded' ? 'bg-cyan-600 text-white font-bold' : 'text-cyan-400 hover:text-white'
            }`}
          >
            Digital & MP
          </button>
          <button
            onClick={() => setFilterTier('tier1')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterTier === 'tier1' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tier 1
          </button>
          <button
            onClick={() => setFilterTier('tier2')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterTier === 'tier2' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tier 2
          </button>
          <button
            onClick={() => setFilterTier('tier3')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterTier === 'tier3' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
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
            f += Math.min(1, t.pyqsSolvedCount / t.targetPyqs) * 0.45;
            if (t.formulaCardAdded) f += 0.10;
            if (t.errorLogged) f += 0.10;
            subSecured += t.marksWeight * f;
          });

          return (
            <div
              key={sub.id}
              className="bg-[#12141c] border border-[#1f2433] rounded-3xl overflow-hidden shadow-lg transition-all"
            >
              {/* Subject Summary Header */}
              <div
                onClick={() => toggleExpand(sub.id)}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#161a26] transition-colors select-none"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-md font-mono"
                    style={{ backgroundColor: `${sub.color}25`, color: sub.color, border: `1px solid ${sub.color}50` }}
                  >
                    {sub.shortCode}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{sub.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
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
                    <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden mt-1 border border-slate-700">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, (subSecured / sub.targetMarks) * 100)}%`,
                          backgroundColor: sub.color 
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/80 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Subtopics Checklist Expanded View */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-3 bg-[#0d0f17]/50">
                  <div className="text-xs font-semibold text-slate-400 mb-2 px-1">
                    Check off the 4 pillars for each subtopic to secure marks:
                  </div>

                  {sub.topics.map((topic) => {
                    const isFullyMastered = topic.theoryCompleted && topic.pyqsSolvedCount >= topic.targetPyqs && topic.formulaCardAdded;

                    return (
                      <div
                        key={topic.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isFullyMastered 
                            ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm' 
                            : 'bg-[#151924] border-[#22293b]'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                          
                          {/* Topic Name & Marks */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {topic.isHighYield && (
                                <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30" title="High Yield 80/20 Topic">
                                  <Zap className="w-3 h-3 fill-amber-400" />
                                </span>
                              )}
                              {topic.isEmbeddedCore && (
                                <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                                  Core Topic
                                </span>
                              )}
                              <h4 className="font-bold text-sm text-slate-100">{topic.name}</h4>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-3">
                              <span>Weight: <strong className="text-emerald-400">+{topic.marksWeight} Marks</strong></span>
                              <span>•</span>
                              <span>Target PYQs: <strong>{topic.targetPyqs} Questions</strong></span>
                            </div>
                          </div>

                          {/* 4 Interactive Essentials Checkboxes */}
                          <div className="flex flex-wrap items-center gap-2">
                            
                            {/* 1. Theory */}
                            <button
                              onClick={() => toggleTopicField(sub.id, topic.id, 'theoryCompleted')}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                                topic.theoryCompleted 
                                  ? 'bg-blue-600 text-white border-blue-400 shadow-sm' 
                                  : 'bg-[#1a2030] text-slate-400 border-slate-700 hover:text-white hover:border-slate-500'
                              }`}
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Theory</span>
                              {topic.theoryCompleted ? '✓' : ''}
                            </button>

                            {/* 2. PYQ Counter */}
                            <div className="flex items-center bg-[#1a2030] border border-slate-700 rounded-xl px-2 py-1 gap-2">
                              <Target className="w-3.5 h-3.5 text-purple-400" />
                              <span className="text-xs font-mono font-bold text-slate-200">
                                {topic.pyqsSolvedCount}/{topic.targetPyqs}
                              </span>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => updateTopicPyqCount(sub.id, topic.id, topic.pyqsSolvedCount - 5)}
                                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center font-bold"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() => updateTopicPyqCount(sub.id, topic.id, topic.pyqsSolvedCount + 5)}
                                  className="w-5 h-5 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs flex items-center justify-center font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* 3. Formula Card */}
                            <button
                              onClick={() => toggleTopicField(sub.id, topic.id, 'formulaCardAdded')}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                                topic.formulaCardAdded 
                                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm' 
                                  : 'bg-[#1a2030] text-slate-400 border-slate-700 hover:text-white hover:border-slate-500'
                              }`}
                            >
                              <FileCheck className="w-3.5 h-3.5" />
                              <span>Formula Card</span>
                              {topic.formulaCardAdded ? '✓' : ''}
                            </button>

                            {/* 4. Error Log */}
                            <button
                              onClick={() => toggleTopicField(sub.id, topic.id, 'errorLogged')}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                                topic.errorLogged 
                                  ? 'bg-amber-600 text-white border-amber-400 shadow-sm' 
                                  : 'bg-[#1a2030] text-slate-400 border-slate-700 hover:text-white hover:border-slate-500'
                              }`}
                            >
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>3-Line Log</span>
                              {topic.errorLogged ? '✓' : ''}
                            </button>

                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
