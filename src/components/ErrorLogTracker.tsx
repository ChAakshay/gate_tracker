import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GATE_ECE_SUBJECTS } from '../data/syllabusData';
import { MathView } from './MathView';
import { 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Sparkles, 
  Tag, 
  Filter, 
  Brain, 
  Calculator, 
  Glasses, 
  BookCheck, 
  Zap, 
  Copy, 
  Check, 
  Flame,
  ArrowRight,
  TrendingDown,
  X
} from 'lucide-react';

export interface ErrorEntry {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  topic: string;
  type: 'conceptual' | 'calculation' | 'reading' | 'formula';
  date: string;
  misconception: string;
  truth: string;
  safeguard: string;
  status: 'active' | 'cured';
  timesReviewed: number;
}

// Flat list of all syllabus subtopics for intelligent autocomplete
interface SyllabusTopicFlat {
  topicName: string;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  marksWeight: number;
}

// Pre-built Quick Fill Cognitive Templates
const QUICK_TEMPLATES = [
  {
    label: '⚡ GM vs AM Trap',
    subjectId: 'math',
    topic: 'Eigenvalues, Eigenvectors & Cayley-Hamilton',
    type: 'conceptual' as const,
    misconception: 'Assumed Geometric Multiplicity (GM) equals Algebraic Multiplicity (AM).',
    truth: 'GM = n - rank(A - λI). GM ≤ AM always; it only equals AM if matrix is diagonalizable.',
    safeguard: 'Always compute nullity of (A - λI) explicitly when matrix has non-zero off-diagonals.'
  },
  {
    label: '🔢 RMS / Radian Unit Slip',
    subjectId: 'networks',
    topic: 'Sinusoidal Steady State, Phasors & Resonance (Series/Parallel)',
    type: 'calculation' as const,
    misconception: 'Plugging frequency in Hz directly into ω without multiplying by 2π.',
    truth: 'ω = 2πf (rad/s), and Peak = √2 × V_rms.',
    safeguard: 'Underline input units (Hz vs rad/s, ms vs s) in the question stem before calculating.'
  },
  {
    label: '🎯 ROC & Causality Trap',
    subjectId: 'signals',
    topic: 'Laplace Transform, Z-Transform & ROC Properties',
    type: 'conceptual' as const,
    misconception: 'Determined stability solely from pole locations without verifying the ROC region.',
    truth: 'System is BIBO stable iff the ROC includes the imaginary axis (s-plane) or unit circle (z-plane).',
    safeguard: 'Never conclude stability from poles alone without drawing the full ROC.'
  },
  {
    label: '⚠️ "NOT / INCORRECT" Missed',
    subjectId: 'aptitude',
    topic: 'Verbal: Grammar, Vocabulary, Critical Reasoning & Reading Comprehension',
    type: 'reading' as const,
    misconception: 'Selected the TRUE statement when the question explicitly asked for the INCORRECT one.',
    truth: 'Negative questions require finding the false exception.',
    safeguard: 'Circle words like NOT, EXCEPT, INCORRECT, FALSE during first pass.'
  },
  {
    label: '📐 Carson\'s Rule FM Bandwidth',
    subjectId: 'comm',
    topic: 'Analog Modulation: AM, DSB-SC, SSB, FM & Carson Rule',
    type: 'formula' as const,
    misconception: 'Used Bandwidth = 2Δf instead of Carson\'s full approximation.',
    truth: 'BW = 2(Δf + f_m) = 2f_m(1 + β).',
    safeguard: 'Write out the full bandwidth equation with modulating frequency included.'
  },
  {
    label: '⚡ 8085 TRAP Vector Address Slip',
    subjectId: 'microprocessors',
    topic: 'Vector Interrupts (TRAP, RST 7.5/6.5/5.5, RST n Formula: n×8)',
    type: 'calculation' as const,
    misconception: 'Calculated TRAP (RST 4.5) vector in decimal (36) and wrote 0036H instead of 0024H.',
    truth: 'Vector address is (4.5 × 8) = 36 in decimal, which equals 0024H in hexadecimal.',
    safeguard: 'Always convert the decimal product (n × 8) to Hex (36 / 16 = 2 rem 4 => 0024H).'
  }
];

