/** One domain shape: inbox row and thread header read the same fields. */
export interface ChatThread {
  readonly id: string;
  readonly name: string;
  readonly time: string;
  readonly initials: string;
  readonly avatarColor: string;
  readonly unread?: number;
  readonly preview?: string;
  readonly previewStrip?: boolean;
  readonly online?: boolean;
}

export interface ChatBubble {
  readonly id: string;
  readonly from: 'me' | 'them';
  readonly time: string;
  readonly prompt: string;
  readonly gradient: string;
}

/** Демо-инбокс (fallback, если API недоступен). */
export const CHAT_THREADS: readonly ChatThread[] = [
  {
    id: 'anna',
    name: 'Anna',
    time: '14:23',
    initials: 'A',
    avatarColor: '#E85D75',
    unread: 2,
    previewStrip: true,
    online: false,
  },
  {
    id: 'max',
    name: 'Max',
    time: 'Yesterday',
    initials: 'M',
    avatarColor: '#4ECDC4',
    unread: 5,
    previewStrip: true,
    online: true,
  },
  {
    id: 'kate',
    name: 'Kate',
    time: 'Today',
    initials: 'K',
    avatarColor: '#AF52DE',
    unread: 5,
    previewStrip: true,
    online: true,
  },
  {
    id: 'david',
    name: 'David',
    time: 'Fri',
    initials: 'D',
    avatarColor: '#4A90E2',
    unread: 5,
    previewStrip: true,
    online: true,
  },
  {
    id: 'sophie',
    name: 'Sophie',
    time: 'Thu',
    initials: 'S',
    avatarColor: '#C792EA',
    unread: 5,
    preview: 'Sounds perfect, thanks!',
    online: false,
  },
  {
    id: 'team',
    name: 'Team chat',
    time: 'Wed',
    initials: 'T',
    avatarColor: '#FFB347',
    unread: 5,
    previewStrip: true,
    online: false,
  },
];

/** Один демо-транскрипт для любого треда. */
export const CHAT_TRANSCRIPT: readonly ChatBubble[] = [
  {
    id: 'm1',
    from: 'them',
    time: '14:18',
    prompt: 'Sunset over water',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 40%, #48dbfb 100%)',
  },
  {
    id: 'm2',
    from: 'me',
    time: '14:18',
    prompt: 'Abstract fluid cells',
    gradient: 'linear-gradient(125deg, #ee5a6f 0%, #f7b731 35%, #26de81 70%, #4b7bec 100%)',
  },
  {
    id: 'm3',
    from: 'them',
    time: '14:20',
    prompt: 'Teal and coral flow',
    gradient: 'linear-gradient(110deg, #0fb9b1 0%, #fd9644 50%, #eb3b5a 100%)',
  },
  {
    id: 'm4',
    from: 'me',
    time: '14:21',
    prompt: 'Night city rain reflections',
    gradient: 'linear-gradient(125deg, #1b1f3b 0%, #3a4ca8 40%, #6dd5ed 100%)',
  },
  {
    id: 'm5',
    from: 'them',
    time: '14:21',
    prompt: 'Golden desert dunes',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  },
  {
    id: 'm6',
    from: 'me',
    time: '14:22',
    prompt: 'Deep purple nebula',
    gradient: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)',
  },
  {
    id: 'm7',
    from: 'them',
    time: '14:23',
    prompt: 'Mint minimal wave',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 'm8',
    from: 'me',
    time: '14:24',
    prompt: 'Retro magenta gradient',
    gradient: 'linear-gradient(120deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 'm9',
    from: 'them',
    time: '14:25',
    prompt: 'Cloudy calm ocean',
    gradient: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
  },
  {
    id: 'm10',
    from: 'me',
    time: '14:26',
    prompt: 'Turquoise lagoon',
    gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
  },
  {
    id: 'm11',
    from: 'them',
    time: '14:27',
    prompt: 'Warm peach tones',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },
  {
    id: 'm12',
    from: 'me',
    time: '14:28',
    prompt: 'Graphite monochrome',
    gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  },
  {
    id: 'm13',
    from: 'them',
    time: '14:29',
    prompt: 'Forest sunrise haze',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
  },
  {
    id: 'm14',
    from: 'me',
    time: '14:30',
    prompt: 'Aurora lights',
    gradient: 'linear-gradient(125deg, #00b09b 0%, #96c93d 100%)',
  },
  {
    id: 'm15',
    from: 'them',
    time: '14:31',
    prompt: 'Soft violet dusk',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
];

export function threadById(id: string): ChatThread {
  const row = CHAT_THREADS.find((t) => t.id === id);
  if (row) return row;
  const key = id || 'chat';
  return {
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    time: '',
    initials: key.charAt(0).toUpperCase(),
    avatarColor: '#8E8E93',
    online: false,
  };
}
