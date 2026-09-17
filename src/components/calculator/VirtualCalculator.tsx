import React, { useState } from 'react';
import { Delete, RotateCcw, X } from 'lucide-react';

interface VirtualCalculatorProps {
  onClose?: () => void;
  isFloating?: boolean;
}

export const VirtualCalculator: React.FC<VirtualCalculatorProps> = ({ onClose, isFloating = false }) => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number>(0);
  const [isDegreeMode, setIsDegreeMode] = useState(true);
  const [isInverse, setIsInverse] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleInput = (val: string) => {
    if (hasError) {
      setDisplay(val);
      setHasError(false);
      return;
    }
    setDisplay(prev => (prev === '0' ? val : prev + val));
  };

  const handleClear = () => {
    setDisplay('0');
    setHasError(false);
  };

  const handleBackspace = () => {
    if (hasError || display === '0') {
      setDisplay('0');
      setHasError(false);
      return;
    }
    setDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const toRad = (n: number) => (isDegreeMode ? (n * Math.PI) / 180 : n);
  const fromRad = (n: number) => (isDegreeMode ? (n * 180) / Math.PI : n);

  const execUnary = (op: (n: number) => number) => {
    try {
      const val = parseFloat(display);
      if (isNaN(val)) throw new Error();
      const res = op(val);
      if (!isFinite(res) || isNaN(res)) throw new Error();
      // Round to 10 decimal places to eliminate floating glitches
      setDisplay(parseFloat(res.toPrecision(10)).toString());
    } catch {
      setDisplay('Error');
      setHasError(true);
    }
  };

  const evaluate = () => {
    if (hasError) return;
    try {
      // Safe sanitized arithmetic evaluator
      const sanitized = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, `${Math.PI}`)
        .replace(/e/g, `${Math.E}`)
        .replace(/[^0-9+\-*/.()eE]/g, '');

      // Evaluate safely
      const fn = new Function(`'use strict'; return (${sanitized})`);
      const result = fn();
      if (!isFinite(result) || isNaN(result)) throw new Error();
      setDisplay(parseFloat(Number(result).toPrecision(10)).toString());
    } catch {
      setDisplay('Error');
      setHasError(true);
    }
  };

  const factorial = (n: number): number => {
    if (n < 0 || Math.floor(n) !== n) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  return (
    <div className={`bg-[#1e2330] border border-[#2e384d] text-slate-100 rounded-xl shadow-2xl overflow-hidden font-mono ${
      isFloating ? 'w-96 fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in-95' : 'w-full max-w-md mx-auto'
    }`}>
      {/* Title Bar */}
      <div className="bg-[#151922] px-4 py-2.5 flex items-center justify-between border-b border-[#2e384d] select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">GATE Virtual Scientific Calculator</span>
        </div>
        <div className="flex items-center gap-2">
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mode & Indicators */}
      <div className="px-4 pt-3 pb-1 flex justify-between items-center text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDegreeMode(true)}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              isDegreeMode ? 'bg-blue-600 text-white font-bold' : 'bg-[#151922] hover:text-white'
            }`}
          >
            DEG
          </button>
          <button
            onClick={() => setIsDegreeMode(false)}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              !isDegreeMode ? 'bg-blue-600 text-white font-bold' : 'bg-[#151922] hover:text-white'
            }`}
          >
            RAD
          </button>
          <button
            onClick={() => setIsInverse(!isInverse)}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              isInverse ? 'bg-amber-600 text-white font-bold' : 'bg-[#151922] hover:text-white'
            }`}
          >
            INV
          </button>
        </div>
        <div className="flex items-center gap-2 font-bold">
          {memory !== 0 && <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 text-[10px]">M = {memory}</span>}
        </div>
      </div>

      {/* Calculator LCD Display */}
      <div className="px-4 py-2">
        <div className="bg-[#a8c64e] text-[#121c05] p-3 rounded-lg text-right text-2xl font-bold tracking-tight shadow-inner h-14 flex items-center justify-end overflow-x-auto border-2 border-[#8ea83e]">
          {display}
        </div>
      </div>

      {/* Keypad Grid */}
      <div className="p-4 grid grid-cols-5 gap-1.5 text-xs select-none">
        {/* Memory Row */}
        <button onClick={() => setMemory(0)} className="calc-btn bg-slate-800 text-amber-400 hover:bg-slate-700 p-2 rounded font-semibold">MC</button>
        <button onClick={() => setDisplay(memory.toString())} className="calc-btn bg-slate-800 text-amber-400 hover:bg-slate-700 p-2 rounded font-semibold">MR</button>
        <button onClick={() => setMemory(m => m + parseFloat(display || '0'))} className="calc-btn bg-slate-800 text-amber-400 hover:bg-slate-700 p-2 rounded font-semibold">M+</button>
        <button onClick={() => setMemory(m => m - parseFloat(display || '0'))} className="calc-btn bg-slate-800 text-amber-400 hover:bg-slate-700 p-2 rounded font-semibold">M-</button>
        <button onClick={handleBackspace} className="calc-btn bg-red-950 text-red-300 hover:bg-red-900 p-2 rounded font-semibold flex items-center justify-center">
          <Delete className="w-3.5 h-3.5" />
        </button>

        {/* Math Functions Row 1 */}
        <button onClick={() => execUnary(n => isInverse ? fromRad(Math.asin(n)) : Math.sin(toRad(n)))} className="calc-btn bg-[#252c3d] text-cyan-300 hover:bg-[#313a4f] p-2 rounded">
          {isInverse ? 'asin' : 'sin'}
        </button>
        <button onClick={() => execUnary(n => isInverse ? fromRad(Math.acos(n)) : Math.cos(toRad(n)))} className="calc-btn bg-[#252c3d] text-cyan-300 hover:bg-[#313a4f] p-2 rounded">
          {isInverse ? 'acos' : 'cos'}
        </button>
        <button onClick={() => execUnary(n => isInverse ? fromRad(Math.atan(n)) : Math.tan(toRad(n)))} className="calc-btn bg-[#252c3d] text-cyan-300 hover:bg-[#313a4f] p-2 rounded">
          {isInverse ? 'atan' : 'tan'}
        </button>
        <button onClick={() => execUnary(n => isInverse ? Math.pow(10, n) : Math.log10(n))} className="calc-btn bg-[#252c3d] text-cyan-300 hover:bg-[#313a4f] p-2 rounded">
          {isInverse ? '10ˣ' : 'log₁₀'}
        </button>
        <button onClick={() => execUnary(n => isInverse ? Math.exp(n) : Math.log(n))} className="calc-btn bg-[#252c3d] text-cyan-300 hover:bg-[#313a4f] p-2 rounded">
          {isInverse ? 'eˣ' : 'ln'}
        </button>

        {/* Math Functions Row 2 */}
        <button onClick={() => execUnary(n => Math.sqrt(n))} className="calc-btn bg-[#252c3d] text-cyan-300 hover:bg-[#313a4f] p-2 rounded">√x</button>
        <button onClick={() => execUnary(n => n * n)} className="calc-btn bg-[#252c3d] text-cyan-300 hover:bg-[#313a4f] p-2 rounded">x²</button>
        <button onClick={() => execUnary(n => 1 / n)} className="calc-btn bg-[#252c3d] text-cyan-300 hover:bg-[#313a4f] p-2 rounded">1/x</button>
        <button onClick={() => execUnary(n => factorial(n))} className="calc-btn bg-[#252c3d] text-cyan-300 hover:bg-[#313a4f] p-2 rounded">n!</button>
        <button onClick={handleClear} className="calc-btn bg-red-800 text-white hover:bg-red-700 p-2 rounded font-bold">C</button>

        {/* Numerical Grid */}
        <button onClick={() => handleInput('7')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded">7</button>
        <button onClick={() => handleInput('8')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded">8</button>
        <button onClick={() => handleInput('9')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded">9</button>
        <button onClick={() => handleInput('(')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded">(</button>
        <button onClick={() => handleInput(')')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded">)</button>

        <button onClick={() => handleInput('4')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded">4</button>
        <button onClick={() => handleInput('5')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded">5</button>
        <button onClick={() => handleInput('6')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded">6</button>
        <button onClick={() => handleInput('*')} className="calc-btn bg-blue-900 text-blue-200 hover:bg-blue-800 text-sm font-bold p-2 rounded">×</button>
        <button onClick={() => handleInput('/')} className="calc-btn bg-blue-900 text-blue-200 hover:bg-blue-800 text-sm font-bold p-2 rounded">÷</button>

        <button onClick={() => handleInput('1')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded">1</button>
        <button onClick={() => handleInput('2')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded">2</button>
        <button onClick={() => handleInput('3')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded">3</button>
        <button onClick={() => handleInput('+')} className="calc-btn bg-blue-900 text-blue-200 hover:bg-blue-800 text-sm font-bold p-2 rounded">+</button>
        <button onClick={() => handleInput('-')} className="calc-btn bg-blue-900 text-blue-200 hover:bg-blue-800 text-sm font-bold p-2 rounded">−</button>

        <button onClick={() => handleInput('0')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded col-span-2">0</button>
        <button onClick={() => handleInput('.')} className="calc-btn bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold p-2 rounded">.</button>
        <button onClick={() => execUnary(n => -n)} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded">±</button>
        <button onClick={evaluate} className="calc-btn bg-blue-600 hover:bg-blue-500 text-white text-base font-bold p-2 rounded shadow-lg shadow-blue-600/30">=</button>
      </div>
    </div>
  );
};
