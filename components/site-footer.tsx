import Link from 'next/link'
import { Logo } from '@/components/daybricks/logo'

export function SiteFooter() {
  return (
    <div className="bg-[#FFFDF1] px-4 pb-6 pt-4 sm:px-8">
      <footer className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/50 bg-white/40 backdrop-blur-xl shadow-sm">
        {/* Primary row — logo, nav, copyright */}
        <div className="flex flex-col items-center justify-between gap-6 px-8 py-5 sm:flex-row">
          <Logo className="opacity-90 saturate-50 hover:saturate-100 transition-all [&>svg]:size-8" />
          <nav className="flex items-center gap-7" aria-label="Footer navigation">
            <a
              href="#how"
              className="text-sm font-semibold text-[#0a1413]/60 transition-colors hover:text-[#12A798]"
            >
              How it works
            </a>
            <a
              href="#features"
              className="text-sm font-semibold text-[#0a1413]/60 transition-colors hover:text-[#12A798]"
            >
              Features
            </a>
            <a
              href="#waitlist"
              className="text-sm font-semibold text-[#0a1413]/60 transition-colors hover:text-[#12A798]"
            >
              Waitlist
            </a>
          </nav>
          <p className="font-mono text-xs font-semibold text-[#0a1413]/40">
            © {new Date().getFullYear()} DayBricks
          </p>
        </div>

        {/* Divider */}
        <div className="mx-8 h-px bg-[#0a1413]/6" />

        {/* Legal links row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-8 py-4">
          <Link
            href="/legal/terms"
            className="text-xs font-medium text-[#0a1413]/40 transition-colors hover:text-[#12A798]"
          >
            Terms of Service
          </Link>
          <span className="text-[#0a1413]/15 text-xs select-none" aria-hidden="true">·</span>
          <Link
            href="/legal/privacy"
            className="text-xs font-medium text-[#0a1413]/40 transition-colors hover:text-[#12A798]"
          >
            Privacy Policy
          </Link>
          <span className="text-[#0a1413]/15 text-xs select-none" aria-hidden="true">·</span>
          <Link
            href="/legal/cookies"
            className="text-xs font-medium text-[#0a1413]/40 transition-colors hover:text-[#12A798]"
          >
            Cookie Policy
          </Link>
          <span className="text-[#0a1413]/15 text-xs select-none" aria-hidden="true">·</span>
          <Link
            href="/legal/community"
            className="text-xs font-medium text-[#0a1413]/40 transition-colors hover:text-[#12A798]"
          >
            Community Guidelines
          </Link>
        </div>
      </footer>
    </div>
  )
}
