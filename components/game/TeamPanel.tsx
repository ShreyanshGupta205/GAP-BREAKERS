'use client';

import React from 'react';
import { useGameStore } from '@/stores/gameStore';
import { PlayerRole } from '@/types/game';
import { Compass, BookOpen, Cpu, Wifi, WifiOff, Bot, LucideIcon } from 'lucide-react';

const ROLE_COLORS: Record<PlayerRole, string> = {
  navigator: 'var(--color-cyan)',
  decoder: 'var(--color-violet)',
  engineer: 'var(--color-amber)',
};

const ROLE_ICONS: Record<PlayerRole, LucideIcon> = {
  navigator: Compass,
  decoder: BookOpen,
  engineer: Cpu,
};

export default function TeamPanel() {
  const { teamPlayers, bridge } = useGameStore();

  const bridgeCount = [bridge.section1, bridge.section2, bridge.section3].filter((s) => s === 'repaired').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.5rem' }}>
      {/* Header */}
      <div className="font-display flex items-center justify-between" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-text-muted)', padding: '0.25rem 0' }}>
        <span>TACTICAL TEAM ROSTER</span>
        <span className="font-mono text-cyan">{bridgeCount}/3 REPAIRED</span>
      </div>

      {/* Players */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, overflowY: 'auto' }}>
        {teamPlayers.map((player) => {
          const color = ROLE_COLORS[player.role];
          const RoleIcon = ROLE_ICONS[player.role];

          return (
            <div
              key={player.id}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: 8,
                background: player.isCurrentPlayer ? `rgba(${player.role === 'navigator' ? '0,245,255' : player.role === 'decoder' ? '139,92,246' : '245,158,11'},0.1)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${player.isCurrentPlayer ? color + '50' : 'rgba(255,255,255,0.08)'}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {player.isCurrentPlayer && (
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: color, borderRadius: '3px 0 0 3px' }} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: `${color}20`, border: `1px solid ${color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <RoleIcon className="w-4 h-4" style={{ color }} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: player.isCurrentPlayer ? '#ffffff' : 'var(--color-text-primary)' }}>
                      {player.displayName}
                    </span>
                    {player.isCurrentPlayer && (
                      <span className="badge badge-cyan" style={{ fontSize: '0.58rem', padding: '0.1rem 0.35rem' }}>YOU</span>
                    )}
                    {player.isSimulated && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>
                        <Bot className="w-3 h-3 text-cyan" />
                        <span>AI SIM</span>
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.68rem', color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {player.role}
                  </div>
                </div>

                <div>
                  {player.isOnline ? (
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <WifiOff className="w-3.5 h-3.5 text-rose-400" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
