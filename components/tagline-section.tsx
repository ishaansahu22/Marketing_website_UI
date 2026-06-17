'use client'

import { motion } from 'framer-motion'

const words = [
  'Your city.',
  'Your vibe.',
  'Your day.',
  'Built your way.',
]

export function TaglineSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF1] pt-12 pb-32 md:pt-16 md:pb-48">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">

          <p
            className="mb-6 text-xs font-semibold uppercase tracking-[0.35em]"
            style={{ color: '#59C749' }}
          >
            WHY DAYBRICKS
          </p>

          <div className="space-y-2 md:space-y-4">
            {words.map((word, index) => (
              <motion.h2
                key={word}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                }}
                className="leading-[0.9] tracking-[-0.05em]"
                style={{
                  fontFamily: 'var(--font-clash)',
                  fontSize: 'clamp(3.5rem,8vw,8rem)',
                  color:
                    word === 'Built your way.'
                      ? '#12A798'
                      : '#59C749',
                }}
              >
                {word}
              </motion.h2>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.8,
              duration: 0.8,
            }}
            className="mt-12 max-w-2xl text-lg leading-relaxed md:text-xl"
            style={{
              color: '#66745F',
            }}
          >
            DayBricks lets you build flexible itineraries that adapt
            as fast as your plans do.
          </motion.p>
        </div>
      </div>
    </section>
  )
}