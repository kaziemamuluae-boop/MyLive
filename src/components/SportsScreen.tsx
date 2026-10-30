import { Activity, Play, Trophy, Users, Star, RefreshCw } from 'lucide-react';
import { SPORTS_MATCHES, CHANNELS } from '../data';
import { Channel } from '../types';
import { motion } from 'motion/react';
import { useState } from 'react';

interface SportsScreenProps {
  onTuneChannel: (channel: Channel) => void;
}

export function SportsScreen({ onTuneChannel }: SportsScreenProps) {
  const [matches, setMatches] = useState(SPORTS_MATCHES);
  const [isUpdating, setIsUpdating] = useState(false);

  // Filter sports channels specifically
  const sportsChannels = CHANNELS.filter((c) => c.category === 'Sports');

  // Interactive live scores simulator refresh
  const triggerScoreUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setMatches((prev) =>
        prev.map((m) => {
          if (m.status === 'Live') {
            // Randomly increase score with 25% chance
            const incA = Math.random() > 0.75 ? 1 : 0;
            const incB = Math.random() > 0.8 ? 1 : 0;
            const currentMin = parseInt(m.minute || '0');
            const nextMin = Math.min(90, currentMin + Math.floor(Math.random() * 4) + 1);
            return {
              ...m,
              scoreA: m.scoreA + incA,
              scoreB: m.scoreB + incB,
              minute: `${nextMin}’`
            };
          }
          return m;
        })
      );
      setIsUpdating(false);
    }, 850);
  };

  return (
    <div id="sports-screen-root" className="space-y-6">
      {/* Visual stats bar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500 fill-amber-500/20" />
            Sports Arena Hub
          </h2>
          <p className="text-xs text-stone-400">
            Real-time live sport scores, upcoming match layouts, and direct television coverage.
          </p>
        </div>

        {/* Live score updater simulation trigger button */}
        <button
          onClick={triggerScoreUpdate}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-stone-800 bg-stone-950 text-[11px] font-black hover:text-white transition-all text-stone-300 ${
            isUpdating ? 'opacity-50 pointer-events-none' : 'active:scale-95'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin text-rose-500' : ''}`} />
          <span>Sync Live Scores</span>
        </button>
      </div>

      {/* Sports TV Channels panel requested */}
      <div className="space-y-3.5">
        <h3 className="text-xs uppercase font-extrabold text-rose-400 tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-3 bg-rose-600 rounded-sm" />
          Live Sports Broadcast Channels
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {sportsChannels.map((channel) => (
            <motion.div
              key={channel.id}
              whileHover={{ y: -3 }}
              onClick={() => onTuneChannel(channel)}
              className="bg-stone-900 border border-stone-850 p-4 rounded-2xl flex items-center justify-between cursor-pointer group hover:border-rose-900/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold ${channel.logo} shadow-inner`}>
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm text-stone-100 group-hover:text-rose-400 transition-colors">
                    {channel.name}
                  </h4>
                  <span className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                    Currently: <span className="text-stone-300 font-semibold">{channel.currentProgram.title}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] bg-rose-950/40 border border-rose-900 text-rose-400 px-2 py-0.5 rounded font-black uppercase flex items-center gap-0.5 animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-rose-400" />
                  Live
                </span>
                <span className="text-[9px] text-stone-500 font-sans flex items-center gap-0.5">
                  <Users className="w-3 h-3" />
                  {channel.viewers}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Match details cards requested */}
      <div className="space-y-4 pt-1">
        <h3 className="text-xs uppercase font-extrabold text-amber-500 tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
          Active Live & Finished Matches
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match) => {
            const isLive = match.status === 'Live';
            const channelObj = CHANNELS.find((c) => c.id === match.channelId) || CHANNELS[2];
            return (
              <div
                key={match.id}
                id={`match-box-${match.id}`}
                className="bg-gradient-to-b from-stone-900/80 to-stone-950/90 border border-stone-800 rounded-2xl p-4 flex flex-col justify-between"
              >
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] bg-stone-950 border border-stone-900 text-stone-400 px-2 rounded font-black py-0.5">
                    {match.league}
                  </span>

                  <div className="flex items-center gap-2">
                    {isLive ? (
                      <span className="text-[9px] text-red-500 font-bold bg-red-950/30 border border-red-900/40 px-2 py-0.5 rounded animate-pulse">
                        {match.minute} LIVE SCORE
                      </span>
                    ) : (
                      <span className="text-[9px] text-stone-500 font-bold bg-stone-950 border border-stone-900 px-2 py-0.5 rounded">
                        Full Time
                      </span>
                    )}
                  </div>
                </div>

                {/* Score section (team graphics) */}
                <div className="flex items-center justify-around py-3 bg-stone-950/40 rounded-xl border border-stone-900/60 my-2">
                  {/* Home Team */}
                  <div className="flex flex-col items-center gap-1 text-center w-28">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${match.teamAColor} flex items-center justify-center text-white text-[10px] font-black shadow-inner`}>
                      {match.teamALogo}
                    </div>
                    <span className="text-[11px] font-extrabold text-stone-300 truncate w-full">{match.teamA}</span>
                  </div>

                  {/* Dynamic scoreboard split */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-stone-100 font-mono tracking-tighter">
                      {match.scoreA}
                    </span>
                    <span className="text-stone-600 font-black text-xs font-sans">:</span>
                    <span className="text-2xl font-black text-stone-100 font-mono tracking-tighter">
                      {match.scoreB}
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center gap-1 text-center w-28">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${match.teamBColor} flex items-center justify-center text-white text-[10px] font-black shadow-inner`}>
                      {match.teamBLogo}
                    </div>
                    <span className="text-[11px] font-extrabold text-stone-300 truncate w-full">{match.teamB}</span>
                  </div>
                </div>

                {/* Bottom line Tune in action */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-900">
                  <div className="text-[10px] text-stone-500 font-sans">
                    Television TV Coverage: <span className="text-stone-300 font-bold">{channelObj.name}</span>
                  </div>
                  <button
                    id={`btn-watch-cover-${match.id}`}
                    onClick={() => onTuneChannel(channelObj)}
                    className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-850 hover:text-white border border-stone-800 text-[10px] font-extrabold text-stone-300 flex items-center gap-1 transition-all"
                  >
                    <Play className="w-3 h-3 fill-stone-400" />
                    Watch Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
