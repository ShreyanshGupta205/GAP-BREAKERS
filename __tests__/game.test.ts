// Jest tests for GAP//BREAKERS game logic

import {
  isNextSwitchCorrect,
  isPuzzleSolved,
  validateSequence,
  computePhase,
  computeBridge,
  calculateBridgeScore,
  CORRECT_SEQUENCE,
} from '../lib/game/state-machine';

import { generateRoomCode, validateRoomCode, normalizeRoomCode } from '../lib/validation/room';

// ─── Puzzle Tests ─────────────────────────────────────────────────────────────

describe('Puzzle - Correct sequence', () => {
  test('CORRECT_SEQUENCE is cyan → amber → violet', () => {
    expect(CORRECT_SEQUENCE).toEqual(['cyan', 'amber', 'violet']);
  });

  test('validateSequence accepts correct sequence', () => {
    expect(validateSequence(['cyan', 'amber', 'violet'])).toBe(true);
  });

  test('validateSequence rejects wrong order', () => {
    expect(validateSequence(['amber', 'cyan', 'violet'])).toBe(false);
    expect(validateSequence(['violet', 'amber', 'cyan'])).toBe(false);
    expect(validateSequence(['cyan', 'violet', 'amber'])).toBe(false);
  });

  test('validateSequence rejects incomplete sequence', () => {
    expect(validateSequence(['cyan'])).toBe(false);
    expect(validateSequence(['cyan', 'amber'])).toBe(false);
    expect(validateSequence([])).toBe(false);
  });
});

describe('Puzzle - isNextSwitchCorrect', () => {
  test('first switch must be cyan', () => {
    expect(isNextSwitchCorrect([], 'cyan')).toBe(true);
    expect(isNextSwitchCorrect([], 'amber')).toBe(false);
    expect(isNextSwitchCorrect([], 'violet')).toBe(false);
  });

  test('second switch must be amber after cyan', () => {
    expect(isNextSwitchCorrect(['cyan'], 'amber')).toBe(true);
    expect(isNextSwitchCorrect(['cyan'], 'cyan')).toBe(false);
    expect(isNextSwitchCorrect(['cyan'], 'violet')).toBe(false);
  });

  test('third switch must be violet after cyan, amber', () => {
    expect(isNextSwitchCorrect(['cyan', 'amber'], 'violet')).toBe(true);
    expect(isNextSwitchCorrect(['cyan', 'amber'], 'cyan')).toBe(false);
    expect(isNextSwitchCorrect(['cyan', 'amber'], 'amber')).toBe(false);
  });

  test('no switch is valid after complete sequence', () => {
    expect(isNextSwitchCorrect(['cyan', 'amber', 'violet'], 'cyan')).toBe(false);
  });
});

describe('Puzzle - isPuzzleSolved', () => {
  test('solved with correct full sequence', () => {
    expect(isPuzzleSolved(['cyan', 'amber', 'violet'])).toBe(true);
  });

  test('not solved with partial sequence', () => {
    expect(isPuzzleSolved(['cyan', 'amber'])).toBe(false);
    expect(isPuzzleSolved(['cyan'])).toBe(false);
    expect(isPuzzleSolved([])).toBe(false);
  });

  test('not solved with wrong sequence', () => {
    expect(isPuzzleSolved(['amber', 'cyan', 'violet'])).toBe(false);
    expect(isPuzzleSolved(['violet', 'amber', 'cyan'])).toBe(false);
  });

  test('player cannot win without correct sequence', () => {
    const wrongAttempts = [
      ['amber', 'violet', 'cyan'],
      ['cyan', 'violet', 'amber'],
      ['violet', 'cyan', 'amber'],
    ];
    wrongAttempts.forEach((seq) => {
      expect(isPuzzleSolved(seq as any)).toBe(false);
    });
  });
});

// ─── Phase transition tests ───────────────────────────────────────────────────

describe('Phase transitions', () => {
  const baseParams = {
    currentPhase: 'setup' as const,
    timerExpired: false,
    puzzleSolved: false,
    cluesSharedByNavigator: false,
    cluesSharedByDecoder: false,
    engineerAcknowledged: false,
  };

  test('transitions to discovery when first clue shared', () => {
    const result = computePhase({ ...baseParams, cluesSharedByNavigator: true });
    expect(result.newPhase).toBe('discovery');
  });

  test('transitions to understanding when both clues shared', () => {
    const result = computePhase({
      ...baseParams,
      cluesSharedByNavigator: true,
      cluesSharedByDecoder: true,
    });
    expect(result.newPhase).toBe('understanding');
  });

  test('transitions to solving when both clues shared and engineer acknowledges', () => {
    const result = computePhase({
      ...baseParams,
      cluesSharedByNavigator: true,
      cluesSharedByDecoder: true,
      engineerAcknowledged: true,
    });
    expect(result.newPhase).toBe('solving');
  });

  test('transitions to victory when puzzle solved', () => {
    const result = computePhase({ ...baseParams, puzzleSolved: true });
    expect(result.newPhase).toBe('victory');
  });

  test('transitions to failure when timer expires', () => {
    const result = computePhase({ ...baseParams, timerExpired: true });
    expect(result.newPhase).toBe('failure');
  });

  test('victory state is terminal — timer expiry does not override', () => {
    const result = computePhase({ ...baseParams, currentPhase: 'victory', timerExpired: true });
    expect(result.newPhase).toBe('victory');
  });

  test('failure state is terminal', () => {
    const result = computePhase({ ...baseParams, currentPhase: 'failure', puzzleSolved: true });
    expect(result.newPhase).toBe('failure');
  });
});

