'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Volume2,
  FileText,
  Zap,
  Globe,
  Dices,
} from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { PlayerProfile, AvatarId, Language, CommunicationFormat } from '@/types/game';
import Avatar, { AVATAR_LIST } from '@/components/game/Avatars';
import Bloop from '@/components/game/Bloop';

const FUN_NAMES = ['Captain Bloop', 'Phoenix', 'Astro Pip', 'Rune Seeker', 'Puzzle Fox', 'Circuit Cat'];

export default function SetupPage() {
  const router = useRouter();
  const { setPlayer } = useGameStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [displayName, setDisplayName] = useState('Phoenix');
  const [avatarId, setAvatarId] = useState<AvatarId>('avatar-1');
  const [language, setLanguage] = useState<Language>('en');
  const [commFormat, setCommFormat] = useState<CommunicationFormat>('text');
  const [error, setError] = useState('');

  const selectedAvatarMeta = AVATAR_LIST.find((a) => a.id === avatarId) || AVATAR_LIST[0];

  const handleRandomName = () => {
    const random = FUN_NAMES[Math.floor(Math.random() * FUN_NAMES.length)];
    setDisplayName(random);
    setError('');
  };

  const handleNext = () => {
    if (step === 1) {
      if (!displayName.trim()) {
        setError('Please give your player a friendly nickname!');
        return;
      }
      if (displayName.trim().length < 2) {
        setError('Nickname must be at least 2 characters');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      const profile: PlayerProfile = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `player-${Date.now()}`,
        displayName: displayName.trim(),
        avatarId,
        language,
        commFormat,
        highContrast: false,
        reducedMotion: false,
      };

      setPlayer(profile);
      router.push('/lobby');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#FAF9F6', color: '#252541', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem' }}>
      {/* Header */}
      <header style={{ maxWidth: 600, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
        <button
          onClick={() => (step > 1 ? setStep((step - 1) as 1 | 2) : router.push('/'))}
          className="btn-ghost"
          style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} /> {step > 1 ? 'Back' : 'Home'}
        </button>

        {/* Step dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                height: 8,
                borderRadius: 999,
                width: step === s ? 32 : 8,
                background: step === s ? '#7866E8' : step > s ? '#9BE7C4' : '#E8E5DC',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8E8EA8' }}>Step {step} of 3</span>
      </header>

      {/* Main Card */}
      <div style={{ maxWidth: 580, margin: 'auto', width: '100%', padding: '1rem 0' }}>
        <div
          className="card-clean"
          style={{
            padding: '2rem',
            background: '#FFFFFF',
            borderRadius: 24,
            border: '2px solid #E8E5DC',
            boxShadow: '0 8px 30px rgba(37,37,65,0.08)',
            position: 'relative',
          }}
        >
          {/* Top Bloop reaction */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Bloop
              mood={step === 1 ? 'excited' : step === 2 ? 'thinking' : 'proud'}
              size={54}
            />
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7866E8', display: 'block' }}>
                {step === 1 ? 'Step 1: Meet Your Player' : step === 2 ? 'Step 2: Communication Style' : 'Step 3: Preferred Language'}
              </span>
              <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#252541' }}>
                {step === 1 && 'Who is entering the rift?'}
                {step === 2 && 'How do you like to talk?'}
                {step === 3 && 'Choose your native tongue'}
              </h2>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ── STEP 1: NICKNAME & AVATAR ── */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5C5C77' }}>
                      Nickname
                    </label>
                    <button
                      type="button"
                      onClick={handleRandomName}
                      style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7866E8', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <Dices size={13} /> Randomize
                    </button>
                  </div>

                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      setError('');
                    }}
                    maxLength={20}
                    placeholder="e.g. Phoenix"
                    className="input-cute"
                  />
                  <p style={{ fontSize: '0.75rem', color: '#8E8EA8', marginTop: '0.35rem' }}>
                    Pick a name your teammates will remember. No pressure. Probably.
                  </p>
                  {error && <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F25A71', marginTop: '0.25rem' }}>{error}</p>}
                </div>

                {/* Avatar Picker */}
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5C5C77', display: 'block', marginBottom: '0.65rem' }}>
                    Choose Your Look
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
                    {AVATAR_LIST.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setAvatarId(av.id)}
                        style={{
                          padding: '0.5rem 0.25rem',
                          borderRadius: 16,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.3rem',
                          transition: 'all 0.15s ease',
                          border: avatarId === av.id ? '2px solid #7866E8' : '2px solid #E8E5DC',
                          background: avatarId === av.id ? '#F0EDFD' : '#FFFFFF',
                          cursor: 'pointer',
                        }}
                      >
                        <Avatar id={av.id} size={42} />
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#252541' }}>
                          {av.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Preview Card */}
                <div style={{ padding: '0.85rem', borderRadius: 16, background: '#FAF9F6', border: '1px solid #E8E5DC', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Avatar id={avatarId} size={46} />
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#7866E8' }}>LIVE PREVIEW</div>
                    <div className="font-display" style={{ fontWeight: 800, fontSize: '1rem', color: '#252541' }}>
                      {displayName || 'Anonymous'}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#8E8EA8' }}>{selectedAvatarMeta.subtitle}</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: COMMUNICATION PREFERENCES ── */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <p style={{ fontSize: '0.85rem', color: '#5C5C77' }}>
                  GAP//BREAKERS supports accessible, personalized team collaboration. How do you prefer receiving team clues?
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {[
                    { id: 'text', label: 'Text Chat', desc: 'Standard written clues & messages', icon: MessageSquare, color: '#55A7F7' },
                    { id: 'simplified', label: 'Simplified Explanations', desc: 'Concise, high-clarity bullet points', icon: Zap, color: '#7866E8' },
                    { id: 'captions', label: 'Structured Captions', desc: 'High contrast text with icons', icon: FileText, color: '#9BE7C4' },
                    { id: 'audio', label: 'Voice / Audio Friendly', desc: 'Optimized for audio cues & readouts', icon: Volume2, color: '#FFE28A' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCommFormat(item.id as CommunicationFormat)}
                      style={{
                        padding: '1rem',
                        borderRadius: 16,
                        textAlign: 'left',
                        border: commFormat === item.id ? '2px solid #7866E8' : '2px solid #E8E5DC',
                        background: commFormat === item.id ? '#F0EDFD' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <item.icon size={20} style={{ color: item.color }} />
                        {commFormat === item.id && (
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7866E8' }} />
                        )}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#252541', marginBottom: '0.2rem' }}>{item.label}</div>
                      <div style={{ fontSize: '0.72rem', color: '#8E8EA8', lineHeight: 1.3 }}>{item.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: LANGUAGE SELECTION ── */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <p style={{ fontSize: '0.85rem', color: '#5C5C77' }}>
                  Gemini AI can translate between team languages dynamically so you and your teammates always understand each other.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { code: 'en', label: 'English', sub: 'Default Mission Command language', greeting: 'Hello, teammate!' },
                    { code: 'hi', label: 'हिंदी (Hindi)', sub: 'भारतीय भाषाओं में AI अनुवाद समर्थन', greeting: 'नमस्ते, साथी खिलाड़ी!' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setLanguage(lang.code as Language)}
                      style={{
                        padding: '1rem',
                        borderRadius: 16,
                        textAlign: 'left',
                        border: language === lang.code ? '2px solid #7866E8' : '2px solid #E8E5DC',
                        background: language === lang.code ? '#F0EDFD' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FFFFFF', border: '1px solid #E8E5DC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', color: '#7866E8' }}>
                          {lang.code.toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#252541' }}>{lang.label}</div>
                          <div style={{ fontSize: '0.72rem', color: '#8E8EA8' }}>{lang.sub}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700, color: '#7866E8', background: '#FFFFFF', padding: '0.25rem 0.65rem', borderRadius: 999, border: '1px solid rgba(120, 102, 232, 0.2)' }}>
                        {lang.greeting}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #E8E5DC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as 1 | 2)}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
              >
                Previous
              </button>
            ) : (
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8E8EA8' }}>No registration needed!</span>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="btn-primary"
              style={{ fontSize: '0.88rem', padding: '0.75rem 2rem' }}
            >
              {step < 3 ? 'Continue →' : "LET'S GO! 🚀"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <footer style={{ textAlign: 'center', fontSize: '0.75rem', color: '#8E8EA8', padding: '0.5rem 0' }}>
        GAP//BREAKERS · Ready for single-player practice or multiplayer team rooms.
      </footer>
    </main>
  );
}
