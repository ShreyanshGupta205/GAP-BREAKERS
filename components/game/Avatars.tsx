'use client';

import React from 'react';
import { AvatarId } from '@/types/game';

interface AvatarProps {
  id: AvatarId | string;
  size?: number;
  className?: string;
}

export const AVATAR_LIST: { id: AvatarId; name: string; subtitle: string; bg: string; border: string }[] = [
  { id: 'avatar-1', name: 'Beep', subtitle: 'Curious Bot', bg: '#EBF5FE', border: '#55A7F7' },
  { id: 'avatar-2', name: 'Astro', subtitle: 'Cosmic Cat', bg: '#FFF0F2', border: '#FF9EAB' },
  { id: 'avatar-3', name: 'Codex', subtitle: 'Scholar Owl', bg: '#F0EDFD', border: '#7866E8' },
  { id: 'avatar-4', name: 'Pip', subtitle: 'Sproutling', bg: '#F0FAF5', border: '#9BE7C4' },
  { id: 'avatar-5', name: 'Spark', subtitle: 'Solar Fox', bg: '#FFFBF0', border: '#FFE28A' },
  { id: 'avatar-6', name: 'Gears', subtitle: 'Tinker Bear', bg: '#FDF4EC', border: '#FDBA74' },
];

export default function Avatar({ id, size = 48, className = '' }: AvatarProps) {
  const getAvatarContent = () => {
    switch (id) {
      case 'avatar-1':
        // Beep the Bot
        return (
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none" className={className}>
            <circle cx="40" cy="40" r="38" fill="#EBF5FE" stroke="#55A7F7" strokeWidth="3" />
            {/* Antenna */}
            <line x1="40" y1="20" x2="40" y2="12" stroke="#55A7F7" strokeWidth="3" strokeLinecap="round" />
            <circle cx="40" cy="10" r="4" fill="#FFE28A" stroke="#55A7F7" strokeWidth="2" />
            {/* Robot Head */}
            <rect x="22" y="24" width="36" height="30" rx="8" fill="#FFFFFF" stroke="#55A7F7" strokeWidth="2.5" />
            {/* Screen eyes */}
            <rect x="28" y="32" width="24" height="12" rx="4" fill="#252541" />
            <circle cx="34" cy="38" r="2.5" fill="#55A7F7" />
            <circle cx="46" cy="38" r="2.5" fill="#55A7F7" />
            {/* Cute smile */}
            <path d="M36 48 Q40 51 44 48" stroke="#55A7F7" strokeWidth="2" strokeLinecap="round" />
            {/* Bolts */}
            <circle cx="19" cy="39" r="2.5" fill="#55A7F7" />
            <circle cx="61" cy="39" r="2.5" fill="#55A7F7" />
          </svg>
        );

      case 'avatar-2':
        // Astro the Cosmic Cat
        return (
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none" className={className}>
            <circle cx="40" cy="40" r="38" fill="#FFF0F2" stroke="#FF9EAB" strokeWidth="3" />
            {/* Ears */}
            <path d="M22 28 L28 14 L38 24 Z" fill="#FF9EAB" stroke="#E26578" strokeWidth="2" />
            <path d="M58 28 L52 14 L42 24 Z" fill="#FF9EAB" stroke="#E26578" strokeWidth="2" />
            {/* Head */}
            <circle cx="40" cy="42" r="22" fill="#FFFFFF" stroke="#FF9EAB" strokeWidth="2.5" />
            {/* Eyes */}
            <circle cx="32" cy="40" r="3" fill="#252541" />
            <circle cx="33" cy="39" r="1" fill="#FFFFFF" />
            <circle cx="48" cy="40" r="3" fill="#252541" />
            <circle cx="49" cy="39" r="1" fill="#FFFFFF" />
            {/* Nose & Mouth */}
            <polygon points="40,45 38,48 42,48" fill="#FF9EAB" />
            <path d="M37 50 Q40 53 43 50" stroke="#252541" strokeWidth="1.5" strokeLinecap="round" />
            {/* Whiskers */}
            <line x1="22" y1="44" x2="30" y2="44" stroke="#E26578" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="58" y1="44" x2="50" y2="44" stroke="#E26578" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'avatar-3':
        // Codex the Scholar Owl
        return (
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none" className={className}>
            <circle cx="40" cy="40" r="38" fill="#F0EDFD" stroke="#7866E8" strokeWidth="3" />
            {/* Tuft ears */}
            <path d="M25 24 L20 15 L32 20 Z" fill="#7866E8" />
            <path d="M55 24 L60 15 L48 20 Z" fill="#7866E8" />
            {/* Head */}
            <circle cx="40" cy="42" r="22" fill="#FFFFFF" stroke="#7866E8" strokeWidth="2.5" />
            {/* Big nerdy spectacles */}
            <circle cx="32" cy="40" r="9" fill="rgba(120, 102, 232, 0.1)" stroke="#7866E8" strokeWidth="2.5" />
            <circle cx="48" cy="40" r="9" fill="rgba(120, 102, 232, 0.1)" stroke="#7866E8" strokeWidth="2.5" />
            <line x1="41" y1="40" x2="39" y2="40" stroke="#7866E8" strokeWidth="2.5" />
            {/* Eyes behind glass */}
            <circle cx="33" cy="40" r="3" fill="#252541" />
            <circle cx="47" cy="40" r="3" fill="#252541" />
            {/* Beak */}
            <polygon points="40,46 37,51 43,51" fill="#FFE28A" stroke="#E58A00" strokeWidth="1" />
          </svg>
        );

      case 'avatar-4':
        // Pip the Sproutling
        return (
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none" className={className}>
            <circle cx="40" cy="40" r="38" fill="#F0FAF5" stroke="#9BE7C4" strokeWidth="3" />
            {/* Tiny sprout leaf on top */}
            <path d="M40 24 C40 14, 52 14, 50 20 C48 24, 40 24, 40 24 Z" fill="#52B687" stroke="#2BB67B" strokeWidth="1.5" />
            <path d="M40 24 C40 16, 30 16, 32 21 C34 24, 40 24, 40 24 Z" fill="#9BE7C4" stroke="#2BB67B" strokeWidth="1.5" />
            {/* Head */}
            <circle cx="40" cy="44" r="21" fill="#FFFFFF" stroke="#52B687" strokeWidth="2.5" />
            {/* Eyes */}
            <circle cx="33" cy="42" r="3" fill="#252541" />
            <circle cx="34" cy="41" r="1" fill="#FFFFFF" />
            <circle cx="47" cy="42" r="3" fill="#252541" />
            <circle cx="48" cy="41" r="1" fill="#FFFFFF" />
            {/* Cheeks */}
            <circle cx="28" cy="46" r="3" fill="#FFB0BE" />
            <circle cx="52" cy="46" r="3" fill="#FFB0BE" />
            {/* Smile */}
            <path d="M37 47 Q40 51 43 47" stroke="#252541" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'avatar-5':
        // Spark the Solar Fox
        return (
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none" className={className}>
            <circle cx="40" cy="40" r="38" fill="#FFFBF0" stroke="#FFE28A" strokeWidth="3" />
            {/* Fox Ears */}
            <polygon points="22,30 20,12 34,22" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            <polygon points="58,30 60,12 46,22" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            {/* Head */}
            <circle cx="40" cy="42" r="22" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.5" />
            {/* Eyes */}
            <circle cx="32" cy="41" r="3" fill="#252541" />
            <circle cx="48" cy="41" r="3" fill="#252541" />
            {/* Nose */}
            <circle cx="40" cy="47" r="2" fill="#252541" />
            {/* W-smile */}
            <path d="M36 50 Q38 52 40 50 Q42 52 44 50" stroke="#252541" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'avatar-6':
      default:
        // Gears the Tinker Bear
        return (
          <svg viewBox="0 0 80 80" width={size} height={size} fill="none" className={className}>
            <circle cx="40" cy="40" r="38" fill="#FDF4EC" stroke="#FDBA74" strokeWidth="3" />
            {/* Round Bear Ears */}
            <circle cx="24" cy="24" r="8" fill="#FDBA74" stroke="#EA580C" strokeWidth="2" />
            <circle cx="56" cy="24" r="8" fill="#FDBA74" stroke="#EA580C" strokeWidth="2" />
            {/* Head */}
            <circle cx="40" cy="43" r="22" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.5" />
            {/* Goggles on forehead */}
            <rect x="25" y="27" width="13" height="8" rx="3" fill="#FFE28A" stroke="#D97706" strokeWidth="1.5" />
            <rect x="42" y="27" width="13" height="8" rx="3" fill="#FFE28A" stroke="#D97706" strokeWidth="1.5" />
            <line x1="38" y1="31" x2="42" y2="31" stroke="#D97706" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="33" cy="43" r="2.8" fill="#252541" />
            <circle cx="47" cy="43" r="2.8" fill="#252541" />
            {/* Muzzle */}
            <ellipse cx="40" cy="49" rx="7" ry="5" fill="#FDF4EC" />
            <polygon points="40,47 38,49 42,49" fill="#252541" />
          </svg>
        );
    }
  };

  return <div className="inline-flex items-center justify-center select-none">{getAvatarContent()}</div>;
}
