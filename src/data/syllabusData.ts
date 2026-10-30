import { SubjectModule, DayPlan } from '../types/progress';

export const GATE_ECE_SUBJECTS: SubjectModule[] = [
  {
    id: 'math',
    name: 'Engineering Mathematics (Test I)',
    shortCode: 'EM',
    totalMarksRange: '15 Qs / 45 Marks',
    targetMarks: 36,
    priorityTier: 'Tier 1 (High Yield / Fast Marks)',
    phase: 1,
    color: '#3b82f6',
    examSection: 'Test I',
    topics: [
      { 
        id: 'math-la-eigen', 
        name: 'Eigenvalues, Eigenvectors & Cayley-Hamilton', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Higher Engineering Mathematics',
          author: 'Dr. B.S. Grewal',
          edition: '44th Edition (Khanna Publishers)',
          chapters: 'Chapter 2: Linear Algebra - Matrices',
          pages: 'pp. 68–95 (Sections 2.13–2.17)',
          keyConcepts: ['Characteristic Polynomial |A - λI| = 0', 'Cayley-Hamilton: A^n & A^-1 calculation', 'Symmetric matrix real eigenvalues & orthogonal eigenvectors', 'Trace = Sum of λ, Det = Product of λ']
        }
      },
      { 
        id: 'math-la-rank', 
        name: 'Rank, Determinants & System of Linear Equations', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Higher Engineering Mathematics',
          author: 'Dr. B.S. Grewal',
          edition: '44th Edition',
          chapters: 'Chapter 2: Linear Algebra - Matrices',
          pages: 'pp. 45–67 (Sections 2.5–2.11)',
          keyConcepts: ['Row Echelon & Normal Form', 'Rank([A|B]) = Rank(A) Consistency Criterion', 'Subadditivity: Rank(A+B) <= Rank(A) + Rank(B)', 'Unique (r = n) vs Infinite (r < n) solutions']
        }
      },
      { 
        id: 'math-la-basis', 
        name: 'Vector Spaces, Basis, Dimension & LU Decomposition', 
        marksWeight: 1.5, 
        isHighYield: false, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Higher Engineering Mathematics',
          author: 'Dr. B.S. Grewal',
          edition: '44th Edition',
          chapters: 'Chapter 2: Linear Algebra',
          pages: 'pp. 58–80 (Sections 2.10–2.12)',
          keyConcepts: ['Linear Independence of Vectors', 'Basis & Dimension of Null Space (Nullity = n - Rank)', 'LU Decomposition / Doolittle Method']
        }
      },
      { 
        id: 'math-calc-diff', 
        name: 'Limits, Continuity, Maxima-Minima & Mean Value Theorems', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Higher Engineering Mathematics',
          author: 'Dr. B.S. Grewal',
          edition: '44th Edition',
          chapters: 'Chapters 4 & 5: Differential Calculus',
          pages: 'pp. 140–195 (Sections 4.3–4.9, 5.1–5.6)',
          keyConcepts: ["L'Hopital Rule for 0/0 and inf/inf", 'Taylor & Maclaurin series expansions', 'Rolle & Lagrange Mean Value Theorem', 'Two-variable Hessian Matrix: rt - s^2 test']
        }
      },
      { 
        id: 'math-calc-vec', 
        name: 'Vector Calculus: Gradient, Divergence, Curl, Green/Stokes/Gauss', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Higher Engineering Mathematics',
          author: 'Dr. B.S. Grewal',
          edition: '44th Edition',
          chapters: 'Chapter 8: Vector Calculus',
          pages: 'pp. 320–378 (Sections 8.1–8.18)',
          keyConcepts: ['Directional Derivative grad(phi) . u_hat', 'Solenoidal: div(V) = 0; Irrotational: curl(V) = 0', "Green's Theorem in a plane", 'Gauss Divergence & Stokes Curl conversions']
        }
      },
      { 
        id: 'math-de', 
        name: 'Differential Equations (Higher Order & Cauchy-Euler)', 
        marksWeight: 1.5, 
        isHighYield: false, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Higher Engineering Mathematics',
          author: 'Dr. B.S. Grewal',
          edition: '44th Edition',
          chapters: 'Chapter 13: Linear Differential Equations',
          pages: 'pp. 510–560 (Sections 13.1–13.12)',
          keyConcepts: ['Complementary Function (CF) root cases', 'Particular Integral (PI) shortcuts for e^ax, sin(ax), x^m', 'Cauchy-Euler variable coefficient substitution x = e^z', 'Method of Variation of Parameters']
        }
      },
      { 
        id: 'math-complex', 
        name: 'Complex Analysis: Cauchy-Riemann & Residue Theorem', 
        marksWeight: 1.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Higher Engineering Mathematics',
          author: 'Dr. B.S. Grewal',
          edition: '44th Edition',
          chapters: 'Chapter 20: Complex Analysis',
          pages: 'pp. 815–870 (Sections 20.1–20.20)',
          keyConcepts: ['Cauchy-Riemann equations: u_x = v_y, u_y = -v_x', 'Harmonic conjugate functions & Laplace equation', 'Cauchy Residue Theorem: 2*pi*j * Sum(Residues)', 'Residue calculation for simple and order-m poles']
        }
      },
    ]
  },
  {
    id: 'aptitude',
    name: 'English & Logical Reasoning (Test I)',
    shortCode: 'ELR',
    totalMarksRange: '15 Qs / 45 Marks',
    targetMarks: 41,
    priorityTier: 'Tier 1 (High Yield / Fast Marks)',
    phase: 1,
    color: '#10b981',
    examSection: 'Test I',
    topics: [
      { 
        id: 'apt-verbal-vocab', 
        name: 'English: Contextual Vocabulary, Synonyms & Antonyms', 
        marksWeight: 4.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 30, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Objective General English',
          author: 'S.P. Bakshi',
          edition: 'Arihant Publications',
          chapters: 'Part B: Verbal Ability & Vocabulary',
          pages: 'pp. 120–210 (Units 1–3)',
          keyConcepts: ['High-frequency GRE/GATE root words', 'Contextual prefix/suffix elimination', 'Subtle antonym shade distinctions']
        }
      },
      { 
        id: 'apt-verbal-grammar', 
        name: 'English: Subject-Verb Agreement, Prepositions & Sentence Completion', 
        marksWeight: 5.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 30, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Objective General English',
          author: 'S.P. Bakshi',
          edition: 'Arihant Publications',
          chapters: 'Part A: Foundation of Grammar',
          pages: 'pp. 15–98 (Chapters 1–6)',
          keyConcepts: ['Subject-Verb Agreement traps (Either/Or, Neither/Nor, As well as)', 'Correct Preposition pairings (Differ with vs Differ from)', 'Parallelism in compound clauses']
        }
      },
      { 
        id: 'apt-verbal-rc', 
        name: 'English: Reading Comprehension & Rapid Theme Extraction', 
        marksWeight: 3.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Objective General English',
          author: 'S.P. Bakshi',
          edition: 'Arihant Publications',
          chapters: 'Part C: Practical Grammar & Comprehension',
          pages: 'pp. 310–360 (Chapter 14)',
          keyConcepts: ['Rapid skimming for primary argument / central theme', 'Inference vs directly stated distinction', 'Author tone detection (objective, critical, analytical)']
        }
      },
      { 
        id: 'apt-logic-series', 
        name: 'Logical Reasoning: Number/Letter Series & Coding-Decoding', 
        marksWeight: 4.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'A Modern Approach to Verbal & Non-Verbal Reasoning',
          author: 'Dr. R.S. Aggarwal',
          edition: 'S. Chand Publications',
          chapters: 'Section I: Verbal Reasoning',
          pages: 'pp. 1–65 (Chapters 1 & 3)',
          keyConcepts: ['Double difference & polynomial sequences', 'Alphabetical position mapping (EJOTY rule: 5-10-15-20-25)', 'Matrix pattern grid completion']
        }
      },
      { 
        id: 'apt-logic-deductive', 
        name: 'Logical Reasoning: Syllogisms, Blood Relations & Direction Sense', 
        marksWeight: 4.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'A Modern Approach to Verbal & Non-Verbal Reasoning',
          author: 'Dr. R.S. Aggarwal',
          edition: 'S. Chand Publications',
          chapters: 'Section I: Deductive Logic',
          pages: 'pp. 110–145, 340–395 (Chapters 5 & 11)',
          keyConcepts: ['Venn Diagram 3-circle intersection rules for Syllogisms', 'Blood relations generation tree diagrams', 'Direction & displacement pythagorean triangles']
        }
      },
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
      { 
        id: 'nt-basics', 
        name: 'KCL, KVL, Nodal/Mesh & Source Transformations', 
        marksWeight: 1.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Fundamentals of Electric Circuits',
          author: 'Charles K. Alexander & Matthew N.O. Sadiku',
          edition: '6th / 7th Edition (McGraw Hill)',
          chapters: 'Chapters 2 & 3: Basic Laws & Methods of Analysis',
          pages: 'pp. 35–125',
          keyConcepts: ['Supernode (voltage source between two non-reference nodes)', 'Supermesh (current source shared between two meshes)', 'Source transformation with dependent sources']
        }
      },
      { 
        id: 'nt-theorems', 
        name: 'Network Theorems (Thevenin, Norton, Max Power, Superposition)', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Fundamentals of Electric Circuits',
          author: 'Alexander & Sadiku',
          edition: '6th / 7th Edition',
          chapters: 'Chapter 4: Circuit Theorems',
          pages: 'pp. 127–168',
          keyConcepts: ['R_th test source method (apply 1V or 1A at open terminals)', 'Max Power Transfer DC (R_L = R_th, P_max = V_th^2 / 4R_th)', 'Max Power Transfer AC (Z_L = Z_th^*)', 'Superposition: power is NOT linear']
        }
      },
      { 
        id: 'nt-transients', 
        name: 'Transient Analysis in First & Second Order Circuits (RL, RC, RLC)', 
        marksWeight: 3.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 30, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Fundamentals of Electric Circuits',
          author: 'Alexander & Sadiku',
          edition: '6th / 7th Edition',
          chapters: 'Chapters 7 & 8: First-Order & Second-Order Circuits',
          pages: 'pp. 253–350',
          keyConcepts: ['Universal formula: x(t) = x(inf) + [x(0+) - x(inf)] * e^(-t/tau)', 'Time constants: tau = L/R_eq (RL), tau = R_eq*C (RC)', 'Series RLC damping factor: alpha = R/(2L), omega_0 = 1/sqrt(LC)', 'Parallel RLC: alpha = 1/(2RC), omega_0 = 1/sqrt(LC)']
        }
      },
      { 
        id: 'nt-ac', 
        name: 'Sinusoidal Steady State, Phasors & Resonance (Series/Parallel)', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Fundamentals of Electric Circuits',
          author: 'Alexander & Sadiku',
          edition: '6th / 7th Edition',
          chapters: 'Chapters 9 & 14: Sinusoids & Frequency Response',
          pages: 'pp. 369–415, 615–665',
          keyConcepts: ['Power triangle: S = P + jQ = V_rms * I_rms^*', 'Series Resonance: omega_0 = 1/sqrt(LC), Q = omega_0*L / R = (1/R)*sqrt(L/C)', 'Parallel Resonance: Q = R / (omega_0*L) = R*sqrt(C/L)', 'Bandwidth = omega_0 / Q']
        }
      },
      { 
        id: 'nt-twoport', 
        name: 'Two-Port Network Parameters (z, y, h, ABCD) & Interconnections', 
        marksWeight: 1.5, 
        isHighYield: false, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Fundamentals of Electric Circuits',
          author: 'Alexander & Sadiku',
          edition: '6th / 7th Edition',
          chapters: 'Chapter 19: Two-Port Networks',
          pages: 'pp. 850–895',
          keyConcepts: ['Reciprocity conditions: z_12 = z_21, y_12 = y_21, AD - BC = 1, h_12 = -h_21', 'Symmetry conditions: z_11 = z_22, y_11 = y_22, A = D, det(h) = 1', 'Series connection: add [Z]; Parallel: add [Y]; Cascade: multiply [T]']
        }
      },
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
      { 
        id: 'ss-basics', 
        name: 'Signal Properties, Continuous & Discrete Time Transformations', 
        marksWeight: 1.5, 
        isHighYield: false, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Signals and Systems',
          author: 'Alan V. Oppenheim, Alan S. Willsky & S. Hamid Nawab',
          edition: '2nd Edition (Pearson / Prentice Hall)',
          chapters: 'Chapter 1: Signals and Systems',
          pages: 'pp. 1–65',
          keyConcepts: ['Even/Odd signal decomposition: x_e(t) = 0.5[x(t) + x(-t)]', 'Periodicity condition for discrete: omega_0 / (2*pi) = m / N', 'Energy vs Power signal criteria (Energy finite -> Power = 0)']
        }
      },
      { 
        id: 'ss-lti', 
        name: 'LTI Systems: Convolution Integral/Sum, Stability & Causality', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Signals and Systems',
          author: 'Oppenheim & Willsky',
          edition: '2nd Edition',
          chapters: 'Chapter 2: Linear Time-Invariant Systems',
          pages: 'pp. 74–138',
          keyConcepts: ['Continuous convolution y(t) = x(t) * h(t)', 'Causality condition: h(t) = 0 for t < 0', 'BIBO Stability condition: integral |h(t)| dt < infinity', 'Step response s(t) derivative = impulse response h(t)']
        }
      },
      { 
        id: 'ss-fourier', 
        name: 'Continuous & Discrete Fourier Series / Transforms (CTFT, DTFT, DFT)', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Signals and Systems',
          author: 'Oppenheim & Willsky',
          edition: '2nd Edition',
          chapters: 'Chapters 3 & 4: Fourier Analysis',
          pages: 'pp. 177–248, 284–355',
          keyConcepts: ['CTFT Duality Property: x(t) <-> X(omega) implies X(t) <-> 2*pi*x(-omega)', "Parseval's Energy Relation: E = (1/2pi) * integral |X(omega)|^2 domega", 'Transform of rect(t/T) = T * sinc(omega*T / 2pi)', 'Differentiation in time: d/dt x(t) <-> j*omega * X(omega)']
        }
      },
      { 
        id: 'ss-transforms', 
        name: 'Laplace Transform, Z-Transform & ROC Properties', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Signals and Systems',
          author: 'Oppenheim & Willsky',
          edition: '2nd Edition',
          chapters: 'Chapters 9 & 10: Laplace & Z-Transform',
          pages: 'pp. 653–718, 741–802',
          keyConcepts: ['Laplace ROC: right-half plane (causal), left-half plane (anti-causal)', 'Stability condition: ROC must contain j*omega axis (Laplace) or unit circle (Z)', 'Initial Value Theorem: x(0+) = lim s->inf [s*X(s)]', 'Final Value Theorem: x(inf) = lim s->0 [s*X(s)] (valid only if poles in LHP)']
        }
      },
      { 
        id: 'ss-sampling', 
        name: 'Sampling Theorem, Nyquist Rate & Reconstruction', 
        marksWeight: 1.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Signals and Systems',
          author: 'Oppenheim & Willsky',
          edition: '2nd Edition',
          chapters: 'Chapter 7: Sampling',
          pages: 'pp. 514–560',
          keyConcepts: ['Nyquist Rate: omega_s >= 2 * omega_max (f_s >= 2 * f_m)', 'Nyquist rate for product x1(t)*x2(t) = 2*(f_m1 + f_m2)', 'Nyquist rate for convolution x1(t)*x2(t) = 2*min(f_m1, f_m2)', 'Ideal reconstruction low-pass filter cutoff = omega_s / 2']
        }
      },
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
      { 
        id: 'cs-block', 
        name: 'Transfer Function, Block Reduction & Signal Flow Graph (Mason)', 
        marksWeight: 1.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Control Systems Engineering',
          author: 'Norman S. Nise',
          edition: '7th Edition (Wiley)',
          chapters: 'Chapters 2 & 5: Transfer Function & Reduction',
          pages: 'pp. 40–95, 230–275',
          keyConcepts: ["Mason's Gain Formula: T = Sum(P_k * Delta_k) / Delta", 'Delta = 1 - Sum(individual loops) + Sum(non-touching pairs) - ...', 'Block reduction: moving summing point / pickoff point rules']
        }
      },
      { 
        id: 'cs-time', 
        name: 'Time Response Analysis: 1st/2nd Order, Peak Overshoot, Settling Time', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Control Systems Engineering',
          author: 'Norman S. Nise',
          edition: '7th Edition',
          chapters: 'Chapter 4: Time Response',
          pages: 'pp. 152–214',
          keyConcepts: ['Standard 2nd order: omega_n^2 / (s^2 + 2*zeta*omega_n*s + omega_n^2)', 'Peak time: t_p = pi / (omega_n * sqrt(1 - zeta^2))', 'Peak overshoot: %OS = exp(-zeta*pi / sqrt(1 - zeta^2)) * 100', 'Settling time 2%: T_s = 4 / (zeta * omega_n)']
        }
      },
      { 
        id: 'cs-routh-root', 
        name: 'Routh-Hurwitz Stability Criterion & Root Locus Techniques', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Control Systems Engineering',
          author: 'Norman S. Nise',
          edition: '7th Edition',
          chapters: 'Chapters 6 & 8: Stability & Root Locus',
          pages: 'pp. 290–330, 375–435',
          keyConcepts: ['Routh array: number of sign changes = right-half plane poles', 'Special cases: row of all zeros (auxiliary equation d/ds), first element zero (epsilon)', 'Root Locus Centroid: sigma_a = (Sum poles - Sum zeros) / (P - Z)', 'Asymptote angles: theta_k = (2k+1)*180 / (P - Z)']
        }
      },
      { 
        id: 'cs-freq', 
        name: 'Frequency Domain: Bode Plots, Nyquist Stability & Gain/Phase Margin', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Control Systems Engineering',
          author: 'Norman S. Nise',
          edition: '7th Edition',
          chapters: 'Chapters 10 & 11: Frequency Response & Nyquist',
          pages: 'pp. 524–595, 605–635',
          keyConcepts: ['Gain Margin (GM) at Phase Crossover Frequency omega_pc where phase = -180 deg', 'Phase Margin (PM) = 180 + phase(omega_gc) where magnitude = 1 (0 dB)', 'Bode slope change: -20 dB/dec for pole, +20 dB/dec for zero', 'Nyquist Encirclement Criterion: N = P - Z (enclosing -1 + j0)']
        }
      },
      { 
        id: 'cs-state', 
        name: 'State Space Analysis: Controllability, Observability & State Transition', 
        marksWeight: 1.5, 
        isHighYield: false, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Control Systems Engineering',
          author: 'Norman S. Nise',
          edition: '7th Edition',
          chapters: 'Chapters 3 & 12: State-Space Modeling & Design',
          pages: 'pp. 110–145, 640–685',
          keyConcepts: ['State Transition Matrix: Phi(t) = invLaplace[(sI - A)^-1] = e^(At)', 'Kalman Controllability Matrix: Q_c = [B | AB | A^2B | ... | A^(n-1)B] (Rank = n)', 'Kalman Observability Matrix: Q_o = [C; CA; CA^2; ...; CA^(n-1)] (Rank = n)', 'Transfer function: Y(s)/U(s) = C*(sI - A)^-1 * B + D']
        }
      },
    ]
  },
  {
    id: 'digital',
    name: 'Digital Circuits',
    shortCode: 'DC',
    totalMarksRange: '8 – 10 Marks',
    targetMarks: 9.0,
    priorityTier: 'Tier 1 (High Yield / Fast Marks)',
    phase: 2,
    color: '#f59e0b',
    examSection: 'Test II',
    topics: [
      { 
        id: 'dc-bool', 
        name: 'Boolean Algebra, Logic Gates & K-Maps Minimization', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Digital Design: With an Introduction to the Verilog HDL',
          author: 'M. Morris Mano & Michael D. Ciletti',
          edition: '5th / 6th Edition (Pearson)',
          chapters: 'Chapters 2 & 3: Boolean Algebra & Gate-Level Minimization',
          pages: 'pp. 38–110',
          keyConcepts: ['Demorgan Laws & Consensus Theorem: AB + A\'C + BC = AB + A\'C', 'Prime Implicants & Essential Prime Implicants identification', 'K-Map grouping with Don\'t Cares (X)', 'Static-0 and Static-1 timing hazards elimination']
        }
      },
      { 
        id: 'dc-comb', 
        name: 'Combinational Circuits: MUX, Decoders, Adders & Encoders', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Digital Design',
          author: 'M. Morris Mano & Michael D. Ciletti',
          edition: '5th / 6th Edition',
          chapters: 'Chapter 4: Combinational Logic',
          pages: 'pp. 125–182',
          keyConcepts: ['Universal function implementation with 2^n : 1 and 2^(n-1) : 1 MUX', 'Tree multiplexing (constructing 16:1 from 4:1 MUX)', 'Decoder with active-low enables for memory addressing', 'Carry lookahead adder delay advantage vs ripple carry adder']
        }
      },
      { 
        id: 'dc-seq', 
        name: 'Sequential Circuits: Latches, Flip-Flops, Setup/Hold Time Slack', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Digital Design',
          author: 'M. Morris Mano & Michael D. Ciletti',
          edition: '5th / 6th Edition',
          chapters: 'Chapter 5: Synchronous Sequential Logic',
          pages: 'pp. 190–245',
          keyConcepts: ['Excitation tables: JK (0->0: 0X, 0->1: 1X, 1->0: X1, 1->1: X0), T, D, SR', 'Clock skew delta = T_clk2 - T_clk1', 'Setup time constraint: T_clk >= T_cq + T_comb + T_setup - delta', 'Hold time constraint: T_cq + T_comb >= T_hold + delta']
        }
      },
      { 
        id: 'dc-counters', 
        name: 'Synchronous & Asynchronous Counters, Shift Registers & FSM Design', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Digital Design',
          author: 'M. Morris Mano & Michael D. Ciletti',
          edition: '5th / 6th Edition',
          chapters: 'Chapter 6: Registers and Counters',
          pages: 'pp. 255–310',
          keyConcepts: ['Ring counter (N states for N flip-flops) vs Johnson counter (2N states)', 'Ripple counter total delay = N * t_pd', 'Synchronous counter synthesis with unused state lock-out prevention', 'Mealy (output depends on input + state) vs Moore (state only)']
        }
      },
    ]
  },
  {
    id: 'microprocessors',
    name: 'Microprocessors (8085 & 8086)',
    shortCode: 'MP',
    totalMarksRange: '15 – 20 Marks (BITS HD Core)',
    targetMarks: 18,
    priorityTier: 'Tier 1 (High Yield / Fast Marks)',
    phase: 2,
    color: '#06b6d4',
    examSection: 'Test II',
    topics: [
      { 
        id: 'mp-8085-arch', 
        name: '8085 Architecture, Flags, Pinout & Bus Demux (ALE, IO/M)', 
        marksWeight: 4.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Microprocessor Architecture, Programming, and Applications with the 8085',
          author: 'Ramesh S. Gaonkar',
          edition: '6th Edition (Penram International)',
          chapters: 'Chapters 2 & 3: Microprocessor Architecture & Demultiplexing',
          pages: 'pp. 25–68',
          keyConcepts: ['Demultiplexing AD0-AD7 using 74LS373 latch and ALE pulse', 'Status signals IO/M_bar, S1, S0 (Opcode fetch: 0, 1, 1; Mem Read: 0, 1, 0)', 'Flags register: S, Z, AC (aux carry for DAA), P (even parity), CY', 'Internal clock frequency f_int = Crystal Frequency / 2']
        }
      },
      { 
        id: 'mp-8085-instr', 
        name: '8085 Instructions, Addressing Modes & Machine Cycles (T-States)', 
        marksWeight: 4.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Microprocessor Architecture with the 8085',
          author: 'Ramesh S. Gaonkar',
          edition: '6th Edition',
          chapters: 'Chapters 5 & 6: Instruction Set & Machine Cycles',
          pages: 'pp. 120–178',
          keyConcepts: ['Addressing Modes: Immediate (MVI), Register (MOV A,B), Direct (LDA), Indirect (MOV A,M)', 'Opcode Fetch machine cycle: 4T states (or 6T for conditional/call)', 'Memory Read / Write: 3T states each', 'Call instruction execution (18T / 5 machine cycles) vs RET (10T / 3 machine cycles)']
        }
      },
      { 
        id: 'mp-8085-interrupt', 
        name: 'Vector Interrupts (TRAP, RST 7.5/6.5/5.5, RST n Formula: n×8)', 
        marksWeight: 4.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Microprocessor Architecture with the 8085',
          author: 'Ramesh S. Gaonkar',
          edition: '6th Edition',
          chapters: 'Chapter 12: Interrupts',
          pages: 'pp. 370–405',
          keyConcepts: ['Vector Address Formula: Vector = (n * 8) in Hexadecimal', 'TRAP (RST 4.5): 4.5 * 8 = 36 = 0024H (Non-maskable, Edge + Level sensitive)', 'RST 7.5: 7.5 * 8 = 60 = 003CH (Maskable, Edge sensitive only)', 'SIM word layout (D0: M5.5, D1: M6.5, D2: M7.5, D3: MSE, D4: R7.5) & RIM layout']
        }
      },
      { 
        id: 'mp-8085-interfacing', 
        name: 'Address Decoding (74LS138) & 8255 PPI (Mode 0, 1, 2, BSR)', 
        marksWeight: 3.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Microprocessor Architecture with the 8085',
          author: 'Ramesh S. Gaonkar',
          edition: '6th Edition',
          chapters: 'Chapters 4 & 15: Interfacing I/O Devices & 8255 PPI',
          pages: 'pp. 85–118, 450–485',
          keyConcepts: ['74LS138 3-to-8 decoder chip-select calculation', 'I/O mapped I/O (8-bit port address, IN/OUT instructions) vs Memory mapped I/O (16-bit address)', '8255 Control Word: D7=1 for I/O mode, D7=0 for BSR (Bit Set/Reset) mode', 'Mode 0: Simple I/O, Mode 1: Strobed I/O with handshake, Mode 2: Bidirectional']
        }
      },
      { 
        id: 'mp-8086-arch', 
        name: '8086 Microprocessor: BIU/EU, Segmentation & Pipelining Basics', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Microprocessors and Interfacing: Programming and Hardware',
          author: 'Douglas V. Hall',
          edition: '3rd Edition (McGraw Hill)',
          chapters: 'Chapters 2 & 3: 8086 Architecture & Assembly',
          pages: 'pp. 35–82',
          keyConcepts: ['Bus Interface Unit (BIU) with 6-byte instruction prefetch queue', 'Execution Unit (EU) with ALU and general registers', 'Memory Segmentation: CS, DS, SS, ES (each 64 KB segment)', '20-bit Physical Address calculation: (Segment Register * 10H) + Offset']
        }
      },
    ]
  },
  {
    id: 'analog',
    name: 'Analog Circuits & Op-Amps',
    shortCode: 'AC',
    totalMarksRange: '8 – 9 Marks',
    targetMarks: 8.5,
    priorityTier: 'Tier 1 (High Yield / Fast Marks)',
    phase: 2,
    color: '#e11d48',
    examSection: 'Test II',
    topics: [
      { 
        id: 'ac-diodes', 
        name: 'Diode Circuits: Clippers, Clampers, Rectifiers & Zener Regulators', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Electronic Devices and Circuit Theory',
          author: 'Robert L. Boylestad & Louis Nashelsky',
          edition: '11th Edition (Pearson)',
          chapters: 'Chapter 2: Diode Applications',
          pages: 'pp. 55–115',
          keyConcepts: ['Clipping circuits (series/parallel with DC reference bias)', 'Clamping circuits: V_peak-to-peak preserved, shifted by reference level', 'Full-wave bridge rectifier ripple factor r = 1 / (4*sqrt(3)*f*R_L*C)', 'Zener diode voltage regulation criteria: I_Zmin <= I_Z <= I_Zmax']
        }
      },
      { 
        id: 'ac-bjt-mosfet', 
        name: 'BJT & MOSFET Biasing, Small Signal Amplifiers & AC Analysis', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Electronic Devices and Circuit Theory',
          author: 'Boylestad & Nashelsky',
          edition: '11th Edition',
          chapters: 'Chapters 5, 7 & 8: BJT & FET Small-Signal Analysis',
          pages: 'pp. 240–310, 360–425',
          keyConcepts: ['Common Emitter voltage gain: A_v = -g_m * R_C || R_L (with r_e = 26mV / I_E)', 'Stability factor S for voltage divider bias', 'MOSFET transconductance: g_m = 2*I_D / (V_GS - V_th) = sqrt(2*mu*C_ox*(W/L)*I_D)', 'Miller Theorem: input capacitance C_in = C_f * (1 - A_v)']
        }
      },
      { 
        id: 'ac-opamp', 
        name: 'Operational Amplifiers: Linear/Non-linear, Schmitt Trigger & Timers', 
        marksWeight: 3.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 30, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Design with Operational Amplifiers and Analog Integrated Circuits',
          author: 'Sergio Franco',
          edition: '4th Edition (McGraw Hill)',
          chapters: 'Chapters 1, 2 & 10: Op-Amps & Comparators',
          pages: 'pp. 1–95, 480–525',
          keyConcepts: ['Virtual short concept (V+ = V- when negative feedback is present)', 'Inverting amplifier gain A_v = -R_f / R_1; Non-inverting gain A_v = 1 + R_f / R_1', 'Inverting Schmitt Trigger threshold voltages: V_UT = +V_sat * R_1 / (R_1 + R_2), V_LT = -V_sat * R_1 / (R_1 + R_2)', 'Hysteresis width: Delta V_H = V_UT - V_LT']
        }
      },
      { 
        id: 'ac-feedback', 
        name: 'Feedback Amplifiers, Oscillators & 555 Timers', 
        marksWeight: 1.5, 
        isHighYield: false, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false, 
        isEmbeddedCore: true,
        bookRef: {
          bookTitle: 'Design with Operational Amplifiers and Analog Integrated Circuits',
          author: 'Sergio Franco',
          edition: '4th Edition',
          chapters: 'Chapters 8 & 11: Feedback, Oscillators & Timers',
          pages: 'pp. 380–435, 525–550',
          keyConcepts: ['Barkhausen Criterion for Oscillation: loop gain |A*beta| = 1, phase shift = 0 or 360 deg', 'Wien Bridge oscillator frequency f_0 = 1 / (2*pi*R*C), required gain A_v = 3', '555 Astable multivibrator frequency: f = 1.44 / [(R_A + 2*R_B)*C]', '555 Astable duty cycle: D = (R_A + R_B) / (R_A + 2*R_B)']
        }
      },
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
      { 
        id: 'edc-semi', 
        name: 'Semiconductor Physics: Carrier Transport, Drift/Diffusion, Einstein Relation', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Semiconductor Physics and Devices: Basic Principles',
          author: 'Donald A. Neamen',
          edition: '4th Edition (McGraw Hill)',
          chapters: 'Chapters 4 & 5: State of Silicon & Carrier Transport',
          pages: 'pp. 125–185',
          keyConcepts: ['Mass action law: n * p = n_i^2', 'Total current density: J = q*(n*mu_n + p*mu_p)*E + q*D_n*(dn/dx) - q*D_p*(dp/dx)', 'Einstein Relation: D_n / mu_n = D_p / mu_p = k*T / q = V_t', 'Direct (GaAs, photon emitted) vs Indirect (Si, Ge, phonon heat) bandgap']
        }
      },
      { 
        id: 'edc-pn', 
        name: 'PN Junction Diode: Depletion Width, Capacitances (CT, CD) & Breakdown', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Semiconductor Physics and Devices',
          author: 'Donald A. Neamen',
          edition: '4th Edition',
          chapters: 'Chapters 7 & 8: The PN Junction & Diode',
          pages: 'pp. 235–310',
          keyConcepts: ['Built-in potential: V_bi = V_t * ln(N_A * N_D / n_i^2)', 'Depletion width: W = sqrt[ (2*epsilon_s / q) * (1/N_A + 1/N_D) * (V_bi + V_R) ]', 'Transition capacitance: C_T = epsilon_s * A / W proportional to (V_bi + V_R)^(-1/2)', 'Zener breakdown (heavily doped, < 5V, negative temp coeff) vs Avalanche breakdown (> 6V, positive temp coeff)']
        }
      },
      { 
        id: 'edc-mos', 
        name: 'MOSFET Physics: MOS Capacitor, Accumulation/Inversion, Threshold Voltage', 
        marksWeight: 3.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 30, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Semiconductor Physics and Devices',
          author: 'Donald A. Neamen',
          edition: '4th Edition',
          chapters: 'Chapters 10 & 11: MOS Capacitor & MOSFET',
          pages: 'pp. 385–465',
          keyConcepts: ['Operating regimes: Accumulation, Depletion, Inversion', 'Threshold voltage condition: surface potential phi_s = 2 * phi_F', 'High-frequency vs Low-frequency C-V curve behavior of MOS capacitor', 'MOSFET current: I_D = mu*C_ox*(W/L)*[(V_GS - V_th)*V_DS - V_DS^2 / 2] (Linear) and (1/2)*mu*C_ox*(W/L)*(V_GS - V_th)^2 (Saturation)']
        }
      },
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
      { 
        id: 'comm-analog', 
        name: 'Analog Modulation: AM, DSB-SC, SSB, FM & Carson Rule', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Communication Systems',
          author: 'Simon Haykin & Michael Moher',
          edition: '5th Edition (Wiley)',
          chapters: 'Chapters 2 & 3: Continuous-Wave Modulation (AM & FM)',
          pages: 'pp. 85–215',
          keyConcepts: ['AM power efficiency: eta = mu^2 / (2 + mu^2); Max efficiency = 33.3%', 'DSB-SC generation using Balanced Modulator / Ring Modulator', "Carson's Rule for Wideband FM bandwidth: B = 2*(Delta f + f_m) = 2*(1 + beta)*f_m", 'Hilbert Transform 90 degree phase shift for SSB-SC: s(t) = m(t)*cos(w_c t) - m_hat(t)*sin(w_c t)']
        }
      },
      { 
        id: 'comm-random', 
        name: 'Random Processes: Autocorrelation, PSD, White Noise, Filter Response', 
        marksWeight: 2.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 25, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Communication Systems',
          author: 'Simon Haykin',
          edition: '5th Edition',
          chapters: 'Chapter 1: Random Processes & Noise',
          pages: 'pp. 35–84',
          keyConcepts: ['Wiener-Khinchin theorem: Autocorrelation R_X(tau) <-> Power Spectral Density S_X(f)', 'White Noise PSD: S_W(f) = N_0 / 2 for all frequencies', 'Output PSD of LTI filter: S_Y(f) = |H(f)|^2 * S_X(f)', 'Output power: E[Y^2(t)] = R_Y(0) = integral S_Y(f) df']
        }
      },
      { 
        id: 'comm-digital', 
        name: 'Digital Comm: PCM, DPCM, Matched Filter, BER of BPSK/QPSK', 
        marksWeight: 3.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 30, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Communication Systems',
          author: 'Simon Haykin',
          edition: '5th Edition',
          chapters: 'Chapters 7 & 8: Digital Transmission & Passband Modulation',
          pages: 'pp. 410–510',
          keyConcepts: ['PCM Signal to Quantization Noise Ratio: SNR = 6.02*n + 1.76 dB (n = number of bits)', 'Matched Filter impulse response: h(t) = s(T - t); Maximum output SNR = 2*E / N_0', 'Bit Error Rate of BPSK: P_e = Q(sqrt(2*E_b / N_0))', 'QPSK: same BER as BPSK but occupies half the bandwidth']
        }
      },
      { 
        id: 'comm-info', 
        name: 'Information Theory: Entropy, Mutual Information & Shannon Capacity', 
        marksWeight: 1.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 15, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Communication Systems',
          author: 'Simon Haykin',
          edition: '5th Edition',
          chapters: 'Chapter 9: Information Theory',
          pages: 'pp. 520–575',
          keyConcepts: ['Entropy: H(X) = - Sum [p_i * log2(p_i)]; Max entropy = log2(M) for equiprobable symbols', 'Shannon Hartley Channel Capacity: C = B * log2(1 + S/N) bits/sec', 'Capacity with infinite bandwidth: C_inf = 1.44 * (S / N_0)']
        }
      },
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
      { 
        id: 'emtl-tlines', 
        name: 'Transmission Lines: Characteristic Impedance, SWR, Reflection & Smith Chart', 
        marksWeight: 3.5, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 30, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Elements of Electromagnetics',
          author: 'Matthew N.O. Sadiku',
          edition: '7th Edition (Oxford University Press)',
          chapters: 'Chapter 11: Transmission Lines',
          pages: 'pp. 480–545',
          keyConcepts: ['Characteristic Impedance lossless: Z_0 = sqrt(L / C)', 'Reflection coefficient: Gamma = (Z_L - Z_0) / (Z_L + Z_0)', 'Standing Wave Ratio: SWR = (1 + |Gamma|) / (1 - |Gamma|)', 'Quarter-wave transformer: Z_in = Z_0^2 / Z_L; Half-wave line: Z_in = Z_L']
        }
      },
      { 
        id: 'emtl-waves', 
        name: 'Uniform Plane Waves: Poynting Vector, Polarization & Skin Depth', 
        marksWeight: 2.0, 
        isHighYield: true, 
        theoryCompleted: false, 
        pyqsSolvedCount: 0, 
        targetPyqs: 20, 
        formulaCardAdded: false, 
        errorLogged: false,
        bookRef: {
          bookTitle: 'Elements of Electromagnetics',
          author: 'Matthew N.O. Sadiku',
          edition: '7th Edition',
          chapters: 'Chapter 10: Electromagnetic Waves',
          pages: 'pp. 420–475',
          keyConcepts: ['Intrinsic Impedance: eta = sqrt(mu / epsilon); Free space eta_0 = 120*pi = 377 ohms', 'Poynting Vector: S = E x H (Time average S_avg = 0.5 * Re[E x H^*])', 'Skin depth: delta = 1 / sqrt(pi * f * mu * sigma)', 'Polarization: Linear (phase difference 0 or 180), Circular (equal magnitude, 90 deg phase), Elliptical']
        }
      },
    ]
  }
];

