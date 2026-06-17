'use client'

import { motion } from 'framer-motion'
import { MapPin, Coffee, Camera, Sparkles, Compass, Star, ArrowRight, CheckCircle2 } from 'lucide-react'

const steps = [
{
number: '01',
title: 'Craft a day that feels uniquely yours.',
description:
"Tell us what inspires your perfect day. Whether you're discovering iconic landmarks, chasing local flavors, exploring hidden neighborhoods, or finding the best sunset view in town, DayBricks transforms your preferences into a personalized itinerary designed around you.",
primaryColor: '#59C749',
secondaryColor: '#47A83A',
bgHighlight: 'rgba(89,199,73,0.15)',
},
{
number: '02',
title: 'Build your day, your way.',
description:
'Every plan starts with a collection of experiences. Add, remove, reorder, or swap activity bricks to create a day that perfectly matches your mood, schedule, and travel style.',
primaryColor: '#E89B68',
secondaryColor: '#D38453',
bgHighlight: 'rgba(232,155,104,0.15)',
},
{
number: '03',
title: 'Plans change. Your day adapts.',
description:
'Found a better spot? Changed your mind? Running behind schedule? Simply swap an activity and DayBricks instantly updates your route, timing, and recommendations around the change.',
primaryColor: '#12A798',
secondaryColor: '#0E8B7E',
bgHighlight: 'rgba(18,167,152,0.15)',
},
{
number: '04',
title: 'Your perfect day, ready to go.',
description:
'DayBricks brings everything together into a seamless itinerary, optimized around your time, budget, and preferences so you can focus on enjoying the experience.',
primaryColor: '#F2E94E',
secondaryColor: '#D6CD30',
bgHighlight: 'rgba(242,233,78,0.15)',
},
]

