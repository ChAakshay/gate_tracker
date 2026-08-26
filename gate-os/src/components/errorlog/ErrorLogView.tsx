import React from 'react';
import { useGateStore } from '../../store/useGateStore';
import { AlertCircle, Brain, Calculator, Glasses, Sparkles, BookCheck } from 'lucide-react';

export const ErrorLogView: React.FC = () => {
  const { errorLogs } = useGateStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'conceptual': return <Brain className="w-4 h-4 text-purple-400" />;
      case 'calculation': return <Calculator className="w-4 h-4 text-red-400" />;
      case 'reading': return <Glasses className="w-4 h-4 text-amber-400" />;
      default: return <BookCheck className="w-4 h-4 text-blue-400" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'conceptual': return 'bg-purple-950/50 border-purple-500/40 text-purple-300';
      case 'calculation': return 'bg-red-950/50 border-red-500/40 text-red-300';
      case 'reading': return 'bg-amber-950/50 border-amber-500/40 text-amber-300';
      default: return 'bg-blue-950/50 border-blue-500/40 text-blue-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#12141c] border border-[#1f2433] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <span>3-Line Error Log Repository</span>
            <Sparkles className="w-5 h-5 text-blue-400" />
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Taxonomy breakdown of cognitive traps. Review this weekly to eliminate repeat mistakes.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 rounded-xl bg-[#181d2a] border border-[#273045] text-center">
            <div className="text-xl font-bold text-white font-mono">{errorLogs.length}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Logs</div>
          </div>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {errorLogs.length === 0 ? (
          <div className="p-12 text-center bg-[#12141c] border border-[#1f2433] rounded-2xl">
            <AlertCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <div className="text-slate-300 font-bold">No Errors Logged Yet!</div>
            <div className="text-xs text-slate-500 mt-1">Whenever you miss a question in the PYQ Arena or CBT, log it here.</div>
          </div>
        ) : (
          errorLogs.map((log, idx) => (
            <div key={idx} className="bg-[#12141c] border border-[#1f2433] rounded-xl p-5 space-y-3 shadow-md hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded-lg border text-xs font-bold capitalize flex items-center gap-1.5 ${getTypeBadge(log.errorType)}`}>
                    {getIcon(log.errorType)}
                    {log.errorType} Error
                  </span>
                  <span className="text-xs font-mono text-slate-400">ID: {log.questionId}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">{log.date}</span>
              </div>

              {/* 3-Line Summary Breakdown */}
              <div className="bg-[#0b0e14] border border-[#1d2334] rounded-lg p-4 font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed whitespace-pre-line">
                {log.threeLineSummary}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
