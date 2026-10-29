export interface WhimsicalBot {
  id: string;
  name: string;
  role: string;
  tagline: string;
  currentTask: string;
  badge: string;
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  emoji: string;
  symbol: string;
  antennaStyle: "ziki" | "triaging" | "comment" | "review" | "merger" | "dispatcher" | "contributor";
  soundFrequency: number;
}

export const WHIMSICAL_BOTS: WhimsicalBot[] = [
  {
    id: "ziki",
    name: "Ziki",
    role: "Core Companion",
    tagline: "Always learning, cheerful core mascot",
    currentTask: "Tracking workspace vibes and guiding navigation",
    badge: "Core Companion",
    primaryColor: "#3978F6",
    secondaryColor: "#1D4ED8",
    glowColor: "#60A5FA",
    emoji: "🤖",
    symbol: "✨",
    antennaStyle: "ziki",
    soundFrequency: 523.25, // C5
  },
  {
    id: "triaging",
    name: "Triaging Agent",
    role: "Triaging Bug ZK-646",
    tagline: "Deep stack trace inspections & bug triaging",
    currentTask: "Triaging Bug ZK-646: Analyzing stack trace on theme switcher...",
    badge: "Active Hunt",
    primaryColor: "#06D6A0",
    secondaryColor: "#059669",
    glowColor: "#34D399",
    emoji: "🐞",
    symbol: "🐞",
    antennaStyle: "triaging",
    soundFrequency: 659.25, // E5
  },
  {
    id: "comment",
    name: "Comment",
    role: "Commenting Bot",
    tagline: "Constructive feedback & community discussions",
    currentTask: "Posting structured review comments on PR #1290...",
    badge: "Active Comments",
    primaryColor: "#8B5CF6",
    secondaryColor: "#6D28D9",
    glowColor: "#A78BFA",
    emoji: "💬",
    symbol: "💬",
    antennaStyle: "comment",
    soundFrequency: 440.0, // A4
  },
  {
    id: "review",
    name: "Review",
    role: "Review Bot",
    tagline: "Gentle on Code, Harsh on Bugs",
    currentTask: "Auditing PR #814: Checking accessibility, styling, and tokens...",
    badge: "Code Audit",
    primaryColor: "#EC4899",
    secondaryColor: "#BE185D",
    glowColor: "#F472B6",
    emoji: "🛡️",
    symbol: "🔍",
    antennaStyle: "review",
    soundFrequency: 587.33, // D5
  },
  {
    id: "merger",
    name: "Merger",
    role: "Merger Bot",
    tagline: "Branch synchronization & safe landing engine",
    currentTask: "Fast-forwarding dev branch into main (0 merge conflicts)...",
    badge: "Ready to Merge",
    primaryColor: "#0EA5E9",
    secondaryColor: "#0369A1",
    glowColor: "#38BDF8",
    emoji: "🔀",
    symbol: "🔀",
    antennaStyle: "merger",
    soundFrequency: 493.88, // B4
  },
  {
    id: "dispatcher",
    name: "Dispatcher",
    role: "Dispatcher Bot",
    tagline: "Task queue load-balancer & bounty router",
    currentTask: "Dispatching incoming issue bounties to active workers...",
    badge: "Queue Active",
    primaryColor: "#F59E0B",
    secondaryColor: "#B45309",
    glowColor: "#FBBF24",
    emoji: "📡",
    symbol: "📡",
    antennaStyle: "dispatcher",
    soundFrequency: 392.0, // G4
  },
  {
    id: "contributor",
    name: "Contributor",
    role: "Contributor Bot",
    tagline: "Milestone tracker, points & bounty rewards",
    currentTask: "Awarding +120 pts to top contributors on the leaderboard...",
    badge: "1,702.87 pts",
    primaryColor: "#E11D48",
    secondaryColor: "#9F1239",
    glowColor: "#FB7185",
    emoji: "⭐",
    symbol: "⭐",
    antennaStyle: "contributor",
    soundFrequency: 783.99, // G5
  },
];

export const getBotById = (id: string): WhimsicalBot => {
  return WHIMSICAL_BOTS.find((b) => b.id === id) || WHIMSICAL_BOTS[1]; // default to triaging (or ziki)
};
