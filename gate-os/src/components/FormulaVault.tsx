import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GATE_ECE_SUBJECTS } from '../data/syllabusData';
import { useProgressStore } from '../store/useProgressStore';
import { 
  Image as ImageIcon, 
  Upload, 
  Plus, 
  Trash2, 
  Search, 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  X, 
  CheckCircle2, 
  RotateCw, 
  Sparkles, 
  Check, 
  Layers,
  Zap,
  CheckCheck
} from 'lucide-react';

export interface FormulaSheet {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  topicName: string;
  category: 'formula_sheet' | 'short_notes' | 'cheat_sheet' | 'graph_summary';
  imageDataUrl: string;
  dateAdded: string;
  lastReviewed: string;
  reviewCount: number;
  isMastered: boolean;
  notes?: string;
}

// Keyword dictionary for instant real-time subject detection as user types
const KEYWORD_SUBJECT_MAP: Record<string, string> = {
  // Math
  'eigen': 'math', 'matrix': 'math', 'matrices': 'math', 'determinant': 'math', 'rank': 'math', 'calculus': 'math', 'differential': 'math', 'integral': 'math', 'taylor': 'math', 'gradient': 'math', 'divergence': 'math', 'curl': 'math', 'green': 'math', 'stokes': 'math', 'gauss': 'math', 'complex': 'math', 'residue': 'math', 'cauchy': 'math', 'probability': 'math', 'bayes': 'math', 'linear algebra': 'math',
  // Aptitude
  'verbal': 'aptitude', 'grammar': 'aptitude', 'vocab': 'aptitude', 'reading': 'aptitude', 'quant': 'aptitude', 'ratio': 'aptitude', 'speed': 'aptitude', 'spatial': 'aptitude', 'percentage': 'aptitude', 'geometry': 'aptitude', 'english': 'aptitude',
  // Networks
  'kcl': 'networks', 'kvl': 'networks', 'thevenin': 'networks', 'norton': 'networks', 'superposition': 'networks', 'transient': 'networks', 'rlc': 'networks', 'rc': 'networks', 'rl': 'networks', 'phasor': 'networks', 'resonance': 'networks', 'two port': 'networks', 'two-port': 'networks', 'impedance': 'networks', 'mesh': 'networks', 'nodal': 'networks', 'time constant': 'networks',
  // Signals
  'fourier': 'signals', 'ctft': 'signals', 'dtft': 'signals', 'dft': 'signals', 'laplace': 'signals', 'z-transform': 'signals', 'z transform': 'signals', 'roc': 'signals', 'convolution': 'signals', 'lti': 'signals', 'sampling': 'signals', 'nyquist rate': 'signals', 'impulse response': 'signals', 'discrete': 'signals',
  // Control
  'transfer function': 'control', 'bode': 'control', 'nyquist plot': 'control', 'nyquist': 'control', 'routh': 'control', 'root locus': 'control', 'gain margin': 'control', 'phase margin': 'control', 'state space': 'control', 'controllability': 'control', 'observability': 'control', 'block diagram': 'control', 'mason': 'control', 'signal flow': 'control', 'overshoot': 'control', 'settling time': 'control', 'damping': 'control',
  // Digital
  'boolean': 'digital', 'kmap': 'digital', 'k-map': 'digital', 'logic gate': 'digital', 'mux': 'digital', 'multiplexer': 'digital', 'decoder': 'digital', 'encoder': 'digital', 'adder': 'digital', 'flip flop': 'digital', 'flip-flop': 'digital', 'latch': 'digital', 'counter': 'digital', 'shift register': 'digital', 'fsm': 'digital', 'setup time': 'digital', 'hold time': 'digital',
  // Analog
  'diode': 'analog', 'clipper': 'analog', 'clamper': 'analog', 'rectifier': 'analog', 'zener': 'analog', 'bjt': 'analog', 'op-amp': 'analog', 'opamp': 'analog', 'operational amplifier': 'analog', 'schmitt': 'analog', 'feedback amplifier': 'analog', 'oscillator': 'analog', '555': 'analog', 'timer': 'analog', 'small signal': 'analog',
  // EDC
  'semiconductor': 'edc', 'drift': 'edc', 'diffusion': 'edc', 'carrier': 'edc', 'pn junction': 'edc', 'depletion': 'edc', 'built-in': 'edc', 'mosfet': 'edc', 'mos capacitor': 'edc', 'threshold voltage': 'edc', 'inversion': 'edc', 'fermi': 'edc', 'energy band': 'edc', 'direct bandgap': 'edc',
  // Comm
  'am': 'comm', 'fm': 'comm', 'pm': 'comm', 'dsb': 'comm', 'ssb': 'comm', 'carson': 'comm', 'pcm': 'comm', 'dpcm': 'comm', 'bpsk': 'comm', 'qpsk': 'comm', 'qam': 'comm', 'matched filter': 'comm', 'ber': 'comm', 'snr': 'comm', 'noise': 'comm', 'entropy': 'comm', 'shannon': 'comm', 'modulation': 'comm', 'constellation': 'comm',
  // EMTL
  'transmission line': 'emtl', 'smith chart': 'emtl', 'smith': 'emtl', 'swr': 'emtl', 'reflection coefficient': 'emtl', 'poynting': 'emtl', 'plane wave': 'emtl', 'skin depth': 'emtl', 'polarization': 'emtl', 'waveguide': 'emtl', 'maxwell': 'emtl'
};

