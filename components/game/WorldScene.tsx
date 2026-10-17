'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import BridgeSection from './BridgeSection';
import RuneGlyph from './RuneGlyph';

/**
 * WorldScene — High-Fidelity Animated Floating City Game World.
 * Displays celestial islands, energy bridges, dynamic rune spires, and energy core feedback.
 */
export default function WorldScene() {
  const { bridge, phase, activatedSwitches } = useGameStore();

  const isVictory = phase === 'victory';
  const isFailure = phase === 'failure';

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: 'radial-gradient(ellipse at 50% 100%, rgba(0,245,255,0.08) 0%, rgba(139,92,246,0.04) 40%, #030712 100%)',
      borderRadius: 14,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)',
    }}>
      <svg
        viewBox="0 0 800 340"
        style={{ width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="ws-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ws-glow-amber" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ws-glow-violet" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ws-glow-success" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <linearGradient id="ws-voidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#070c1e" />
            <stop offset="50%" stopColor="#040713" />
            <stop offset="100%" stopColor="#02040a" />
          </linearGradient>

          <linearGradient id="leftIslandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#142144" />
            <stop offset="60%" stopColor="#0b1328" />
            <stop offset="100%" stopColor="#060a16" />
          </linearGradient>

          <linearGradient id="rightIslandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1d1936" />
            <stop offset="60%" stopColor="#0e1022" />
            <stop offset="100%" stopColor="#060714" />
          </linearGradient>

          <radialGradient id="nebulaGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.15)" />
            <stop offset="60%" stopColor="rgba(0,245,255,0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Space Backdrop */}
        <rect x="0" y="0" width="800" height="340" fill="url(#ws-voidGrad)" />
        <ellipse cx="400" cy="140" rx="360" ry="120" fill="url(#nebulaGlow)" />

        {/* Dynamic Starfield */}
        {[...Array(60)].map((_, i) => (
          <circle
            key={i}
            cx={(i * 71 + i * i * 3) % 800}
            cy={(i * 43 + i * 17) % 340}
            r={i % 8 === 0 ? 1.6 : i % 3 === 0 ? 1.1 : 0.7}
            fill={i % 5 === 0 ? '#00f5ff' : i % 7 === 0 ? '#f59e0b' : '#ffffff'}
            opacity={0.15 + (i % 5) * 0.15}
          />
        ))}

        {/* Floating Debris / Crystalline Shards */}
        {[...Array(8)].map((_, i) => (
          <motion.polygon
            key={`shard-${i}`}
            points="0,-4 3,0 0,4 -3,0"
            fill="rgba(0,245,255,0.3)"
            stroke="rgba(0,245,255,0.6)"
            strokeWidth="0.5"
            transform={`translate(${340 + i * 18}, ${235 + (i % 3) * 12})`}
            animate={{
              y: [-4, 4, -4],
              rotate: [0, 90, 180, 270, 360],
              opacity: bridge.section1 === 'broken' ? [0.2, 0.6, 0.2] : [0.05, 0.2, 0.05],
            }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Failure Atmosphere */}
        {isFailure && (
          <motion.rect
            x="0" y="0" width="800" height="340"
            fill="rgba(239,68,68,0.12)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* ============================================================== */}
        {/* LEFT ISLAND — THE CITADEL OF AWARENESS (Navigator & Decoder) */}
        {/* ============================================================== */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Island Underglow */}
          <ellipse cx="190" cy="274" rx="120" ry="18" fill="rgba(0,245,255,0.06)" />

          {/* Island Rocky Under-crag */}
          <polygon
            points="75,255 190,315 305,255 270,245 110,245"
            fill="url(#leftIslandGrad)"
            stroke="rgba(0,245,255,0.2)"
            strokeWidth="1"
          />

          {/* Island Surface Plateaus */}
          <ellipse cx="190" cy="254" rx="115" ry="22" fill="#0b142d" stroke="rgba(0,245,255,0.35)" strokeWidth="1.2" />
          <ellipse cx="190" cy="244" rx="105" ry="18" fill="#101d3f" />

          {/* Spires & Architectural Towers */}
          <rect x="115" y="170" width="22" height="75" rx="3" fill="#13234d" stroke="rgba(0,245,255,0.4)" strokeWidth="1" />
          <polygon points="115,170 126,148 137,170" fill="#00f5ff" opacity="0.3" stroke="#00f5ff" strokeWidth="1" />

          <rect x="145" y="185" width="18" height="60" rx="3" fill="#0e1b3c" stroke="rgba(0,245,255,0.25)" strokeWidth="1" />
          <rect x="172" y="160" width="28" height="85" rx="3" fill="#152755" stroke="rgba(0,245,255,0.45)" strokeWidth="1.2" />
          <polygon points="172,160 186,138 200,160" fill="#00f5ff" opacity="0.4" stroke="#00f5ff" strokeWidth="1" />

          <rect x="210" y="195" width="20" height="50" rx="3" fill="#0e1b3c" stroke="rgba(0,245,255,0.25)" strokeWidth="1" />
          <rect x="238" y="205" width="16" height="40" rx="3" fill="#13234d" stroke="rgba(0,245,255,0.3)" strokeWidth="1" />

          {/* Glowing Windows */}
          <rect x="120" y="180" width="4" height="4" fill="#00f5ff" opacity="0.9" />
          <rect x="128" y="180" width="4" height="4" fill="#00f5ff" opacity="0.6" />
          <rect x="120" y="195" width="4" height="4" fill="#00f5ff" opacity="0.8" />
          <rect x="178" y="175" width="5" height="5" fill="#00f5ff" opacity="0.9" />
          <rect x="188" y="175" width="5" height="5" fill="#8b5cf6" opacity="0.7" />
          <rect x="178" y="190" width="5" height="5" fill="#00f5ff" opacity="0.85" />
          <rect x="188" y="190" width="5" height="5" fill="#00f5ff" opacity="0.5" />

          {/* Bridge Anchor Pylon (Left) */}
          <rect x="286" y="210" width="16" height="28" rx="3" fill="#152755" stroke="#00f5ff" strokeWidth="1.5" />
          <circle cx="294" cy="224" r="4" fill="#00f5ff" filter="url(#ws-glow-cyan)" />
        </motion.g>

        {/* ============================================================== */}
        {/* BRIDGE SECTIONS — 3 PROGRESSION STAGES */}
        {/* ============================================================== */}
        {/* Section 1: 300 → 400 */}
        <BridgeSection section={1} state={bridge.section1} x1={300} y1={224} x2={400} y2={224} />
        {/* Section 2: 400 → 500 */}
        <BridgeSection section={2} state={bridge.section2} x1={404} y1={224} x2={496} y2={224} />
        {/* Section 3: 500 → 600 */}
        <BridgeSection section={3} state={bridge.section3} x1={500} y1={224} x2={596} y2={224} />

        {/* Energy Conduits / Flow Sparks along Repaired Bridge */}
        {bridge.section1 === 'repaired' && (
          <motion.circle
            r="3" fill="#00f5ff" filter="url(#ws-glow-cyan)"
            animate={{ cx: [300, 400], cy: [224, 224] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {bridge.section2 === 'repaired' && (
          <motion.circle
            r="3" fill="#8b5cf6" filter="url(#ws-glow-violet)"
            animate={{ cx: [404, 496], cy: [224, 224] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: 0.4 }}
          />
        )}
        {bridge.section3 === 'repaired' && (
          <motion.circle
            r="3.5" fill="#f59e0b" filter="url(#ws-glow-amber)"
            animate={{ cx: [500, 596], cy: [224, 224] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: 0.8 }}
          />
        )}

        {/* Void rupture indicators if broken */}
        {bridge.section1 === 'broken' && (
          <motion.g animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
            <line x1="350" y1="210" x2="350" y2="240" stroke="rgba(0,245,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="350" y="205" textAnchor="middle" fontSize="10" fill="rgba(0,245,255,0.7)" fontFamily="var(--font-mono)">GAP 01</text>
          </motion.g>
        )}
        {bridge.section2 === 'broken' && (
          <motion.g animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}>
            <line x1="450" y1="210" x2="450" y2="240" stroke="rgba(139,92,246,0.4)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="450" y="205" textAnchor="middle" fontSize="10" fill="rgba(139,92,246,0.7)" fontFamily="var(--font-mono)">GAP 02</text>
          </motion.g>
        )}
        {bridge.section3 === 'broken' && (
          <motion.g animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0.8 }}>
            <line x1="550" y1="210" x2="550" y2="240" stroke="rgba(245,158,11,0.4)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="550" y="205" textAnchor="middle" fontSize="10" fill="rgba(245,158,11,0.7)" fontFamily="var(--font-mono)">CORE GAP</text>
          </motion.g>
        )}

        {/* ============================================================== */}
        {/* RIGHT ISLAND — THE ENERGY CORE NEXUS */}
        {/* ============================================================== */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          {/* Island Underglow */}
          <ellipse cx="640" cy="270" rx="115" ry="18" fill={isVictory ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.06)'} />

          {/* Island Under-crag */}
          <polygon
            points="535,255 640,315 745,255 715,245 565,245"
            fill="url(#rightIslandGrad)"
            stroke={isVictory ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.25)'}
            strokeWidth="1"
          />

          {/* Island Surface Plateaus */}
          <ellipse cx="640" cy="254" rx="110" ry="22" fill="#141128" stroke={isVictory ? '#10b98150' : '#f59e0b50'} strokeWidth="1.2" />
          <ellipse cx="640" cy="244" rx="100" ry="18" fill="#1e183a" />

          {/* Bridge Anchor Pylon (Right) */}
          <rect x="596" y="210" width="16" height="28" rx="3" fill="#1e183a" stroke={isVictory ? '#10b981' : '#f59e0b'} strokeWidth="1.5" />
          <circle cx="604" cy="224" r="4" fill={isVictory ? '#10b981' : '#f59e0b'} filter="url(#ws-glow-amber)" />

          {/* Core Pedestal Temple Structure */}
          <polygon points="612,185 640,165 668,185 668,242 612,242" fill="#16122d" stroke={isVictory ? '#10b981' : '#f59e0b'} strokeWidth="1.5" />

          {/* Central Reactor Glass Chamber */}
          <rect x="622" y="180" width="36" height="48" rx="4" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Sacred Energy Core Orbs */}
          {isVictory && (
            <motion.ellipse
              cx="640" cy="204" rx="55" ry="55"
              fill="rgba(16,185,129,0.18)"
              animate={{ opacity: [0.2, 0.45, 0.2], rx: [45, 60, 45], ry: [45, 60, 45] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          )}

          {/* Rotating Outer Gyroscope Rings */}
          <motion.circle
            cx="640" cy="204" r="22"
            fill="none"
            stroke={isVictory ? '#10b981' : '#f59e0b'}
            strokeWidth="2"
            strokeDasharray="6 4"
            animate={{ rotate: 360 }}
            transition={{ duration: isVictory ? 4 : 10, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '640px 204px' }}
            filter="url(#ws-glow-amber)"
          />

          {/* Inner Glowing Plasma Core */}
          <motion.circle
            cx="640" cy="204" r="12"
            fill={isVictory ? '#10b981' : '#f59e0b'}
            animate={{ scale: isVictory ? [1, 1.25, 1] : [1, 1.1, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '640px 204px' }}
            filter="url(#ws-glow-amber)"
          />

          {/* Core Symbol Status */}
          <text
            x="640" y="240" textAnchor="middle" fontSize="9"
            fill={isVictory ? '#10b981' : '#f59e0b'}
            fontFamily="var(--font-orbitron)" fontWeight="700" letterSpacing="0.1em"
          >
            {isVictory ? 'CORE RESTORED' : 'NEXUS OF REALITY'}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
