import { cn } from '@/lib/utils'

export function PlayBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'matte spring inline-flex select-none items-center gap-3 rounded-2xl border border-border-strong bg-surface px-5 py-3',
        className,
      )}
    >
      <svg viewBox="0 0 512 512" className="size-7 shrink-0" aria-hidden="true">
        <path d="M48 47c-6 5-9 13-9 23v372c0 10 3 18 9 23l2 2 208-208v-6L50 45z" fill="#1AD0BD" />
        <path d="M325 326l-69-69v-6l69-69 1 1 82 47c24 13 24 35 0 48l-83 47z" fill="#F2E94E" />
        <path d="M326 325l-70-70-208 209c8 7 21 8 36-1l242-138" fill="#E89B68" />
        <path d="M326 187L84 49C69 40 56 41 48 48l208 208z" fill="#12A798" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Coming soon to
        </span>
        <span className="font-display text-base font-bold text-cream">
          Google Play
        </span>
      </span>
    </div>
  )
}
