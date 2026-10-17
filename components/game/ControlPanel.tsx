'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { SwitchColor } from '@/types/game';
import { Check } from 'lucide-react';

const SWITCHES: { color: SwitchColor; label: string; hex: string; symbol: string; rune: string }[] = [
  { color: 'cyan', label: 'CYAN', hex: '#00f5ff', symbol: '◈', rune: 'Spiral' },
  { color: 'amber', label: 'AMBER', hex: '#f59e0b', symbol: '☀', rune: 'Sun' },
  { color: 'violet', label: 'VIOLET', hex: '#8b5cf6', symbol: '≋', rune: 'Wave' },
];

export default function ControlPanel() {
  const { activateSwitch, activatedSwitches, acknowledgeSequence, engineerAcknowledged, phase, lastActionFeedback } = useGameStore();
  const [lastPressed, setLastPressed] = useState<SwitchColor | null>(null);

  const canActivate = phase !== 'victory' && phase !== 'failure';
  const allActivated = activatedSwitches.length === 3;

  const handleSwitch = (color: SwitchColor) => {
    if (!canActivate) return;
    setLastPressed(color);
    activateSwitch(color);
    setTimeout(() => setLastPressed(null), 300);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: 8, flexShrink: 0,
      }}>
        <span>⚡</span>
        <span className="font-display" style={{ color: 'var(--color-amber)', fontSize: '0.7rem', letterSpacing: '0.12em' }}>
          ENGINEER CONTROL PANEL
        </span>
      </div>

      {/* Acknowledge button */}
      {!engineerAcknowledged && (phase === 'discovery' || phase === 'understanding' || phase === 'setup') && (
        <motion.button
          className="btn-amber"
          style={{ width: '100%', fontSize: '0.78rem', padding: '0.6rem' }}
          onClick={acknowledgeSequence}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✓ I Know the Sequence — Acknowledge
        </motion.button>
      )}

      {engineerAcknowledged && !allActivated && (
        <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 6, fontSize: '0.78rem', color: 'var(--color-amber)' }}>
          ⚡ Ready — activate switches in the correct order
        </div>
      )}

      {/* Sequence progress */}
      {activatedSwitches.length > 0 && (
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>SEQ:</span>
          {activatedSwitches.map((color, i) => {
            const sw = SWITCHES.find((s) => s.color === color)!;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: sw.hex, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', color: '#050816', fontWeight: 700,
                  boxShadow: `0 0 8px ${sw.hex}80`,
                }}
              >
                {i + 1}
              </motion.div>
            );
          })}
          {[...Array(3 - activatedSwitches.length)].map((_, i) => (
            <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
          ))}
        </div>
      )}

      {/* Switch buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {SWITCHES.map((sw) => {
          const activated = activatedSwitches.includes(sw.color);
          const activatedAt = activatedSwitches.indexOf(sw.color);
          const isPressed = lastPressed === sw.color;

          return (
            <motion.button
              key={sw.color}
              onClick={() => handleSwitch(sw.color)}
              disabled={!canActivate || activated}
              whileHover={canActivate && !activated ? { scale: 1.02, x: 4 } : {}}
              whileTap={canActivate && !activated ? { scale: 0.97 } : {}}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.875rem 1rem', borderRadius: 8, cursor: activated || !canActivate ? 'not-allowed' : 'pointer',
                border: `2px solid ${activated ? sw.hex + '60' : canActivate ? sw.hex + '40' : 'rgba(255,255,255,0.08)'}`,
                background: activated
                  ? `rgba(${sw.color === 'cyan' ? '0,245,255' : sw.color === 'amber' ? '245,158,11' : '139,92,246'},0.15)`
                  : isPressed ? `rgba(${sw.color === 'cyan' ? '0,245,255' : sw.color === 'amber' ? '245,158,11' : '139,92,246'},0.1)` : 'rgba(255,255,255,0.03)',
                transition: 'all 0.15s',
                opacity: !canActivate ? 0.5 : 1,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Power indicator */}
              <motion.div
                style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: activated ? sw.hex : 'rgba(255,255,255,0.1)',
                  flexShrink: 0,
                  boxShadow: activated ? `0 0 12px ${sw.hex}, 0 0 24px ${sw.hex}60` : undefined,
                }}
                animate={activated ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />

              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{sw.symbol}</span>

              <div style={{ flex: 1, textAlign: 'left' }}>
                <div className="font-mono" style={{ fontSize: '0.9rem', color: activated ? sw.hex : 'var(--color-text-primary)', fontWeight: 700 }}>
                  {sw.label}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                  {sw.rune} Rune Energy
                </div>
              </div>

              {activated ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-success)', fontSize: '0.75rem', fontWeight: 600 }}>
                  <Check size={14} /> #{activatedAt + 1}
                </div>
              ) : (
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>STANDBY</div>
              )}

              {/* Glow overlay when activated */}
              {activated && (
                <motion.div
                  style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(ellipse at left, ${sw.hex}15, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {lastActionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className={lastActionFeedback.correct ? 'feedback-correct' : 'feedback-wrong'}
            style={{ padding: '0.6rem 0.75rem', borderRadius: 8, fontSize: '0.8rem', lineHeight: 1.4 }}
          >
            {lastActionFeedback.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Victory state */}
      {allActivated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '0.75rem', borderRadius: 8, textAlign: 'center',
            background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)',
            color: 'var(--color-success)', fontFamily: 'var(--font-orbitron)',
            fontSize: '0.75rem', letterSpacing: '0.1em',
          }}
        >
          ✓ SEQUENCE COMPLETE — CORE RESTORED
        </motion.div>
      )}
    </div>
  );
}
