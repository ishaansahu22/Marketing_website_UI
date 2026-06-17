import { cn } from '@/lib/utils'

type BrickColor = 'teal' | 'peach' | 'cream' | 'surface' | 'yellow'

const fills: Record<BrickColor, { body: string; stud: string; edge: string }> =
  {
    teal: { body: '#12A798', stud: '#1AD0BD', edge: '#0d8073' },
    peach: { body: '#E89B68', stud: '#F0B78C', edge: '#c97e4f' },
    cream: { body: '#FDFBF7', stud: '#ffffff', edge: '#d9d2c6' },
    surface: { body: '#1b3a37', stud: '#27514c', edge: '#102622' },
    yellow: { body: '#F2E94E', stud: '#f8f290', edge: '#cfc62f' },
  }

/**
 * A tactile, matte-plastic interlocking brick with studs on top.
 * Pure SVG so it scales crisply and recolors via the palette.
 */
export function Brick({
  color = 'teal',
  studs = 2,
  className,
}: {
  color?: BrickColor
  studs?: number
  className?: string
}) {
  const c = fills[color]
  const studPositions = Array.from({ length: studs }, (_, i) => i)
  const studGap = 100 / studs
  return (
    <svg
      viewBox="0 0 100 60"
      className={cn('h-auto w-full', className)}
      aria-hidden="true"
    >
      {/* studs */}
      {studPositions.map((i) => (
        <g key={i}>
          <ellipse
            cx={studGap * i + studGap / 2}
            cy="10"
            rx={studGap * 0.28}
            ry="5.5"
            fill={c.edge}
          />
          <ellipse
            cx={studGap * i + studGap / 2}
            cy="7.5"
            rx={studGap * 0.28}
            ry="5.5"
            fill={c.stud}
          />
        </g>
      ))}
      {/* body */}
      <rect x="4" y="12" width="92" height="44" rx="7" fill={c.edge} />
      <rect x="4" y="10" width="92" height="44" rx="7" fill={c.body} />
      {/* top inner light */}
      <rect
        x="10"
        y="15"
        width="80"
        height="6"
        rx="3"
        fill="#FDFBF7"
        opacity="0.14"
      />
    </svg>
  )
}
