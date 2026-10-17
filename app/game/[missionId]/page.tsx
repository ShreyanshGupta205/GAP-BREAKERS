'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/stores/gameStore';
import { PlayerRole } from '@/types/game';
import WorldScene from '@/components/game/WorldScene';
import BridgeSection from '@/components/game/BridgeSection';
import CluePanel from '@/components/game/CluePanel';
import ControlPanel from '@/components/game/ControlPanel';
import MessageFeed from '@/components/game/MessageFeed';
import TeamPanel from '@/components/game/TeamPanel';
import MissionTimer from '@/components/game/MissionTimer';
import { Pause, RotateCcw, Eye, Zap, ChevronLeft } from 'lucide-react';

const ROLE_LABELS: Record<PlayerRole, string> = {
  navigator: 'NAVIGATOR',
  decoder: 'DECODER',
  engineer: 'ENGINEER',
};

const PHASE_LABELS: Record<string, string> = {
  idle: 'STANDBY',
  setup: 'BRIEFING',
  discovery: 'PHASE 1 — DISCOVERY',
  understanding: 'PHASE 2 — UNDERSTANDING',
  solving: 'PHASE 3 — SOLVING',
  victory: '✓ MISSION COMPLETE',
  failure: '✗ MISSION FAILED',
};

const PHASE_COLORS: Record<string, string> = {
  idle: 'var(--color-text-muted)',
  setup: 'var(--color-text-secondary)',
  discovery: 'var(--color-cyan)',
  understanding: 'var(--color-violet)',
  solving: 'var(--color-amber)',
  victory: 'var(--color-success)',
  failure: 'var(--color-danger)',
};

