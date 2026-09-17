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
      <div className="bg-[#12141c] border border-[#1f2433] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Cognitive Trap Intelligence System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              3-Line Error Log & Analytics
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Never lose marks twice to the same cognitive or calculation trap. Type any syllabus keyword for smart autofill.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-blue-600/30 transition-transform active:scale-95 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Log New Mistake</span>
          </button>
        </div>

        {/* 📊 Leakage Analytics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          
          <div className="bg-[#161a26] border border-[#232a3d] p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Active Errors</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">
              {stats.active} <span className="text-xs font-sans text-slate-500 font-normal">unresolved</span>
            </div>
          </div>

          <div className="bg-[#161a26] border border-[#232a3d] p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Cured / Mastered</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
              {stats.cured} <span className="text-xs font-sans text-slate-500 font-normal">traps</span>
            </div>
          </div>

          <div className="bg-[#161a26] border border-[#232a3d] p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">#1 Leakage Area</div>
            <div className="text-sm font-bold text-red-400 truncate mt-1.5" title={stats.topLeakage.name}>
              {stats.topLeakage.name}
            </div>
          </div>

          <div className="bg-[#161a26] border border-[#232a3d] p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Taxonomy Split</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-mono">
              <span className="text-purple-400" title="Conceptual">C:{stats.conceptCount}</span>
              <span className="text-slate-600">•</span>
              <span className="text-red-400" title="Calculation">M:{stats.calcCount}</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400" title="Reading">R:{stats.readCount}</span>
            </div>
          </div>

        </div>

        {/* ⚡ Quick Fill Shortcuts */}
        <div className="pt-2">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Frequent Trap Templates (1-Click Fill):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_TEMPLATES.map((tpl, idx) => (
              <button
                key={idx}
                onClick={() => applyTemplate(tpl)}
                className="px-3 py-1.5 rounded-xl bg-[#181d2a] hover:bg-[#202738] border border-[#273247] text-xs text-slate-300 font-medium transition-all hover:border-slate-500 hover:text-white"
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ✍️ DYNAMIC ADD ERROR MODAL / DRAWER */}
      {isFormOpen && (
        <div className="bg-gradient-to-b from-[#161a28] to-[#12141e] border-2 border-blue-500/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 relative">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Log Topic Mistake (3-Line Protocol)</h2>
                <p className="text-xs text-slate-400">Autofills subject, mark weights, and enforces concise 3-line breakdown</p>
              </div>
            </div>

            <button onClick={resetForm} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Row 1: Smart Topic Autocomplete & Subject Picker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 🔍 Autocomplete Input */}
            <div className="relative" ref={autocompleteRef}>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
                <span>Topic Name (Start typing for autocomplete)</span>
                <span className="text-[10px] text-blue-400 font-normal">GATE ECE Syllabus Connected</span>
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={topicInput}
                  onFocus={() => setIsAutocompleteOpen(true)}
                  onChange={(e) => handleTopicType(e.target.value)}
                  placeholder="e.g. Eigenvalues, Transients, Bode Plot, Op-Amp..."
                  className="w-full bg-[#0d1017] border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white outline-none font-medium pr-10"
                />
                <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
              </div>

              {/* Autocomplete Dropdown Menu */}
              {isAutocompleteOpen && autocompleteSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#131722] border border-[#2b364c] rounded-2xl shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                  <div className="p-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-[#0f121b] border-b border-slate-800 px-3">
                    Matching Syllabus Topics
                  </div>
                  {autocompleteSuggestions.map((sug, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectTopicSuggestion(sug)}
                      className="p-3 hover:bg-[#1c2233] cursor-pointer flex items-center justify-between border-b border-slate-800/60 last:border-none transition-colors"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-200">{sug.topicName}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                          <span style={{ color: sug.subjectColor }} className="font-semibold">{sug.subjectName}</span>
                          <span>•</span>
                          <span className="text-emerald-400">+{sug.marksWeight} Marks</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Select</span>
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
                className="w-full bg-[#0d1017] border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white outline-none focus:border-blue-500 font-medium"
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
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md' 
                        : 'bg-[#0d1017] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${isSel ? 'text-blue-400' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold">{item.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: The 3-Line Input Fields (KaTeX supported) */}
          <div className="space-y-3.5 bg-[#0d1017] p-5 rounded-2xl border border-slate-800">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
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
                className="w-full bg-[#131722] border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500"
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
                className="w-full bg-[#131722] border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500"
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
                className="w-full bg-[#131722] border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddError}
              disabled={!topicInput.trim() || !line1.trim() || !line2.trim()}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all"
            >
              Save to Error Repository
            </button>
          </div>

        </div>
      )}

      {/* 🔍 Search & Multi-Filter Bar */}
      <div className="bg-[#12141c] border border-[#1f2433] rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic, formula, or concept..."
            className="w-full bg-[#161a26] border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs font-semibold">
          
          {/* Subject Filter */}
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="bg-[#161a26] border border-slate-800 rounded-xl px-3 py-2 text-slate-300 outline-none"
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
            className="bg-[#161a26] border border-slate-800 rounded-xl px-3 py-2 text-slate-300 outline-none"
          >
            <option value="all">All Types</option>
            <option value="calculation">Calculation</option>
            <option value="conceptual">Conceptual</option>
            <option value="reading">Reading</option>
            <option value="formula">Formula</option>
          </select>

          {/* Status Filter */}
          <div className="flex bg-[#161a26] border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${statusFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${statusFilter === 'active' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('cured')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${statusFilter === 'cured' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              Cured
            </button>
          </div>

        </div>
      </div>

      {/* 📚 Rendered Error Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="bg-[#12141c] border border-[#1f2433] rounded-3xl p-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500/60 mx-auto" />
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
                className={`rounded-3xl border transition-all duration-300 p-6 space-y-4 shadow-xl ${
                  isCured
                    ? 'bg-[#10131d]/60 border-emerald-500/30 opacity-80'
                    : 'bg-[#12141c] border-[#1f2433] hover:border-slate-700'
                }`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="flex flex-wrap items-center gap-2.5">
                    
                    {/* Subject Pill */}
                    <span 
                      className="px-2.5 py-1 rounded-xl text-xs font-bold border"
                      style={{ 
                        backgroundColor: `${entry.subjectColor}15`, 
                        color: entry.subjectColor, 
                        borderColor: `${entry.subjectColor}40` 
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
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
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
                          ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isCured ? '✓ Mastered' : 'Needs Review'}</span>
                    </button>

                    {/* Quick Copy Markdown */}
                    <button
                      onClick={() => copyEntryMarkdown(entry)}
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="Copy clean markdown summary"
                    >
                      {copiedId === entry.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-900/40 text-slate-500 hover:text-red-300 transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 3-Line Scientific Content Cards (With KaTeX Math rendering) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Line 1: Misconception */}
                  <div className="bg-[#0b0e15] p-4 rounded-2xl border border-red-950/40 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-red-400 flex items-center gap-1">
                      <span>1. Cognitive Misconception</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed font-sans">
                      <MathView content={entry.misconception} />
                    </div>
                  </div>

                  {/* Line 2: Mathematical Truth */}
                  <div className="bg-[#0b0e15] p-4 rounded-2xl border border-blue-950/40 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-blue-400 flex items-center gap-1">
                      <span>2. Mathematical Truth</span>
                    </div>
                    <div className="text-xs text-slate-200 font-semibold leading-relaxed font-sans">
                      <MathView content={entry.truth} />
                    </div>
                  </div>

                  {/* Line 3: Future Safeguard */}
                  <div className="bg-[#0b0e15] p-4 rounded-2xl border border-amber-950/40 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                      <span>3. Future Safeguard</span>
                    </div>
                    <div className="text-xs text-amber-300/90 leading-relaxed font-sans">
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
                    className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
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
