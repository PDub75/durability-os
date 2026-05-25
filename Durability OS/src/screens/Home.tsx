import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Activity, ArrowUp, Footprints, Wind, Users, Brain, Flame, Droplets, BookOpen, Moon, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { useDurabilityStore } from '../store';
import ProgressBar from '../components/ProgressBar';

const ICON_MAP: Record<string, typeof Zap> = {
  Zap,
  Activity,
  ArrowUp,
  Footprints,
  Wind,
  Users,
  Brain,
  Flame,
  Droplets,
  BookOpen,
  Moon,
};

export default function Home() {
  const navigate = useNavigate();
  const {
    garmin,
    meals,
    waterGlasses,
    habits,
    brief,
    briefPhrase,
    longevityActions,
    longevityDone,
    toggleHabit,
    toggleLongevityDone,
  } = useDurabilityStore();

  const today = format(new Date(), 'EEEE, MMMM d');

  const totals = useMemo(() => {
    return {
      protein: meals.reduce((sum, m) => sum + m.protein, 0),
      calories: meals.reduce((sum, m) => sum + m.calories, 0),
      water: waterGlasses * 8,
    };
  }, [meals, waterGlasses]);

  const habitsDone = habits.filter((h) => h.done).length;
  const habitsTotal = habits.length;

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between pt-2 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Good morning.</h1>
          <p className="text-sm text-slate-500 mt-1">{today}</p>
        </div>
        <button
          onClick={() => navigate('/checkin')}
          className="btn-primary flex items-center gap-2"
        >
          <span className="hidden sm:inline">Check-in</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Garmin Metrics */}
      <div className="card space-y-3">
        <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Daily Metrics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-lg bg-primary-50">
            <div className="text-2xl font-bold text-primary-600">
              {garmin?.bb ?? '—'}
            </div>
            <div className="text-xs text-slate-600 mt-1">Battery</div>
          </div>
          <div className="p-3 rounded-lg bg-accent-50">
            <div className="text-2xl font-bold text-accent-600">
              {garmin?.hrv ?? '—'}
            </div>
            <div className="text-xs text-slate-600 mt-1">HRV</div>
          </div>
          <div className="p-3 rounded-lg bg-success-50">
            <div className="text-2xl font-bold text-success-600">
              {garmin?.sleep ?? '—'}
            </div>
            <div className="text-xs text-slate-600 mt-1">Sleep</div>
          </div>
          <div className="p-3 rounded-lg bg-red-50">
            <div className="text-2xl font-bold text-red-600">
              {garmin?.gstress ?? '—'}
            </div>
            <div className="text-xs text-slate-600 mt-1">Stress</div>
          </div>
          <div className="p-3 rounded-lg bg-blue-50">
            <div className="text-2xl font-bold text-blue-600">
              {garmin?.rhr ?? '—'}
            </div>
            <div className="text-xs text-slate-600 mt-1">RHR</div>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic border-t border-slate-200 pt-3">
          {garmin
            ? '✓ Metrics loaded from this morning'
            : 'Complete morning check-in to load metrics'}
        </p>
      </div>

      {/* Daily Brief */}
      {brief && (
        <div className="card bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
          <div className="text-slate-900 leading-relaxed font-medium">
            {brief}
          </div>
          {briefPhrase && (
            <div className="text-sm text-primary-600 italic mt-3 font-medium">{briefPhrase}</div>
          )}
        </div>
      )}

      {/* Non-Negotiables */}
      <div className="card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Habits</h2>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success-100 text-success-700 text-xs font-bold">
              {habitsDone}
            </span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 text-sm font-medium">{habitsTotal}</span>
          </div>
        </div>
        <div className="space-y-2">
          {habits.map((habit) => {
            const IconComponent = ICON_MAP[habit.icon] || Zap;
            return (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all duration-200 group"
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                    habit.done
                      ? 'bg-success-100 border-success-500'
                      : 'border-slate-300 group-hover:border-slate-400'
                  }`}
                >
                  {habit.done && <CheckCircle2 size={16} className="text-success-600" />}
                </div>
                <IconComponent size={18} className={`flex-shrink-0 ${habit.done ? 'text-slate-400' : 'text-slate-600'}`} />
                <span
                  className={`flex-1 text-sm font-medium text-left ${
                    habit.done
                      ? 'line-through text-slate-400'
                      : 'text-slate-900'
                  }`}
                >
                  {habit.name}
                </span>
                {habit.priority && (
                  <span className="badge-accent shrink-0">Priority</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-slate-200">
          <ProgressBar
            current={habitsDone}
            target={habitsTotal}
            className="mt-0"
          />
        </div>
      </div>

      {/* Longevity Actions */}
      {longevityActions.length > 0 && (
        <div className="card space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Today's Actions</h2>
          <div className="space-y-2">
            {longevityActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => toggleLongevityDone(idx)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                  longevityDone[idx]
                    ? 'bg-slate-100 border-slate-300 opacity-50 line-through text-slate-400'
                    : 'bg-accent-50 border-accent-200 text-slate-900 hover:bg-accent-100'
                }`}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition Summary */}
      <div className="card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Nutrition</h2>
          <button
            onClick={() => navigate('/food')}
            className="btn-secondary text-xs py-1 px-3"
          >
            + Log Food
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-lg bg-slate-50">
            <div className="text-xl font-bold text-slate-900">
              {totals.protein}g
            </div>
            <div className="text-xs text-slate-500 mt-1">Protein</div>
            <div className="text-xs text-slate-400">target 150g</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <div className="text-xl font-bold text-slate-900">
              {totals.calories}
            </div>
            <div className="text-xs text-slate-500 mt-1">Calories</div>
            <div className="text-xs text-slate-400">target 2.6k</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <div className="text-xl font-bold text-slate-900">
              {totals.water}oz
            </div>
            <div className="text-xs text-slate-500 mt-1">Water</div>
            <div className="text-xs text-slate-400">target 96oz</div>
          </div>
        </div>
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div>
            <div className="text-xs text-slate-600 font-medium mb-1">Protein</div>
            <ProgressBar current={totals.protein} target={150} className="mb-0" />
          </div>
          <div>
            <div className="text-xs text-slate-600 font-medium mb-1">Calories</div>
            <ProgressBar current={totals.calories} target={2600} className="mb-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
