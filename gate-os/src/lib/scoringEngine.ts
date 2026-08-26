import { Question } from '../types/gate';

export interface ScoreResult {
  isCorrect: boolean;
  marksAwarded: number;
  marksDeducted: number;
  netScore: number;
}

const EPSILON = 1e-9; // Tolerance for floating point exactness if needed, though GATE provides explicit min/max ranges

export const evaluateAnswer = (question: Question, userResponse: string | string[] | null | undefined): ScoreResult => {
  // Unanswered
  if (!userResponse || (Array.isArray(userResponse) && userResponse.length === 0)) {
    return { isCorrect: false, marksAwarded: 0, marksDeducted: 0, netScore: 0 };
  }

  const { type, marks } = question;

  if (type === 'MCQ') {
    if (typeof userResponse !== 'string') throw new Error("MCQ response must be a single string ID");
    const correctOption = question.options?.find(o => o.isCorrect);
    
    if (userResponse === correctOption?.id) {
      return { isCorrect: true, marksAwarded: marks, marksDeducted: 0, netScore: marks };
    } else {
      const penalty = marks === 1 ? (1/3) : (2/3);
      // Floating point safe rounding for penalty
      const safePenalty = Number(penalty.toFixed(4));
      return { isCorrect: false, marksAwarded: 0, marksDeducted: safePenalty, netScore: -safePenalty };
    }
  }

  if (type === 'MSQ') {
    if (!Array.isArray(userResponse)) throw new Error("MSQ response must be an array of string IDs");
    const correctOptions = question.options?.filter(o => o.isCorrect).map(o => o.id) || [];
    
    // Exact match required. No partial marking. No negative marking.
    const isExactMatch = correctOptions.length === userResponse.length && 
                         correctOptions.every(id => userResponse.includes(id));
    
    if (isExactMatch) {
      return { isCorrect: true, marksAwarded: marks, marksDeducted: 0, netScore: marks };
    } else {
      return { isCorrect: false, marksAwarded: 0, marksDeducted: 0, netScore: 0 };
    }
  }

  if (type === 'NAT') {
    if (typeof userResponse !== 'string') throw new Error("NAT response must be a string representing a number");
    const numValue = parseFloat(userResponse);
    if (isNaN(numValue)) return { isCorrect: false, marksAwarded: 0, marksDeducted: 0, netScore: 0 };
    
    if (!question.correctRange) throw new Error("NAT question missing correctRange");
    
    // Inclusive range check. GATE NAT evaluates against a [min, max] bound.
    const { min, max } = question.correctRange;
    if (numValue >= min - EPSILON && numValue <= max + EPSILON) {
      return { isCorrect: true, marksAwarded: marks, marksDeducted: 0, netScore: marks };
    } else {
      return { isCorrect: false, marksAwarded: 0, marksDeducted: 0, netScore: 0 };
    }
  }

  throw new Error(`Unknown question type: ${type}`);
};

export const calculateTotalScore = (questions: Question[], responses: Record<string, string | string[]>) => {
  let totalAttempted = 0;
  let correctAttempts = 0;
  let rawScore = 0;
  
  questions.forEach(q => {
    const response = responses[q.id];
    if (response) {
      totalAttempted++;
      const res = evaluateAnswer(q, response);
      if (res.isCorrect) correctAttempts++;
      rawScore += res.netScore;
    }
  });

  return {
    totalAttempted,
    correctAttempts,
    accuracy: totalAttempted > 0 ? (correctAttempts / totalAttempted) * 100 : 0,
    rawScore: Number(rawScore.toFixed(2)) // Round to 2 decimal places typical in GATE scorecards
  };
};
