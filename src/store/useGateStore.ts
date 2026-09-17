import { create } from 'zustand';
import { TargetQuest, ErrorLogEntry, Question } from '../types/gate';
import { INITIAL_QUESTIONS } from '../data/mockQuestions';

interface GateState {
  // Navigation
  activeTab: 'dashboard' | 'pyq' | 'cbt' | 'calculator' | 'errorlog' | 'roadmap';
  setActiveTab: (tab: 'dashboard' | 'pyq' | 'cbt' | 'calculator' | 'errorlog' | 'roadmap') => void;

  // Daily Quests
  todayQuest: TargetQuest;
  streak: number;
  updateTodayQuest: (quest: Partial<TargetQuest>) => void;

  // Question Bank & Responses
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  userResponses: Record<string, string | string[]>;
  recordResponse: (questionId: string, answer: string | string[]) => void;

  // Error Log Entries (3-line summary rule)
  errorLogs: ErrorLogEntry[];
  addErrorLog: (entry: ErrorLogEntry) => void;

  // Calculator Floating Widget Toggle
  isCalcOpen: boolean;
  toggleCalc: () => void;
}

const getTodayString = () => new Date().toISOString().split('T')[0];

export const useGateStore = create<GateState>((set) => {
  // Load initial from localStorage if present
  const storedQuest = localStorage.getItem('gate_today_quest');
  const storedStreak = localStorage.getItem('gate_streak');
  const storedErrorLogs = localStorage.getItem('gate_error_logs');

  const initialQuest: TargetQuest = storedQuest ? JSON.parse(storedQuest) : {
    date: getTodayString(),
    theoryCompleted: false,
    pyqsCompletedCount: 0,
    retentionCompleted: false,
    status: 'pending'
  };

  return {
    activeTab: 'dashboard',
    setActiveTab: (activeTab) => set({ activeTab }),

    todayQuest: initialQuest,
    streak: storedStreak ? parseInt(storedStreak, 10) : 4,
    
    updateTodayQuest: (partial) => set((state) => {
      const updated = { ...state.todayQuest, ...partial };
      // Check completion
      if (updated.theoryCompleted && updated.pyqsCompletedCount >= 15 && updated.retentionCompleted) {
        updated.status = 'completed';
      } else if (updated.theoryCompleted || updated.pyqsCompletedCount > 0 || updated.retentionCompleted) {
        updated.status = 'partial';
      }
      localStorage.setItem('gate_today_quest', JSON.stringify(updated));
      return { todayQuest: updated };
    }),

    questions: INITIAL_QUESTIONS,
    currentQuestionIndex: 0,
    setCurrentQuestionIndex: (idx) => set({ currentQuestionIndex: idx }),
    userResponses: {},
    recordResponse: (qId, ans) => set((state) => ({
      userResponses: { ...state.userResponses, [qId]: ans }
    })),

    errorLogs: storedErrorLogs ? JSON.parse(storedErrorLogs) : [
      {
        questionId: 'ece-2024-la-01',
        date: '2026-08-24',
        errorType: 'conceptual',
        threeLineSummary: '1. Misunderstood GM as AM.\n2. Forgot that GM = n - rank(A - λI).\n3. Re-verify Jordan blocks and geometric nullity.'
      }
    ],
    addErrorLog: (entry) => set((state) => {
      const updated = [entry, ...state.errorLogs];
      localStorage.setItem('gate_error_logs', JSON.stringify(updated));
      return { errorLogs: updated };
    }),

    isCalcOpen: false,
    toggleCalc: () => set((state) => ({ isCalcOpen: !state.isCalcOpen })),
  };
});
