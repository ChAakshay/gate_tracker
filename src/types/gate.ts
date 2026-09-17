export type QuestionType = "MCQ" | "MSQ" | "NAT";
export type QuestionStatus = "unseen" | "answered" | "not_answered" | "marked_for_review" | "answered_marked_for_review";
export type QuestionTier = 1 | 2 | 3; // 1: Trivial, 2: Standard, 3: Heavy Duty

export interface Question {
  id: string;
  type: QuestionType;
  subjectId: string;
  topicId: string;
  year: number;
  marks: 1 | 2;
  tier: QuestionTier;
  textMarkdown: string; // KaTeX enabled markdown
  options?: { id: string; textMarkdown: string; isCorrect: boolean }[]; // for MCQ/MSQ
  correctRange?: { min: number; max: number }; // for NAT
  solutionMarkdown: string;
}

export interface ExamState {
  currentQuestionId: string;
  startTime: number;
  timeRemainingMs: number;
  questionStatuses: Record<string, QuestionStatus>;
  responses: Record<string, string | string[]>; // Answer ID(s) or NAT value
  timeSpentPerQuestionMs: Record<string, number>;
}

export interface TargetQuest {
  date: string; // YYYY-MM-DD
  theoryCompleted: boolean;
  pyqsCompletedCount: number;
  retentionCompleted: boolean; // short notes + error log
  status: "pending" | "partial" | "completed";
}

export interface ErrorLogEntry {
  questionId: string;
  date: string;
  errorType: "conceptual" | "calculation" | "reading" | "formula";
  threeLineSummary: string;
}
