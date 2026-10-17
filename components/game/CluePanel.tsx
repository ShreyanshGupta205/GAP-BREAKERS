'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { PlayerRole } from '@/types/game';
import RuneGlyph from './RuneGlyph';
import Bloop from './Bloop';
import {
  Compass,
  FileCode,
  Wrench,
  Share2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Key,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { sounds } from '@/lib/audio/soundEffects';

interface CluePanelProps {
  viewingRole: PlayerRole;
}

export default function CluePanel({ viewingRole }: CluePanelProps) {
  const {
    shareClue,
    acknowledgeSequence,
    cluesSharedByNavigator,
    cluesSharedByDecoder,
    engineerAcknowledged,
  } = useGameStore();

  const [showHint, setShowHint] = useState(false);

  const isNavigator = viewingRole === 'navigator';
  const isDecoder = viewingRole === 'decoder';
  const isEngineer = viewingRole === 'engineer';

  const alreadyShared = isNavigator
    ? cluesSharedByNavigator
    : isDecoder
    ? cluesSharedByDecoder
    : engineerAcknowledged;

  return (
    <div className="h-full flex flex-col justify-between select-none">
      <div>
        {/* Role Header Card */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F6] border border-[#E8E5DC] mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
              style={{
                background: isNavigator ? '#EBF5FE' : isDecoder ? '#F0EDFD' : '#FFF6E5',
                color: isNavigator ? '#1D6FB8' : isDecoder ? '#7866E8' : '#995C00',
              }}
            >
              {isNavigator && <Compass size={18} />}
              {isDecoder && <FileCode size={18} />}
              {isEngineer && <Wrench size={18} />}
            </div>
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#8E8EA8] block">
                YOUR EXCLUSIVE CLUE
              </span>
              <span className="font-display font-extrabold text-xs text-[#252541]">
                {isNavigator && 'Navigator Celestial Map'}
                {isDecoder && 'Decoder Rune Cipher'}
                {isEngineer && 'Engineer Power Actuators'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playBloopPop();
              setShowHint(true);
            }}
            className="btn-ghost text-xs font-bold text-[#7866E8] flex items-center gap-1 px-2 py-1 rounded-xl"
            title="Ask Bloop for a hint"
          >
            <Lightbulb size={13} /> Hint
          </button>
        </div>

        {/* ── ROLE SPECIFIC COLLECTIBLE CLUE CARD ── */}
        {isNavigator && (
          <div className="space-y-3">
            <p className="text-xs text-[#5C5C77]">
              Your star chart shows the <strong className="text-[#252541]">true symbol sequence</strong>. Share this with your team so the Decoder knows which colors to look up!
            </p>

            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#55A7F7]/30 shadow-sm space-y-2">
              <div className="text-[0.65rem] font-bold text-[#1D6FB8] tracking-wider uppercase mb-1">
                STEP-BY-STEP SEQUENCE:
              </div>

              {[
                { step: 1, name: 'Spiral Rune', type: 'spiral' as const, note: 'Activate 1st' },
                { step: 2, name: 'Sun Rune', type: 'sun' as const, note: 'Activate 2nd' },
                { step: 3, name: 'Wave Rune', type: 'wave' as const, note: 'Activate 3rd' },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#55A7F7] text-white font-bold text-xs flex items-center justify-center">
                      {item.step}
                    </span>
                    <RuneGlyph type={item.type} size={24} />
                    <span className="font-bold text-xs text-[#252541]">{item.name}</span>
                  </div>
                  <span className="text-[0.68rem] font-semibold text-[#8E8EA8]">{item.note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isDecoder && (
          <div className="space-y-3">
            <p className="text-xs text-[#5C5C77]">
              Your cipher table translates ancient runes into <strong className="text-[#252541]">colored energy switches</strong>.
            </p>

            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#7866E8]/30 shadow-sm space-y-2">
              <div className="text-[0.65rem] font-bold text-[#7866E8] tracking-wider uppercase mb-1">
                GLYPH TO SWITCH TRANSLATION:
              </div>

              {[
                { rune: 'Spiral Rune', type: 'spiral' as const, color: 'Cyan Switch', hex: '#0FB5C4', bg: '#E6F9FB' },
                { rune: 'Sun Rune', type: 'sun' as const, color: 'Amber Switch', hex: '#E58A00', bg: '#FFF6E5' },
                { rune: 'Wave Rune', type: 'wave' as const, color: 'Violet Switch', hex: '#8B5CF6', bg: '#F3EEFE' },
              ].map((m) => (
                <div
                  key={m.rune}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]"
                >
                  <div className="flex items-center gap-2">
                    <RuneGlyph type={m.type} size={22} />
                    <span className="font-bold text-xs text-[#252541]">{m.rune}</span>
                  </div>
                  <span
                    className="font-bold text-[0.72rem] px-2.5 py-1 rounded-lg border"
                    style={{ background: m.bg, color: m.hex, borderColor: `${m.hex}40` }}
                  >
                    = {m.color}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isEngineer && (
          <div className="space-y-3">
            <p className="text-xs text-[#5C5C77]">
              You control the power panel! You need the <strong className="text-[#252541]">sequence from Navigator</strong> and the <strong className="text-[#252541]">colors from Decoder</strong>.
            </p>

            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#E58A00]/30 shadow-sm space-y-2.5">
              <div className="text-[0.65rem] font-bold text-[#995C00] tracking-wider uppercase mb-1">
                COOPERATIVE STATUS:
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]">
                <span>Navigator Clue Shared:</span>
                <span className={`font-bold ${cluesSharedByNavigator ? 'text-[#2BB67B]' : 'text-[#8E8EA8]'}`}>
                  {cluesSharedByNavigator ? '✓ Received' : '⏳ Waiting…'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FAF9F6] border border-[#E8E5DC]">
                <span>Decoder Clue Shared:</span>
                <span className={`font-bold ${cluesSharedByDecoder ? 'text-[#2BB67B]' : 'text-[#8E8EA8]'}`}>
                  {cluesSharedByDecoder ? '✓ Received' : '⏳ Waiting…'}
                </span>
              </div>

              {cluesSharedByNavigator && cluesSharedByDecoder && !engineerAcknowledged && (
                <button
                  onClick={acknowledgeSequence}
                  className="btn-mint w-full text-xs py-2 mt-2"
                >
                  ✓ I Understand the Sequence!
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── BROADCAST ACTION BUTTON ── */}
      <div className="mt-4 pt-3 border-t border-[#E8E5DC]">
        {isNavigator && (
          <button
            onClick={() => {
              sounds.playClueShare();
              shareClue('navigator');
            }}
            disabled={cluesSharedByNavigator}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              cluesSharedByNavigator
                ? 'bg-[#F0FAF5] text-[#1A7A4E] border border-[#9BE7C4] cursor-default'
                : 'btn-primary shadow-sm'
            }`}
          >
            {cluesSharedByNavigator ? (
              <>
                <CheckCircle2 size={15} /> Sequence Broadcasted!
              </>
            ) : (
              <>
                <Share2 size={15} /> Share Route Map with Team
              </>
            )}
          </button>
        )}

        {isDecoder && (
          <button
            onClick={() => {
              sounds.playClueShare();
              shareClue('decoder');
            }}
            disabled={cluesSharedByDecoder}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              cluesSharedByDecoder
                ? 'bg-[#F0FAF5] text-[#1A7A4E] border border-[#9BE7C4] cursor-default'
                : 'btn-primary shadow-sm'
            }`}
          >
            {cluesSharedByDecoder ? (
              <>
                <CheckCircle2 size={15} /> Cipher Broadcasted!
              </>
            ) : (
              <>
                <Share2 size={15} /> Share Rune Table with Team
              </>
            )}
          </button>
        )}

        {isEngineer && (
          <div className="text-center text-[0.72rem] text-[#8E8EA8] font-semibold py-1">
            Tap switches in the Engineer Controls panel when ready!
          </div>
        )}
      </div>

      {/* ── BLOOP HINT MODAL ── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHint(false)}
            className="fixed inset-0 z-50 bg-[#252541]/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border-2 border-[#E8E5DC] max-w-sm w-full p-6 text-center shadow-xl relative"
            >
              <Bloop mood="thinking" size={72} className="mx-auto mb-3" />
              <h4 className="font-display font-extrabold text-base text-[#252541] mb-1">
                Need a hand from Bloop?
              </h4>
              <p className="text-xs text-[#7866E8] italic font-semibold mb-3">
                “Bloop is consulting the ancient manual. It is upside down.”
              </p>
              <p className="text-xs text-[#5C5C77] leading-relaxed mb-5">
                {isNavigator &&
                  'Tip: Share your clue first! The route map gives the team the correct 1st, 2nd, and 3rd order.'}
                {isDecoder &&
                  'Tip: Look at the color each rune maps to. Spiral is Cyan, Sun is Amber, and Wave is Violet!'}
                {isEngineer &&
                  'Tip: Once the team shares clues, activate Cyan first, then Amber, then Violet. Do not flip out of order!'}
              </p>
              <button
                onClick={() => setShowHint(false)}
                className="btn-primary w-full text-xs py-2.5"
              >
                Thanks, Bloop!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
