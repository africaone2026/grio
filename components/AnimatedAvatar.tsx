'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type AvatarState = 'idle' | 'speaking' | 'thinking' | 'listening' | 'celebrating';

interface AnimatedAvatarProps {
  state: AvatarState;
  isSpeaking: boolean;
  glowColor?: string;
}

const GLOW_COLORS: Record<string, string> = {
  teal: 'rgba(20, 184, 166, 0.4)',
  blue: 'rgba(59, 130, 246, 0.4)',
  amber: 'rgba(245, 158, 11, 0.4)',
  emerald: 'rgba(16, 185, 129, 0.4)',
};

function AvatarEyes({ state, isSpeaking }: { state: AvatarState; isSpeaking: boolean }) {
  const [blinkPhase, setBlinkPhase] = useState(false);

  useEffect(() => {
    if (state === 'celebrating') return;
    const interval = setInterval(() => {
      setBlinkPhase(true);
      setTimeout(() => setBlinkPhase(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [state]);

  if (state === 'celebrating') {
    return (
      <>
        <motion.path
          d="M 56 68 Q 62 60 68 68"
          stroke="#2dd4bf"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M 92 68 Q 98 60 104 68"
          stroke="#2dd4bf"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3 }}
        />
      </>
    );
  }

  const eyeScaleY = blinkPhase ? 0.1 : 1;
  const eyeOffsetX = state === 'thinking' ? 3 : 0;
  const eyeWidth = state === 'listening' ? 1.15 : 1;

  return (
    <>
      <motion.ellipse
        cx={62}
        cy={66}
        rx={5}
        ry={6}
        fill="#2dd4bf"
        animate={{
          scaleY: eyeScaleY,
          x: eyeOffsetX,
          scaleX: eyeWidth,
        }}
        transition={{ duration: 0.1 }}
        style={{ originX: '62px', originY: '66px' }}
      />
      <motion.ellipse
        cx={98}
        cy={66}
        rx={5}
        ry={6}
        fill="#2dd4bf"
        animate={{
          scaleY: eyeScaleY,
          x: eyeOffsetX,
          scaleX: eyeWidth,
        }}
        transition={{ duration: 0.1 }}
        style={{ originX: '98px', originY: '66px' }}
      />
      <motion.circle cx={63} cy={64} r={2} fill="#0B1220" animate={{ x: eyeOffsetX }} />
      <motion.circle cx={99} cy={64} r={2} fill="#0B1220" animate={{ x: eyeOffsetX }} />
    </>
  );
}

function AvatarMouth({ state, isSpeaking }: { state: AvatarState; isSpeaking: boolean }) {
  if (state === 'celebrating') {
    return (
      <motion.path
        d="M 68 90 Q 80 105 92 90"
        stroke="#2dd4bf"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ['M 68 90 Q 80 105 92 90', 'M 68 88 Q 80 108 92 88', 'M 68 90 Q 80 105 92 90'] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    );
  }

  if (state === 'thinking') {
    return (
      <motion.ellipse
        cx={80}
        cy={92}
        rx={4}
        ry={3}
        fill="#2dd4bf"
        opacity={0.6}
        animate={{ rx: [4, 5, 4], ry: [3, 2, 3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    );
  }

  if ((state === 'speaking' && isSpeaking) || (state === 'listening' && isSpeaking)) {
    return (
      <motion.ellipse
        cx={80}
        cy={92}
        rx={7}
        ry={2}
        fill="#2dd4bf"
        animate={{
          ry: [2, 6, 3, 7, 2, 5, 2],
          rx: [7, 8, 6, 9, 7, 8, 7],
        }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    );
  }

  return (
    <motion.path
      d="M 72 90 Q 80 97 88 90"
      stroke="#2dd4bf"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      animate={{ d: ['M 72 90 Q 80 97 88 90', 'M 72 90 Q 80 95 88 90', 'M 72 90 Q 80 97 88 90'] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  );
}

function ThinkingDots() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={120 + i * 12}
          cy={55}
          r={3}
          fill="#2dd4bf"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </g>
  );
}

function CelebrationParticles() {
  const particles = [
    { x: 40, y: 25, color: '#2dd4bf' },
    { x: 120, y: 25, color: '#34d399' },
    { x: 30, y: 50, color: '#fbbf24' },
    { x: 130, y: 50, color: '#2dd4bf' },
    { x: 45, y: 110, color: '#34d399' },
    { x: 115, y: 110, color: '#fbbf24' },
  ];

  return (
    <g>
      {particles.map((p, i) => (
        <motion.circle
          key={i}
          cx={80}
          cy={80}
          r={3}
          fill={p.color}
          initial={{ opacity: 0, cx: 80, cy: 80 }}
          animate={{
            opacity: [0, 1, 0],
            cx: [80, p.x],
            cy: [80, p.y],
            r: [2, 4, 1],
          }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
        />
      ))}
    </g>
  );
}

export default function AnimatedAvatar({ state, isSpeaking, glowColor = 'teal' }: AnimatedAvatarProps) {
  const resolvedGlow = GLOW_COLORS[glowColor] || GLOW_COLORS.teal;

  const containerVariants = {
    idle: {
      y: [0, -4, 0],
      rotate: 0,
      scale: 1,
      transition: { y: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } },
    },
    speaking: {
      y: [0, -2, 0],
      rotate: [0, 1, -1, 0],
      scale: 1,
      transition: {
        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
        rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
      },
    },
    thinking: {
      y: [0, -2, 0],
      rotate: 0,
      scale: 1,
      transition: { y: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
    },
    listening: {
      y: [0, -3, 0],
      rotate: 5,
      scale: 1,
      transition: { y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }, rotate: { duration: 0.5 } },
    },
    celebrating: {
      y: [0, -12, 0],
      rotate: 0,
      scale: [1, 1.08, 1],
      transition: {
        y: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' as const },
        scale: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' as const },
      },
    },
  };

  const glowVariants = {
    idle: {
      opacity: [0.2, 0.4, 0.2],
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity },
    },
    speaking: {
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.1, 1],
      transition: { duration: 1.2, repeat: Infinity },
    },
    thinking: {
      opacity: [0.15, 0.5, 0.15],
      scale: [1, 1.08, 1],
      transition: { duration: 1.5, repeat: Infinity },
    },
    listening: {
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.06, 1],
      transition: { duration: 2, repeat: Infinity },
    },
    celebrating: {
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.15, 1],
      transition: { duration: 0.6, repeat: Infinity },
    },
  };

  return (
    <div className="relative flex items-center justify-center mb-8" style={{ width: 180, height: 180 }}>
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 170,
          height: 170,
          background: `radial-gradient(circle, ${resolvedGlow} 0%, transparent 70%)`,
          filter: 'blur(12px)',
        }}
        variants={glowVariants}
        animate={state}
      />

      <motion.div
        className="absolute rounded-full border border-teal-500/20"
        style={{ width: 170, height: 170 }}
        animate={
          state === 'speaking' || state === 'listening'
            ? { scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }
            : { scale: 1, opacity: 0.3 }
        }
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      <motion.svg
        viewBox="0 0 160 160"
        width={160}
        height={160}
        variants={containerVariants}
        animate={state}
        className="relative z-10"
      >
        <defs>
          <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a3a5c" />
            <stop offset="100%" stopColor="#0f2540" />
          </linearGradient>
          <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e4060" />
            <stop offset="100%" stopColor="#152d45" />
          </linearGradient>
        </defs>

        <motion.circle
          cx={80}
          cy={80}
          r={52}
          fill="url(#headGrad)"
          stroke="#2dd4bf"
          strokeWidth={1.5}
          strokeOpacity={0.3}
        />

        <circle cx={80} cy={78} r={44} fill="url(#faceGrad)" opacity={0.5} />

        <AvatarEyes state={state} isSpeaking={isSpeaking} />
        <AvatarMouth state={state} isSpeaking={isSpeaking} />

        <text
          x={80}
          y={47}
          textAnchor="middle"
          fill="#2dd4bf"
          fontSize="11"
          fontWeight="700"
          letterSpacing="2"
          opacity={0.5}
        >
          GRIO
        </text>

        <AnimatePresence>
          {state === 'thinking' && <ThinkingDots />}
        </AnimatePresence>
        <AnimatePresence>
          {state === 'celebrating' && <CelebrationParticles />}
        </AnimatePresence>
      </motion.svg>
    </div>
  );
}
