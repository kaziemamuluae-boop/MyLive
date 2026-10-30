import React, { useState, useEffect } from 'react';
import {
  Search,
  WifiOff,
  RefreshCw,
  Heart,
  Sliders,
  Tv,
  Users,
  Film,
  Globe2,
  Settings,
  Info,
  SlidersHorizontal,
  ChevronRight,
  Shield,
  Activity,
  User,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { CHANNELS, CATEGORIES } from './data';
import { Channel } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SideDrawer } from './components/SideDrawer';
import { ChannelCard } from './components/ChannelCard';
import { PlayerScreen } from './components/PlayerScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { LiveEventsScreen } from './components/LiveEventsScreen';
import { SportsScreen } from './components/SportsScreen';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation active state: 'home', 'favorites', 'live-events', 'sports', 'categories', 'settings', 'about'
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Favorites persistence inside localStorage of current browser
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('vibestream_favorites');
    return saved ? JSON.parse(saved) : ['news-1', 'sports-1', 'movies-1']; // default favorites to make it pre-populated!
  });

  // State managers
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Settings mock state
  const [enableDataSaver, setEnableDataSaver] = useState<boolean>(false);
  const [serverLocation, setServerLocation] = useState<string>('auto');
  const [showAdultContent, setShowAdultContent] = useState<boolean>(false);

  // Save favorites to localStorage when state updates
  useEffect(() => {
    localStorage.setItem('vibestream_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Favorite button toggle action
  const handleFavoriteToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Simulated pull-to-refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Randomize viewers to show live data synchronization
      CHANNELS.forEach((channel) => {
        const value = Math.floor(Math.random() * 120) + 30;
        channel.viewers = `${value}K`;
      });
    }, 1200);
  };

  // Simulate loading skeletons when switching filter tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Auto-scroll screen top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoading(true);
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(delay);
  };

  // Filter channels based on Search block and Category tag
  const filteredChannels = CHANNELS.filter((ch) => {
    const matchesSearch = ch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ch.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const favoriteChannels = CHANNELS.filter((ch) => favorites.includes(ch.id));

  // Toggling online/offline simulation inside SideMenu
  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
  };

  // Re-establish internet link simulator
  const handleReconnect = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsOnline(true);
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div id="vibestream-viewport" className="min-h-screen bg-stone-950 text-stone-100 font-sans relative pb-28 pt-16">
      {/* Absolute background visual ambient overlay */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-15%] w-[60%] aspect-square rounded-full bg-rose-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[60%] aspect-square rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      {/* FIXED PREMIUM TOP HEADER */}
      <Header
        onMenuToggle={() => setIsDrawerOpen(!isDrawerOpen)}
        onFavoritesClick={() => handleTabChange('favorites')}
        favoritesCount={favorites.length}
        onSearchChange={setSearchQuery}
        searchValue={searchQuery}
        isOnline={isOnline}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        activeTab={activeTab}
      />

      {/* LEFT SIDE NAVIGATION MENU DRAWER */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favorites.length}
        isOnline={isOnline}
        onToggleOnline={handleToggleOnline}
      />

      {/* Main Container screen constraints */}
      <main className="max-w-7xl mx-auto px-4 py-5 select-none md:px-6">
        <AnimatePresence mode="wait">
          {/* OFFLINE / NO INTERNET OVERLAY SCREEN */}
          {!isOnline ? (
            <motion.div
              id="no-internet-fallback"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[60vh] max-w-md mx-auto"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 w-20 h-20 bg-red-500/10 rounded-full blur-2xl scale-125 animate-pulse" />
                <div className="w-20 h-20 rounded-full border border-red-900/40 bg-red-950/20 flex items-center justify-center relative shadow-inner">
                  <WifiOff className="w-10 h-10 text-red-500" />
                </div>
              </div>
              <h1 className="text-xl font-black text-stone-100">Connection Failed</h1>
              <span className="text-[10px] bg-red-950/50 border border-red-900/35 text-red-400 px-3 py-1 rounded-full font-bold uppercase mt-2.5 tracking-wider font-mono">
                Code ERR_OFFLINE_MODE
              </span>
              <p className="text-xs text-stone-400 mt-4 leading-relaxed font-sans">
                It appears your internet connection is down or simulation has been manually toggled via the Left Side Navigation Menu. Please reconnect or click below.
              </p>

              <div className="flex flex-col gap-2.5 w-full mt-8">
                <button
                  id="btn-offline-reconnect"
                  onClick={handleReconnect}
                  disabled={isRefreshing}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-red-950/40 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isRefreshing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Syncing Link...</span>
                    </>
                  ) : (
                    <span>Reconnect Simulation</span>
                  )}
                </button>
                <button
                  id="btn-offline-toggle-active"
                  onClick={handleToggleOnline}
                  className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 font-extrabold text-xs uppercase tracking-wide"
                >
                  Quick Inline Override
                </button>
              </div>
            </motion.div>
          ) : isLoading ? (
            /* SKELETON LOADER ANIMATION */
            <motion.div
              id="loading-skeleton-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="h-6 w-48 bg-stone-900 animate-pulse rounded-lg" />
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((itm) => (
                  <div key={itm} className="bg-stone-900/40 border border-stone-850 h-44 rounded-2xl p-4 flex flex-col justify-between animate-pulse">
                    <div className="w-full flex justify-between">
                      <div className="h-4 w-10 bg-stone-800 rounded" />
                      <div className="h-6 w-6 bg-stone-850 rounded-full" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-stone-850 self-center" />
                    <div className="h-3.5 w-16 bg-stone-800 self-center rounded mt-2" />
                    <div className="w-full h-1 bg-stone-850 rounded mt-3" />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div id="router-screens-container">
              {/* SCREEN Router */}
              {activeTab === 'home' && (
                <motion.div
                  id="home-screen-root"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Category badgework Quick Filters */}
                  <div className="space-y-3.5">
                    {/* Welcome banner and search (mobile visible search) */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-black text-stone-100 font-sans tracking-tight leading-tight flex items-center gap-1.5">
                          IPTV Channel Directories
                        </h2>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Explore live television feeds. Pull to refresh or toggle favorites.
                        </p>
                      </div>

                      {/* Mobile search bar */}
                      <div className="block md:hidden relative w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-500" />
                        <input
                          id="mobile-search-input"
                          type="text"
                          placeholder="Search live feeds..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-stone-900/95 border border-stone-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-stone-200 placeholder-stone-500 font-sans focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Feed status */}
                  {filteredChannels.length === 0 ? (
                    <div className="text-center py-20 bg-stone-900/30 border border-stone-900 rounded-3xl max-w-sm mx-auto">
                      <AlertTriangle className="w-10 h-10 text-stone-500 mx-auto mb-3" />
                      <h4 className="text-sm font-extrabold text-stone-300">No channels match search</h4>
                      <p className="text-xs text-stone-500 mt-2">Try looking for news, sports, hbo premium, or music beats.</p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-4 text-xs bg-stone-850 hover:bg-stone-800 border border-stone-800 text-stone-300 px-3.5 py-1.5 rounded-xl transition-all"
                      >
                        Reset Search
                      </button>
                    </div>
                  ) : (
                    /* Unlimited scrolling grid - Row contains exactly 3 channel cards constraint */
                    <div
                      id="channels-grid-layout"
                      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3"
                    >
                      {filteredChannels.map((channel) => (
                        <ChannelCard
                          key={channel.id}
                          channel={channel}
                          isFavorite={favorites.includes(channel.id)}
                          onFavoriteToggle={handleFavoriteToggle}
                          onChannelSelect={(ch) => setSelectedChannel(ch)}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'favorites' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <FavoritesScreen
                    favoriteChannels={favoriteChannels}
                    onFavoriteToggle={handleFavoriteToggle}
                    onChannelSelect={(ch) => setSelectedChannel(ch)}
                    onBrowseMore={() => handleTabChange('home')}
                  />
                </motion.div>
              )}

              {activeTab === 'live-events' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LiveEventsScreen
                    onEventTune={(chanName) => {
                      const channel = CHANNELS.find((c) => c.name.toLowerCase() === chanName.toLowerCase()) || CHANNELS[3];
                      setSelectedChannel(channel);
                    }}
                  />
                </motion.div>
              )}

              {activeTab === 'sports' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <SportsScreen
                    onTuneChannel={(chan) => setSelectedChannel(chan)}
                  />
                </motion.div>
              )}

              {activeTab === 'categories' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CategoriesScreen
                    channels={CHANNELS}
                    favorites={favorites}
                    onFavoriteToggle={handleFavoriteToggle}
                    onChannelSelect={(ch) => setSelectedChannel(ch)}
                  />
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  id="settings-screen-root"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5 max-w-xl mx-auto"
                >
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-black text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-rose-500" />
                      Applet Settings
                    </h2>
                    <p className="text-xs text-stone-400">
                      Configure live TV optimization preferences, server relay routers, and user subscriptions.
                    </p>
                  </div>

                  <div className="bg-stone-900/60 border border-stone-800 rounded-2xl divide-y divide-stone-800/80 overflow-hidden">
                    {/* Cellular Saver mock options */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-stone-100">Cellular Data Saver mode</span>
                        <span className="text-[10px] text-stone-400 max-w-xs">Compresses full-HD streams to 480p to conserve data plans.</span>
                      </div>
                      <button
                        onClick={() => setEnableDataSaver(!enableDataSaver)}
                        className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                          enableDataSaver ? 'bg-rose-600' : 'bg-stone-800'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                            enableDataSaver ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Server locations list selection */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-stone-100">Live Server Location</span>
                        <span className="text-[10px] text-stone-400">Select peer-to-peer cloud streaming point.</span>
                      </div>
                      <select
                        value={serverLocation}
                        onChange={(e) => setServerLocation(e.target.value)}
                        className="bg-stone-950 border border-stone-800 rounded-lg text-xs p-1.5 pr-8 text-stone-200 font-sans focus:border-rose-500 focus:outline-none"
                      >
                        <option value="auto">Automatic (Auto-Locate)</option>
                        <option value="frankfurt">Europe (Frankfurt Cloud)</option>
                        <option value="virginia">North America (Virginia CDN)</option>
                        <option value="tokyo">Asia Pacific (Tokyo Edge)</option>
                      </select>
                    </div>

                    {/* Pro Account Security check */}
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-950/40 border border-amber-900/40 text-amber-500 flex items-center justify-center">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-xs font-extrabold text-stone-100 block">Biometric / Pin Authentication</span>
                        <span className="text-[10px] text-stone-400">Lock adult category channels or pay-per-view arenas with a custom code.</span>
                      </div>
                      <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-sm">
                        Secured
                      </span>
                    </div>
                  </div>

                  {/* Profile statistics */}
                  <div className="bg-stone-900/30 border border-stone-800 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-950/50 flex items-center justify-center">
                        <User className="w-5 h-5 text-rose-500" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-black text-white block">Sovereign Cloud Subscription</span>
                        <span className="text-[10px] text-stone-400">Active membership registered on June 2026.</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 font-black px-2.5 py-1 rounded-lg">
                      LIFETIME SUBSCRIBER
                    </span>
                  </div>
                </motion.div>
              )}

              {activeTab === 'about' && (
                <motion.div
                  id="about-screen-root"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 max-w-2xl mx-auto text-center"
                >
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-400 flex items-center justify-center mx-auto shadow-2xl shadow-rose-900/40">
                    <Tv className="w-10 h-10 text-white" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-stone-100">VibeStream Premium App</h2>
                    <p className="text-xs text-stone-400 uppercase tracking-widest font-black font-mono">
                      Next-Gen Live TV & Sports Network UI v2.5.0
                    </p>
                  </div>

                  <p className="text-stone-300 text-xs leading-relaxed max-w-lg mx-auto font-sans bg-stone-900/45 p-4 rounded-2xl border border-stone-850">
                    VibeStream is a cutting-edge OTT TV streaming application prototype designed to demonstrate top-tier live television layouts. Built on modern React components with smooth framer motion animations, dark theme optimization, pull-to-refresh capabilities, and robust offline fallback routines.
                  </p>

                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left pt-3">
                    <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-xl">
                      <span className="font-extrabold text-xs text-white block">Ultra Latency Compression</span>
                      <p className="text-[10px] text-stone-400 mt-1 leading-normal">Our HLS feeds are decompressed peer-to-peer for instant buffering times under 1 second.</p>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-xl">
                      <span className="font-extrabold text-xs text-white block">Multi-Device Synchrony</span>
                      <p className="text-[10px] text-stone-400 mt-1 leading-normal">Your saved favorites and premium stats sync instantly to client side cache structures.</p>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone-500 pt-6">
                    Designed for Kaziemamul uae and Google AI Studio Build system.
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* FULL STREAM POPUP PLAYER SCREEN */}
      <AnimatePresence>
        {selectedChannel && (
          <PlayerScreen
            channel={selectedChannel}
            isFavorite={favorites.includes(selectedChannel.id)}
            onFavoriteToggle={handleFavoriteToggle}
            onBack={() => setSelectedChannel(null)}
            allChannels={CHANNELS}
            onChannelSelect={(ch) => setSelectedChannel(ch)}
          />
        )}
      </AnimatePresence>

      {/* FIXED FLOATING BOTTOM NAVIGATION BAR */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
