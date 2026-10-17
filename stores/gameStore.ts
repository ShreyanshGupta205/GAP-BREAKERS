// Zustand game state store for GAP//BREAKERS

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  GameState,
  PlayerProfile,
  PlayerRole,
  SwitchColor,
  BridgeSectionState,
  GameMessage,
  TeamPlayer,
  MissionPhase,
} from '@/types/game';
import {
  isNextSwitchCorrect,
  isPuzzleSolved,
  computeBridge,
  computePhase,
  CORRECT_SEQUENCE,
} from '@/lib/game/state-machine';

const DEFAULT_BRIDGE = {
  section1: 'broken' as BridgeSectionState,
  section2: 'broken' as BridgeSectionState,
  section3: 'broken' as BridgeSectionState,
};

const DEFAULT_STATS = {
  cluesShared: 0,
  aiTransformationsUsed: 0,
  clarificationsRequested: 0,
  correctActions: 0,
  incorrectActions: 0,
  bridgeSectionsRestored: 0,
  switchActivations: [],
  startTime: 0,
};

const INITIAL_STATE: GameState = {
  currentPlayer: null,
  currentRole: null,
  soloMode: true,
  soloViewRole: 'navigator',

  roomCode: null,
  teamPlayers: [],

  missionId: null,
  phase: 'idle',
  timerSeconds: 180,
  timerActive: false,

  activatedSwitches: [],
  correctSequence: CORRECT_SEQUENCE,
  pendingSwitch: null,
  lastActionFeedback: null,

  bridge: { ...DEFAULT_BRIDGE },
  cluesSharedByNavigator: false,
  cluesSharedByDecoder: false,
  engineerAcknowledged: false,

  messages: [],
  stats: { ...DEFAULT_STATS },
};

interface GameStore extends GameState {
  // Actions
  setPlayer: (player: PlayerProfile) => void;
  setRole: (role: PlayerRole) => void;
  setSoloViewRole: (role: PlayerRole) => void;
  setRoomCode: (code: string) => void;
  setTeamPlayers: (players: TeamPlayer[]) => void;
  startMission: (missionId: string) => void;
  tickTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  activateSwitch: (color: SwitchColor) => void;
  shareClue: (role: PlayerRole) => void;
  acknowledgeSequence: () => void;
  addMessage: (message: GameMessage) => void;
  incrementAIUsage: () => void;
  incrementClarifications: () => void;
  resetMission: () => void;
  setPhase: (phase: MissionPhase) => void;
}

