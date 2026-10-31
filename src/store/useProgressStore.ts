import { create } from 'zustand';
import { SubjectModule, DayPlan, TopicPair, ActiveNavView } from '../types/progress';
import { Question } from '../types/gate';
import { GATE_ECE_SUBJECTS, INITIAL_DAY_PLANS } from '../data/syllabusData';
import { CURATED_TOPIC_PAIRS } from '../data/topicPairsData';
import { INITIAL_QUESTIONS } from '../data/mockQuestions';

export interface DailyPairChecklist {
  date: string;
  topicAChecked: boolean;
  topicAPyqs: number;
  topicBChecked: boolean;
  topicBPyqs: number;
  retentionChecked: boolean;
  notes: string;
}

// Retain legacy interface for smooth backward compatibility
export interface DailyChecklist {
  date: string;
  theoryChecked: boolean;
  pyqsChecked: boolean;
  pyqsCount: number;
  retentionChecked: boolean;
  notes: string;
}

export interface ProgressStore {
  // Navigation
  activeView: ActiveNavView;
  setActiveView: (view: ActiveNavView) => void;

  // Active Topic Pair System
  topicPairs: TopicPair[];
  activePairId: string;
  setActivePairId: (pairId: string) => void;
  togglePairCompletion: (pairId: string) => void;
  setCustomPair: (customPair: TopicPair) => void;

  // Active 18-Week Day Selection (Legacy Fallback)
  activeDayNumber: number;
  setActiveDayNumber: (day: number) => void;

  // Subjects & Subtopic Tracking
  subjects: SubjectModule[];
  toggleTopicField: (subjectId: string, topicId: string, field: 'theoryCompleted' | 'formulaCardAdded' | 'errorLogged') => void;
  updateTopicPyqCount: (subjectId: string, topicId: string, count: number) => void;

  // Daily Essentials Checklists (Dual & Legacy)
  dailyPairChecklist: DailyPairChecklist;
  updateDailyPairChecklist: (patch: Partial<DailyPairChecklist>) => void;
  todayChecklist: DailyChecklist;
  updateTodayChecklist: (patch: Partial<DailyChecklist>) => void;

  isMvdMode: boolean;
  toggleMvdMode: () => void;
  streak: number;

  // Day-by-day Roadmap Plans (Legacy Fallback)
  dayPlans: DayPlan[];
  toggleDayCompletion: (dayNumber: number) => void;

  // CBT Exam & PYQ Arena Unified State
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  userResponses: Record<string, string | string[]>;
  recordResponse: (questionId: string, answer: string | string[]) => void;
  isCalcOpen: boolean;
  toggleCalc: () => void;

  // Computed Metrics
  getSecuredMarks: () => number;
  getTotalTargetMarks: () => number;
  getCompletedTopicsCount: () => number;
  getTotalTopicsCount: () => number;
  getCompletedPairsCount: () => number;
}

const getTodayDateString = () => new Date().toISOString().split('T')[0];

// Safe localStorage helper to prevent quota exceeded bloat
const safeSave = (key: string, value: any) => {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (e) {
    console.warn(`[gate_tracker] localStorage save quota reached for ${key}:`, e);
  }
};

// 🧹 Clean up obsolete legacy bloat keys from earlier versions
const pruneObsoleteBloat = () => {
  const bloatKeys = [
    'gate_today_quest',
    'gate_legacy_progress',
    'gate_storage_v1',
    'gate_storage_backup',
    'gate_exam_state',
    'gate_day_plans'
  ];
  bloatKeys.forEach(k => {
    try {
      localStorage.removeItem(k);
    } catch {}
  });
};

