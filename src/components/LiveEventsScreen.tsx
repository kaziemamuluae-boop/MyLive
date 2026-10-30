import { Calendar, Flame, Users, Play, Clock, Share2, Bell } from 'lucide-react';
import { LIVE_EVENTS } from '../data';
import { LiveEvent } from '../types';
import { motion } from 'motion/react';

interface LiveEventsScreenProps {
  onEventTune: (channelName: string) => void;
}

export function LiveEventsScreen({ onEventTune }: LiveEventsScreenProps) {
  return (
    <div id="live-events-screen-root" className="space-y-6">
      {/* Upper header section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          Live Arenas & Events
        </h2>
        <p className="text-xs text-stone-400">
          Global events currently live broadcasting right now. Bookmarks are updated real-time.
        </p>
      </div>

      {/* Grid containing event cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LIVE_EVENTS.map((event) => {
          const isLive = event.status === 'live';
          return (
            <motion.div
              key={event.id}
              id={`ev-card-${event.id}`}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-rose-900/40 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Highlight background elements for live activities */}
              {isLive && (
                <div className="absolute top-0 right-0 w-36 h-36 bg-rose-600/5 rounded-full blur-2xl -z-10 group-hover:bg-rose-600/10 transition-all" />
              )}

              {/* Top row detailing stats */}
              <div className="flex items-center justify-between mb-3.5">
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                  isLive
                    ? 'bg-red-950/40 border-red-800 text-red-400 animate-pulse'
                    : 'bg-stone-900 border-stone-850 text-stone-400'
                }`}>
                  {isLive ? '● Live Arena' : 'Upcoming Event'}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-stone-500 font-bold bg-stone-950 px-2 py-1 rounded border border-stone-900">
                    {event.category}
                  </span>
                  {isLive ? (
                    <span className="text-[10px] text-rose-500 font-black flex items-center gap-1 bg-rose-950/20 px-2 py-0.5 rounded">
                      <Users className="w-3 h-3" />
                      {event.viewers}
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-500 font-black flex items-center gap-1 bg-amber-950/20 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3" />
                      {event.startTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Content description */}
              <div className="space-y-1 mt-1 mb-4 flex-1">
                <h3 className="font-extrabold text-sm text-stone-100 group-hover:text-rose-400 transition-colors leading-tight">
                  {event.title}
                </h3>
                <span className="text-[11px] text-stone-500 font-sans block">
                  Broadcaster Channel: <span className="text-stone-300 font-bold">{event.channelName}</span>
                </span>
                
                {/* Simulated Teams block if applicable */}
                {event.teams && (
                  <div className="mt-3 flex items-center gap-4 bg-stone-950 p-2.5 rounded-xl border border-stone-905 w-fit">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center text-[8px] font-bold text-white">
                        {event.teams.home.logo}
                      </span>
                      <span className="text-[11px] font-bold text-stone-300">{event.teams.home.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-rose-500">VS</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center text-[8px] font-bold text-white">
                        {event.teams.away.logo}
                      </span>
                      <span className="text-[11px] font-bold text-stone-300">{event.teams.away.name}</span>
                    </div>
                  </div>
                )}

                {/* Score and time elapsed overlay if live */}
                {event.score && event.timeElapsed && (
                  <div className="mt-3.5 flex items-center gap-2.5">
                    <div className="bg-stone-950 border border-stone-900 px-3 py-1 rounded-lg text-rose-500 font-mono text-xs font-bold tracking-wider">
                      {event.score}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                      Elapsed: <span className="text-stone-300">{event.timeElapsed}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom interaction action line */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-900">
                <span className="text-[10px] text-stone-500 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Scheduled {isLive ? 'No Delayed' : event.startTime}
                </span>

                <div className="flex gap-2">
                  {isLive ? (
                    <button
                      id={`btn-tune-in-${event.id}`}
                      onClick={() => onEventTune(event.channelName)}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-[11px] tracking-wide shadow-md shadow-rose-950/30 transition-all flex items-center gap-1 hover:scale-[1.03]"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      Tune In Feed
                    </button>
                  ) : (
                    <button
                      id={`btn-remind-${event.id}`}
                      onClick={() => alert(`Pre-scheduled reminder registered for "${event.title}"`)}
                      className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-extrabold text-[11px] tracking-wide transition-all flex items-center gap-1"
                    >
                      <Bell className="w-3.5 h-3.5 text-stone-400" />
                      Remind Me
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
