'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  Globe,
  Zap,
  Eye,
  HelpCircle,
  Loader2,
  Bot,
  MessageCircle,
} from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { GameMessage, TransformAction } from '@/types/game';
import { transformMessage } from '@/lib/ai/types';
import Bloop from './Bloop';
import { sounds } from '@/lib/audio/soundEffects';

const ROLE_BADGES = {
  navigator: { bg: '#EBF5FE', text: '#1D6FB8', label: 'NAV' },
  decoder: { bg: '#F0EDFD', text: '#7866E8', label: 'DEC' },
  engineer: { bg: '#FFF6E5', text: '#995C00', label: 'ENG' },
};

export default function MessageFeed() {
  const {
    messages,
    addMessage,
    currentPlayer,
    soloViewRole,
    teamPlayers,
    incrementAIUsage,
    incrementClarifications,
    soloMode,
    phase,
  } = useGameStore();

  const [draft, setDraft] = useState('');
  const [transforming, setTransforming] = useState<string | null>(null);
  const [toastFeedback, setToastFeedback] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages]);

  const showToast = (text: string) => {
    setToastFeedback(text);
    setTimeout(() => setToastFeedback(null), 3000);
  };

  const handleSend = () => {
    const content = draft.trim();
    if (!content) return;

    const msg: GameMessage = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `msg-${Date.now()}`,
      playerId: currentPlayer?.id ?? 'solo',
      playerName: currentPlayer?.displayName ?? (soloMode ? soloViewRole.toUpperCase() : 'Player'),
      role: soloViewRole,
      content,
      timestamp: Date.now(),
    };

    sounds.playBloopPop();
    addMessage(msg);
    setDraft('');
    showToast('Message delivered. Bridge vibes improving. ✨');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTransform = async (msgId: string, msgContent: string, action: TransformAction) => {
    setTransforming(`${msgId}-${action}`);

    const targetPlayer = teamPlayers.find((p) => !p.isCurrentPlayer);
    const targetLang = targetPlayer?.language ?? 'hi';

    const result = await transformMessage({
      message: msgContent,
      action,
      targetLanguage: action === 'translate' ? targetLang : undefined,
      context: 'game: rune sequence, bridge repair, energy core',
    });

    incrementAIUsage();
    if (action === 'explain_differently') incrementClarifications();

    if (action === 'translate') {
      showToast('Translation ready. Human brain compatible. 🌐');
    } else if (action === 'simplify') {
      showToast('Simplified! Cognitive load reduced. 💡');
    } else {
      showToast('A little confusing? Try another explanation. 🔄');
    }

    sounds.playBloopPop();

    // Add transformed message to feed
    const transformed: GameMessage = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `ai-${Date.now()}`,
      playerId: 'ai-transform',
      playerName: `Gemini AI · ${action.replace('_', ' ').toUpperCase()}`,
      role: soloViewRole,
      content: result.transformed,
      transformedContent: result.transformed,
      transformAction: action,
      timestamp: Date.now(),
    };

    addMessage(transformed);
    setTransforming(null);
  };

  const canSend = phase !== 'victory' && phase !== 'failure';

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Toast Feedback Banner */}
      <AnimatePresence>
        {toastFeedback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#F0FAF5] border-b border-[#9BE7C4] px-3 py-1.5 text-center text-xs font-bold text-[#1A7A4E] shrink-0"
          >
            {toastFeedback}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Scroll Area */}
      <div
        ref={feedRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
      >
        {messages.length === 0 ? (
          <div className="text-center py-8 px-4 text-[#8E8EA8]">
            <Bloop mood="thinking" size={48} className="mx-auto mb-2 opacity-75" />
            <p className="text-xs font-bold text-[#5C5C77] mb-1">Comm Channel Open</p>
            <p className="text-[0.72rem] leading-relaxed">
              Share your rune clues here. Use AI buttons to translate, simplify, or visualize messages for teammates!
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isAI = msg.playerId === 'ai-transform';
            const roleBadge = ROLE_BADGES[msg.role] || ROLE_BADGES.navigator;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-2xl text-xs border ${
                  isAI
                    ? 'bg-[#F0EDFD]/50 border-[#7866E8]/20'
                    : 'bg-[#FAF9F6] border-[#E8E5DC]'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {!isAI ? (
                      <span
                        className="font-bold text-[0.65rem] px-1.5 py-0.5 rounded-md"
                        style={{ background: roleBadge.bg, color: roleBadge.text }}
                      >
                        {roleBadge.label}
                      </span>
                    ) : (
                      <span className="badge-pill badge-purple text-[0.62rem] px-1.5 py-0.5">
                        <Bot size={10} /> AI
                      </span>
                    )}

                    <span className="font-bold text-[#252541] truncate max-w-[120px]">
                      {msg.playerName}
                    </span>
                  </div>

                  <span className="text-[0.65rem] text-[#8E8EA8]">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Message Text */}
                <div className="text-[#252541] text-xs leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>

                {/* Action Buttons for User Messages */}
                {!isAI && canSend && (
                  <div className="mt-2.5 pt-2 border-t border-[#E8E5DC] flex flex-wrap gap-1.5">
                    <button
                      onClick={() => handleTransform(msg.id, msg.content, 'translate')}
                      disabled={transforming !== null}
                      className="px-2 py-1 rounded-lg bg-white border border-[#E8E5DC] text-[0.65rem] font-bold text-[#55A7F7] hover:border-[#55A7F7] flex items-center gap-1 transition-all"
                    >
                      <Globe size={11} /> Translate (हिंदी)
                    </button>

                    <button
                      onClick={() => handleTransform(msg.id, msg.content, 'simplify')}
                      disabled={transforming !== null}
                      className="px-2 py-1 rounded-lg bg-white border border-[#E8E5DC] text-[0.65rem] font-bold text-[#7866E8] hover:border-[#7866E8] flex items-center gap-1 transition-all"
                    >
                      <Zap size={11} /> Simplify
                    </button>

                    <button
                      onClick={() => handleTransform(msg.id, msg.content, 'visualize')}
                      disabled={transforming !== null}
                      className="px-2 py-1 rounded-lg bg-white border border-[#E8E5DC] text-[0.65rem] font-bold text-[#9BE7C4-dark] text-[#1A7A4E] hover:border-[#9BE7C4] flex items-center gap-1 transition-all"
                    >
                      <Eye size={11} /> Visualize
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Input Composer */}
      <div className="p-2.5 border-t border-[#E8E5DC] bg-[#FAF9F6]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={canSend ? 'Send a clue or message…' : 'Mission ended'}
            disabled={!canSend}
            className="flex-1 px-3 py-2 rounded-xl border border-[#E8E5DC] bg-white text-xs text-[#252541] placeholder-[#8E8EA8] focus:border-[#7866E8] outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!draft.trim() || !canSend}
            className="btn-primary text-xs p-2 rounded-xl shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
