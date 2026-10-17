'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Zap, Copy, Check, Users, ChevronRight, ChevronLeft, AlertCircle, Play } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { PlayerRole } from '@/types/game';
import { generateRoomCode, validateRoomCode, normalizeRoomCode } from '@/lib/validation/room';

const ROLES: { value: PlayerRole; label: string; symbol: string; color: string; desc: string }[] = [
  {
    value: 'navigator',
    label: 'NAVIGATOR',
    symbol: '🧭',
    color: 'var(--color-cyan)',
    desc: 'You hold the route map showing the correct rune sequence.',
  },
  {
    value: 'decoder',
    label: 'DECODER',
    symbol: '🔮',
    color: 'var(--color-violet)',
    desc: 'You have the rune table — translating symbols into energy colors.',
  },
  {
    value: 'engineer',
    label: 'ENGINEER',
    symbol: '⚡',
    color: 'var(--color-amber)',
    desc: 'You control the power switches. Need the team to tell you the order.',
  },
];

function LobbyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPractice = searchParams.get('mode') === 'practice';

  const { currentPlayer, setRole, setRoomCode, setTeamPlayers, startMission } = useGameStore();

  const [tab, setTab] = useState<'create' | 'join'>('create');
  const [roomCode, setRoomCodeLocal] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedRole, setSelectedRole] = useState<PlayerRole>('navigator');

  useEffect(() => {
    if (!currentPlayer && !isPractice) {
      router.replace('/setup');
      return;
    }
    // Auto-generate room code
    setRoomCodeLocal(generateRoomCode());
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roomCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartSolo = () => {
    // Set up solo demo with simulated teammates
    setRole(selectedRole);
    setRoomCode(roomCode);

    const allRoles: PlayerRole[] = ['navigator', 'decoder', 'engineer'];
    const teammates = allRoles
      .filter((r) => r !== selectedRole)
      .map((r) => ({
        id: crypto.randomUUID(),
        displayName: r === 'navigator' ? 'ARIA-7' : r === 'decoder' ? 'ZENO-3' : 'BOLT-9',
        role: r,
        language: 'en' as const,
        commFormat: 'text' as const,
        isOnline: true,
        isSimulated: true,
        isCurrentPlayer: false,
      }));

    const currentTeamPlayer = {
      id: currentPlayer?.id ?? crypto.randomUUID(),
      displayName: currentPlayer?.displayName ?? 'Solo Player',
      role: selectedRole,
      language: currentPlayer?.language ?? 'en' as const,
      commFormat: currentPlayer?.commFormat ?? 'text' as const,
      isOnline: true,
      isSimulated: false,
      isCurrentPlayer: true,
    };

    setTeamPlayers([currentTeamPlayer, ...teammates]);
    startMission('mission-01');
    router.push('/game/mission-01');
  };

  const handleJoin = () => {
    const normalized = normalizeRoomCode(joinCode);
    const err = validateRoomCode(normalized);
    if (err) {
      setJoinError(err);
      return;
    }
    // In solo mode, simulate joining
    setRole(selectedRole);
    setRoomCode(normalized);
    const allRoles: PlayerRole[] = ['navigator', 'decoder', 'engineer'];
    const teammates = allRoles
      .filter((r) => r !== selectedRole)
      .map((r) => ({
        id: crypto.randomUUID(),
        displayName: r === 'navigator' ? 'ARIA-7' : r === 'decoder' ? 'ZENO-3' : 'BOLT-9',
        role: r,
        language: 'en' as const,
        commFormat: 'text' as const,
        isOnline: true,
        isSimulated: true,
        isCurrentPlayer: false,
      }));

    const currentTeamPlayer = {
      id: currentPlayer?.id ?? crypto.randomUUID(),
      displayName: currentPlayer?.displayName ?? 'Solo Player',
      role: selectedRole,
      language: currentPlayer?.language ?? 'en' as const,
      commFormat: currentPlayer?.commFormat ?? 'text' as const,
      isOnline: true,
      isSimulated: false,
      isCurrentPlayer: true,
    };

    setTeamPlayers([currentTeamPlayer, ...teammates]);
    startMission('mission-01');
    router.push('/game/mission-01');
  };

  return (
    <main style={{ minHeight: '100dvh', background: 'var(--color-void)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '25%', right: '15%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: 600, position: 'relative', zIndex: 1 }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Zap size={16} color="var(--color-cyan)" />
            <span className="font-display" style={{ color: 'var(--color-cyan)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>MISSION LOBBY</span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            SAVE THE FLOATING CITY
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            {currentPlayer ? `Agent ${currentPlayer.displayName} ready` : 'Practice Mode'} · Mission 01
          </p>

          {/* Solo mode notice */}
          <div style={{ marginTop: '1rem', padding: '0.6rem 1rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8, fontSize: '0.8rem', color: 'var(--color-amber)' }}>
            <AlertCircle size={12} style={{ display: 'inline', marginRight: '0.4rem' }} />
            <strong>Solo Demo Mode</strong> — Simulated teammates represent NPCs, not real players. Multiplayer requires Supabase configuration.
          </div>
        </div>

        {/* Role selection */}
        <div className="card-glass" style={{ marginBottom: '1rem' }}>
          <label className="font-display" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            CHOOSE YOUR ROLE
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {ROLES.map((r) => (
              <motion.button
                key={r.value}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedRole(r.value)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.875rem 1rem', borderRadius: 8,
                  border: `1px solid ${selectedRole === r.value ? r.color : 'rgba(255,255,255,0.06)'}`,
                  background: selectedRole === r.value ? `rgba(${r.value === 'navigator' ? '0,245,255' : r.value === 'decoder' ? '139,92,246' : '245,158,11'},0.1)` : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{r.symbol}</span>
                <div style={{ flex: 1 }}>
                  <div className="font-display" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: r.color, marginBottom: '0.2rem' }}>{r.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{r.desc}</div>
                </div>
                {selectedRole === r.value && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tabs: Create / Join */}
        <div className="card-glass">
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.25rem' }}>
            {(['create', 'join'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: '0.6rem', borderRadius: 6,
                  background: tab === t ? 'var(--color-surface)' : 'transparent',
                  color: tab === t ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-orbitron)', fontSize: '0.75rem', letterSpacing: '0.1em',
                  border: tab === t ? '1px solid rgba(0,245,255,0.15)' : '1px solid transparent',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {t === 'create' ? 'CREATE ROOM' : 'JOIN ROOM'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'create' ? (
              <motion.div key="create" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Share this code with teammates to invite them to your room:
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                  <div style={{
                    flex: 1, padding: '1rem', borderRadius: 8,
                    background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.25)',
                    textAlign: 'center',
                  }}>
                    <span className="font-mono" style={{ fontSize: '2rem', letterSpacing: '0.3em', color: 'var(--color-cyan)', fontWeight: 700 }}>
                      {roomCode}
                    </span>
                  </div>
                  <button className="btn-ghost" onClick={handleCopy} style={{ padding: '1rem', flexShrink: 0 }}>
                    {copied ? <Check size={18} color="var(--color-success)" /> : <Copy size={18} />}
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, marginBottom: '1.5rem' }}>
                  <Users size={16} color="var(--color-text-muted)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    Solo demo: 2 simulated teammates will join automatically
                  </span>
                </div>

                <motion.button
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '0.85rem', padding: '0.9rem' }}
                  onClick={handleStartSolo}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play size={14} fill="currentColor" /> BEGIN MISSION
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="join" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Enter a 6-character room code to join an existing room:
                </p>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter room code (e.g. AB3X7K)"
                  value={joinCode}
                  onChange={(e) => { setJoinCode(e.target.value.toUpperCase()); setJoinError(''); }}
                  maxLength={6}
                  style={{ marginBottom: '0.5rem', textAlign: 'center', letterSpacing: '0.3em', fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}
                />
                {joinError && (
                  <p style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                    <AlertCircle size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />
                    {joinError}
                  </p>
                )}
                <motion.button
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '0.85rem', padding: '0.9rem', marginTop: '1rem' }}
                  onClick={handleJoin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  JOIN MISSION <ChevronRight size={16} />
                </motion.button>
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
                  In demo mode, any valid 6-char code starts a solo session
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="btn-ghost" onClick={() => router.push('/setup')} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ChevronLeft size={14} /> Back to Setup
        </button>
      </motion.div>
    </main>
  );
}

export default function LobbyPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100dvh', background: 'var(--color-void)' }} />}>
      <LobbyContent />
    </Suspense>
  );
}
