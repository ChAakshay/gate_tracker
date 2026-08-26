import { describe, it, expect } from 'vitest';
import { evaluateAnswer } from './scoringEngine';
import { Question } from '../types/gate';

describe('GATE Scoring Engine Rules', () => {
  it('1-mark MCQ correct = +1', () => {
    const q: Question = {
      id: '1', type: 'MCQ', subjectId: 'A', topicId: 'B', year: 2026, marks: 1, tier: 1, textMarkdown: '', solutionMarkdown: '',
      options: [{ id: 'optA', textMarkdown: 'A', isCorrect: true }, { id: 'optB', textMarkdown: 'B', isCorrect: false }]
    };
    const res = evaluateAnswer(q, 'optA');
    expect(res.isCorrect).toBe(true);
    expect(res.netScore).toBe(1);
  });

  it('1-mark MCQ incorrect = -0.33', () => {
    const q: Question = {
      id: '1', type: 'MCQ', subjectId: 'A', topicId: 'B', year: 2026, marks: 1, tier: 1, textMarkdown: '', solutionMarkdown: '',
      options: [{ id: 'optA', textMarkdown: 'A', isCorrect: true }, { id: 'optB', textMarkdown: 'B', isCorrect: false }]
    };
    const res = evaluateAnswer(q, 'optB');
    expect(res.isCorrect).toBe(false);
    expect(res.netScore).toBeCloseTo(-0.3333, 3);
  });

  it('2-mark MCQ incorrect = -0.66', () => {
    const q: Question = {
      id: '2', type: 'MCQ', subjectId: 'A', topicId: 'B', year: 2026, marks: 2, tier: 2, textMarkdown: '', solutionMarkdown: '',
      options: [{ id: 'optA', textMarkdown: 'A', isCorrect: true }, { id: 'optB', textMarkdown: 'B', isCorrect: false }]
    };
    const res = evaluateAnswer(q, 'optB');
    expect(res.isCorrect).toBe(false);
    expect(res.netScore).toBeCloseTo(-0.6667, 3);
  });

  it('MSQ partial correct = 0 marks (No negative)', () => {
    const q: Question = {
      id: '3', type: 'MSQ', subjectId: 'A', topicId: 'B', year: 2026, marks: 2, tier: 2, textMarkdown: '', solutionMarkdown: '',
      options: [
        { id: 'A', textMarkdown: 'A', isCorrect: true }, 
        { id: 'B', textMarkdown: 'B', isCorrect: true },
        { id: 'C', textMarkdown: 'C', isCorrect: false }
      ]
    };
    const res = evaluateAnswer(q, ['A']); // partial
    expect(res.isCorrect).toBe(false);
    expect(res.netScore).toBe(0);
  });

  it('MSQ exact correct = +2 marks', () => {
    const q: Question = {
      id: '4', type: 'MSQ', subjectId: 'A', topicId: 'B', year: 2026, marks: 2, tier: 2, textMarkdown: '', solutionMarkdown: '',
      options: [
        { id: 'A', textMarkdown: 'A', isCorrect: true }, 
        { id: 'B', textMarkdown: 'B', isCorrect: true },
        { id: 'C', textMarkdown: 'C', isCorrect: false }
      ]
    };
    const res = evaluateAnswer(q, ['A', 'B']); // Exact
    expect(res.isCorrect).toBe(true);
    expect(res.netScore).toBe(2);
  });

  it('NAT within range = +2 marks', () => {
    const q: Question = {
      id: '5', type: 'NAT', subjectId: 'A', topicId: 'B', year: 2026, marks: 2, tier: 2, textMarkdown: '', solutionMarkdown: '',
      correctRange: { min: 2.14, max: 2.16 }
    };
    const res = evaluateAnswer(q, '2.15');
    expect(res.isCorrect).toBe(true);
    expect(res.netScore).toBe(2);
  });

  it('NAT outside range = 0 marks (No negative)', () => {
    const q: Question = {
      id: '6', type: 'NAT', subjectId: 'A', topicId: 'B', year: 2026, marks: 2, tier: 2, textMarkdown: '', solutionMarkdown: '',
      correctRange: { min: 2.14, max: 2.16 }
    };
    const res = evaluateAnswer(q, '2.17');
    expect(res.isCorrect).toBe(false);
    expect(res.netScore).toBe(0);
  });
});
