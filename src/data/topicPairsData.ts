import { TopicPair } from '../types/progress';
import { GATE_ECE_SUBJECTS } from './syllabusData';

// Helper to look up subject & topic details
const getSub = (subId: string) => GATE_ECE_SUBJECTS.find(s => s.id === subId)!;
const getTop = (subId: string, topId: string) => {
  const sub = getSub(subId);
  const topic = sub.topics.find(t => t.id === topId)!;
  return {
    subjectId: sub.id,
    subjectName: sub.name,
    subjectColor: sub.color,
    topicId: topic.id,
    topicName: topic.name,
    marksWeight: topic.marksWeight,
    targetPyqs: topic.targetPyqs,
    bookRef: topic.bookRef!
  };
};

export const CURATED_TOPIC_PAIRS: TopicPair[] = [
  // 1. Math + Digital Logic
  {
    id: 'pair-1',
    pairNumber: 1,
    title: 'Algebraic Foundations & Logic Gates',
    archetype: 'Speed & Accuracy',
    synergyRationale: 'Pairs matrix reduction with Boolean logic minimization. High early dopamine with straightforward algebra and truth tables.',
    topicA: getTop('math', 'math-la-rank'),
    topicB: getTop('digital', 'dc-bool'),
    combinedMarks: 4.0,
    estMinutes: 180,
    isCompleted: false
  },

  // 2. Network Theory + Combinational MSI
  {
    id: 'pair-2',
    pairNumber: 2,
    title: 'Circuit Theorems & Multiplexer Synthesis',
    archetype: 'System & Signal',
    synergyRationale: 'Balances intensive Thevenin calculation with clean logic tree structure of 2^n:1 multiplexers.',
    topicA: getTop('networks', 'nt-theorems'),
    topicB: getTop('digital', 'dc-comb'),
    combinedMarks: 5.0,
    estMinutes: 200,
    isCompleted: false
  },

  // 3. Microprocessors + Sequential Circuits (Embedded Core 1)
  {
    id: 'pair-3',
    pairNumber: 3,
    title: '8085 Architecture & Flip-Flop Timing Slack',
    archetype: 'Hardware Core',
    synergyRationale: 'Direct embedded systems link: clock cycle propagation, setup/hold time slacks directly explain 8085 bus timing.',
    topicA: getTop('microprocessors', 'mp-8085-arch'),
    topicB: getTop('digital', 'dc-seq'),
    combinedMarks: 6.5,
    estMinutes: 210,
    isCompleted: false
  },

  // 4. Network Transients + Laplace Transforms
  {
    id: 'pair-4',
    pairNumber: 4,
    title: 'RL/RC Circuit Transients & Laplace ROC Domain',
    archetype: 'System & Signal',
    synergyRationale: 'Differential equations in circuit time domain convert directly into Laplace s-domain poles and stability boundaries.',
    topicA: getTop('networks', 'nt-transients'),
    topicB: getTop('signals', 'ss-transforms'),
    combinedMarks: 5.0,
    estMinutes: 210,
    isCompleted: false
  },

  // 5. Linear Algebra + Op-Amp Circuits
  {
    id: 'pair-5',
    pairNumber: 5,
    title: 'Eigenvalues & Operational Amplifiers (Linear Feedback)',
    archetype: 'Speed & Accuracy',
    synergyRationale: 'Fast matrix characteristic polynomial tricks paired with high-yield virtual ground op-amp derivations.',
    topicA: getTop('math', 'math-la-eigen'),
    topicB: getTop('analog', 'ac-opamp'),
    combinedMarks: 6.0,
    estMinutes: 200,
    isCompleted: false
  },

  // 6. Microprocessor Instructions + English Verbal
  {
    id: 'pair-6',
    pairNumber: 6,
    title: '8085 Instruction T-States & Verbal Vocabulary',
    archetype: 'Hardware Core',
    synergyRationale: 'High memory-density 8085 opcode machine cycles paired with relaxing, rapid vocabulary pattern matching.',
    topicA: getTop('microprocessors', 'mp-8085-instr'),
    topicB: getTop('aptitude', 'apt-verbal-vocab'),
    combinedMarks: 8.0,
    estMinutes: 190,
    isCompleted: false
  },

  // 7. LTI Convolution + Control Block Reduction
  {
    id: 'pair-7',
    pairNumber: 7,
    title: 'LTI Convolution & Mason Gain Signal Flow Graphs',
    archetype: 'System & Signal',
    synergyRationale: 'Impulse response convolution connects directly to closed-loop block transfer functions.',
    topicA: getTop('signals', 'ss-lti'),
    topicB: getTop('control', 'cs-block'),
    combinedMarks: 4.0,
    estMinutes: 180,
    isCompleted: false
  },

  // 8. 8085 Interrupts + Digital Counters
  {
    id: 'pair-8',
    pairNumber: 8,
    title: 'Vector Interrupts (0024H Formula) & Synchronous Counters',
    archetype: 'Hardware Core',
    synergyRationale: 'Hardware interrupt service routines linked with synchronous FSM / counter state generation.',
    topicA: getTop('microprocessors', 'mp-8085-interrupt'),
    topicB: getTop('digital', 'dc-counters'),
    combinedMarks: 6.0,
    estMinutes: 195,
    isCompleted: false
  },

  // 9. Vector Calculus + Diode Circuits
  {
    id: 'pair-9',
    pairNumber: 9,
    title: 'Vector Calculus Theorems & Diode Clippers/Clampers',
    archetype: 'Speed & Accuracy',
    synergyRationale: 'Divergence and Stokes conversions alternate with practical non-linear diode wave-shaping.',
    topicA: getTop('math', 'math-calc-vec'),
    topicB: getTop('analog', 'ac-diodes'),
    combinedMarks: 4.0,
    estMinutes: 190,
    isCompleted: false
  },

  // 10. AC Resonance + Second-Order Control Time Response
  {
    id: 'pair-10',
    pairNumber: 10,
    title: 'RLC Circuit Resonance & Control Peak Overshoot (%OS)',
    archetype: 'System & Signal',
    synergyRationale: 'Quality factor Q in circuits directly mirrors the damping ratio zeta in 2nd-order control overshoot.',
    topicA: getTop('networks', 'nt-ac'),
    topicB: getTop('control', 'cs-time'),
    combinedMarks: 4.5,
    estMinutes: 200,
    isCompleted: false
  },

  // 11. Logical Syllogisms + Semiconductor Carrier Transport
  {
    id: 'pair-11',
    pairNumber: 11,
    title: 'Syllogism Deduction & Semiconductor Drift-Diffusion',
    archetype: 'Logic & Physics',
    synergyRationale: 'Clean Venn-diagram logic puzzles relieve mental strain from carrier velocity saturation and Einstein equations.',
    topicA: getTop('aptitude', 'apt-logic-deductive'),
    topicB: getTop('edc', 'edc-semi'),
    combinedMarks: 6.5,
    estMinutes: 190,
    isCompleted: false
  },

  // 12. 8255 PPI Interfacing + BJT/MOSFET Small Signal
  {
    id: 'pair-12',
    pairNumber: 12,
    title: '8255 PPI Memory Decoding & Transistor Small Signal Gain',
    archetype: 'Hardware Core',
    synergyRationale: 'Interfacing chip selects (74LS138) paired with analog small-signal input/output impedance derivations.',
    topicA: getTop('microprocessors', 'mp-8085-interfacing'),
    topicB: getTop('analog', 'ac-bjt-mosfet'),
    combinedMarks: 6.0,
    estMinutes: 210,
    isCompleted: false
  },

  // 13. Differential Equations + Frequency Response (Bode & Nyquist)
  {
    id: 'pair-13',
    pairNumber: 13,
    title: 'Higher Order ODEs & Frequency Domain Stability (Bode Plots)',
    archetype: 'System & Signal',
    synergyRationale: 'Mathematical particular integrals translate into logarithmic magnitude and phase margin plots.',
    topicA: getTop('math', 'math-de'),
    topicB: getTop('control', 'cs-freq'),
    combinedMarks: 4.0,
    estMinutes: 200,
    isCompleted: false
  },

  // 14. 8086 Microprocessor + English Grammar Rules
  {
    id: 'pair-14',
    pairNumber: 14,
    title: '8086 Segmented Architecture & Grammar Precision Rules',
    archetype: 'Hardware Core',
    synergyRationale: 'Memory segment offset formulas combined with high-scoring Test I subject-verb agreement rules.',
    topicA: getTop('microprocessors', 'mp-8086-arch'),
    topicB: getTop('aptitude', 'apt-verbal-grammar'),
    combinedMarks: 7.5,
    estMinutes: 180,
    isCompleted: false
  },

  // 15. Continuous Fourier Transforms + Routh-Hurwitz Stability
  {
    id: 'pair-15',
    pairNumber: 15,
    title: 'CTFT Transform Duality & Routh Stability Criterion',
    archetype: 'System & Signal',
    synergyRationale: 'Symmetry and duality tricks in Fourier transforms paired with systematic Routh array sign inspections.',
    topicA: getTop('signals', 'ss-fourier'),
    topicB: getTop('control', 'cs-routh-root'),
    combinedMarks: 4.5,
    estMinutes: 195,
    isCompleted: false
  },

  // 16. PN Junction Depletion + Schmitt Triggers & 555 Timers
  {
    id: 'pair-16',
    pairNumber: 16,
    title: 'PN Junction Depletion Capacitance & 555 Astable Timers',
    archetype: 'Logic & Physics',
    synergyRationale: 'Junction transition capacitance behavior contrasts with practical RC charging in 555 timer oscillators.',
    topicA: getTop('edc', 'edc-pn'),
    topicB: getTop('analog', 'ac-feedback'),
    combinedMarks: 4.0,
    estMinutes: 190,
    isCompleted: false
  },

  // 17. Complex Residue Theorem + State Space Analysis
  {
    id: 'pair-17',
    pairNumber: 17,
    title: 'Cauchy Residue Theorem & State Space Controllability',
    archetype: 'Speed & Accuracy',
    synergyRationale: 'Complex integral contour residues pair with Kalman matrix rank tests for a pure analytical drill.',
    topicA: getTop('math', 'math-complex'),
    topicB: getTop('control', 'cs-state'),
    combinedMarks: 3.0,
    estMinutes: 180,
    isCompleted: false
  },

  // 18. Two-Port Parameters + Sampling Theorem
  {
    id: 'pair-18',
    pairNumber: 18,
    title: 'Two-Port Network Matrices & Nyquist Sampling Rate',
    archetype: 'System & Signal',
    synergyRationale: 'ABCD transmission conversions combined with frequency domain periodic replication and aliasing.',
    topicA: getTop('networks', 'nt-twoport'),
    topicB: getTop('signals', 'ss-sampling'),
    combinedMarks: 3.0,
    estMinutes: 175,
    isCompleted: false
  },

  // 19. MOSFET Physics + Analog AM/FM Modulation
  {
    id: 'pair-19',
    pairNumber: 19,
    title: 'MOS Capacitor Inversion & Carson Rule FM Modulation',
    archetype: 'Logic & Physics',
    synergyRationale: 'Solid state surface potential inversion paired with communication spectral bandwidth calculations.',
    topicA: getTop('edc', 'edc-mos'),
    topicB: getTop('comm', 'comm-analog'),
    combinedMarks: 6.0,
    estMinutes: 200,
    isCompleted: false
  },

  // 20. Transmission Lines + Digital Matched Filter (PCM)
  {
    id: 'pair-20',
    pairNumber: 20,
    title: 'Transmission Line SWR & Digital PCM Matched Filtering',
    archetype: 'Logic & Physics',
    synergyRationale: 'High-frequency line reflection physics paired with optimal SNR detection in digital receivers.',
    topicA: getTop('emtl', 'emtl-tlines'),
    topicB: getTop('comm', 'comm-digital'),
    combinedMarks: 7.0,
    estMinutes: 210,
    isCompleted: false
  },

  // 21. Number Series + Plane Wave Poynting Vector
  {
    id: 'pair-21',
    pairNumber: 21,
    title: 'Logical Number Sequences & EM Wave Polarization',
    archetype: 'Logic & Physics',
    synergyRationale: 'Visualizing electromagnetic wave vector rotations paired with crisp sequence pattern logic.',
    topicA: getTop('aptitude', 'apt-logic-series'),
    topicB: getTop('emtl', 'emtl-waves'),
    combinedMarks: 6.5,
    estMinutes: 180,
    isCompleted: false
  },

  // 22. Random Processes + Shannon Channel Capacity
  {
    id: 'pair-22',
    pairNumber: 22,
    title: 'White Noise PSD & Information Entropy / Channel Capacity',
    archetype: 'System & Signal',
    synergyRationale: 'Noise autocorrelation power density links seamlessly to Shannon channel capacity theorem.',
    topicA: getTop('comm', 'comm-random'),
    topicB: getTop('comm', 'comm-info'),
    combinedMarks: 4.0,
    estMinutes: 180,
    isCompleted: false
  },

  // 23. Reading Comprehension + Vector Space Dimension
  {
    id: 'pair-23',
    pairNumber: 23,
    title: 'Rapid Theme Comprehension & Vector Space Basis/Dimension',
    archetype: 'Speed & Accuracy',
    synergyRationale: 'English reading comprehension provides a refreshing contrast to null space dimension derivations.',
    topicA: getTop('aptitude', 'apt-verbal-rc'),
    topicB: getTop('math', 'math-la-basis'),
    combinedMarks: 5.0,
    estMinutes: 175,
    isCompleted: false
  },

  // 24. Calculus Maxima-Minima + Network Circuit Basics
  {
    id: 'pair-24',
    pairNumber: 24,
    title: 'Two-Variable Maxima-Minima & Dependent Source Nodal Analysis',
    archetype: 'Speed & Accuracy',
    synergyRationale: 'Hessian matrix extreme value tests paired with clean nodal supernode calculations.',
    topicA: getTop('math', 'math-calc-diff'),
    topicB: getTop('networks', 'nt-basics'),
    combinedMarks: 3.5,
    estMinutes: 180,
    isCompleted: false
  }
];

export const PAIR_ARCHETYPES = [
  'All Pairs',
  'Hardware Core',
  'System & Signal',
  'Speed & Accuracy',
  'Logic & Physics'
] as const;
