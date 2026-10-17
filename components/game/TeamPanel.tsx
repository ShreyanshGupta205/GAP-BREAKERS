'use client';

import React from 'react';
import { useGameStore } from '@/stores/gameStore';
import { PlayerRole } from '@/types/game';
import Avatar from './Avatars';
import Bloop from './Bloop';
import { Compass, FileCode, Wrench, Bot } from 'lucide-react';

const ROLE_CONFIG: Record<
  PlayerRole,
  { label: string; bg: string; color: string; icon: React.ComponentType<{ size?: number }> }
> = {
  navigator: { label: 'Navigator', bg: '#EBF5FE', color: '#1D6FB8', icon: Compass },
  decoder: { label: 'Decoder', bg: '#F0EDFD', color: '#7866E8', icon: FileCode },
  engineer: { label: 'Engineer', bg: '#FFF6E5', color: '#995C00', icon: Wrench },
};

export default function TeamPanel() {
  const { teamPlayers, bridge, phase } = useGameStore();

  const bridgeCount = [bridge.section1, bridge.section2, bridge.section3].filter(
    (s) => s === 'repaired'
  ).length;

  return (
    <div className="flex flex-col h-full justify-between select-none p-1">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E8E5DC]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7866E8]">
            TEAMMATES
          </span>
          <span className="badge-pill badge-mint text-[0.65rem] px-2 py-0.5">
            {bridgeCount}/3 Repaired
          </span>
        </div>

        {/* Players List */}
        <div className="space-y-2.5">
          {teamPlayers.map((player) => {
            const roleConf = ROLE_CONFIG[player.role] || ROLE_CONFIG.navigator;
            const Icon = roleConf.icon;

            return (
              <div
                key={player.id}
                className={`p-3 rounded-2xl border transition-all ${
                  player.isCurrentPlayer
                    ? 'bg-white border-[#7866E8] shadow-sm'
                    : 'bg-[#FAF9F6] border-[#E8E5DC]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2BB67B]" />
                    <span className="font-bold text-xs text-[#252541] truncate max-w-[110px]">
                      {player.displayName}
                    </span>
                  </div>

                  {player.isSimulated ? (
                    <span className="badge-pill bg-[#F4F2EC] text-[#8E8EA8] text-[0.6rem] px-1.5 py-0.5">
                      <Bot size={10} /> BOT
                    </span>
                  ) : (
                    <span className="badge-pill badge-purple text-[0.6rem] px-1.5 py-0.5">
                      YOU
                    </span>
                  )}
                </div>

                <div
                  className="flex items-center gap-1.5 px-2 py-1 rounded-xl text-[0.7rem] font-bold border"
                  style={{
                    background: roleConf.bg,
                    color: roleConf.color,
                    borderColor: `${roleConf.color}30`,
                  }}
                >
                  <Icon size={12} />
                  <span>{roleConf.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mascot Cheer Box at Bottom of Left Panel */}
      <div className="p-3 rounded-2xl bg-[#F0FAF5] border border-[#9BE7C4]/60 flex items-center gap-2.5 mt-3">
        <Bloop
          mood={bridgeCount === 3 ? 'dancing' : bridgeCount > 0 ? 'proud' : 'excited'}
          size={38}
          animate={false}
        />
        <div className="text-[0.68rem] text-[#1A7A4E] leading-snug">
          {bridgeCount === 3
            ? 'Bridge built! Friendship +100! 🎉'
            : bridgeCount > 0
            ? 'Progress made! Keep talking, team.'
            : 'Share clues to light up the bridge!'}
        </div>
      </div>
    </div>
  );
}
