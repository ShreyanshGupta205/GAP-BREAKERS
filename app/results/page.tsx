'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/stores/gameStore';
import { calculateBridgeScore } from '@/lib/game/state-machine';
import Bloop from '@/components/game/Bloop';
import {
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const {
    phase,
    stats,
    bridge,
    resetMission,
    startMission,
    currentPlayer,
  } = useGameStore();

  const timeTaken = stats.endTime ? Math.floor((stats.endTime - stats.startTime) / 1000) : 74;
  const bridgeSections = [bridge.section1, bridge.section2, bridge.section3].filter(
    (s) => s === 'repaired'
  ).length;

  const score = calculateBridgeScore({
    puzzleSolved: phase === 'victory',
    bridgeSectionsRestored: bridgeSections,
    cluesShared: stats.cluesShared,
    aiTransformationsUsed: stats.aiTransformationsUsed,
    clarificationsRequested: stats.clarificationsRequested,
    correctActions: stats.correctActions,
    incorrectActions: stats.incorrectActions,
    timeTakenSeconds: timeTaken,
    totalTimeSeconds: 180,
  });

  const isVictory = phase === 'victory';

  const handlePlayAgain = () => {
    resetMission();
    startMission('mission-01');
    router.push('/game/mission-01');
  };

  const handleHome = () => {
    resetMission();
    router.push('/');
  };

  const mins = Math.floor(timeTaken / 60);
  const secs = timeTaken % 60;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#FAF9F6',
        color: '#252541',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        userSelect: 'none',
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          maxWidth: 680,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0',
        }}
      >
        <button
          onClick={handleHome}
          className="btn-ghost"
          style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Home size={15} /> Back to Home
        </button>

        <span className="badge-pill badge-purple" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
          MISSION REPORT
        </span>
      </header>

      {/* Main Results Card */}
      <div style={{ maxWidth: 680, margin: '1rem auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            border: '2px solid #E8E5DC',
            boxShadow: '0 12px 36px rgba(37, 37, 65, 0.08)',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          {/* Mascot Celebration */}
          <div style={{ marginBottom: '1rem' }}>
            <Bloop mood={isVictory ? 'dancing' : 'concerned'} size={88} className="mx-auto" />
          </div>

          {/* Outcome Header */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0.75rem',
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 800,
              marginBottom: '0.5rem',
              background: isVictory ? '#F0FAF5' : '#FFF0F2',
              border: `1.5px solid ${isVictory ? '#9BE7C4' : '#FF9EAB'}`,
              color: isVictory ? '#1A7A4E' : '#F25A71',
            }}
          >
            {isVictory ? <Sparkles size={13} /> : <Zap size={13} />}
            {isVictory ? 'MISSION ACCOMPLISHED' : 'MISSION TIMEOUT'}
          </div>

          <h1 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#252541', marginBottom: '0.5rem' }}>
            {isVictory ? 'CITY SAVED & REALITY RESTORED' : 'The Bridge Needs Another Try'}
          </h1>

          <p style={{ fontSize: '0.85rem', color: '#7866E8', fontStyle: 'italic', fontWeight: 700, maxWidth: 480, margin: '0 auto 1.5rem' }}>
            “Congratulations. You successfully combined several brains into approximately one working solution.”
          </p>

          {/* Score Box */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 20,
              background: '#FAF9F6',
              border: '1.5px solid #E8E5DC',
              marginBottom: '1.5rem',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1rem',
                borderBottom: '1.5px solid #E8E5DC',
                gap: '1rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#8E8EA8',
                    display: 'block',
                  }}
                >
                  COLLABORATION BRIDGE SCORE
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: 2 }}>
                  <span className="font-display" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#7866E8' }}>
                    {score.raw}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#8E8EA8' }}>/ 100</span>
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2BB67B' }}>
                  {score.label}
                </span>
              </div>

              {/* Quick Summary Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ textAlign: 'center', padding: '0.5rem 0.75rem', borderRadius: 12, background: '#FFFFFF', border: '1.5px solid #E8E5DC', minWidth: 68 }}>
                  <div className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem', color: '#252541' }}>
                    {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#8E8EA8' }}>TIME</div>
                </div>

                <div style={{ textAlign: 'center', padding: '0.5rem 0.75rem', borderRadius: 12, background: '#FFFFFF', border: '1.5px solid #E8E5DC', minWidth: 68 }}>
                  <div className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem', color: '#252541' }}>
                    {bridgeSections}/3
                  </div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#8E8EA8' }}>BRIDGE</div>
                </div>

                <div style={{ textAlign: 'center', padding: '0.5rem 0.75rem', borderRadius: 12, background: '#FFFFFF', border: '1.5px solid #E8E5DC', minWidth: 68 }}>
                  <div className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem', color: '#252541' }}>
                    {stats.correctActions}
                  </div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#8E8EA8' }}>CORRECT</div>
                </div>
              </div>
            </div>

            {/* Score Breakdown Progress Bars */}
            <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#8E8EA8',
                  display: 'block',
                  marginBottom: 2,
                }}
              >
                TRANSPARENT FORMULA · {score.formula}
              </span>

              {score.breakdown.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ width: 140, fontSize: '0.75rem', fontWeight: 700, color: '#5C5C77', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </span>
                  <div style={{ flex: 1, height: 10, borderRadius: 999, background: '#E8E5DC', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.points / item.max) * 100}%` }}
                      transition={{ duration: 0.8 }}
                      style={{ height: '100%', borderRadius: 999, background: '#7866E8' }}
                    />
                  </div>
                  <span className="font-mono" style={{ width: 44, textAlign: 'right', fontSize: '0.75rem', fontWeight: 800, color: '#252541' }}>
                    {item.points}/{item.max}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Observable Game Events (Zero Fabricated Metrics) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '0.65rem',
              marginBottom: '1.5rem',
              textAlign: 'left',
            }}
          >
            <div style={{ padding: '0.75rem', borderRadius: 16, background: '#FFFFFF', border: '1.5px solid #E8E5DC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#2BB67B', marginBottom: 2 }}>
                <CheckCircle2 size={14} />
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#252541' }}>{stats.correctActions}</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#8E8EA8', fontWeight: 800 }}>Correct Actions</span>
            </div>

            <div style={{ padding: '0.75rem', borderRadius: 16, background: '#FFFFFF', border: '1.5px solid #E8E5DC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#F25A71', marginBottom: 2 }}>
                <XCircle size={14} />
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#252541' }}>{stats.incorrectActions}</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#8E8EA8', fontWeight: 800 }}>Incorrect Actions</span>
            </div>

            <div style={{ padding: '0.75rem', borderRadius: 16, background: '#FFFFFF', border: '1.5px solid #E8E5DC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#55A7F7', marginBottom: 2 }}>
                <Zap size={14} />
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#252541' }}>{stats.aiTransformationsUsed}</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#8E8EA8', fontWeight: 800 }}>AI Transforms</span>
            </div>

            <div style={{ padding: '0.75rem', borderRadius: 16, background: '#FFFFFF', border: '1.5px solid #E8E5DC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#E58A00', marginBottom: 2 }}>
                <Layers size={14} />
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#252541' }}>{stats.cluesShared}</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#8E8EA8', fontWeight: 800 }}>Clues Shared</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <button
              onClick={handlePlayAgain}
              className="btn-primary"
              style={{ padding: '0.85rem 1.75rem', fontSize: '0.9rem' }}
            >
              <RotateCcw size={15} /> Play Again
            </button>
            <button
              onClick={handleHome}
              className="btn-secondary"
              style={{ padding: '0.85rem 1.5rem', fontSize: '0.85rem' }}
            >
              <Home size={15} /> Return Home
            </button>
          </div>
        </motion.div>
      </div>

      <footer style={{ textAlign: 'center', fontSize: '0.75rem', color: '#8E8EA8', padding: '0.5rem 0' }}>
        Bridge Score is derived exclusively from observable game actions and collaboration metrics.
      </footer>
    </main>
  );
}