// Retain legacy day plans for backward compatibility
export const INITIAL_DAY_PLANS: DayPlan[] = [
  { dayNumber: 1, weekNumber: 1, subjectId: 'math', topicTitle: 'Day 1: Matrix Algebra, Determinants & Trace Theorems', targetMarksValue: 1.0, theoryTarget: 'Properties of Det, Trace, Orthogonal & Hermitian Matrices', pyqTargetCount: 15, retentionFocus: 'Add 1-page formula card on Matrix operations', isCompleted: false, isMvd: false },
  { dayNumber: 2, weekNumber: 1, subjectId: 'math', topicTitle: 'Day 2: Rank, Nullity & Linear Independence', targetMarksValue: 1.5, theoryTarget: 'Row operations, Rank theorem, Subadditivity Rank(A+B)', pyqTargetCount: 18, retentionFocus: 'Log 3-line error summary on Rank traps', isCompleted: false, isMvd: false },
  { dayNumber: 3, weekNumber: 1, subjectId: 'math', topicTitle: 'Day 3: System of Equations & Augmented Matrices', targetMarksValue: 1.5, theoryTarget: 'Homogeneous & Non-homogeneous, Unique/Infinite/No solution', pyqTargetCount: 20, retentionFocus: 'Create consistency conditions flowchart', isCompleted: false, isMvd: false },
  { dayNumber: 4, weekNumber: 1, subjectId: 'math', topicTitle: 'Day 4: Eigenvalues & Cayley-Hamilton Theorem', targetMarksValue: 2.0, theoryTarget: 'Characteristic Eq, Cayley-Hamilton inverse & high power matrix', pyqTargetCount: 20, retentionFocus: 'Practice 5 rapid Cayley-Hamilton short-cuts', isCompleted: false, isMvd: false }
];

export const BITS_HD_SUBJECTS = GATE_ECE_SUBJECTS;
