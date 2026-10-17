'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { PlayerRole } from '@/types/game';
import RuneGlyph from './RuneGlyph';
import { Compass, BookOpen, Cpu, Share2, CheckCircle2, ArrowRight, Sparkles, Key, LucideIcon } from 'lucide-react';

interface CluePanelProps {
  viewingRole: PlayerRole;
}

const ROLE_META: Record<PlayerRole, { color: string; label: string; icon: LucideIcon; accent: string }> = {
  navigator: { color: 'var(--color-cyan)', label: 'NAVIGATOR', icon: Compass, accent: 'rgba(0,245,255,0.1)' },
  decoder: { color: 'var(--color-violet)', label: 'DECODER', icon: BookOpen, accent: 'rgba(139,92,246,0.1)' },
  engineer: { color: 'var(--color-amber)', label: 'ENGINEER', icon: Cpu, accent: 'rgba(245,158,11,0.1)' },
};

export default function CluePanel({ viewingRole }: CluePanelProps) {
  const { shareClue, cluesSharedByNavigator, cluesSharedByDecoder } = useGameStore();
  const meta = ROLE_META[viewingRole];
  const RoleIcon = meta.icon;

  const isNavigator = viewingRole === 'navigator';
  const isDecoder = viewingRole === 'decoder';
  const isEngineer = viewingRole === 'engineer';

  const alreadyShared = isNavigator ? cluesSharedByNavigator : isDecoder ? cluesSharedByDecoder : true;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Role badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        padding: '0.6rem 0.85rem',
        background: meta.accent,
        border: `1px solid ${meta.color}40`,
        borderRadius: 8,
        flexShrink: 0,
      }}>
        <RoleIcon className="w-4 h-4" style={{ color: meta.color }} />
        <span className="font-display font-bold" style={{ color: meta.color, fontSize: '0.75rem', letterSpacing: '0.12em' }}>
          {meta.label} INTELLIGENCE FEED
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
  const sequenceSteps = [
    { step: 1, type: 'spiral' as const, name: 'SPIRAL RUNE', desc: '1st Conduit in Sequence' },
    { step: 2, type: 'sun' as const, name: 'SUN RUNE', desc: '2nd Conduit in Sequence' },
    { step: 3, type: 'wave' as const, name: 'WAVE RUNE', desc: '3rd Conduit in Sequence' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
        Your celestial route map charts the exact activation sequence required to stabilize the bridge:
      </p>

      {/* Route map container */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(0,245,255,0.08) 0%, rgba(0,0,0,0.4) 100%)',
        border: '1px solid rgba(0,245,255,0.25)',
        borderRadius: 10, padding: '1rem',
        boxShadow: 'inset 0 0 20px rgba(0,245,255,0.05)',
      }}>
        <div className="font-display flex items-center justify-between" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-cyan)', marginBottom: '0.85rem' }}>
          <span>CELESTIAL ROUTE MAP</span>
          <span className="text-[10px] text-white/50 font-mono">ORDER OF CONDUITS</span>
        </div>

        {sequenceSteps.map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.85rem',
              padding: '0.65rem 0.85rem', marginBottom: i < 2 ? '0.5rem' : 0,
              background: 'rgba(10,18,36,0.7)', borderRadius: 8,
              border: '1px solid rgba(0,245,255,0.18)',
            }}
          >
            {/* Step badge */}
            <div className="font-display font-bold" style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'rgba(0,245,255,0.15)',
              border: '1px solid rgba(0,245,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', color: 'var(--color-cyan)', flexShrink: 0
            }}>
              {item.step}
            </div>

            {/* Custom SVG Rune Art */}
            <RuneGlyph type={item.type} size={32} animate={true} />

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff', letterSpacing: '0.04em' }}>{item.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
            </div>

            {i < 2 && (
              <ArrowRight className="w-4 h-4 text-cyan/60 flex-shrink-0" />
            )}
          </motion.div>
        ))}

        <div style={{
          marginTop: '0.85rem', padding: '0.6rem 0.75rem',
          background: 'rgba(0,0,0,0.4)', borderRadius: 6,
          border: '1px solid rgba(0,245,255,0.2)',
          fontSize: '0.75rem', color: 'var(--color-cyan)',
          fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <Key className="w-3.5 h-3.5 text-cyan" />
          <span>RUNE ORDER: Spiral → Sun → Wave</span>
        </div>
      </div>

      <div style={{ padding: '0.7rem', background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.15)', borderRadius: 8, fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, display: 'flex', gap: '0.5rem' }}>
        <Sparkles className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
        <div>
          Broadcast this sequence to your team! The Decoder needs the order, and the Engineer needs both to activate the switches.
        </div>
      </div>

      <motion.button
        className={alreadyShared ? 'btn-ghost' : 'btn-cyan'}
        style={{
          width: '100%', fontSize: '0.78rem', padding: '0.7rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
        }}
        onClick={onShare}
        disabled={alreadyShared}
        whileHover={!alreadyShared ? { scale: 1.02 } : {}}
        whileTap={!alreadyShared ? { scale: 0.98 } : {}}
      >
        {alreadyShared ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Route Sequence Broadcasted</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            <span>Broadcast Route Map to Team</span>
          </>
        )}
      </motion.button>
    </div>
  );
}

