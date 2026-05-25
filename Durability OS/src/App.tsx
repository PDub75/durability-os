import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useDurabilityStore } from './store';
import { pickRandom3 } from './lib/longevityPool';
import BottomNav from './components/BottomNav';
import Home from './screens/Home';
import CheckIn from './screens/CheckIn';
import Food from './screens/Food';
import FoodSmoothieEdit from './screens/FoodSmoothieEdit';
import Mind from './screens/Mind';
import Quit from './screens/Quit';
import Review from './screens/Review';

function App() {
  const [ready, setReady] = useState(false);
  const {
    lastResetDate,
    habits,
    resetDay,
    initializeHabits,
  } = useDurabilityStore();

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (lastResetDate !== today) {
      if (habits.length === 0) {
        const defaultHabits = [
          { id: 'smoothie', name: 'Morning protein smoothie', icon: 'Zap', done: false, priority: true },
          { id: 'rites', name: 'Five Tibetan Rites', icon: 'Activity', done: false, priority: true },
          { id: 'bouncing', name: 'Bouncing / rebounding', icon: 'ArrowUp', done: false, priority: false },
          { id: 'walk', name: 'Outdoor walk', icon: 'Footprints', done: false, priority: false },
          { id: 'breathwork', name: 'Breathwork', icon: 'Wind', done: false, priority: false },
          { id: 'connection', name: 'One meaningful connection', icon: 'Users', done: false, priority: true },
          { id: 'cognitive', name: 'Daily cognitive challenge', icon: 'Brain', done: false, priority: false },
          { id: 'protein', name: 'Hit protein target', icon: 'Flame', done: false, priority: false },
          { id: 'hydration', name: 'Hit hydration target', icon: 'Droplets', done: false, priority: false },
          { id: 'reading', name: 'Reading (not screens)', icon: 'BookOpen', done: false, priority: false },
          { id: 'bedtime', name: 'In bed by target time', icon: 'Moon', done: false, priority: false },
        ];
        initializeHabits(defaultHabits);
      }
      const newActions = pickRandom3();
      resetDay(newActions);
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 overflow-y-auto pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/food" element={<Food />} />
            <Route path="/food/smoothie-edit" element={<FoodSmoothieEdit />} />
            <Route path="/mind" element={<Mind />} />
            <Route path="/quit" element={<Quit />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </HashRouter>
  );
}

export default App;
