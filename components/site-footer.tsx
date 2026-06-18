import { Logo } from '@/components/daybricks/logo'

export function SiteFooter() {
  return (
    <div className="bg-[#FFFDF1] px-4 pb-8 pt-4 sm:px-8">
      <footer className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-full border border-white/50 bg-white/40 px-8 py-4 backdrop-blur-xl shadow-sm sm:flex-row">
        <Logo className="opacity-90 saturate-50 hover:saturate-100 transition-all [&>svg]:size-8" />
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
