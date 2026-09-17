import React, { useState } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { calculateTimeSyncMetrics, getCalendarDateForDay } from '../utils/timeSync';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Target, 
  BookOpen, 
  BrainCircuit, 
  Flame, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Zap,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';

export const DailyRoadmapPlanner: React.FC = () => {
  const { dayPlans, toggleDayCompletion, activeDayNumber, setActiveDayNumber, setActiveView } = useProgressStore();

  const completedDaysCount = dayPlans.filter(d => d.isCompleted).length;
  const timeMetrics = calculateTimeSyncMetrics(completedDaysCount);

  // Filter by Week
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number | 'all'>('all');

  const filteredDays = dayPlans.filter(d => {
    if (selectedWeekFilter === 'all') return true;
    return d.weekNumber === selectedWeekFilter;
  });

  const getPaceBadgeColor = (status: typeof timeMetrics['paceStatus']) => {
    if (status.includes('Ahead')) return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50';
    if (status.includes('On Track')) return 'bg-blue-950/80 text-blue-300 border-blue-500/50';
    return 'bg-amber-950/80 text-amber-300 border-amber-500/50';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* ⏰ REAL-TIME CALENDAR TIME-SYNC COMMAND BANNER */}
      <div className="bg-gradient-to-br from-[#131b2e] via-[#10131f] to-[#0c0e17] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Real-Time Calendar Synchronization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              18-Week Milestone Roadmap (Sept 1 – Dec 31)
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              {timeMetrics.isPreLaunch ? (
                <span>Launch in <strong className="text-amber-400 font-bold">{timeMetrics.daysUntilLaunch} Days</strong> (Starting Sept 1, 2026) • Pre-season Prep Active</span>
              ) : (
                <span>Today is <strong className="text-white">{timeMetrics.currentDateStr}</strong> (Calendar Day {timeMetrics.calendarDayNumber} • Week {timeMetrics.currentCalendarWeek})</span>
              )}
            </p>
          </div>

          {/* Pace Velocity Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className={`px-4 py-2.5 rounded-2xl border text-xs font-bold font-mono flex items-center gap-2 shadow-lg backdrop-blur-md ${getPaceBadgeColor(timeMetrics.paceStatus)}`}>
              <Zap className="w-4 h-4" />
              <span>{timeMetrics.paceStatus}</span>
            </div>

            <button
              onClick={() => {
                setActiveDayNumber(timeMetrics.calendarDayNumber);
                setActiveView('today');
              }}
              className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
            >
              <span>Sync to Today (Day {timeMetrics.calendarDayNumber})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 📊 4 Real-time Time Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          
          <div className="bg-[#141824]/90 p-4 rounded-2xl border border-[#232b40]">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Days Completed</div>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {completedDaysCount} <span className="text-xs font-sans text-slate-500 font-normal">/ {dayPlans.length}</span>
            </div>
          </div>

          <div className="bg-[#141824]/90 p-4 rounded-2xl border border-[#232b40]">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Calendar Timeline</div>
            <div className="text-2xl font-black text-blue-400 font-mono mt-1">
              Day {timeMetrics.calendarDayNumber} <span className="text-xs font-sans text-slate-500 font-normal">elapsed</span>
            </div>
          </div>

          <div className="bg-[#141824]/90 p-4 rounded-2xl border border-[#232b40]">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Days Remaining</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">
              {timeMetrics.daysRemainingUntilDec31} <span className="text-xs font-sans text-slate-500 font-normal">till Dec 31</span>
            </div>
          </div>

          <div className="bg-[#141824]/90 p-4 rounded-2xl border border-[#232b40]">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Pace Velocity</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
              {timeMetrics.velocityPercent}% <span className="text-xs font-sans text-slate-500 font-normal">speed</span>
            </div>
          </div>

        </div>

      </div>

      {/* 🔍 Week Filter Navigation Bar */}
      <div className="bg-[#12141c] border border-[#1f2433] rounded-3xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Filter className="w-4 h-4 text-blue-400" />
          <span>Jump to Week:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setSelectedWeekFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              selectedWeekFilter === 'all' ? 'bg-blue-600 text-white font-bold' : 'bg-[#181d2a] text-slate-400 hover:text-white'
            }`}
          >
            All Weeks
          </button>

          {[1, 2, 3, 4, 5, 6].map(w => (
            <button
              key={w}
              onClick={() => setSelectedWeekFilter(w)}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                selectedWeekFilter === w 
                  ? 'bg-blue-600 text-white font-bold' 
                  : w === timeMetrics.currentCalendarWeek
                  ? 'bg-blue-950 text-blue-300 border border-blue-700'
                  : 'bg-[#181d2a] text-slate-400 hover:text-white'
              }`}
            >
              Week {w} {w === timeMetrics.currentCalendarWeek ? '• Today' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* 🗓️ List of Days with Calendar Dates */}
      <div className="space-y-3">
        {filteredDays.map((day) => {
          const calendarDate = getCalendarDateForDay(day.dayNumber);
          const isTodayDate = day.dayNumber === timeMetrics.calendarDayNumber;
          const isActiveSelected = day.dayNumber === activeDayNumber;

          return (
            <div
              key={day.dayNumber}
              onClick={() => toggleDayCompletion(day.dayNumber)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none ${
                day.isCompleted 
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm' 
                  : isTodayDate
                  ? 'bg-blue-950/30 border-blue-500 shadow-md ring-1 ring-blue-400'
                  : 'bg-[#12141c] border-[#1f2433] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-1 rounded-full ${day.isCompleted ? 'text-emerald-400' : 'text-slate-600'}`}>
                  {day.isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    
                    {/* Calendar Date Tag */}
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1c2233] text-slate-300 border border-slate-700">
                      📅 {calendarDate}
                    </span>

                    {/* Week Tag */}
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
                      Week {day.weekNumber}
                    </span>

                    {isTodayDate && (
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-blue-500 text-white animate-pulse">
                        Today's Calendar Date
                      </span>
                    )}

                    <h3 className={`font-bold text-sm sm:text-base ${day.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {day.topicTitle}
                    </h3>
                  </div>

                  <div className="text-xs text-slate-400 mt-1.5 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-blue-400" /> {day.theoryTarget}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5 text-purple-400" /> {day.pyqTargetCount} PYQs</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><BrainCircuit className="w-3.5 h-3.5 text-amber-400" /> {day.retentionFocus}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold font-mono">
                  +{day.targetMarksValue} Marks
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDayNumber(day.dayNumber);
                    setActiveView('today');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    isActiveSelected 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-[#1a2030] text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                  title="Make this the Active Mission on Today's Essentials"
                >
                  {isActiveSelected ? 'Active Mission' : 'Set as Today'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
