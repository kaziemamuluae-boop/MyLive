import React from 'react';
import { Heart, Globe, Trophy, Film, Music, Smile, Compass, Sparkles, Globe2, Crown, Users } from 'lucide-react';
import { Channel } from '../types';
import { motion } from 'motion/react';

interface ChannelCardProps {
  key?: string;
  channel: Channel;
  isFavorite: boolean;
  onFavoriteToggle: (id: string, e: React.MouseEvent) => void;
  onChannelSelect: (channel: Channel) => void;
}

export function ChannelCard({
  channel,
  isFavorite,
  onFavoriteToggle,
  onChannelSelect
}: ChannelCardProps) {
  // Map category to Lucide icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'news':
        return Globe;
      case 'sports':
        return Trophy;
      case 'movies':
        return Film;
      case 'music':
        return Music;
      case 'kids':
        return Smile;
      case 'documentary':
        return Compass;
      case 'entertainment':
        return Sparkles;
      default:
        return Globe2;
    }
  };

  const IconComponent = getCategoryIcon(channel.category);

  return (
    <motion.div
      id={`channel-card-${channel.id}`}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onChannelSelect(channel)}
      className="relative bg-gradient-to-b from-stone-900 to-stone-950/90 hover:from-stone-800/90 hover:to-stone-900/90 border border-stone-800/80 rounded-2xl p-3.5 flex flex-col items-center justify-between shadow-lg cursor-pointer transition-all duration-300 group overflow-hidden select-none min-h-[160px]"
    >
      {/* Top Banner Accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${channel.logo}`} />

      {/* Decorative background grid */}
      <div className="absolute inset-0 -z-10 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Top row actions */}
      <div className="w-full flex items-center justify-between relative z-10">
        {/* Premium Badge */}
        {channel.isPremium ? (
          <span className="flex items-center gap-0.5 text-[8px] font-black uppercase text-amber-400 bg-amber-950/65 border border-amber-800/30 px-1.5 py-0.5 rounded-full animate-pulse">
            <Crown className="w-2 h-2 text-amber-400 fill-amber-400" />
            <span>PRO</span>
          </span>
        ) : (
          <span className="text-[8px] font-bold uppercase text-stone-400 bg-stone-950/60 border border-stone-800 px-1.5 py-0.5 rounded-full">
            FREE
          </span>
        )}

        {/* Favorite Icon inside top right corner */}
        <button
          id={`btn-favorite-card-${channel.id}`}
          onClick={(e) => onFavoriteToggle(channel.id, e)}
          className="p-1.5 rounded-full bg-stone-950/80 border border-stone-800/60 text-stone-400 hover:text-rose-500 hover:border-rose-900/40 hover:bg-rose-950/20 active:scale-90 transition-all z-20 pointer-events-auto"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-400 group-hover:text-stone-300'
            }`}
          />
        </button>
      </div>

      {/* Circular Channel Icon/Logo Frame */}
      <div className="my-2.5 relative flex items-center justify-center">
        {/* Animated ambient circular backglow */}
        <div className={`absolute inset-0 w-14 h-14 rounded-full blur-md opacity-30 ${channel.logo} group-hover:opacity-45 transition-opacity duration-300`} />
        
        {/* Perfect Circular Frame requested */}
        <div className={`w-14 h-14 rounded-full border-2 border-stone-800 bg-stone-950 flex items-center justify-center relative overflow-hidden group-hover:border-rose-500/30 transition-all duration-300`}>
          <div className={`absolute inset-0 w-full h-full opacity-10 bg-gradient-to-tr from-white to-transparent`} />
          <IconComponent className={`w-6 h-6 text-white group-hover:scale-110 transition-transform duration-350`} />
        </div>
      </div>

      {/* Channel Name */}
      <div className="w-full text-center relative z-10 flex flex-col gap-0.5">
        <h3 className="font-bold text-xs text-stone-100 group-hover:text-rose-400 transition-colors line-clamp-1 pointer-events-none">
          {channel.name}
        </h3>
        <span className="text-[9px] text-stone-500 group-hover:text-stone-400 transition-colors capitalize font-medium pointer-events-none flex items-center justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {channel.category}
        </span>
      </div>

      {/* Bottom program snippet */}
      <div className="w-full mt-2 pt-1.5 border-t border-stone-800/40 flex justify-between items-center text-[9px] text-stone-400 font-sans">
        <span className="truncate max-w-[55px] font-medium text-stone-500">Live Show</span>
        <span className="flex items-center gap-0.5 text-rose-500 font-bold bg-rose-950/20 px-1 rounded">
          <Users className="w-2 h-2" />
          {channel.viewers}
        </span>
      </div>
    </motion.div>
  );
}
