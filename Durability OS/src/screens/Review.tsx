import { useState, useMemo } from 'react';
import { useDurabilityStore } from '../store';
import { generateWeeklyNote } from '../lib/coaching';

export default function Review() {
  const [weeklyNote, setWeeklyNote] = useState('');
  const {
    dailyArchive,
    habits,
    meals,
    waterGlasses,
    cogLoggedToday,
    stressLog,
  } = useDurabilityStore();

  const last7Days = useMemo(() => {
    return dailyArchive.slice(-7);
  }, [dailyArchive]);

  const averages = useMemo(() => {
    if (last7Days.length === 0) {
      return { stress: 0, clarity: 0, protein: 0, connection: 0 };
    }

    const avgStress = last7Days.reduce((sum, d) => sum + d.stressRating, 0) / last7Days.length;
    const avgClarity = last7Days.reduce((sum, d) => sum + d.clarity, 0) / last7Days.length;
    const avgProtein = last7Days.reduce((sum, d) => sum + d.protein, 0) / last7Days.length;
    const connectionDays = last7Days.filter((d) => d.connection).length;

    return {
      stress: avgStress.toFixed(1),
      clarity: avgClarity.toFixed(1),
      protein: avgProtein.toFixed(0),
      connection: connectionDays,
    };
  }, [last7Days]);

  const handleGenerateWeeklyNote = () => {
    const note = generateWeeklyNote(dailyArchive);
    setWeeklyNote(note);
  };

  const todayStats = {
    nonNegotiablesCount: habits.filter((h) => h.done).length,
    nonNegotiablesTotal: habits.length,
    connection: 'Not yet',
    rites: habits.find((h) => h.id === 'rites')?.done ? 'Done' : 'Not yet',
    bouncing: habits.find((h) => h.id === 'bouncing')?.done ? 'Done' : 'Not yet',
    cognitive: cogLoggedToday || 'Not logged',
    stressActivities: Object.values(stressLog).filter(Boolean).length,
    protein: meals.reduce((sum, m) => sum + m.protein, 0),
    water: waterGlasses * 8,
  };

  if (last7Days.length === 0) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <div className="pt-2 mb-4">
          <h1 className="text-xl font-medium text-gray-900">Weekly review</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-sm text-gray-500">
            No archived days yet. Save your evening reflection each day to build
            history.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-xl font-medium text-gray-900">Weekly review</h1>
      </div>

      {/* 7-Day Habit Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <h2 className="font-medium text-gray-900 mb-3">Habit consistency</h2>
        <div className="space-y-3">
          {last7Days.map((day) => {
            const percentage = (day.habitsDone / day.habitsTotal) * 100;
            return (
              <div key={day.date} className="flex items-center gap-3">
                <div className="w-20 text-xs font-medium text-gray-600">
                  {day.dateLabel}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 w-16 text-right">
                    {day.habitsDone}/{day.habitsTotal} ({Math.round(percentage)}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Last 7 Days Averages */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-900">
            {averages.stress}
          </div>
          <p className="text-xs text-gray-500 mt-1">Avg stress (1-5)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-900">
            {averages.clarity}
          </div>
          <p className="text-xs text-gray-500 mt-1">Avg clarity (1-5)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-900">
            {averages.protein}g
          </div>
          <p className="text-xs text-gray-500 mt-1">Avg protein</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-900">
            {averages.connection}/7
          </div>
          <p className="text-xs text-gray-500 mt-1">Connection days</p>
        </div>
      </div>

      {/* Weekly Note */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900">Weekly coaching note</h2>
          <button
            onClick={handleGenerateWeeklyNote}
            className="text-xs text-gray-600 hover:text-gray-900 transition"
          >
            Generate ↗
          </button>
        </div>
        {weeklyNote && (
          <div className="text-sm text-gray-900 leading-relaxed">{weeklyNote}</div>
        )}
        {!weeklyNote && (
          <p className="text-xs text-gray-500">
            Tap "Generate" to create this week's coaching note.
          </p>
        )}
      </div>

      {/* Today's Pillar Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
        <h2 className="font-medium text-gray-900 mb-3">Today's pillars</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Non-negotiables</span>
            <span className="font-medium text-gray-900">
              {todayStats.nonNegotiablesCount}/{todayStats.nonNegotiablesTotal}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Meaningful connection</span>
            <span className="font-medium text-gray-900">
              {todayStats.connection}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Five Tibetan Rites</span>
            <span className="font-medium text-gray-900">
              {todayStats.rites}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bouncing/rebounding</span>
            <span className="font-medium text-gray-900">
              {todayStats.bouncing}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cognitive challenge</span>
            <span className="font-medium text-gray-900">
              {todayStats.cognitive}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Stress reduction activities</span>
            <span className="font-medium text-gray-900">
              {todayStats.stressActivities}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Protein today</span>
            <span className="font-medium text-gray-900">
              {todayStats.protein}g
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Water today</span>
            <span className="font-medium text-gray-900">
              {todayStats.water}oz
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