// ─── Bridge progression tests ─────────────────────────────────────────────────

describe('Bridge progression', () => {
  const broken = { section1: 'broken' as const, section2: 'broken' as const, section3: 'broken' as const };

  test('section 1 glows when first clue shared', () => {
    const result = computeBridge({ current: broken, cluesSharedByNavigator: true, cluesSharedByDecoder: false, engineerAcknowledged: false, puzzleSolved: false });
    expect(result.section1).toBe('glowing');
    expect(result.section2).toBe('broken');
    expect(result.section3).toBe('broken');
  });

  test('section 2 repaired when both clues shared and engineer acknowledges', () => {
    const result = computeBridge({ current: broken, cluesSharedByNavigator: true, cluesSharedByDecoder: true, engineerAcknowledged: true, puzzleSolved: false });
    expect(result.section2).toBe('repaired');
  });

  test('section 3 repaired only when puzzle solved', () => {
    const result = computeBridge({ current: broken, cluesSharedByNavigator: false, cluesSharedByDecoder: false, engineerAcknowledged: false, puzzleSolved: true });
    expect(result.section3).toBe('repaired');
  });

  test('sections do not regress', () => {
    const repaired = { section1: 'repaired' as const, section2: 'repaired' as const, section3: 'repaired' as const };
    const result = computeBridge({ current: repaired, cluesSharedByNavigator: false, cluesSharedByDecoder: false, engineerAcknowledged: false, puzzleSolved: false });
    expect(result.section1).toBe('repaired');
    expect(result.section2).toBe('repaired');
    expect(result.section3).toBe('repaired');
  });

  test('section 3 does NOT advance without puzzle being solved', () => {
    const result = computeBridge({ current: broken, cluesSharedByNavigator: true, cluesSharedByDecoder: true, engineerAcknowledged: true, puzzleSolved: false });
    expect(result.section3).toBe('broken');
  });
});

// ─── Score calculation tests ──────────────────────────────────────────────────

describe('Score calculation', () => {
  test('uses only observable game events', () => {
    const score = calculateBridgeScore({
      puzzleSolved: true,
      bridgeSectionsRestored: 3,
      cluesShared: 2,
      aiTransformationsUsed: 2,
      clarificationsRequested: 1,
      correctActions: 3,
      incorrectActions: 0,
      timeTakenSeconds: 90,
      totalTimeSeconds: 180,
    });
    expect(score.raw).toBeGreaterThan(0);
    expect(score.raw).toBeLessThanOrEqual(100);
    expect(score.breakdown.length).toBeGreaterThan(0);
    expect(score.formula).toBeTruthy();
  });

  test('perfect game gives high score', () => {
    const score = calculateBridgeScore({
      puzzleSolved: true, bridgeSectionsRestored: 3, cluesShared: 2,
      aiTransformationsUsed: 2, clarificationsRequested: 1,
      correctActions: 3, incorrectActions: 0,
      timeTakenSeconds: 60, totalTimeSeconds: 180,
    });
    expect(score.raw).toBeGreaterThanOrEqual(70);
  });

  test('failed mission gives lower score', () => {
    const score = calculateBridgeScore({
      puzzleSolved: false, bridgeSectionsRestored: 0, cluesShared: 0,
      aiTransformationsUsed: 0, clarificationsRequested: 0,
      correctActions: 0, incorrectActions: 3,
      timeTakenSeconds: 180, totalTimeSeconds: 180,
    });
    expect(score.raw).toBeLessThan(50);
  });
});

// ─── Room code tests ──────────────────────────────────────────────────────────

describe('Room code validation', () => {
  test('generateRoomCode produces 6-char uppercase code', () => {
    // Can only run in Node environment with crypto
    if (typeof globalThis.crypto === 'undefined') {
      // Skip in environments without crypto
      return;
    }
    const code = generateRoomCode();
    expect(code).toHaveLength(6);
    expect(code).toMatch(/^[A-Z2-9]+$/);
  });

  test('validateRoomCode rejects empty string', () => {
    expect(validateRoomCode('')).not.toBeNull();
  });

  test('validateRoomCode rejects short code', () => {
    expect(validateRoomCode('ABC')).not.toBeNull();
  });

  test('validateRoomCode rejects long code', () => {
    expect(validateRoomCode('ABCDEFG')).not.toBeNull();
  });

  test('validateRoomCode accepts valid 6-char code', () => {
    expect(validateRoomCode('ABCDEF')).toBeNull();
    expect(validateRoomCode('A2B3C4')).toBeNull();
  });

  test('normalizeRoomCode uppercases and trims', () => {
    expect(normalizeRoomCode('  abc123  ')).toBe('ABC123');
  });
});
