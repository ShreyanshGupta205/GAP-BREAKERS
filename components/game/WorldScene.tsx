'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import BridgeSection from './BridgeSection';

/**
 * WorldScene — the main animated floating city game world.
 * Shows two islands, the broken bridge, energy core, and reacts to game state.
 */
export default function WorldScene() {
  const { bridge, phase, activatedSwitches } = useGameStore();

  const isVictory = phase === 'victory';
  const isFailure = phase === 'failure';

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: 'radial-gradient(ellipse at center bottom, rgba(0,245,255,0.04) 0%, transparent 60%)',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <svg
        viewBox="0 0 800 340"
        style={{ width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="ws-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ws-glow-amber">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ws-glow-success">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="ws-coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isVictory ? '#10b981' : '#f59e0b'} stopOpacity="0.6" />
            <stop offset="100%" stopColor={isVictory ? '#10b981' : '#f59e0b'} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ws-voidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#080d1f" />
            <stop offset="100%" stopColor="#050816" />
          </linearGradient>
        </defs>

        {/* Void/space background */}
        <rect x="0" y="0" width="800" height="340" fill="url(#ws-voidGrad)" />

        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <circle
            key={i}
            cx={(i * 71 + i * i * 3) % 800}
            cy={(i * 43 + i * 17) % 340}
            r={i % 7 === 0 ? 1.5 : 0.8}
            fill="white"
            opacity={0.1 + (i % 4) * 0.07}
          />
        ))}

        {/* Failure overlay */}
        {isFailure && (
          <motion.rect
            x="0" y="0" width="800" height="340"
            fill="rgba(239,68,68,0.08)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* ── LEFT ISLAND (Navigator side) ── */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Island shadow/glow */}
          <ellipse cx="190" cy="272" rx="120" ry="16" fill="rgba(0,245,255,0.04)" />
          {/* Island body */}
          <ellipse cx="190" cy="262" rx="115" ry="24" fill="#0a1228" stroke="rgba(0,245,255,0.15)" strokeWidth="1" />
          <ellipse cx="190" cy="248" rx="110" ry="20" fill="#0d1635" />
          {/* Buildings */}
          <rect x="120" y="185" width="20" height="63" rx="3" fill="#0f1a40" stroke="rgba(0,245,255,0.25)" strokeWidth="1" />
          <rect x="120" y="178" width="12" height="10" rx="2" fill="#0f1a40" stroke="rgba(0,245,255,0.2)" strokeWidth="1" />
          <rect x="148" y="198" width="16" height="50" rx="3" fill="#0f1a40" stroke="rgba(0,245,255,0.2)" strokeWidth="1" />
          <rect x="172" y="188" width="22" height="60" rx="3" fill="#0f1a40" stroke="rgba(0,245,255,0.25)" strokeWidth="1" />
          <rect x="202" y="200" width="18" height="48" rx="3" fill="#0f1a40" stroke="rgba(0,245,255,0.2)" strokeWidth="1" />
          <rect x="228" y="208" width="14" height="40" rx="3" fill="#0f1a40" stroke="rgba(0,245,255,0.15)" strokeWidth="1" />
          {/* Window glows */}
          <rect x="124" y="190" width="4" height="3" fill="#00f5ff" opacity="0.7" />
          <rect x="130" y="190" width="4" height="3" fill="#00f5ff" opacity="0.4" />
          <rect x="124" y="200" width="4" height="3" fill="#00f5ff" opacity="0.5" />
          <rect x="176" y="194" width="5" height="4" fill="#00f5ff" opacity="0.8" />
          <rect x="184" y="194" width="5" height="4" fill="#8b5cf6" opacity="0.6" />
          <rect x="176" y="204" width="5" height="4" fill="#00f5ff" opacity="0.4" />
          {/* Navigator symbol */}
          <text x="155" y="160" textAnchor="middle" fontSize="18" opacity="0.4">🧭</text>
          {/* Connection point */}
          <motion.circle
            cx="298" cy="228" r="5"
            fill="none" stroke="#00f5ff" strokeWidth="1.5"
            animate={{ r: bridge.section1 !== 'broken' ? [5, 7, 5] : [5, 5, 5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>

        {/* ── BRIDGE SECTIONS ── */}
        {/* Section 1: 300→400 */}
        <BridgeSection section={1} state={bridge.section1} x1={300} y1={228} x2={400} y2={228} />
        {/* Section 2: 400→500 */}
        <BridgeSection section={2} state={bridge.section2} x1={408} y1={228} x2={492} y2={228} />
        {/* Section 3: 500→600 */}
        <BridgeSection section={3} state={bridge.section3} x1={500} y1={228} x2={596} y2={228} />

        {/* Void gap indicators */}
        {bridge.section1 === 'broken' && (
          <motion.g animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
            <text x="400" y="215" textAnchor="middle" fontSize="14" fill="rgba(139,92,246,0.5)">✦</text>
          </motion.g>
        )}
        {bridge.section2 === 'broken' && (
          <motion.g animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
            <text x="450" y="215" textAnchor="middle" fontSize="14" fill="rgba(139,92,246,0.4)">✦</text>
          </motion.g>
        )}

        {/* ── RIGHT ISLAND (Energy Core) ── */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          {/* Island */}
          <ellipse cx="640" cy="265" rx="105" ry="22" fill="#08101e" stroke={isVictory ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.2)'} strokeWidth="1" />
          <ellipse cx="640" cy="252" rx="100" ry="18" fill="#0c1430" />

          {/* Core building */}
          <rect x="610" y="178" width="60" height="74" rx="8" fill="#0f1a40" stroke={isVictory ? 'rgba(16,185,129,0.5)' : 'rgba(245,158,11,0.4)'} strokeWidth="1.5" />

          {/* Core glow background */}
          {isVictory && (
            <motion.ellipse
              cx="640" cy="215" rx="50" ry="50"
              fill="rgba(16,185,129,0.12)"
              initial={{ opacity: 0, r: 30 }}
              animate={{ opacity: [0.12, 0.25, 0.12], rx: [40, 55, 40], ry: [40, 55, 40] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}

          {/* Energy core ring */}
          <motion.circle
            cx="640" cy="215" r="20"
            fill="none"
            stroke={isVictory ? '#10b981' : '#f59e0b'}
            strokeWidth="2"
            animate={isVictory ? { r: [20, 26, 20] } : { r: [20, 23, 20] }}
            transition={{ duration: isVictory ? 1 : 2, repeat: Infinity }}
            filter="url(#ws-glow-amber)"
          />
          <motion.circle
            cx="640" cy="215" r="11"
            fill={isVictory ? 'rgba(16,185,129,0.4)' : 'rgba(245,158,11,0.3)'}
            animate={{ opacity: isVictory ? [0.4, 0.9, 0.4] : [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />

          {/* Core symbol */}
          <motion.text
            x="640" y="221" textAnchor="middle" fontSize="14"
            fill={isVictory ? '#10b981' : '#f59e0b'}
            filter="url(#ws-glow-amber)"
            animate={{ opacity: isVictory ? [0.8, 1, 0.8] : [0.5, 0.9, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {isVictory ? '✓' : '⚡'}
          </motion.text>

          {/* Side buildings */}
          <rect x="575" y="205" width="12" height="47" rx="2" fill="#0f1a40" stroke="rgba(245,158,11,0.1)" strokeWidth="1" />
          <rect x="690" y="210" width="14" height="42" rx="2" fill="#0f1a40" stroke="rgba(245,158,11,0.1)" strokeWidth="1" />
          <rect x="708" y="222" width="10" height="30" rx="2" fill="#0f1a40" stroke="rgba(245,158,11,0.08)" strokeWidth="1" />

          {/* Connection point */}
          <motion.circle
            cx="600" cy="228" r="5"
            fill="none"
            stroke={isVictory ? '#10b981' : '#f59e0b'}
            strokeWidth="1.5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Victory beam */}
          {isVictory && (
            <motion.line
              x1="640" y1="195"
              x2="640" y2="130"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 0.8, 0.4], scaleY: 1 }}
              style={{ transformOrigin: '640px 195px', filter: 'drop-shadow(0 0 12px #10b981)' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          )}

          {/* CORE label */}
          <text x="640" y="175" textAnchor="middle" fontSize="8" fill={isVictory ? 'rgba(16,185,129,0.7)' : 'rgba(245,158,11,0.5)'} letterSpacing="2" fontFamily="monospace">
            {isVictory ? 'CORE RESTORED' : 'ENERGY CORE'}
          </text>
        </motion.g>

        {/* ── ACTIVATED SWITCHES DISPLAY ── */}
        {activatedSwitches.length > 0 && (
          <g>
            {activatedSwitches.map((color, i) => {
              const switchColors: Record<string, string> = { cyan: '#00f5ff', amber: '#f59e0b', violet: '#8b5cf6' };
              return (
                <motion.circle
                  key={i}
                  cx={350 + i * 30}
                  cy={300}
                  r={8}
                  fill={switchColors[color]}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ duration: 0.4 }}
                  style={{ filter: `drop-shadow(0 0 6px ${switchColors[color]})` }}
                />
              );
            })}
          </g>
        )}

        {/* Phase label */}
        <text x="400" y="335" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.2)" letterSpacing="3" fontFamily="monospace">
          {phase === 'victory' ? '✓ BRIDGE RESTORED — CITY SAVED' :
           phase === 'failure' ? '✗ MISSION FAILED — CITY LOST' :
           bridge.section3 === 'broken' ? 'BRIDGE FRACTURED — COLLABORATE TO REPAIR' : 'BRIDGE RECONSTRUCTING...'}
        </text>
      </svg>
    </div>
  );
}
