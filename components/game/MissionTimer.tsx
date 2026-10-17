'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { Clock, AlertTriangle } from 'lucide-react';

export default function MissionTimer() {
  const { timerSeconds, timerActive, phase, tickTimer } = useGameStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerActive && phase !== 'victory' && phase !== 'failure') {
      intervalRef.current = setInterval(() => {
        tickTimer();
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerActive, phase, tickTimer]);

  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const isUrgent = timerSeconds <= 30 && timerSeconds > 0;
  const isDanger = timerSeconds <= 10 && timerSeconds > 0;

  const totalTime = 180;
  const progress = timerSeconds / totalTime;
  const circumference = 2 * Math.PI * 22;
  const strokeDashoffset = circumference * (1 - progress);

  const color = isDanger ? 'var(--color-danger)' : isUrgent ? 'var(--color-amber)' : 'var(--color-cyan)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {/* Circular progress */}
      <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
        <svg width="44" height="44" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background ring */}
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          {/* Progress ring */}
          <motion.circle
            cx="22" cy="22" r="18"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 18}`}
            strokeDashoffset={`${2 * Math.PI * 18 * (1 - progress)}`}
            transition={{ duration: 0.5 }}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
        {/* Icon in center */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {isUrgent ? (
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
              <AlertTriangle size={12} color={color} />
            </motion.div>
          ) : (
            <Clock size={12} color={color} />
          )}
        </div>
      </div>

      {/* Time display */}
      <motion.div
        className="font-mono"
        animate={isDanger ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          color,
          letterSpacing: '0.05em',
          textShadow: isUrgent ? `0 0 12px ${color}` : undefined,
          minWidth: '4rem',
        }}
      >
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </motion.div>
    </div>
  );
}
