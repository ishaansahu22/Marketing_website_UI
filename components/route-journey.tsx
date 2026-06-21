'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { Repeat, Wallet, Layers, Route as RouteIcon, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BrickMark } from '@/components/daybricks/logo'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

type Stop = {
  label: string
  title: string
  body: string
  color: 'teal' | 'peach' | 'yellow'
  icon: LucideIcon
  /** position along the route, 0 = start, 1 = end */
  at: number
}

const stops: Stop[] = [
  {
    label: 'Snap it together',
    title: 'Brick Library',
    body: 'Hundreds of curated activity bricks — cafes, landmarks, hidden gardens — ready to snap into your day.',
    color: 'teal',
    icon: Layers,
    at: 0.20,
  },
  {
    label: 'Trade anything',
    title: 'The Swap Engine',
    body: 'Swap any brick for another and the whole day re-routes around it — no broken itineraries, no reshuffling.',
    color: 'peach',
    icon: Repeat,
    at: 0.40,
  },
  {
    label: 'Stay on budget',
    title: 'Budget Preserver',
    body: 'Set a daily cap. Every swap keeps your spend honest and flags the moment a brick tips you over.',
    color: 'yellow',
    icon: Wallet,
    at: 0.60,
  },
  {
    label: 'Never backtrack',
    title: 'Smart Routing',
    body: 'The shortest, sanest path between your bricks — optimized so you spend the day exploring, not walking in circles.',
    color: 'teal',
    icon: RouteIcon,
    at: 0.80,
  },
  {
    label: 'Fits the clock',
    title: 'Time-Aware',
    body: 'Opening hours and travel time live inside every brick, so your plan always fits the real day.',
    color: 'peach',
    icon: Clock,
    at: 1.00,
  },
]

const iconTone: Record<Stop['color'], string> = {
  teal: 'bg-teal/15 text-teal',
  peach: 'bg-peach/15 text-peach',
  yellow: 'bg-yellow/15 text-yellow',
}

export function RouteJourney() {
  const sectionRef = useRef<HTMLElement | null>(null)
  
  // Framer Motion native scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"]
  })

  // Apply a gentle physics spring to smooth out rapid scroll wheel increments
  const progress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001
  })

  return (
    <section id="features" className="relative w-full bg-[#FFFDF1] overflow-clip">
      <div
        ref={sectionRef}
        className="relative mx-auto max-w-[90rem] px-6 pt-20 pb-4 lg:pt-24 lg:pb-8"
      >
        <Reveal className="mx-auto max-w-2xl text-center">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]"
            style={{ color: '#59C749' }}
          >
            THE JOURNEY
          </p>

          <h2
            className="leading-[0.95] tracking-[-0.04em]"
            style={{
              fontFamily: 'var(--font-clash)',
              color: '#59C749',
              fontSize: 'clamp(2.5rem,4vw,5rem)',
            }}
          >
            Watch your day
            <br />
            come together.
          </h2>
        </Reveal>

        {/* Mobile: clean vertical timeline. Desktop (md+): winding SVG route. */}
        <MobileTimeline progress={progress} />
        <DesktopRoute progress={progress} />
      </div>
    </section>
  )
}

/* ----------------------------- Mobile timeline ---------------------------- */

function MobileTimeline({ progress }: { progress: MotionValue<number> }) {
  const heightStr = useTransform(progress, p => `${p * 100}%`)

  return (
    <div className="relative mt-10 md:hidden">
      {/* the dashed spine */}
      <div className="absolute bottom-0 left-[26px] top-0 w-0.5 -translate-x-1/2">
        <div className="h-full w-full bg-[repeating-linear-gradient(to_bottom,rgba(89,199,73,0.2)_0_2px,transparent_2px_10px)]" />
        {/* travelled portion */}
        <motion.div
          className="absolute left-0 top-0 w-full bg-gradient-to-b from-[#59C749] via-[#12A798] to-[#E89B68]"
          style={{ height: heightStr, filter: 'drop-shadow(0 0 12px rgba(89,199,73,0.15))' }}
        />
      </div>

      {/* the travelling logo — moves like a scrollbar thumb */}
      <motion.div
        className="pointer-events-none absolute left-[26px] z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ top: heightStr }}
      >
        <div className="grid size-11 place-items-center rounded-2xl p-1.5"
          style={{
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(89,199,73,0.18)',
            boxShadow: '0 12px 40px rgba(89,199,73,0.08)'
          }}
        >
          <BrickMark className="size-full" />
        </div>
      </motion.div>

      <ol className="flex flex-col gap-5">
        {stops.map((s) => (
          <MobileTimelineItem key={s.title} stop={s} progress={progress} />
        ))}
      </ol>
    </div>
  )
}

