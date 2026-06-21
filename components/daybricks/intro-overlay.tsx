'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/daybricks/logo'

export function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'exit' | 'done'>('intro')
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    // Lock scroll while the cinematic plays
    document.body.style.overflow = 'hidden'

    // The whole intro is 3.2s total now to make it a little slower.
    // At 2.4s, we start zooming everything towards the camera to wipe to the page.
    const exitTimer = setTimeout(() => {
      setPhase('exit')
    }, 2400)
    
    // At 3.2s, we completely unmount the intro overlay
    const doneTimer = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
      onDoneRef.current()
    }, 3200)

    return () => {
      document.body.style.overflow = ''
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[100] flex flex-col items-center pt-[25vh] overflow-hidden pointer-events-none"
        >
          {/* Background that fades out */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'exit' ? 0 : 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-[#FFFDF1] pointer-events-auto"
          />

          <motion.div
            className="flex flex-col items-center relative w-full h-full"
          >
            {/* The Logo that stays opaque and flies away */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 50, rotate: -20, left: '50%', x: '-50%', top: '10vh' }}
              animate={
                phase === 'intro'
                  ? { scale: 1, opacity: 1, y: 0, rotate: 0, left: '50%', x: '-50%', top: '10vh' }
                  : { scale: 0.35, opacity: 1, y: 0, rotate: -90, left: '1.5rem', x: '0%', top: '1.5rem' }
              }
              transition={
                phase === 'intro'
                  ? { type: 'spring', stiffness: 200, damping: 12, mass: 1.2, delay: 0.3 }
                  : { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
              }
              className="fixed z-50 pointer-events-none"
            >
              <Logo className="mb-4 scale-125 md:scale-150 drop-shadow-[0_15px_35px_rgba(18,167,152,0.3)]" />
            </motion.div>

            {/* DAYBRICKS Text that fades out with the background */}
            <motion.div
              initial={{ scale: 3, opacity: 0, y: -40, filter: 'blur(10px)' }}
              animate={
                phase === 'intro'
                  ? { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { scale: 1, opacity: 0, y: 0, filter: 'blur(0px)' }
              }
              transition={{ 
                type: phase === 'intro' ? 'spring' : 'tween',
                stiffness: 150,
                damping: 12,
                delay: phase === 'intro' ? 0.8 : 0,
                duration: phase === 'intro' ? undefined : 1.2
              }}
              className="relative z-10"
            >
              <h1
                className="
                  leading-none
                  tracking-tight
                  whitespace-nowrap
                  select-none
                  scale-y-[2.0] md:scale-y-[1.6]
                  origin-top-left
                "
                style={{
                  fontFamily: 'var(--font-display-black)',
                  fontWeight: 400,
                  color: '#3A1E14',
                  fontSize: 'clamp(1.5rem, 15vw, 25rem)', 
                  letterSpacing: '-0.02em',
                  textShadow: '0 20px 40px rgba(58, 30, 20, 0.12)',
                }}
              >
                DAYBRICKS
              </h1>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
