import { Logo } from '@/components/daybricks/logo'

export function SiteFooter() {
  return (
    <div className="bg-[#FFFDF1] px-4 pb-8 pt-4 sm:px-8">
      <footer className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-full border border-white/50 bg-white/40 px-8 py-4 backdrop-blur-xl shadow-sm sm:flex-row">
        <div className="flex items-center gap-3">
          <Logo className="opacity-90 saturate-50 hover:saturate-100 transition-all [&>svg]:size-8" />
          <a
            href="https://www.instagram.com/daybricks.prislystdio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DayBricks on Instagram"
            className="text-[#0a1413]/50 hover:text-[#E1306C] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
        </div>
        <nav className="flex items-center gap-7" aria-label="Footer">
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
      </footer>
    </div>
  )
}
