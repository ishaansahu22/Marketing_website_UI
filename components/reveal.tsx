'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const hiddenMap: Record<Direction, string> = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-8',
  right: '-translate-x-8',
  none: '',
}

/**
 * Scroll-triggered reveal — fades + slides children into place the first time
 * they enter the viewport. LaunchDarkly-style staggered entrances.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  as: Tag = 'div',
  once = true,
}: {
  children: React.ReactNode
  className?: string
  direction?: Direction
  delay?: number
  as?: React.ElementType
  once?: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion, or bail out gracefully if the API is missing.
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        typeof IntersectionObserver === 'undefined')
    ) {
      setVisible(true)
      return
    }

    // If the element is already in the viewport at mount, reveal immediately.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
      if (once) return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)

    // Fail-safe: never leave content permanently blank if the observer
    // doesn't fire (e.g. inside a preview iframe that swallows scroll events).
    const fallback = window.setTimeout(() => setVisible(true), 1200)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [once])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
        visible
          ? 'translate-x-0 translate-y-0 opacity-100 blur-0'
          : cn('opacity-0 blur-[2px]', hiddenMap[direction]),
        className,
      )}
    >
      {children}
    </Tag>
  )
}
