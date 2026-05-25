import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DurabilityState, Meal, Habit, DayRecord } from './types';

const getInitialHabits = (): Habit[] => [
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

export const useDurabilityStore = create<DurabilityState>()(
  persist(
    (set, get) => ({
      garmin: null,
      meals: [],
      waterGlasses: 0,
      habits: getInitialHabits(),
      brief: '',
      briefPhrase: '',
      stressLog: {},
      cogLoggedToday: null,
      quit: null,
      quitDays: 0,
      quitLastCheckin: null,
      smoothie: {
        protein: 45,
        calories: 420,
        ingredients: 'Protein powder (2 scoops)\nGreek yogurt (½ cup)\nBanana\nMixed berries (½ cup)\nAlmond milk (1 cup)',
      },
      smoothieLoggedToday: false,
      longevityActions: [],
      longevityDone: {},
      dailyArchive: [],
      lastResetDate: new Date().toISOString().slice(0, 10),

      initializeHabits: (habits) => set({ habits }),

      setGarmin: (garmin) => set({ garmin }),

      addMeal: (meal) => {
        const newMeals = [...get().meals, meal];
        const totalProtein = newMeals.reduce((sum, m) => sum + m.protein, 0);
        const habits = get().habits.map((h) => {
          if (h.id === 'protein') {
            return { ...h, done: totalProtein >= 135 };
          }
          return h;
        });
        set({ meals: newMeals, habits });
      },

      deleteMeal: (id) => {
        const meals = get().meals.filter((m) => m.id !== id);
        const isSmoothieDeleted = get().meals.find((m) => m.id === id)?.isSmoothie;
        const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
        const habits = get().habits.map((h) => {
          if (h.id === 'protein') {
            return { ...h, done: totalProtein >= 135 };
          }
          return h;
        });
        const state: any = { meals, habits };
        if (isSmoothieDeleted) {
          state.smoothieLoggedToday = false;
          state.habits = habits.map((h) =>
            h.id === 'smoothie' ? { ...h, done: false } : h
          );
        }
        set(state);
      },

      logSmoothie: () => {
        const smoothie = get().smoothie;
        const id = `smoothie-${Date.now()}`;
        const meal: Meal = {
          id,
          name: 'Morning Smoothie',
          protein: smoothie.protein,
          calories: smoothie.calories,
          time: 'Breakfast',
          ts: Date.now(),
          isSmoothie: true,
        };
        const newMeals = [...get().meals, meal];
        const totalProtein = newMeals.reduce((sum, m) => sum + m.protein, 0);
        const habits = get().habits.map((h) => {
          if (h.id === 'smoothie') {
            return { ...h, done: true };
          }
          if (h.id === 'protein' && totalProtein >= 135) {
            return { ...h, done: true };
          }
          return h;
        });
        set({ meals: newMeals, smoothieLoggedToday: true, habits });
      },

      setWaterGlasses: (glasses) => {
        const habits = get().habits.map((h) => {
          if (h.id === 'hydration' && glasses >= 12) {
            return { ...h, done: true };
          }
          if (h.id === 'hydration' && glasses < 12) {
            return { ...h, done: false };
          }
          return h;
        });
        set({ waterGlasses: glasses, habits });
      },

      toggleHabit: (id) => {
        const habits = get().habits.map((h) =>
          h.id === id ? { ...h, done: !h.done } : h
        );
        set({ habits });
        if (id === 'smoothie' && get().habits.find((h) => h.id === 'smoothie')?.done) {
          const smoothie = get().smoothie;
          const mealId = `smoothie-${Date.now()}`;
          const meal: Meal = {
            id: mealId,
            name: 'Morning Smoothie',
            protein: smoothie.protein,
            calories: smoothie.calories,
            time: 'Breakfast',
            ts: Date.now(),
            isSmoothie: true,
          };
          const newMeals = [...get().meals, meal];
          const totalProtein = newMeals.reduce((sum, m) => sum + m.protein, 0);
          const updatedHabits = get().habits.map((h) => {
            if (h.id === 'protein' && totalProtein >= 135) {
              return { ...h, done: true };
            }
            return h;
          });
          set({ meals: newMeals, smoothieLoggedToday: true, habits: updatedHabits });
        }
      },

      toggleLongevityDone: (index) => {
        const longevityDone = { ...get().longevityDone };
        longevityDone[index] = !longevityDone[index];
        set({ longevityDone });
      },

      setBrief: (brief, phrase) => set({ brief, briefPhrase: phrase }),

      setQuit: (quit) => set({ quit, quitDays: 0, quitLastCheckin: null }),

      checkInQuit: () => {
        const today = new Date().toDateString();
        if (get().quitLastCheckin === today) {
          alert('You have already checked in today!');
          return;
        }
        set({ quitDays: get().quitDays + 1, quitLastCheckin: today });
      },

      resetQuit: () => {
        set({ quitDays: 0, quitLastCheckin: null });
      },

      logCognitive: (activity) => {
        const habits = get().habits.map((h) =>
          h.id === 'cognitive' ? { ...h, done: true } : h
        );
        set({ cogLoggedToday: activity, habits });
      },

      toggleStress: (activity) => {
        const stressLog = { ...get().stressLog };
        stressLog[activity] = !stressLog[activity];
        set({ stressLog });
      },

      archiveDay: (dayData) => {
        const archive = [...get().dailyArchive];
        const record: DayRecord = {
          date: new Date().toISOString().slice(0, 10),
          dateLabel: new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
          habitsTotal: get().habits.length,
          habitsDone: get().habits.filter((h) => h.done).length,
          protein: get().meals.reduce((sum, m) => sum + m.protein, 0),
          calories: get().meals.reduce((sum, m) => sum + m.calories, 0),
          water: get().waterGlasses * 8,
          bb: get().garmin?.bb || null,
          stressRating: (dayData.stressRating as number) || 0,
          clarity: (dayData.clarity as number) || 0,
          connection: (dayData.connection as boolean) || false,
          outdoors: (dayData.outdoors as boolean) || false,
          screen: (dayData.screen as string) || '',
          gratitude: (dayData.gratitude as string) || '',
          cogSession: get().cogLoggedToday,
          stressActivities: Object.values(get().stressLog).filter(Boolean).length,
        };
        archive.push(record);
        set({ dailyArchive: archive.slice(-90) });
      },

      resetDay: (newLongevityActions) => {
        set({
          meals: [],
          waterGlasses: 0,
          habits: get().habits.map((h) => ({ ...h, done: false })),
          smoothieLoggedToday: false,
          cogLoggedToday: null,
          stressLog: {},
          longevityActions: newLongevityActions,
          longevityDone: {},
          brief: '',
          briefPhrase: '',
          lastResetDate: new Date().toISOString().slice(0, 10),
        });
      },
    }),
    {
      name: 'durability_os_v1',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Validate date on hydration
          const today = new Date().toISOString().slice(0, 10);
          if (state.lastResetDate !== today) {
            state.lastResetDate = today;
          }
        }
      },
    }
  )
);