function DecoderClue({ alreadyShared, onShare }: { alreadyShared: boolean; onShare: () => void }) {
  const mappings = [
    { rune: 'Spiral Rune', type: 'spiral' as const, color: 'CYAN', hex: '#00f5ff', badge: 'badge-cyan' },
    { rune: 'Sun Rune', type: 'sun' as const, color: 'AMBER', hex: '#f59e0b', badge: 'badge-amber' },
    { rune: 'Wave Rune', type: 'wave' as const, color: 'VIOLET', hex: '#8b5cf6', badge: 'badge-violet' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
        Your ancient cipher dictionary translates the sacred glyphs into modern energy switch frequencies:
      </p>

      <div style={{
        background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(0,0,0,0.4) 100%)',
        border: '1px solid rgba(139,92,246,0.25)',
        borderRadius: 10, padding: '1rem',
        boxShadow: 'inset 0 0 20px rgba(139,92,246,0.05)',
      }}>
        <div className="font-display flex items-center justify-between" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-violet)', marginBottom: '0.85rem' }}>
          <span>GLYPH TRANSLATION CIPHER</span>
          <span className="text-[10px] text-white/50 font-mono">ENERGY CONDUIT HARMONICS</span>
        </div>

        {mappings.map((m, i) => (
          <motion.div
            key={m.rune}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.85rem',
              padding: '0.65rem 0.85rem', marginBottom: i < 2 ? '0.5rem' : 0,
              background: 'rgba(15,10,32,0.7)', borderRadius: 8,
              border: '1px solid rgba(139,92,246,0.2)',
            }}
          >
            {/* Custom SVG Rune Art */}
            <RuneGlyph type={m.type} size={30} animate={true} />

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>{m.rune}</div>
            </div>

            <ArrowRight className="w-3.5 h-3.5 text-violet/60" />

            <div className={`badge ${m.badge}`} style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.hex, boxShadow: `0 0 6px ${m.hex}` }} />
              <span className="font-mono font-bold tracking-wider">{m.color}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ padding: '0.7rem', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 8, fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, display: 'flex', gap: '0.5rem' }}>
        <Sparkles className="w-4 h-4 text-violet flex-shrink-0 mt-0.5" />
        <div>
          The Navigator knows the ORDER. You hold the COLOR MAPPINGS. Share this intel so the Engineer can execute the right sequence!
        </div>
      </div>

      <motion.button
        className={alreadyShared ? 'btn-ghost' : ''}
        style={{
          width: '100%', fontSize: '0.78rem', padding: '0.7rem',
          background: alreadyShared ? undefined : 'var(--color-violet)',
          color: alreadyShared ? undefined : '#fff',
          border: alreadyShared ? '1px solid rgba(255,255,255,0.1)' : 'none',
          borderRadius: 6, cursor: alreadyShared ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-orbitron)', fontWeight: 700, letterSpacing: '0.08em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          boxShadow: alreadyShared ? undefined : '0 0 15px rgba(139,92,246,0.4)',
        }}
        onClick={onShare}
        disabled={alreadyShared}
        whileHover={!alreadyShared ? { scale: 1.02 } : {}}
        whileTap={!alreadyShared ? { scale: 0.98 } : {}}
      >
        {alreadyShared ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Cipher Translation Broadcasted</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            <span>Broadcast Cipher Translation to Team</span>
          </>
        )}
      </motion.button>
    </div>
  );
}

function EngineerClue() {
  const { activatedSwitches, phase } = useGameStore();

  const switchData = [
    { color: 'cyan' as const, type: 'spiral' as const, label: 'CYAN SWITCH', hex: '#00f5ff' },
    { color: 'amber' as const, type: 'sun' as const, label: 'AMBER SWITCH', hex: '#f59e0b' },
    { color: 'violet' as const, type: 'wave' as const, label: 'VIOLET SWITCH', hex: '#8b5cf6' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
        You control the 3 bridge stabilization switches. Ask your Navigator for order and Decoder for color codes.
      </p>

      <div style={{
        background: 'linear-gradient(180deg, rgba(245,158,11,0.08) 0%, rgba(0,0,0,0.4) 100%)',
        border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: 10, padding: '1rem',
        boxShadow: 'inset 0 0 20px rgba(245,158,11,0.05)',
      }}>
        <div className="font-display flex items-center justify-between" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-amber)', marginBottom: '0.85rem' }}>
          <span>SWITCH CONDUIT STATUS</span>
          <span className="text-[10px] text-white/50 font-mono">POWER RELAYS</span>
        </div>

        {switchData.map((sw) => {
          const activated = activatedSwitches.includes(sw.color);
          const activatedAt = activatedSwitches.indexOf(sw.color);
          return (
            <div
              key={sw.color}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.85rem',
                padding: '0.65rem 0.85rem', marginBottom: '0.45rem',
                background: activated ? `rgba(${sw.color === 'cyan' ? '0,245,255' : sw.color === 'amber' ? '245,158,11' : '139,92,246'},0.12)` : 'rgba(0,0,0,0.4)',
                borderRadius: 8,
                border: `1px solid ${activated ? sw.hex + '60' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <RuneGlyph type={sw.type} size={28} />

              <span className="font-mono font-bold text-xs" style={{ color: activated ? sw.hex : 'var(--color-text-muted)', flex: 1 }}>
                {sw.label}
              </span>

              {activated ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-success)', fontSize: '0.72rem', fontWeight: 600 }}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ACTIVATED #{activatedAt + 1}</span>
                </div>
              ) : (
                <span className="font-mono text-[11px] text-white/40">STANDBY</span>
              )}
            </div>
          );
        })}
      </div>

      {phase === 'solving' || phase === 'understanding' ? (
        <div style={{ padding: '0.7rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8, fontSize: '0.78rem', color: 'var(--color-amber)', lineHeight: 1.5, display: 'flex', gap: '0.5rem' }}>
          <CheckCircle2 className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
          <div>
            Sequence synthesized! Use the Engineer Control Panel below to activate conduits in order.
          </div>
        </div>
      ) : (
        <div style={{ padding: '0.7rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
          Awaiting clue synthesis from Navigator and Decoder...
        </div>
      )}
    </div>
  );
}
