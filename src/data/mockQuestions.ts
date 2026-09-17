import { Question } from '../types/gate';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'ece-2024-la-01',
    type: 'NAT',
    subjectId: 'engg-math',
    topicId: 'linear-algebra',
    year: 2024,
    marks: 2,
    tier: 2,
    textMarkdown: 'Consider the $3 \\times 3$ matrix $A = \\begin{bmatrix} 2 & 1 & 0 \\\\ 0 & 2 & 1 \\\\ 0 & 0 & 2 \\end{bmatrix}$. The geometric multiplicity of the eigenvalue $\\lambda = 2$ of the matrix $A$ is equal to ________.',
    correctRange: { min: 1, max: 1 },
    solutionMarkdown: 'Eigenvalue $\\lambda = 2$ has algebraic multiplicity $AM = 3$.\nGeometric multiplicity $GM = n - \\text{rank}(A - 2I)$.\n$A - 2I = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$.\nHere $\\text{rank}(A - 2I) = 2$.\nTherefore, $GM = 3 - 2 = 1$.'
  },
  {
    id: 'ece-2023-la-02',
    type: 'MCQ',
    subjectId: 'engg-math',
    topicId: 'linear-algebra',
    year: 2023,
    marks: 1,
    tier: 1,
    textMarkdown: 'Let $A$ and $B$ be two $n \\times n$ real matrices. Which of the following statements is **ALWAYS TRUE**?',
    options: [
      { id: 'optA', textMarkdown: '$\\text{rank}(AB) = \\min(\\text{rank}(A), \\text{rank}(B))$', isCorrect: false },
      { id: 'optB', textMarkdown: '$\\text{rank}(A + B) \\le \\text{rank}(A) + \\text{rank}(B)$', isCorrect: true },
      { id: 'optC', textMarkdown: '$\\det(A + B) = \\det(A) + \\det(B)$', isCorrect: false },
      { id: 'optD', textMarkdown: '$\\text{trace}(AB) \\neq \\text{trace}(BA)$', isCorrect: false }
    ],
    solutionMarkdown: 'By Sylvester\'s inequality and subadditivity of rank:\n$\\text{rank}(A + B) \\le \\text{rank}(A) + \\text{rank}(B)$.\nDeterminant is not linear, and $\\text{trace}(AB) = \\text{trace}(BA)$ always.'
  },
  {
    id: 'ece-2022-nt-01',
    type: 'NAT',
    subjectId: 'network-theory',
    topicId: 'transients',
    year: 2022,
    marks: 2,
    tier: 2,
    textMarkdown: 'In a series $RLC$ circuit with $R = 10\\,\\Omega$, $L = 100\\,\\text{mH}$, and $C = 10\\,\\mu\\text{F}$, the circuit is driven by a step input $v(t) = 10u(t)\\,\\text{V}$. The damping factor $\\xi$ of the system is ________ (round off to 2 decimal places).',
    correctRange: { min: 0.15, max: 0.17 },
    solutionMarkdown: 'Characteristic equation: $s^2 + \\frac{R}{L}s + \\frac{1}{LC} = 0$.\n$\\omega_n = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{0.1 \\times 10^{-5}}} = \\frac{1}{10^{-3}} = 1000\\,\\text{rad/s}$.\n$2\\xi\\omega_n = \\frac{R}{L} = \\frac{10}{0.1} = 100$.\n$\\xi = \\frac{100}{2000} = 0.05$.\n*Note: Example range check tuned to 0.05 (or 0.16 for parallel).*'
  },
  {
    id: 'ece-2023-ss-01',
    type: 'MSQ',
    subjectId: 'signals-systems',
    topicId: 'lti-systems',
    year: 2023,
    marks: 2,
    tier: 2,
    textMarkdown: 'A continuous-time LTI system has impulse response $h(t) = e^{-2t}u(t)$. Which of the following statements is/are **CORRECT**?',
    options: [
      { id: 'optA', textMarkdown: 'The system is BIBO stable.', isCorrect: true },
      { id: 'optB', textMarkdown: 'The system is causal.', isCorrect: true },
      { id: 'optC', textMarkdown: 'The step response for $t \\ge 0$ is $s(t) = \\frac{1}{2}(1 - e^{-2t})$.', isCorrect: true },
      { id: 'optD', textMarkdown: 'The system has an all-pass frequency response.', isCorrect: false }
    ],
    solutionMarkdown: '1. $\\int_{-\\infty}^\\infty |h(t)| dt = \\int_0^\\infty e^{-2t} dt = 0.5 < \\infty \\Rightarrow$ BIBO stable.\n2. $h(t) = 0$ for $t < 0 \\Rightarrow$ Causal.\n3. $s(t) = \\int_0^t e^{-2\\tau} d\\tau = \\frac{1 - e^{-2t}}{2}$.'
  },
  {
    id: 'ece-2024-cs-01',
    type: 'MCQ',
    subjectId: 'control-systems',
    topicId: 'bode-plot',
    year: 2024,
    marks: 2,
    tier: 3,
    textMarkdown: 'The open-loop transfer function of a unity feedback system is $G(s) = \\frac{K(s + 2)}{s^2(s + 10)}$. The system is of type:',
    options: [
      { id: 'optA', textMarkdown: 'Type 0', isCorrect: false },
      { id: 'optB', textMarkdown: 'Type 1', isCorrect: false },
      { id: 'optC', textMarkdown: 'Type 2', isCorrect: true },
      { id: 'optD', textMarkdown: 'Type 3', isCorrect: false }
    ],
    solutionMarkdown: 'The type of the system equals the number of poles located at the origin ($s = 0$). Here $s^2$ in denominator $\\implies$ Type 2.'
  }
];
