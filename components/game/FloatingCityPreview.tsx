'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Bloop from './Bloop';

export default function FloatingCityPreview() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 880,
        margin: '0 auto',
        height: 340,
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F8FD 100%)',
        borderRadius: 28,
        border: '2px solid #E8E5DC',
        boxShadow: '0 16px 40px rgba(37, 37, 65, 0.06)',
        padding: '1rem',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Soft pastel aura background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <div
          style={{
            width: 500,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(120, 102, 232, 0.12) 0%, rgba(85, 167, 247, 0.08) 50%, rgba(155, 231, 196, 0.05) 100%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* Floating Speech Bubbles - 4 Corners */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 16,
          left: 20,
          zIndex: 20,
          background: '#FFFFFF',
          border: '1.5px solid #7866E8',
          borderRadius: 16,
          padding: '0.4rem 0.85rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          boxShadow: '0 4px 14px rgba(120, 102, 232, 0.12)',
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: '#7866E8' }}>“Wait… what does that mean?”</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        style={{
          position: 'absolute',
          top: 16,
          right: 20,
          zIndex: 20,
          background: '#FFFFFF',
          border: '1.5px solid #55A7F7',
          borderRadius: 16,
          padding: '0.4rem 0.85rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          boxShadow: '0 4px 14px rgba(85, 167, 247, 0.12)',
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: '#1D6FB8' }}>“I have half the answer!”</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: 16,
          left: 20,
          zIndex: 20,
          background: '#FFFFFF',
          border: '1.5px solid #9BE7C4',
          borderRadius: 16,
          padding: '0.4rem 0.85rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          boxShadow: '0 4px 14px rgba(155, 231, 196, 0.15)',
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: '#1A7A4E' }}>“Teamwork loading…”</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 20,
          zIndex: 20,
          background: '#FFFFFF',
          border: '1.5px solid #FFE28A',
          borderRadius: 16,
          padding: '0.4rem 0.85rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          boxShadow: '0 4px 14px rgba(255, 226, 138, 0.2)',
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: '#996A00' }}>“Did anyone bring a bridge?”</span>
      </motion.div>

      {/* SVG Canvas for Floating Islands and Broken Bridge */}
      <svg
        viewBox="0 0 850 320"
        style={{ width: '100%', height: '100%', display: 'block', position: 'relative', zIndex: 10 }}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Island 1 Gradient */}
          <linearGradient id="islandTop1" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#9BE7C4" />
            <stop offset="100%" stopColor="#78E0B3" />
          </linearGradient>
          <linearGradient id="islandBody1" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#E2DDD5" />
            <stop offset="100%" stopColor="#BFB9AF" />
          </linearGradient>

          {/* Island 2 Gradient */}
          <linearGradient id="islandTop2" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#A89CF5" />
            <stop offset="100%" stopColor="#7866E8" />
          </linearGradient>

          {/* Filter */}
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Floating Clouds */}
        <g opacity="0.8">
          <ellipse cx="140" cy="50" rx="45" ry="16" fill="#FFFFFF" />
          <ellipse cx="170" cy="44" rx="30" ry="20" fill="#FFFFFF" />
          <ellipse cx="710" cy="60" rx="50" ry="18" fill="#FFFFFF" />
          <ellipse cx="740" cy="54" rx="35" ry="22" fill="#FFFFFF" />
        </g>

        {/* ── LEFT ISLAND (Navigator & Decoder Side) ── */}
        <g>
          {/* Island Rock Body */}
          <path
            d="M 60 180 Q 160 180 270 180 Q 240 260 180 285 Q 110 275 60 180 Z"
            fill="url(#islandBody1)"
            stroke="#9E9689"
            strokeWidth="2.5"
          />
          {/* Grassy Top Plateau */}
          <path
            d="M 50 180 C 70 168, 140 166, 210 170 C 250 172, 280 178, 280 184 C 280 190, 240 196, 170 196 C 100 196, 50 188, 50 180 Z"
            fill="url(#islandTop1)"
            stroke="#52B687"
            strokeWidth="3"
          />

          {/* Cute Foliage & Rune Monolith */}
          <circle cx="100" cy="165" r="14" fill="#52B687" />
          <rect x="98" y="174" width="4" height="8" rx="2" fill="#7D6F5E" />

          <circle cx="130" cy="168" r="11" fill="#7866E8" opacity="0.8" />
          <rect x="128" y="176" width="4" height="6" rx="2" fill="#7D6F5E" />

          <polygon points="190,145 198,175 182,175" fill="#55A7F7" stroke="#2B7ECC" strokeWidth="2" />
          <circle cx="190" cy="160" r="3" fill="#FFE28A" />

          {/* Left Bridge Pier */}
          <rect x="260" y="172" width="22" height="14" rx="4" fill="#74748A" stroke="#525266" strokeWidth="2" />
          <circle cx="271" cy="170" r="4" fill="#55A7F7" filter="url(#softGlow)" />
        </g>

        {/* ── THE BROKEN BRIDGE IN THE CENTER ── */}
        <g>
          {/* Section 1 Planks */}
          <rect x="284" y="174" width="38" height="10" rx="3" fill="#FFE28A" stroke="#D99B1A" strokeWidth="2" />
          <rect x="326" y="176" width="34" height="9" rx="3" fill="#FFE28A" stroke="#D99B1A" strokeWidth="2" />

          {/* Blueprint Gap Lines */}
          <g opacity="0.7">
            <line
              x1="365"
              y1="179"
              x2="520"
              y2="179"
              stroke="#7866E8"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <circle cx="410" cy="172" r="3" fill="#FF9EAB" />
            <circle cx="445" cy="162" r="4" fill="#55A7F7" />
            <circle cx="475" cy="179" r="3" fill="#FFE28A" />
          </g>

          {/* Section 3 Planks */}
          <rect x="524" y="176" width="36" height="9" rx="3" fill="#FFE28A" stroke="#D99B1A" strokeWidth="2" />
        </g>

        {/* ── RIGHT ISLAND (Engineer & Energy Core) ── */}
        <g>
          {/* Island Rock Body */}
          <path
            d="M 550 180 Q 660 180 770 180 Q 740 260 680 290 Q 600 270 550 180 Z"
            fill="url(#islandBody1)"
            stroke="#9E9689"
            strokeWidth="2.5"
          />
          {/* Purple Plateau Top */}
          <path
            d="M 540 180 C 560 168, 630 166, 700 170 C 740 172, 780 178, 780 184 C 780 190, 740 196, 670 196 C 600 196, 540 188, 540 180 Z"
            fill="url(#islandTop2)"
            stroke="#5B4ABF"
            strokeWidth="3"
          />

          {/* Right Bridge Pier */}
          <rect x="548" y="172" width="22" height="14" rx="4" fill="#74748A" stroke="#525266" strokeWidth="2" />
          <circle cx="559" cy="170" r="4" fill="#FF9EAB" filter="url(#softGlow)" />

          {/* Energy Core Sphere */}
          <circle cx="680" cy="140" r="24" fill="#FFE28A" stroke="#D99B1A" strokeWidth="3" filter="url(#softGlow)" />
          <circle cx="680" cy="140" r="16" fill="#FFF4D0" />
          <circle cx="674" cy="134" r="5" fill="#FFFFFF" />

          {/* Pedestal */}
          <polygon points="665,178 695,178 688,160 672,160" fill="#74748A" stroke="#525266" strokeWidth="2" />
        </g>
      </svg>

      {/* Bloop standing right at the edge of the broken bridge holding a wrench looking concerned! */}
      <div className="absolute top-[100px] left-[310px] sm:left-[325px] z-30">
        <Bloop mood="concerned" size={78} />
      </div>
    </div>
  );
}
