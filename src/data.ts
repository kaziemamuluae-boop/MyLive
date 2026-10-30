import { Channel, LiveEvent, SportsMatch } from './types';

export const CATEGORIES = [
  { id: 'all', name: 'All Channels', icon: 'Tv' },
  { id: 'news', name: 'News', icon: 'Globe' },
  { id: 'sports', name: 'Sports', icon: 'Trophy' },
  { id: 'movies', name: 'Movies', icon: 'Film' },
  { id: 'music', name: 'Music', icon: 'Music' },
  { id: 'kids', name: 'Kids', icon: 'Smile' },
  { id: 'documentary', name: 'Documentary', icon: 'Compass' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Sparkles' },
  { id: 'international', name: 'International', icon: 'Globe2' }
];

export const CHANNELS: Channel[] = [
  {
    id: 'news-1',
    name: 'Global News 24',
    logo: 'bg-rose-600',
    category: 'News',
    isPremium: true,
    viewers: '124K',
    currentProgram: {
      title: 'World News Tonight',
      time: '08:00 PM - 09:00 PM',
      duration: '60 min',
      progress: 65,
      description: 'In-depth global coverage of current events, geopolitical insights, and exclusive economic interviews with world leaders.'
    },
    quality: ['1080p', '720p', '480p']
  },
  {
    id: 'news-2',
    name: 'Bloomberg Premium',
    logo: 'bg-blue-700',
    category: 'News',
    isPremium: true,
    viewers: '89K',
    currentProgram: {
      title: 'Bloomberg Markets',
      time: '08:30 PM - 09:30 PM',
      duration: '60 min',
      progress: 40,
      description: 'Real-time market analysis, financial discussions, and global trading strategy highlights from wall street experts.'
    },
    quality: ['1080p', '720p']
  },
  {
    id: 'sports-1',
    name: 'ESPN Ultra HD',
    logo: 'bg-red-600',
    category: 'Sports',
    isPremium: true,
    viewers: '340K',
    currentProgram: {
      title: 'UEFA Champions League Live',
      time: '07:45 PM - 10:00 PM',
      duration: '135 min',
      progress: 80,
      description: 'Exclusive, high-definition broadcast of the matches defining the future of the Champions League tournament.'
    },
    quality: ['4K Ultra', '1080p 60fps', '720p']
  },
  {
    id: 'sports-2',
    name: 'Sky Sports Premium',
    logo: 'bg-sky-600',
    category: 'Sports',
    isPremium: true,
    viewers: '210K',
    currentProgram: {
      title: 'Formula 1: Practice Sessions',
      time: '08:00 PM - 09:15 PM',
      duration: '75 min',
      progress: 55,
      description: 'Paddock walk-throughs, custom car configurations, and driver preparation drills live from Silverstone.'
    },
    quality: ['1080p 60fps', '720p 60fps']
  },
  {
    id: 'movies-1',
    name: 'HBO Max Premium',
    logo: 'bg-indigo-900',
    category: 'Movies',
    isPremium: true,
    viewers: '190K',
    currentProgram: {
      title: 'House of the Dragon',
      time: '08:00 PM - 09:10 PM',
      duration: '70 min',
      progress: 45,
      description: 'Episode 5: Relive the dark and magnificent heights of the Targaryen civil war in breathtaking native clarity.'
    },
    quality: ['4K Ultra', '1080p']
  },
  {
    id: 'movies-2',
    name: 'CineMax HD',
    logo: 'bg-purple-800',
    category: 'Movies',
    isPremium: false,
    viewers: '75K',
    currentProgram: {
      title: 'Interstellar',
      time: '07:00 PM - 09:45 PM',
      duration: '165 min',
      progress: 72,
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity s survival.'
    },
    quality: ['1080p', '720p']
  },
  {
    id: 'music-1',
    name: 'MTV Beats Live',
    logo: 'bg-amber-500',
    category: 'Music',
    isPremium: false,
    viewers: '45K',
    currentProgram: {
      title: 'Non-Stop Summer Dance Hits',
      time: '08:00 PM - 10:00 PM',
      duration: '120 min',
      progress: 30,
      description: 'A lively, handpicked collection of top-charting synthpop, EDM, and rock hits currently ruling public channels.'
    },
    quality: ['1080p', '720p', 'Audio Only']
  },
  {
    id: 'music-2',
    name: 'VH1 Classic HD',
    logo: 'bg-fuchsia-700',
    category: 'Music',
    isPremium: true,
    viewers: '55K',
    currentProgram: {
      title: '80s & 90s Legendary Anthems',
      time: '08:30 PM - 09:30 PM',
      duration: '60 min',
      progress: 25,
      description: 'Revisit historic performances, nostalgic synthesizer recordings, and iconic stadium concerts.'
    },
    quality: ['1080p', '720p']
  },
  {
    id: 'kids-1',
    name: 'Toonami Premium',
    logo: 'bg-orange-500',
    category: 'Kids',
    isPremium: false,
    viewers: '110K',
    currentProgram: {
      title: 'Dragon Ball Super: Battle of Survival',
      time: '08:15 PM - 08:45 PM',
      duration: '30 min',
      progress: 90,
      description: 'The intense martial arts cosmic championship showdown heats up between remaining dimensions.'
    },
    quality: ['1080p', '720p']
  },
  {
    id: 'kids-2',
    name: 'Disney Premium',
    logo: 'bg-cyan-600',
    category: 'Kids',
    isPremium: true,
    viewers: '135K',
    currentProgram: {
      title: 'Toy Story 4',
      time: '07:30 PM - 09:15 PM',
      duration: '105 min',
      progress: 80,
      description: 'When a new toy named Forky joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be.'
    },
    quality: ['1080p', '720p']
  },
  {
    id: 'documentary-1',
    name: 'Nat Geo Wild',
    logo: 'bg-yellow-600',
    category: 'Documentary',
    isPremium: true,
    viewers: '82K',
    currentProgram: {
      title: 'Africa’s Mighty Predators',
      time: '08:00 PM - 09:00 PM',
      duration: '60 min',
      progress: 50,
      description: 'Spectacular cinematic look at lions, cheetahs and leopards in their respective African savannah habitats.'
    },
    quality: ['4K Ultra', '1080p', '720p']
  },
  {
    id: 'documentary-2',
    name: 'Discovery Premium',
    logo: 'bg-emerald-700',
    category: 'Documentary',
    isPremium: true,
    viewers: '98K',
    currentProgram: {
      title: 'How It’s Made: Supercars',
      time: '08:30 PM - 09:00 PM',
      duration: '30 min',
      progress: 10,
      description: 'Step into carbon-fiber clean rooms to observe computer-assisted robotic construction of extreme sports vehicles.'
    },
    quality: ['1080p', '720p']
  },
  {
    id: 'entertainment-1',
    name: 'Fox Premium',
    logo: 'bg-teal-600',
    category: 'Entertainment',
    isPremium: true,
    viewers: '112K',
    currentProgram: {
      title: 'The Simpsons Daily',
      time: '08:00 PM - 08:30 PM',
      duration: '30 min',
      progress: 95,
      description: 'Classic animated misadventures of the lovable Simpson family in the busy town of Springfield.'
    },
    quality: ['1080p', '720p']
  },
  {
    id: 'entertainment-2',
    name: 'Netflix Live Feed',
    logo: 'bg-red-800',
    category: 'Entertainment',
    isPremium: true,
    viewers: '165K',
    currentProgram: {
      title: 'Stranger Things Live Match',
      time: '08:00 PM - 09:15 PM',
      duration: '75 min',
      progress: 60,
      description: 'Special screening of classic episodes accompanied by behind-the-scenes actor diaries.'
    },
    quality: ['4K Ultra', '1080p']
  },
  {
    id: 'international-1',
    name: 'BBC World News',
    logo: 'bg-stone-700',
    category: 'International',
    isPremium: false,
    viewers: '142K',
    currentProgram: {
      title: 'Global Report & Finance',
      time: '08:00 PM - 09:00 PM',
      duration: '60 min',
      progress: 40,
      description: 'The highest standard of global broadcast reporting, environmental updates and international peace talks summary.'
    },
    quality: ['1080p', '720p']
  },
  {
    id: 'international-2',
    name: 'Tokyo Live Feed',
    logo: 'bg-pink-800',
    category: 'International',
    isPremium: true,
    viewers: '53K',
    currentProgram: {
      title: 'Shibuya Crossing: Live Feed',
      time: '12:00 AM - 11:59 PM',
      duration: '1440 min',
      progress: 51,
      description: 'A 24/7 pristine cinematic camera looking down on the iconic, flashing, busy Shibuya intersection in real-time.'
    },
    quality: ['1080p 60fps', '720p']
  }
];

export const LIVE_EVENTS: LiveEvent[] = [
  {
    id: 'ev-1',
    title: 'Grand Prix of Monaco - Live Finals',
    category: 'Sports',
    status: 'live',
    startTime: 'Now',
    channelName: 'Sky Sports Premium',
    viewers: '412K',
    teams: {
      home: { name: 'Red Bull Racing', logo: 'RBR' },
      away: { name: 'Ferrari Racing', logo: 'FER' }
    }
  },
  {
    id: 'ev-2',
    title: 'NBA Finals: Boston Celtics vs. LA Lakers',
    category: 'Sports',
    status: 'live',
    startTime: 'Now',
    channelName: 'ESPN Ultra HD',
    viewers: '840K',
    score: '102 - 99',
    timeElapsed: 'Q4 2:14'
  },
  {
    id: 'ev-3',
    title: 'Tomorrowland Drone Electronic Music Launch',
    category: 'Music',
    status: 'live',
    startTime: 'Now',
    channelName: 'MTV Beats Live',
    viewers: '102K'
  },
  {
    id: 'ev-4',
    title: 'SpaceX Falcon Heavy Triple Core Ascent',
    category: 'Documentary',
    status: 'upcoming',
    startTime: 'In 35 Mins',
    channelName: 'Discovery Premium',
    viewers: 'Planned'
  },
  {
    id: 'ev-5',
    title: 'Wimbledon Men Championship Final',
    category: 'Sports',
    status: 'upcoming',
    startTime: 'Starting Tomorrow',
    channelName: 'ESPN Live 2',
    viewers: 'Planned'
  }
];

export const SPORTS_MATCHES: SportsMatch[] = [
  {
    id: 'match-1',
    league: 'Premier League',
    teamA: 'Manchester City',
    teamALogo: 'MNC',
    teamAColor: 'from-sky-400 to-blue-500',
    teamB: 'Arsenal FC',
    teamBLogo: 'ARS',
    teamBColor: 'from-red-500 to-rose-600',
    scoreA: 2,
    scoreB: 2,
    status: 'Live',
    minute: '76’',
    channelId: 'sports-1'
  },
  {
    id: 'match-2',
    league: 'La Liga Santander',
    teamA: 'Real Madrid CF',
    teamALogo: 'RMA',
    teamAColor: 'from-amber-400 to-yellow-600',
    teamB: 'FC Barcelona',
    teamBLogo: 'FCB',
    teamBColor: 'from-blue-600 to-purple-800',
    scoreA: 1,
    scoreB: 0,
    status: 'Live',
    minute: '42’',
    channelId: 'sports-1'
  },
  {
    id: 'match-3',
    league: 'NBA Western Conference',
    teamA: 'Golden State Warriors',
    teamALogo: 'GSW',
    teamAColor: 'from-blue-500 to-yellow-500',
    teamB: 'Phoenix Suns',
    teamBLogo: 'PHX',
    teamBColor: 'from-orange-500 to-purple-600',
    scoreA: 114,
    scoreB: 112,
    status: 'FT',
    channelId: 'sports-2'
  },
  {
    id: 'match-4',
    league: 'Champions League Semis',
    teamA: 'Bayern Munich',
    teamALogo: 'FCB',
    teamAColor: 'from-red-600 to-rose-700',
    teamB: 'Paris Saint-Germain',
    teamBLogo: 'PSG',
    teamBColor: 'from-blue-900 to-slate-800',
    scoreA: 0,
    scoreB: 0,
    status: 'Upcoming',
    minute: '21:00',
    channelId: 'sports-1'
  }
];
