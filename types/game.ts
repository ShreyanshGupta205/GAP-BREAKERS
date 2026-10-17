// Core game types for GAP//BREAKERS

export type PlayerRole = 'navigator' | 'decoder' | 'engineer';

export type Language = 'en' | 'hi';

export type CommunicationFormat = 'text' | 'audio' | 'captions' | 'simplified';

export type AvatarId = 'avatar-1' | 'avatar-2' | 'avatar-3' | 'avatar-4' | 'avatar-5' | 'avatar-6';

export interface PlayerProfile {
  id: string;
  displayName: string;
  avatarId: AvatarId;
  language: Language;
  commFormat: CommunicationFormat;
  highContrast: boolean;
  reducedMotion: boolean;
}

export type MissionPhase =
  | 'idle'
  | 'setup'
  | 'discovery'
  | 'understanding'
  | 'solving'
  | 'victory'
  | 'failure';

export type SwitchColor = 'cyan' | 'amber' | 'violet';

export type BridgeSectionState = 'broken' | 'glowing' | 'repaired';

export interface BridgeState {
  section1: BridgeSectionState; // Discovery
  section2: BridgeSectionState; // Understanding
  section3: BridgeSectionState; // Connection
}

export interface TeamPlayer {
  id: string;
  displayName: string;
  role: PlayerRole;
  language: Language;
  commFormat: CommunicationFormat;
  isOnline: boolean;
  isSimulated: boolean;
  isCurrentPlayer: boolean;
}

export interface GameMessage {
  id: string;
  playerId: string;
  playerName: string;
  role: PlayerRole;
  content: string;
  transformedContent?: string;
  transformAction?: TransformAction;
  targetLanguage?: Language;
  isClueShare?: boolean;
  timestamp: number;
}

export type TransformAction = 'translate' | 'simplify' | 'visualize' | 'explain_differently';

export interface SwitchActivation {
  color: SwitchColor;
  timestamp: number;
  correct: boolean;
}

export interface MissionStats {
  cluesShared: number;
  aiTransformationsUsed: number;
  clarificationsRequested: number;
  correctActions: number;
  incorrectActions: number;
  bridgeSectionsRestored: number;
  switchActivations: SwitchActivation[];
  startTime: number;
  endTime?: number;
}

export interface GameState {
  // Player
  currentPlayer: PlayerProfile | null;
  currentRole: PlayerRole | null;
  soloMode: boolean;
  soloViewRole: PlayerRole; // Which role is being viewed in solo mode

  // Room
  roomCode: string | null;
  teamPlayers: TeamPlayer[];

  // Mission
  missionId: string | null;
  phase: MissionPhase;
  timerSeconds: number;
  timerActive: boolean;

  // Puzzle
  activatedSwitches: SwitchColor[];
  correctSequence: SwitchColor[];
  pendingSwitch: SwitchColor | null;
  lastActionFeedback: { message: string; correct: boolean } | null;

  // Bridge
  bridge: BridgeState;
  cluesSharedByNavigator: boolean;
  cluesSharedByDecoder: boolean;
  engineerAcknowledged: boolean;

  // Messages
  messages: GameMessage[];

  // Stats
  stats: MissionStats;
}

export type GameAction =
  | { type: 'SET_PLAYER'; player: PlayerProfile }
  | { type: 'SET_ROLE'; role: PlayerRole }
  | { type: 'SET_SOLO_VIEW_ROLE'; role: PlayerRole }
  | { type: 'SET_ROOM_CODE'; code: string }
  | { type: 'SET_TEAM_PLAYERS'; players: TeamPlayer[] }
  | { type: 'START_MISSION'; missionId: string }
  | { type: 'SET_PHASE'; phase: MissionPhase }
  | { type: 'TICK_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESUME_TIMER' }
  | { type: 'ACTIVATE_SWITCH'; color: SwitchColor }
  | { type: 'SHARE_CLUE'; role: PlayerRole }
  | { type: 'ACKNOWLEDGE_SEQUENCE' }
  | { type: 'ADD_MESSAGE'; message: GameMessage }
  | { type: 'SET_BRIDGE_SECTION'; section: 1 | 2 | 3; state: BridgeSectionState }
  | { type: 'RESET_MISSION' }
  | { type: 'SET_FEEDBACK'; message: string; correct: boolean }
  | { type: 'CLEAR_FEEDBACK' };
