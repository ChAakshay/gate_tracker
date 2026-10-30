export interface BookReference {
  bookTitle: string;
  author: string;
  edition: string;
  chapters: string;
  pages: string;
  keyConcepts?: string[];
}

export interface SubTopic {
  id: string;
  name: string;
  marksWeight: number; // e.g. 1.5, 2, 3
  isHighYield: boolean;
  theoryCompleted: boolean;
  pyqsSolvedCount: number;
  targetPyqs: number;
  formulaCardAdded: boolean;
  errorLogged: boolean;
  notes?: string;
  isEmbeddedCore?: boolean;
  bookRef?: BookReference;
}

export interface SubjectModule {
  id: string;
  name: string;
  shortCode: string;
  totalMarksRange: string;
  targetMarks: number;
  priorityTier: 'Tier 1 (High Yield / Fast Marks)' | 'Tier 2 (Core Heavy Duty)' | 'Tier 3 (80/20 Selective)';
  phase: number; // 1, 2, 3
  color: string;
  topics: SubTopic[];
  examSection?: 'Test I' | 'Test II';
}

export interface TopicPairSlot {
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  topicId: string;
  topicName: string;
  marksWeight: number;
  targetPyqs: number;
  bookRef: BookReference;
  theoryCompleted?: boolean;
  pyqsSolvedCount?: number;
}

export interface TopicPair {
  id: string; // e.g. 'pair-1'
  pairNumber: number;
  title: string;
  archetype: 'Hardware Core' | 'System & Signal' | 'Speed & Accuracy' | 'Logic & Physics' | 'Custom Mix';
  synergyRationale: string;
  topicA: TopicPairSlot;
  topicB: TopicPairSlot;
  combinedMarks: number;
  estMinutes: number;
  isCompleted: boolean;
}

export interface DayPlan {
  dayNumber: number; // 1 to 126
  weekNumber: number; // 1 to 18
  subjectId: string;
  topicTitle: string;
  targetMarksValue: number;
  theoryTarget: string;
  pyqTargetCount: number;
  retentionFocus: string;
  isCompleted: boolean;
  isMvd: boolean;
}

export interface ProgressSummary {
  totalTargetMarks: number;
  marksSecured: number;
  totalTopicsCount: number;
  completedTopicsCount: number;
  totalPyqsSolved: number;
  streakDays: number;
}
