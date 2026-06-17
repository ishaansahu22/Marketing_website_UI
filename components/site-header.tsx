'use client'

import { Logo } from '@/components/daybricks/logo'

export function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex justify-center pt-6 md:pt-8">
        <a href="#top" aria-label="DayBricks home">
          <Logo />
        </a>
      </div>
    </header>
  )
}