export default function GamePage() {
  const router = useRouter();
  const {
    phase, soloViewRole, setSoloViewRole, soloMode, currentPlayer,
    bridge, timerSeconds, pauseTimer, resumeTimer, timerActive, resetMission, startMission,
    stats, missionId,
  } = useGameStore();

  const [paused, setPaused] = useState(false);
  const [activeTab, setActiveTab] = useState<'intel' | 'chat' | 'team'>('intel');
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    // If no mission running, redirect to lobby
    if (phase === 'idle' && !missionId) {
      router.replace('/lobby');
    }
  }, [phase, missionId]);

  const handlePause = () => {
    if (paused) {
      resumeTimer();
      setPaused(false);
    } else {
      pauseTimer();
      setPaused(true);
    }
  };

  const handleRestart = () => {
    resetMission();
    startMission('mission-01');
    setPaused(false);
  };

  const handleResults = () => {
    router.push('/results');
  };

  const isTerminal = phase === 'victory' || phase === 'failure';

  return (
    <div style={{ height: '100dvh', background: 'var(--color-void)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── TOP BAR ── */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0 0.75rem', height: 52, flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(5,8,22,0.9)', backdropFilter: 'blur(10px)',
      }}>
        {/* Mission name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
          <Zap size={14} color="var(--color-cyan)" />
          <span className="font-display" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--color-cyan)', whiteSpace: 'nowrap' }}>
            M01 — SAVE THE FLOATING CITY
          </span>
        </div>

        {/* Phase */}
        <div style={{ marginLeft: '0.5rem' }}>
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display"
            style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: PHASE_COLORS[phase] ?? 'var(--color-text-secondary)' }}
          >
            {PHASE_LABELS[phase] ?? phase.toUpperCase()}
          </motion.span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Timer */}
        <MissionTimer />

        {/* Controls */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button className="btn-ghost" onClick={handlePause} style={{ padding: '0.35rem 0.6rem', fontSize: '0.7rem' }}>
            <Pause size={12} />
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button className="btn-ghost" onClick={handleRestart} style={{ padding: '0.35rem 0.6rem', fontSize: '0.7rem' }}>
            <RotateCcw size={12} /> Restart
          </button>
          {isTerminal && (
            <button
              style={{ padding: '0.35rem 0.75rem', borderRadius: 6, background: 'var(--color-cyan)', color: '#050816', fontSize: '0.7rem', fontFamily: 'var(--font-orbitron)', fontWeight: 700, border: 'none', cursor: 'pointer' }}
              onClick={handleResults}
            >
              VIEW RESULTS
            </button>
          )}
        </div>
      </header>

      {/* ── PERSPECTIVE SWITCHER (Solo Mode) ── */}
      {soloMode && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.75rem',
          background: 'rgba(245,158,11,0.06)', borderBottom: '1px solid rgba(245,158,11,0.15)',
          flexShrink: 0,
        }}>
          <Eye size={12} color="var(--color-amber)" />
          <span style={{ fontSize: '0.65rem', color: 'var(--color-amber)', fontFamily: 'var(--font-mono)', marginRight: '0.5rem' }}>
            DEMO: Switch perspective
          </span>
          {(['navigator', 'decoder', 'engineer'] as PlayerRole[]).map((role) => (
            <button
              key={role}
              onClick={() => setSoloViewRole(role)}
              className={`perspective-tab ${soloViewRole === role ? `active-${role.slice(0, 3)}` : ''}`}
            >
              {ROLE_LABELS[role]}
            </button>
          ))}
        </div>
      )}

      {/* ── MAIN GAME AREA ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', gap: '6px', padding: '6px', minHeight: 0 }}>

        {/* LEFT — Team Panel (desktop) */}
        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="glass" style={{ flex: 1, borderRadius: 10, padding: '0.75rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <TeamPanel />
          </div>
        </div>

        {/* CENTER — World + Intel/Controls */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0, overflow: 'hidden' }}>
          {/* World scene */}
          <div className="glass" style={{ flex: '0 0 52%', borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
            <WorldScene />

            {/* Victory/Failure overlay */}
            <AnimatePresence>
              {isTerminal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: `rgba(5,8,22,${phase === 'failure' ? '0.85' : '0.7'})`,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <div className="font-display" style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    color: phase === 'victory' ? 'var(--color-success)' : 'var(--color-danger)',
                    letterSpacing: '0.1em', textAlign: 'center', marginBottom: '0.5rem',
                    textShadow: `0 0 30px ${phase === 'victory' ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)'}`,
                  }}>
                    {phase === 'victory' ? '✓ CITY SAVED!' : '✗ MISSION FAILED'}
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center', padding: '0 1rem' }}>
                    {phase === 'victory'
                      ? 'The energy core is restored. The floating city lives on.'
                      : 'Time ran out. The city falls into the void.'}
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.7rem 1.5rem' }} onClick={handleResults}>
                      View Report
                    </button>
                    <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.7rem 1.5rem' }} onClick={handleRestart}>
                      <RotateCcw size={14} /> Replay
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom: Intel (clues) + Control panel */}
          <div style={{ flex: 1, display: 'flex', gap: '6px', overflow: 'hidden', minHeight: 0 }}>
            {/* Clue panel */}
            <div className="glass" style={{ flex: 1, borderRadius: 10, padding: '0.75rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div className="font-display" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--color-text-muted)', marginBottom: '0.5rem', flexShrink: 0 }}>
                MISSION INTELLIGENCE
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <CluePanel viewingRole={soloViewRole} />
              </div>
            </div>

            {/* Engineer control panel — always visible in solo mode */}
            <div className="glass" style={{ width: 240, borderRadius: 10, padding: '0.75rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
              <div className="font-display" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--color-text-muted)', marginBottom: '0.5rem', flexShrink: 0 }}>
                ENGINEER CONTROLS
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <ControlPanel />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Message Feed */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="glass" style={{ flex: 1, borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
              <span className="font-display" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--color-text-muted)' }}>
                COMM CHANNEL
              </span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <MessageFeed />
            </div>
          </div>
        </div>
      </div>

      {/* Pause overlay */}
      <AnimatePresence>
        {paused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div className="font-display" style={{ fontSize: '2rem', letterSpacing: '0.2em', color: 'var(--color-cyan)', marginBottom: '0.5rem' }}>
                PAUSED
              </div>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Mission timer is paused</p>
              <button className="btn-primary" onClick={handlePause}>Resume Mission</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
