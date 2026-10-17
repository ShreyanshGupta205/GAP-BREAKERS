'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Users,
  Brain,
  Layers,
  ArrowRight,
  Play,
  Heart,
  HelpCircle,
  X,
  Compass,
  FileCode,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import FloatingCityPreview from '@/components/game/FloatingCityPreview';
import Bloop from '@/components/game/Bloop';

export default function LandingPage() {
  const router = useRouter();
  const [showHow, setShowHow] = useState(false);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#FAF9F6',
        color: '#252541',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── TOP NAVBAR ── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(250, 249, 246, 0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1.5px solid #E8E5DC',
          padding: '0.75rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: 1040,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo with Tiny Bridge Symbol */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: '#7866E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 3px 10px rgba(120, 102, 232, 0.3)',
              }}
            >
              {/* Mini Bridge Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 18 C4 12, 20 12, 20 18" />
                <line x1="8" y1="14" x2="8" y2="18" />
                <line x1="16" y1="14" x2="16" y2="18" />
                <line x1="2" y1="18" x2="22" y2="18" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#252541' }}>
                GAP<span style={{ color: '#7866E8' }}>//</span>BREAKERS
              </span>
              <span className="badge-pill badge-purple" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                Built for teamwork
              </span>
            </div>
          </div>

          {/* Links & Primary Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setShowHow(true)}
              className="btn-ghost"
              style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <HelpCircle size={15} /> How It Works
            </button>
            <a
              href="#missions"
              className="btn-ghost"
              style={{ fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}
            >
              Missions
            </a>
            <button
              onClick={() => router.push('/setup')}
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.55rem 1.25rem', gap: '0.4rem' }}
            >
              Play Now <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section
        style={{
          maxWidth: 1040,
          margin: '0 auto',
          padding: '2.5rem 1.5rem 2rem',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* Track Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 999,
            background: '#F0EDFD',
            border: '1.5px solid rgba(120, 102, 232, 0.25)',
            color: '#7866E8',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            marginBottom: '1.25rem',
          }}
        >
          <Sparkles size={14} /> GDG NSUT DEVLYMPICS 2026 · BRIDGE THE GAP
        </motion.div>

        {/* Playful Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 900,
            color: '#252541',
            letterSpacing: '-0.025em',
            lineHeight: 1.12,
            maxWidth: 780,
            margin: '0 auto 1rem',
          }}
        >
          Oops! Reality broke.{' '}
          <span
            style={{
              color: '#7866E8',
              textDecoration: 'underline',
              textDecorationColor: '#FFE28A',
              textDecorationStyle: 'wavy',
              textUnderlineOffset: 6,
            }}
          >
            Can you fix it together?
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: '1.05rem',
            color: '#5C5C77',
            maxWidth: 580,
            margin: '0 auto 1.75rem',
            lineHeight: 1.6,
          }}
        >
          Everyone has a different piece of the puzzle. Share clues, bridge the gaps, and save a world that really needs better communication.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => router.push('/setup')}
            className="btn-primary"
            style={{
              fontSize: '1rem',
              padding: '0.9rem 2.25rem',
              boxShadow: '0 6px 20px rgba(120, 102, 232, 0.25)',
              minWidth: 220,
            }}
          >
            LET'S FIX THIS WORLD →
          </button>
          <button
            onClick={() => setShowHow(true)}
            className="btn-secondary"
            style={{
              fontSize: '1rem',
              padding: '0.9rem 1.75rem',
              minWidth: 180,
            }}
          >
            See How It Works
          </button>
        </motion.div>

        {/* Cute Animated World Illustration with Bloop & Speech Bubbles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ margin: '1rem auto 0', width: '100%' }}
        >
          <FloatingCityPreview />
        </motion.div>
      </section>

      {/* ── 3 DELIGHTFUL FEATURES ── */}
      <section
        style={{
          maxWidth: 1040,
          margin: '0 auto',
          padding: '3rem 1.5rem',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#7866E8',
              display: 'block',
              marginBottom: 4,
            }}
          >
            HOW TEAMWORK WINS
          </span>
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 900, color: '#252541' }}>
            Three simple secrets to rebuilding the world
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Feature 1 */}
          <div
            className="card-clean card-interactive"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 250,
            }}
          >
            <div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: '#EBF5FE',
                  color: '#1D6FB8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  border: '1.5px solid rgba(85, 167, 247, 0.3)',
                }}
              >
                <Users size={24} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#252541', marginBottom: '0.5rem' }}>
                Different Minds, One Mission
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#5C5C77', lineHeight: 1.6 }}>
                Everyone gets different clues. Navigator sees symbols, Decoder has the secret cipher, and Engineer controls the power switches.
              </p>
            </div>
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1.5px solid #E8E5DC',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#1D6FB8',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#55A7F7' }} />
              No single player can win alone
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className="card-clean card-interactive"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 250,
            }}
          >
            <div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: '#F0EDFD',
                  color: '#7866E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  border: '1.5px solid rgba(120, 102, 232, 0.3)',
                }}
              >
                <Brain size={24} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#252541', marginBottom: '0.5rem' }}>
                AI That Gets You
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#5C5C77', lineHeight: 1.6 }}>
                Messages can become simpler, translated into Hindi, or turned into clear visual explanations with one click of Gemini AI.
              </p>
            </div>
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1.5px solid #E8E5DC',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#7866E8',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7866E8' }} />
              Converts confusion into clarity
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className="card-clean card-interactive"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 250,
            }}
          >
            <div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: '#F0FAF5',
                  color: '#1A7A4E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  border: '1.5px solid rgba(155, 231, 196, 0.5)',
                }}
              >
                <Layers size={24} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#252541', marginBottom: '0.5rem' }}>
                Build Bridges Together
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#5C5C77', lineHeight: 1.6 }}>
                Successful teamwork repairs the world. Every piece of shared understanding visibly connects the floating islands across 3 stages.
              </p>
            </div>
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1.5px solid #E8E5DC',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#1A7A4E',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#9BE7C4' }} />
              Real-time bridge progression
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION PREVIEW CARD ── */}
      <section
        id="missions"
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '2rem 1.5rem 4rem',
          width: '100%',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF8FF 100%)',
            borderRadius: 28,
            border: '2px solid rgba(120, 102, 232, 0.25)',
            boxShadow: '0 16px 40px rgba(37, 37, 65, 0.08)',
            padding: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Mission Info */}
          <div style={{ flex: '1 1 360px', minWidth: 280 }}>
            <span
              className="badge-pill badge-yellow"
              style={{ fontSize: '0.72rem', fontWeight: 800, marginBottom: '0.85rem' }}
            >
              ★ READY TO PLAY
            </span>

            <h3
              className="font-display"
              style={{ fontSize: '1.8rem', fontWeight: 900, color: '#252541', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}
            >
              MISSION 01: SAVE THE FLOATING CITY
            </h3>

            <p style={{ fontSize: '0.92rem', color: '#5C5C77', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              “The city's energy core is having a very bad day.”
              <br />
              Synthesize 3 collectible rune symbols across the team to activate the right switches and stop the city from falling into the void.
            </p>

            {/* Collectible-looking Runes */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 12,
                  background: '#E6F9FB',
                  border: '1.5px solid rgba(15, 181, 196, 0.35)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#0A7B85',
                }}
              >
                <span>🌀</span> Spiral (Cyan)
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 12,
                  background: '#FFF6E5',
                  border: '1.5px solid rgba(229, 138, 0, 0.35)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#995C00',
                }}
              >
                <span>☀️</span> Sun (Amber)
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 12,
                  background: '#F3EEFE',
                  border: '1.5px solid rgba(139, 92, 246, 0.35)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#5B34B3',
                }}
              >
                <span>〰️</span> Wave (Violet)
              </div>
            </div>

            {/* CTA & Quick Specs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => router.push('/setup')}
                className="btn-primary"
                style={{ fontSize: '0.95rem', padding: '0.85rem 1.75rem', gap: '0.5rem' }}
              >
                <Play size={16} fill="currentColor" /> Start the Adventure
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', fontWeight: 800, color: '#74748A' }}>
                <div>👥 3 Roles</div>
                <div>⏱️ 3 Min Countdown</div>
                <div>⭐ Friendly Co-op</div>
              </div>
            </div>
          </div>

          {/* Right: Bloop in Spotlight Pedestal (NO TEXT COLLISION!) */}
          <div
            style={{
              width: 170,
              height: 170,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #F0EDFD 0%, #FAF9F6 100%)',
              border: '2px solid rgba(120, 102, 232, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(120, 102, 232, 0.12)',
              flexShrink: 0,
              margin: '0 auto',
            }}
          >
            <Bloop mood="excited" size={110} />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: '1.5px solid #E8E5DC',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: '#74748A',
          background: 'rgba(255, 255, 255, 0.6)',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            maxWidth: 1040,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bloop mood="proud" size={28} animate={false} />
            <span style={{ fontWeight: 800, color: '#252541' }}>GAP//BREAKERS</span> — Rebuilding reality together.
          </div>
          <div>
            Built with <Heart size={13} style={{ display: 'inline', color: '#FF9EAB', fill: '#FF9EAB' }} /> for GDG NSUT Devlympics Shunya 2026.
          </div>
        </div>
      </footer>

      {/* ── HOW IT WORKS MODAL ── */}
      <AnimatePresence>
        {showHow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHow(false)}
            className="fixed inset-0 z-50 bg-[#252541]/45 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border-2 border-[#E8E5DC] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setShowHow(false)}
                className="btn-ghost"
                style={{ position: 'absolute', top: 16, right: 16, padding: 6, borderRadius: 10 }}
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Bloop mood="thinking" size={48} />
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 900, color: '#252541' }}>
                    How to play GAP//BREAKERS
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#74748A' }}>Quick guide: 3 brains, 1 broken bridge.</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <div style={{ padding: '0.85rem 1rem', borderRadius: 16, background: '#EBF5FE', border: '1.5px solid rgba(85, 167, 247, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Compass style={{ color: '#1D6FB8', flexShrink: 0, marginTop: 2 }} size={20} />
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1D6FB8' }}>The Navigator</h4>
                    <p style={{ fontSize: '0.78rem', color: '#5C5C77', marginTop: 2, lineHeight: 1.5 }}>
                      Sees the ancient route map. Knows the correct sequence of symbols (Spiral → Sun → Wave).
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0.85rem 1rem', borderRadius: 16, background: '#F0EDFD', border: '1.5px solid rgba(120, 102, 232, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <FileCode style={{ color: '#7866E8', flexShrink: 0, marginTop: 2 }} size={20} />
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '0.88rem', color: '#7866E8' }}>The Decoder</h4>
                    <p style={{ fontSize: '0.78rem', color: '#5C5C77', marginTop: 2, lineHeight: 1.5 }}>
                      Has the rune table cipher. Knows which symbol maps to which color (Spiral = Cyan, Sun = Amber, Wave = Violet).
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0.85rem 1rem', borderRadius: 16, background: '#FFF6E5', border: '1.5px solid rgba(229, 138, 0, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Wrench style={{ color: '#995C00', flexShrink: 0, marginTop: 2 }} size={20} />
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '0.88rem', color: '#995C00' }}>The Engineer</h4>
                    <p style={{ fontSize: '0.78rem', color: '#5C5C77', marginTop: 2, lineHeight: 1.5 }}>
                      Operates the 3 colored switches. Needs the others to communicate the sequence so they can flip Cyan, then Amber, then Violet!
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowHow(false);
                  router.push('/setup');
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.92rem' }}
              >
                Got It! Let's Play →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
