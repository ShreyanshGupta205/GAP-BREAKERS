'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/stores/gameStore';
import { calculateBridgeScore } from '@/lib/game/state-machine';
import { RotateCcw, Home, Zap, CheckCircle, XCircle } from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const { phase, stats, bridge, resetMission, startMission, setTeamPlayers, teamPlayers } = useGameStore();

  const timeTaken = stats.endTime ? Math.floor((stats.endTime - stats.startTime) / 1000) : 180;
  const bridgeSections = [bridge.section1, bridge.section2, bridge.section3].filter((s) => s === 'repaired').length;

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

  // Redirect if no mission data
  useEffect(() => {
    if (phase === 'idle' && stats.startTime === 0) {
      router.replace('/');
    }
  }, []);

  const mins = Math.floor(timeTaken / 60);
  const secs = timeTaken % 60;

  return (
    <main style={{ minHeight: '100dvh', background: 'var(--color-void)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      {/* Ambient */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${isVictory ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)'} 0%, transparent 70%)`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: 680, position: 'relative', zIndex: 1 }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{ fontSize: '4rem', marginBottom: '1rem' }}
          >
            {isVictory ? '🏆' : '💔'}
          </motion.div>
          <h1 className="font-display" style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            letterSpacing: '0.08em',
            color: isVictory ? 'var(--color-success)' : 'var(--color-danger)',
            marginBottom: '0.5rem',
            textShadow: `0 0 30px ${isVictory ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
          }}>
            {isVictory ? 'CITY SAVED' : 'MISSION FAILED'}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
            {isVictory
              ? 'The energy core is restored. The bridge stands. The city lives.'
              : 'Time ran out before the sequence was activated. The city falls.'}
          </p>
        </div>

        {/* Score card */}
        <motion.div
          className="card-glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            marginBottom: '1rem',
            border: `1px solid ${isVictory ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.2)'}`,
            background: `rgba(${isVictory ? '16,185,129' : '239,68,68'},0.05)`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="font-display" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                BRIDGE SCORE
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span className="font-display" style={{ fontSize: '3rem', color: isVictory ? 'var(--color-success)' : 'var(--color-danger)', lineHeight: 1 }}>
                  {score.raw}
                </span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>/100</span>
              </div>
              <div className="font-display" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: isVictory ? 'var(--color-success)' : 'var(--color-amber)', marginTop: '0.25rem' }}>
                {score.label}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'TIME', value: `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}` },
                { label: 'BRIDGE', value: `${bridgeSections}/3` },
                { label: 'CLUES', value: String(stats.cluesShared) },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div className="font-display" style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Score breakdown */}
          <div>
            <div className="font-display" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              SCORE BREAKDOWN · {score.formula}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {score.breakdown.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 140, fontSize: '0.8rem', color: 'var(--color-text-secondary)', flexShrink: 0 }}>{item.label}</div>
                  <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.points / item.max) * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.8, ease: [0.16,1,0.3,1] }}
                      style={{ height: '100%', background: item.points > 0 ? 'var(--color-cyan)' : 'rgba(255,255,255,0.1)', borderRadius: 3 }}
                    />
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-primary)', width: 40, textAlign: 'right' }}>
                    {item.points}/{item.max}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Event log */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '1rem' }}
        >
          <div className="font-display" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            MISSION REPORT — ACTUAL GAME EVENTS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { icon: CheckCircle, label: 'Correct Actions', value: stats.correctActions, color: 'var(--color-success)' },
              { icon: XCircle, label: 'Incorrect Actions', value: stats.incorrectActions, color: 'var(--color-danger)' },
              { icon: Zap, label: 'AI Transformations', value: stats.aiTransformationsUsed, color: 'var(--color-cyan)' },
              { icon: Zap, label: 'Clarifications', value: stats.clarificationsRequested, color: 'var(--color-violet)' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8,
                }}
              >
                <item.icon size={16} color={item.color} />
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Collaboration analysis */}
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.12)', borderRadius: 8 }}>
            <div className="font-display" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--color-cyan)', marginBottom: '0.5rem' }}>
              COLLABORATION ANALYSIS
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
              {isVictory
                ? `Great teamwork! ${stats.cluesShared} clue${stats.cluesShared !== 1 ? 's' : ''} shared successfully. ${stats.aiTransformationsUsed > 0 ? `AI transformations were used ${stats.aiTransformationsUsed} time${stats.aiTransformationsUsed !== 1 ? 's' : ''} to bridge communication gaps.` : 'No AI transforms were needed.'} The energy sequence was completed with ${stats.correctActions} correct action${stats.correctActions !== 1 ? 's' : ''}${stats.incorrectActions > 0 ? ` and ${stats.incorrectActions} incorrect attempt${stats.incorrectActions !== 1 ? 's' : ''}` : ''}.`
                : `The mission ran out of time. ${stats.cluesShared} clue${stats.cluesShared !== 1 ? 's' : ''} were shared, and ${bridgeSections}/3 bridge sections were restored. ${stats.incorrectActions > 0 ? `${stats.incorrectActions} incorrect switch activation${stats.incorrectActions !== 1 ? 's' : ''} cost valuable time.` : 'Consider sharing clues earlier.'}`
              }
            </p>
          </div>

          {/* Disclaimer */}
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.75rem', fontStyle: 'italic' }}>
            ⓘ Bridge Score is a game-derived collaboration indicator based on observable mission events. It is not a scientifically validated measurement.
          </p>
        </motion.div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            className="btn-primary"
            style={{ fontSize: '0.85rem', padding: '0.8rem 2rem' }}
            onClick={handlePlayAgain}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw size={14} /> PLAY AGAIN
          </motion.button>
          <motion.button
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.8rem 2rem' }}
            onClick={handleHome}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Home size={14} /> RETURN HOME
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
