import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDurabilityStore } from '../store';
import { generateBrief } from '../lib/coaching';

export default function CheckIn() {
  const navigate = useNavigate();
  const { setGarmin, setBrief } = useDurabilityStore();

  const [formData, setFormData] = useState({
    bb: 50,
    hrv: 'Balanced',
    sleep: 50,
    gstress: 50,
    rhr: 60,
    energy: 3,
    scheduleIntensity: 'Moderate',
    traveling: 'No',
    externalStressors: 'No',
  });

  const handleGenerate = () => {
    const garminData = {
      bb: formData.bb,
      hrv: formData.hrv,
      sleep: formData.sleep,
      gstress: formData.gstress,
      rhr: formData.rhr,
    };

    setGarmin(garminData);

    const { brief, phrase } = generateBrief({
      garmin: garminData,
      energy: formData.energy,
      scheduleIntensity: formData.scheduleIntensity,
      traveling: formData.traveling === 'Yes',
      externalStressors: formData.externalStressors === 'Yes',
    });

    setBrief(brief, phrase);
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-xl font-medium text-gray-900">Morning check-in</h1>
        <p className="text-sm text-gray-500">Enter your Garmin data and context</p>
      </div>

      {/* Garmin Data Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-900">
              Body Battery
            </label>
            <span className="text-lg font-semibold text-gray-900">
              {formData.bb}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.bb}
            onChange={(e) =>
              setFormData({ ...formData, bb: parseInt(e.target.value) })
            }
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Primary readiness score
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            HRV Status
          </label>
          <select
            value={formData.hrv}
            onChange={(e) => setFormData({ ...formData, hrv: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option>Balanced</option>
            <option>Low</option>
            <option>High</option>
            <option>Unbalanced</option>
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-900">
              Sleep Score
            </label>
            <span className="text-lg font-semibold text-gray-900">
              {formData.sleep}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.sleep}
            onChange={(e) =>
              setFormData({ ...formData, sleep: parseInt(e.target.value) })
            }
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-900">
              Stress Score
            </label>
            <span className="text-lg font-semibold text-gray-900">
              {formData.gstress}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.gstress}
            onChange={(e) =>
              setFormData({ ...formData, gstress: parseInt(e.target.value) })
            }
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">Lower is better</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-900">
              Resting Heart Rate
            </label>
            <span className="text-lg font-semibold text-gray-900">
              {formData.rhr} bpm
            </span>
          </div>
          <input
            type="range"
            min="40"
            max="100"
            value={formData.rhr}
            onChange={(e) =>
              setFormData({ ...formData, rhr: parseInt(e.target.value) })
            }
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">Lower = better recovery</p>
        </div>
      </div>

      {/* Context Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        <h2 className="font-medium text-gray-900 mb-4">Context</h2>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-900">Energy</label>
            <span className="text-lg font-semibold text-gray-900">
              {formData.energy} / 5
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={formData.energy}
            onChange={(e) =>
              setFormData({ ...formData, energy: parseInt(e.target.value) })
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Schedule intensity
          </label>
          <select
            value={formData.scheduleIntensity}
            onChange={(e) =>
              setFormData({
                ...formData,
                scheduleIntensity: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option>Light</option>
            <option>Moderate</option>
            <option>Heavy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Traveling today?
          </label>
          <select
            value={formData.traveling}
            onChange={(e) =>
              setFormData({ ...formData, traveling: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            External stressors?
          </label>
          <select
            value={formData.externalStressors}
            onChange={(e) =>
              setFormData({ ...formData, externalStressors: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
      >
        Generate today's brief ↗
      </button>
    </div>
  );
}
