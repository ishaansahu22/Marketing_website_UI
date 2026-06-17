'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Repeat, Clock, MapPin, Wallet } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Block = {
  id: string
  name: string
  kind: string
  img: string
  cost: number
  mins: number
  accent: 'teal' | 'peach'
}

const fixedStart: Block = {
  id: 'start',
  name: 'Old Town Cafe',
  kind: 'Breakfast',
  img: '/bricks/cafe.png',
  cost: 8,
  mins: 45,
  accent: 'peach',
}
const fixedEnd: Block = {
  id: 'end',
  name: 'Sunset Rooftop',
  kind: 'Evening',
  img: '/bricks/rooftop.png',
  cost: 14,
  mins: 60,
  accent: 'peach',
}

const swappable: Block[] = [
  {
    id: 'landmark',
    name: 'Grand Landmark',
    kind: 'Sightseeing',
    img: '/bricks/landmark.png',
    cost: 22,
    mins: 90,
    accent: 'teal',
  },
  {
    id: 'market',
    name: 'Covered Market',
    kind: 'Food & Browse',
    img: '/bricks/market.png',
    cost: 12,
    mins: 60,
    accent: 'teal',
  },
  {
    id: 'garden',
    name: 'Botanical Garden',
    kind: 'Nature',
    img: '/bricks/garden.png',
    cost: 6,
    mins: 75,
    accent: 'teal',
  },
  {
    id: 'viewpoint',
    name: 'Hilltop Viewpoint',
    kind: 'Scenic',
    img: '/bricks/viewpoint.png',
    cost: 0,
    mins: 50,
    accent: 'teal',
  },
]

function BrickCard({ block, badge }: { block: Block; badge?: string }) {
  return (
    <div className="matte relative overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative h-28 w-full sm:h-32">
        <Image
          src={block.img || '/placeholder.svg'}
          alt={block.name}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover"
        />
        {badge ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-peach px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
            <Repeat className="size-3" /> {badge}
          </span>
        ) : null}
      </div>
      <div className="p-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {block.kind}
        </p>
        <p className="mt-1 font-display text-lg font-bold text-cream">
          {block.name}
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" /> {block.mins}m
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Wallet className="size-3.5" />
            {block.cost === 0 ? 'Free' : `$${block.cost}`}
          </span>
        </div>
      </div>
    </div>
  )
}

export function SwapSection() {
  const [index, setIndex] = useState(0)
  const middle = swappable[index]
  const blocks = [fixedStart, middle, fixedEnd]
  const total = blocks.reduce((s, b) => s + b.cost, 0)
  const totalMins = blocks.reduce((s, b) => s + b.mins, 0) + 50 // +travel
  const hrs = Math.floor(totalMins / 60)
  const mins = totalMins % 60
  const budget = 60
  const pct = Math.min(100, Math.round((total / budget) * 100))

  return (
    <section
      id="swap"
      className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-peach/10 blur-[150px]"
      />
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-script text-2xl leading-none text-peach sm:text-4xl">
            modular routing — live ↗
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-balance text-cream sm:text-5xl">
            Swap one brick.{' '}
            <span className="font-marker font-normal text-yellow">
              Watch the day rebuild.
            </span>
          </h2>
          <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Tap swap and trade the middle of your day. The route, the timing and
            the budget all recalculate — try it.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_320px]">
          {/* itinerary track */}
          <div className="grid gap-5 sm:grid-cols-3">
            <BrickCard block={fixedStart} />
            <div className="brick-pop" key={middle.id}>
              <BrickCard block={middle} badge="Swappable" />
            </div>
            <BrickCard block={fixedEnd} />
          </div>

          {/* control + readout */}
          <div className="matte rounded-3xl border border-border bg-card p-6">
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % swappable.length)}
              className="matte-glow-peach press spring sheen flex w-full items-center justify-center gap-2 rounded-2xl bg-peach px-6 py-4 font-display text-lg font-bold text-accent-foreground hover:bg-peach-soft"
            >
              <Repeat className="size-5" /> Swap the middle brick
            </button>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-teal" /> Stops
                </dt>
                <dd className="font-mono font-bold text-cream">3 bricks</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4 text-teal" /> Day length
                </dt>
                <dd className="font-mono font-bold text-cream">
                  {hrs}h {mins.toString().padStart(2, '0')}m
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Wallet className="size-4 text-teal" /> Spend
                </dt>
                <dd className="font-mono font-bold text-cream">
                  ${total}{' '}
                  <span className="text-muted-foreground">/ ${budget}</span>
                </dd>
              </div>
              <div
                className="h-2.5 w-full overflow-hidden rounded-full bg-surface-2"
                role="progressbar"
                aria-valuenow={total}
                aria-valuemin={0}
                aria-valuemax={budget}
                aria-label="Budget used"
              >
                <div
                  className="h-full rounded-full bg-teal transition-all duration-500 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                Budget preserved — {budget - total} dollars to spare.
              </p>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
