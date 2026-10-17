'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Zap, Users, Brain, ChevronRight, Play, Info, Globe, Shield } from 'lucide-react';
import FloatingCityPreview from '@/components/game/FloatingCityPreview';

const FEATURES = [
  {
    icon: Globe,
    title: 'Different Perspectives',
    desc: 'Every player sees a unique piece of reality. Navigator, Decoder, or Engineer — your role determines what you know.',
    color: 'cyan',
  },
  {
    icon: Brain,
    title: 'Adaptive AI',
    desc: 'Real-time language translation, message simplification, and visual explanations powered by Gemini AI.',
    color: 'violet',
  },
  {
    icon: Users,
    title: 'Rebuild Together',
    desc: 'Combine your clues, communicate across barriers, and reconstruct the living bridge through genuine teamwork.',
    color: 'amber',
  },
];

const STEPS = [
  { num: '01', title: 'Choose Your Role', desc: 'Pick Navigator, Decoder, or Engineer — each with exclusive information.' },
  { num: '02', title: 'Share & Decode', desc: 'Exchange clues, use AI to translate and clarify. Understanding is the key.' },
  { num: '03', title: 'Rebuild Reality', desc: 'Solve the energy sequence together. Watch the bridge come back to life.' },
];

export default function LandingPage() {
  const router = useRouter();
  const [showHow, setShowHow] = useState(false);

  return (
    <main style={{ background: 'var(--color-void)', minHeight: '100dvh', overflowX: 'hidden' }}>
      {/* Ambient background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '10%', left: '15%', width: 500, height: 500,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '10%', width: 400, height: 400,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', width: 600, height: 600, transform: 'translate(-50%,-50%)',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.03) 0%, transparent 70%)',
        }} />
      </div>

      {/* Nav */}
      <nav style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid rgba(0,245,255,0.08)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Zap size={20} color="var(--color-cyan)" />
          <span className="font-display" style={{ color: 'var(--color-cyan)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em' }}>
            GAP//BREAKERS
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-ghost" onClick={() => setShowHow(true)}>
            <Info size={14} /> How It Works
          </button>
          <button className="btn-secondary" onClick={() => router.push('/setup')} style={{ padding: '0.5rem 1.25rem' }}>
            Enter
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', zIndex: 1, padding: '5rem 2rem 3rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
          <div className="badge badge-cyan" style={{ marginBottom: '1.5rem', fontSize: '0.65rem' }}>
            <Shield size={10} /> HACKATHON BUILD — BRIDGE THE GAP 2026
          </div>

          <h1 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}>
            <span style={{ color: 'var(--color-text-primary)' }}>THE WORLD IS</span>{' '}
            <span className="gradient-text-cyan-violet">BROKEN.</span>
            <br />
            <span style={{ color: 'var(--color-text-primary)' }}>CONNECTION IS THE</span>
            <br />
            <span className="gradient-text-amber-violet">ONLY WAY OUT.</span>
          </h1>

          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: 640,
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}>
            Each player holds a different piece of reality. Navigate different languages, perspectives, and communication needs to repair the floating city together — or watch it fall.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              className="btn-primary"
              style={{ fontSize: '0.9rem', padding: '1rem 2.5rem' }}
              onClick={() => router.push('/setup')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Play size={16} fill="currentColor" /> ENTER THE RIFT
            </motion.button>
            <motion.button
              className="btn-secondary"
              onClick={() => setShowHow(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              HOW IT WORKS <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Floating City Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16,1,0.3,1] }}
          style={{ margin: '4rem auto 0', maxWidth: 900 }}
        >
          <FloatingCityPreview />
        </motion.div>
      </section>

      {/* GDG NSUT Hackathon Spotlight: Problem Statement & The Bridge */}
      <section style={{ position: 'relative', zIndex: 1, padding: '2rem 2rem 4rem', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          className="card-glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            border: '1px solid rgba(0,245,255,0.25)',
            background: 'radial-gradient(circle at top left, rgba(0,245,255,0.06), rgba(15,26,64,0.7) 60%)',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="badge badge-cyan" style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}>
              GDG NSUT · DEVLYMPICS SHUNYA 2026
            </div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-amber)' }}>
              THEME: BRIDGE THE GAP
            </div>
          </div>

          <h2 className="font-display" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
            "Which two sides should connect, and what exists between them?"
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 850, marginBottom: '2rem' }}>
            In GAP//BREAKERS, we redefine what it means to be a bridge. Rather than a static form, the bridge is both the functional mechanism and the living visual metaphor. Three players separated by information asymmetry, language barriers, and technical roles must synthesize their mental models to literally rebuild reality.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Side A */}
            <div style={{ background: 'rgba(5,8,22,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '1.25rem' }}>
              <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-cyan)', marginBottom: '0.5rem' }}>
                SIDE A · ISOLATED PERSPECTIVES
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                Information & Role Asymmetry
              </h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                The Navigator has the spatial symbol order. The Decoder has the cipher index. The Engineer has the control panel. Zero players have enough information to solve the mission alone.
              </p>
            </div>

            {/* The Bridge */}
            <div style={{ background: 'rgba(5,8,22,0.6)', border: '1px solid rgba(0,245,255,0.3)', borderRadius: 10, padding: '1.25rem' }}>
              <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>
                THE BRIDGE · ADAPTIVE AI & SYNC
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                On-Demand Translation & Clarity
              </h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Gemini AI dynamically translates (Hindi ↔ English), simplifies cognitive load into key steps, and generates ASCII visual schematics to turn fragmented clues into shared comprehension.
              </p>
            </div>

            {/* Side B */}
            <div style={{ background: 'rgba(5,8,22,0.6)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 10, padding: '1.25rem' }}>
              <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-violet)', marginBottom: '0.5rem' }}>
                SIDE B · SHATTERED REALITY
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                Dynamic 3-Stage Reconstruction
              </h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                As players communicate, the shattered energy bridge reacts in real time: glowing upon first clue, repairing its center upon mutual understanding, and restoring the floating city upon resolution.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section style={{ position: 'relative', zIndex: 1, padding: '2rem 2rem 5rem', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}>
            THE GAP IS REAL
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.75rem' }}>
            Three innovations working together to bridge difference into action
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="card-glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16,1,0.3,1] }}
              whileHover={{ y: -4, borderColor: `var(--color-${f.color})` }}
              style={{ transition: 'border-color 0.2s' }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `rgba(var(--color-${f.color}-rgb, 0,245,255), 0.1)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
                border: `1px solid var(--color-${f.color}-glow, rgba(0,245,255,0.2))`,
              }}>
                <f.icon size={22} color={`var(--color-${f.color})`} />
              </div>
              <h3 className="font-display" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '0.75rem', color: `var(--color-${f.color})` }}>
                {f.title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works (steps) */}
      <section style={{ position: 'relative', zIndex: 1, padding: '3rem 2rem 5rem', maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}>
            THREE STEPS TO REBUILD
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              className="card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div className="font-display" style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(0,245,255,0.08)', position: 'absolute', top: '0.5rem', right: '1rem' }}>
                {s.num}
              </div>
              <div className="font-mono" style={{ color: 'var(--color-cyan)', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                STEP {s.num}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission preview card */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 2rem 6rem', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          className="card-glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(0,245,255,0.05), rgba(139,92,246,0.05))',
            border: '1px solid rgba(0,245,255,0.2)',
          }}
        >
          <div className="badge badge-amber" style={{ marginBottom: '1rem' }}>NOW AVAILABLE</div>
          <h3 className="font-display" style={{ fontSize: '1.5rem', letterSpacing: '0.1em', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
            MISSION 01
          </h3>
          <p className="font-display" style={{ fontSize: '0.8rem', color: 'var(--color-cyan)', letterSpacing: '0.15em', marginBottom: '1rem' }}>
            SAVE THE FLOATING CITY
          </p>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
            The city's energy core is failing. A broken bridge separates the team from salvation. Three players, three perspectives, one impossible mission.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'PLAYERS', val: '3' },
              { label: 'DURATION', val: '3 MIN' },
              { label: 'DIFFICULTY', val: 'TEAM' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display" style={{ fontSize: '1.25rem', color: 'var(--color-cyan)' }}>{stat.val}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <button
            className="btn-primary"
            style={{ width: '100%', maxWidth: 300, fontSize: '0.85rem' }}
            onClick={() => router.push('/setup')}
          >
            <Play size={14} fill="currentColor" /> START MISSION
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '1.5rem 2rem',
        textAlign: 'center',
        color: 'var(--color-text-muted)',
        fontSize: '0.8rem',
        position: 'relative', zIndex: 1,
      }}>
        GAP//BREAKERS — Built for Devlympics Shunya 2026 · Bridge the Gap Challenge
      </footer>

      {/* How It Works Modal */}
      <AnimatePresence>
        {showHow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHow(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="card-glass"
              style={{ maxWidth: 560, width: '100%' }}
            >
              <h2 className="font-display" style={{ fontSize: '1.2rem', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--color-cyan)' }}>
                HOW GAP//BREAKERS WORKS
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { role: 'NAVIGATOR', color: 'var(--color-cyan)', desc: 'Sees the route map — the correct order of rune symbols.' },
                  { role: 'DECODER', color: 'var(--color-violet)', desc: 'Has the rune table — knows which color each symbol means.' },
                  { role: 'ENGINEER', color: 'var(--color-amber)', desc: 'Controls the power switches — needs the others to tell them the sequence.' },
                ].map((r) => (
                  <div key={r.role} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span className="badge" style={{ background: 'transparent', border: `1px solid ${r.color}`, color: r.color, flexShrink: 0 }}>{r.role}</span>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{r.desc}</p>
                  </div>
                ))}
              </div>
              <div className="divider" />
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Players communicate through the built-in chat. Use AI tools to translate messages, simplify complex clues, or visualize information. The bridge reconstructs as you make real progress — not just from sending messages.
              </p>
              <button className="btn-primary" style={{ width: '100%' }} onClick={() => { setShowHow(false); router.push('/setup'); }}>
                <Play size={14} fill="currentColor" /> Let's Play
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
