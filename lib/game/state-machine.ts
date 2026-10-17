// Puzzle state machine for GAP//BREAKERS Mission 01
// Keeps game rules completely independent of UI

import { SwitchColor, MissionPhase, BridgeState, BridgeSectionState } from '@/types/game';

export const CORRECT_SEQUENCE: SwitchColor[] = ['cyan', 'amber', 'violet'];

// ─── Switch validation ────────────────────────────────────────────────────────

/**
 * Given the currently activated switches (in order), returns whether
 * the next activation is correct.
 */
export function isNextSwitchCorrect(
  activated: SwitchColor[],
  next: SwitchColor
): boolean {
  const expectedIndex = activated.length;
  if (expectedIndex >= CORRECT_SEQUENCE.length) return false;
  return CORRECT_SEQUENCE[expectedIndex] === next;
}

/**
 * Returns true when the full correct sequence has been activated.
 */
export function isPuzzleSolved(activated: SwitchColor[]): boolean {
  if (activated.length !== CORRECT_SEQUENCE.length) return false;
  return activated.every((color, i) => CORRECT_SEQUENCE[i] === color);
}

/**
 * Validates a complete proposed sequence.
 */
export function validateSequence(sequence: SwitchColor[]): boolean {
  if (sequence.length !== CORRECT_SEQUENCE.length) return false;
  return sequence.every((color, i) => CORRECT_SEQUENCE[i] === color);
}

// ─── Phase transitions ────────────────────────────────────────────────────────

export interface PhaseTransitionResult {
  newPhase: MissionPhase;
  changed: boolean;
}

/**
 * Determines what phase the mission should be in given the current state.
 * This is the single source of truth for phase logic.
 */
export function computePhase(params: {
  currentPhase: MissionPhase;
  timerExpired: boolean;
  puzzleSolved: boolean;
  cluesSharedByNavigator: boolean;
  cluesSharedByDecoder: boolean;
  engineerAcknowledged: boolean;
}): PhaseTransitionResult {
  const {
    currentPhase,
    timerExpired,
    puzzleSolved,
    cluesSharedByNavigator,
    cluesSharedByDecoder,
    engineerAcknowledged,
  } = params;

  // Terminal states — never leave
  if (currentPhase === 'victory' || currentPhase === 'failure') {
    return { newPhase: currentPhase, changed: false };
  }

  if (timerExpired && currentPhase !== 'victory') {
    return { newPhase: 'failure', changed: currentPhase !== 'failure' };
  }

  if (puzzleSolved) {
    return { newPhase: 'victory', changed: currentPhase !== 'victory' };
  }

  const anyClueShared = cluesSharedByNavigator || cluesSharedByDecoder;
  const bothCluesShared = cluesSharedByNavigator && cluesSharedByDecoder;

  if (bothCluesShared && engineerAcknowledged) {
    if (currentPhase === 'discovery' || currentPhase === 'understanding' || currentPhase === 'setup') {
      return { newPhase: 'solving', changed: currentPhase !== 'solving' };
    }
  }

  if (anyClueShared && (currentPhase === 'setup' || currentPhase === 'discovery')) {
    if (bothCluesShared) {
      return { newPhase: 'understanding', changed: currentPhase !== 'understanding' };
    }
    return { newPhase: 'discovery', changed: currentPhase !== 'discovery' };
  }

  return { newPhase: currentPhase, changed: false };
}

// ─── Bridge computation ───────────────────────────────────────────────────────

/**
 * Computes the correct bridge state given current mission events.
 * Bridge sections only advance — they never go backwards.
 */