export const ErrorLogTracker: React.FC = () => {
  // Flatten syllabus topics for autocomplete
  const allSyllabusTopics: SyllabusTopicFlat[] = useMemo(() => {
    const list: SyllabusTopicFlat[] = [];
    GATE_ECE_SUBJECTS.forEach(sub => {
      sub.topics.forEach(top => {
        list.push({
          topicName: top.name,
          subjectId: sub.id,
          subjectName: sub.name,
          subjectColor: sub.color,
          marksWeight: top.marksWeight
        });
      });
    });
    return list;
  }, []);

  // Entries State with local storage sync
  const [entries, setEntries] = useState<ErrorEntry[]>(() => {
    const saved = localStorage.getItem('gate_enhanced_error_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'init-1',
        subjectId: 'math',
        subjectName: 'Engineering Mathematics',
        subjectColor: '#3b82f6',
        topic: 'Eigenvalues, Eigenvectors & Cayley-Hamilton',
        type: 'conceptual',
        date: '2026-08-25',
        misconception: 'Assumed GM equals AM without computing nullity of $(A - \\lambda I)$.',
        truth: 'Geometric multiplicity is $GM = n - \\text{rank}(A - \\lambda I)$. It measures linearly independent eigenvectors.',
        safeguard: 'Whenever matrix has non-diagonal entries, compute $\\text{rank}(A - \\lambda I)$ directly before assigning GM.',
        status: 'active',
        timesReviewed: 1
      },
      {
        id: 'init-2',
        subjectId: 'networks',
        subjectName: 'Network Theory',
        subjectColor: '#8b5cf6',
        topic: 'Transient Analysis in First & Second Order Circuits (RL, RC, RLC)',
        type: 'calculation',
        date: '2026-08-24',
        misconception: 'Used capacitor voltage $v(0^+) = 0$ in a circuit with pre-charged initial condition.',
        truth: 'Capacitor resists sudden change in voltage: $v_C(0^+) = v_C(0^-) = V_0$.',
        safeguard: 'Always write down the state variable value at $t = 0^-$ explicitly as step 1.',
        status: 'cured',
        timesReviewed: 3
      }
    ];
  });

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [topicInput, setTopicInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<{ id: string; name: string; color: string }>({
    id: 'math',
    name: 'Engineering Mathematics',
    color: '#3b82f6'
  });
  const [errorType, setErrorType] = useState<'conceptual' | 'calculation' | 'reading' | 'formula'>('calculation');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  
  // Autocomplete UI State
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'cured'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Save to localStorage
  const persistEntries = (newEntries: ErrorEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('gate_enhanced_error_logs', JSON.stringify(newEntries));
  };

  // Close autocomplete on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setIsAutocompleteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyword dictionary for instant real-time subject detection on typing
  const KEYWORD_SUBJECT_MAP: Record<string, string> = {
    'eigen': 'math', 'matrix': 'math', 'matrices': 'math', 'determinant': 'math', 'rank': 'math', 'calculus': 'math', 'differential': 'math', 'integral': 'math', 'taylor': 'math', 'gradient': 'math', 'divergence': 'math', 'curl': 'math', 'green': 'math', 'stokes': 'math', 'gauss': 'math', 'complex': 'math', 'residue': 'math', 'cauchy': 'math', 'probability': 'math', 'bayes': 'math', 'linear algebra': 'math',
    'verbal': 'aptitude', 'grammar': 'aptitude', 'vocab': 'aptitude', 'reading': 'aptitude', 'quant': 'aptitude', 'ratio': 'aptitude', 'speed': 'aptitude', 'spatial': 'aptitude', 'percentage': 'aptitude', 'geometry': 'aptitude', 'english': 'aptitude',
    'kcl': 'networks', 'kvl': 'networks', 'thevenin': 'networks', 'norton': 'networks', 'superposition': 'networks', 'transient': 'networks', 'rlc': 'networks', 'rc': 'networks', 'rl': 'networks', 'phasor': 'networks', 'resonance': 'networks', 'two port': 'networks', 'two-port': 'networks', 'impedance': 'networks', 'mesh': 'networks', 'nodal': 'networks', 'time constant': 'networks',
    'fourier': 'signals', 'ctft': 'signals', 'dtft': 'signals', 'dft': 'signals', 'laplace': 'signals', 'z-transform': 'signals', 'z transform': 'signals', 'roc': 'signals', 'convolution': 'signals', 'lti': 'signals', 'sampling': 'signals', 'nyquist rate': 'signals', 'impulse response': 'signals', 'discrete': 'signals',
    'transfer function': 'control', 'bode': 'control', 'nyquist plot': 'control', 'nyquist': 'control', 'routh': 'control', 'root locus': 'control', 'gain margin': 'control', 'phase margin': 'control', 'state space': 'control', 'controllability': 'control', 'observability': 'control', 'block diagram': 'control', 'mason': 'control', 'signal flow': 'control', 'overshoot': 'control', 'settling time': 'control', 'damping': 'control',
    'boolean': 'digital', 'kmap': 'digital', 'k-map': 'digital', 'logic gate': 'digital', 'mux': 'digital', 'multiplexer': 'digital', 'decoder': 'digital', 'encoder': 'digital', 'adder': 'digital', 'flip flop': 'digital', 'flip-flop': 'digital', 'latch': 'digital', 'counter': 'digital', 'shift register': 'digital', 'fsm': 'digital', 'setup time': 'digital', 'hold time': 'digital',
    'diode': 'analog', 'clipper': 'analog', 'clamper': 'analog', 'rectifier': 'analog', 'zener': 'analog', 'bjt': 'analog', 'op-amp': 'analog', 'opamp': 'analog', 'operational amplifier': 'analog', 'schmitt': 'analog', 'feedback amplifier': 'analog', 'oscillator': 'analog', '555': 'analog', 'timer': 'analog', 'small signal': 'analog',
    'semiconductor': 'edc', 'drift': 'edc', 'diffusion': 'edc', 'carrier': 'edc', 'pn junction': 'edc', 'depletion': 'edc', 'built-in': 'edc', 'mosfet': 'edc', 'mos capacitor': 'edc', 'threshold voltage': 'edc', 'inversion': 'edc', 'fermi': 'edc', 'energy band': 'edc',
    'am': 'comm', 'fm': 'comm', 'pm': 'comm', 'dsb': 'comm', 'ssb': 'comm', 'carson': 'comm', 'pcm': 'comm', 'dpcm': 'comm', 'bpsk': 'comm', 'qpsk': 'comm', 'qam': 'comm', 'matched filter': 'comm', 'ber': 'comm', 'snr': 'comm', 'noise': 'comm', 'entropy': 'comm', 'shannon': 'comm', 'modulation': 'comm', 'constellation': 'comm',
    'transmission line': 'emtl', 'smith chart': 'emtl', 'smith': 'emtl', 'swr': 'emtl', 'reflection coefficient': 'emtl', 'poynting': 'emtl', 'plane wave': 'emtl', 'skin depth': 'emtl', 'polarization': 'emtl', 'waveguide': 'emtl', 'maxwell': 'emtl'
  };

  const handleTopicType = (val: string) => {
    setTopicInput(val);
    setIsAutocompleteOpen(true);
    if (!val.trim()) return;

    const q = val.toLowerCase().trim();
    const directMatch = allSyllabusTopics.find(t => 
      t.topicName.toLowerCase().includes(q) || q.includes(t.topicName.toLowerCase())
    );

    if (directMatch) {
      setSelectedSubject({ id: directMatch.subjectId, name: directMatch.subjectName, color: directMatch.subjectColor });
      return;
    }

    for (const [kw, sId] of Object.entries(KEYWORD_SUBJECT_MAP)) {
      if (q.includes(kw)) {
        const sub = GATE_ECE_SUBJECTS.find(s => s.id === sId);
        if (sub) {
          setSelectedSubject({ id: sub.id, name: sub.name, color: sub.color });
          return;
        }
      }
    }
  };

  // Filtered Autocomplete Suggestions based on topicInput
  const autocompleteSuggestions = useMemo(() => {
    if (!topicInput.trim()) return allSyllabusTopics.slice(0, 6);
    const q = topicInput.toLowerCase();
    return allSyllabusTopics
      .filter(t => t.topicName.toLowerCase().includes(q) || t.subjectName.toLowerCase().includes(q))
      .slice(0, 7);
  }, [topicInput, allSyllabusTopics]);

  // Handle Autocomplete Selection
  const selectTopicSuggestion = (sug: SyllabusTopicFlat) => {
    setTopicInput(sug.topicName);
    setSelectedSubject({
      id: sug.subjectId,
      name: sug.subjectName,
      color: sug.subjectColor
    });
    setIsAutocompleteOpen(false);
  };

  // Apply Quick Template
  const applyTemplate = (tpl: typeof QUICK_TEMPLATES[0]) => {
    const sub = GATE_ECE_SUBJECTS.find(s => s.id === tpl.subjectId);
    setTopicInput(tpl.topic);
    setSelectedSubject({
      id: tpl.subjectId,
      name: sub?.name || 'Subject',
      color: sub?.color || '#3b82f6'
    });
    setErrorType(tpl.type);
    setLine1(tpl.misconception);
    setLine2(tpl.truth);
    setLine3(tpl.safeguard);
    setIsFormOpen(true);
  };

  // Add Error Handler
  const handleAddError = () => {
    if (!topicInput.trim() || !line1.trim() || !line2.trim()) return;

    const newEntry: ErrorEntry = {
      id: Date.now().toString(),
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.name,
      subjectColor: selectedSubject.color,
      topic: topicInput.trim(),
      type: errorType,
      date: new Date().toISOString().split('T')[0],
      misconception: line1.trim(),
      truth: line2.trim(),
      safeguard: line3.trim() || 'Review before subject mock test.',
      status: 'active',
      timesReviewed: 0
    };

    persistEntries([newEntry, ...entries]);
    resetForm();
  };

  const resetForm = () => {
    setIsFormOpen(false);
    setTopicInput('');
    setLine1('');
    setLine2('');
    setLine3('');
  };

  // Toggle Cured / Active
  const toggleStatus = (id: string) => {
    const updated = entries.map(e => {
      if (e.id !== id) return e;
      const nextStatus = e.status === 'active' ? 'cured' : 'active';
      return {
        ...e,
        status: nextStatus as 'active' | 'cured',
        timesReviewed: e.timesReviewed + 1
      };
    });
    persistEntries(updated);
  };

  // Increment Review Counter
  const incrementReview = (id: string) => {
    const updated = entries.map(e => {
      if (e.id !== id) return e;
      return { ...e, timesReviewed: e.timesReviewed + 1 };
    });
    persistEntries(updated);
  };

  const handleDelete = (id: string) => {
    persistEntries(entries.filter(e => e.id !== id));
  };

  // Copy Clean Markdown
  const copyEntryMarkdown = (entry: ErrorEntry) => {
    const md = `### 🚨 [${entry.type.toUpperCase()}] ${entry.topic} (${entry.subjectName})\n- **1. Misconception**: ${entry.misconception}\n- **2. Truth**: ${entry.truth}\n- **3. Safeguard**: ${entry.safeguard}\n*Logged on: ${entry.date}*`;
    navigator.clipboard.writeText(md);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered & Searched Entries
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText = 
          entry.topic.toLowerCase().includes(q) ||
          entry.subjectName.toLowerCase().includes(q) ||
          entry.misconception.toLowerCase().includes(q) ||
          entry.truth.toLowerCase().includes(q) ||
          entry.safeguard.toLowerCase().includes(q);
        if (!matchesText) return false;
      }
      // Subject Filter
      if (selectedSubjectFilter !== 'all' && entry.subjectId !== selectedSubjectFilter) {
        return false;
      }
      // Type Filter
      if (selectedTypeFilter !== 'all' && entry.type !== selectedTypeFilter) {
        return false;
      }
      // Status Filter
      if (statusFilter !== 'all' && entry.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [entries, searchQuery, selectedSubjectFilter, selectedTypeFilter, statusFilter]);

  // Analytics
  const stats = useMemo(() => {
    const total = entries.length;
    const active = entries.filter(e => e.status === 'active').length;
    const cured = entries.filter(e => e.status === 'cured').length;
    const calcCount = entries.filter(e => e.type === 'calculation').length;
    const conceptCount = entries.filter(e => e.type === 'conceptual').length;
    const readCount = entries.filter(e => e.type === 'reading').length;
    const formulaCount = entries.filter(e => e.type === 'formula').length;

    // Top Leakage Type
    const typeCounts = [
      { name: 'Calculation Slips', count: calcCount },
      { name: 'Conceptual Gaps', count: conceptCount },
      { name: 'Reading Oversights', count: readCount },
      { name: 'Formula Errors', count: formulaCount }
    ];
    typeCounts.sort((a, b) => b.count - a.count);
    const topLeakage = total > 0 ? typeCounts[0] : { name: 'None', count: 0 };

    return { total, active, cured, calcCount, conceptCount, readCount, formulaCount, topLeakage };
  }, [entries]);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'conceptual': return { color: 'bg-purple-950/60 border-purple-500/40 text-purple-300', icon: Brain, label: 'Conceptual Gap' };
      case 'calculation': return { color: 'bg-red-950/60 border-red-500/40 text-red-300', icon: Calculator, label: 'Calculation Slip' };
      case 'reading': return { color: 'bg-amber-950/60 border-amber-500/40 text-amber-300', icon: Glasses, label: 'Reading Oversight' };
      default: return { color: 'bg-blue-950/60 border-blue-500/40 text-blue-300', icon: BookCheck, label: 'Formula Recall' };
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* 🚀 Top Intelligence Dashboard */}
      <div className="bg-[#141824] border border-[#1e2638] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#e0b579] text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-[#e0b579]" />
              <span>Cognitive Trap Intelligence System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3-Line Error Log & Analytics
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Never lose marks twice to the same cognitive or calculation trap. Type any syllabus keyword for smart autofill.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-6 py-3 rounded-2xl bg-[#3b69a1] hover:bg-[#4a7cb8] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-[#3b69a1]/20 transition-all active:scale-95 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Log New Mistake</span>
          </button>
        </div>

        {/* 📊 Leakage Analytics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          
          <div className="bg-[#10141f] border border-[#1e2638] p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Active Errors</div>
            <div className="text-2xl font-bold text-[#e0b579] font-mono mt-1">
              {stats.active} <span className="text-xs font-sans text-slate-500 font-normal">unresolved</span>
            </div>
          </div>

          <div className="bg-[#10141f] border border-[#1e2638] p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Cured / Mastered</div>
            <div className="text-2xl font-bold text-[#7fd2a9] font-mono mt-1">
              {stats.cured} <span className="text-xs font-sans text-slate-500 font-normal">traps</span>
            </div>
          </div>

          <div className="bg-[#10141f] border border-[#1e2638] p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">#1 Leakage Area</div>
            <div className="text-sm font-bold text-rose-300 truncate mt-1.5" title={stats.topLeakage.name}>
              {stats.topLeakage.name}
            </div>
          </div>

          <div className="bg-[#10141f] border border-[#1e2638] p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Taxonomy Split</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-mono">
              <span className="text-[#b0a9db]" title="Conceptual">C:{stats.conceptCount}</span>
              <span className="text-slate-600">•</span>
              <span className="text-rose-300" title="Calculation">M:{stats.calcCount}</span>
              <span className="text-slate-600">•</span>
              <span className="text-[#e0b579]" title="Reading">R:{stats.readCount}</span>
            </div>
          </div>

        </div>

        {/* ⚡ Quick Fill Shortcuts */}
        <div className="pt-2">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#6ba4e8]" />
            <span>Frequent Trap Templates (1-Click Fill):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_TEMPLATES.map((tpl, idx) => (
              <button
                key={idx}
                onClick={() => applyTemplate(tpl)}
                className="px-3 py-1.5 rounded-xl bg-[#10141f] hover:bg-[#181f2f] border border-[#1e2638] text-xs text-slate-300 font-medium transition-all hover:border-slate-500 hover:text-white"
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ✍️ DYNAMIC ADD ERROR MODAL / DRAWER */}
      {isFormOpen && (
        <div className="bg-[#141824] border-2 border-[#3b69a1]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 relative">
          
          <div className="flex items-center justify-between border-b border-[#1e2638] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#3b69a1]/15 text-[#6ba4e8] border border-[#3b69a1]/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Log Topic Mistake (3-Line Protocol)</h2>
                <p className="text-xs text-slate-400">Autofills subject, mark weights, and enforces concise 3-line breakdown</p>
              </div>
            </div>

            <button onClick={resetForm} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a2233]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Row 1: Smart Topic Autocomplete & Subject Picker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 🔍 Autocomplete Input */}
            <div className="relative" ref={autocompleteRef}>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
                <span>Topic Name (Start typing for autocomplete)</span>
                <span className="text-[10px] text-[#6ba4e8] font-normal">GATE ECE Syllabus Connected</span>
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={topicInput}
                  onFocus={() => setIsAutocompleteOpen(true)}
                  onChange={(e) => handleTopicType(e.target.value)}
                  placeholder="e.g. Eigenvalues, Transients, Bode Plot, Op-Amp..."
                  className="w-full bg-[#10141f] border border-[#1e2638] focus:border-[#3b69a1] rounded-xl px-4 py-3 text-xs sm:text-sm text-white outline-none font-medium pr-10"
                />
                <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
              </div>

              {/* Autocomplete Dropdown Menu */}
              {isAutocompleteOpen && autocompleteSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#141824] border border-[#222c40] rounded-2xl shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                  <div className="p-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-[#10141f] border-b border-[#1e2638] px-3">
                    Matching Syllabus Topics
                  </div>
                  {autocompleteSuggestions.map((sug, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectTopicSuggestion(sug)}
                      className="p-3 hover:bg-[#1a2233] cursor-pointer flex items-center justify-between border-b border-[#1e2638] last:border-none transition-colors"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-200">{sug.topicName}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                          <span style={{ color: sug.subjectColor }} className="font-semibold">{sug.subjectName}</span>
                          <span>•</span>
                          <span className="text-[#7fd2a9]">+{sug.marksWeight} Marks</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-[#10141f] text-slate-300 px-2 py-0.5 rounded border border-[#1e2638]">Select</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Subject Indicator / Override */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Connected Subject</label>
              <select
                value={selectedSubject.id}
                onChange={(e) => {
                  const sub = GATE_ECE_SUBJECTS.find(s => s.id === e.target.value);
                  if (sub) {
                    setSelectedSubject({ id: sub.id, name: sub.name, color: sub.color });
                  }
                }}
                className="w-full bg-[#10141f] border border-[#1e2638] rounded-xl px-4 py-3 text-xs sm:text-sm text-white outline-none focus:border-[#3b69a1] font-medium"
              >
                {GATE_ECE_SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.totalMarksRange})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Error Taxonomy Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Error Taxonomy Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'calculation', label: 'Calculation Slip', icon: Calculator, desc: 'Silly math, signs, units' },
                { id: 'conceptual', label: 'Conceptual Gap', icon: Brain, desc: 'Theory or condition missed' },
                { id: 'reading', label: 'Reading Oversight', icon: Glasses, desc: 'Missed NOT/Rad/Units' },
                { id: 'formula', label: 'Formula Error', icon: BookCheck, desc: 'Forgot formula structure' },
              ].map(item => {
                const Icon = item.icon;
                const isSel = errorType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setErrorType(item.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSel 
                        ? 'bg-[#3b69a1]/20 border-[#3b69a1] text-white shadow-sm' 
                        : 'bg-[#10141f] border-[#1e2638] text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${isSel ? 'text-[#6ba4e8]' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold">{item.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: The 3-Line Input Fields (KaTeX supported) */}
          <div className="space-y-3.5 bg-[#10141f] p-5 rounded-2xl border border-[#1e2638]">
            <div className="text-xs font-bold text-[#6ba4e8] uppercase tracking-wider">
              The 3-Line Scientific Breakdown (LaTeX Math $...$ Supported)
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                Line 1: What was my exact misconception / error?
              </label>
              <input
                type="text"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                placeholder="e.g. Assumed GM equals AM without computing nullity of (A - λI)"
                className="w-full bg-[#141824] border border-[#1e2638] rounded-xl p-3 text-xs text-white outline-none focus:border-[#3b69a1]"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                Line 2: What is the exact mathematical truth?
              </label>
              <input
                type="text"
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
                placeholder="e.g. GM = n - rank(A - λI). It represents the number of independent eigenvectors."
                className="w-full bg-[#141824] border border-[#1e2638] rounded-xl p-3 text-xs text-white outline-none focus:border-[#3b69a1]"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                Line 3: Future trigger / cognitive safeguard
              </label>
              <input
                type="text"
                value={line3}
                onChange={(e) => setLine3(e.target.value)}
                placeholder="e.g. Whenever matrix has off-diagonal non-zeros, compute rank(A-λI) explicitly."
                className="w-full bg-[#141824] border border-[#1e2638] rounded-xl p-3 text-xs text-white outline-none focus:border-[#3b69a1]"
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 rounded-xl bg-[#10141f] hover:bg-[#1a2233] text-slate-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddError}
              disabled={!topicInput.trim() || !line1.trim() || !line2.trim()}
              className="px-6 py-2.5 rounded-xl bg-[#3b69a1] hover:bg-[#4a7cb8] disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-[#3b69a1]/20 transition-all"
            >
              Save to Error Repository
            </button>
          </div>

        </div>
      )}

      {/* 🔍 Search & Multi-Filter Bar */}
      <div className="bg-[#141824] border border-[#1e2638] rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic, formula, or concept..."
            className="w-full bg-[#10141f] border border-[#1e2638] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#3b69a1]"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs font-semibold">
          
          {/* Subject Filter */}
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="bg-[#10141f] border border-[#1e2638] rounded-xl px-3 py-2 text-slate-300 outline-none"
          >
            <option value="all">All Subjects</option>
            {GATE_ECE_SUBJECTS.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="bg-[#10141f] border border-[#1e2638] rounded-xl px-3 py-2 text-slate-300 outline-none"
          >
            <option value="all">All Types</option>
            <option value="calculation">Calculation</option>
            <option value="conceptual">Conceptual</option>
            <option value="reading">Reading</option>
            <option value="formula">Formula</option>
          </select>

          {/* Status Filter */}
          <div className="flex bg-[#10141f] border border-[#1e2638] rounded-xl p-1">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${statusFilter === 'all' ? 'bg-[#3b69a1] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${statusFilter === 'active' ? 'bg-[#b5823e] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('cured')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${statusFilter === 'cured' ? 'bg-[#489874] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Cured
            </button>
          </div>

        </div>
      </div>

      {/* 📚 Rendered Error Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="bg-[#141824] border border-[#1e2638] rounded-3xl p-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#7fd2a9] mx-auto opacity-70" />
            <div className="text-base font-bold text-slate-200">No matching mistakes found!</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Either your filters are active or you have solved your problems with zero leakage.
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const badge = getTypeBadge(entry.type);
            const Icon = badge.icon;
            const isCured = entry.status === 'cured';

            return (
              <div
                key={entry.id}
                className={`rounded-3xl border transition-all duration-300 p-6 space-y-4 shadow-sm ${
                  isCured
                    ? 'bg-[#101a18] border-[#489874]/40 opacity-85'
                    : 'bg-[#141824] border-[#1e2638] hover:border-slate-700'
                }`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1e2638]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    
                    {/* Subject Pill */}
                    <span 
                      className="px-2.5 py-1 rounded-xl text-xs font-bold border"
                      style={{ 
                        backgroundColor: `${entry.subjectColor}15`, 
                        color: entry.subjectColor, 
                        borderColor: `${entry.subjectColor}35` 
                      }}
                    >
                      {entry.subjectName}
                    </span>

                    {/* Taxonomy Badge */}
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${badge.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{badge.label}</span>
                    </span>

                    {/* Topic Title */}
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {entry.topic}
                    </h3>
                  </div>

                  {/* Actions & Status Pill */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    
                    {/* Cured / Active Toggle Button */}
                    <button
                      onClick={() => toggleStatus(entry.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isCured
                          ? 'bg-[#489874]/20 text-[#7fd2a9] border border-[#489874]/40 hover:bg-[#489874]/30'
                          : 'bg-[#b5823e]/15 text-[#e0b579] border border-[#b5823e]/30 hover:bg-[#b5823e]/25'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isCured ? '✓ Mastered' : 'Needs Review'}</span>
                    </button>

                    {/* Quick Copy Markdown */}
                    <button
                      onClick={() => copyEntryMarkdown(entry)}
                      className="p-2 rounded-xl bg-[#10141f] hover:bg-[#1a2233] text-slate-400 hover:text-white border border-[#1e2638] transition-colors"
                      title="Copy clean markdown summary"
                    >
                      {copiedId === entry.id ? <Check className="w-4 h-4 text-[#7fd2a9]" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 rounded-xl bg-[#10141f] hover:bg-red-950/40 text-slate-500 hover:text-red-300 border border-[#1e2638] transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 3-Line Scientific Content Cards (With KaTeX Math rendering) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Line 1: Misconception */}
                  <div className="bg-[#10141f] p-4 rounded-2xl border border-rose-950/40 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-rose-300 flex items-center gap-1">
                      <span>1. Cognitive Misconception</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed font-sans">
                      <MathView content={entry.misconception} />
                    </div>
                  </div>

                  {/* Line 2: Mathematical Truth */}
                  <div className="bg-[#10141f] p-4 rounded-2xl border border-[#3b69a1]/30 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-[#6ba4e8] flex items-center gap-1">
                      <span>2. Mathematical Truth</span>
                    </div>
                    <div className="text-xs text-slate-200 font-semibold leading-relaxed font-sans">
                      <MathView content={entry.truth} />
                    </div>
                  </div>

                  {/* Line 3: Future Safeguard */}
                  <div className="bg-[#10141f] p-4 rounded-2xl border border-[#b5823e]/30 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-[#e0b579] flex items-center gap-1">
                      <span>3. Future Safeguard</span>
                    </div>
                    <div className="text-xs text-[#e0b579]/90 leading-relaxed font-sans">
                      <MathView content={entry.safeguard} />
                    </div>
                  </div>

                </div>

                {/* Footer Review Meta */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center gap-3">
                    <span>Logged: <strong className="text-slate-400 font-mono">{entry.date}</strong></span>
                    <span>•</span>
                    <span>Reviewed: <strong className="text-slate-300 font-mono">{entry.timesReviewed}x</strong></span>
                  </div>

                  <button
                    onClick={() => incrementReview(entry.id)}
                    className="text-[#6ba4e8] hover:text-[#92bde8] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>+1 Review Touch</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
