'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { PlayerRole } from '@/types/game';

interface CluePanelProps {
  viewingRole: PlayerRole;
}

const ROLE_STYLES: Record<PlayerRole, { color: string; label: string; symbol: string; accent: string }> = {
  navigator: { color: 'var(--color-cyan)', label: 'NAVIGATOR', symbol: '🧭', accent: 'rgba(0,245,255,0.1)' },
  decoder: { color: 'var(--color-violet)', label: 'DECODER', symbol: '🔮', accent: 'rgba(139,92,246,0.1)' },
  engineer: { color: 'var(--color-amber)', label: 'ENGINEER', symbol: '⚡', accent: 'rgba(245,158,11,0.1)' },
};

export default function CluePanel({ viewingRole }: CluePanelProps) {
  const { shareClue, cluesSharedByNavigator, cluesSharedByDecoder, phase } = useGameStore();
  const style = ROLE_STYLES[viewingRole];

  const isNavigator = viewingRole === 'navigator';
  const isDecoder = viewingRole === 'decoder';
  const isEngineer = viewingRole === 'engineer';

  const alreadyShared = isNavigator ? cluesSharedByNavigator : isDecoder ? cluesSharedByDecoder : true;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Role badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        background: style.accent,
        border: `1px solid ${style.color}30`,
        borderRadius: 8,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '1rem' }}>{style.symbol}</span>
        <span className="font-display" style={{ color: style.color, fontSize: '0.7rem', letterSpacing: '0.12em' }}>
          {style.label} INTELLIGENCE
        </span>
      </div>

      {/* Clue content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {isNavigator && <NavigatorClue alreadyShared={alreadyShared} onShare={() => shareClue('navigator')} />}
        {isDecoder && <DecoderClue alreadyShared={alreadyShared} onShare={() => shareClue('decoder')} />}
        {isEngineer && <EngineerClue />}
      </div>
    </div>
  );
}

function NavigatorClue({ alreadyShared, onShare }: { alreadyShared: boolean; onShare: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
        Your route map shows the correct order to activate the energy conduits:
      </p>

      {/* Route map */}
      <div style={{
        background: 'rgba(0,245,255,0.06)',
        border: '1px solid rgba(0,245,255,0.2)',
        borderRadius: 10, padding: '1rem',
      }}>
        <div className="font-display" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
          ROUTE MAP — RUNE SEQUENCE
        </div>
        {[
          { step: 1, rune: 'SPIRAL RUNE', symbol: '◈', desc: 'First conduit' },
          { step: 2, rune: 'SUN RUNE', symbol: '☀', desc: 'Second conduit' },
          { step: 3, rune: 'WAVE RUNE', symbol: '≋', desc: 'Third conduit' },
        ].map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.6rem 0.75rem', marginBottom: i < 2 ? '0.4rem' : 0,
              background: 'rgba(0,0,0,0.3)', borderRadius: 6,
              border: '1px solid rgba(0,245,255,0.1)',
            }}
          >
            <div className="font-display" style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,245,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: 'var(--color-cyan)', flexShrink: 0 }}>
              {item.step}
            </div>
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.symbol}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>{item.rune}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
            </div>
            {i < 2 && (
              <div style={{ marginLeft: 'auto', color: 'var(--color-cyan)', opacity: 0.5 }}>→</div>
            )}
          </motion.div>
        ))}
        <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 6, fontSize: '0.75rem', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>
          ORDER: Spiral → Sun → Wave
        </div>
      </div>

      <div style={{ padding: '0.6rem', background: 'rgba(0,245,255,0.05)', borderRadius: 6, fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
        💡 Share this sequence with the Decoder and Engineer. They need this to activate the switches.
      </div>

      <motion.button
        className={alreadyShared ? 'btn-ghost' : 'btn-cyan'}
        style={{ width: '100%', fontSize: '0.78rem', padding: '0.6rem' }}
        onClick={onShare}
        disabled={alreadyShared}
        whileHover={!alreadyShared ? { scale: 1.02 } : {}}
        whileTap={!alreadyShared ? { scale: 0.98 } : {}}
      >
        {alreadyShared ? '✓ Sequence Shared' : '📡 Share Route Map with Team'}
      </motion.button>
    </div>
  );
}