export const useGameStore = create<GameStore>()(
  immer((set, get) => ({
    ...INITIAL_STATE,

    setPlayer: (player) =>
      set((s) => {
        s.currentPlayer = player;
      }),

    setRole: (role) =>
      set((s) => {
        s.currentRole = role;
        s.soloViewRole = role;
      }),

    setSoloViewRole: (role) =>
      set((s) => {
        s.soloViewRole = role;
      }),

    setRoomCode: (code) =>
      set((s) => {
        s.roomCode = code;
      }),

    setTeamPlayers: (players) =>
      set((s) => {
        s.teamPlayers = players;
      }),

    startMission: (missionId) =>
      set((s) => {
        s.missionId = missionId;
        s.phase = 'setup';
        s.timerSeconds = 180;
        s.timerActive = true;
        s.activatedSwitches = [];
        s.bridge = { ...DEFAULT_BRIDGE };
        s.cluesSharedByNavigator = false;
        s.cluesSharedByDecoder = false;
        s.engineerAcknowledged = false;
        s.messages = [];
        s.lastActionFeedback = null;
        s.stats = { ...DEFAULT_STATS, startTime: Date.now() };
      }),

    tickTimer: () =>
      set((s) => {
        if (!s.timerActive || s.timerSeconds <= 0) return;
        s.timerSeconds -= 1;

        if (s.timerSeconds <= 0 && s.phase !== 'victory') {
          s.phase = 'failure';
          s.timerActive = false;
          if (!s.stats.endTime) s.stats.endTime = Date.now();
        }
      }),

    pauseTimer: () =>
      set((s) => {
        s.timerActive = false;
      }),

    resumeTimer: () =>
      set((s) => {
        if (s.phase !== 'victory' && s.phase !== 'failure') {
          s.timerActive = true;
        }
      }),

    activateSwitch: (color) =>
      set((s) => {
        if (s.phase === 'victory' || s.phase === 'failure') return;

        const correct = isNextSwitchCorrect(s.activatedSwitches, color);

        s.stats.switchActivations.push({ color, timestamp: Date.now(), correct });

        if (correct) {
          s.activatedSwitches.push(color);
          s.stats.correctActions += 1;

          if (isPuzzleSolved(s.activatedSwitches)) {
            s.phase = 'victory';
            s.timerActive = false;
            s.bridge.section3 = 'repaired';
            s.stats.bridgeSectionsRestored = 3;
            s.stats.endTime = Date.now();
            s.lastActionFeedback = {
              message: '✓ Energy core restored! City saved!',
              correct: true,
            };
          } else {
            s.lastActionFeedback = {
              message: `✓ ${color.toUpperCase()} switch activated! Continue the sequence.`,
              correct: true,
            };
          }
        } else {
          // Wrong switch — reset sequence and apply penalty
          s.activatedSwitches = [];
          s.stats.incorrectActions += 1;
          s.timerSeconds = Math.max(0, s.timerSeconds - 15);
          s.lastActionFeedback = {
            message: `✗ Wrong sequence! −15 seconds. Start again.`,
            correct: false,
          };
        }

        // Recompute bridge from state
        const newBridge = computeBridge({
          current: s.bridge,
          cluesSharedByNavigator: s.cluesSharedByNavigator,
          cluesSharedByDecoder: s.cluesSharedByDecoder,
          engineerAcknowledged: s.engineerAcknowledged,
          puzzleSolved: isPuzzleSolved(s.activatedSwitches),
        });
        s.bridge = newBridge;

        // Recompute phase
        const { newPhase } = computePhase({
          currentPhase: s.phase,
          timerExpired: s.timerSeconds <= 0,
          puzzleSolved: isPuzzleSolved(s.activatedSwitches),
          cluesSharedByNavigator: s.cluesSharedByNavigator,
          cluesSharedByDecoder: s.cluesSharedByDecoder,
          engineerAcknowledged: s.engineerAcknowledged,
        });
        s.phase = newPhase;
      }),

    shareClue: (role) =>
      set((s) => {
        if (role === 'navigator') {
          s.cluesSharedByNavigator = true;
          s.stats.cluesShared += 1;
        } else if (role === 'decoder') {
          s.cluesSharedByDecoder = true;
          s.stats.cluesShared += 1;
        }

        // Update bridge
        const newBridge = computeBridge({
          current: s.bridge,
          cluesSharedByNavigator: s.cluesSharedByNavigator,
          cluesSharedByDecoder: s.cluesSharedByDecoder,
          engineerAcknowledged: s.engineerAcknowledged,
          puzzleSolved: isPuzzleSolved(s.activatedSwitches),
        });

        // Count newly restored sections
        const prevRestored = countRestored(s.bridge);
        const newRestored = countRestored(newBridge);
        if (newRestored > prevRestored) {
          s.stats.bridgeSectionsRestored = newRestored;
        }

        s.bridge = newBridge;

        // Update phase
        const { newPhase } = computePhase({
          currentPhase: s.phase,
          timerExpired: s.timerSeconds <= 0,
          puzzleSolved: isPuzzleSolved(s.activatedSwitches),
          cluesSharedByNavigator: s.cluesSharedByNavigator,
          cluesSharedByDecoder: s.cluesSharedByDecoder,
          engineerAcknowledged: s.engineerAcknowledged,
        });
        s.phase = newPhase;
      }),

    acknowledgeSequence: () =>
      set((s) => {
        s.engineerAcknowledged = true;
        s.stats.clarificationsRequested += 1;

        const newBridge = computeBridge({
          current: s.bridge,
          cluesSharedByNavigator: s.cluesSharedByNavigator,
          cluesSharedByDecoder: s.cluesSharedByDecoder,
          engineerAcknowledged: true,
          puzzleSolved: isPuzzleSolved(s.activatedSwitches),
        });

        const prevRestored = countRestored(s.bridge);
        const newRestored = countRestored(newBridge);
        if (newRestored > prevRestored) {
          s.stats.bridgeSectionsRestored = newRestored;
        }

        s.bridge = newBridge;

        const { newPhase } = computePhase({
          currentPhase: s.phase,
          timerExpired: s.timerSeconds <= 0,
          puzzleSolved: isPuzzleSolved(s.activatedSwitches),
          cluesSharedByNavigator: s.cluesSharedByNavigator,
          cluesSharedByDecoder: s.cluesSharedByDecoder,
          engineerAcknowledged: true,
        });
        s.phase = newPhase;
      }),

    addMessage: (message) =>
      set((s) => {
        s.messages.push(message);
      }),

    incrementAIUsage: () =>
      set((s) => {
        s.stats.aiTransformationsUsed += 1;
      }),

    incrementClarifications: () =>
      set((s) => {
        s.stats.clarificationsRequested += 1;
      }),

    resetMission: () =>
      set((s) => {
        s.phase = 'idle';
        s.timerSeconds = 180;
        s.timerActive = false;
        s.activatedSwitches = [];
        s.bridge = { ...DEFAULT_BRIDGE };
        s.cluesSharedByNavigator = false;
        s.cluesSharedByDecoder = false;
        s.engineerAcknowledged = false;
        s.messages = [];
        s.lastActionFeedback = null;
        s.stats = { ...DEFAULT_STATS };
      }),

    setPhase: (phase) =>
      set((s) => {
        s.phase = phase;
      }),
  }))
);

function countRestored(bridge: { section1: string; section2: string; section3: string }): number {
  return [bridge.section1, bridge.section2, bridge.section3].filter((s) => s === 'repaired').length;
}
