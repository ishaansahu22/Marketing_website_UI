import { Hero } from '@/components/hero'
import { TickerMarquee } from '@/components/ticker-marquee'
import { HowItWorks } from '@/components/how-it-works'
import { RouteJourney } from '@/components/route-journey'
import { Waitlist } from '@/components/waitlist'
import { SiteFooter } from '@/components/site-footer'
import { IntroGate } from '@/components/daybricks/intro-gate'
import { TaglineSection } from '@/components/tagline-section'
import { InteractiveBrickGrid } from '@/components/interactive-brick-grid'

import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <IntroGate />
      <main>
        <Hero />
        <div className="-mt-32 md:-mt-48 lg:-mt-56 relative z-30">
          <TickerMarquee />
        </div>
        <HowItWorks />
        <RouteJourney />
        <TaglineSection />
        <InteractiveBrickGrid />
        <Waitlist />
      </main>
      <SiteFooter />
    </>
  )
}
