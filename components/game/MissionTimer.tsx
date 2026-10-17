'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { Clock, AlertCircle } from 'lucide-react';

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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerActive, phase, tickTimer]);

  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const isUrgent = timerSeconds <= 30 && timerSeconds > 0;
  const isDanger = timerSeconds <= 10 && timerSeconds > 0;

  const totalTime = 180;
  const progress = Math.max(0, timerSeconds / totalTime);

  const ringColor = isDanger ? '#F25A71' : isUrgent ? '#E58A00' : '#7866E8';
  const textColor = isDanger ? '#F25A71' : isUrgent ? '#E58A00' : '#252541';

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-[#E8E5DC] shadow-sm select-none">
      {/* Circular Progress Ring */}
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        <svg width="32" height="32" className="-rotate-90">
          <circle
            cx="16"
            cy="16"
            r="13"
            fill="none"
            stroke="#E8E5DC"
            strokeWidth="2.5"
          />
          <motion.circle
            cx="16"
            cy="16"
            r="13"
            fill="none"
            stroke={ringColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 13}`}
            strokeDashoffset={`${2 * Math.PI * 13 * (1 - progress)}`}
            transition={{ duration: 0.5 }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          {isUrgent ? (
            <AlertCircle size={13} style={{ color: ringColor }} />
          ) : (
            <Clock size={13} style={{ color: ringColor }} />
          )}
        </div>
      </div>

      {/* Numerical Time */}
      <div
        className="font-mono font-bold text-sm tracking-wider"
        style={{ color: textColor }}
      >
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>
    </div>
  );
}
