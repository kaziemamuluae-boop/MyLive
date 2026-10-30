export interface Program {
  title: string;
  time: string;
  duration: string;
  progress: number; // percentage completed
  description: string;
}

export interface Channel {
  id: string;
  name: string;
  logo: string; // Tailwind background gradient prefix or Lucide icon key or SVG path or high-res un-splash style
  category: string;
  isPremium: boolean;
  viewers: string;
  currentProgram: Program;
  quality: string[];
}

export interface LiveEvent {
  id: string;
  title: string;
  category: string;
  teams?: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  score?: string;
  timeElapsed?: string;
  status: 'live' | 'upcoming' | 'ended';
  startTime: string;
  channelName: string;
  viewers: string;
}

export interface SportsMatch {
  id: string;
  league: string;
  teamA: string;
  teamALogo: string;
  teamAColor: string;
  teamB: string;
  teamBLogo: string;
  teamBColor: string;
  scoreA: number;
  scoreB: number;
  status: 'Live' | 'Upcoming' | 'FT';
  minute?: string;
  channelId: string;
}