function MobileTimelineItem({ stop, progress }: { stop: Stop, progress: MotionValue<number> }) {
  const isVisible = useTransform(progress, p => p >= stop.at - 0.05)
  const isActive = useTransform(progress, p => p >= stop.at)

  const dotBg = useTransform(isActive, active => active ? '#59C749' : 'rgba(89,199,73,0.15)')
  const dotBorder = useTransform(isActive, active => active ? 'none' : '2px solid rgba(89,199,73,0.25)')
  const dotShadow = useTransform(isActive, active => active ? '0 0 0 6px rgba(89,199,73,0.15)' : 'none')

  const cardOpacity = useTransform(isVisible, v => v ? 1 : 0)
  const cardY = useTransform(progress, p => p >= stop.at ? -16 : p >= stop.at - 0.05 ? 0 : 8)
  const cardX = useTransform(isVisible, v => v ? 0 : 12)
  const cardShadow = useTransform(isActive, active => active 
      ? '0 20px 80px rgba(89,199,73,0.08), 0 0 20px rgba(89,199,73,0.15), inset 0 1px 0 rgba(255,255,255,0.5)'
      : '0 20px 80px rgba(89,199,73,0.08), inset 0 1px 0 rgba(255,255,255,0.5)')
  const pointerEvents = useTransform(isVisible, v => v ? 'auto' : 'none')

  const Icon = stop.icon

  return (
    <li className="relative pl-14">
      {/* waypoint dot on the spine */}
      <motion.span
        className="absolute left-[26px] top-6 grid size-3.5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-colors duration-500"
        style={{
          background: dotBg,
          border: dotBorder,
          boxShadow: dotShadow,
        }}
      />
      <motion.div
        className="relative z-0 rounded-[28px] border p-6 transition-colors duration-500"
        style={{
          opacity: cardOpacity,
          y: cardY,
          x: cardX,
          pointerEvents: pointerEvents as any,
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(89,199,73,0.18)',
          borderRadius: '32px',
          boxShadow: cardShadow
        }}
      >
        <div className="flex items-center gap-3">
          <span className={cn('inline-flex size-9 items-center justify-center rounded-xl', iconTone[stop.color])}>
            <Icon className="size-5" />
          </span>
          <span
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: '#59C749', fontFamily: 'var(--font-inter)' }}
          >
            {stop.label}
          </span>
        </div>
        <h3
          className="mt-4 leading-[0.95]"
          style={{ fontFamily: 'var(--font-clash)', color: '#59C749', fontSize: '2rem' }}
        >
          {stop.title}
        </h3>
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: 'rgba(20, 40, 20, 0.65)', fontFamily: 'var(--font-sans-inter)' }}
        >
          {stop.body}
        </p>
      </motion.div>
    </li>
  )
}

/* ----------------------------- Desktop route ------------------------------ */

