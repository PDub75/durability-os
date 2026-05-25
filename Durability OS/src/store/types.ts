export interface GarminData {
  bb: number;
  hrv: string;
  sleep: number;
  gstress: number;
  rhr: number;
}

export interface Meal {
  id: string;
  name: string;
  protein: number;
  calories: number;
  time: string;
  ts: number;
  isSmoothie?: boolean;
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  done: boolean;
  priority: boolean;
}

export interface DayRecord {
  date: string;
  dateLabel: string;
  habitsTotal: number;
  habitsDone: number;
  protein: number;
  calories: number;
  water: number;
  bb: number | null;
  stressRating: number;
  clarity: number;
  connection: boolean;
  outdoors: boolean;
  screen: string;
  gratitude: string;
  cogSession: string | null;
  stressActivities: number;
}

export interface DurabilityState {
  garmin: GarminData | null;
  meals: Meal[];
  waterGlasses: number;
  habits: Habit[];
  brief: string;
  briefPhrase: string;
  stressLog: Record<string, boolean>;
  cogLoggedToday: string | null;
  quit: { habit: string; replacement: string; reason: string } | null;
  quitDays: number;
  quitLastCheckin: string | null;
  smoothie: { protein: number; calories: number; ingredients: string };
  smoothieLoggedToday: boolean;
  longevityActions: string[];
  longevityDone: Record<number, boolean>;
  dailyArchive: DayRecord[];
  lastResetDate: string;

  setGarmin: (garmin: GarminData) => void;
  addMeal: (meal: Meal) => void;
  deleteMeal: (id: string) => void;
  logSmoothie: () => void;
  setWaterGlasses: (glasses: number) => void;
  toggleHabit: (id: string) => void;
  toggleLongevityDone: (index: number) => void;
  setBrief: (brief: string, phrase: string) => void;
  setQuit: (quit: { habit: string; replacement: string; reason: string }) => void;
  checkInQuit: () => void;
  resetQuit: () => void;
  logCognitive: (activity: string) => void;
  toggleStress: (activity: string) => void;
  archiveDay: (dayData: Partial<DayRecord>) => void;
  resetDay: (newLongevityActions: string[]) => void;
  initializeHabits: (habits: Habit[]) => void;
}
