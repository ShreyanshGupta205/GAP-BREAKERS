'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { SwitchColor } from '@/types/game';
import RuneGlyph from './RuneGlyph';
import { Check, Cpu, CheckCircle2, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

const SWITCHES: { color: SwitchColor; label: string; hex: string; type: 'spiral' | 'sun' | 'wave'; rune: string }[] = [
  { color: 'cyan', label: 'CYAN', hex: '#00f5ff', type: 'spiral', rune: 'Spiral' },
  { color: 'amber', label: 'AMBER', hex: '#f59e0b', type: 'sun', rune: 'Sun' },
  { color: 'violet', label: 'VIOLET', hex: '#8b5cf6', type: 'wave', rune: 'Wave' },
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
        padding: '0.55rem 0.85rem',
        background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: 8, flexShrink: 0,
      }}>
        <Cpu className="w-4 h-4 text-amber" />
        <span className="font-display font-bold" style={{ color: 'var(--color-amber)', fontSize: '0.75rem', letterSpacing: '0.12em' }}>
          ENGINEER CONDUIT SWITCHES
        </span>
      </div>

      {/* Acknowledge button */}
      {!engineerAcknowledged && (phase === 'discovery' || phase === 'understanding' || phase === 'setup') && (
        <motion.button
          className="btn-amber"
          style={{ width: '100%', fontSize: '0.78rem', padding: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          onClick={acknowledgeSequence}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>I Have the Sequence — Ready to Solve</span>
        </motion.button>
      )}

      {engineerAcknowledged && !allActivated && (
        <div style={{ padding: '0.55rem 0.75rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 6, fontSize: '0.78rem', color: 'var(--color-amber)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Zap className="w-3.5 h-3.5 text-amber" />
          <span>Ready — Activate switches in exact order</span>
        </div>
      )}

      {/* Sequence progress indicator */}
      {activatedSwitches.length > 0 && (
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>SEQ:</span>
          {activatedSwitches.map((color, i) => {
            const sw = SWITCHES.find((s) => s.color === color)!;
            return (
              <div
                key={color}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  padding: '0.2rem 0.5rem', borderRadius: 4,
                  background: `${sw.hex}20`, border: `1px solid ${sw.hex}60`,
                  fontSize: '0.7rem', color: sw.hex, fontFamily: 'var(--font-mono)', fontWeight: 700
                }}
              >
                <span>{i + 1}.</span>
                <RuneGlyph type={sw.type} size={14} glow={false} />
                <span>{sw.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* The 3 Physical Switches with Rich Art */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', flex: 1 }}>
        {SWITCHES.map((sw) => {
          const isActivated = activatedSwitches.includes(sw.color);
          const isPressed = lastPressed === sw.color;

          return (
            <motion.button
              key={sw.color}
              disabled={!canActivate || isActivated}
              onClick={() => handleSwitch(sw.color)}
              whileHover={canActivate && !isActivated ? { scale: 1.03, y: -2 } : {}}
              whileTap={canActivate && !isActivated ? { scale: 0.96 } : {}}
              style={{
                position: 'relative',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '0.85rem 0.5rem',
                borderRadius: 10,
                background: isActivated
                  ? `radial-gradient(ellipse at center, ${sw.hex}30 0%, rgba(5,8,22,0.95) 80%)`
                  : 'radial-gradient(ellipse at center, rgba(20,30,55,0.7) 0%, rgba(6,10,24,0.9) 100%)',
                border: `2px solid ${isActivated ? sw.hex : 'rgba(255,255,255,0.12)'}`,
                boxShadow: isActivated
                  ? `0 0 20px ${sw.hex}50, inset 0 0 15px ${sw.hex}25`
                  : '0 4px 12px rgba(0,0,0,0.5)',
                cursor: canActivate && !isActivated ? 'pointer' : 'default',
                opacity: isActivated ? 1 : canActivate ? 0.9 : 0.5,
                transition: 'all 0.2s ease',
              }}
            >
              {/* Top LED Indicator */}
              <div style={{
                position: 'absolute', top: 8, right: 8,
                width: 7, height: 7, borderRadius: '50%',
                background: isActivated ? sw.hex : '#334155',
                boxShadow: isActivated ? `0 0 8px ${sw.hex}` : undefined,
              }} />

              {/* Central Vector Rune Art */}
              <div className="mb-2">
                <RuneGlyph type={sw.type} size={42} animate={isActivated} glow={isActivated} />
              </div>

              {/* Switch Label */}
              <span className="font-display font-bold text-xs tracking-wider" style={{ color: isActivated ? sw.hex : '#ffffff' }}>
                {sw.label}
              </span>

              {/* Sub-label */}
              <span className="text-[10px] text-white/50 font-mono mt-0.5">
                {sw.rune} Rune
              </span>

              {/* Status footer */}
              {isActivated ? (
                <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold">
                  <Check className="w-3 h-3" />
                  <span>ACTIVE</span>
                </div>
              ) : (
                <div className="mt-2 text-[10px] font-mono text-white/40">
                  ENGAGE
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback banner */}
      <AnimatePresence>
        {lastActionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: '0.5rem 0.75rem', borderRadius: 6,
              background: lastActionFeedback.correct ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
              border: `1px solid ${lastActionFeedback.correct ? '#10b98160' : '#ef444460'}`,
              fontSize: '0.78rem',
              color: lastActionFeedback.correct ? '#10b981' : '#ef4444',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}
          >
            {lastActionFeedback.correct ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            <span>{lastActionFeedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
