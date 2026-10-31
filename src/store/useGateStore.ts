import { useProgressStore } from './useProgressStore';
import { TargetQuest, ErrorLogEntry, Question } from '../types/gate';

// 🔗 UNIFIED STORE ARCHITECTURE
// Bridges legacy GateStore callers to the master useProgressStore single source of truth
export const useGateStore = () => {
  const store = useProgressStore();

  const curPair = store.topicPairs.find(p => p.id === store.activePairId) || store.topicPairs[0];
  const subA = store.subjects.find(s => s.id === curPair.topicA.subjectId);
  const topA = subA?.topics.find(t => t.id === curPair.topicA.topicId);
  const subB = store.subjects.find(s => s.id === curPair.topicB.subjectId);
  const topB = subB?.topics.find(t => t.id === curPair.topicB.topicId);

  const isTheory = !!(topA?.theoryCompleted && topB?.theoryCompleted);
  const totalPyqs = (topA?.pyqsSolvedCount || 0) + (topB?.pyqsSolvedCount || 0);
  const isRet = !!(topA?.formulaCardAdded && topB?.formulaCardAdded) || store.dailyPairChecklist.retentionChecked;

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

    // Daily quest synthesis (live computed from master subjects)
    todayQuest: {
      date: new Date().toISOString().split('T')[0],
      theoryCompleted: isTheory,
      pyqsCompletedCount: totalPyqs,
      retentionCompleted: isRet,
      status: (isTheory && totalPyqs >= 20) ? 'completed' : isTheory ? 'partial' : 'pending'
    } as TargetQuest,
    streak: store.streak,
    updateTodayQuest: (partial: Partial<TargetQuest>) => {
      if (partial.retentionCompleted !== undefined) {
        store.updateDailyPairChecklist({ retentionChecked: partial.retentionCompleted });
      }
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
