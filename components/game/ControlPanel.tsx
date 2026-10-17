'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { SwitchColor } from '@/types/game';
import RuneGlyph from './RuneGlyph';
import Bloop from './Bloop';
import { Check, Wrench, CheckCircle2, Zap, AlertCircle } from 'lucide-react';
import { sounds } from '@/lib/audio/soundEffects';

const SWITCHES: {
  color: SwitchColor;
  label: string;
  sub: string;
  hex: string;
  borderHex: string;
  bgHex: string;
  type: 'spiral' | 'sun' | 'wave';
}[] = [
  {
    color: 'cyan',
    label: 'CYAN',
    sub: 'Spiral',
    hex: '#0FB5C4',
    borderHex: '#0A7B85',
    bgHex: '#E6F9FB',
    type: 'spiral',
  },
  {
    color: 'amber',
    label: 'AMBER',
    sub: 'Sun',
    hex: '#E58A00',
    borderHex: '#B26B00',
    bgHex: '#FFF6E5',
    type: 'sun',
  },
  {
    color: 'violet',
    label: 'VIOLET',
    sub: 'Wave',
    hex: '#8B5CF6',
    borderHex: '#6D38E2',
    bgHex: '#F3EEFE',
    type: 'wave',
  },
];

export default function ControlPanel() {
  const {
    activateSwitch,
    activatedSwitches,
    acknowledgeSequence,
    engineerAcknowledged,
    phase,
    lastActionFeedback,
  } = useGameStore();

  const [lastPressed, setLastPressed] = useState<SwitchColor | null>(null);
  const [funnyFeedback, setFunnyFeedback] = useState<string | null>(null);

  const canActivate = phase !== 'victory' && phase !== 'failure';
  const allActivated = activatedSwitches.length === 3;

  const handleSwitch = (color: SwitchColor) => {
    if (!canActivate) return;
    setLastPressed(color);
    sounds.playSwitchClick(color);

    // Check if move is wrong to show gentle funny humor
    const expected = ['cyan', 'amber', 'violet'][activatedSwitches.length];
    if (color !== expected && activatedSwitches.length < 3) {
      sounds.playSwitchWrong();
      const funnyQuotes = [
        'Zap! Not quite. The bridge remains emotionally unavailable.',
        'Almost! The bridge goblin disagrees. Try another sequence.',
        'Bloop gasped dramatically! That was not the right rune order.',
      ];
      setFunnyFeedback(funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)]);
    } else {
      sounds.playSwitchCorrect();
      setFunnyFeedback('✨ Conduit humming with energy! Nicely done.');
    }

    activateSwitch(color);
    setTimeout(() => setLastPressed(null), 250);
  };

  const handleAcknowledge = () => {
    sounds.playBridgeRepaired();
    acknowledgeSequence();
  };

  return (
    <div className="flex flex-col justify-between h-full select-none">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF6E5] border border-[#FFE28A] mb-3">
          <div className="flex items-center gap-2">
            <Wrench size={16} className="text-[#995C00]" />
            <span className="font-display font-extrabold text-xs text-[#995C00]">
              POWER CONSOLE
            </span>
          </div>
          <span className="text-[0.68rem] font-bold text-[#8E8EA8]">
            {activatedSwitches.length}/3 Linked
          </span>
        </div>

        {/* Ready acknowledgment button */}
        {!engineerAcknowledged && (
          <button
            onClick={handleAcknowledge}
            className="btn-mint w-full text-xs py-2.5 mb-3 shadow-sm"
          >
            ✓ I Have the Sequence!
          </button>
        )}

        {/* Humorous feedback banner */}
        <AnimatePresence mode="wait">
          {funnyFeedback && (
            <motion.div
              key={funnyFeedback}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-2.5 rounded-xl text-xs font-semibold mb-3 border flex items-center gap-2 ${
                funnyFeedback.startsWith('Zap') || funnyFeedback.startsWith('Almost') || funnyFeedback.startsWith('Bloop gasped')
                  ? 'bg-[#FFF0F2] text-[#F25A71] border-[#FF9EAB]/40'
                  : 'bg-[#F0FAF5] text-[#1A7A4E] border-[#9BE7C4]/50'
              }`}
            >
              <span className="text-sm">
                {funnyFeedback.startsWith('Zap') ? '⚡' : '🌟'}
              </span>
              <span className="text-[0.72rem] leading-tight">{funnyFeedback}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3 Satisfying, Bubbly Game Switches */}
        <div className="grid grid-cols-3 gap-2.5">
          {SWITCHES.map((sw) => {
            const isActivated = activatedSwitches.includes(sw.color);

            return (
              <motion.button
                key={sw.color}
                disabled={!canActivate || isActivated}
                onClick={() => handleSwitch(sw.color)}
                whileHover={canActivate && !isActivated ? { y: -3 } : {}}
                whileTap={canActivate && !isActivated ? { y: 2 } : {}}
                className={`relative p-3 rounded-2xl flex flex-col items-center justify-between transition-all ${
                  isActivated
                    ? 'border-2 cursor-default'
                    : canActivate
                    ? 'cursor-pointer hover:shadow-md'
                    : 'opacity-40 cursor-not-allowed'
                }`}
                style={{
                  background: isActivated ? sw.bgHex : '#FFFFFF',
                  borderColor: isActivated ? sw.hex : '#E8E5DC',
                  boxShadow: isActivated
                    ? `0 3px 0 ${sw.borderHex}`
                    : `0 4px 0 #D5D1C8, 0 2px 6px rgba(0,0,0,0.04)`,
                }}
              >
                {/* Active Indicator Pin */}
                <div
                  className="w-2 h-2 rounded-full mb-1"
                  style={{ background: isActivated ? sw.hex : '#D5D1C8' }}
                />

                {/* Rune Symbol */}
                <div className="my-1">
                  <RuneGlyph type={sw.type} size={32} animate={isActivated} />
                </div>

                {/* Switch Label */}
                <span
                  className="font-display font-extrabold text-[0.7rem] tracking-wider"
                  style={{ color: isActivated ? sw.hex : '#252541' }}
                >
                  {sw.label}
                </span>

                <span className="text-[0.62rem] text-[#8E8EA8]">{sw.sub}</span>

                {isActivated && (
                  <span
                    className="text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full text-white mt-1.5"
                    style={{ background: sw.hex }}
                  >
                    LOCKED
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Progress sequence helper at bottom */}
      <div className="mt-3 pt-2.5 border-t border-[#E8E5DC] text-center">
        <span className="text-[0.65rem] font-mono text-[#8E8EA8] block">
          Required Order: 1st → 2nd → 3rd
        </span>
      </div>
    </div>
  );
}
