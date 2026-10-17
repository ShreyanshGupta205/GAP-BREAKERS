'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Copy,
  Check,
  Users,
  Play,
  ArrowLeft,
  Compass,
  FileCode,
  Wrench,
  Sparkles,
  Bot,
  RefreshCw,
} from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { PlayerRole } from '@/types/game';
import { generateRoomCode, validateRoomCode, normalizeRoomCode } from '@/lib/validation/room';
import Avatar from '@/components/game/Avatars';
import Bloop from '@/components/game/Bloop';

const ROLES: {
  value: PlayerRole;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bg: string;
  desc: string;
}[] = [
  {
    value: 'navigator',
    label: 'Navigator',
    icon: Compass,
    color: '#1D6FB8',
    bg: '#EBF5FE',
    desc: 'You hold the route map. You see the true order of the ancient runes.',
  },
  {
    value: 'decoder',
    label: 'Decoder',
    icon: FileCode,
    color: '#7866E8',
    bg: '#F0EDFD',
    desc: 'You hold the secret cipher. You translate runes into energy colors.',
  },
  {
    value: 'engineer',
    label: 'Engineer',
    icon: Wrench,
    color: '#995C00',
    bg: '#FFF6E5',
    desc: 'You operate the power console. You flip Cyan, Amber, and Violet switches.',
  },
];