const SAMPLE_FORMULA_CARDS: FormulaSheet[] = [
  {
    id: 'sample-math-1',
    title: 'Linear Algebra & Eigenvalue Golden Rules',
    subjectId: 'math',
    subjectName: 'Engineering Mathematics',
    subjectColor: '#3b82f6',
    topicName: 'Eigenvalues, Eigenvectors & Cayley-Hamilton',
    category: 'formula_sheet',
    imageDataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="%230f131f">
      <rect width="800" height="600" fill="%230f131f" rx="20"/>
      <rect x="20" y="20" width="760" height="560" fill="%23161c2d" rx="15" stroke="%233b82f6" stroke-width="2"/>
      <text x="50" y="70" fill="%2360a5fa" font-size="24" font-family="sans-serif" font-weight="bold">LINEAR ALGEBRA: EIGENVALUES &amp; MATRICES</text>
      <line x1="50" y1="90" x2="750" y2="90" stroke="%232b3855" stroke-width="2"/>
      <text x="50" y="130" fill="%23ffffff" font-size="18" font-family="monospace">1. Trace(A) = Sum of Eigenvalues (∑ λ_i)</text>
      <text x="50" y="170" fill="%23ffffff" font-size="18" font-family="monospace">2. Det(A)   = Product of Eigenvalues (∏ λ_i)</text>
      <text x="50" y="210" fill="%23ffffff" font-size="18" font-family="monospace">3. Eigenvalues of A^k are (λ_i)^k</text>
      <text x="50" y="250" fill="%23ffffff" font-size="18" font-family="monospace">4. Cayley-Hamilton: Matrix A satisfies its own char. equation: P(A) = 0</text>
      <text x="50" y="290" fill="%23a78bfa" font-size="18" font-family="monospace">5. Geometric Multiplicity (GM) = n - rank(A - λI) &lt;= AM</text>
      <rect x="50" y="330" width="700" height="120" fill="%231f293d" rx="10" stroke="%234b5563"/>
      <text x="70" y="370" fill="%2334d399" font-size="16" font-family="sans-serif" font-weight="bold">★ GOLDEN SHORTCUT FOR 2x2 INVERSE:</text>
      <text x="70" y="410" fill="%23f3f4f6" font-size="16" font-family="monospace">A = [[a,b],[c,d]] =&gt; A^-1 = (1/det) * [[d,-b],[-c,a]]</text>
      <text x="50" y="520" fill="%239ca3af" font-size="14" font-family="sans-serif">GATE ECE High-Yield Card • Phase 1 Review</text>
    </svg>`,
    dateAdded: '2026-08-25',
    lastReviewed: '2026-08-25',
    reviewCount: 2,
    isMastered: false,
    notes: 'Essential for fast 1-mark and 2-mark questions in Week 1.'
  },
  {
    id: 'sample-net-1',
    title: 'Transients & Time Constant Master Card',
    subjectId: 'networks',
    subjectName: 'Network Theory',
    subjectColor: '#8b5cf6',
    topicName: 'Transient Analysis in First & Second Order Circuits (RL, RC, RLC)',
    category: 'cheat_sheet',
    imageDataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="%230f131f">
      <rect width="800" height="600" fill="%230f131f" rx="20"/>
      <rect x="20" y="20" width="760" height="560" fill="%231a162b" rx="15" stroke="%238b5cf6" stroke-width="2"/>
      <text x="50" y="70" fill="%23a78bfa" font-size="24" font-family="sans-serif" font-weight="bold">NETWORK THEORY: TRANSIENTS (RL &amp; RC)</text>
      <line x1="50" y1="90" x2="750" y2="90" stroke="%23372c54" stroke-width="2"/>
      <text x="50" y="140" fill="%23ffffff" font-size="18" font-family="monospace">Standard Response: x(t) = x(∞) + [x(0+) - x(∞)] e^(-t / τ)</text>
      <text x="50" y="190" fill="%23f472b6" font-size="18" font-family="monospace">1. RC Circuit: τ = R_th * C   |   v_c(0+) = v_c(0-)</text>
      <text x="50" y="240" fill="%23f472b6" font-size="18" font-family="monospace">2. RL Circuit: τ = L / R_th   |   i_L(0+) = i_L(0-)</text>
      <rect x="50" y="290" width="700" height="150" fill="%23241d3b" rx="10" stroke="%23583c87"/>
      <text x="70" y="330" fill="%23fbbf24" font-size="16" font-family="sans-serif" font-weight="bold">★ SECOND ORDER RLC DAMPING FACTOR (ξ):</text>
      <text x="70" y="370" fill="%23f3f4f6" font-size="16" font-family="monospace">Series RLC:   ξ = (R / 2) * sqrt(C / L)  |  ω_n = 1 / sqrt(LC)</text>
      <text x="70" y="410" fill="%23f3f4f6" font-size="16" font-family="monospace">Parallel RLC: ξ = (1 / 2R) * sqrt(L / C)</text>
      <text x="50" y="520" fill="%239ca3af" font-size="14" font-family="sans-serif">GATE ECE High-Yield Card • Phase 1 Review</text>
    </svg>`,
    dateAdded: '2026-08-24',
    lastReviewed: '2026-08-25',
    reviewCount: 3,
    isMastered: true,
    notes: 'Memorize Series vs Parallel damping factor inversion!'
  }
];

