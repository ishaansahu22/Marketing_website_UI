import { cn } from '@/lib/utils'

export function BrickMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={cn('size-9', className)}
      role="img"
      aria-label="DayBricks logo"
    >
      <rect width="512" height="512" rx="114" fill="#12A798" />
      <path
        d="M152 196c64 0 48 96 104 96s40-96 104-96"
        stroke="#FDFBF7"
        strokeWidth="26"
        strokeLinecap="round"
        strokeDasharray="2 56"
        fill="none"
      />
      <circle cx="152" cy="196" r="40" fill="#E89B68" />
      <circle cx="360" cy="356" r="40" fill="#FDFBF7" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <BrickMark className="size-14 md:size-16 lg:size-20" />
    </span>
  )
}