function DecoderClue({ alreadyShared, onShare }: { alreadyShared: boolean; onShare: () => void }) {
  const mappings = [
    { rune: 'Spiral Rune', symbol: '◈', color: 'CYAN', hex: '#00f5ff', badge: 'badge-cyan' },
    { rune: 'Sun Rune', symbol: '☀', color: 'AMBER', hex: '#f59e0b', badge: 'badge-amber' },
    { rune: 'Wave Rune', symbol: '≋', color: 'VIOLET', hex: '#8b5cf6', badge: 'badge-violet' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
        Your rune interpretation table translates symbol names into energy colors:
      </p>

      <div style={{
        background: 'rgba(139,92,246,0.06)',
        border: '1px solid rgba(139,92,246,0.2)',
        borderRadius: 10, padding: '1rem',
      }}>
        <div className="font-display" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
          RUNE INTERPRETATION TABLE
        </div>
        {mappings.map((m, i) => (
          <motion.div
            key={m.rune}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.6rem 0.75rem', marginBottom: i < 2 ? '0.4rem' : 0,
              background: 'rgba(0,0,0,0.3)', borderRadius: 6,
              border: '1px solid rgba(139,92,246,0.1)',
            }}
          >
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{m.symbol}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{m.rune}</div>
            </div>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: '0 0.25rem' }}>→</span>
            <div className={`badge ${m.badge}`} style={{ fontSize: '0.65rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.hex }} />
              {m.color}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ padding: '0.6rem', background: 'rgba(139,92,246,0.05)', borderRadius: 6, fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
        💡 The Navigator knows the ORDER of runes. You know the COLORS. Share both with the Engineer!
      </div>

      <motion.button
        className={alreadyShared ? 'btn-ghost' : ''}
        style={{
          width: '100%', fontSize: '0.78rem', padding: '0.6rem',
          background: alreadyShared ? undefined : 'var(--color-violet)',
          color: alreadyShared ? undefined : '#fff',
          border: 'none', borderRadius: 6, cursor: alreadyShared ? 'not-allowed' : 'pointer',
          opacity: alreadyShared ? 0.6 : 1,
          fontFamily: 'var(--font-orbitron)', fontWeight: 700, letterSpacing: '0.08em',
          transition: 'all 0.15s',
        }}
        onClick={onShare}
        disabled={alreadyShared}
        whileHover={!alreadyShared ? { scale: 1.02 } : {}}
        whileTap={!alreadyShared ? { scale: 0.98 } : {}}
      >
        {alreadyShared ? '✓ Rune Table Shared' : '📡 Share Rune Table with Team'}
      </motion.button>
    </div>
  );
}

function EngineerClue() {
  const { activatedSwitches, phase } = useGameStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
        You control the three energy switches. Ask your teammates for the activation sequence.
      </p>

      <div style={{
        background: 'rgba(245,158,11,0.06)',
        border: '1px solid rgba(245,158,11,0.2)',
        borderRadius: 10, padding: '1rem',
      }}>
        <div className="font-display" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
          SWITCH STATUS
        </div>
        {[
          { color: 'cyan' as const, label: 'CYAN', hex: '#00f5ff', index: 0 },
          { color: 'amber' as const, label: 'AMBER', hex: '#f59e0b', index: 1 },
          { color: 'violet' as const, label: 'VIOLET', hex: '#8b5cf6', index: 2 },
        ].map((sw) => {
          const activated = activatedSwitches.includes(sw.color);
          const activatedAt = activatedSwitches.indexOf(sw.color);
          return (
            <div
              key={sw.color}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.6rem 0.75rem', marginBottom: '0.4rem',
                background: activated ? `rgba(${sw.color === 'cyan' ? '0,245,255' : sw.color === 'amber' ? '245,158,11' : '139,92,246'},0.12)` : 'rgba(0,0,0,0.3)',
                borderRadius: 6,
                border: `1px solid ${activated ? sw.hex + '40' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: activated ? sw.hex : '#2d3748', flexShrink: 0, boxShadow: activated ? `0 0 8px ${sw.hex}` : undefined }} />
              <span className="font-mono" style={{ fontSize: '0.8rem', color: activated ? sw.hex : 'var(--color-text-muted)', flex: 1 }}>{sw.label}</span>
              {activated && (
                <span style={{ fontSize: '0.7rem', color: 'var(--color-success)' }}>
                  ✓ ACTIVATED #{activatedAt + 1}
                </span>
              )}
              {!activated && <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>STANDBY</span>}
            </div>
          );
        })}
      </div>

      {phase === 'solving' || phase === 'understanding' ? (
        <div style={{ padding: '0.6rem', background: 'rgba(245,158,11,0.08)', borderRadius: 6, fontSize: '0.78rem', color: 'var(--color-amber)', lineHeight: 1.5 }}>
          ⚡ Sequence acknowledged! Use the control panel below to activate switches.
        </div>
      ) : (
        <div style={{ padding: '0.6rem', background: 'rgba(0,0,0,0.2)', borderRadius: 6, fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
          ⏳ Waiting for teammates to share the rune sequence...
        </div>
      )}
    </div>
  );
}
