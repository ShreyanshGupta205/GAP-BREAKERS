'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type RuneType = 'spiral' | 'sun' | 'wave';

interface RuneGlyphProps {
  type: RuneType;
  size?: number;
  glow?: boolean;
  className?: string;
  animate?: boolean;
}

export const RUNE_CONFIG: Record<RuneType, { name: string; color: string; label: string; element: string }> = {
  spiral: {
    name: 'Spiral Rune',
    color: '#00f5ff',
    label: 'PRIMAL VORTEX',
    element: 'CYAN CONDUIT',
  },
  sun: {
    name: 'Sun Rune',
    color: '#f59e0b',
    label: 'SOLAR NEXUS',
    element: 'AMBER CONDUIT',
  },
  wave: {
    name: 'Wave Rune',
    color: '#8b5cf6',
    label: 'HARMONIC FREQUENCY',
    element: 'VIOLET CONDUIT',
  },
};

export default function RuneGlyph({
  type,
  size = 32,
  glow = true,
  className = '',
  animate = false,
}: RuneGlyphProps) {
  const config = RUNE_CONFIG[type];

  return (
    <div
      className={`inline-flex items-center justify-center relative flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        filter: glow ? `drop-shadow(0 0 ${Math.max(4, size * 0.2)}px ${config.color}90)` : undefined,
      }}
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <filter id={`glow-${type}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Circular Rune Crest */}
        <circle
          cx="32"
          cy="32"
          r="29"
          stroke={config.color}
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeDasharray="4 3"
        />
        <circle
          cx="32"
          cy="32"
          r="25"
          stroke={config.color}
          strokeWidth="0.8"
          strokeOpacity="0.25"
        />

        {type === 'spiral' && (
          <g filter={`url(#glow-${type})`}>
            {/* Primal Spiral Vortex */}
            <motion.path
              d="M 32,32 A 4,4 0 0,1 36,32 A 8,8 0 0,1 28,32 A 13,13 0 0,1 41,32 A 18,18 0 0,1 23,32 A 22,22 0 0,1 45,32"
              stroke={config.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              animate={animate ? { rotate: 360 } : undefined}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '32px 32px' }}
            />
            <circle cx="32" cy="32" r="3.5" fill={config.color} />
            <circle cx="32" cy="7" r="2" fill={config.color} opacity="0.8" />
            <circle cx="57" cy="32" r="2" fill={config.color} opacity="0.8" />
            <circle cx="32" cy="57" r="2" fill={config.color} opacity="0.8" />
            <circle cx="7" cy="32" r="2" fill={config.color} opacity="0.8" />
          </g>
        )}

        {type === 'sun' && (
          <g filter={`url(#glow-${type})`}>
            {/* Solar Starburst */}
            <motion.g
              animate={animate ? { rotate: [0, 45, 0] } : undefined}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '32px 32px' }}
            >
              <polygon
                points="32,17 43,28 32,39 21,28"
                stroke={config.color}
                strokeWidth="1.5"
                fill="rgba(245, 158, 11, 0.25)"
              />
              <line x1="32" y1="5" x2="32" y2="13" stroke={config.color} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="32" y1="51" x2="32" y2="59" stroke={config.color} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="5" y1="32" x2="13" y2="32" stroke={config.color} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="51" y1="32" x2="59" y2="32" stroke={config.color} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="13" y1="13" x2="19" y2="19" stroke={config.color} strokeWidth="2" strokeLinecap="round" />
              <line x1="45" y1="45" x2="51" y2="51" stroke={config.color} strokeWidth="2" strokeLinecap="round" />
              <line x1="51" y1="13" x2="45" y2="19" stroke={config.color} strokeWidth="2" strokeLinecap="round" />
              <line x1="13" y1="51" x2="19" y2="45" stroke={config.color} strokeWidth="2" strokeLinecap="round" />
            </motion.g>
            <circle cx="32" cy="32" r="4.5" fill={config.color} />
          </g>
        )}

        {type === 'wave' && (
          <g filter={`url(#glow-${type})`}>
            {/* Harmonic Quantum Waves */}
            <motion.path
              d="M 12 24 Q 22 16 32 24 T 52 24"
              stroke={config.color}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
              animate={animate ? { y: [-1.5, 1.5, -1.5] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M 10 32 Q 21 21 32 32 T 54 32"
              stroke={config.color}
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
              animate={animate ? { y: [1.5, -1.5, 1.5] } : undefined}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M 12 40 Q 22 32 32 40 T 52 40"
              stroke={config.color}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
              animate={animate ? { y: [-1.5, 1.5, -1.5] } : undefined}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="21" cy="27" r="2.2" fill={config.color} />
            <circle cx="43" cy="37" r="2.2" fill={config.color} />
          </g>
        )}
      </svg>
    </div>
  );
}
