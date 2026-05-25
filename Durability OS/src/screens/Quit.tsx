import { useState } from 'react';
import { useDurabilityStore } from '../store';

export default function Quit() {
  const {
    quit,
    quitDays,
    setQuit,
    checkInQuit,
    resetQuit,
  } = useDurabilityStore();

  const [setupForm, setSetupForm] = useState({
    habit: '',
    replacement: '',
    reason: '',
  });

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupForm.habit || !setupForm.replacement || !setupForm.reason) {
      alert('Please fill in all fields');
      return;
    }
    setQuit({
      habit: setupForm.habit,
      replacement: setupForm.replacement,
      reason: setupForm.reason,
    });
    setSetupForm({ habit: '', replacement: '', reason: '' });
  };

  const handleSlip = () => {
    if (window.confirm('Are you sure? This will reset your streak to 0.')) {
      resetQuit();
    }
  };

  if (!quit) {
    return (
      <div className="max-w-lg mx-auto p-4 space-y-4">
        <div className="pt-2">
          <h1 className="text-xl font-medium text-gray-900">Quit a habit</h1>
          <p className="text-sm text-gray-500">
            One thing at a time. Replacement behavior is not optional.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm text-gray-600">
            Research is clear: one thing at a time. The replacement behavior is not optional
            — it fills the gap the habit leaves. Slips are data, not failure.
          </p>
        </div>

        <form onSubmit={handleCommit} className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                The habit
              </label>
              <input
                type="text"
                placeholder="e.g. Alcohol, late-night scrolling, sugar"
                value={setupForm.habit}
                onChange={(e) =>
                  setSetupForm({ ...setupForm, habit: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Replace it with
              </label>
              <input
                type="text"
                placeholder="e.g. Sparkling water + 5 min walk"
                value={setupForm.replacement}
                onChange={(e) =>
                  setSetupForm({
                    ...setupForm,
                    replacement: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Why does this matter to you?
              </label>
              <textarea
                placeholder="This is your anchor. Why this habit, why now."
                value={setupForm.reason}
                onChange={(e) =>
                  setSetupForm({ ...setupForm, reason: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Commit to stopping this
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <div className="pt-2">
        <p className="text-sm text-gray-600 mb-4">Active quit goal</p>
        <h1 className="text-3xl font-semibold text-gray-900 mb-1">
          {quit.habit}
        </h1>
        <div className="text-7xl font-bold text-gray-900 mb-1">
          {quitDays}
        </div>
        <p className="text-lg text-gray-600">days strong</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div>
          <p className="text-xs text-gray-500 uppercase font-medium mb-1">
            Replacing with
          </p>
          <p className="text-gray-900">{quit.replacement}</p>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <p className="text-sm italic text-gray-600">
            Every day without it is a deposit into the 80-year-old version of you.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={checkInQuit}
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Stayed clean today ✓
        </button>
        <button
          onClick={handleSlip}
          className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition"
        >
          I slipped — reset honestly
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h2 className="font-medium text-gray-900 mb-2">Why this matters</h2>
        <p className="text-sm text-gray-600">{quit.reason}</p>
      </div>
    </div>
  );
}
