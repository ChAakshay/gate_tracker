import { useProgressStore } from './useProgressStore';
import { TargetQuest, ErrorLogEntry, Question } from '../types/gate';

// 🔗 UNIFIED STORE ARCHITECTURE
// Bridges legacy GateStore callers to the master useProgressStore single source of truth
export const useGateStore = () => {
  const store = useProgressStore();

  return {
    // Navigation mapping
    activeTab: (store.activeView === 'cbt' ? 'cbt' : store.activeView === 'pyq' ? 'pyq' : 'dashboard') as 'dashboard' | 'pyq' | 'cbt' | 'calculator' | 'errorlog' | 'roadmap',
    setActiveTab: (tab: 'dashboard' | 'pyq' | 'cbt' | 'calculator' | 'errorlog' | 'roadmap') => {
      if (tab === 'cbt' || tab === 'pyq') {
        store.setActiveView(tab);
      } else if (tab === 'roadmap') {
        store.setActiveView('roadmap');
      } else if (tab === 'errorlog') {
        store.setActiveView('errors');
      } else {
        store.setActiveView('today');
      }
    },

    // Daily quest synthesis
    todayQuest: {
      date: new Date().toISOString().split('T')[0],
      theoryCompleted: store.dailyPairChecklist.topicAChecked && store.dailyPairChecklist.topicBChecked,
      pyqsCompletedCount: store.dailyPairChecklist.topicAPyqs + store.dailyPairChecklist.topicBPyqs,
      retentionCompleted: store.dailyPairChecklist.retentionChecked,
      status: (store.dailyPairChecklist.topicAChecked && store.dailyPairChecklist.topicBChecked) ? 'completed' : 'pending'
    } as TargetQuest,
    streak: store.streak,
    updateTodayQuest: (partial: Partial<TargetQuest>) => {
      store.updateDailyPairChecklist({
        topicAChecked: partial.theoryCompleted ?? store.dailyPairChecklist.topicAChecked,
        topicAPyqs: partial.pyqsCompletedCount ?? store.dailyPairChecklist.topicAPyqs,
        retentionChecked: partial.retentionCompleted ?? store.dailyPairChecklist.retentionChecked
      });
    },

    // Question Bank & Responses
    questions: store.questions,
    currentQuestionIndex: store.currentQuestionIndex,
    setCurrentQuestionIndex: store.setCurrentQuestionIndex,
    userResponses: store.userResponses,
    recordResponse: store.recordResponse,

    // Error Logs
    errorLogs: [] as ErrorLogEntry[],
    addErrorLog: (_entry: ErrorLogEntry) => {
      // Handled via ErrorLogTracker
    },

    // Floating Calculator Toggle
    isCalcOpen: store.isCalcOpen,
    toggleCalc: store.toggleCalc,
  };
};

export default useGateStore;
