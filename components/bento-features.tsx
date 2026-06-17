'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Repeat, Wallet, Route, Layers, WifiOff, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

function Card({
  className,
  children,
  glow,
}: {
  className?: string
  children: React.ReactNode
  glow?: 'teal' | 'peach'
}) {
  return (
    <div
      className={cn(
        'spring group relative overflow-hidden rounded-3xl border border-border bg-card p-7 hover:-translate-y-1.5',
        glow === 'teal' ? 'hover:matte-glow-teal' : 'matte',
        glow === 'peach' && 'hover:matte-glow-peach',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Hero card with mouse-driven 3D tilt — LaunchDarkly-style floating panel. */
function TiltCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--ry', `${px * 8}deg`)
      el.style.setProperty('--rx', `${-py * 8}deg`)
    })
  }
  function reset() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        'tilt-3d matte-glow-peach group relative overflow-hidden rounded-3xl border border-border bg-card p-7',
        className,
      )}
    >
      {children}
    </div>
  )
}

function Icon({
  children,
  tone,
}: {
  children: React.ReactNode
  tone: 'teal' | 'peach' | 'yellow'
}) {
  const map = {
    teal: 'bg-teal/15 text-teal',
    peach: 'bg-peach/15 text-peach',
    yellow: 'bg-yellow/15 text-yellow',
  }
  return (
    <span
      className={cn(
        'spring inline-flex size-12 items-center justify-center rounded-2xl group-hover:rotate-6',
        map[tone],
      )}
    >
      {children}
    </span>
  )
}

export function BentoFeatures() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <Reveal className="max-w-2xl">
        <p className="font-script text-2xl leading-none text-peach sm:text-4xl">
          the toolkit ✦
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-balance text-cream sm:text-5xl">
          Every plan is made of parts{' '}
          <span className="font-marker font-normal text-teal-bright">
            you control.
          </span>
        </h2>
      </Reveal>

      <div className="mt-14 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 md:grid-cols-6">
        {/* Swap Engine — hero card with interactive tilt */}
        <Reveal className="md:col-span-4 md:row-span-2" delay={0}>
          <TiltCard className="h-full">
            <Icon tone="peach">
              <Repeat className="size-6" />
            </Icon>
            <h3 className="mt-5 font-display text-2xl font-bold text-cream sm:text-3xl">
              The Swap Engine
            </h3>
            <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Swap any brick for another and the whole day re-routes around it.
              Distance, timing and budget recalculate in real time — no broken
              itineraries, no manual reshuffling.
            </p>
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-border">
              <Image
                src="/bricks/citymap.png"
                alt="A stylized city map showing teal routes re-drawing between activity bricks"
                width={900}
                height={500}
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-72"
              />
              <span className="matte absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-peach px-3 py-1.5 text-xs font-bold text-accent-foreground">
                <Repeat className="size-3.5" /> Modular Routing
              </span>
            </div>
          </TiltCard>
        </Reveal>

        {/* Budget Preserver */}
        <Reveal className="md:col-span-2" delay={80}>
          <Card glow="teal" className="h-full">
            <Icon tone="teal">
              <Wallet className="size-6" />
            </Icon>
            <h3 className="mt-5 font-display text-xl font-bold text-cream">
              Budget Preserver
            </h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Set a daily cap. Every swap keeps your spend honest and flags when
              a brick tips you over.
            </p>
          </Card>
        </Reveal>

        {/* Brick Library */}
        <Reveal className="md:col-span-2" delay={160}>
          <Card className="h-full">
            <Icon tone="yellow">
              <Layers className="size-6" />
            </Icon>
            <h3 className="mt-5 font-display text-xl font-bold text-cream">
              Brick Library
            </h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Hundreds of curated activity bricks — cafes, landmarks, hidden
              gardens — ready to snap in.
            </p>
          </Card>
        </Reveal>

        {/* Smart Routing wide */}
        <Reveal className="md:col-span-3" delay={80}>
          <Card glow="teal" className="h-full">
            <div className="flex items-start gap-4">
              <Icon tone="teal">
                <Route className="size-6" />
              </Icon>
              <div>
                <h3 className="mt-1 font-display text-xl font-bold text-cream">
                  Smart Routing
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  The shortest, sanest path between your bricks — optimized so
                  you spend the day exploring, not backtracking.
                </p>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Time-aware */}
        <Reveal className="md:col-span-3" delay={160}>
          <Card className="h-full">
            <div className="flex items-start gap-4">
              <Icon tone="peach">
                <Clock className="size-6" />
              </Icon>
              <div>
                <h3 className="mt-1 font-display text-xl font-bold text-cream">
                  Time-Aware
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Opening hours and travel time are built into every brick, so
                  your plan always fits the real clock.
                </p>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Offline */}
        <Reveal className="md:col-span-6" delay={80}>
          <Card className="h-full">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <Icon tone="yellow">
                  <WifiOff className="size-6" />
                </Icon>
                <div>
                  <h3 className="font-display text-xl font-bold text-cream">
                    Built for the road, online or off
                  </h3>
                  <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Your day lives on your device. Routes, bricks and budgets
                    stay with you even when the signal drops.
                  </p>
                </div>
              </div>
              <a
                href="#waitlist"
                className="matte press spring sheen shrink-0 rounded-full bg-cream px-6 py-3 text-sm font-bold text-ink hover:bg-beige"
              >
                Join the waitlist
              </a>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
