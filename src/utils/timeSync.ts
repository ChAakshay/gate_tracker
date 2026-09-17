// Time Sync & Pace Velocity Utility for GATE 2027 (Sept 1, 2026 - Dec 31, 2026)

export const GATE_START_DATE = '2026-09-01';
export const GATE_END_DATE = '2026-12-31';

export interface TimeSyncMetrics {
  currentDateStr: string;
  calendarDayNumber: number; // 1 to ~122
  currentCalendarWeek: number; // 1 to 18
  totalCalendarDays: number;
  daysRemainingUntilDec31: number;
  daysUntilLaunch: number; // if before Sept 1
  isPreLaunch: boolean;
  expectedCompletedDays: number;
  actualCompletedDays: number;
  paceStatus: 'Pre-Launch Prep 🚀' | 'Ahead of Schedule 🚀' | 'On Track 🎯' | 'Slight Lag (Catch-up Mode) ⚡';
  paceDifference: number;
  velocityPercent: number;
}

export const calculateTimeSyncMetrics = (actualCompletedCount: number): TimeSyncMetrics => {
  const now = new Date();
  const start = new Date(GATE_START_DATE);
  const end = new Date(GATE_END_DATE);

  // Normalize dates to midnight for exact day math
  const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const endMidnight = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const msPerDay = 1000 * 60 * 60 * 24;

  const totalCalendarDays = Math.max(1, Math.round((endMidnight - startMidnight) / msPerDay));
  
  // Calculate days difference from Sept 1
  const diffFromStart = Math.floor((nowMidnight - startMidnight) / msPerDay);
  const isPreLaunch = diffFromStart < 0;
  const daysUntilLaunch = isPreLaunch ? Math.abs(diffFromStart) : 0;

  let calendarDayNumber = isPreLaunch ? 1 : diffFromStart + 1;
  if (calendarDayNumber > totalCalendarDays) calendarDayNumber = totalCalendarDays;

  const currentCalendarWeek = Math.min(18, Math.max(1, Math.ceil(calendarDayNumber / 7)));
  const daysRemainingUntilDec31 = Math.max(0, Math.round((endMidnight - nowMidnight) / msPerDay));

  const expectedCompletedDays = isPreLaunch ? 0 : calendarDayNumber;
  const paceDifference = actualCompletedCount - expectedCompletedDays;

  let paceStatus: TimeSyncMetrics['paceStatus'] = 'On Track 🎯';
  if (isPreLaunch) {
    paceStatus = 'Pre-Launch Prep 🚀';
  } else if (paceDifference >= 2) {
    paceStatus = 'Ahead of Schedule 🚀';
  } else if (paceDifference <= -3) {
    paceStatus = 'Slight Lag (Catch-up Mode) ⚡';
  }

  const velocityPercent = Math.min(100, Math.max(0, Math.round((actualCompletedCount / totalCalendarDays) * 100)));

  return {
    currentDateStr: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    calendarDayNumber,
    currentCalendarWeek,
    totalCalendarDays,
    daysRemainingUntilDec31,
    daysUntilLaunch,
    isPreLaunch,
    expectedCompletedDays,
    actualCompletedDays: actualCompletedCount,
    paceStatus,
    paceDifference,
    velocityPercent
  };
};

export const getCalendarDateForDay = (dayNumber: number): string => {
  const start = new Date(GATE_START_DATE);
  const targetDate = new Date(start.getTime() + (dayNumber - 1) * 24 * 60 * 60 * 1000);
  return targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
};
