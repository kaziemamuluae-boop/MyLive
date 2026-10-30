import { Menu, Heart, Search, WifiOff, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onFavoritesClick: () => void;
  favoritesCount: number;
  onSearchChange?: (val: string) => void;
  searchValue?: string;
  isOnline: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  activeTab: string;
}

export function Header({
  onMenuToggle,
  onFavoritesClick,
  favoritesCount,
  onSearchChange,
  searchValue = '',
  isOnline,
  onRefresh,
  isRefreshing,
  activeTab
}: HeaderProps) {
  return (
    <header
      id="fixed-top-header"
      className="fixed top-0 left-0 right-0 z-40 h-16 bg-stone-950/80 backdrop-blur-md border-b border-stone-800/80 px-4 flex items-center justify-between transition-colors duration-300"
    >
      {/* Left Menu Button */}
      <div className="flex items-center gap-3">
        <button
          id="btn-hamburger-menu"
          onClick={onMenuToggle}
          className="p-2 -ml-2 rounded-full hover:bg-stone-900 active:scale-95 transition-all text-stone-300 hover:text-white"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Title & Brand logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-600/20">
            <span className="text-white font-black text-sm tracking-wider">V</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              VibeStream
              <span className="text-[10px] uppercase tracking-widest bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold px-1 rounded-sm">
                Live
              </span>
            </span>
            <span className="text-[9px] -mt-1 text-stone-400 font-medium tracking-wide">
              Premium Stream Play
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Search Box for home tab */}
      {activeTab === 'home' && onSearchChange && (
        <div className="hidden md:flex items-center max-w-xs relative flex-1 mx-4">
          <Search className="absolute left-3 w-4 h-4 text-stone-400" />
          <input
            id="desktop-search-input"
            type="text"
            placeholder="Search channels..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-stone-900 border border-stone-800 rounded-full py-1.5 pl-9 pr-4 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-sans"
          />
        </div>
      )}

      {/* Right Side Icons */}
      <div className="flex items-center gap-1.5">
        {/* Offline Status indicator badge */}
        {!isOnline && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-400 text-[10px] font-bold animate-pulse">
            <WifiOff className="w-3 h-3" />
            <span>OFFLINE</span>
          </div>
        )}

        {/* Pull-To-Refresh Simulation Button */}
        <button
          id="btn-simulated-refresh"
          onClick={onRefresh}
          className={`p-2 rounded-full hover:bg-stone-900 active:scale-90 transition-all text-stone-300 hover:text-white ${isRefreshing ? 'animate-spin text-rose-500' : ''}`}
          title="Refresh Channel Feed"
        >
          <RefreshCw className="w-5 h-5" />
        </button>

        {/* Favorite Icon with badge */}
        <button
          id="btn-header-favorites"
          onClick={onFavoritesClick}
          className="p-2 rounded-full hover:bg-stone-900 active:scale-95 transition-all text-stone-300 hover:text-rose-500 relative"
          title="View Saved Favorites"
        >
          <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
          {favoritesCount > 0 && (
            <span
              id="header-favorites-badge"
              className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-600 to-orange-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-stone-950 animate-bounce"
            >
              {favoritesCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