const FUN_STATUSES = [
  'Building the bridge… mentally.',
  'Waiting for the final hero.',
  'Your teammate is probably choosing an avatar.',
  'Three brains are better than one. Usually.',
  'Bloop is double-checking the bridge bolts.',
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
  const [statusIndex, setStatusIndex] = useState(0);

  // Cycle funny status messages
  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % FUN_STATUSES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!currentPlayer && !isPractice) {
      router.replace('/setup');
      return;
    }
    setRoomCodeLocal(generateRoomCode());
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roomCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const launchGame = (code: string) => {
    setRole(selectedRole);
    setRoomCode(code);

    const allRoles: PlayerRole[] = ['navigator', 'decoder', 'engineer'];
    const otherRoles = allRoles.filter((r) => r !== selectedRole);

    // Honestly labeled simulated teammates
    const teammates = [
      {
        id: 'bot-aria-7',
        displayName: otherRoles[0] === 'navigator' ? 'ARIA-7' : otherRoles[0] === 'decoder' ? 'ZENO-3' : 'BOLT-9',
        role: otherRoles[0],
        language: 'en' as const,
        commFormat: 'text' as const,
        isOnline: true,
        isSimulated: true, // Honestly labeled!
        isCurrentPlayer: false,
      },
      {
        id: 'bot-zeno-3',
        displayName: otherRoles[1] === 'navigator' ? 'ARIA-7' : otherRoles[1] === 'decoder' ? 'ZENO-3' : 'BOLT-9',
        role: otherRoles[1],
        language: 'en' as const,
        commFormat: 'text' as const,
        isOnline: true,
        isSimulated: true, // Honestly labeled!
        isCurrentPlayer: false,
      },
    ];

    const currentTeamPlayer = {
      id: currentPlayer?.id ?? 'player-host',
      displayName: currentPlayer?.displayName ?? 'Phoenix',
      role: selectedRole,
      language: currentPlayer?.language ?? ('en' as const),
      commFormat: currentPlayer?.commFormat ?? ('text' as const),
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
    launchGame(normalized);
  };

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
          onClick={() => router.push('/setup')}
          className="btn-ghost"
          style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
        >
          <ArrowLeft size={16} /> Edit Character
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bloop mood="excited" size={32} />
          <span className="font-display" style={{ fontSize: '0.9rem', fontWeight: 800, color: '#7866E8' }}>
            MISSION LOBBY
          </span>
        </div>

        <button
          onClick={() => setRoomCodeLocal(generateRoomCode())}
          className="btn-ghost"
          style={{ fontSize: '0.8rem', color: '#8E8EA8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          title="New Room Code"
        >
          <RefreshCw size={13} /> New Code
        </button>
      </header>

      {/* Main Room Container */}
      <div style={{ maxWidth: 680, margin: '1rem auto', width: '100%' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            border: '2px solid #E8E5DC',
            boxShadow: '0 12px 36px rgba(37, 37, 65, 0.08)',
            padding: '2rem',
          }}
        >
          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              background: '#F4F2EC',
              padding: 4,
              borderRadius: 16,
              border: '1px solid #E8E5DC',
              maxWidth: 290,
              margin: '0 auto 1.5rem',
            }}
          >
            <button
              onClick={() => setTab('create')}
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                borderRadius: 12,
                fontSize: '0.78rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: tab === 'create' ? '#FFFFFF' : 'transparent',
                color: tab === 'create' ? '#252541' : '#8E8EA8',
                boxShadow: tab === 'create' ? '0 2px 6px rgba(37, 37, 65, 0.06)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              Host / Solo Practice
            </button>
            <button
              onClick={() => setTab('join')}
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                borderRadius: 12,
                fontSize: '0.78rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: tab === 'join' ? '#FFFFFF' : 'transparent',
                color: tab === 'join' ? '#252541' : '#8E8EA8',
                boxShadow: tab === 'join' ? '0 2px 6px rgba(37, 37, 65, 0.06)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              Join Room Code
            </button>
          </div>

          {tab === 'create' ? (
            <div>
              {/* Room Code Card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  background: '#F0EDFD',
                  borderRadius: 18,
                  border: '1.5px solid rgba(120, 102, 232, 0.25)',
                  marginBottom: '1.5rem',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#7866E8',
                      display: 'block',
                    }}
                  >
                    ROOM INVITATION CODE
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      letterSpacing: '0.15em',
                      color: '#252541',
                    }}
                  >
                    {roomCode || 'BRIDGE'}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="btn-secondary"
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.55rem 1rem',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  {copied ? <Check size={14} style={{ color: '#2BB67B' }} /> : <Copy size={14} />}
                  {copied ? 'Copied Code!' : 'Copy Code'}
                </button>
              </div>

              {/* Waiting Campfire / Team Roster */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#5C5C77',
                    }}
                  >
                    Team Gathering (3 Operatives)
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8E8EA8' }}>
                    1 Player · 2 Demo Buddies
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: '0.75rem',
                  }}
                >
                  {/* Current Player Slot */}
                  <div
                    style={{
                      padding: '0.85rem',
                      borderRadius: 16,
                      border: '2px solid #7866E8',
                      background: 'rgba(240, 237, 253, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                    }}
                  >
                    <Avatar id={currentPlayer?.avatarId ?? 'avatar-1'} size={40} />
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: '0.82rem',
                            color: '#252541',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {currentPlayer?.displayName ?? 'Phoenix'}
                        </span>
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: '#2BB67B',
                            flexShrink: 0,
                          }}
                        />
                      </div>
                      <span className="badge-pill badge-purple" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem', marginTop: 4 }}>
                        YOU (READY)
                      </span>
                    </div>
                  </div>

                  {/* Simulated Buddy 1 */}
                  <div
                    style={{
                      padding: '0.85rem',
                      borderRadius: 16,
                      border: '1.5px solid #E8E5DC',
                      background: '#FAF9F6',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                    }}
                  >
                    <Avatar id="avatar-3" size={40} />
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: '0.82rem',
                            color: '#252541',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          ARIA-7
                        </span>
                        <Bot size={12} style={{ color: '#8E8EA8', flexShrink: 0 }} />
                      </div>
                      <span className="badge-pill badge-mint" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem', marginTop: 4 }}>
                        BOT · DEMO BUDDY
                      </span>
                    </div>
                  </div>

                  {/* Simulated Buddy 2 */}
                  <div
                    style={{
                      padding: '0.85rem',
                      borderRadius: 16,
                      border: '1.5px solid #E8E5DC',
                      background: '#FAF9F6',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                    }}
                  >
                    <Avatar id="avatar-6" size={40} />
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: '0.82rem',
                            color: '#252541',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          BOLT-9
                        </span>
                        <Bot size={12} style={{ color: '#8E8EA8', flexShrink: 0 }} />
                      </div>
                      <span className="badge-pill badge-yellow" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem', marginTop: 4 }}>
                        BOT · DEMO BUDDY
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#5C5C77',
                    display: 'block',
                    marginBottom: '0.65rem',
                  }}
                >
                  Pick Your Primary Perspective
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: '0.75rem',
                  }}
                >
                  {ROLES.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.value;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setSelectedRole(r.value)}
                        style={{
                          padding: '0.85rem',
                          borderRadius: 16,
                          textAlign: 'left',
                          border: isSelected ? '2px solid #7866E8' : '1.5px solid #E8E5DC',
                          background: isSelected ? '#FFFFFF' : '#FAF9F6',
                          boxShadow: isSelected ? '0 4px 14px rgba(120, 102, 232, 0.16)' : 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: 120,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 10,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: r.bg,
                              color: r.color,
                            }}
                          >
                            <Icon size={16} />
                          </div>
                          {isSelected && (
                            <span
                              style={{
                                width: 9,
                                height: 9,
                                borderRadius: '50%',
                                background: '#7866E8',
                              }}
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-display" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#252541' }}>
                            {r.label}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#8E8EA8', lineHeight: 1.3, marginTop: 3 }}>
                            {r.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Funny Status Banner */}
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 16,
                  background: '#FAF9F6',
                  border: '1.5px solid #E8E5DC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <Bloop mood="thinking" size={28} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#5C5C77', fontStyle: 'italic' }}>
                  "{FUN_STATUSES[statusIndex]}"
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => launchGame(roomCode)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '0.85rem 1.25rem', fontSize: '0.95rem' }}
                >
                  <Play size={16} fill="currentColor" /> START MISSION
                </button>
                <button
                  type="button"
                  onClick={() => launchGame(roomCode)}
                  className="btn-secondary"
                  style={{ padding: '0.85rem 1.25rem', fontSize: '0.85rem' }}
                >
                  PLAY SOLO DEMO
                </button>
              </div>
            </div>
          ) : (
            /* ── JOIN EXISTING ROOM ── */
            <div style={{ padding: '1rem 0', textAlign: 'center' }}>
              <Bloop mood="excited" size={64} style={{ margin: '0 auto 0.75rem' }} />
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#252541', marginBottom: 4 }}>
                Enter Your Friend's Room Code
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#8E8EA8', marginBottom: '1.5rem' }}>
                Enter the 6-character room code shared by your teammate.
              </p>

              <div style={{ maxWidth: 260, margin: '0 auto 1.5rem' }}>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => {
                    setJoinCode(e.target.value.toUpperCase());
                    setJoinError('');
                  }}
                  maxLength={6}
                  placeholder="e.g. ABC123"
                  className="font-mono"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: 16,
                    border: '2px solid #E8E5DC',
                    outline: 'none',
                    fontWeight: 900,
                    fontSize: '1.6rem',
                    letterSpacing: '0.15em',
                    color: '#252541',
                    background: '#FAF9F6',
                    textTransform: 'uppercase',
                  }}
                />
                {joinError && (
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F25A71', marginTop: '0.5rem' }}>{joinError}</p>
                )}
              </div>

              <div style={{ maxWidth: 260, margin: '0 auto' }}>
                <button
                  type="button"
                  onClick={handleJoin}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.85rem 1.25rem', fontSize: '0.95rem' }}
                >
                  Join Room →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer style={{ textAlign: 'center', fontSize: '0.75rem', color: '#8E8EA8', padding: '0.5rem 0' }}>
        Tip: In Solo Demo mode, you can toggle between all 3 perspectives during the mission!
      </footer>
    </main>
  );
}

export default function LobbyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">Loading lobby…</div>}>
      <LobbyContent />
    </Suspense>
  );
}
