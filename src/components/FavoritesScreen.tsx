import React from 'react';
import { Heart, Play, ShoppingBag } from 'lucide-react';
import { Channel } from '../types';
import { ChannelCard } from './ChannelCard';
import { motion } from 'motion/react';

interface FavoritesScreenProps {
  favoriteChannels: Channel[];
  onFavoriteToggle: (id: string, e: React.MouseEvent) => void;
  onChannelSelect: (channel: Channel) => void;
  onBrowseMore: () => void;
}

export function FavoritesScreen({
  favoriteChannels,
  onFavoriteToggle,
  onChannelSelect,
  onBrowseMore
}: FavoritesScreenProps) {
  return (
    <div id="favorites-screen-root" className="space-y-6">
      {/* Page Title & Intro */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            My Saved Channels
          </h2>
          <p className="text-xs text-stone-400">
            Access your curated list of favorite premium live television channels anytime.
          </p>
        </div>
        <span className="text-xs font-bold text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-full">
          Total Saved: <span className="text-rose-400">{favoriteChannels.length}</span>
        </span>
      </div>

      {favoriteChannels.length === 0 ? (
        /* Circular/Pulse empty state */
        <motion.div
          id="favorites-empty-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-stone-900/40 to-stone-950/20 border border-stone-900 rounded-3xl"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 w-16 h-16 bg-rose-500/10 rounded-full blur-xl scale-125 animate-pulse" />
            <div className="w-16 h-16 rounded-full border border-stone-800 bg-stone-950 flex items-center justify-center relative">
              <Heart className="w-8 h-8 text-stone-600" />
            </div>
          </div>
          <h3 className="text-base font-extrabold text-stone-300">No Saved Channels Yet</h3>
          <p className="text-xs text-stone-500 max-w-sm mt-2 leading-relaxed">
            Click the small heart icon at the top corner of any channel card inside the live TV list directory to keep it pinned here for swift streaming access.
          </p>

          <button
            id="btn-back-to-browse"
            onClick={onBrowseMore}
            className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-extrabold text-xs tracking-wide shadow-lg shadow-rose-950/40 active:scale-95 transition-all flex items-center gap-2"
          >
            <Play className="w-4.5 h-4.5 fill-white" />
            Find Live Channels
          </button>
        </motion.div>
      ) : (
        /* Channel Card Grid with 3 channel cards in each row on mobile as requested! */
        <div id="favorites-channel-grid" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {favoriteChannels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              isFavorite={true}
              onFavoriteToggle={onFavoriteToggle}
              onChannelSelect={onChannelSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
