import { create } from 'zustand';
import { SubjectModule, DayPlan, TopicPair } from '../types/progress';
import { GATE_ECE_SUBJECTS, INITIAL_DAY_PLANS } from '../data/syllabusData';
import { CURATED_TOPIC_PAIRS } from '../data/topicPairsData';

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

interface ProgressStore {
  // Active Navigation Tab
  activeView: 'today' | 'blueprint' | 'syllabus' | 'formula' | 'roadmap' | 'errors';
  setActiveView: (view: 'today' | 'blueprint' | 'syllabus' | 'formula' | 'roadmap' | 'errors') => void;

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

  // Computed Metrics
  getSecuredMarks: () => number;
  getTotalTargetMarks: () => number;
  getCompletedTopicsCount: () => number;
  getTotalTopicsCount: () => number;
  getCompletedPairsCount: () => number;
}

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const useProgressStore = create<ProgressStore>((set, get) => {
  // Load saved state from localStorage
  const storedSubjects = localStorage.getItem('gate_subjects_mastery');
  const storedPairs = localStorage.getItem('gate_topic_pairs_mastery');
  const storedActivePair = localStorage.getItem('gate_active_pair_id');
  const storedDailyPair = localStorage.getItem('gate_daily_pair_checklist');
  const storedDayPlans = localStorage.getItem('gate_day_plans');
  const storedDaily = localStorage.getItem('gate_today_checklist');
  const storedStreak = localStorage.getItem('gate_user_streak');
  const storedActiveDay = localStorage.getItem('gate_active_day');

  // Subjects & Topics initialization with smart migration
  let initialSubjects: SubjectModule[] = GATE_ECE_SUBJECTS;
  if (storedSubjects) {
    try {
      const parsed: SubjectModule[] = JSON.parse(storedSubjects);
      const existingIds = new Set(parsed.map(s => s.id));
      const missing = GATE_ECE_SUBJECTS.filter(s => !existingIds.has(s.id));
      initialSubjects = parsed.map(p => {
        const fresh = GATE_ECE_SUBJECTS.find(f => f.id === p.id);
        if (fresh) {
          return {
            ...fresh,
            topics: fresh.topics.map(ft => {
              const pt = p.topics.find(t => t.id === ft.id);
              return pt ? { ...ft, ...pt, bookRef: ft.bookRef } : ft;
            })
          };
        }
        return p;
      }).concat(missing);
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

  const initialDayPlans: DayPlan[] = storedDayPlans ? JSON.parse(storedDayPlans) : INITIAL_DAY_PLANS;
  const initialActiveDay = storedActiveDay ? parseInt(storedActiveDay, 10) : 1;

  const initialDaily: DailyChecklist = storedDaily ? JSON.parse(storedDaily) : {
    date: getTodayDateString(),
    theoryChecked: false,
    pyqsChecked: false,
    pyqsCount: 0,
    retentionChecked: false,
    notes: ''
  };

  return {
    activeView: 'today',
    setActiveView: (view) => set({ activeView: view }),

    topicPairs: initialTopicPairs,
    activePairId: initialActivePairId,
    setActivePairId: (pairId) => {
      localStorage.setItem('gate_active_pair_id', pairId);
      // Reset checklist for new pair view
      const resetChecklist: DailyPairChecklist = {
        date: getTodayDateString(),
        topicAChecked: false,
        topicAPyqs: 0,
        topicBChecked: false,
        topicBPyqs: 0,
        retentionChecked: false,
        notes: ''
      };
      localStorage.setItem('gate_daily_pair_checklist', JSON.stringify(resetChecklist));
      set({ activePairId: pairId, dailyPairChecklist: resetChecklist });
    },

    togglePairCompletion: (pairId) => set((state) => {
      const updated = state.topicPairs.map(p => {
        if (p.id !== pairId) return p;
        return { ...p, isCompleted: !p.isCompleted };
      });
      localStorage.setItem('gate_topic_pairs_mastery', JSON.stringify(updated));
      return { topicPairs: updated };
    }),

    setCustomPair: (customPair) => set((state) => {
      const exists = state.topicPairs.some(p => p.id === customPair.id);
      const updated = exists 
        ? state.topicPairs.map(p => p.id === customPair.id ? customPair : p)
        : [customPair, ...state.topicPairs];
      localStorage.setItem('gate_topic_pairs_mastery', JSON.stringify(updated));
      localStorage.setItem('gate_active_pair_id', customPair.id);
      return { topicPairs: updated, activePairId: customPair.id };
    }),

    activeDayNumber: initialActiveDay,
    setActiveDayNumber: (dayNumber) => {
      localStorage.setItem('gate_active_day', dayNumber.toString());
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
      localStorage.setItem('gate_subjects_mastery', JSON.stringify(updated));
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
      localStorage.setItem('gate_subjects_mastery', JSON.stringify(updated));
      return { subjects: updated };
    }),

    dailyPairChecklist: initialDailyPair,
    updateDailyPairChecklist: (patch) => set((state) => {
      const updatedChecklist = { ...state.dailyPairChecklist, ...patch };
      localStorage.setItem('gate_daily_pair_checklist', JSON.stringify(updatedChecklist));

      // Find current active pair
      const curPair = state.topicPairs.find(p => p.id === state.activePairId) || state.topicPairs[0];
      const targetA = state.isMvdMode ? 5 : 10;
      const targetB = state.isMvdMode ? 5 : 10;
      const isPairComplete = updatedChecklist.topicAChecked && 
                             updatedChecklist.topicAPyqs >= targetA &&
                             updatedChecklist.topicBChecked && 
                             updatedChecklist.topicBPyqs >= targetB &&
                             updatedChecklist.retentionChecked;

      // Update pair completion
      const updatedTopicPairs = state.topicPairs.map(p => {
        if (p.id !== curPair.id) return p;
        return { ...p, isCompleted: isPairComplete };
      });
      localStorage.setItem('gate_topic_pairs_mastery', JSON.stringify(updatedTopicPairs));

      // Sync progress into syllabus subjects
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
        localStorage.setItem('gate_subjects_mastery', JSON.stringify(updatedSubjects));
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
      localStorage.setItem('gate_today_checklist', JSON.stringify(updated));
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
      localStorage.setItem('gate_day_plans', JSON.stringify(updated));
      return { dayPlans: updated };
    }),

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