export const useProgressStore = create<ProgressStore>((set, get) => {
  // Prune legacy bloat on initialization
  pruneObsoleteBloat();

  // Load saved state from localStorage
  const storedSubjects = localStorage.getItem('gate_subjects_mastery');
  const storedPairs = localStorage.getItem('gate_topic_pairs_mastery');
  const storedActivePair = localStorage.getItem('gate_active_pair_id');
  const storedDailyPair = localStorage.getItem('gate_daily_pair_checklist');
  const storedDaily = localStorage.getItem('gate_today_checklist');
  const storedStreak = localStorage.getItem('gate_user_streak');
  const storedActiveDay = localStorage.getItem('gate_active_day');
  const storedResponses = localStorage.getItem('gate_cbt_responses');

  // Subjects & Topics initialization with lightweight delta merging
  let initialSubjects: SubjectModule[] = GATE_ECE_SUBJECTS;
  if (storedSubjects) {
    try {
      const parsed: any = JSON.parse(storedSubjects);
      if (Array.isArray(parsed)) {
        initialSubjects = GATE_ECE_SUBJECTS.map(fresh => {
          const matched = parsed.find((p: any) => p.id === fresh.id);
          if (matched && matched.topics) {
            return {
              ...fresh,
              topics: fresh.topics.map(ft => {
                const pt = matched.topics.find((t: any) => t.id === ft.id);
                return pt ? { 
                  ...ft, 
                  theoryCompleted: !!pt.theoryCompleted,
                  pyqsSolvedCount: pt.pyqsSolvedCount || 0,
                  formulaCardAdded: !!pt.formulaCardAdded,
                  errorLogged: !!pt.errorLogged 
                } : ft;
              })
            };
          }
          return fresh;
        });
      }
    } catch {
      initialSubjects = GATE_ECE_SUBJECTS;
    }
  }

  // Topic Pairs initialization
  let initialTopicPairs: TopicPair[] = CURATED_TOPIC_PAIRS;
  if (storedPairs) {
    try {
      const parsedPairs: TopicPair[] = JSON.parse(storedPairs);
      initialTopicPairs = CURATED_TOPIC_PAIRS.map(cp => {
        const found = parsedPairs.find(p => p.id === cp.id);
        return found ? { ...cp, isCompleted: found.isCompleted } : cp;
      });
    } catch {
      initialTopicPairs = CURATED_TOPIC_PAIRS;
    }
  }

  const initialActivePairId = storedActivePair || 'pair-1';

  const initialDailyPair: DailyPairChecklist = storedDailyPair ? JSON.parse(storedDailyPair) : {
    date: getTodayDateString(),
    topicAChecked: false,
    topicAPyqs: 0,
    topicBChecked: false,
    topicBPyqs: 0,
    retentionChecked: false,
    notes: ''
  };

  const initialDayPlans: DayPlan[] = INITIAL_DAY_PLANS;
  const initialActiveDay = storedActiveDay ? parseInt(storedActiveDay, 10) : 1;

  const initialDaily: DailyChecklist = storedDaily ? JSON.parse(storedDaily) : {
    date: getTodayDateString(),
    theoryChecked: false,
    pyqsChecked: false,
    pyqsCount: 0,
    retentionChecked: false,
    notes: ''
  };

  const initialResponses = storedResponses ? JSON.parse(storedResponses) : {};

  // Helper to persist only lightweight progress deltas
  const persistSubjectsProgress = (subs: SubjectModule[]) => {
    const compact = subs.map(s => ({
      id: s.id,
      topics: s.topics.map(t => ({
        id: t.id,
        theoryCompleted: t.theoryCompleted,
        pyqsSolvedCount: t.pyqsSolvedCount,
        formulaCardAdded: t.formulaCardAdded,
        errorLogged: t.errorLogged
      }))
    }));
    safeSave('gate_subjects_mastery', compact);
  };

  return {
    activeView: 'today',
    setActiveView: (view) => set({ activeView: view }),

    topicPairs: initialTopicPairs,
    activePairId: initialActivePairId,
    setActivePairId: (pairId) => {
      safeSave('gate_active_pair_id', pairId);
      const resetChecklist: DailyPairChecklist = {
        date: getTodayDateString(),
        topicAChecked: false,
        topicAPyqs: 0,
        topicBChecked: false,
        topicBPyqs: 0,
        retentionChecked: false,
        notes: ''
      };
      safeSave('gate_daily_pair_checklist', resetChecklist);
      set({ activePairId: pairId, dailyPairChecklist: resetChecklist });
    },

    togglePairCompletion: (pairId) => set((state) => {
      const updated = state.topicPairs.map(p => {
        if (p.id !== pairId) return p;
        return { ...p, isCompleted: !p.isCompleted };
      });
      safeSave('gate_topic_pairs_mastery', updated.map(p => ({ id: p.id, isCompleted: p.isCompleted })));
      return { topicPairs: updated };
    }),

    setCustomPair: (customPair) => set((state) => {
      const exists = state.topicPairs.some(p => p.id === customPair.id);
      const updated = exists 
        ? state.topicPairs.map(p => p.id === customPair.id ? customPair : p)
        : [customPair, ...state.topicPairs];
      safeSave('gate_topic_pairs_mastery', updated.map(p => ({ id: p.id, isCompleted: p.isCompleted })));
      safeSave('gate_active_pair_id', customPair.id);
      return { topicPairs: updated, activePairId: customPair.id };
    }),

    activeDayNumber: initialActiveDay,
    setActiveDayNumber: (dayNumber) => {
      safeSave('gate_active_day', dayNumber.toString());
      set({ activeDayNumber: dayNumber });
    },

    subjects: initialSubjects,
    toggleTopicField: (subjectId, topicId, field) => set((state) => {
      const updated = state.subjects.map(s => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          topics: s.topics.map(t => {
            if (t.id !== topicId) return t;
            return { ...t, [field]: !t[field] };
          })
        };
      });
      persistSubjectsProgress(updated);
      return { subjects: updated };
    }),

    updateTopicPyqCount: (subjectId, topicId, count) => set((state) => {
      const updated = state.subjects.map(s => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          topics: s.topics.map(t => {
            if (t.id !== topicId) return t;
            return { ...t, pyqsSolvedCount: Math.max(0, count) };
          })
        };
      });
      persistSubjectsProgress(updated);
      return { subjects: updated };
    }),

    dailyPairChecklist: initialDailyPair,
    updateDailyPairChecklist: (patch) => set((state) => {
      const updatedChecklist = { ...state.dailyPairChecklist, ...patch };
      safeSave('gate_daily_pair_checklist', updatedChecklist);

      const curPair = state.topicPairs.find(p => p.id === state.activePairId) || state.topicPairs[0];
      const targetA = state.isMvdMode ? 5 : 10;
      const targetB = state.isMvdMode ? 5 : 10;
      const isPairComplete = updatedChecklist.topicAChecked && 
                             updatedChecklist.topicAPyqs >= targetA &&
                             updatedChecklist.topicBChecked && 
                             updatedChecklist.topicBPyqs >= targetB &&
                             updatedChecklist.retentionChecked;

      const updatedTopicPairs = state.topicPairs.map(p => {
        if (p.id !== curPair.id) return p;
        return { ...p, isCompleted: isPairComplete };
      });
      safeSave('gate_topic_pairs_mastery', updatedTopicPairs.map(p => ({ id: p.id, isCompleted: p.isCompleted })));

      let updatedSubjects = state.subjects;
      if (curPair) {
        updatedSubjects = state.subjects.map(sub => {
          let modified = false;
          const updatedTopics = sub.topics.map(t => {
            if (sub.id === curPair.topicA.subjectId && t.id === curPair.topicA.topicId) {
              modified = true;
              return {
                ...t,
                theoryCompleted: updatedChecklist.topicAChecked ? true : t.theoryCompleted,
                pyqsSolvedCount: Math.max(t.pyqsSolvedCount, updatedChecklist.topicAPyqs),
                formulaCardAdded: updatedChecklist.retentionChecked ? true : t.formulaCardAdded
              };
            }
            if (sub.id === curPair.topicB.subjectId && t.id === curPair.topicB.topicId) {
              modified = true;
              return {
                ...t,
                theoryCompleted: updatedChecklist.topicBChecked ? true : t.theoryCompleted,
                pyqsSolvedCount: Math.max(t.pyqsSolvedCount, updatedChecklist.topicBPyqs),
                formulaCardAdded: updatedChecklist.retentionChecked ? true : t.formulaCardAdded
              };
            }
            return t;
          });
          return modified ? { ...sub, topics: updatedTopics } : sub;
        });
        persistSubjectsProgress(updatedSubjects);
      }

      return {
        dailyPairChecklist: updatedChecklist,
        topicPairs: updatedTopicPairs,
        subjects: updatedSubjects
      };
    }),

    todayChecklist: initialDaily,
    updateTodayChecklist: (patch) => set((state) => {
      const updated = { ...state.todayChecklist, ...patch };
      safeSave('gate_today_checklist', updated);
      return { todayChecklist: updated };
    }),

    isMvdMode: false,
    toggleMvdMode: () => set((state) => ({ isMvdMode: !state.isMvdMode })),

    streak: storedStreak ? parseInt(storedStreak, 10) : 5,

    dayPlans: initialDayPlans,
    toggleDayCompletion: (dayNumber) => set((state) => {
      const updated = state.dayPlans.map(d => {
        if (d.dayNumber !== dayNumber) return d;
        return { ...d, isCompleted: !d.isCompleted };
      });
      return { dayPlans: updated };
    }),

    // CBT & PYQ Unified State
    questions: INITIAL_QUESTIONS,
    currentQuestionIndex: 0,
    setCurrentQuestionIndex: (idx) => set({ currentQuestionIndex: idx }),
    userResponses: initialResponses,
    recordResponse: (qId, ans) => set((state) => {
      const updated = { ...state.userResponses, [qId]: ans };
      safeSave('gate_cbt_responses', updated);
      return { userResponses: updated };
    }),

    isCalcOpen: false,
    toggleCalc: () => set((state) => ({ isCalcOpen: !state.isCalcOpen })),

    getSecuredMarks: () => {
      const { subjects } = get();
      let secured = 0;
      subjects.forEach(s => {
        s.topics.forEach(t => {
          let scoreFactor = 0;
          if (t.theoryCompleted) scoreFactor += 0.35;
          const pyqRatio = Math.min(1, t.pyqsSolvedCount / (t.targetPyqs || 20));
          scoreFactor += pyqRatio * 0.45;
          if (t.formulaCardAdded) scoreFactor += 0.10;
          if (t.errorLogged) scoreFactor += 0.10;

          secured += t.marksWeight * scoreFactor;
        });
      });
      return Number(secured.toFixed(1));
    },

    getTotalTargetMarks: () => {
      const { subjects } = get();
      return subjects.reduce((sum, s) => sum + s.targetMarks, 0);
    },

    getCompletedTopicsCount: () => {
      const { subjects } = get();
      let count = 0;
      subjects.forEach(s => {
        s.topics.forEach(t => {
          if (t.theoryCompleted && t.pyqsSolvedCount >= t.targetPyqs && t.formulaCardAdded) {
            count++;
          }
        });
      });
      return count;
    },

    getTotalTopicsCount: () => {
      const { subjects } = get();
      return subjects.reduce((sum, s) => sum + s.topics.length, 0);
    },

    getCompletedPairsCount: () => {
      const { topicPairs } = get();
      return topicPairs.filter(p => p.isCompleted).length;
    }
  };
});
