import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal — DayBricks',
  description: 'DayBricks legal documents, terms of service, privacy policy, and more.',
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#FFFDF1]">
      {/* Top bar */}
      <header className="border-b border-[#0a1413]/8 bg-white/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-3xl flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-[#0a1413] transition-colors hover:text-[#12A798]"
          >
            ← DayBricks
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0a1413]/40">
            Legal
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <article className="legal-content">
          {children}
        </article>
      </main>

      {/* Bottom nav between legal pages */}
      <nav className="border-t border-[#0a1413]/8 bg-white/40 backdrop-blur-lg">
        <div className="mx-auto max-w-3xl px-6 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Link href="/legal/terms" className="text-sm font-medium text-[#0a1413]/50 transition-colors hover:text-[#12A798]">
            Terms of Service
          </Link>
          <Link href="/legal/privacy" className="text-sm font-medium text-[#0a1413]/50 transition-colors hover:text-[#12A798]">
            Privacy Policy
          </Link>
          <Link href="/legal/cookies" className="text-sm font-medium text-[#0a1413]/50 transition-colors hover:text-[#12A798]">
            Cookie Policy
          </Link>
          <Link href="/legal/community" className="text-sm font-medium text-[#0a1413]/50 transition-colors hover:text-[#12A798]">
            Community Guidelines
          </Link>
        </div>
      </nav>
    </div>
  )
}