export function HowItWorks() {
return (
   <section
   id="how"
   className="relative bg-[#FFFDF1] py-24 md:py-40"
 > <div className="mx-auto max-w-7xl px-6">
    {/* Header */}

    <div className="mb-16 max-w-3xl">
      <p
        className="
          mb-4
          text-xs
          uppercase
          tracking-[0.35em]
          font-semibold
        "
        style={{
          color: '#59C749',
        }}
      >
        HOW IT WORKS
      </p>

      <h2
        className="leading-[0.95] tracking-[-0.04em]"
        style={{
          fontFamily: 'var(--font-clash)',
          color: '#59C749',
          fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
        }}
      >
        Four simple steps.
      </h2>
    </div>

    {/* Desktop Stack */}

    <div className="hidden md:block">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className="sticky"
          style={{
            top: `${80 + index * 30}px`,
            zIndex: index + 1,
          }}
        >
          <div
            className="
              relative
              mb-10
              min-h-[78vh]
              overflow-hidden
              rounded-[48px]
              border
              p-16
            "
            style={{
              background: '#FFFFFF',
              borderColor: step.bgHighlight,
              boxShadow: '0 30px 80px ' + step.bgHighlight.replace('0.15', '0.08'),
            }}
          >
            {/* Background Number */}

            <div
              className="absolute right-10 top-4 select-none"
              style={{
                fontFamily: 'var(--font-clash)',
                fontSize: '12rem',
                lineHeight: 1,
                color: step.primaryColor,
                opacity: 0.05,
              }}
            >
              {step.number}
            </div>

            <div className="grid h-full gap-12 lg:grid-cols-[1.2fr_0.8fr]">

              {/* Left Content */}

              <div className="flex flex-col justify-between">

                <div>
                  <div
                    className="mb-8 text-sm font-semibold tracking-[0.2em]"
                    style={{
                      color: step.primaryColor,
                    }}
                  >
                    {step.number}
                  </div>

                  <h3
                    className="max-w-3xl leading-[1.05] tracking-[-0.02em]"
                    style={{
                      fontFamily: 'var(--font-clash)',
                      color: step.primaryColor,
                      fontSize: 'clamp(2rem, 3vw, 3.5rem)',
                    }}
                  >
                    {step.title}
                  </h3>
                </div>

                <div>

                  <div className="mb-8 mt-6">

                    {step.number === '01' && (
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {[
                          'Local Hidden Gems',
                          'Art & Culture',
                          'Scenic Escapes',
                          'Rooftop Views',
                          'Nature Trails',
                          'Coffee Spots',
                          'Shopping Districts',
                          'Nightlife',
                          'Photography Spots'
                        ].map((item) => (
                          <div
                            key={item}
                            className="group relative cursor-pointer overflow-hidden rounded-full border px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                            style={{
                              borderColor: 'rgba(89,199,73,0.3)',
                              background: 'rgba(89,199,73,0.05)',
                              color: '#47A83A',
                            }}
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <Sparkles className="size-3 md:size-4 opacity-50 group-hover:text-[#59C749] group-hover:opacity-100 transition-opacity" />
                              {item}
                            </span>
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#59C749]/0 via-[#59C749]/10 to-[#59C749]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                          </div>
                        ))}
                      </div>
                    )}

                    {step.number === '02' && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {[
                            '☕ Specialty Coffee',
                            '🏛 Cultural Landmark',
                            '🍜 Local Dining',
                            '🌅 Sunset Spot',
                            '🎨 Hidden Gallery',
                            '🛍 Shopping District',
                            '🌳 Urban Escape',
                            '🍸 Evening Drinks'
                          ].map((item) => (
                            <div
                              key={item}
                              className="group relative cursor-pointer overflow-hidden rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                              style={{
                                borderColor: 'rgba(89,199,73,0.2)',
                                background: '#FFFFFF',
                                color: '#0a1413',
                                boxShadow: '0 4px 12px rgba(89,199,73,0.05)'
                              }}
                            >
                              <div className="absolute inset-0 z-0 bg-[#59C749] opacity-0 group-hover:opacity-5 transition-opacity" />
                              <span className="relative z-10">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {step.number === '03' && (
                      <div className="mb-8 flex flex-col gap-3">
                        {[
                          { from: '🏛 Museum', to: '🐠 Aquarium' },
                          { from: '☕ Coffee Stop', to: '🌇 Sunset View' },
                          { from: '🍜 Lunch RSVP', to: '🥟 Local Favorite' },
                        ].map((swap, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="flex-1 rounded-xl border border-[#0a1413]/10 bg-white px-4 py-3 text-sm font-medium text-[#0a1413]/60 line-through decoration-[#0a1413]/20">
                              {swap.from}
                            </div>
                            <div className="text-[#59C749]">
                              <ArrowRight className="size-5" />
                            </div>
                            <div className="flex-1 rounded-xl bg-[#59C749]/10 border border-[#59C749]/20 px-4 py-3 text-sm font-bold text-[#47A83A] shadow-sm">
                              {swap.to}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {step.number === '04' && (
                      <div className="mb-8">
                        <div className="flex flex-col gap-4 max-w-sm rounded-2xl border border-[#0a1413]/10 bg-white p-6 shadow-sm">
                          <div className="space-y-4">
                            {[
                              { time: '08:00', icon: '☕', name: 'Specialty Coffee' },
                              { time: '10:30', icon: '🏛', name: 'Cultural Landmark' },
                              { time: '13:00', icon: '🍜', name: 'Local Dining' },
                              { time: '18:00', icon: '🌅', name: 'Sunset Viewpoint' },
                            ].map((item, i) => (
                              <div key={i} className="flex items-center gap-4">
                                <div className="text-xs font-bold text-[#0a1413]/40 w-10">{item.time}</div>
                                <div className="flex size-8 items-center justify-center rounded-lg bg-[#F7F5EA] text-sm">{item.icon}</div>
                                <div className="text-sm font-bold text-[#0a1413]">{item.name}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-2 border-t border-[#0a1413]/5 pt-4">
                            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs font-bold text-[#59C749]">
                              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4" /> Route Optimized</span>
                              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4" /> Budget Verified</span>
                              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4" /> RSVP Organized</span>
                              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4" /> Ready to Explore</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <p
                    className="
                      max-w-2xl
                      text-lg
                      md:text-xl
                      leading-relaxed
                    "
                    style={{
                      color: '#66745F',
                    }}
                  >
                    {step.description}
                  </p>

                  {step.number === '03' && (
                    <p 
                      className="mt-6 max-w-xl text-base md:text-lg leading-relaxed border-l-2 pl-4"
                      style={{ color: step.secondaryColor, borderColor: step.primaryColor }}
                    >
                      No spreadsheets. No rebuilding. No starting over. Every activity brick is connected, allowing your itinerary to intelligently adapt whenever your plans do.
                    </p>
                  )}

                  {step.number === '04' && (
                    <p 
                      className="mt-6 max-w-xl text-base md:text-lg leading-relaxed border-l-2 pl-4"
                      style={{ color: step.secondaryColor, borderColor: step.primaryColor }}
                    >
                      No last-minute planning. No switching between apps. No second-guessing. Just open DayBricks and follow a day designed specifically for you.
                    </p>
                  )}

                  {step.number === '02' && (
                    <p 
                      className="mt-6 max-w-xl text-base md:text-lg leading-relaxed border-l-2 pl-4"
                      style={{ color: step.secondaryColor, borderColor: step.primaryColor }}
                    >
                      Move a coffee stop before a museum. Replace lunch with a hidden local favorite. Add a sunset viewpoint on the fly. DayBricks keeps every part of your itinerary flexible.
                    </p>
                  )}
                </div>
              </div>

              {/* Right Visual */}

              <div
                className="
                  hidden
                  lg:flex
                  items-center
                  justify-center
                  rounded-[32px]
                "
                style={{
                  background: '#F7F5EA',
                }}
              >
                {step.number === '01' && (
                  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(89,199,73,0.15)_0%,transparent_70%)]" />
                    
                    {/* Center Glass Card */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/60 bg-white/40 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#59C749] to-[#12A798] text-white shadow-lg">
                        <Compass className="size-8" />
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#0a1413]" style={{ fontFamily: 'var(--font-clash)' }}>Your Vibe Profile</div>
                        <div className="mt-1 text-sm font-medium text-[#59C749]">100% Match</div>
                      </div>
                    </motion.div>

                    {/* Floating Element 1 - Top Right */}
                    <motion.div
                      animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute right-8 top-16 z-20 flex items-center gap-3 rounded-full border border-white/80 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="flex size-8 items-center justify-center rounded-full bg-[#E89B68]/20 text-[#E89B68]">
                        <Coffee className="size-4" />
                      </div>
                      <span className="text-sm font-semibold text-[#0a1413]">Coffee Spots</span>
                    </motion.div>

                    {/* Floating Element 2 - Bottom Left */}
                    <motion.div
                      animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute bottom-16 left-8 z-20 flex items-center gap-3 rounded-full border border-white/80 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="flex size-8 items-center justify-center rounded-full bg-[#12A798]/20 text-[#12A798]">
                        <MapPin className="size-4" />
                      </div>
                      <span className="text-sm font-semibold text-[#0a1413]">Hidden Gems</span>
                    </motion.div>

                    {/* Floating Element 3 - Top Left */}
                    <motion.div
                      animate={{ y: [0, 10, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                      className="absolute left-12 top-24 z-0 flex size-12 items-center justify-center rounded-2xl border border-white/60 bg-white/40 shadow-sm backdrop-blur-md text-[#59C749]"
                    >
                      <Star className="size-6" fill="currentColor" />
                    </motion.div>

                    {/* Floating Element 4 - Bottom Right */}
                    <motion.div
                      animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                      className="absolute bottom-24 right-12 z-0 flex size-14 items-center justify-center rounded-2xl border border-white/60 bg-white/40 shadow-sm backdrop-blur-md text-[#47A83A]"
                    >
                      <Camera className="size-6" />
                    </motion.div>
                  </div>
                )}

                {step.number === '02' && (
                  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden">
                    {/* Background elements */}
                    <div className="absolute left-1/2 top-10 bottom-10 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-[#59C749]/30" />
                    
                    <div className="relative flex w-full max-w-[280px] flex-col gap-4">
                      
                      {/* Fixed Card 1 */}
                      <motion.div 
                        className="relative z-10 flex items-center gap-4 rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur-md"
                      >
                        <div className="flex size-10 items-center justify-center rounded-xl bg-[#59C749]/10 text-xl">☕</div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-[#0a1413]">Morning Coffee</div>
                          <div className="text-xs font-medium text-[#59C749]">09:00 AM</div>
                        </div>
                      </motion.div>

                      {/* Animated Drag-and-Drop Card */}
                      <motion.div 
                        animate={{ 
                          y: [0, -20, 100, 84],
                          scale: [1, 1.05, 1.05, 1],
                          boxShadow: [
                            '0 4px 6px rgba(0,0,0,0.05)',
                            '0 20px 25px rgba(0,0,0,0.1)',
                            '0 20px 25px rgba(0,0,0,0.1)',
                            '0 4px 6px rgba(0,0,0,0.05)'
                          ],
                          rotate: [0, -2, 2, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          repeatDelay: 1,
                          times: [0, 0.2, 0.8, 1],
                          ease: "easeInOut"
                        }}
                        className="relative z-20 flex items-center gap-4 rounded-2xl border-2 border-[#59C749] bg-white p-4 shadow-xl cursor-grab"
                      >
                        <div className="flex size-10 items-center justify-center rounded-xl bg-[#12A798]/10 text-xl">🏛</div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-[#0a1413]">Museum Visit</div>
                          <div className="text-xs font-medium text-[#12A798]">Swap Activity</div>
                        </div>
                      </motion.div>

                      {/* Fixed Card 3 */}
                      <motion.div 
                        animate={{ y: [0, -84, -84, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatDelay: 1,
                          times: [0, 0.2, 0.8, 1],
                          ease: "easeInOut"
                        }}
                        className="relative z-10 flex items-center gap-4 rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur-md"
                      >
                        <div className="flex size-10 items-center justify-center rounded-xl bg-[#E89B68]/10 text-xl">🍜</div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-[#0a1413]">Local Lunch</div>
                          <div className="text-xs font-medium text-[#E89B68]">12:30 PM</div>
                        </div>
                      </motion.div>

                    </div>
                  </div>
                )}

                {step.number === '03' && (
                  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
                    {/* Pulsing Route Line Background */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 overflow-hidden bg-[#59C749]/10">
                      <motion.div 
                        animate={{ y: ['-100%', '200%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="h-1/2 w-full bg-gradient-to-b from-transparent via-[#59C749] to-transparent opacity-60"
                      />
                    </div>
                    
                    <div className="relative flex w-full max-w-[320px] flex-col items-center gap-6">
                      
                      {/* Fixed Top Card */}
                      <div className="w-[80%] rounded-2xl border border-white/60 bg-white/40 p-4 shadow-sm backdrop-blur-md opacity-70">
                        <div className="h-2 w-1/3 rounded-full bg-[#0a1413]/10 mb-2" />
                        <div className="h-2 w-1/2 rounded-full bg-[#0a1413]/10" />
                      </div>

                      {/* Morphing Activity Card */}
                      <motion.div 
                        className="relative z-20 flex w-full flex-col items-center gap-3 rounded-3xl border-2 border-[#59C749] bg-white p-6 shadow-xl"
                      >
                        {/* Status Floaties */}
                        <div className="absolute -right-4 -top-8 md:-right-12 md:-top-12 flex flex-col gap-2 z-30">
                          {[
                            { text: '✓ Route Updated', delay: 0.5 },
                            { text: '✓ Timing Optimized', delay: 0.7 },
                            { text: '✓ Budget Recalculated', delay: 0.9 }
                          ].map((status, i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, 10] }}
                              transition={{ duration: 4, repeat: Infinity, delay: status.delay, times: [0, 0.1, 0.8, 1] }}
                              className="whitespace-nowrap rounded-lg bg-[#0a1413] px-3 py-1.5 text-xs font-bold text-[#FFFDF1] shadow-lg"
                            >
                              {status.text}
                            </motion.div>
                          ))}
                        </div>

                        {/* Morphing Icon */}
                        <div className="relative flex size-16 items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-br from-[#59C749] to-[#12A798] text-white shadow-inner">
                          <motion.div
                            animate={{ opacity: [1, 0, 0, 1] }}
                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.8, 1], ease: 'backInOut' }}
                            className="absolute flex size-16 items-center justify-center text-3xl"
                          >
                            🏛
                          </motion.div>
                          <motion.div
                            animate={{ opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.8, 1], ease: 'backInOut' }}
                            className="absolute flex size-16 items-center justify-center text-3xl"
                          >
                            🐠
                          </motion.div>
                        </div>
                        
                        {/* Morphing Text */}
                        <div className="relative h-6 w-32 overflow-hidden text-center">
                          <motion.div
                            animate={{ y: [0, -24, -24, 0] }}
                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.8, 1], ease: 'backInOut' }}
                            className="absolute inset-x-0 flex flex-col"
                          >
                            <div className="flex h-6 items-center justify-center font-bold text-[#0a1413] text-sm">National Museum</div>
                            <div className="flex h-6 items-center justify-center font-bold text-[#0a1413] text-sm">City Aquarium</div>
                          </motion.div>
                        </div>
                        <div className="text-xs font-medium text-[#59C749]">Smart Swap Applied</div>
                      </motion.div>

                      {/* Fixed Bottom Card */}
                      <div className="w-[80%] rounded-2xl border border-white/60 bg-white/40 p-4 shadow-sm backdrop-blur-md opacity-70">
                        <div className="h-2 w-1/3 rounded-full bg-[#0a1413]/10 mb-2" />
                        <div className="h-2 w-1/2 rounded-full bg-[#0a1413]/10" />
                      </div>

                    </div>
                  </div>
                )}

                {step.number === '04' && (
                  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
                    
                    {/* Abstract Glass Topography */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <div className="absolute size-64 rounded-full bg-[#59C749] blur-[100px]" />
                      <div className="absolute size-48 rounded-full bg-[#E89B68] blur-[80px] translate-x-24 translate-y-12" />
                    </div>

                    <div className="relative w-full max-w-[320px] aspect-square">
                      
                      {/* Animated Route Line SVG */}
                      <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full z-10">
                        {/* Static Dashed Background */}
                        <path
                          d="M 64,84 C 110,84 144,120 144,170 C 144,210 126,190 126,236 C 126,280 264,280 264,224"
                          fill="none"
                          stroke="#59C749"
                          strokeOpacity={0.3}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray="8 12"
                        />
                        {/* Solid Animated Foreground filling the line */}
                        <motion.path
                          d="M 64,84 C 110,84 144,120 144,170 C 144,210 126,190 126,236 C 126,280 264,280 264,224"
                          fill="none"
                          stroke="#59C749"
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
                        />
                      </svg>

                      {/* Map Pins */}
                      {/* Pin 1: Coffee (Start) */}
                      <motion.div 
                        className="absolute left-[44px] top-[64px] z-20 flex size-10 items-center justify-center rounded-full bg-white shadow-lg text-lg border-2 border-[#59C749]"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                      >
                        ☕
                        {/* Active Navigation Pulse */}
                        <motion.div
                          animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full border-2 border-[#59C749]"
                        />
                      </motion.div>

                      {/* Pin 2: Museum */}
                      <motion.div 
                        className="absolute left-[128px] top-[154px] z-20 flex size-8 items-center justify-center rounded-full bg-white shadow-md text-sm"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      >
                        🏛
                      </motion.div>

                      {/* Pin 3: Lunch */}
                      <motion.div 
                        className="absolute left-[110px] top-[220px] z-20 flex size-8 items-center justify-center rounded-full bg-white shadow-md text-sm"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      >
                        🍜
                      </motion.div>

                      {/* Pin 4: Sunset (End) */}
                      <motion.div 
                        className="absolute left-[244px] top-[204px] z-20 flex size-10 items-center justify-center rounded-full bg-[#0a1413] text-white shadow-lg text-lg border-2 border-white"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                      >
                        🌅
                      </motion.div>
                      
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Mobile Layout */}

    <div className="space-y-6 md:hidden">
      {steps.map((step) => (
        <div
          key={step.number}
          className="rounded-[32px] border p-8"
          style={{
            background: '#FFFFFF',
            borderColor: step.bgHighlight,
          }}
        >
          <div
            className="mb-4 text-sm font-semibold tracking-[0.2em]"
            style={{
              color: step.primaryColor,
            }}
          >
            {step.number}
          </div>

          <h3
            className="mb-6 leading-[1.05] tracking-[-0.02em]"
            style={{
              fontFamily: 'var(--font-clash)',
              color: step.primaryColor,
              fontSize: '2rem',
            }}
          >
            {step.title}
          </h3>

          <p
            className="leading-relaxed"
            style={{
              color: '#66745F',
            }}
          >
            {step.description}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>

)
}
