import { Radio, Trophy, LayoutGrid } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'live-events', name: 'Live Events', icon: Radio, idString: 'btn-nav-live-events' },
    { id: 'sports', name: 'Sports', icon: Trophy, idString: 'btn-nav-sports' },
    { id: 'categories', name: 'Categories', icon: LayoutGrid, idString: 'btn-nav-categories' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-1 pointer-events-none flex justify-center">
      <nav
        id="floating-bottom-nav"
        className="w-full max-w-md bg-stone-950/95 backdrop-blur-lg border border-stone-800/80 rounded-2xl shadow-2xl p-2 px-4 flex justify-between items-center pointer-events-auto shadow-rose-950/20"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={item.idString}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all duration-300 relative ${
                isActive
                  ? 'text-white'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="relative">
                {/* Active Glowing Dot Indicator */}
                {isActive && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-rose-500 blur-[2px] animate-pulse" />
                )}
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? 'scale-110 text-rose-500' : 'scale-100'
                  }`}
                />
              </div>
              <span className={`text-[10px] font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-rose-400' : 'text-stone-400 font-medium'}`}>
                {item.name}
              </span>

              {/* Background Ambient Glow */}
              {isActive && (
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-rose-950/40 via-stone-900/50 to-amber-950/20 border border-rose-900/30" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
