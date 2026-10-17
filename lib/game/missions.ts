// Mission definitions for GAP//BREAKERS

import { PlayerRole, SwitchColor, BridgeSectionState } from '@/types/game';

export interface RoleClue {
  role: PlayerRole;
  title: string;
  content: ClueContent;
}

export type ClueContent =
  | { type: 'route-map'; sequence: string[]; description: string }
  | { type: 'rune-table'; mappings: { rune: string; color: SwitchColor; symbol: string }[]; description: string }
  | { type: 'control-panel'; description: string };

export interface BridgeTrigger {
  section: 1 | 2 | 3;
  targetState: BridgeSectionState;
  condition: 'clue_shared' | 'sequence_acknowledged' | 'puzzle_solved';
  description: string;
}

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationSeconds: number;
  correctSequence: SwitchColor[];
  roles: RoleClue[];
  bridgeTriggers: BridgeTrigger[];
  penaltySeconds: number; // time penalty for wrong answer
}

export const MISSIONS: Record<string, Mission> = {
  'mission-01': {
    id: 'mission-01',
    title: 'MISSION 01',
    subtitle: 'SAVE THE FLOATING CITY',
    description:
      "The city's energy core is failing. A broken bridge separates the team from the core. Each player holds only part of the information needed to activate it.",
    durationSeconds: 180, // 3 minutes
    correctSequence: ['cyan', 'amber', 'violet'],
    penaltySeconds: 15,
    roles: [
      {
        role: 'navigator',
        title: 'Navigator Intelligence',
        content: {
          type: 'route-map',
          sequence: ['Spiral Rune', 'Sun Rune', 'Wave Rune'],
          description:
            'Your route map shows the correct order to activate the energy conduits. Share this sequence with the Decoder and Engineer to restore the bridge.',
        },
      },
      {
        role: 'decoder',
        title: 'Decoder Intelligence',
        content: {
          type: 'rune-table',
          mappings: [
            { rune: 'Spiral Rune', color: 'cyan', symbol: '◈' },
            { rune: 'Sun Rune', color: 'amber', symbol: '☀' },
            { rune: 'Wave Rune', color: 'violet', symbol: '≋' },
          ],
          description:
            'Your rune interpretation table translates each rune name into an energy color. Share these meanings so the Engineer can activate the correct switches.',
        },
      },
      {
        role: 'engineer',
        title: 'Engineer Control Panel',
        content: {
          type: 'control-panel',
          description:
            'You control three energy switches: CYAN, AMBER, and VIOLET. Ask your teammates for the correct activation order. Activate them in sequence to restore the core.',
        },
      },
    ],
    bridgeTriggers: [
      {
        section: 1,
        targetState: 'glowing',
        condition: 'clue_shared',
        description: 'First clue shared — bridge begins to glow',
      },
      {
        section: 2,
        targetState: 'repaired',
        condition: 'sequence_acknowledged',
        description: 'Engineer acknowledges the sequence — bridge section reconstructs',
      },
      {
        section: 3,
        targetState: 'repaired',
        condition: 'puzzle_solved',
        description: 'Correct sequence activated — final section connects',
      },
    ],
  },
};

export function getMission(id: string): Mission | null {
  return MISSIONS[id] ?? null;
}

export function getRoleClue(mission: Mission, role: PlayerRole): RoleClue | null {
  return mission.roles.find((r) => r.role === role) ?? null;
}
