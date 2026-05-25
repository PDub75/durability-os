import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useDurabilityStore } from '../store';

export default function FoodSmoothieEdit() {
  const navigate = useNavigate();
  const { smoothie } = useDurabilityStore();
  const [protein, setProtein] = useState(smoothie.protein.toString());
  const [calories, setCalories] = useState(smoothie.calories.toString());
  const [ingredients, setIngredients] = useState(smoothie.ingredients);

  const handleSave = () => {
    const store = useDurabilityStore.getState();
    store.smoothie.protein = parseFloat(protein);
    store.smoothie.calories = parseFloat(calories);
    store.smoothie.ingredients = ingredients;

    useDurabilityStore.setState({
      smoothie: {
        protein: parseFloat(protein),
        calories: parseFloat(calories),
        ingredients,
      },
    });
    navigate('/food');
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <button
        onClick={() => navigate('/food')}
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
      >
        <ChevronLeft size={18} />
        Back to food
      </button>

      <h1 className="text-xl font-medium text-gray-900 mb-6">
        Edit smoothie recipe
      </h1>

      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Protein (g)
          </label>
          <input
            type="number"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Calories
          </label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Ingredients (one per line)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition"
        >
          Save recipe
        </button>
      </div>
    </div>
  );
}
