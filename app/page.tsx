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
  Info,
  Play,
  Heart,
  HelpCircle,
  X,
  Compass,
  FileCode,
  Wrench,
} from 'lucide-react';
import FloatingCityPreview from '@/components/game/FloatingCityPreview';
import Bloop from '@/components/game/Bloop';

export default function LandingPage() {
  const router = useRouter();
  const [showHow, setShowHow] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#252541] overflow-x-hidden selection:bg-[#7866E8] selection:text-white">
      {/* ── TOP NAVBAR ── */}
      <nav className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E8E5DC] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo with Tiny Bridge Symbol */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-9 h-9 rounded-xl bg-[#7866E8] flex items-center justify-center text-white shadow-sm shadow-[#7866E8]/30">
              {/* Mini Bridge Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 18 C4 12, 20 12, 20 18" />
                <line x1="8" y1="14" x2="8" y2="18" />
                <line x1="16" y1="14" x2="16" y2="18" />
                <line x1="2" y1="18" x2="22" y2="18" />
              </svg>
            </div>
            <div>
              <span className="font-display text-lg tracking-tight text-[#252541]">
                GAP<span className="text-[#7866E8]">//</span>BREAKERS
              </span>
              <span className="hidden sm:inline-block ml-2.5 badge-pill badge-purple text-[0.68rem]">
                Built for teamwork
              </span>
            </div>
          </div>

          {/* Links & Action */}
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              onClick={() => setShowHow(true)}
              className="btn-ghost text-sm font-semibold hidden md:inline-flex items-center gap-1.5"
            >
              <HelpCircle size={15} /> How It Works
            </button>
            <a
              href="#missions"
              className="btn-ghost text-sm font-semibold hidden sm:inline-flex"
            >
              Missions
            </a>
            <button
              onClick={() => router.push('/setup')}
              className="btn-primary text-sm py-2 px-4 sm:px-5"
            >
              Play Now <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative px-4 sm:px-8 pt-10 sm:pt-16 pb-14 max-w-6xl mx-auto text-center">
        {/* Adorable Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EDFD] border border-[#7866E8]/20 text-[#7866E8] text-xs font-bold tracking-wide mb-6 shadow-sm"
        >
          <Sparkles size={14} /> GDG NSUT DEVLYMPICS 2026 · BRIDGE THE GAP
        </motion.div>

        {/* Playful Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#252541] tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6"
        >
          Oops! Reality broke.{' '}
          <span className="text-[#7866E8] underline decoration-[#FFE28A] decoration-wavy decoration-2">
            Can you fix it together?
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-xl text-[#5C5C77] max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Everyone has a different piece of the puzzle. Share clues, bridge the gaps, and save a world that really needs better communication.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10"
        >
          <button
            onClick={() => router.push('/setup')}
            className="btn-primary w-full sm:w-auto text-base py-3.5 px-8 shadow-lg shadow-[#7866E8]/25"
          >
            LET'S FIX THIS WORLD →
          </button>
          <button
            onClick={() => setShowHow(true)}
            className="btn-secondary w-full sm:w-auto text-base py-3.5 px-6"
          >
            See How It Works
          </button>
        </motion.div>

        {/* Cute Animated World Illustration with Bloop & Speech Bubbles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4"
        >
          <FloatingCityPreview />
        </motion.div>
      </section>

      {/* ── 3 DELIGHTFUL FEATURES ── */}
      <section className="px-4 sm:px-8 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-[#7866E8] uppercase">
            HOW TEAMWORK WINS
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#252541] mt-2">
            Three simple secrets to rebuilding the world
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="card-clean card-interactive p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EBF5FE] text-[#1D6FB8] flex items-center justify-center mb-5 border border-[#55A7F7]/30">
                <Users size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-[#252541] mb-2">
                Different Minds, One Mission
              </h3>
              <p className="text-[#5C5C77] text-sm leading-relaxed">
                Everyone gets different clues. Navigator sees symbols, Decoder has the secret cipher, and Engineer controls the power switches.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E5DC] flex items-center gap-2 text-xs font-semibold text-[#1D6FB8]">
              <span className="w-2 h-2 rounded-full bg-[#55A7F7]" /> No single player can win alone
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="card-clean card-interactive p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F0EDFD] text-[#7866E8] flex items-center justify-center mb-5 border border-[#7866E8]/30">
                <Brain size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-[#252541] mb-2">
                AI That Gets You
              </h3>
              <p className="text-[#5C5C77] text-sm leading-relaxed">
                Messages can become simpler, translated into Hindi, or turned into clear visual ASCII schematics with one click of Gemini AI.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E5DC] flex items-center gap-2 text-xs font-semibold text-[#7866E8]">
              <span className="w-2 h-2 rounded-full bg-[#7866E8]" /> Converts confusion into clarity
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="card-clean card-interactive p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F0FAF5] text-[#1A7A4E] flex items-center justify-center mb-5 border border-[#9BE7C4]/50">
                <Layers size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-[#252541] mb-2">
                Build Bridges Together
              </h3>
              <p className="text-[#5C5C77] text-sm leading-relaxed">
                Successful teamwork repairs the world. Every piece of shared understanding visibly connects the floating islands across 3 stages.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E8E5DC] flex items-center gap-2 text-xs font-semibold text-[#1A7A4E]">
              <span className="w-2 h-2 rounded-full bg-[#9BE7C4]" /> Real-time bridge animations
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION PREVIEW CARD ── */}
      <section id="missions" className="px-4 sm:px-8 py-12 max-w-4xl mx-auto">
        <div className="card-clean p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-white via-white to-[#F0EDFD]/40 border-2 border-[#7866E8]/20 shadow-lg">
          {/* Mascot in corner */}
          <div className="absolute -top-3 -right-3 sm:right-6 pointer-events-none opacity-90">
            <Bloop mood="excited" size={100} />
          </div>

          <div className="max-w-xl">
            <span className="badge-pill badge-yellow text-xs font-bold mb-3">
              ★ READY TO PLAY
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#252541] mb-2">
              MISSION 01: SAVE THE FLOATING CITY
            </h3>

            <p className="text-[#5C5C77] text-base mb-6 leading-relaxed">
              “The city's energy core is having a very bad day.”
              <br />
              Synthesize 3 collectible rune symbols across the team to activate the right switches and stop the city from falling into the void.
            </p>

            {/* Collectible-looking Runes */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E6F9FB] border border-[#0FB5C4]/30 text-xs font-bold text-[#0A7B85]">
                <span className="text-base">🌀</span> Spiral (Cyan)
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFF6E5] border border-[#E58A00]/30 text-xs font-bold text-[#995C00]">
                <span className="text-base">☀️</span> Sun (Amber)
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F3EEFE] border border-[#8B5CF6]/30 text-xs font-bold text-[#5B34B3]">
                <span className="text-base">〰️</span> Wave (Violet)
              </div>
            </div>

            {/* Specs & Launch */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button
                onClick={() => router.push('/setup')}
                className="btn-primary text-base py-3 px-8 shadow-md"
              >
                <Play size={16} fill="currentColor" /> Start the Adventure
              </button>

              <div className="flex items-center gap-4 text-xs font-bold text-[#74748A]">
                <div>👥 3 Roles</div>
                <div>⏱️ 3 Min Countdown</div>
                <div>⭐ Friendly Co-op</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#E8E5DC] py-10 px-4 text-center text-xs text-[#74748A] bg-white/50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bloop mood="proud" size={32} animate={false} />
            <span className="font-bold text-[#252541]">GAP//BREAKERS</span> — Rebuilding reality together.
          </div>
          <div>
            Built with <Heart size={13} className="inline text-[#FF9EAB] fill-[#FF9EAB]" /> for GDG NSUT Devlympics Shunya 2026.
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
            className="fixed inset-0 z-50 bg-[#252541]/40 backdrop-blur-sm flex items-center justify-center p-4"
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
                className="absolute top-5 right-5 text-[#8E8EA8] hover:text-[#252541] p-1.5 rounded-full hover:bg-[#F4F2EC]"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <Bloop mood="thinking" size={48} />
                <div>
                  <h3 className="font-display text-xl font-bold text-[#252541]">
                    How to play GAP//BREAKERS
                  </h3>
                  <p className="text-xs text-[#74748A]">Quick guide: 3 brains, 1 broken bridge.</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-3.5 rounded-2xl bg-[#EBF5FE] border border-[#55A7F7]/20 flex items-start gap-3">
                  <Compass className="text-[#1D6FB8] shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-[#1D6FB8]">The Navigator</h4>
                    <p className="text-xs text-[#5C5C77]">
                      Sees the ancient route map. Knows the correct sequence of symbols (Spiral → Sun → Wave).
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F0EDFD] border border-[#7866E8]/20 flex items-start gap-3">
                  <FileCode className="text-[#7866E8] shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-[#7866E8]">The Decoder</h4>
                    <p className="text-xs text-[#5C5C77]">
                      Has the rune table cipher. Knows which symbol maps to which color (Spiral = Cyan, Sun = Amber, Wave = Violet).
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FFF6E5] border border-[#E58A00]/20 flex items-start gap-3">
                  <Wrench className="text-[#995C00] shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-[#995C00]">The Engineer</h4>
                    <p className="text-xs text-[#5C5C77]">
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
                className="btn-primary w-full py-3.5 text-sm"
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
