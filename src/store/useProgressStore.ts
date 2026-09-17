import { create } from 'zustand';
import { SubjectModule, DayPlan } from '../types/progress';
import { GATE_ECE_SUBJECTS, INITIAL_DAY_PLANS } from '../data/syllabusData';

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
  activeView: 'today' | 'syllabus' | 'formula' | 'roadmap' | 'errors';
  setActiveView: (view: 'today' | 'syllabus' | 'formula' | 'roadmap' | 'errors') => void;

  // Active 18-Week Day Selection
  activeDayNumber: number;
  setActiveDayNumber: (day: number) => void;

  // Subjects & Topics
  subjects: SubjectModule[];
  toggleTopicField: (subjectId: string, topicId: string, field: 'theoryCompleted' | 'formulaCardAdded' | 'errorLogged') => void;
  updateTopicPyqCount: (subjectId: string, topicId: string, count: number) => void;

  // Daily Essentials
  todayChecklist: DailyChecklist;
  updateTodayChecklist: (patch: Partial<DailyChecklist>) => void;
  isMvdMode: boolean;
  toggleMvdMode: () => void;
  streak: number;

  // Day-by-day Roadmap Plans
  dayPlans: DayPlan[];
  toggleDayCompletion: (dayNumber: number) => void;

  // Computed Metrics
  getSecuredMarks: () => number;
  getTotalTargetMarks: () => number;
  getCompletedTopicsCount: () => number;
  getTotalTopicsCount: () => number;
}

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const useProgressStore = create<ProgressStore>((set, get) => {
  // Load saved state from localStorage
  const storedSubjects = localStorage.getItem('gate_subjects_mastery');
  const storedDayPlans = localStorage.getItem('gate_day_plans');
  const storedDaily = localStorage.getItem('gate_today_checklist');
  const storedStreak = localStorage.getItem('gate_user_streak');
  const storedActiveDay = localStorage.getItem('gate_active_day');

  const initialSubjects: SubjectModule[] = storedSubjects ? JSON.parse(storedSubjects) : GATE_ECE_SUBJECTS;
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

    todayChecklist: initialDaily,
    updateTodayChecklist: (patch) => set((state) => {
      const updated = { ...state.todayChecklist, ...patch };
      localStorage.setItem('gate_today_checklist', JSON.stringify(updated));

      // 🔗 SYNC WITH 18-WEEK ROADMAP & TOPIC MASTERY TRACKER
      const curDay = state.dayPlans.find(d => d.dayNumber === state.activeDayNumber);
      const isComplete = updated.theoryChecked && (updated.pyqsCount >= (state.isMvdMode ? 5 : (curDay?.pyqTargetCount || 20))) && updated.retentionChecked;

      // Update active day completion in roadmap
      const updatedDayPlans = state.dayPlans.map(d => {
        if (d.dayNumber !== state.activeDayNumber) return d;
        return { ...d, isCompleted: isComplete };
      });
      localStorage.setItem('gate_day_plans', JSON.stringify(updatedDayPlans));

      // Update topic mastery tracker for the subject associated with this day
      let updatedSubjects = state.subjects;
      if (curDay) {
        updatedSubjects = state.subjects.map(sub => {
          if (sub.id !== curDay.subjectId) return sub;
          return {
            ...sub,
            topics: sub.topics.map((t, idx) => {
              // Match first active topic of the subject for this day
              if (idx === 0 || t.name.toLowerCase().includes(curDay.topicTitle.toLowerCase().split(':')[1]?.trim() || '')) {
                return {
                  ...t,
                  theoryCompleted: updated.theoryChecked ? true : t.theoryCompleted,
                  pyqsSolvedCount: Math.max(t.pyqsSolvedCount, updated.pyqsCount),
                  formulaCardAdded: updated.retentionChecked ? true : t.formulaCardAdded
                };
              }
              return t;
            })
          };
        });
        localStorage.setItem('gate_subjects_mastery', JSON.stringify(updatedSubjects));
      }

      return { 
        todayChecklist: updated,
        dayPlans: updatedDayPlans,
        subjects: updatedSubjects
      };
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
    }
  };
});
