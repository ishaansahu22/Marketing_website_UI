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
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'exit' ? 0 : 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#FFFDF1]"
        >
          <motion.div
            animate={{ scale: phase === 'exit' ? 20 : 1 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="flex flex-col items-center justify-center"
          >
            {/* Logo Bounces In */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 50, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 12, 
                mass: 1.2,
                delay: 0.3 
              }}
            >
              <Logo className="mb-4 scale-125 md:scale-150 drop-shadow-[0_15px_35px_rgba(18,167,152,0.3)]" />
            </motion.div>

            {/* DAYBRICKS Text Slams Down */}
            <motion.div
              initial={{ scale: 3, opacity: 0, y: -40, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ 
                type: 'spring',
                stiffness: 150,
                damping: 12,
                delay: 0.8 
              }}
            >
              <h1
                className="
                  leading-none
                  tracking-tight
                  whitespace-nowrap
                  select-none
                  text-center
                "
                style={{
                  fontFamily: "'Tanker', sans-serif",
                  fontWeight: 400,
                  color: '#59C749',
                  fontSize: 'clamp(4.5rem, 16vw, 12rem)', 
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
