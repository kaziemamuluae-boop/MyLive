import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Heart,
  ChevronLeft,
  Tv,
  Crown,
  Users,
  Clock,
  Check,
  AlertCircle
} from 'lucide-react';
import { Channel } from '../types';
import { motion } from 'motion/react';

interface PlayerScreenProps {
  channel: Channel;
  isFavorite: boolean;
  onFavoriteToggle: (id: string, e: React.MouseEvent) => void;
  onBack: () => void;
  allChannels: Channel[];
  onChannelSelect: (channel: Channel) => void;
}

export function PlayerScreen({
  channel,
  isFavorite,
  onFavoriteToggle,
  onBack,
  allChannels,
  onChannelSelect
}: PlayerScreenProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [selectedQuality, setSelectedQuality] = useState(channel.quality[0] || '1080p');
  const [isBuffering, setIsBuffering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState('08:24 PM');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Simulated Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Buffering simulator when quality changes
  const handleQualityChange = (q: string) => {
    setSelectedQuality(q);
    setIsBuffering(true);
    setTimeout(() => {
      setIsBuffering(false);
    }, 900);
  };

  // Hide Controls overlay after a delay
  const triggerShowControls = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 4000);
  };

  useEffect(() => {
    triggerShowControls();
    return () => {
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Premium Canvas video stream visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 640);
    let height = (canvas.height = canvas.offsetHeight || 360);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width || canvas.offsetWidth || 640;
        height = canvas.height = entry.contentRect.height || canvas.offsetHeight || 360;
      }
    });
    resizeObserver.observe(canvas);

    let phase = 0;
    let particles: { x: number; y: number; speed: number; size: number; color: string }[] = [];

    // Initialize particles based on channel category
    const initializeParticles = () => {
      particles = [];
      const count = channel.category === 'Sports' ? 25 : 15;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: 0.5 + Math.random() * 2,
          size: 1 + Math.random() * 3,
          color: channel.logo.includes('red')
            ? `rgba(239, 68, 68, ${0.1 + Math.random() * 0.3})`
            : channel.logo.includes('blue')
            ? `rgba(59, 130, 246, ${0.1 + Math.random() * 0.3})`
            : channel.logo.includes('amber')
            ? `rgba(245, 158, 11, ${0.1 + Math.random() * 0.3})`
            : `rgba(244, 63, 94, ${0.1 + Math.random() * 0.3})`
        });
      }
    };

    initializeParticles();

    // Render loop
    const render = () => {
      if (!ctx) return;

      // Draw background ambient dark colors
      ctx.fillStyle = '#0c0a09'; // stone-950
      ctx.fillRect(0, 0, width, height);

      if (isPlaying && !isBuffering) {
        phase += 0.015;

        // Draw multiple beautiful glowing waveforms based on channel category
        const drawsWaves = (amp: number, freq: number, offset: string) => {
          ctx.beginPath();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = offset;
          for (let x = 0; x < width; x++) {
            const y =
              height / 2 +
              Math.sin(x * freq + phase) * amp * Math.cos(x * 0.002 + phase * 0.5);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        };

        // Custom visuals depending on category for premium OTT experience
        if (channel.category === 'News') {
          // Circular globe scanner wave
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)'; // Blue
          drawsWaves(25, 0.008, 'rgba(59, 130, 246, 0.2)');
          drawsWaves(12, 0.015, 'rgba(37, 99, 235, 0.35)');
        } else if (channel.category === 'Sports') {
          // Dynamic faster hyper-waves representing action
          drawsWaves(40, 0.012, 'rgba(239, 68, 68, 0.25)'); // Red
          drawsWaves(20, 0.02, 'rgba(245, 158, 11, 0.35)'); // Amber
        } else if (channel.category === 'Movies') {
          // Cinematic slow elegant waves
          drawsWaves(15, 0.003, 'rgba(168, 85, 247, 0.25)'); // Purple
          drawsWaves(8, 0.007, 'rgba(139, 92, 246, 0.35)');
        } else if (channel.category === 'Music') {
          // Equalizer look
          const barCount = 40;
          const barWidth = width / barCount;
          for (let i = 0; i < barCount; i++) {
            const barHeight =
              (Math.sin(i * 0.15 + phase * 2.5) * 45 + 50) *
              (0.5 + Math.random() * 0.5) *
              (height / 250);
            const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
            gradient.addColorStop(0, '#be123c'); // rose-700
            gradient.addColorStop(1, '#f59e0b'); // amber-500
            ctx.fillStyle = gradient;
            ctx.fillRect(i * barWidth + 1, height - barHeight - 15, barWidth - 2, barHeight);
          }
        } else {
          // Playful floating circles
          drawsWaves(18, 0.005, 'rgba(244, 63, 94, 0.3)'); // Rose
          drawsWaves(12, 0.01, 'rgba(20, 184, 166, 0.3)'); // Teal
        }

        // Draw animated floating dust particles
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          p.y -= p.speed;
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
        });

        // Live Camera News Ticker Mock / Overlay text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, height - 15, width, 15);
        ctx.fillStyle = '#ef4444'; // Red live dot
        ctx.beginPath();
        const liveDotX = 14 + Math.sin(phase * 4) * 1.5;
        ctx.arc(liveDotX, height - 7.5, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.fillText('LIVE STREAM FEED // 1080P 60FPS STABLE ENCODER', 24, height - 4);
      } else if (isBuffering) {
        // Buffering circular loader
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(phase * 4);
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 1.5);
        ctx.strokeStyle = '#ef4444'; // rose-500
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = '#9ca3af';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CONNECTING STREAM...', width / 2, height / 2 + 45);
      } else {
        // Paused state
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, width, height);

        // Huge central pause icon
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 30, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        // Centered play arrow
        ctx.moveTo(width / 2 - 8, height / 2 - 12);
        ctx.lineTo(width / 2 + 12, height / 2);
        ctx.lineTo(width / 2 - 8, height / 2 + 12);
        ctx.fill();

        ctx.fillStyle = '#9ca3af';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('STREAM PAUSED', width / 2, height / 2 + 50);
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
    };
  }, [isPlaying, isBuffering, channel]);

  // Handle simulated full screen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Recommended/similar channels (filter out current channel)
  const recommendations = allChannels
    .filter((c) => c.id !== channel.id)
    .slice(0, 4);

  return (
    <motion.div
      id="player-screen-root"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={`fixed inset-0 z-50 bg-stone-950 flex flex-col overflow-y-auto pb-24 ${
        isFullscreen ? 'p-0 justify-center' : ''
      }`}
    >
      {/* Dynamic Player Stage / Frame Constraint */}
      <div
        id="player-video-container"
        className={`relative bg-black group flex flex-col justify-center select-none ${
          isFullscreen ? 'w-full h-full' : 'w-full aspect-video md:max-h-[500px]'
        }`}
        onMouseMove={triggerShowControls}
        onClick={triggerShowControls}
      >
        {/* Visualizer Canvas */}
        <canvas ref={canvasRef} className="w-full h-full object-cover pointer-events-auto cursor-pointer" />

        {/* Buffering/Loading Notification Block */}
        {isBuffering && (
          <div className="absolute inset-0 bg-stone-950/90 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-stone-400 text-xs font-bold uppercase tracking-widest animate-pulse">
              Buffering stable feed...
            </span>
          </div>
        )}

        {/* Interactive Overlaid HUD Controls */}
        {showControls && (
          <div
            id="player-hud-controls"
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/80 flex flex-col justify-between p-4 transition-all duration-300"
          >
            {/* Top Bar Controls */}
            <div className="flex items-center justify-between">
              <button
                id="btn-player-exit"
                onClick={(e) => {
                  e.stopPropagation();
                  onBack();
                }}
                className="p-2.5 rounded-full bg-stone-950/70 border border-stone-800/80 text-stone-200 hover:text-white hover:bg-stone-900 transition-all active:scale-90 flex items-center gap-1 text-xs font-semibold"
              >
                <ChevronLeft className="w-5 h-5" />
                {!isFullscreen && <span>Exit Feed</span>}
              </button>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-black uppercase tracking-wider animate-pulse shadow-md shadow-red-950/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  LIVE
                </span>
                <span className="text-[10px] text-stone-300 bg-stone-950/60 border border-stone-800 px-2 py-0.5 rounded font-mono">
                  {currentTimeStr}
                </span>
              </div>
            </div>

            {/* Middle Big Toggle (Tap to Play/Pause) Only shows on Hover/Move */}
            <div className="flex items-center justify-center pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
                className="w-14 h-14 rounded-full bg-rose-600/20 backdrop-blur-sm border border-rose-500/40 text-rose-500 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all pointer-events-auto"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-rose-500" />
                ) : (
                  <Play className="w-7 h-7 fill-rose-500 ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Panel Controls */}
            <div className="flex flex-col gap-2 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              {/* Simulated Progress bar showing continuous buffer */}
              <div className="w-full bg-stone-800/80 h-1.5 rounded-full overflow-hidden relative group/bar cursor-pointer">
                <div className="absolute top-0 left-0 bottom-0 bg-stone-600/50 w-4/5" />
                <div className="absolute top-0 left-0 bottom-0 bg-rose-600 w-[65%] shadow-md shadow-rose-900/50" />
              </div>

              <div className="flex items-center justify-between">
                {/* Left controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-stone-300 hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  {/* Volume controllers */}
                  <div className="flex items-center gap-1.5 group">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-stone-300 hover:text-white transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-16 h-1 bg-stone-700 accent-rose-600 rounded-lg appearance-none cursor-pointer group-hover:w-20 transition-all"
                    />
                  </div>

                  {/* Program title info */}
                  <div className="hidden sm:block text-left text-xs bg-stone-900/40 border border-stone-800 px-2 py-0.5 rounded text-stone-400">
                    Watching:{' '}
                    <span className="font-bold text-white text-xs">{channel.name}</span>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-3">
                  {/* Quality selector dropdown */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-stone-500 font-bold uppercase">Qual:</span>
                    <div className="flex gap-1">
                      {channel.quality.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleQualityChange(q)}
                          className={`px-2 py-0.5 text-[9px] font-black rounded border transition-all ${
                            selectedQuality === q
                              ? 'bg-rose-600 border-rose-500 text-white'
                              : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-all active:scale-90"
                    title="Fullscreen mode"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Screen Layout below the Video player - Only shown if not full-screen */}
      {!isFullscreen && (
        <div id="player-screen-metadata" className="px-4 py-5 space-y-5 max-w-4xl mx-auto w-full">
          {/* Main Info section */}
          <div className="bg-stone-900/45 border border-stone-800/80 rounded-2xl p-4 flex flex-col gap-4 relative overflow-hidden">
            {/* Header branding */}
            <div className="flex items-start justify-between border-b border-stone-800/60 pb-3">
              <div className="flex items-center gap-3.5">
                {/* Circular logo */}
                <div className={`w-12 h-12 rounded-full border-2 border-stone-800 bg-stone-950 flex items-center justify-center ${channel.logo}`}>
                  <Tv className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  {/* Channel name specified below card requests */}
                  <h1 id="player-channel-name" className="text-xl font-black text-stone-100 flex items-center gap-2">
                    {channel.name}
                    {channel.isPremium && (
                      <span className="flex items-center gap-0.5 text-[9px] font-black uppercase text-amber-400 bg-amber-950/60 border border-amber-800 px-1.5 py-0.5 rounded-full">
                        <Crown className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        PRO
                      </span>
                    )}
                  </h1>
                  <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Live Program in Progress
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-player-favorite-toggle"
                  onClick={(e) => onFavoriteToggle(channel.id, e)}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-black transition-all duration-300 pointer-events-auto active:scale-95 ${
                    isFavorite
                      ? 'bg-rose-950/40 border-rose-800 text-rose-400 shadow-md shadow-rose-950/10'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
                  }`}
                >
                  <Heart className={`w-4.5 h-4.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isFavorite ? 'Saved' : 'Favorite'}</span>
                </button>
              </div>
            </div>

            {/* Program Information (requested details) */}
            <div className="space-y-3.5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-black text-rose-400 tracking-wider">
                    Current Program
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-stone-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    <span>{channel.currentProgram.time}</span>
                  </div>
                </div>
                <h2 className="text-base font-extrabold text-white">
                  {channel.currentProgram.title}
                </h2>
              </div>

              <p className="text-stone-300 text-xs font-sans leading-relaxed">
                {channel.currentProgram.description}
              </p>

              {/* Live Progress Bar indicator */}
              <div className="space-y-1 bg-stone-950 p-3 rounded-xl border border-stone-900">
                <div className="flex justify-between items-center text-[10px] text-stone-500 font-bold font-sans">
                  <span>Progress ({channel.currentProgram.progress}%)</span>
                  <span>{channel.currentProgram.duration} remaining</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-rose-600 to-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${channel.currentProgram.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick TV Guide section */}
          <div className="bg-stone-900/45 border border-stone-800/80 rounded-2xl p-4 space-y-4">
            <h3 className="text-xs uppercase font-extrabold text-stone-400 tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-rose-600 rounded-sm" />
              Tv Stream Quality Options
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-900 flex flex-col">
                <span className="text-[10px] text-stone-500 font-black">STABLE HIGH DEF</span>
                <span className="text-xs font-bold text-stone-200">1080p Full HD</span>
                <span className="text-[9px] text-emerald-400 mt-1 flex items-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" /> Auto adaptive (6.2 Mbps)
                </span>
              </div>
              <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-900 flex flex-col">
                <span className="text-[10px] text-stone-500 font-black">ULTRA ULTRA HD</span>
                <span className="text-xs font-bold text-stone-200">4K Quad Screen</span>
                <span className="text-[9px] text-rose-500 mt-1 flex items-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-rose-500" /> Premium account only (18 Mbps)
                </span>
              </div>
              <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-900 flex flex-col col-span-2 md:col-span-1">
                <span className="text-[10px] text-stone-500 font-black">CELLULAR DATA SAVER</span>
                <span className="text-xs font-bold text-stone-200">720p / 480p SD</span>
                <span className="text-[9px] text-amber-500 mt-1 flex items-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500" /> Optimized compression (1.1 Mbps)
                </span>
              </div>
            </div>
          </div>

          {/* Recommended feeds inside detailed page */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-extrabold text-stone-400 tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-amber-500 rounded-sm" />
              Trending Channels Now
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onChannelSelect(rec)}
                  className="bg-stone-900/60 hover:bg-stone-800/80 border border-stone-850 p-2.5 rounded-xl cursor-pointer flex items-center gap-2.5 transition-all group select-none"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${rec.logo}`}>
                    <Tv className="w-4 h-4 text-white group-hover:scale-110 transition-all" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-stone-100 truncate group-hover:text-amber-400 transition-colors">
                      {rec.name}
                    </span>
                    <span className="text-[9px] text-stone-500 flex items-center gap-0.5">
                      <Users className="w-2.5 h-2.5" />
                      {rec.viewers}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
