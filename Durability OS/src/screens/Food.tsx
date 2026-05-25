import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useDurabilityStore } from '../store';
import ProgressBar from '../components/ProgressBar';

export default function Food() {
  const navigate = useNavigate();
  const {
    meals,
    waterGlasses,
    smoothie,
    smoothieLoggedToday,
    addMeal,
    deleteMeal,
    logSmoothie,
    setWaterGlasses,
  } = useDurabilityStore();

  const [formData, setFormData] = useState({
    name: '',
    protein: '',
    calories: '',
    time: 'Breakfast',
  });

  const totals = useMemo(() => {
    return {
      protein: meals.reduce((sum, m) => sum + m.protein, 0),
      calories: meals.reduce((sum, m) => sum + m.calories, 0),
      water: waterGlasses * 8,
    };
  }, [meals, waterGlasses]);

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.protein || !formData.calories) {
      alert('Please fill in all fields');
      return;
    }

    const newMeal = {
      id: `meal-${Date.now()}`,
      name: formData.name,
      protein: parseFloat(formData.protein),
      calories: parseFloat(formData.calories),
      time: formData.time,
      ts: Date.now(),
    };

    addMeal(newMeal);
    setFormData({ name: '', protein: '', calories: '', time: 'Breakfast' });
  };

  const handleWaterButton = (oz: number) => {
    const newGlasses = oz / 8;
    if (waterGlasses === newGlasses) {
      setWaterGlasses(newGlasses - 1);
    } else {
      setWaterGlasses(newGlasses);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-xl font-medium text-gray-900">Nutrition</h1>
        <p className="text-sm text-gray-500">Today's intake</p>
      </div>

      {/* Nutrition Totals */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {totals.protein}g
            </div>
            <div className="text-xs text-gray-500">target 150g</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {totals.calories}
            </div>
            <div className="text-xs text-gray-500">target 2,600</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {totals.water}oz
            </div>
            <div className="text-xs text-gray-500">target 96oz</div>
          </div>
        </div>
        <ProgressBar current={totals.protein} target={150} className="mb-2" />
        <ProgressBar current={totals.calories} target={2600} />
      </div>

      {/* Smoothie Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900">Morning Smoothie</h2>
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
            Non-negotiable
          </span>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-gray-900">{smoothie.protein}g protein</div>
          <div className="text-sm text-gray-900">{smoothie.calories} calories</div>
          <div className="text-xs text-gray-600 space-y-1 mt-3">
            {smoothie.ingredients.split('\n').map((ingredient, i) => (
              <div key={i}>• {ingredient.trim()}</div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button
            onClick={logSmoothie}
            disabled={smoothieLoggedToday}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition ${
              smoothieLoggedToday
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {smoothieLoggedToday ? '✓ Logged' : 'Log it'}
          </button>
          <button
            onClick={() => navigate('/food/smoothie-edit')}
            className="flex-1 py-2 px-3 rounded-lg font-medium text-sm bg-gray-100 text-gray-900 hover:bg-gray-200 transition"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Add Meal Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h2 className="font-medium text-gray-900 mb-3">Log a meal</h2>
        <form onSubmit={handleAddMeal} className="space-y-3">
          <input
            type="text"
            placeholder="Meal name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Protein (g)"
              value={formData.protein}
              onChange={(e) =>
                setFormData({ ...formData, protein: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="number"
              placeholder="Calories"
              value={formData.calories}
              onChange={(e) =>
                setFormData({ ...formData, calories: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <select
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
            <option>Pre-workout</option>
            <option>Post-workout</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition"
          >
            Add meal
          </button>
        </form>
      </div>

      {/* Meals Logged */}
      {meals.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-900">
              Logged today ({meals.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {meal.name}
                  </div>
                  <div className="text-xs text-gray-500">{meal.time}</div>
                </div>
                <div className="flex items-center gap-4 pr-4">
                  <div className="text-xs text-gray-900 font-medium w-8 text-right">
                    {meal.protein}g
                  </div>
                  <div className="text-xs text-gray-900 font-medium w-10 text-right">
                    {meal.calories}
                  </div>
                </div>
                <button
                  onClick={() => deleteMeal(meal.id)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-200 grid grid-cols-3 text-xs font-semibold text-gray-900">
            <div>Total ({meals.length})</div>
            <div className="text-right">{totals.protein}g</div>
            <div className="text-right">{totals.calories}</div>
          </div>
        </div>
      )}

      {/* Hydration */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        <h2 className="font-medium text-gray-900">Hydration</h2>
        <div className="flex flex-wrap gap-2">
          {[8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96].map((oz) => (
            <button
              key={oz}
              onClick={() => handleWaterButton(oz)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                waterGlasses === oz / 8
                  ? 'bg-green-600 text-white border border-green-600'
                  : 'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {oz}oz
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-900">
          Total: {totals.water}oz of 96oz
        </div>
        <button
          onClick={() => setWaterGlasses(0)}
          className="w-full py-2 bg-gray-100 text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-200 transition"
        >
          Reset water
        </button>
      </div>
    </div>
  );
}
