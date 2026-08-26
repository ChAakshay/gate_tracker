import { SubjectModule, DayPlan } from '../types/progress';

export const GATE_ECE_SUBJECTS: SubjectModule[] = [
  {
    id: 'math',
    name: 'Engineering Mathematics',
    shortCode: 'EM',
    totalMarksRange: '13 Marks',
    targetMarks: 13,
    priorityTier: 'Tier 1 (High Yield / Fast Marks)',
    phase: 1,
    color: '#3b82f6',
    topics: [
      { id: 'math-la-eigen', name: 'Eigenvalues, Eigenvectors & Cayley-Hamilton', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'math-la-rank', name: 'Rank, Determinants & System of Linear Equations', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'math-la-basis', name: 'Vector Spaces, Basis, Dimension & LU Decomposition', marksWeight: 1.5, isHighYield: false, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
      { id: 'math-calc-diff', name: 'Limits, Continuity, Maxima-Minima & Mean Value Theorems', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'math-calc-vec', name: 'Vector Calculus: Gradient, Divergence, Curl, Green/Stokes/Gauss', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'math-de', name: 'Differential Equations (Higher Order & Cauchy-Euler)', marksWeight: 1.5, isHighYield: false, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
      { id: 'math-complex', name: 'Complex Analysis: Cauchy-Riemann & Residue Theorem', marksWeight: 1.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
    ]
  },
  {
    id: 'aptitude',
    name: 'General Aptitude',
    shortCode: 'GA',
    totalMarksRange: '15 Marks',
    targetMarks: 15,
    priorityTier: 'Tier 1 (High Yield / Fast Marks)',
    phase: 1,
    color: '#10b981',
    topics: [
      { id: 'apt-quant-arith', name: 'Quantitative: Ratio, Percentage, Time & Work, Speed-Distance', marksWeight: 4.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 30, formulaCardAdded: false, errorLogged: false },
      { id: 'apt-quant-geo', name: 'Geometry, Mensuration & Elementary Statistics', marksWeight: 3.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'apt-spatial', name: 'Spatial Aptitude: Paper Folding, Mirroring & Rotations', marksWeight: 3.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'apt-verbal', name: 'Verbal: Grammar, Vocabulary, Critical Reasoning & Reading Comprehension', marksWeight: 5.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 30, formulaCardAdded: false, errorLogged: false },
    ]
  },
  {
    id: 'networks',
    name: 'Network Theory',
    shortCode: 'NT',
    totalMarksRange: '8 – 10 Marks',
    targetMarks: 9,
    priorityTier: 'Tier 1 (High Yield / Fast Marks)',
    phase: 1,
    color: '#8b5cf6',
    topics: [
      { id: 'nt-basics', name: 'KCL, KVL, Nodal/Mesh & Source Transformations', marksWeight: 1.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'nt-theorems', name: 'Network Theorems (Thevenin, Norton, Max Power, Superposition)', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'nt-transients', name: 'Transient Analysis in First & Second Order Circuits (RL, RC, RLC)', marksWeight: 3.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 30, formulaCardAdded: false, errorLogged: false },
      { id: 'nt-ac', name: 'Sinusoidal Steady State, Phasors & Resonance (Series/Parallel)', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'nt-twoport', name: 'Two-Port Network Parameters (z, y, h, ABCD) & Interconnections', marksWeight: 1.5, isHighYield: false, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
    ]
  },
  {
    id: 'signals',
    name: 'Signals & Systems',
    shortCode: 'SS',
    totalMarksRange: '7 – 9 Marks',
    targetMarks: 8,
    priorityTier: 'Tier 1 (High Yield / Fast Marks)',
    phase: 1,
    color: '#ec4899',
    topics: [
      { id: 'ss-basics', name: 'Signal Properties, Continuous & Discrete Time Transformations', marksWeight: 1.5, isHighYield: false, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
      { id: 'ss-lti', name: 'LTI Systems: Convolution Integral/Sum, Stability & Causality', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'ss-fourier', name: 'Continuous & Discrete Fourier Series / Transforms (CTFT, DTFT, DFT)', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'ss-transforms', name: 'Laplace Transform, Z-Transform & ROC Properties', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'ss-sampling', name: 'Sampling Theorem, Nyquist Rate & Reconstruction', marksWeight: 1.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
    ]
  },
  {
    id: 'control',
    name: 'Control Systems',
    shortCode: 'CS',
    totalMarksRange: '8 – 9 Marks',
    targetMarks: 8,
    priorityTier: 'Tier 2 (Core Heavy Duty)',
    phase: 2,
    color: '#06b6d4',
    topics: [
      { id: 'cs-block', name: 'Transfer Function, Block Reduction & Signal Flow Graph (Mason)', marksWeight: 1.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
      { id: 'cs-time', name: 'Time Response Analysis: 1st/2nd Order, Peak Overshoot, Settling Time', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'cs-routh-root', name: 'Routh-Hurwitz Stability Criterion & Root Locus Techniques', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'cs-freq', name: 'Frequency Domain: Bode Plots, Nyquist Stability & Gain/Phase Margin', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'cs-state', name: 'State Space Analysis: Controllability, Observability & State Transition', marksWeight: 1.5, isHighYield: false, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
    ]
  },
  {
    id: 'digital',
    name: 'Digital Circuits',
    shortCode: 'DC',
    totalMarksRange: '7 – 8 Marks',
    targetMarks: 7.5,
    priorityTier: 'Tier 2 (Core Heavy Duty)',
    phase: 2,
    color: '#f59e0b',
    topics: [
      { id: 'dc-bool', name: 'Boolean Algebra, Logic Gates & K-Maps Minimization', marksWeight: 1.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
      { id: 'dc-comb', name: 'Combinational Circuits: MUX, Decoders, Adders & Encoders', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'dc-seq', name: 'Sequential Circuits: Latches, Flip-Flops, Setup/Hold Time', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'dc-counters', name: 'Synchronous & Asynchronous Counters, Shift Registers & FSM', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
    ]
  },
  {
    id: 'analog',
    name: 'Analog Circuits',
    shortCode: 'AC',
    totalMarksRange: '8 – 9 Marks',
    targetMarks: 8.5,
    priorityTier: 'Tier 2 (Core Heavy Duty)',
    phase: 2,
    color: '#e11d48',
    topics: [
      { id: 'ac-diodes', name: 'Diode Circuits: Clippers, Clampers, Rectifiers & Zener Regulators', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'ac-bjt-mosfet', name: 'BJT & MOSFET Biasing, Small Signal Amplifiers & AC Analysis', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'ac-opamp', name: 'Operational Amplifiers: Linear & Non-linear Applications, Schmitt Trigger', marksWeight: 3.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 30, formulaCardAdded: false, errorLogged: false },
      { id: 'ac-feedback', name: 'Feedback Amplifiers, Oscillators & 555 Timers', marksWeight: 1.5, isHighYield: false, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
    ]
  },
  {
    id: 'edc',
    name: 'Electronic Devices (EDC)',
    shortCode: 'EDC',
    totalMarksRange: '8 – 9 Marks',
    targetMarks: 8.5,
    priorityTier: 'Tier 3 (80/20 Selective)',
    phase: 3,
    color: '#84cc16',
    topics: [
      { id: 'edc-semi', name: 'Semiconductor Physics: Carrier Transport, Drift/Diffusion, Einstein Relation', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
      { id: 'edc-pn', name: 'PN Junction Diode: Depletion Width, Capacitances (CT, CD) & Breakdown', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'edc-mos', name: 'MOSFET Physics: MOS Capacitor, Accumulation/Inversion, Threshold Voltage', marksWeight: 3.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 30, formulaCardAdded: false, errorLogged: false },
    ]
  },
  {
    id: 'comm',
    name: 'Communications',
    shortCode: 'COMM',
    totalMarksRange: '9 – 10 Marks',
    targetMarks: 9,
    priorityTier: 'Tier 3 (80/20 Selective)',
    phase: 3,
    color: '#6366f1',
    topics: [
      { id: 'comm-analog', name: 'Analog Modulation: AM, DSB-SC, SSB, FM & Carson Rule', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'comm-random', name: 'Random Processes: Autocorrelation, PSD, White Noise, Filter Response', marksWeight: 2.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 25, formulaCardAdded: false, errorLogged: false },
      { id: 'comm-digital', name: 'Digital Comm: PCM, DPCM, Matched Filter, BER of BPSK/QPSK', marksWeight: 3.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 30, formulaCardAdded: false, errorLogged: false },
      { id: 'comm-info', name: 'Information Theory: Entropy, Mutual Information & Shannon Capacity', marksWeight: 1.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 15, formulaCardAdded: false, errorLogged: false },
    ]
  },
  {
    id: 'emtl',
    name: 'Selective Electromagnetics (EMTL)',
    shortCode: 'EMTL',
    totalMarksRange: '5 – 6 Marks (Selective)',
    targetMarks: 5.5,
    priorityTier: 'Tier 3 (80/20 Selective)',
    phase: 3,
    color: '#d97706',
    topics: [
      { id: 'emtl-tlines', name: 'Transmission Lines: Characteristic Impedance, SWR, Reflection & Smith Chart', marksWeight: 3.5, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 30, formulaCardAdded: false, errorLogged: false },
      { id: 'emtl-waves', name: 'Uniform Plane Waves: Poynting Vector, Polarization & Skin Depth', marksWeight: 2.0, isHighYield: true, theoryCompleted: false, pyqsSolvedCount: 0, targetPyqs: 20, formulaCardAdded: false, errorLogged: false },
    ]
  }
];

// Full Schedule Starting September 1, 2026 (Fresh Slate)
export const INITIAL_DAY_PLANS: DayPlan[] = [
  // WEEK 1: Linear Algebra & Verbal Aptitude (Sep 1 - Sep 7)
  { dayNumber: 1, weekNumber: 1, subjectId: 'math', topicTitle: 'Day 1: Matrix Algebra, Determinants & Trace Theorems', targetMarksValue: 1.0, theoryTarget: 'Properties of Det, Trace, Orthogonal & Hermitian Matrices', pyqTargetCount: 15, retentionFocus: 'Add 1-page formula card on Matrix operations', isCompleted: false, isMvd: false },
  { dayNumber: 2, weekNumber: 1, subjectId: 'math', topicTitle: 'Day 2: Rank, Nullity & Linear Independence', targetMarksValue: 1.5, theoryTarget: 'Row operations, Rank theorem, Subadditivity Rank(A+B)', pyqTargetCount: 18, retentionFocus: 'Log 3-line error summary on Rank traps', isCompleted: false, isMvd: false },
  { dayNumber: 3, weekNumber: 1, subjectId: 'math', topicTitle: 'Day 3: System of Equations & Augmented Matrices', targetMarksValue: 1.5, theoryTarget: 'Homogeneous & Non-homogeneous, Unique/Infinite/No solution', pyqTargetCount: 20, retentionFocus: 'Create consistency conditions flowchart', isCompleted: false, isMvd: false },
  { dayNumber: 4, weekNumber: 1, subjectId: 'math', topicTitle: 'Day 4: Eigenvalues & Cayley-Hamilton Theorem', targetMarksValue: 2.0, theoryTarget: 'Characteristic Eq, Cayley-Hamilton inverse & high power matrix', pyqTargetCount: 20, retentionFocus: 'Practice 5 rapid Cayley-Hamilton short-cuts', isCompleted: false, isMvd: false },
  { dayNumber: 5, weekNumber: 1, subjectId: 'math', topicTitle: 'Day 5: Geometric vs Algebraic Multiplicity & Diagonalization', targetMarksValue: 2.0, theoryTarget: 'GM = n - rank(A - λI), Jordan canonical forms', pyqTargetCount: 18, retentionFocus: 'Log GM vs AM misconceptions into Error Log', isCompleted: false, isMvd: false },
  { dayNumber: 6, weekNumber: 1, subjectId: 'aptitude', topicTitle: 'Day 6: General Aptitude - Verbal & Reading Comprehension', targetMarksValue: 2.0, theoryTarget: 'Grammar rules, Subject-verb agreement, Critical reasoning', pyqTargetCount: 25, retentionFocus: 'Identify recurring verbal trap patterns', isCompleted: false, isMvd: false },
  { dayNumber: 7, weekNumber: 1, subjectId: 'math', topicTitle: 'Day 7: Week 1 Consolidation, Subject Test & Revision', targetMarksValue: 2.0, theoryTarget: 'Rapid review of all Week 1 Short Notes & Formulas', pyqTargetCount: 20, retentionFocus: 'Weekly Error Log audit & formula flash recall', isCompleted: false, isMvd: false },

  // WEEK 2: Calculus, Vector Calculus & Spatial Aptitude (Sep 8 - Sep 14)
  { dayNumber: 8, weekNumber: 2, subjectId: 'math', topicTitle: 'Day 8: Limits, Continuity & Differentiability', targetMarksValue: 1.5, theoryTarget: "L'Hopital Rule, Indeterminate forms, Taylor & Maclaurin Series", pyqTargetCount: 18, retentionFocus: 'Log limits shortcuts & common expansions', isCompleted: false, isMvd: false },
  { dayNumber: 9, weekNumber: 2, subjectId: 'math', topicTitle: 'Day 9: Maxima-Minima & Mean Value Theorems', targetMarksValue: 1.5, theoryTarget: 'Rolle, LMVT, Cauchy MVT, Saddle points in two variables', pyqTargetCount: 20, retentionFocus: 'Add 2-variable Hessian matrix test card', isCompleted: false, isMvd: false },
  { dayNumber: 10, weekNumber: 2, subjectId: 'math', topicTitle: 'Day 10: Vector Calculus (Gradient, Divergence, Curl)', targetMarksValue: 2.0, theoryTarget: 'Directional derivative, Solenoidal & Irrotational fields', pyqTargetCount: 20, retentionFocus: 'Vector identities formula sheet', isCompleted: false, isMvd: false },
  { dayNumber: 11, weekNumber: 2, subjectId: 'math', topicTitle: 'Day 11: Integral Theorems (Green, Stokes, Gauss Divergence)', targetMarksValue: 2.5, theoryTarget: 'Line, Surface & Volume Integrals conversion shortcuts', pyqTargetCount: 22, retentionFocus: 'Log integral theorem conversion conditions', isCompleted: false, isMvd: false },
  { dayNumber: 12, weekNumber: 2, subjectId: 'aptitude', topicTitle: 'Day 12: Spatial Aptitude (Paper Folding, Mirror & Rotations)', targetMarksValue: 2.0, theoryTarget: 'Visual pattern recognition, 2D to 3D folding rules', pyqTargetCount: 25, retentionFocus: 'Spatial shortcuts cheatsheet', isCompleted: false, isMvd: false },
  { dayNumber: 13, weekNumber: 2, subjectId: 'math', topicTitle: 'Day 13: Calculus PYQ Intensive Speed Drill', targetMarksValue: 1.5, theoryTarget: 'Timed 3-pass solving of 2018-2026 GATE Calculus questions', pyqTargetCount: 25, retentionFocus: 'Error Log update on integration boundaries', isCompleted: false, isMvd: false },
  { dayNumber: 14, weekNumber: 2, subjectId: 'math', topicTitle: 'Day 14: Week 2 Subject Test & Consolidation', targetMarksValue: 2.0, theoryTarget: 'Comprehensive test on Linear Algebra + Calculus', pyqTargetCount: 20, retentionFocus: 'Review all formula cards from Weeks 1-2', isCompleted: false, isMvd: false },

  // WEEK 3: Differential Equations & Complex Analysis (Sep 15 - Sep 21)
  { dayNumber: 15, weekNumber: 3, subjectId: 'math', topicTitle: 'Day 15: First Order Differential Equations', targetMarksValue: 1.5, theoryTarget: 'Exact DE, Integrating Factor, Linear & Bernoulli equations', pyqTargetCount: 18, retentionFocus: 'Integrating factor shortcut sheet', isCompleted: false, isMvd: false },
  { dayNumber: 16, weekNumber: 3, subjectId: 'math', topicTitle: 'Day 16: Higher Order Linear DE with Constant Coefficients', targetMarksValue: 1.5, theoryTarget: 'Complementary Function (CF) & Particular Integral (PI)', pyqTargetCount: 20, retentionFocus: 'PI shortcut rules table', isCompleted: false, isMvd: false },
  { dayNumber: 17, weekNumber: 3, subjectId: 'math', topicTitle: 'Day 17: Cauchy-Euler Equations & Variation of Parameters', targetMarksValue: 1.5, theoryTarget: 'Homogeneous linear equations with variable coefficients', pyqTargetCount: 18, retentionFocus: 'Variation of parameters formula card', isCompleted: false, isMvd: false },
  { dayNumber: 18, weekNumber: 3, subjectId: 'math', topicTitle: 'Day 18: Complex Variables: Analytic Functions & CR Equations', targetMarksValue: 1.5, theoryTarget: 'Cauchy-Riemann equations in Cartesian & Polar coordinates', pyqTargetCount: 20, retentionFocus: 'Analytic functions property summary', isCompleted: false, isMvd: false },
  { dayNumber: 19, weekNumber: 3, subjectId: 'math', topicTitle: 'Day 19: Complex Integration & Cauchy Residue Theorem', targetMarksValue: 2.0, theoryTarget: 'Poles, Residues calculation, Laurent Series', pyqTargetCount: 22, retentionFocus: 'Residue calculation formulas', isCompleted: false, isMvd: false },
  { dayNumber: 20, weekNumber: 3, subjectId: 'aptitude', topicTitle: 'Day 20: Quantitative Aptitude (Percentages, Ratio & Profit)', targetMarksValue: 2.0, theoryTarget: 'Quick calculation methods & formula shortcuts', pyqTargetCount: 25, retentionFocus: 'Speed math card', isCompleted: false, isMvd: false },
  { dayNumber: 21, weekNumber: 3, subjectId: 'math', topicTitle: 'Day 21: Engineering Math Full-Length Sectional Test', targetMarksValue: 2.5, theoryTarget: 'Full 13-mark test covering entire Engineering Mathematics', pyqTargetCount: 25, retentionFocus: 'Audit entire Math Formula Vault', isCompleted: false, isMvd: false },

  // WEEK 4: Network Theory Foundations & Theorems (Sep 22 - Sep 28)
  { dayNumber: 22, weekNumber: 4, subjectId: 'networks', topicTitle: 'Day 22: KCL, KVL, Nodal & Mesh Analysis with Dependent Sources', targetMarksValue: 1.5, theoryTarget: 'Supernode, Supermesh, Source transformation principles', pyqTargetCount: 20, retentionFocus: 'Dependent source matrix formulation card', isCompleted: false, isMvd: false },
  { dayNumber: 23, weekNumber: 4, subjectId: 'networks', topicTitle: 'Day 23: Thevenin & Norton Equivalent Circuits', targetMarksValue: 2.0, theoryTarget: 'Rth calculation with independent & dependent sources', pyqTargetCount: 22, retentionFocus: 'Rth test source method card (1V / 1A)', isCompleted: false, isMvd: false },
  { dayNumber: 24, weekNumber: 4, subjectId: 'networks', topicTitle: 'Day 24: Maximum Power Transfer & Superposition Theorems', targetMarksValue: 2.0, theoryTarget: 'Max power conditions for DC & AC complex impedances', pyqTargetCount: 20, retentionFocus: 'Max power conditions summary sheet', isCompleted: false, isMvd: false },
  { dayNumber: 25, weekNumber: 4, subjectId: 'networks', topicTitle: 'Day 25: Sinusoidal Steady State & Phasor Analysis', targetMarksValue: 1.5, theoryTarget: 'Impedance, Admittance, Power Triangle (P, Q, S), Power Factor', pyqTargetCount: 20, retentionFocus: 'Power triangle formula sheet', isCompleted: false, isMvd: false },
  { dayNumber: 26, weekNumber: 4, subjectId: 'networks', topicTitle: 'Day 26: Series & Parallel Resonance Circuits', targetMarksValue: 2.5, theoryTarget: 'Resonant frequency, Quality Factor (Q), Bandwidth, Selectivity', pyqTargetCount: 25, retentionFocus: 'Q-factor series vs parallel comparison card', isCompleted: false, isMvd: false },
  { dayNumber: 27, weekNumber: 4, subjectId: 'aptitude', topicTitle: 'Day 27: Quantitative Aptitude (Time & Work, Speed-Distance)', targetMarksValue: 2.0, theoryTarget: 'Relative speed, Circular tracks, Work equivalence', pyqTargetCount: 25, retentionFocus: 'Formulas for work & time shortcuts', isCompleted: false, isMvd: false },
  { dayNumber: 28, weekNumber: 4, subjectId: 'networks', topicTitle: 'Day 28: Network Theorems Sectional Test & Review', targetMarksValue: 2.0, theoryTarget: 'Comprehensive timed practice on Days 22-26 concepts', pyqTargetCount: 22, retentionFocus: 'Log all theorem sign errors in 3-Line Log', isCompleted: false, isMvd: false },

  // WEEK 5: Network Transients & Two-Port Networks (Sep 29 - Oct 5)
  { dayNumber: 29, weekNumber: 5, subjectId: 'networks', topicTitle: 'Day 29: First Order Transients (RL & RC Circuits)', targetMarksValue: 2.5, theoryTarget: 'Initial conditions at t=0-, t=0+, t=infinity, Time constant tau', pyqTargetCount: 25, retentionFocus: 'Standard response formula card: x(t) = x(inf) + [x(0+) - x(inf)]e^-t/tau', isCompleted: false, isMvd: false },
  { dayNumber: 30, weekNumber: 5, subjectId: 'networks', topicTitle: 'Day 30: Second Order Transients (Series & Parallel RLC)', targetMarksValue: 3.0, theoryTarget: 'Underdamped, Critically damped, Overdamped responses, Damping factor xi', pyqTargetCount: 25, retentionFocus: 'Damping ratio xi and omega_n formula card', isCompleted: false, isMvd: false },
  { dayNumber: 31, weekNumber: 5, subjectId: 'networks', topicTitle: 'Day 31: Laplace Domain Circuit Analysis (s-Domain)', targetMarksValue: 2.0, theoryTarget: 'Inductor & Capacitor s-domain models with initial energy', pyqTargetCount: 20, retentionFocus: 's-domain initial condition models summary', isCompleted: false, isMvd: false },
  { dayNumber: 32, weekNumber: 5, subjectId: 'networks', topicTitle: 'Day 32: Two-Port Network Parameters (z, y, h, ABCD)', targetMarksValue: 2.0, theoryTarget: 'Reciprocity & Symmetry conditions for all parameters', pyqTargetCount: 22, retentionFocus: 'Two-port parameter conversion & symmetry matrix', isCompleted: false, isMvd: false },
  { dayNumber: 33, weekNumber: 5, subjectId: 'networks', topicTitle: 'Day 33: Two-Port Interconnections & Lattice Networks', targetMarksValue: 1.5, theoryTarget: 'Series, Parallel, Cascade interconnections', pyqTargetCount: 18, retentionFocus: 'Interconnection rules card', isCompleted: false, isMvd: false },
  { dayNumber: 34, weekNumber: 5, subjectId: 'aptitude', topicTitle: 'Day 34: General Aptitude (Data Interpretation & Syllogism)', targetMarksValue: 2.0, theoryTarget: 'Venn diagrams, Deductive logic, Pie charts & Bar graphs', pyqTargetCount: 25, retentionFocus: 'Syllogism rule chart', isCompleted: false, isMvd: false },
  { dayNumber: 35, weekNumber: 5, subjectId: 'networks', topicTitle: 'Day 35: Network Theory Full Subject Test (10 Marks)', targetMarksValue: 3.0, theoryTarget: '30-question subject test matching GATE difficulty', pyqTargetCount: 30, retentionFocus: 'Audit Network Theory Error Log & Short Notes', isCompleted: false, isMvd: false },

  // WEEK 6: Signals & Systems Core (Oct 6 - Oct 12)
  { dayNumber: 36, weekNumber: 6, subjectId: 'signals', topicTitle: 'Day 36: Continuous & Discrete Signals Classification', targetMarksValue: 1.5, theoryTarget: 'Even/Odd, Periodic, Energy & Power signal calculations', pyqTargetCount: 20, retentionFocus: 'Energy vs Power signal conditions card', isCompleted: false, isMvd: false },
  { dayNumber: 37, weekNumber: 6, subjectId: 'signals', topicTitle: 'Day 37: LTI Systems & Continuous Convolution Integral', targetMarksValue: 2.5, theoryTarget: 'Impulse response, Step response, Graphical convolution, BIBO stability', pyqTargetCount: 25, retentionFocus: 'Convolution shortcut properties card', isCompleted: false, isMvd: false },
  { dayNumber: 38, weekNumber: 6, subjectId: 'signals', topicTitle: 'Day 38: Continuous-Time Fourier Series & Transform (CTFS/CTFT)', targetMarksValue: 2.5, theoryTarget: 'Duality, Time scaling, Frequency shifting, Parseval relation', pyqTargetCount: 25, retentionFocus: 'CTFT transform pairs & duality shortcuts', isCompleted: false, isMvd: false },
  { dayNumber: 39, weekNumber: 6, subjectId: 'signals', topicTitle: 'Day 39: Laplace Transform & Region of Convergence (ROC)', targetMarksValue: 2.0, theoryTarget: 'Unilateral/Bilateral Laplace, ROC properties for stability & causality', pyqTargetCount: 22, retentionFocus: 'ROC conditions for stability vs causality', isCompleted: false, isMvd: false },
  { dayNumber: 40, weekNumber: 6, subjectId: 'signals', topicTitle: 'Day 40: Z-Transform & Discrete-Time LTI Systems', targetMarksValue: 2.0, theoryTarget: 'Z-transform pairs, Initial/Final value theorem, Inverse Z-transform', pyqTargetCount: 22, retentionFocus: 'Z-transform ROC rules summary', isCompleted: false, isMvd: false },
  { dayNumber: 41, weekNumber: 6, subjectId: 'signals', topicTitle: 'Day 41: Sampling Theorem, Nyquist Rate & Aliasing', targetMarksValue: 2.0, theoryTarget: 'Bandpass sampling, Flat-top & Ideal sampling, Reconstruction filters', pyqTargetCount: 22, retentionFocus: 'Nyquist rate formula card for product/sum signals', isCompleted: false, isMvd: false },
  { dayNumber: 42, weekNumber: 6, subjectId: 'signals', topicTitle: 'Day 42: Phase 1 Grand Revision & Sectional Mock', targetMarksValue: 3.5, theoryTarget: 'Phase 1 Audit (Math + Aptitude + Networks + Signals = ~36 Marks)', pyqTargetCount: 35, retentionFocus: 'Full Phase 1 Formula Sheet audit', isCompleted: false, isMvd: false }
];
