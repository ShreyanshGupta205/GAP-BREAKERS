'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BridgeSectionState } from '@/types/game';

interface BridgeSectionProps {
  section: 1 | 2 | 3;
  state: BridgeSectionState;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const STATE_COLORS: Record<BridgeSectionState, string> = {
  broken: '#2d3748',
  glowing: '#00f5ff',
  repaired: '#00f5ff',
};

export default function BridgeSection({ section, state, x1, y1, x2, y2 }: BridgeSectionProps) {
  const color = STATE_COLORS[state];
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  return (
    <g>
      {/* Rail top */}
      <motion.line
        x1={x1} y1={y1 - 8} x2={x2} y2={y2 - 8}
        stroke={color}
        strokeWidth={state === 'broken' ? 2 : 2.5}
        strokeLinecap="round"
        strokeDasharray={state === 'broken' ? '6 4' : undefined}
        animate={{
          stroke: color,
          opacity: state === 'broken' ? 0.4 : 1,
          filter: state === 'repaired' ? `drop-shadow(0 0 6px ${color})` : undefined,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Main beam */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        strokeWidth={state === 'broken' ? 5 : 7}
        strokeLinecap="round"
        strokeDasharray={state === 'broken' ? '8 6' : undefined}
        animate={{
          stroke: color,
          opacity: state === 'broken' ? 0.35 : 1,
        }}
        transition={{ duration: 0.8 }}
        style={{ filter: state !== 'broken' ? `drop-shadow(0 0 8px ${color})` : undefined }}
      />

      {/* Rail bottom */}
      <motion.line
        x1={x1} y1={y1 + 8} x2={x2} y2={y2 + 8}
        stroke={color}
        strokeWidth={state === 'broken' ? 2 : 2.5}
        strokeLinecap="round"
        strokeDasharray={state === 'broken' ? '6 4' : undefined}
        animate={{
          stroke: color,
          opacity: state === 'broken' ? 0.4 : 1,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Cross-beams for repaired/glowing */}
      {state !== 'broken' && (
        <>
          {[0.25, 0.5, 0.75].map((t) => {
            const cx = x1 + (x2 - x1) * t;
            const cy = y1 + (y2 - y1) * t;
            return (
              <motion.line
                key={t}
                x1={cx} y1={cy - 8}
                x2={cx} y2={cy + 8}
                stroke={color}
                strokeWidth={1.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            );
          })}
        </>
      )}

      {/* Glowing pulse for active state */}
      {state === 'glowing' && (
        <motion.line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ filter: `blur(4px)` }}
        />
      )}

      {/* Repair particles */}
      <AnimatePresence>
        {state === 'repaired' && (
          <>
            {[0.2, 0.5, 0.8].map((t) => {
              const px = x1 + (x2 - x1) * t;
              const py = y1 + (y2 - y1) * t;
              return (
                <motion.circle
                  key={`particle-${section}-${t}`}
                  cx={px} cy={py}
                  r={3}
                  fill={color}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -20 }}
                  transition={{ duration: 1.2, delay: t * 0.3 }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Section label */}
      <text
        x={(x1 + x2) / 2}
        y={y1 + 28}
        textAnchor="middle"
        fontSize="9"
        fill={state === 'broken' ? 'rgba(255,255,255,0.2)' : color}
        fontFamily="monospace"
        letterSpacing="1"
        opacity={0.7}
      >
        S{section}
      </text>
    </g>
  );
}
