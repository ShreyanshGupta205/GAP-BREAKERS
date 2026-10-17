'use client';

import { useGameStore } from '@/stores/gameStore';
import { PlayerRole } from '@/types/game';
import { Wifi, WifiOff, Bot } from 'lucide-react';

const ROLE_COLORS: Record<PlayerRole, string> = {
  navigator: 'var(--color-cyan)',
  decoder: 'var(--color-violet)',
  engineer: 'var(--color-amber)',
};

const ROLE_SYMBOLS: Record<PlayerRole, string> = {
  navigator: '🧭',
  decoder: '🔮',
  engineer: '⚡',
};

export default function TeamPanel() {
  const { teamPlayers, bridge, phase } = useGameStore();

  const bridgeCount = [bridge.section1, bridge.section2, bridge.section3].filter((s) => s === 'repaired').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.5rem' }}>
      {/* Header */}
      <div className="font-display" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-text-muted)', padding: '0.25rem 0' }}>
        TEAM STATUS
      </div>

      {/* Players */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, overflowY: 'auto' }}>
        {teamPlayers.map((player) => {
          const color = ROLE_COLORS[player.role];
          return (
            <div
              key={player.id}
              style={{
                padding: '0.625rem 0.75rem',
                borderRadius: 8,
                background: player.isCurrentPlayer ? `rgba(${player.role === 'navigator' ? '0,245,255' : player.role === 'decoder' ? '139,92,246' : '245,158,11'},0.08)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${player.isCurrentPlayer ? color + '40' : 'rgba(255,255,255,0.06)'}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Current player indicator */}
              {player.isCurrentPlayer && (
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: color, borderRadius: '3px 0 0 3px' }} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: player.isCurrentPlayer ? '0.25rem' : 0 }}>
                {/* Avatar / symbol */}
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: color + '15',
                  border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', flexShrink: 0,
                }}>
                  {ROLE_SYMBOLS[player.role]}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {player.displayName}
                    </span>
                    {player.isCurrentPlayer && (
                      <span style={{ fontSize: '0.6rem', color: color, fontFamily: 'var(--font-mono)', background: color + '15', padding: '0.1rem 0.3rem', borderRadius: 3 }}>YOU</span>
                    )}
                    {player.isSimulated && (
                      <span className="badge badge-sim" style={{ fontSize: '0.55rem', padding: '0.1rem 0.35rem' }}>
                        <Bot size={8} /> SIM
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                    <span className="font-display" style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color }}>
                      {player.role.toUpperCase()}
                    </span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem' }}>· {player.language.toUpperCase()}</span>
                  </div>
                </div>

                {/* Online status */}
                <div>
                  {player.isOnline ? (
                    <Wifi size={12} color="var(--color-success)" />
                  ) : (
                    <WifiOff size={12} color="var(--color-text-muted)" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bridge progress */}
      <div style={{ padding: '0.625rem', background: 'rgba(0,0,0,0.3)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="font-display" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          BRIDGE PROGRESS
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {([
            { section: 'section1' as const, label: 'S1', title: 'Discovery' },
            { section: 'section2' as const, label: 'S2', title: 'Understanding' },
            { section: 'section3' as const, label: 'S3', title: 'Connection' },
          ]).map(({ section, label, title }) => {
            const state = bridge[section];
            const color = state === 'repaired' ? 'var(--color-cyan)' : state === 'glowing' ? 'var(--color-cyan)' : 'var(--color-text-muted)';
            const bg = state === 'repaired' ? 'rgba(0,245,255,0.15)' : state === 'glowing' ? 'rgba(0,245,255,0.07)' : 'rgba(255,255,255,0.04)';
            return (
              <div
                key={section}
                title={title}
                style={{
                  flex: 1, padding: '0.3rem', borderRadius: 5,
                  background: bg,
                  border: `1px solid ${state !== 'broken' ? 'rgba(0,245,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  textAlign: 'center',
                  transition: 'all 0.4s',
                }}
              >
                <div className="font-mono" style={{ fontSize: '0.7rem', color, fontWeight: 700 }}>{label}</div>
                <div style={{ fontSize: '0.55rem', color: state !== 'broken' ? color : 'var(--color-text-muted)', marginTop: '0.1rem' }}>
                  {state === 'repaired' ? '✓' : state === 'glowing' ? '~' : '✗'}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
          {bridgeCount}/3 sections restored
        </div>
      </div>
    </div>
  );
}