export function computeBridge(params: {
  current: BridgeState;
  cluesSharedByNavigator: boolean;
  cluesSharedByDecoder: boolean;
  engineerAcknowledged: boolean;
  puzzleSolved: boolean;
}): BridgeState {
  const { current, cluesSharedByNavigator, cluesSharedByDecoder, engineerAcknowledged, puzzleSolved } = params;

  const anyClueShared = cluesSharedByNavigator || cluesSharedByDecoder;
  const bothCluesShared = cluesSharedByNavigator && cluesSharedByDecoder;

  const next = { ...current };

  // Section 1: First clue shared → glowing
  if (anyClueShared && sectionRank(next.section1) < sectionRank('glowing')) {
    next.section1 = 'glowing';
  }

  // Section 2: Both clues shared + engineer acknowledges → repaired
  if (bothCluesShared && engineerAcknowledged && sectionRank(next.section2) < sectionRank('repaired')) {
    next.section2 = 'repaired';
  }

  // Section 3: Puzzle solved → repaired
  if (puzzleSolved && sectionRank(next.section3) < sectionRank('repaired')) {
    next.section3 = 'repaired';
  }

  return next;
}

function sectionRank(state: BridgeSectionState): number {
  return { broken: 0, glowing: 1, repaired: 2 }[state];
}

// ─── Score calculation ────────────────────────────────────────────────────────

export interface BridgeScore {
  raw: number;          // 0–100
  label: string;
  breakdown: ScoreBreakdown[];
  formula: string;
}

export interface ScoreBreakdown {
  label: string;
  points: number;
  max: number;
  description: string;
}

/**
 * Calculates a transparent bridge score from observable game events.
 * Never fabricates statistics.
 */
export function calculateBridgeScore(params: {
  puzzleSolved: boolean;
  bridgeSectionsRestored: number;
  cluesShared: number;
  aiTransformationsUsed: number;
  clarificationsRequested: number;
  correctActions: number;
  incorrectActions: number;
  timeTakenSeconds: number;
  totalTimeSeconds: number;
}): BridgeScore {
  const {
    puzzleSolved,
    bridgeSectionsRestored,
    cluesShared,
    aiTransformationsUsed,
    clarificationsRequested,
    correctActions,
    incorrectActions,
    timeTakenSeconds,
    totalTimeSeconds,
  } = params;

  const breakdown: ScoreBreakdown[] = [];

  // Puzzle completion (40 pts)
  const completionPts = puzzleSolved ? 40 : 0;
  breakdown.push({
    label: 'Mission Completion',
    points: completionPts,
    max: 40,
    description: puzzleSolved ? 'Energy core restored' : 'Core not restored',
  });

  // Bridge restoration (30 pts, 10 per section)
  const bridgePts = Math.min(bridgeSectionsRestored * 10, 30);
  breakdown.push({
    label: 'Bridge Restoration',
    points: bridgePts,
    max: 30,
    description: `${bridgeSectionsRestored}/3 bridge sections restored`,
  });

  // Collaboration quality (20 pts)
  const sharePts = Math.min(cluesShared * 5, 10);
  const aiPts = Math.min(aiTransformationsUsed * 2, 5);
  const clarifyPts = Math.min(clarificationsRequested * 2, 5);
  const collabPts = sharePts + aiPts + clarifyPts;
  breakdown.push({
    label: 'Collaboration',
    points: collabPts,
    max: 20,
    description: `${cluesShared} clues shared, ${aiTransformationsUsed} AI transforms, ${clarificationsRequested} clarifications`,
  });

  // Accuracy bonus/penalty (10 pts)
  const totalActions = correctActions + incorrectActions;
  const accuracyRatio = totalActions > 0 ? correctActions / totalActions : 1;
  const accuracyPts = Math.round(accuracyRatio * 10);
  breakdown.push({
    label: 'Action Accuracy',
    points: accuracyPts,
    max: 10,
    description: `${correctActions} correct, ${incorrectActions} incorrect actions`,
  });

  const raw = completionPts + bridgePts + collabPts + accuracyPts;

  let label = 'Disconnected';
  if (raw >= 90) label = 'Perfect Sync';
  else if (raw >= 70) label = 'Strong Connection';
  else if (raw >= 50) label = 'Building Bridges';
  else if (raw >= 30) label = 'Partial Signal';
  else label = 'Static';

  return {
    raw: Math.min(raw, 100),
    label,
    breakdown,
    formula: 'Score = Completion(40) + Bridge(30) + Collaboration(20) + Accuracy(10)',
  };
}