export const FormulaVault: React.FC = () => {
  const { toggleTopicField } = useProgressStore();

  const [cards, setCards] = useState<FormulaSheet[]>(() => {
    const saved = localStorage.getItem('gate_formula_sheets');
    return saved ? JSON.parse(saved) : SAMPLE_FORMULA_CARDS;
  });

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewCard, setPreviewCard] = useState<FormulaSheet | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Form Inputs
  const [titleInput, setTitleInput] = useState('');
  const [topicInput, setTopicInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<{ id: string; name: string; color: string }>({
    id: 'math',
    name: 'Engineering Mathematics',
    color: '#3b82f6'
  });
  const [category, setCategory] = useState<FormulaSheet['category']>('formula_sheet');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [autoDetected, setAutoDetected] = useState(false);

  // Autocomplete
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [masteryFilter, setMasteryFilter] = useState<'all' | 'needs_review' | 'mastered'>('all');

  const persistCards = (newCards: FormulaSheet[]) => {
    setCards(newCards);
    localStorage.setItem('gate_formula_sheets', JSON.stringify(newCards));
  };

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setIsAutocompleteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const allSyllabusTopics = useMemo(() => {
    const list: { topicName: string; subjectId: string; subjectName: string; subjectColor: string; topicId: string }[] = [];
    GATE_ECE_SUBJECTS.forEach(sub => {
      sub.topics.forEach(top => {
        list.push({
          topicName: top.name,
          topicId: top.id,
          subjectId: sub.id,
          subjectName: sub.name,
          subjectColor: sub.color
        });
      });
    });
    return list;
  }, []);

  // 🧠 AUTOMATIC REAL-TIME SUBJECT DETECTION ON EVERY KEYSTROKE
  const handleTopicInputChange = (val: string) => {
    setTopicInput(val);
    setIsAutocompleteOpen(true);

    if (!val.trim()) {
      setAutoDetected(false);
      return;
    }

    const q = val.toLowerCase().trim();

    // 1. Direct match with syllabus subtopics
    const directMatch = allSyllabusTopics.find(t => 
      t.topicName.toLowerCase().includes(q) || q.includes(t.topicName.toLowerCase())
    );

    if (directMatch) {
      setSelectedSubject({
        id: directMatch.subjectId,
        name: directMatch.subjectName,
        color: directMatch.subjectColor
      });
      setAutoDetected(true);
      return;
    }

    // 2. Keyword dictionary lookup
    for (const [keyword, subId] of Object.entries(KEYWORD_SUBJECT_MAP)) {
      if (q.includes(keyword)) {
        const sub = GATE_ECE_SUBJECTS.find(s => s.id === subId);
        if (sub) {
          setSelectedSubject({ id: sub.id, name: sub.name, color: sub.color });
          setAutoDetected(true);
          return;
        }
      }
    }
  };

  const topicSuggestions = useMemo(() => {
    if (!topicInput.trim()) return allSyllabusTopics.slice(0, 6);
    const q = topicInput.toLowerCase();
    return allSyllabusTopics
      .filter(t => t.topicName.toLowerCase().includes(q) || t.subjectName.toLowerCase().includes(q))
      .slice(0, 7);
  }, [topicInput, allSyllabusTopics]);

  const handleSelectSuggestion = (sug: typeof allSyllabusTopics[0]) => {
    setTopicInput(sug.topicName);
    setSelectedSubject({
      id: sug.subjectId,
      name: sug.subjectName,
      color: sug.subjectColor
    });
    setAutoDetected(true);
    if (!titleInput.trim()) {
      setTitleInput(`${sug.topicName} Formula Sheet`);
    }
    setIsAutocompleteOpen(false);
  };

  const handleFileChange = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);
      if (!titleInput.trim()) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setTitleInput(cleanName);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) handleFileChange(blob);
      }
    }
  };

  const handleSaveCard = () => {
    if (!titleInput.trim() || !imagePreview) return;

    const newCard: FormulaSheet = {
      id: Date.now().toString(),
      title: titleInput.trim(),
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.name,
      subjectColor: selectedSubject.color,
      topicName: topicInput.trim() || 'General Subject Notes',
      category,
      imageDataUrl: imagePreview,
      dateAdded: new Date().toISOString().split('T')[0],
      lastReviewed: new Date().toISOString().split('T')[0],
      reviewCount: 1,
      isMastered: false,
      notes: notesInput.trim()
    };

    persistCards([newCard, ...cards]);

    // Cross-link with Topic Mastery
    const matchedTopic = allSyllabusTopics.find(t => t.topicName.toLowerCase() === topicInput.trim().toLowerCase());
    if (matchedTopic) {
      toggleTopicField(matchedTopic.subjectId, matchedTopic.topicId, 'formulaCardAdded');
    }

    resetForm();
  };

  const resetForm = () => {
    setIsUploadOpen(false);
    setTitleInput('');
    setTopicInput('');
    setImagePreview(null);
    setNotesInput('');
    setAutoDetected(false);
  };

  const toggleMastered = (id: string) => {
    const updated = cards.map(c => {
      if (c.id !== id) return c;
      return { ...c, isMastered: !c.isMastered };
    });
    persistCards(updated);
  };

  const recordReviewTouch = (id: string) => {
    const updated = cards.map(c => {
      if (c.id !== id) return c;
      return {
        ...c,
        reviewCount: c.reviewCount + 1,
        lastReviewed: new Date().toISOString().split('T')[0]
      };
    });
    persistCards(updated);
  };

  const handleDeleteCard = (id: string) => {
    persistCards(cards.filter(c => c.id !== id));
    if (previewCard?.id === id) setPreviewCard(null);
  };

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          card.title.toLowerCase().includes(q) ||
          card.topicName.toLowerCase().includes(q) ||
          card.subjectName.toLowerCase().includes(q) ||
          (card.notes && card.notes.toLowerCase().includes(q));
        if (!matches) return false;
      }
      if (subjectFilter !== 'all' && card.subjectId !== subjectFilter) return false;
      if (categoryFilter !== 'all' && card.category !== categoryFilter) return false;
      if (masteryFilter === 'needs_review' && card.isMastered) return false;
      if (masteryFilter === 'mastered' && !card.isMastered) return false;
      return true;
    });
  }, [cards, searchQuery, subjectFilter, categoryFilter, masteryFilter]);

  const getCategoryLabel = (cat: FormulaSheet['category']) => {
    switch (cat) {
      case 'formula_sheet': return 'Formula Sheet';
      case 'cheat_sheet': return 'Shortcuts / Cheatsheet';
      case 'short_notes': return 'Handwritten Notes';
      case 'graph_summary': return 'Graphs & Waveforms';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#12141c] border border-[#1f2433] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>High-Yield Visual Formula Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Formula Sheets & Short Notes Repository
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
            Upload, categorize, and review your 1-page formula summaries and handwritten snapshots. Typing any topic auto-detects the subject automatically.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-blue-600/30 transition-transform active:scale-95 self-start md:self-center"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Formula Card</span>
        </button>
      </div>

      {/* Search & Multi-Filter Bar */}
      <div className="bg-[#12141c] border border-[#1f2433] rounded-3xl p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-3 shadow-lg">
        
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, formula name, notes..."
            className="w-full bg-[#161a26] border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto text-xs font-semibold">
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="bg-[#161a26] border border-slate-800 rounded-xl px-3 py-2 text-slate-300 outline-none"
          >
            <option value="all">All Subjects</option>
            {GATE_ECE_SUBJECTS.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#161a26] border border-slate-800 rounded-xl px-3 py-2 text-slate-300 outline-none"
          >
            <option value="all">All Card Types</option>
            <option value="formula_sheet">Formula Sheets</option>
            <option value="cheat_sheet">Cheatsheets / Shortcuts</option>
            <option value="short_notes">Handwritten Notes</option>
            <option value="graph_summary">Graphs & Waveforms</option>
          </select>

          <div className="flex bg-[#161a26] border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setMasteryFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${masteryFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              All ({cards.length})
            </button>
            <button
              onClick={() => setMasteryFilter('needs_review')}
              className={`px-3 py-1 rounded-lg transition-colors ${masteryFilter === 'needs_review' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
            >
              Review Queue
            </button>
            <button
              onClick={() => setMasteryFilter('mastered')}
              className={`px-3 py-1 rounded-lg transition-colors ${masteryFilter === 'mastered' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              Mastered
            </button>
          </div>
        </div>
      </div>

      {/* Grid Gallery */}
      {filteredCards.length === 0 ? (
        <div className="bg-[#12141c] border border-[#1f2433] rounded-3xl p-12 text-center space-y-4">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
          <div className="text-base font-bold text-slate-200">No formula sheets found in this filter</div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click "Upload Formula Card" to upload pictures of your short notes or formula sheets.
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" /> Upload First Sheet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCards.map((card) => {
            return (
              <div
                key={card.id}
                className="bg-[#12141c] border border-[#1f2433] hover:border-slate-700 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 group"
              >
                {/* Image Snapshot */}
                <div 
                  className="relative h-48 bg-[#090b10] cursor-pointer overflow-hidden border-b border-slate-800"
                  onClick={() => {
                    setPreviewCard(card);
                    setZoomScale(1);
                    setRotation(0);
                  }}
                >
                  <img
                    src={card.imageDataUrl}
                    alt={card.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                    <span className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" /> Fullscreen View
                    </span>
                  </div>

                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-xl text-[11px] font-bold border backdrop-blur-md shadow-md"
                    style={{
                      backgroundColor: `${card.subjectColor}25`,
                      color: card.subjectColor,
                      borderColor: `${card.subjectColor}50`
                    }}
                  >
                    {card.subjectName}
                  </span>

                  {card.isMastered && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 backdrop-blur-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Mastered
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                      {getCategoryLabel(card.category)}
                    </div>
                    <h3 className="font-extrabold text-base text-white mt-0.5 line-clamp-1 group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {card.topicName}
                    </p>
                    {card.notes && (
                      <p className="text-[11px] text-slate-500 italic mt-1 line-clamp-1">
                        "{card.notes}"
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>Reviewed: <strong className="text-slate-300 font-mono">{card.reviewCount}x</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleMastered(card.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          card.isMastered 
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-600' 
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                        title={card.isMastered ? 'Mark as Needs Review' : 'Mark as Mastered'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-950 border border-slate-700 transition-colors"
                        title="Delete Card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {previewCard && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-xl text-xs font-bold border"
                style={{
                  backgroundColor: `${previewCard.subjectColor}20`,
                  color: previewCard.subjectColor,
                  borderColor: `${previewCard.subjectColor}50`
                }}
              >
                {previewCard.subjectName}
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white leading-tight">{previewCard.title}</h2>
                <p className="text-xs text-slate-400">{previewCard.topicName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomScale(z => Math.max(0.5, z - 0.25))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400 px-1">{Math.round(zoomScale * 100)}%</span>
              <button
                onClick={() => setZoomScale(z => Math.min(3, z + 0.25))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRotation(r => (r + 90) % 360)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Rotate 90°"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewCard(null)}
                className="p-2 rounded-xl bg-red-950 text-red-300 hover:bg-red-900 ml-2"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-auto p-4 select-none">
            <img
              src={previewCard.imageDataUrl}
              alt={previewCard.title}
              style={{
                transform: `scale(${zoomScale}) rotate(${rotation}deg)`,
                transition: 'transform 0.2s ease-out'
              }}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
            <div className="text-slate-400">
              Times Reviewed: <strong className="text-white font-mono">{previewCard.reviewCount}</strong>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  recordReviewTouch(previewCard.id);
                  setPreviewCard({ ...previewCard, reviewCount: previewCard.reviewCount + 1 });
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>+1 Review Touch</span>
              </button>
              <button
                onClick={() => {
                  toggleMastered(previewCard.id);
                  setPreviewCard({ ...previewCard, isMastered: !previewCard.isMastered });
                }}
                className={`px-4 py-2 rounded-xl font-bold border transition-colors ${
                  previewCard.isMastered 
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500' 
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {previewCard.isMastered ? '✓ Mastered' : 'Mark as Mastered'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📤 UPLOAD FORMULA CARD MODAL */}
      {isUploadOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onPaste={handlePaste}
        >
          <div className="bg-[#151924] border-2 border-blue-500/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-400" />
                <h3 className="font-extrabold text-white text-lg">Upload Formula Sheet / Notes</h3>
              </div>
              <button onClick={resetForm} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drop / Paste Zone */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />

              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-[#0c0f16] hover:bg-[#0f131d] rounded-2xl p-8 text-center cursor-pointer transition-all space-y-2 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-white">
                    Click to browse or Drag & Drop image here
                  </div>
                  <p className="text-xs text-slate-500">
                    Supports PNG, JPG, WEBP • <strong className="text-blue-400">Pro-tip: Press Ctrl+V directly to paste screenshot!</strong>
                  </p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-black/60 p-2">
                  <img src={imagePreview} alt="Preview" className="max-h-48 w-full object-contain mx-auto" />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-3 right-3 p-1.5 rounded-xl bg-red-950/80 text-red-300 border border-red-700 hover:bg-red-900"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* 🔍 TOPIC INPUT WITH INSTANT AUTO-SUBJECT DETECTION */}
            <div className="relative" ref={autocompleteRef}>
              <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center justify-between">
                <span>Associated Syllabus Topic</span>
                <span className="text-[10px] text-blue-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  Auto-fills Subject on typing
                </span>
              </label>
              
              <input
                type="text"
                value={topicInput}
                onFocus={() => setIsAutocompleteOpen(true)}
                onChange={(e) => handleTopicInputChange(e.target.value)}
                placeholder="Type any keyword: 'Eigenvalues', 'Transients', 'Bode', 'Op-Amp'..."
                className="w-full bg-[#0c0f16] border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white outline-none focus:border-blue-500 font-medium"
              />

              {/* Suggestions dropdown */}
              {isAutocompleteOpen && topicSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#131722] border border-[#2b364c] rounded-2xl shadow-2xl z-50 overflow-hidden max-h-48 overflow-y-auto">
                  {topicSuggestions.map((sug, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectSuggestion(sug)}
                      className="p-2.5 hover:bg-[#1c2233] cursor-pointer flex items-center justify-between border-b border-slate-800/60 last:border-none"
                    >
                      <div className="text-xs font-semibold text-slate-200">{sug.topicName}</div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold" style={{ color: sug.subjectColor, backgroundColor: `${sug.subjectColor}20` }}>
                        {sug.subjectName}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 🎯 AUTO-FILLED SUBJECT INDICATOR & SELECTOR */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-300">Connected Subject</label>
                {autoDetected && (
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCheck className="w-3 h-3" /> Auto-filled from topic
                  </span>
                )}
              </div>
              <select
                value={selectedSubject.id}
                onChange={(e) => {
                  const sub = GATE_ECE_SUBJECTS.find(s => s.id === e.target.value);
                  if (sub) {
                    setSelectedSubject({ id: sub.id, name: sub.name, color: sub.color });
                    setAutoDetected(false);
                  }
                }}
                className="w-full bg-[#0c0f16] border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white outline-none focus:border-blue-500 font-semibold"
                style={{ color: selectedSubject.color }}
              >
                {GATE_ECE_SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.totalMarksRange})</option>
                ))}
              </select>
            </div>

            {/* Title & Classification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Sheet Title</label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="e.g. Transients Short Formula Sheet"
                  className="w-full bg-[#0c0f16] border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Card Classification</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#0c0f16] border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500"
                >
                  <option value="formula_sheet">Formula Sheet (Core Equations)</option>
                  <option value="cheat_sheet">Cheatsheet / Speed Shortcuts</option>
                  <option value="short_notes">Handwritten Quick Notes</option>
                  <option value="graph_summary">Graphs & Waveforms</option>
                </select>
              </div>
            </div>

            {/* Sticky Notes */}
            <div>
              <label className="text-xs text-slate-400 block mb-1">Quick Trigger Note / Key Rule</label>
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="e.g. Remember series vs parallel damping factor"
                className="w-full bg-[#0c0f16] border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCard}
                disabled={!titleInput.trim() || !imagePreview}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs shadow-lg shadow-blue-600/30"
              >
                Save to Formula Vault
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
