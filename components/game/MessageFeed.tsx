'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap, Globe, Eye, HelpCircle, Loader2 } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { GameMessage, TransformAction } from '@/types/game';
import { transformMessage } from '@/lib/ai/types';

const ROLE_COLORS = {
  navigator: 'var(--color-cyan)',
  decoder: 'var(--color-violet)',
  engineer: 'var(--color-amber)',
};

const ROLE_LABELS = { navigator: 'NAV', decoder: 'DEC', engineer: 'ENG' };

export default function MessageFeed() {
  const { messages, addMessage, currentPlayer, soloViewRole, teamPlayers, incrementAIUsage, incrementClarifications, soloMode, phase } = useGameStore();
  const [draft, setDraft] = useState('');
  const [transforming, setTransforming] = useState<string | null>(null);
  const [expandedMsg, setExpandedMsg] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const content = draft.trim();
    if (!content) return;

    const msg: GameMessage = {
      id: crypto.randomUUID(),
      playerId: currentPlayer?.id ?? 'solo',
      playerName: currentPlayer?.displayName ?? (soloMode ? ROLE_LABELS[soloViewRole] : 'Player'),
      role: soloViewRole,
      content,
      timestamp: Date.now(),
    };

    addMessage(msg);
    setDraft('');
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

    // Add transformed message to feed
    const transformed: GameMessage = {
      id: crypto.randomUUID(),
      playerId: 'ai-transform',
      playerName: `AI · ${action.replace('_', ' ')}`,
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0' }}>
      {/* Feed */}
      <div
        ref={feedRef}
        className="panel-scroll"
        style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.8rem', padding: '2rem 1rem', lineHeight: 1.6 }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💬</div>
            Share clues with your team here. Use AI tools to translate or simplify messages.
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg) => {
            const isAI = msg.playerId === 'ai-transform';
            const color = isAI ? 'var(--color-text-muted)' : ROLE_COLORS[msg.role];
            const isExpanded = expandedMsg === msg.id;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  padding: '0.6rem 0.75rem',
                  borderRadius: 8,
                  background: isAI ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.25)',
                  border: `1px solid ${isAI ? 'rgba(255,255,255,0.06)' : color + '20'}`,
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  {!isAI && (
                    <span className="font-mono" style={{ fontSize: '0.65rem', fontWeight: 700, color, background: color + '15', padding: '0.1rem 0.4rem', borderRadius: 3 }}>
                      {ROLE_LABELS[msg.role]}
                    </span>
                  )}
                  {isAI && <Zap size={10} color="var(--color-text-muted)" />}
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isAI ? 'var(--color-text-muted)' : color }}>
                    {msg.playerName}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {isAI && (
                    <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.3rem', borderRadius: 3 }}>
                      {msg.transformAction?.replace('_', ' ')}
                    </span>
                  )}
                </div>

                {/* Message content */}
                <p style={{ fontSize: '0.82rem', color: isAI ? 'var(--color-text-secondary)' : 'var(--color-text-primary)', lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {msg.content}
                </p>

                {/* AI action buttons on user messages */}
                {!isAI && canSend && (
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {([
                      { action: 'translate' as TransformAction, icon: Globe, label: 'Translate' },
                      { action: 'simplify' as TransformAction, icon: Eye, label: 'Simplify' },
                      { action: 'visualize' as TransformAction, icon: Zap, label: 'Visualize' },
                      { action: 'explain_differently' as TransformAction, icon: HelpCircle, label: 'Explain' },
                    ].map(({ action, icon: Icon, label }) => {
                      const tid = `${msg.id}-${action}`;
                      const busy = transforming === tid;
                      return (
                        <button
                          key={action}
                          onClick={() => !busy && handleTransform(msg.id, msg.content, action)}
                          disabled={busy}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.25rem',
                            padding: '0.2rem 0.5rem', borderRadius: 4,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'var(--color-text-muted)',
                            fontSize: '0.65rem', cursor: busy ? 'not-allowed' : 'pointer',
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={(e) => { if (!busy) { (e.target as HTMLElement).style.color = 'var(--color-cyan)'; (e.target as HTMLElement).style.borderColor = 'rgba(0,245,255,0.3)'; } }}
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-text-muted)'; (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
                        >
                          {busy ? <Loader2 size={9} style={{ animation: 'spin 1s linear infinite' }} /> : <Icon size={9} />}
                          {label}
                        </button>
                      );
                    }))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Composer */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
          <textarea
            className="input"
            placeholder={canSend ? 'Share a clue with your team...' : 'Mission ended'}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!canSend}
            rows={2}
            style={{ flex: 1, resize: 'none', fontSize: '0.85rem', padding: '0.6rem 0.75rem' }}
          />
          <motion.button
            className="btn-cyan"
            onClick={handleSend}
            disabled={!draft.trim() || !canSend}
            whileHover={draft.trim() && canSend ? { scale: 1.05 } : {}}
            whileTap={draft.trim() && canSend ? { scale: 0.95 } : {}}
            style={{ padding: '0.6rem', flexShrink: 0, opacity: !draft.trim() || !canSend ? 0.4 : 1 }}
          >
            <Send size={16} />
          </motion.button>
        </div>
        <p style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
          Enter to send · Select AI actions on any message
        </p>
      </div>
    </div>
  );
}
