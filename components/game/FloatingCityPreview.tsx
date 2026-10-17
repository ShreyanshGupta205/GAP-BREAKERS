'use client';

import { motion } from 'framer-motion';

/**
 * FloatingCityPreview — SVG + CSS animated scene for the landing page.
 * Shows two floating islands, a broken bridge, and energy effects.
 * Pure CSS/SVG fallback — no external images required.
 */
export default function FloatingCityPreview() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto', height: 380 }}>
      {/* Glow backdrop */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 200, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <svg viewBox="0 0 900 380" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-amber">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="islandGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f1a40" />
            <stop offset="100%" stopColor="#070d20" />
          </linearGradient>
          <linearGradient id="islandGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d1535" />
            <stop offset="100%" stopColor="#060c1c" />
          </linearGradient>
          <linearGradient id="energyBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Stars / particles */}
        {[...Array(40)].map((_, i) => (
          <circle
            key={i}
            cx={Math.sin(i * 137.5) * 450 + 450}
            cy={Math.cos(i * 97.3) * 190 + 190}
            r={i % 5 === 0 ? 1.5 : 0.8}
            fill="white"
            opacity={0.2 + (i % 5) * 0.1}
          />
        ))}

        {/* ── LEFT ISLAND ── */}
        <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          {/* Island base */}
          <ellipse cx="230" cy="260" rx="140" ry="30" fill="url(#islandGrad1)" stroke="rgba(0,245,255,0.2)" strokeWidth="1" />
          <ellipse cx="230" cy="255" rx="140" ry="28" fill="#0a1228" />
          {/* Island top surface */}
          <ellipse cx="230" cy="230" rx="130" ry="22" fill="#0d1635" stroke="rgba(0,245,255,0.15)" strokeWidth="1" />
          {/* Buildings */}
          <rect x="160" y="170" width="22" height="60" rx="3" fill="#0f1a40" stroke="rgba(0,245,255,0.3)" strokeWidth="1" />
          <rect x="165" y="163" width="12" height="10" rx="2" fill="#0f1a40" stroke="rgba(0,245,255,0.2)" strokeWidth="1" />
          <rect x="190" y="185" width="18" height="45" rx="3" fill="#0f1a40" stroke="rgba(0,245,255,0.2)" strokeWidth="1" />
          <rect x="215" y="175" width="25" height="55" rx="3" fill="#0f1a40" stroke="rgba(0,245,255,0.25)" strokeWidth="1" />
          <rect x="248" y="190" width="20" height="40" rx="3" fill="#0f1a40" stroke="rgba(0,245,255,0.2)" strokeWidth="1" />
          <rect x="275" y="200" width="16" height="30" rx="3" fill="#0f1a40" stroke="rgba(0,245,255,0.15)" strokeWidth="1" />
          {/* Window lights */}
          <rect x="167" y="175" width="4" height="3" fill="#00f5ff" opacity="0.7" />
          <rect x="173" y="175" width="4" height="3" fill="#00f5ff" opacity="0.5" />
          <rect x="167" y="183" width="4" height="3" fill="#00f5ff" opacity="0.4" />
          <rect x="219" y="180" width="5" height="4" fill="#00f5ff" opacity="0.8" />
          <rect x="227" y="180" width="5" height="4" fill="#8b5cf6" opacity="0.7" />
          <rect x="219" y="190" width="5" height="4" fill="#00f5ff" opacity="0.5" />
          {/* Energy conduit on left island */}
          <line x1="300" y1="230" x2="350" y2="228" stroke="#00f5ff" strokeWidth="2" opacity="0.6" filter="url(#glow-cyan)" />
          <circle cx="302" cy="230" r="5" fill="none" stroke="#00f5ff" strokeWidth="1.5" opacity="0.8" />
        </motion.g>

        {/* ── BROKEN BRIDGE CENTER ── */}
        {/* Bridge section 1 (broken) */}
        <line x1="355" y1="228" x2="400" y2="228" stroke="#2d3748" strokeWidth="6" strokeLinecap="round" />
        <line x1="355" y1="218" x2="395" y2="218" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
        <line x1="355" y1="238" x2="395" y2="238" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />

        {/* Gap / void */}
        <motion.g
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <ellipse cx="450" cy="235" rx="30" ry="8" fill="rgba(139,92,246,0.15)" />
          <text x="450" y="240" textAnchor="middle" fontSize="16" fill="rgba(139,92,246,0.6)">⚡</text>
        </motion.g>

        {/* Bridge section 2 (broken) */}
        <line x1="500" y1="228" x2="545" y2="228" stroke="#2d3748" strokeWidth="6" strokeLinecap="round" />
        <line x1="505" y1="218" x2="545" y2="218" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />
        <line x1="505" y1="238" x2="545" y2="238" stroke="#2d3748" strokeWidth="2" strokeLinecap="round" />

        {/* ── RIGHT ISLAND ── */}
        <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
          {/* Island base */}
          <ellipse cx="670" cy="260" rx="130" ry="28" fill="url(#islandGrad2)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />
          <ellipse cx="670" cy="255" rx="130" ry="26" fill="#080e22" />
          {/* Island top */}
          <ellipse cx="670" cy="232" rx="120" ry="20" fill="#0c1430" stroke="rgba(245,158,11,0.15)" strokeWidth="1" />
          {/* Energy core structure */}
          <rect x="645" y="170" width="50" height="62" rx="6" fill="#0f1a40" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
          <motion.circle
            cx="670" cy="200" r="18"
            fill="none" stroke="#f59e0b" strokeWidth="2"
            animate={{ r: [18, 22, 18] }}
            transition={{ duration: 2, repeat: Infinity }}
            filter="url(#glow-amber)"
          />
          <motion.circle
            cx="670" cy="200" r="10"
            fill="rgba(245,158,11,0.3)"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="670" y="206" textAnchor="middle" fontSize="12" fill="#f59e0b" filter="url(#glow-amber)">⚡</text>
          {/* Side buildings */}
          <rect x="600" y="195" width="15" height="37" rx="3" fill="#0f1a40" stroke="rgba(245,158,11,0.15)" strokeWidth="1" />
          <rect x="720" y="200" width="18" height="32" rx="3" fill="#0f1a40" stroke="rgba(245,158,11,0.15)" strokeWidth="1" />
          <rect x="740" y="212" width="14" height="20" rx="3" fill="#0f1a40" stroke="rgba(245,158,11,0.1)" strokeWidth="1" />
          {/* Connection point */}
          <line x1="550" y1="228" x2="595" y2="228" stroke="#f59e0b" strokeWidth="2" opacity="0.6" filter="url(#glow-amber)" />
          <circle cx="597" cy="228" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8" />
        </motion.g>

        {/* Energy beam (partially broken) */}
        <motion.line
          x1="356" y1="228" x2="420" y2="228"
          stroke="url(#energyBeam)"
          strokeWidth="3"
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#glow-cyan)"
        />

        {/* Floating particles */}
        {[380, 420, 460, 500].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={220}
            r={2}
            fill="#8b5cf6"
            animate={{ y: [-5, -20, -5], opacity: [0, 0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}

        {/* Label — BROKEN BRIDGE */}
        <text x="450" y="285" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="3" fontFamily="monospace">
          BRIDGE FRACTURED — NEEDS REPAIR
        </text>

        {/* Energy core label */}
        <text x="670" y="175" textAnchor="middle" fontSize="9" fill="rgba(245,158,11,0.6)" letterSpacing="2" fontFamily="monospace">
          ENERGY CORE
        </text>
      </svg>
    </div>
  );
}
