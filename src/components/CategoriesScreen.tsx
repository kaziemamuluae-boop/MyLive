import React, { useState } from 'react';
import {
  Globe,
  Trophy,
  Film,
  Music,
  Smile,
  Compass,
  Sparkles,
  Layers,
  ChevronRight,
  Tv
} from 'lucide-react';
import { Channel } from '../types';
import { ChannelCard } from './ChannelCard';
import { motion } from 'motion/react';

interface CategoriesScreenProps {
  channels: Channel[];
  favorites: string[];
  onFavoriteToggle: (id: string, e: React.MouseEvent) => void;
  onChannelSelect: (channel: Channel) => void;
}

export function CategoriesScreen({
  channels,
  favorites,
  onFavoriteToggle,
  onChannelSelect
}: CategoriesScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'News', name: 'Global News', icon: Globe, count: '2 Live', color: 'from-rose-500/10 to-rose-600/20 text-rose-500 border-rose-900/30' },
    { id: 'Sports', name: 'Sports Hub', icon: Trophy, count: '2 Live', color: 'from-blue-500/10 to-blue-600/20 text-blue-500 border-blue-900/30' },
    { id: 'Movies', name: 'CineMax & HBO', icon: Film, count: '2 Live', color: 'from-purple-500/10 to-purple-600/20 text-purple-500 border-purple-900/30' },
    { id: 'Music', name: 'Beats & Hits', icon: Music, count: '2 Live', color: 'from-amber-400/10 to-amber-500/20 text-amber-500 border-amber-900/30' },
    { id: 'Kids', name: 'Kids Anime', icon: Smile, count: '2 Live', color: 'from-orange-500/10 to-orange-600/20 text-orange-500 border-orange-900/30' },
    { id: 'Documentary', name: 'Explorer', icon: Compass, count: '2 Live', color: 'from-emerald-500/10 to-emerald-600/20 text-emerald-500 border-emerald-900/30' },
    { id: 'Entertainment', name: 'Reality & Shows', icon: Sparkles, count: '2 Live', color: 'from-pink-500/10 to-pink-600/20 text-pink-500 border-pink-900/30' },
    { id: 'International', name: 'Global Feeds', icon: Globe, count: '2 Live', color: 'from-stone-500/10 to-stone-600/20 text-stone-400 border-stone-800' }
  ];

  // Filter channels based on chosen category
  const filteredChannels = selectedCategory
    ? channels.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase())
    : [];

  return (
    <div id="categories-screen-root" className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-rose-500" />
          Browse Categories
        </h2>
        <p className="text-xs text-stone-400">
          Pick a category block below to instantly explore live streaming television options.
        </p>
      </div>

      {/* Category selection bento-style cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <motion.div
              key={cat.id}
              id={`cat-card-${cat.id}`}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
              className={`p-4 rounded-2xl cursor-pointer border text-left relative overflow-hidden transition-all duration-300 flex flex-col justify-between h-28 bg-gradient-to-b ${
                isSelected
                  ? 'from-rose-950/50 to-stone-950 border-rose-500 shadow-xl shadow-rose-950/20'
                  : `${cat.color} hover:bg-stone-900/40`
              }`}
            >
              {/* Highlight decorative dot */}
              {isSelected && (
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}

              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-stone-950/80 border border-stone-900/50 flex items-center justify-center">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-rose-500' : ''}`} />
              </div>

              {/* Titles */}
              <div className="flex items-end justify-between mt-2">
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold text-sm text-stone-100 truncate">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-stone-500 font-bold">{cat.count}</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-stone-500 transition-transform ${isSelected ? 'rotate-90 text-rose-400' : ''}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Category channels loader list (strictly 3 columns on mobile as requested) */}
      {selectedCategory && (
        <motion.div
          id="category-results-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 pt-4 border-t border-stone-900"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-extrabold text-rose-400 tracking-wider flex items-center gap-1.5">
              <span className="w-1 h-3 bg-rose-500 rounded-sm" />
              Showing Live {selectedCategory} Channels
            </h3>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-[10px] font-bold text-stone-500 hover:text-white transition-colors border border-stone-800 px-2.5 py-1 rounded-lg hover:bg-stone-900"
            >
              Clear filter
            </button>
          </div>

          {filteredChannels.length === 0 ? (
            <div className="text-center py-8 bg-stone-900/20 border border-stone-900 rounded-2xl">
              <span className="text-xs text-stone-500">No active streams found in this category.</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {filteredChannels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  isFavorite={favorites.includes(channel.id)}
                  onFavoriteToggle={onFavoriteToggle}
                  onChannelSelect={onChannelSelect}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
