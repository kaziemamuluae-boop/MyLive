import {
  X,
  Home,
  Heart,
  Tv,
  Trophy,
  LayoutGrid,
  Settings,
  Info,
  Crown,
  Wifi,
  WifiOff,
  User,
  Radio
} from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  favoritesCount: number;
  isOnline: boolean;
  onToggleOnline: () => void;
  userEmail?: string;
}

export function SideDrawer({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  favoritesCount,
  isOnline,
  onToggleOnline,
  userEmail = 'premium.user@stream.tv'
}: SideDrawerProps) {
  const menuItems = [
    { id: 'home', name: 'Home / Live TV', icon: Home, badge: 0 },
    { id: 'favorites', name: 'My Favorites', icon: Heart, badge: favoritesCount },
    { id: 'live-events', name: 'Live Arenas', icon: Radio, badge: 0 },
    { id: 'sports', name: 'Sports Hub', icon: Trophy, badge: 0 },
    { id: 'categories', name: 'Categories', icon: LayoutGrid, badge: 0 },
    { id: 'settings', name: 'App Settings', icon: Settings, badge: 0 },
    { id: 'about', name: 'About Stream', icon: Info, badge: 0 }
  ];

  if (!isOpen) return null;

  return (
    <div id="side-drawer-container" className="fixed inset-0 z-50 flex">
      {/* Dimmed static backdrop */}
      <div
        id="side-drawer-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div
        id="side-drawer-panel"
        className="relative w-80 max-w-[85vw] h-full bg-gradient-to-b from-stone-950 to-stone-900 border-r border-stone-800 text-stone-200 flex flex-col shadow-2xl z-10 transition-transform duration-300 transform translate-x-0"
      >
        {/* Profile/Subscriber Banner */}
        <div className="p-5 border-b border-stone-800 bg-stone-950/80 relative overflow-hidden">
          {/* Decorative glowing gradient circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-3xl -z-10" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Crown className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-400">
                Premium Member
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center p-0.5 shadow-md shadow-rose-950">
              <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
                <User className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm text-white truncate">Kaziemamul Uae</span>
              <span className="text-xs text-stone-400 truncate">{userEmail}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Nav links */}
        <div id="drawer-menu-list" className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`drawer-btn-${item.id}`}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 font-sans ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-950/40 to-stone-900 border border-rose-900/40 text-rose-400'
                    : 'hover:bg-stone-900/60 text-stone-300 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-rose-500' : 'text-stone-400 group-hover:text-white'}`} />
                  <span className="font-semibold text-sm">{item.name}</span>
                </div>
                {item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[10px] font-black">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Network State Controller Switcher */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/60">
          <div className="bg-stone-900/85 border border-stone-800/80 rounded-xl p-3 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Network Emulator</span>
                <span className="text-[10px] text-stone-400">Toggle offline flow</span>
              </div>
              <button
                id="btn-toggle-online-offline"
                onClick={onToggleOnline}
                className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all outline-none ${
                  isOnline
                    ? 'bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/30'
                    : 'bg-red-950/40 border border-red-800/50 text-red-500 hover:bg-red-900/30 font-bold'
                }`}
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ONLINE</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-red-500" />
                    <span>OFFLINE</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-[10px] text-stone-500 leading-relaxed font-sans">
              Designed as a professional fallback. If switched to offline, the UI renders the premium custom &ldquo;<span className="text-stone-400">No Internet</span>&rdquo; page.
            </div>
          </div>
        </div>

        {/* Footer/Meta Info */}
        <div className="p-4 border-t border-stone-800/40 text-center bg-stone-950/90 text-[10px] text-stone-500 flex flex-col gap-0.5">
          <span>VibeStream Premium IPTV UI v2.5.0</span>
          <span>© 12026 Sovereign Networks</span>
        </div>
      </div>
    </div>
  );
}
