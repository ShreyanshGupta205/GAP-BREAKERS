'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { User, Zap, ChevronRight, ChevronLeft } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { PlayerProfile, AvatarId, Language, CommunicationFormat } from '@/types/game';

const AVATARS: { id: AvatarId; symbol: string; label: string; color: string }[] = [
  { id: 'avatar-1', symbol: '🧭', label: 'Explorer', color: 'var(--color-cyan)' },
  { id: 'avatar-2', symbol: '🔮', label: 'Mystic', color: 'var(--color-violet)' },
  { id: 'avatar-3', symbol: '⚡', label: 'Surge', color: 'var(--color-amber)' },
  { id: 'avatar-4', symbol: '🌌', label: 'Void', color: 'var(--color-cyan)' },
  { id: 'avatar-5', symbol: '🔬', label: 'Analyst', color: 'var(--color-violet)' },
  { id: 'avatar-6', symbol: '🛡️', label: 'Guardian', color: 'var(--color-amber)' },
];

const LANGUAGES: { value: Language; label: string; native: string }[] = [
  { value: 'en', label: 'English', native: 'English' },
  { value: 'hi', label: 'Hindi', native: 'हिंदी' },
];

const COMM_FORMATS: { value: CommunicationFormat; label: string; desc: string }[] = [
  { value: 'text', label: 'Text', desc: 'Standard written messages' },
  { value: 'simplified', label: 'Simplified', desc: 'Easy-to-read plain language' },
  { value: 'captions', label: 'Captions', desc: 'Clear, structured captions' },
  { value: 'audio', label: 'Audio', desc: 'Voice-first communication' },
];

export default function SetupPage() {
  const router = useRouter();
  const { setPlayer } = useGameStore();

  const [displayName, setDisplayName] = useState('');
  const [avatarId, setAvatarId] = useState<AvatarId>('avatar-1');
  const [language, setLanguage] = useState<Language>('en');
  const [commFormat, setCommFormat] = useState<CommunicationFormat>('text');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!displayName.trim()) {
      setError('Please enter a display name');
      return;
    }
    if (displayName.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    const profile: PlayerProfile = {
      id: crypto.randomUUID(),
      displayName: displayName.trim(),
      avatarId,
      language,
      commFormat,
      highContrast,
      reducedMotion,
    };

    setPlayer(profile);
    router.push('/lobby');
  };

  const handlePractice = () => {
    const profile: PlayerProfile = {
      id: crypto.randomUUID(),
      displayName: displayName.trim() || 'Solo Player',
      avatarId,
      language,
      commFormat,
      highContrast,
      reducedMotion,
    };
    setPlayer(profile);
    router.push('/lobby?mode=practice');
  };

  return (
    <main style={{ minHeight: '100dvh', background: 'var(--color-void)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      {/* Ambient */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: 560, position: 'relative', zIndex: 1 }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Zap size={16} color="var(--color-cyan)" />
            <span className="font-display" style={{ color: 'var(--color-cyan)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>GAP//BREAKERS</span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            CONFIGURE AGENT
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Set up your identity before entering the rift
          </p>
        </div>

        <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Display name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontFamily: 'var(--font-orbitron)' }}>
              AGENT NAME
            </label>
            <input
              className="input"
              type="text"
              placeholder="Enter your display name..."
              value={displayName}
              onChange={(e) => { setDisplayName(e.target.value); setError(''); }}
              maxLength={20}
              autoFocus
            />
            {error && <p style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginTop: '0.4rem' }}>{error}</p>}
          </div>

          {/* Avatar */}
          <div>
            <label className="font-display" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
              AVATAR
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
              {AVATARS.map((av) => (
                <motion.button
                  key={av.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAvatarId(av.id)}
                  title={av.label}
                  style={{
                    background: avatarId === av.id ? `rgba(0,245,255,0.15)` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${avatarId === av.id ? av.color : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 8,
                    padding: '0.75rem 0.25rem',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.2rem',
                    transition: 'all 0.15s',
                  }}
                >
                  <span>{av.symbol}</span>
                  <span style={{ fontSize: '0.55rem', color: avatarId === av.id ? av.color : 'var(--color-text-muted)', fontFamily: 'var(--font-orbitron)', letterSpacing: '0.05em' }}>{av.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="font-display" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
              PREFERRED LANGUAGE
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: 8,
                    border: `1px solid ${language === lang.value ? 'var(--color-cyan)' : 'rgba(255,255,255,0.08)'}`,
                    background: language === lang.value ? 'rgba(0,245,255,0.1)' : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontWeight: 600, color: language === lang.value ? 'var(--color-cyan)' : 'var(--color-text-primary)', fontSize: '0.9rem' }}>{lang.label}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{lang.native}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Communication format */}
          <div>
            <label className="font-display" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
              COMMUNICATION FORMAT
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {COMM_FORMATS.map((cf) => (
                <button
                  key={cf.value}
                  onClick={() => setCommFormat(cf.value)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 8,
                    border: `1px solid ${commFormat === cf.value ? 'var(--color-violet)' : 'rgba(255,255,255,0.08)'}`,
                    background: commFormat === cf.value ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontWeight: 600, color: commFormat === cf.value ? 'var(--color-violet)' : 'var(--color-text-primary)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>{cf.label}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{cf.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <label className="font-display" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
              ACCESSIBILITY
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { key: 'highContrast', label: 'High Contrast Mode', val: highContrast, set: setHighContrast },
                { key: 'reducedMotion', label: 'Reduced Motion', val: reducedMotion, set: setReducedMotion },
              ].map((opt) => (
                <label key={opt.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: 6 }}>
                  <input
                    type="checkbox"
                    checked={opt.val}
                    onChange={(e) => opt.set(e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: 'var(--color-cyan)', cursor: 'pointer' }}
                  />
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <motion.button
              className="btn-primary"
              style={{ width: '100%', fontSize: '0.85rem', padding: '0.9rem' }}
              onClick={handleContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              CONTINUE TO LOBBY <ChevronRight size={16} />
            </motion.button>
            <button
              className="btn-ghost"
              style={{ width: '100%', fontSize: '0.8rem' }}
              onClick={handlePractice}
            >
              Skip setup — Practice Mode
            </button>
          </div>
        </div>

        {/* Back */}
        <button className="btn-ghost" onClick={() => router.push('/')} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ChevronLeft size={14} /> Back to Home
        </button>
      </motion.div>
    </main>
  );
}
