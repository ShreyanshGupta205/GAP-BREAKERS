'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/stores/gameStore';
import { PlayerRole } from '@/types/game';
import WorldScene from '@/components/game/WorldScene';
import CluePanel from '@/components/game/CluePanel';
import ControlPanel from '@/components/game/ControlPanel';
import MessageFeed from '@/components/game/MessageFeed';
import TeamPanel from '@/components/game/TeamPanel';
import MissionTimer from '@/components/game/MissionTimer';
import Bloop from '@/components/game/Bloop';
import {
  Pause,
  RotateCcw,
  Eye,
  Zap,
  ArrowRight,
  Compass,
  FileCode,
  Wrench,
  Home,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const ROLE_TABS: { role: PlayerRole; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { role: 'navigator', label: 'Navigator', icon: Compass },
  { role: 'decoder', label: 'Decoder', icon: FileCode },
  { role: 'engineer', label: 'Engineer', icon: Wrench },
];

export default function GamePage() {
  const router = useRouter();
  const {
    phase,
    soloViewRole,
    setSoloViewRole,
    soloMode,
    bridge,
    pauseTimer,
    resumeTimer,
    resetMission,
    startMission,
    missionId,
    stats,
  } = useGameStore();

  const [paused, setPaused] = useState(false);

  useEffect(() => {
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
  const bridgeProgressCount = [bridge.section1, bridge.section2, bridge.section3].filter(
    (s) => s === 'repaired'
  ).length;

  return (
    <div
      className="gb-game-layout"
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: '#FAF9F6',
        color: '#252541',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* ── TOP NAVIGATION BAR ── */}
      <header
        className="gb-game-header"
        style={{
          height: 56,
          minHeight: 56,
          background: '#FFFFFF',
          borderBottom: '1.5px solid #E8E5DC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem',
          zIndex: 30,
          flexShrink: 0,
        }}
      >
        {/* Left: Mission branding & Bridge Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: '#7866E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 2px 6px rgba(120, 102, 232, 0.3)',
            }}
          >
            <Zap size={16} />
          </div>
          <div>
            <span
              className="font-display"
              style={{
                fontWeight: 800,
                fontSize: '0.85rem',
                letterSpacing: '-0.01em',
                color: '#252541',
                display: 'block',
              }}
            >
              MISSION 01: SAVE THE FLOATING CITY
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: 2 }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#8E8EA8' }}>BRIDGE:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: bridge.section1 !== 'broken' ? '#0FB5C4' : '#D5D1C8',
                  }}
                  title="Section 1: Discovery"
                />
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: bridge.section2 === 'repaired' ? '#7866E8' : '#D5D1C8',
                  }}
                  title="Section 2: Understanding"
                />
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: bridge.section3 === 'repaired' ? '#E58A00' : '#D5D1C8',
                  }}
                  title="Section 3: Connection"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center: Mission Countdown Timer */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MissionTimer />
        </div>

        {/* Right: Controls & View Report */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handlePause}
            className="btn-ghost"
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.35rem 0.65rem',
              borderRadius: 12,
              border: '1.5px solid #E8E5DC',
              background: '#FAF9F6',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Pause size={13} /> {paused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={handleRestart}
            className="btn-ghost"
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.35rem 0.65rem',
              borderRadius: 12,
              border: '1.5px solid #E8E5DC',
              background: '#FAF9F6',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <RotateCcw size={13} /> Restart
          </button>
          {isTerminal && (
            <button
              onClick={handleResults}
              className="btn-primary"
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
            >
              View Report →
            </button>
          )}
        </div>
      </header>

      {/* ── SOLO PERSPECTIVE SWITCHER BAR ── */}
      {soloMode && (
        <div
          className="gb-game-subnav"
          style={{
            background: '#FFFBF0',
            borderBottom: '1.5px solid #FFE28A',
            padding: '0.4rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            zIndex: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bloop mood="thinking" size={24} animate={false} />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#995C00' }}>
              SOLO DEMO MODE: Switch perspectives to test each role's view
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {ROLE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = soloViewRole === tab.role;
              return (
                <button
                  key={tab.role}
                  onClick={() => setSoloViewRole(tab.role)}
                  className={`perspective-tab ${isActive ? `active-${tab.role.slice(0, 3)}` : ''}`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── MAIN GAMEPLAY AREA ── */}
      <div
        className="gb-game-main"
        style={{
          flex: '1 1 0%',
          display: 'flex',
          gap: '0.75rem',
          padding: '0.75rem',
          minHeight: 0,
          overflow: 'hidden',
          background: '#FAF9F6',
        }}
      >
        {/* Left: Team Panel Card */}
        <div
          className="gb-game-col-team card-clean"
          style={{
            width: 220,
            minWidth: 220,
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            padding: '0.75rem',
            background: '#FFFFFF',
          }}
        >
          <TeamPanel />
        </div>

        {/* Center: World Scene + Lower Split (Clue + Controls) */}
        <div
          className="gb-game-col-center"
          style={{
            flex: '1 1 0%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Top Half: WorldScene (Floating Island & Bridge) */}
          <div
            className="gb-game-world-panel card-clean"
            style={{
              flex: '1 1 55%',
              minHeight: 0,
              position: 'relative',
              overflow: 'hidden',
              padding: 4,
              background: '#FFFFFF',
            }}
          >
            <WorldScene />

            {/* ── VICTORY CELEBRATION OVERLAY ── */}
            <AnimatePresence>
              {phase === 'victory' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center"
                  style={{ background: 'rgba(255, 255, 255, 0.94)', backdropFilter: 'blur(8px)' }}
                >
                  <Bloop mood="dancing" size={100} className="mb-2" />
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 999,
                      background: '#F0FAF5',
                      border: '1.5px solid #9BE7C4',
                      color: '#1A7A4E',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Sparkles size={13} /> CELESTIAL CITY SAVED!
                  </div>
                  <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 900, color: '#252541', marginBottom: '0.5rem' }}>
                    BRIDGE BUILT. FRIENDSHIP +100.
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: '#5C5C77', maxWidth: 420, margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                    You brought different clues together and saved the city. Nicely done, team!
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      onClick={handleResults}
                      className="btn-primary"
                      style={{ fontSize: '0.88rem', padding: '0.75rem 1.5rem' }}
                    >
                      View Team Report →
                    </button>
                    <button
                      onClick={handleRestart}
                      className="btn-secondary"
                      style={{ fontSize: '0.88rem', padding: '0.75rem 1.25rem' }}
                    >
                      <RotateCcw size={15} /> Play Again
                    </button>
                    <button
                      onClick={() => router.push('/')}
                      className="btn-ghost"
                      style={{ fontSize: '0.88rem', padding: '0.75rem 1rem' }}
                    >
                      <Home size={15} /> Home
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── FAILURE ENCOURAGEMENT OVERLAY ── */}
            <AnimatePresence>
              {phase === 'failure' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center"
                  style={{ background: 'rgba(255, 255, 255, 0.94)', backdropFilter: 'blur(8px)' }}
                >
                  <Bloop mood="concerned" size={90} className="mb-2" />
                  <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#252541', marginBottom: '0.5rem' }}>
                    The bridge needs another try.
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: '#5C5C77', maxWidth: 420, margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                    Time ran out, but now you know where the gaps are. Teamwork is an iterative adventure!
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      onClick={handleRestart}
                      className="btn-primary"
                      style={{ fontSize: '0.88rem', padding: '0.75rem 1.5rem' }}
                    >
                      <RotateCcw size={15} /> Try Again
                    </button>
                    <button
                      onClick={handleResults}
                      className="btn-secondary"
                      style={{ fontSize: '0.88rem', padding: '0.75rem 1.25rem' }}
                    >
                      Review What Happened
                    </button>
                    <button
                      onClick={() => router.push('/lobby')}
                      className="btn-ghost"
                      style={{ fontSize: '0.88rem', padding: '0.75rem 1rem' }}
                    >
                      Return to Lobby
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Half: Clue Panel + Engineer Control Panel */}
          <div
            className="gb-game-bottom-split"
            style={{
              flex: '1 1 45%',
              display: 'flex',
              gap: '0.75rem',
              minHeight: 0,
            }}
          >
            {/* Clue Panel (Collectible Card) */}
            <div
              className="gb-game-clue-panel card-clean"
              style={{
                flex: '1 1 0%',
                padding: '0.85rem',
                background: '#FFFFFF',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CluePanel viewingRole={soloViewRole} />
            </div>

            {/* Engineer Power Panel */}
            <div
              className="gb-game-engineer-panel card-clean"
              style={{
                width: 290,
                minWidth: 290,
                flexShrink: 0,
                padding: '0.85rem',
                background: '#FFFFFF',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ControlPanel />
            </div>
          </div>
        </div>

        {/* Right: Friendly Comm Channel */}
        <div
          className="gb-game-col-comm card-clean"
          style={{
            width: 300,
            minWidth: 300,
            overflow: 'hidden',
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: '0.75rem 1rem',
              borderBottom: '1.5px solid #E8E5DC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FAF9F6',
              flexShrink: 0,
            }}
          >
            <span className="font-display" style={{ fontWeight: 900, fontSize: '0.78rem', color: '#252541' }}>
              TEAM COMM CHANNEL
            </span>
            <span className="badge-pill badge-blue" style={{ fontSize: '0.62rem', padding: '0.15rem 0.5rem' }}>
              GEMINI AI READY
            </span>
          </div>
          <div style={{ flex: '1 1 0%', minHeight: 0, overflow: 'hidden' }}>
            <MessageFeed />
          </div>
        </div>
      </div>

      {/* ── PAUSE OVERLAY ── */}
      <AnimatePresence>
        {paused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#252541]/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl border-2 border-[#E8E5DC] p-8 text-center max-w-sm w-full shadow-2xl">
              <Bloop mood="thinking" size={72} className="mx-auto mb-3" />
              <h3 className="font-display font-extrabold text-2xl text-[#252541] mb-1">
                GAME PAUSED
              </h3>
              <p className="text-xs text-[#8E8EA8] mb-6">Mission timer is currently holding.</p>
              <button
                onClick={handlePause}
                className="btn-primary w-full py-3 text-sm"
              >
                Resume Mission →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
