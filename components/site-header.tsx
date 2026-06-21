'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Logo } from '@/components/daybricks/logo'

export function SiteHeader() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    
    if (latest <= 50) {
      setIsAtTop(true)
      setHidden(false)
    } else {
      setIsAtTop(false)
      // Hide when scrolling down, show when scrolling up
      if (latest > previous && latest > 150) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    }
  })

  return (
    <motion.header 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-4 md:top-6 left-0 right-0 z-[60] flex justify-center px-4 transition-all duration-300 pointer-events-none`}
    >
      <div 
        className={`flex items-center gap-4 md:gap-8 rounded-full px-5 py-2.5 md:px-8 md:py-3.5 shadow-sm pointer-events-auto transition-all duration-300 border ${
          isAtTop 
            ? "bg-transparent border-transparent" 
            : "bg-white/70 backdrop-blur-xl border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        }`}
      >
        <a href="#top" aria-label="DayBricks home" className="flex items-center">
          <Logo className="scale-75 md:scale-90 hover:saturate-150 transition-all [&>svg]:size-8" />
        </a>
        
        <nav className="flex items-center gap-4 md:gap-8" aria-label="Main Navigation">
          <a
            href="#how"
            className="text-xs md:text-sm font-bold tracking-wide text-[#3A1E14]/70 transition-colors hover:text-[#12A798]"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-xs md:text-sm font-bold tracking-wide text-[#3A1E14]/70 transition-colors hover:text-[#12A798]"
          >
            Features
          </a>
          <a
            href="#waitlist"
            className="text-xs md:text-sm font-bold tracking-wide text-[#FFFDF1] bg-[#12A798] hover:bg-[#E87C48] px-4 py-1.5 md:px-5 md:py-2 rounded-full transition-all hover:scale-105 hover:shadow-md"
          >
            Waitlist
          </a>
        </nav>
      </div>
    </motion.header>
  )
}