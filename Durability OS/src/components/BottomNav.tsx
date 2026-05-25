import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  LogIn,
  Apple,
  Brain,
  Zap,
  BarChart3,
} from 'lucide-react';

const TABS = [
  { id: 'home', path: '/', label: 'Home', icon: Home },
  { id: 'checkin', path: '/checkin', label: 'Check-in', icon: LogIn },
  { id: 'food', path: '/food', label: 'Food', icon: Apple },
  { id: 'mind', path: '/mind', label: 'Mind', icon: Brain },
  { id: 'quit', path: '/quit', label: 'Quit', icon: Zap },
  { id: 'review', path: '/review', label: 'Review', icon: BarChart3 },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 shadow-2xl">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-around">
          {TABS.map(({ id, path, label, icon: Icon }) => {
            const isActive = currentPath === path;
            return (
              <button
                key={id}
                onClick={() => navigate(path)}
                className={`flex-1 py-4 px-2 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 relative group min-h-20 ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-t-lg" />
                )}

                {/* Icon with animation */}
                <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                  <Icon
                    size={24}
                    className={isActive ? 'stroke-primary-600' : 'stroke-current'}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>

                {/* Label */}
                <span className={`text-xs font-semibold tracking-tight transition-colors ${
                  isActive ? 'text-primary-600' : 'text-slate-600'
                }`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
