import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useDurabilityStore } from '../store';

const COGNITIVE_ACTIVITIES = [
  {
    tier: 1,
    name: 'Dual N-back',
    description: 'Train working memory and attention through pattern recognition.',
    trains: ['Working memory', 'Focus'],
    links: [
      { text: 'brainscale.net', url: 'https://brainscale.net/dual-n-back' },
      { text: 'iOS App Store', url: 'https://apps.apple.com' },
    ],
  },
  {
    tier: 1,
    name: 'Learning something new',
    description: 'Acquire a new skill or concept through structured learning.',
    trains: ['Neuroplasticity', 'Focus'],
    links: [
      { text: 'Duolingo', url: 'https://duolingo.com' },
      { text: 'Yousician', url: 'https://yousician.com' },
    ],
  },
  {
    tier: 1,
    name: 'Deep work block',
    description: 'Uninterrupted focused work on high-value tasks, 45-90 min.',
    trains: ['Deep focus', 'Problem solving'],
    links: [],
  },
  {
    tier: 2,
    name: 'NYT Connections',
    description: 'Find the group of four items that share a common thread.',
    trains: ['Pattern recognition', 'Lateral thinking'],
    links: [{ text: 'Play', url: 'https://nytimes.com/games/connections' }],
  },
  {
    tier: 2,
    name: 'NYT Strands',
    description: 'Find interconnected words on a grid.',
    trains: ['Vocabulary', 'Pattern matching'],
    links: [{ text: 'Play', url: 'https://nytimes.com/games/strands' }],
  },
  {
    tier: 2,
    name: 'Wordle',
    description: 'Guess a five-letter word in six tries.',
    trains: ['Vocabulary', 'Reasoning'],
    links: [{ text: 'Play', url: 'https://nytimes.com/games/wordle' }],
  },
  {
    tier: 2,
    name: 'Chess',
    description: 'Solve tactical puzzles or play live games.',
    trains: ['Strategic thinking', 'Pattern recognition'],
    links: [
      { text: 'chess.com/puzzles', url: 'https://chess.com/puzzles' },
      { text: 'lichess.org', url: 'https://lichess.org' },
    ],
  },
  {
    tier: 2,
    name: 'Reading non-fiction 30+ min',
    description: 'Deep read on a topic that interests you.',
    trains: ['Knowledge', 'Focus'],
    links: [],
  },
  {
    tier: 3,
    name: 'NYT Crossword/Mini',
    description: 'Classic word puzzle challenge.',
    trains: ['Vocabulary', 'Pattern recognition'],
    links: [{ text: 'Play', url: 'https://nytimes.com/crosswords' }],
  },
  {
    tier: 3,
    name: 'Sudoku hard',
    description: 'Logic puzzle requiring systematic deduction.',
    trains: ['Logic', 'Concentration'],
    links: [{ text: 'Play', url: 'https://nytimes.com/puzzles/sudoku/hard' }],
  },
  {
    tier: 3,
    name: 'Creative project',
    description: 'Write, build, design, or create something.',
    trains: ['Creativity', 'Expression'],
    links: [],
  },
];

const STRESS_ACTIVITIES = [
  'Breathwork',
  'Outdoor walk',
  'Sauna',
  'Cold exposure',
  'Meditation / quiet time',
  'No-phone walk',
  'Post-meal walk',
  'Stretching / mobility',
  'Gratitude reflection',
  'Journaling',
  'Reading instead of screens',
  'Family / social connection',
  'Laughter or play',
];

type Tab = 'evening' | 'cognitive' | 'stress';

export default function Mind() {
  const [activeTab, setActiveTab] = useState<Tab>('evening');
  const [stressToday, setStressToday] = useState(3);
  const [clarity, setClarity] = useState(3);
  const [connection, setConnection] = useState('No');
  const [learned, setLearned] = useState('No');
  const [outdoors, setOutdoors] = useState('No');
  const [screenDiscipline, setScreenDiscipline] = useState('Okay');
  const [gratitude, setGratitude] = useState('');
  const [reflection, setReflection] = useState('');

  const {
    cogLoggedToday,
    stressLog,
    archiveDay,
    logCognitive,
    toggleStress,
  } = useDurabilityStore();

  const handleEveningSave = () => {
    archiveDay({
      stressRating: stressToday,
      clarity,
      connection: connection === 'Yes',
      outdoors: outdoors === 'Yes',
      screen: screenDiscipline,
      gratitude,
    });
    alert('Evening reflection saved and archived!');
  };

  const handleLogActivity = (name: string) => {
    logCognitive(name);
    alert(`${name} logged!`);
  };

  const getTierColor = (tier: number) => {
    if (tier === 1) return 'bg-green-100 text-green-700';
    if (tier === 2) return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="pt-2 mb-4">
        <h1 className="text-xl font-medium text-gray-900">Mind & Resilience</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 bg-white rounded-xl border border-gray-200 p-1">
        {['evening', 'cognitive', 'stress'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as Tab)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
              activeTab === tab
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Evening Tab */}
      {activeTab === 'evening' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-900">
                  Stress today
                </label>
                <span className="text-lg font-semibold text-gray-900">
                  {stressToday} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={stressToday}
                onChange={(e) => setStressToday(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-900">
                  Mental clarity
                </label>
                <span className="text-lg font-semibold text-gray-900">
                  {clarity} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={clarity}
                onChange={(e) => setClarity(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Meaningful connection today?
              </label>
              <select
                value={connection}
                onChange={(e) => setConnection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Learned or created something?
              </label>
              <select
                value={learned}
                onChange={(e) => setLearned(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Time outdoors?
              </label>
              <select
                value={outdoors}
                onChange={(e) => setOutdoors(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Screen discipline
              </label>
              <select
                value={screenDiscipline}
                onChange={(e) => setScreenDiscipline(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option>Good</option>
                <option>Okay</option>
                <option>Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                What worked today?
              </label>
              <textarea
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                placeholder="One thing that moved you forward, restored energy, or felt right."
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                One-sentence reflection (optional)
              </label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <button
              onClick={handleEveningSave}
              className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Save reflection & archive today
            </button>
          </div>
        </div>
      )}

      {/* Cognitive Tab */}
      {activeTab === 'cognitive' && (
        <div className="space-y-3">
          {cogLoggedToday && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                ✓ {cogLoggedToday} — logged today
              </p>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <p className="text-sm text-gray-600">
              Daily cognitive challenge is a non-negotiable. Log one session per day.
            </p>
          </div>

          {COGNITIVE_ACTIVITIES.map((activity, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900">
                      {activity.name}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTierColor(
                        activity.tier
                      )}`}
                    >
                      Tier {activity.tier}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {activity.description}
                  </p>
                  {activity.trains.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {activity.trains.map((train, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                        >
                          {train}
                        </span>
                      ))}
                    </div>
                  )}
                  {activity.links.length > 0 && (
                    <div className="flex gap-2">
                      {activity.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {link.text} <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleLogActivity(activity.name)}
                disabled={cogLoggedToday !== null}
                className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition ${
                  cogLoggedToday !== null
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {cogLoggedToday === activity.name ? '✓ Logged' : 'Log session'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Stress Reduction Tab */}
      {activeTab === 'stress' && (
        <div className="bg-white rounded-xl border border-gray-200 divide-y">
          {STRESS_ACTIVITIES.map((activity) => (
            <div
              key={activity}
              className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <span className="text-sm text-gray-900">{activity}</span>
              <button
                onClick={() => toggleStress(activity)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  stressLog[activity]
                    ? 'bg-green-600'
                    : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    stressLog[activity] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
