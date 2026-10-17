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
  Volume2,
  VolumeX,
  HelpCircle,
  Play,
  X,
} from 'lucide-react';
import { sounds } from '@/lib/audio/soundEffects';

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
    shareClue,
    acknowledgeSequence,
    activateSwitch,
    missionId,
    stats,
    currentPlayer,
    teamPlayers,
    setPlayer,
    setTeamPlayers,
  } = useGameStore();

  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [showJudgeGuide, setShowJudgeGuide] = useState(false);

  useEffect(() => {
    setSoundOn(sounds.isEnabled());
  }, []);

  useEffect(() => {
    if (phase === 'victory') {
      sounds.playVictory();
    }
  }, [phase]);

  // Gracefully initialize session for direct visitors or page refreshes
  useEffect(() => {
    if (!currentPlayer) {
      setPlayer({
        id: 'player-phoenix',
        displayName: 'Phoenix',
        avatarId: 'avatar-1',
        language: 'en',
        commFormat: 'text',
        highContrast: false,
        reducedMotion: false,
      });
    }
    if (!teamPlayers || teamPlayers.length === 0) {
      setTeamPlayers([
        {
          id: 'player-phoenix',
          displayName: 'Phoenix',
          role: 'navigator',
          language: 'en',
          commFormat: 'text',
          isOnline: true,
          isSimulated: false,
          isCurrentPlayer: true,
        },
        {
          id: 'bot-zeno-3',
          displayName: 'ZENO-3',
          role: 'decoder',
          language: 'en',
          commFormat: 'text',
          isOnline: true,
          isSimulated: true,
          isCurrentPlayer: false,
        },
        {
          id: 'bot-bolt-9',
          displayName: 'BOLT-9',
          role: 'engineer',
          language: 'en',
          commFormat: 'text',
          isOnline: true,
          isSimulated: true,
          isCurrentPlayer: false,
        },
      ]);
    }
    if (phase === 'idle' || !missionId) {
      startMission('mission-01');
    }
  }, [phase, missionId, currentPlayer, teamPlayers, setPlayer, setTeamPlayers, startMission]);

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

  const handleQuickSolveDemo = () => {
    sounds.playClueShare();
    shareClue('navigator');
    shareClue('decoder');
    acknowledgeSequence();
    activateSwitch('cyan');
    activateSwitch('amber');
    activateSwitch('violet');
    sounds.playVictory();
    setShowJudgeGuide(false);
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
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundOn(sounds.toggle())}
            className="btn-ghost"
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.35rem 0.55rem',
              borderRadius: 12,
              border: '1.5px solid #E8E5DC',
              background: '#FAF9F6',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            title={soundOn ? 'Sound Effects Enabled (Click to Mute)' : 'Sound Effects Muted (Click to Enable)'}
          >
            {soundOn ? (
              <Volume2 size={14} style={{ color: '#7866E8' }} />
            ) : (
              <VolumeX size={14} style={{ color: '#8E8EA8' }} />
            )}
          </button>

          {/* Judge Quick Guide */}
          <button
            onClick={() => {
              sounds.playBloopPop();
              setShowJudgeGuide(true);
            }}
            className="btn-secondary"
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.35rem 0.65rem',
              borderRadius: 12,
              background: '#FFFBF0',
              borderColor: '#FFE28A',
              color: '#996A00',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Sparkles size={13} /> Judge Guide
          </button>

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

      {/* ── JUDGE / DEMO GUIDE MODAL ── */}
      <AnimatePresence>
        {showJudgeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowJudgeGuide(false)}
            className="fixed inset-0 z-50 bg-[#252541]/45 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border-2 border-[#E8E5DC] max-w-md w-full p-6 shadow-2xl relative"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: '#FFF6E5', color: '#995C00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: '1rem', fontWeight: 900, color: '#252541' }}>
                      Judge & Evaluator Guide
                    </h3>
                    <span style={{ fontSize: '0.68rem', color: '#8E8EA8', fontWeight: 600 }}>
                      Quick cheat sheet & live demo controls
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowJudgeGuide(false)}
                  className="btn-ghost"
                  style={{ padding: 4, borderRadius: 8 }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Step by step puzzle explanation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.6rem 0.75rem', borderRadius: 12, background: '#EBF5FE', border: '1px solid rgba(85, 167, 247, 0.3)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Compass size={16} style={{ color: '#1D6FB8', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.72rem', color: '#252541' }}>
                    <strong>1. Navigator Clue:</strong> True order is <em>Spiral → Sun → Wave</em>.
                  </div>
                </div>

                <div style={{ padding: '0.6rem 0.75rem', borderRadius: 12, background: '#F0EDFD', border: '1px solid rgba(120, 102, 232, 0.3)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <FileCode size={16} style={{ color: '#7866E8', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.72rem', color: '#252541' }}>
                    <strong>2. Decoder Clue:</strong> <em>Spiral = Cyan</em>, <em>Sun = Amber</em>, <em>Wave = Violet</em>.
                  </div>
                </div>

                <div style={{ padding: '0.6rem 0.75rem', borderRadius: 12, background: '#FFF6E5', border: '1px solid rgba(229, 138, 0, 0.3)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Wrench size={16} style={{ color: '#995C00', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.72rem', color: '#252541' }}>
                    <strong>3. Engineer Power Console:</strong> Flip <em>Cyan → Amber → Violet</em>.
                  </div>
                </div>
              </div>

              {/* Fast Forward One Click Test Button */}
              <div style={{ padding: '0.85rem', borderRadius: 16, background: '#FAF9F6', border: '1.5px solid #E8E5DC', marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#252541', marginBottom: 4 }}>
                  Short on time? Test the full victory loop!
                </div>
                <div style={{ fontSize: '0.68rem', color: '#8E8EA8', marginBottom: '0.75rem' }}>
                  Automatically broadcasts both clues, acknowledges the sequence, and flips the switches to trigger the victory celebration and results report.
                </div>
                <button
                  onClick={handleQuickSolveDemo}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.82rem', gap: '0.4rem' }}
                >
                  <Play size={14} fill="currentColor" /> Run Auto-Solve Demo Loop
                </button>
              </div>

              <button
                onClick={() => setShowJudgeGuide(false)}
                className="btn-secondary"
                style={{ width: '100%', padding: '0.55rem', fontSize: '0.78rem' }}
              >
                Close & Play Manually
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
