'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type BloopMood =
  | 'excited'
  | 'confused'
  | 'thinking'
  | 'proud'
  | 'shocked'
  | 'dancing'
  | 'concerned';

interface BloopProps {
  mood?: BloopMood;
  size?: number;
  className?: string;
  animate?: boolean;
  style?: React.CSSProperties;
}

export default function Bloop({
  mood = 'excited',
  size = 64,
  className = '',
  animate = true,
  style,
}: BloopProps) {
  // Gentle animations depending on mood
  const getAnimation = () => {
    if (!animate) return {};
    switch (mood) {
      case 'dancing':
        return {
          animate: { y: [0, -10, 0], rotate: [-4, 4, -4] },
          transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' as const },
        };
      case 'shocked':
        return {
          animate: { x: [-2, 2, -2, 2, 0], y: [0, -4, 0] },
          transition: { repeat: Infinity, duration: 0.4 },
        };
      case 'thinking':
        return {
          animate: { rotate: [-2, 2, -2] },
          transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' as const },
        };
      case 'proud':
        return {
          animate: { scale: [1, 1.05, 1], y: [0, -4, 0] },
          transition: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' as const },
        };
      case 'excited':
      default:
        return {
          animate: { y: [0, -6, 0] },
          transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' as const },
        };
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none overflow-visible ${className}`}
      style={style}
      {...getAnimation()}
    >
      <defs>
        {/* Soft radial glow */}
        <radialGradient id="bloopBodyGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#C2F3DC" />
          <stop offset="60%" stopColor="#9BE7C4" />
          <stop offset="100%" stopColor="#7CD4AD" />
        </radialGradient>
        {/* Helmet Gradient */}
        <linearGradient id="helmetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE8A3" />
          <stop offset="100%" stopColor="#F5B82A" />
        </linearGradient>
        {/* Shadow */}
        <ellipse id="bloopShadow" cx="60" cy="112" rx="34" ry="6" fill="rgba(37, 37, 65, 0.08)" />
      </defs>

      {/* Shadow */}
      <ellipse cx="60" cy="112" rx="32" ry="6" fill="rgba(37, 37, 65, 0.1)" />

      {/* Feet */}
      <circle cx="46" cy="104" r="8" fill="#69C49A" />
      <circle cx="74" cy="104" r="8" fill="#69C49A" />

      {/* Bloop's Round Body */}
      <rect
        x="24"
        y="38"
        width="72"
        height="68"
        rx="34"
        fill="url(#bloopBodyGrad)"
        stroke="#52B687"
        strokeWidth="3.5"
      />

      {/* Belly highlight */}
      <ellipse cx="60" cy="74" rx="22" ry="20" fill="rgba(255, 255, 255, 0.35)" />

      {/* Cheeks */}
      <ellipse cx="38" cy="72" rx="6" ry="4" fill="#FFB0BE" opacity="0.85" />
      <ellipse cx="82" cy="72" rx="6" ry="4" fill="#FFB0BE" opacity="0.85" />

      {/* Mini Builder's Helmet */}
      <path
        d="M34 42 C34 22, 86 22, 86 42 Z"
        fill="url(#helmetGrad)"
        stroke="#D99B1A"
        strokeWidth="3"
      />
      {/* Helmet Brim */}
      <rect x="28" y="40" width="64" height="6" rx="3" fill="#F0B020" stroke="#D99B1A" strokeWidth="2" />
      {/* Tiny light/badge on helmet */}
      <circle cx="60" cy="28" r="4" fill="#55A7F7" stroke="#2B7ECC" strokeWidth="1.5" />
      <circle cx="58" cy="26" r="1.5" fill="#FFFFFF" />

      {/* ── ARMS & PROPS BY MOOD ── */}
      {mood === 'excited' && (
        <>
          {/* Waving left arm */}
          <path d="M24 64 Q12 50 16 42" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Right arm down */}
          <path d="M96 66 Q106 74 102 82" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
        </>
      )}

      {mood === 'proud' && (
        <>
          {/* Left hand on hip */}
          <path d="M24 66 Q14 74 20 82" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Right hand thumbs up */}
          <path d="M96 64 Q108 58 106 50" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Sparkly star */}
          <path d="M106 44 L108 38 L114 36 L108 34 L106 28 L104 34 L98 36 L104 38 Z" fill="#FFE28A" stroke="#E58A00" strokeWidth="1" />
        </>
      )}

      {mood === 'thinking' && (
        <>
          {/* Arm scratching chin */}
          <path d="M26 70 Q36 78 48 76" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Arm holding upside down manual */}
          <path d="M94 70 Q104 74 102 84" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Upside down manual booklet */}
          <g transform="translate(92, 70) rotate(165)">
            <rect x="0" y="0" width="16" height="22" rx="2" fill="#7866E8" stroke="#4F3EB8" strokeWidth="1.5" />
            <line x1="3" y1="6" x2="13" y2="6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="11" x2="13" y2="11" stroke="#FFE28A" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="16" x2="9" y2="16" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </>
      )}

      {mood === 'confused' && (
        <>
          {/* Arms out in shrug */}
          <path d="M24 66 Q12 60 10 52" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M96 66 Q108 60 110 52" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Question mark above head */}
          <text x="86" y="24" fill="#7866E8" fontSize="20" fontWeight="bold" fontFamily="sans-serif">?</text>
        </>
      )}

      {mood === 'shocked' && (
        <>
          {/* Hands to cheeks */}
          <path d="M24 68 Q30 76 34 74" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M96 68 Q90 76 86 74" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Shock/zap lines */}
          <path d="M18 36 L12 32 M102 36 L108 32 M60 12 L60 6" stroke="#FF9EAB" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {mood === 'dancing' && (
        <>
          {/* Both arms up high */}
          <path d="M24 60 Q14 46 18 38" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M96 60 Q106 46 102 38" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Musical notes */}
          <text x="14" y="26" fill="#7866E8" fontSize="16">♪</text>
          <text x="96" y="22" fill="#55A7F7" fontSize="18">♫</text>
        </>
      )}

      {mood === 'concerned' && (
        <>
          {/* Holding tiny wrench */}
          <path d="M24 66 Q16 72 18 80" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M96 66 Q106 72 104 80" stroke="#52B687" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Little wrench */}
          <g transform="translate(100, 72) rotate(35)">
            <rect x="0" y="0" width="5" height="18" rx="2" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />
            <circle cx="2.5" cy="2" r="4" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />
          </g>
        </>
      )}

      {/* ── EYES & EXPRESSION ── */}
      {mood === 'excited' && (
        <>
          {/* Big happy eyes */}
          <circle cx="48" cy="60" r="5.5" fill="#252541" />
          <circle cx="50" cy="58" r="2" fill="#FFFFFF" />
          <circle cx="72" cy="60" r="5.5" fill="#252541" />
          <circle cx="74" cy="58" r="2" fill="#FFFFFF" />
          {/* Open happy smile */}
          <path d="M52 68 Q60 77 68 68 Z" fill="#252541" />
          <path d="M55 72 Q60 76 65 72" stroke="#FF9EAB" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {mood === 'proud' && (
        <>
          {/* Proud closed-eye smile ^-^ */}
          <path d="M44 60 Q49 54 54 60" stroke="#252541" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M66 60 Q71 54 76 60" stroke="#252541" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Cute tooth smile */}
          <path d="M52 68 Q60 76 68 68" stroke="#252541" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}

      {mood === 'thinking' && (
        <>
          {/* Looking up & to the side */}
          <circle cx="50" cy="57" r="5" fill="#252541" />
          <circle cx="52" cy="55" r="1.8" fill="#FFFFFF" />
          <circle cx="74" cy="57" r="5" fill="#252541" />
          <circle cx="76" cy="55" r="1.8" fill="#FFFFFF" />
          {/* Tilted mouth */}
          <path d="M55 70 Q60 67 67 70" stroke="#252541" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {mood === 'confused' && (
        <>
          {/* One eye bigger, tilted */}
          <circle cx="47" cy="58" r="6" fill="#252541" />
          <circle cx="49" cy="56" r="2.2" fill="#FFFFFF" />
          <circle cx="73" cy="62" r="4" fill="#252541" />
          {/* Wavy mouth */}
          <path d="M52 70 Q56 73 60 70 Q64 67 68 70" stroke="#252541" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {mood === 'shocked' && (
        <>
          {/* Wide shocked circles */}
          <circle cx="48" cy="58" r="6.5" fill="#252541" />
          <circle cx="49" cy="56" r="2.5" fill="#FFFFFF" />
          <circle cx="72" cy="58" r="6.5" fill="#252541" />
          <circle cx="73" cy="56" r="2.5" fill="#FFFFFF" />
          {/* Open 'O' mouth */}
          <ellipse cx="60" cy="72" rx="5" ry="7" fill="#252541" />
        </>
      )}

      {mood === 'dancing' && (
        <>
          {/* Joyful arches */}
          <path d="M44 60 Q49 53 54 60" stroke="#252541" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M66 60 Q71 53 76 60" stroke="#252541" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Big happy mouth */}
          <path d="M50 67 Q60 79 70 67 Z" fill="#252541" />
        </>
      )}

      {mood === 'concerned' && (
        <>
          {/* Slightly worried puppy eyes */}
          <circle cx="48" cy="60" r="5.5" fill="#252541" />
          <circle cx="50" cy="58" r="2" fill="#FFFFFF" />
          <circle cx="72" cy="60" r="5.5" fill="#252541" />
          <circle cx="74" cy="58" r="2" fill="#FFFFFF" />
          {/* Worried eyebrows */}
          <path d="M44 52 Q49 55 54 52" stroke="#252541" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M66 52 Q71 55 76 52" stroke="#252541" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Small gentle frown */}
          <path d="M54 72 Q60 68 66 72" stroke="#252541" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}
    </motion.svg>
  );
}
