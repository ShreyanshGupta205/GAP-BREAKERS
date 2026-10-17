'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import Bloop, { BloopMood } from './Bloop';

export default function WorldScene() {
  const { bridge, phase, activatedSwitches } = useGameStore();

  const isVictory = phase === 'victory';
  const isFailure = phase === 'failure';

  // Determine Bloop's mood based on progress
  let bloopMood: BloopMood = 'thinking';
  if (isVictory) {
    bloopMood = 'dancing';
  } else if (isFailure) {
    bloopMood = 'concerned';
  } else if (bridge.section3 === 'repaired') {
    bloopMood = 'dancing';
  } else if (bridge.section2 === 'repaired') {
    bloopMood = 'proud';
  } else if (bridge.section1 === 'glowing') {
    bloopMood = 'excited';
  }

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#FAF9F6] to-[#F5F2EB] border border-[#E8E5DC] select-none shadow-inner">
      {/* Decorative Floating Clouds */}
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-3 left-8 opacity-70 pointer-events-none"
      >
        <div className="w-20 h-7 rounded-full bg-white shadow-sm" />
      </motion.div>

      <motion.div
        animate={{ x: [20, -20, 20] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-6 right-16 opacity-70 pointer-events-none"
      >
        <div className="w-28 h-8 rounded-full bg-white shadow-sm" />
      </motion.div>

      {/* Main SVG Scene */}
      <svg
        viewBox="0 0 800 320"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Island Gradient */}
          <linearGradient id="lushGrass" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#9BE7C4" />
            <stop offset="100%" stopColor="#78E0B3" />
          </linearGradient>

          <linearGradient id="purplePlateau" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#A89CF5" />
            <stop offset="100%" stopColor="#7866E8" />
          </linearGradient>

          <linearGradient id="rockBase" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#DFDAD1" />
            <stop offset="100%" stopColor="#BDB7AB" />
          </linearGradient>

          {/* Cyan Glow */}
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Core Glow */}
          <radialGradient id="energyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE28A" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── LEFT ISLAND (Navigator & Decoder) ── */}
        <g>
          {/* Rock Body */}
          <path
            d="M 50 200 Q 150 200 240 200 Q 210 280 150 300 Q 90 280 50 200 Z"
            fill="url(#rockBase)"
            stroke="#9E9689"
            strokeWidth="2.5"
          />
          {/* Green Top */}
          <ellipse cx="145" cy="200" rx="95" ry="18" fill="url(#lushGrass)" stroke="#52B687" strokeWidth="2.5" />

          {/* Cute foliage and crystals */}
          <circle cx="95" cy="186" r="12" fill="#52B687" />
          <rect x="93" y="194" width="4" height="6" fill="#7D6F5E" />

          <circle cx="120" cy="188" r="9" fill="#55A7F7" opacity="0.9" />
          <rect x="118" y="194" width="3.5" height="5" fill="#7D6F5E" />

          {/* Portal Gate Frame */}
          <path d="M 160 200 C 160 160, 200 160, 200 200" stroke="#7866E8" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="180" cy="180" rx="12" ry="16" fill="#F0EDFD" opacity="0.8" />
        </g>

        {/* ── CENTRAL 3-STAGE REPAIRABLE BRIDGE ── */}
        <g>
          {/* SECTION 1: Discovery (Left Span, x: 235 to 350) */}
          {bridge.section1 === 'broken' ? (
            <g opacity="0.45">
              <line x1="235" y1="202" x2="350" y2="202" stroke="#BDB7AB" strokeWidth="3" strokeDasharray="6 6" />
              <rect x="238" y="198" width="22" height="7" rx="2" fill="#D3CECA" />
              <text x="280" y="218" fill="#8E8EA8" fontSize="10" fontWeight="bold">GAP 1</text>
            </g>
          ) : (
            <motion.g
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glowing Beam */}
              <line
                x1="235"
                y1="202"
                x2="350"
                y2="202"
                stroke="#0FB5C4"
                strokeWidth="5"
                strokeLinecap="round"
                filter="url(#cyanGlow)"
              />
              <rect x="250" y="197" width="24" height="8" rx="2" fill="#9BE7C4" stroke="#52B687" strokeWidth="1.5" />
              <rect x="285" y="197" width="24" height="8" rx="2" fill="#9BE7C4" stroke="#52B687" strokeWidth="1.5" />
              <rect x="320" y="197" width="24" height="8" rx="2" fill="#9BE7C4" stroke="#52B687" strokeWidth="1.5" />
              {/* Particle sparks */}
              <circle cx="290" cy="192" r="2" fill="#FFE28A" />
              <circle cx="330" cy="190" r="2.5" fill="#55A7F7" />
            </motion.g>
          )}

          {/* SECTION 2: Understanding (Center Span, x: 350 to 465) */}
          {bridge.section2 === 'broken' ? (
            <g opacity="0.45">
              <line x1="350" y1="202" x2="465" y2="202" stroke="#BDB7AB" strokeWidth="3" strokeDasharray="6 6" />
              <text x="395" y="218" fill="#8E8EA8" fontSize="10" fontWeight="bold">GAP 2</text>
            </g>
          ) : (
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Purple Resonant Beam */}
              <line
                x1="350"
                y1="202"
                x2="465"
                y2="202"
                stroke="#7866E8"
                strokeWidth="5"
                strokeLinecap="round"
                filter="url(#cyanGlow)"
              />
              <rect x="360" y="197" width="28" height="8" rx="2" fill="#F0EDFD" stroke="#7866E8" strokeWidth="1.5" />
              <rect x="398" y="197" width="28" height="8" rx="2" fill="#F0EDFD" stroke="#7866E8" strokeWidth="1.5" />
              <rect x="436" y="197" width="24" height="8" rx="2" fill="#F0EDFD" stroke="#7866E8" strokeWidth="1.5" />
              {/* Central Keyston Crystal */}
              <polygon points="412,192 417,202 407,202" fill="#7866E8" />
            </motion.g>
          )}

          {/* SECTION 3: Final Connection (Right Span, x: 465 to 570) */}
          {bridge.section3 === 'broken' ? (
            <g opacity="0.45">
              <line x1="465" y1="202" x2="570" y2="202" stroke="#BDB7AB" strokeWidth="3" strokeDasharray="6 6" />
              <rect x="540" y="198" width="24" height="7" rx="2" fill="#D3CECA" />
              <text x="505" y="218" fill="#8E8EA8" fontSize="10" fontWeight="bold">GAP 3</text>
            </g>
          ) : (
            <motion.g
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Golden Victory Energy */}
              <line
                x1="465"
                y1="202"
                x2="570"
                y2="202"
                stroke="#E58A00"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#cyanGlow)"
              />
              <rect x="475" y="197" width="24" height="8" rx="2" fill="#FFE28A" stroke="#E58A00" strokeWidth="1.5" />
              <rect x="508" y="197" width="24" height="8" rx="2" fill="#FFE28A" stroke="#E58A00" strokeWidth="1.5" />
              <rect x="540" y="197" width="24" height="8" rx="2" fill="#FFE28A" stroke="#E58A00" strokeWidth="1.5" />
            </motion.g>
          )}
        </g>

        {/* ── RIGHT ISLAND (Engineer & Energy Core) ── */}
        <g>
          {/* Rock Body */}
          <path
            d="M 560 200 Q 650 200 750 200 Q 720 280 660 300 Q 600 280 560 200 Z"
            fill="url(#rockBase)"
            stroke="#9E9689"
            strokeWidth="2.5"
          />
          {/* Purple Plateau Top */}
          <ellipse cx="655" cy="200" rx="95" ry="18" fill="url(#purplePlateau)" stroke="#5B4ABF" strokeWidth="2.5" />

          {/* Pedestal */}
          <rect x="645" y="184" width="24" height="16" rx="4" fill="#5C5C77" />

          {/* Energy Core Sphere */}
          <motion.g
            animate={{
              scale: isVictory ? [1, 1.15, 1] : [1, 1.05, 1],
            }}
            transition={{ repeat: Infinity, duration: isVictory ? 1 : 2.5, ease: 'easeInOut' }}
          >
            {/* Core Halo */}
            <circle cx="657" cy="168" r={isVictory ? 28 : 22} fill="url(#energyGlow)" />
            {/* Core Orb */}
            <circle
              cx="657"
              cy="168"
              r={16}
              fill={isVictory ? '#FFE28A' : isFailure ? '#FF9EAB' : '#FFE28A'}
              stroke={isVictory ? '#D49D0A' : '#E58A00'}
              strokeWidth="2.5"
            />
            <circle cx="657" cy="168" r={10} fill="#FFF9E6" />
            <circle cx="653" cy="164" r="3.5" fill="#FFFFFF" />
          </motion.g>
        </g>

        {/* ── ACTIVE SWITCH STATUS LIGHTS ON RIGHT ISLAND ── */}
        <g transform="translate(620, 208)">
          {['cyan', 'amber', 'violet'].map((c, i) => {
            const isLit = activatedSwitches.includes(c as any);
            const colorMap: Record<string, string> = { cyan: '#0FB5C4', amber: '#E58A00', violet: '#8B5CF6' };
            return (
              <circle
                key={c}
                cx={i * 24}
                cy={0}
                r={isLit ? 4.5 : 3.5}
                fill={isLit ? colorMap[c] : '#D1CDC5'}
                stroke={isLit ? '#252541' : '#B8B3A8'}
                strokeWidth="1.5"
              />
            );
          })}
        </g>
      </svg>

      {/* ── MASCOT BLOOP IN THE WORLD SCENE! ── */}
      <div className="absolute bottom-6 left-[210px] sm:left-[225px] z-10 pointer-events-none">
        <Bloop mood={bloopMood} size={64} />
      </div>

      {/* Floating Status Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className="badge-pill bg-white/90 border border-[#E8E5DC] text-[#252541] text-[0.7rem] shadow-sm backdrop-blur-sm">
          {isVictory ? '🎉 Reality Rebuilt!' : bridge.section2 === 'repaired' ? '✨ Bridge Almost Complete!' : bridge.section1 === 'glowing' ? '🌟 Section 1 Connected' : '🚧 Bridge Offline'}
        </span>
      </div>
    </div>
  );
}
