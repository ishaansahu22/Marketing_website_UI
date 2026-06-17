'use client'

import { useEffect, useState } from 'react'
import { IntroOverlay } from '@/components/daybricks/intro-overlay'

const SESSION_KEY = 'daybricks-intro-played'

export function IntroGate() {
  // Default to true so the server sends the intro overlay in the HTML.
  // This prevents the homepage from flashing before hydration.
  const [show, setShow] = useState<boolean>(true)

  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === '1'

    if (reduce || alreadyPlayed) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setShow(false)
      return
    }

    sessionStorage.setItem(SESSION_KEY, '1')
    // lock scroll while the cinematic plays
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!show) return null

  return (
    <div id="intro-gate">
      <IntroOverlay
        onDone={() => {
          document.body.style.overflow = ''
          setShow(false)
        }}
      />
    </div>
  )
}
