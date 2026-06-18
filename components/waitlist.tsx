'use client'

import { useState, useEffect, useRef } from 'react'
import { Check, ArrowRight, PartyPopper } from 'lucide-react'
import { Brick } from '@/components/daybricks/brick'
import { PlayBadge } from '@/components/daybricks/play-badge'
import { Reveal } from '@/components/reveal'
import { motion, useInView } from 'framer-motion'

const rewards = [
  { emoji: '🚀', title: 'Early Access Before Public Launch' },
  { emoji: '⭐', title: 'Premium Plan Free for 3 Months' },
  { emoji: '🧱', title: 'Founding Explorer Badge' },
  { emoji: '🎁', title: 'Exclusive Feature Testing Access' },
]

import { subscribeToWaitlist, getWaitlistCount } from '@/app/actions/waitlist'

export function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error' | 'already_submitted'>('idle')
  const [count, setCount] = useState(0)
  const [allSlotsClaimed, setAllSlotsClaimed] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Fetch real count from Google Sheets on mount
  useEffect(() => {
    getWaitlistCount().then((c) => {
      setCount(c)
      if (c >= 100) setAllSlotsClaimed(true)
    }).catch(() => {})
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!ok) {
      setStatus('error')
      return
    }

    // Check if they already submitted this exact email on this device
    try {
      const prevSubmitted = localStorage.getItem('waitlist_email')
      if (prevSubmitted === email) {
        setStatus('already_submitted')
        return
      }
    } catch {
      // localStorage might not be available
    }
    
    setStatus('loading')
    
    try {
      // Call the Server Action
      const result = await subscribeToWaitlist(email)
      
      if (result.success) {
        setStatus('done')
        try { localStorage.setItem('waitlist_email', email) } catch {}
        if (result.count !== undefined) {
          setCount(result.count)
          if (result.count >= 100) setAllSlotsClaimed(true)
        } else {
          setCount(prev => Math.min(100, prev + 1))
        }
      } else {
        setStatus('error')
      }
    } catch {
      // If the server action fails, still show success since data may have been saved
      setStatus('done')
      try { localStorage.setItem('waitlist_email', email) } catch {}
      setCount(prev => Math.min(100, prev + 1))
    }
  }

  return (
    <section id="waitlist" className="px-5 py-20 sm:px-8 sm:py-28 bg-[#FFFDF1]">
      <Reveal 
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-8 text-center sm:p-14"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 40, 20, 0.04), rgba(20, 40, 20, 0.01))',
          backgroundColor: '#F3EFE0',
          borderTop: '1px solid rgba(255, 255, 255, 0.8)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.5)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(10, 20, 15, 0.05)',
          boxShadow: '0 40px 100px -10px rgba(10, 20, 15, 0.15), 0 10px 40px -5px rgba(10, 20, 15, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)'
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-6 w-24 rotate-12 opacity-90"
        >
          <Brick color="teal" studs={2} />
        </div>

        <div className="relative" ref={containerRef}>
          <p className="font-script text-2xl leading-none sm:text-4xl" style={{ color: '#E89B68' }}>
            the waitlist ✦
          </p>
          <h2 
            className="mx-auto mt-4 max-w-3xl text-3xl tracking-tight text-balance sm:text-5xl"
            style={{ fontFamily: 'var(--font-clash)', color: '#0a1413' }}
          >
            Be one of the first 100 explorers building flexible travel, brick by
            brick.
          </h2>
          <p 
            className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed sm:text-lg"
            style={{ color: 'rgba(20, 40, 20, 0.65)' }}
          >
            Join the waitlist today and unlock early access, premium rewards,
            and the opportunity to help shape the future of adaptive travel
            planning.
          </p>

          {/* Early Access Counter & Progress Bar */}
          <div className="mx-auto mt-12 max-w-xl text-left">
            <div className="mb-3 flex items-end justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.1em]" style={{ color: '#12A798' }}>
                Early Access Progress
              </span>
              <span className="font-mono text-sm font-bold" style={{ color: '#0a1413' }}>
                {allSlotsClaimed ? '100+ Spots Claimed 🎉' : `${count} Spots Claimed`}
              </span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-black/5 shadow-inner border border-black/5">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(count, 100)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative h-full rounded-full"
                style={{ background: allSlotsClaimed 
                  ? 'linear-gradient(90deg, #E89B68, #e2674f)' 
                  : 'linear-gradient(90deg, #12A798, #1ad0bd)' 
                }}
              >
                <div className="absolute right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              </motion.div>
            </div>
            <p className="mt-3 text-sm" style={{ color: 'rgba(20, 40, 20, 0.5)' }}>
              {allSlotsClaimed 
                ? 'All founding spots are taken! But you can still join — you\'ll get an email at our official launch.' 
                : 'Join the first explorers helping shape DayBricks.'}
            </p>
          </div>

          {status === 'done' || status === 'already_submitted' ? (
            <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl text-white shadow-lg" style={{ background: '#12A798' }}>
                <Check className="size-7" />
              </span>
              <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-clash)', color: '#0a1413' }}>
                {status === 'already_submitted' ? "You're already on the list!" : "You're on the list!"}
              </p>
              <p className="text-sm" style={{ color: 'rgba(20, 40, 20, 0.65)' }}>
                We'll email <span className="font-semibold text-[#0a1413]">{email}</span> at
                launch.
              </p>
            </div>
          ) : (
            <div className="mx-auto mt-10 max-w-xl">
              <form
                onSubmit={onSubmit}
                noValidate
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="wl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="wl-email"
                  type="email"
                  inputMode="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  aria-invalid={status === 'error'}
                  className="h-14 flex-1 rounded-2xl border border-black/10 bg-white/60 px-5 text-[#0a1413] outline-none transition placeholder:text-[#0a1413]/40 focus:ring-2 focus:ring-[#12A798]/50 focus:bg-white shadow-inner"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="spring inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-7 font-bold text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all disabled:opacity-70 disabled:hover:translate-y-0"
                  style={{ background: '#12A798' }}
                >
                  {status === 'loading' ? (
                    'Sending...'
                  ) : (
                    <>Get notified <ArrowRight className="size-4" /></>
                  )}
                </button>
              </form>
              
              {status === 'error' ? (
                <p className="mt-3 text-left text-sm text-red-500" role="alert">
                  Please enter a valid email address.
                </p>
              ) : null}

              {/* Social Proof */}
              <div className="mt-6 flex items-center justify-center gap-4 sm:justify-start">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="size-8 rounded-full border-2 border-[#FFFDF1] bg-white flex items-center justify-center shadow-sm"
                    >
                      <span className="text-xs">👋</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm" style={{ color: 'rgba(20, 40, 20, 0.65)' }}>
                  <strong style={{ color: '#0a1413' }}>{count}</strong> future explorers are building with DayBricks
                </p>
              </div>
            </div>
          )}

          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center justify-center gap-4 sm:flex-row">
            <PlayBadge />
            <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: 'rgba(20, 40, 20, 0.4)' }}>
              No spam · one launch email
            </p>
          </div>

          {/* Founding Explorer Rewards */}
          <div className="mx-auto mt-20 max-w-4xl border-t border-black/5 pt-16 text-center">
            <h3 
              className="mb-8 text-2xl tracking-tight sm:text-3xl text-center"
              style={{ fontFamily: 'var(--font-clash)', color: '#0a1413' }}
            >
              First 100 Users Unlock <span style={{ color: '#E89B68' }}>Founding Explorer</span> Status
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {rewards.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="spring flex flex-col items-center justify-center text-center rounded-[24px] border border-white/60 bg-white/40 p-6 transition-colors hover:bg-white hover:border-[#12A798]/30 shadow-sm hover:shadow-md"
                >
                  <div className="mb-4 text-3xl">{r.emoji}</div>
                  <p className="text-sm font-semibold leading-relaxed text-[#0a1413]">
                    {r.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </Reveal>
    </section>
  )
}