function DesktopRoute({ progress }: { progress: MotionValue<number> }) {
  // Radius of the orbital ring
  const R = 300
  // Circumference for the SVG progress arc (R - strokeWidth/2)
  const C = 2 * Math.PI * 298

  // The section pins around progress = 0.2 and unpins exactly at progress = 1.0.
  // We normalize this pinned phase to a 0-1 range.
  const pinnedProgress = useTransform(progress, p => Math.min(1, Math.max(0, (p - 0.2) / 0.8)))

  // The logo revolves a full 360 degrees during the pinned phase.
  const logoAngle = useTransform(pinnedProgress, p => p * 360)

  // The progress arc follows the logo perfectly to draw a complete circle.
  const dashOffset = useTransform(pinnedProgress, p => C * (1 - p))

  // Rotate strings
  const logoRotateStr = useTransform(logoAngle, a => `rotate(${a}deg)`)
  const logoCounterRotateStr = useTransform(logoAngle, a => `rotate(${-a}deg)`)

  return (
    <div className="relative hidden md:block" style={{ height: '350vh' }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        
        {/* The central container for the orbital ring and cards */}
        <div className="relative flex items-center justify-center" style={{ width: R * 2, height: R * 2 }}>
          
          {/* The dashed static orbital ring */}
          <div 
            className="absolute z-10 rounded-full border-2 border-dashed border-[#59C749]/20"
            style={{ width: R * 2, height: R * 2 }}
          />

          {/* Glowing progress arc trailing the logo */}
          <svg className="absolute inset-0 z-10 size-full pointer-events-none" style={{ transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#59C749" />
                 <stop offset="33%" stopColor="#12A798" />
                 <stop offset="66%" stopColor="#E89B68" />
                 <stop offset="100%" stopColor="#F2E94E" />
              </linearGradient>
            </defs>
            <motion.circle 
              cx={R} cy={R} r={298} 
              fill="none" stroke="url(#route-gradient)" strokeWidth="4"
              strokeDasharray={C}
              style={{ 
                strokeDashoffset: dashOffset,
                filter: 'drop-shadow(0 0 12px rgba(89,199,73,0.5))',
              }}
            />
          </svg>

          {/* Static Nodes (waypoint dots) */}
          {stops.map((s, i) => (
            <DesktopNode key={`node-${i}`} index={i} logoAngle={logoAngle} />
          ))}

          {/* The Orbiting Logo (Playhead) */}
          <motion.div 
            className="absolute top-0 left-1/2 flex items-center justify-center -translate-x-1/2 z-30 pointer-events-none"
            style={{ 
              height: R * 2,
              rotate: logoAngle,
            }}
          >
            <motion.div 
              className="absolute top-0 -translate-y-1/2 grid size-16 place-items-center rounded-[24px] p-2"
              style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(89,199,73,0.3)',
                boxShadow: '0 12px 40px rgba(89,199,73,0.15)',
                rotate: logoCounterRotateStr,
              }}
            >
              <BrickMark className="size-full" />
            </motion.div>
          </motion.div>

          {/* Central Feature Cards */}
          {stops.map((s, i) => (
             <DesktopCentralCard 
               key={s.title} 
               stop={s} 
               index={i} 
               logoAngle={logoAngle} 
             />
          ))}

        </div>
      </div>
    </div>
  )
}

function DesktopNode({ index, logoAngle }: { index: number, logoAngle: MotionValue<number> }) {
  const localAngle = index * 72
  const R = 300
  
  const isPassed = useTransform(logoAngle, a => a >= localAngle - 1)
  const bg = useTransform(isPassed, p => p ? '#59C749' : '#FFFDF1')
  const border = useTransform(isPassed, p => p ? '2px solid #59C749' : '2px solid rgba(89,199,73,0.3)')
  const boxShadow = useTransform(isPassed, p => p ? '0 0 0 6px rgba(89,199,73,0.15)' : 'none')
  const innerOpacity = useTransform(isPassed, p => p ? 1 : 0)

  return (
    <div 
      className="absolute top-0 left-1/2 flex items-center justify-center -translate-x-1/2"
      style={{ 
        height: R * 2,
        transform: `rotate(${localAngle}deg)`,
      }}
    >
      <motion.div 
        className="absolute top-0 z-20 flex size-5 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-500"
        style={{ background: bg, border, boxShadow }}
      >
        <motion.div 
          className="size-2 rounded-full bg-white transition-opacity duration-500" 
          style={{ opacity: innerOpacity }} 
        />
      </motion.div>
    </div>
  )
}

function DesktopCentralCard({ 
  stop, 
  index, 
  logoAngle 
}: { 
  stop: Stop; 
  index: number; 
  logoAngle: MotionValue<number> 
}) {
  const Icon = stop.icon
  const localAngle = index * 72
  
  const diff = useTransform(logoAngle, a => {
    let d = Math.abs(a - localAngle)
    if (index === 4 && a >= 288) d = 0
    return d
  })
  
  const signedDiff = useTransform(logoAngle, a => {
    let d = a - localAngle
    if (index === 4 && a >= 288) d = 0
    return d
  })
  
  const isActive = useTransform(diff, d => d < 10)
  const opacity = useTransform(diff, d => Math.max(0, 1 - (d / 45)))
  const scale = useTransform(diff, d => Math.max(0.9, 1 - (d / 360)))
  const translateY = useTransform(signedDiff, d => -d * 1.5)
  
  const boxShadow = useTransform(isActive, act => act
    ? '0 24px 80px rgba(89,199,73,0.12), 0 0 20px rgba(89,199,73,0.1), inset 0 1px 0 rgba(255,255,255,0.9)'
    : '0 20px 60px rgba(89,199,73,0.05), inset 0 1px 0 rgba(255,255,255,0.5)'
  )

  const pointerEvents = useTransform(opacity, o => o > 0.1 ? 'auto' : 'none')

  return (
    <motion.div
      className="absolute z-10 w-[360px] lg:w-[440px] p-8 rounded-[32px] transition-colors duration-500"
      style={{
        opacity,
        scale,
        y: translateY,
        boxShadow,
        pointerEvents: pointerEvents as any,
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(32px)',
        border: '1px solid rgba(89,199,73,0.2)',
      }}
    >
      <div className="flex items-center gap-3">
        <span className={cn('inline-flex size-10 items-center justify-center rounded-xl', iconTone[stop.color])}>
          <Icon className="size-5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#59C749', fontFamily: 'var(--font-inter)' }}>
          {stop.label}
        </span>
      </div>
      <h3 className="mt-4 leading-[0.95]" style={{ fontFamily: 'var(--font-clash)', color: '#59C749', fontSize: '2rem' }}>
        {stop.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(20, 40, 20, 0.65)', fontFamily: 'var(--font-sans-inter)' }}>
        {stop.body}
      </p>
    </motion.div>
  )
}
