'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/daybricks/logo'

export function SiteHeader() {
  const { scrollY } = useScroll()
  const [navState, setNavState] = useState<'top' | 'scrollingUp' | 'scrollingDown'>('top')

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest <= 50) {
      setNavState('top')
    } else if (latest > previous && latest > 150) {
      setNavState('scrollingDown')
    } else {
      setNavState('scrollingUp')
    }
  })

  return (
    <header className="fixed top-4 md:top-8 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none">
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`flex items-center justify-center pointer-events-auto transition-colors duration-300 border overflow-hidden ${
          navState === 'top'
            ? "bg-transparent border-transparent gap-6 md:gap-10 rounded-full px-6 py-3 md:px-10 md:py-4 shadow-none" 
            : navState === 'scrollingUp'
            ? "bg-white/70 backdrop-blur-xl border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] gap-6 md:gap-10 rounded-full px-6 py-3 md:px-10 md:py-4"
            : "bg-[#FFFDF1]/80 backdrop-blur-2xl border-white/60 shadow-[0_15px_35px_rgb(0,0,0,0.1)] rounded-lg w-16 h-6 md:w-24 md:h-8"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {navState !== 'scrollingDown' && (
            <motion.a 
              layout 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              href="#top" 
              aria-label="DayBricks home" 
              className="flex items-center"
            >
              <Logo className="scale-110 hover:saturate-150 transition-all duration-300 [&>svg]:size-8 md:[&>svg]:size-10" />
            </motion.a>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="popLayout">
          {navState !== 'scrollingDown' && (
            <motion.nav 
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)", x: -20 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)", x: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center gap-5 md:gap-10" 
              aria-label="Main Navigation"
            >
              <a
                href="#how"
                className="text-sm md:text-base font-bold tracking-wide text-[#3A1E14]/70 transition-colors hover:text-[#12A798]"
              >
                How it works
              </a>
              <a
                href="#features"
                className="text-sm md:text-base font-bold tracking-wide text-[#3A1E14]/70 transition-colors hover:text-[#12A798]"
              >
                Features
              </a>
              <a
                href="#waitlist"
                className="text-sm md:text-base font-bold tracking-wide text-[#FFFDF1] bg-[#12A798] hover:bg-[#E87C48] px-5 py-2 md:px-7 md:py-3 rounded-full transition-all hover:scale-105 hover:shadow-lg"
              >
                Waitlist
              </a>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* The Brick Studs (Only visible when collapsed into a brick) */}
        <AnimatePresence mode="popLayout">
          {navState === 'scrollingDown' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex gap-2 md:gap-3 items-center justify-center w-full"
            >
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]" />
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}