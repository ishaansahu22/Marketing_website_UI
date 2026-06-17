import { BrickMark } from '@/components/daybricks/logo'

const row1 = [
  'BUILD YOUR PERFECT DAY',
  'SWAP ACTIVITIES INSTANTLY',
  'MODULAR ITINERARIES',
  'REAL-TIME REBUILDING',
]

const row2 = [
  'NO BROKEN ROUTES',
  'FLEXIBLE DAY PLANNING',
  'SMART TRAVEL FLOW',
  'DESIGNED FOR SPONTANEITY',
]

function Row({
  items,
  reverse = false,
}: {
  items: string[]
  reverse?: boolean
}) {
  return (
    <div
      className={`flex w-max items-center ${
        reverse ? 'animate-marquee-rev' : 'animate-marquee'
      }`}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center"
        >
          {items.map((item) => (
            <div
              key={item}
              className="mx-8 flex items-center gap-8 whitespace-nowrap"
            >
              <span
                className="
                  uppercase
                  font-black
                  tracking-[-0.03em]
                  text-2xl
                  md:text-4xl
                "
                style={{
                  fontFamily: 'var(--font-clash)',
                  color: '#59C749',
                }}
              >
                {item}
              </span>

              <BrickMark className="size-6 md:size-8 opacity-70" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function TickerMarquee() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#FFFDF1]">

      <div
        className="relative -rotate-2 py-6 md:py-8"
        style={{
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(89, 199, 73, 0.18)',
          borderBottom: '1px solid rgba(89, 199, 73, 0.18)',
          boxShadow: '0 12px 40px rgba(89, 199, 73, 0.08)',
        }}
      >
        <div className="overflow-hidden">
          <Row items={row1} />
        </div>
      </div>

      <div
        className="relative rotate-2 mt-8 py-6 md:py-8"
        style={{
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(89, 199, 73, 0.18)',
          borderBottom: '1px solid rgba(89, 199, 73, 0.18)',
          boxShadow: '0 12px 40px rgba(89, 199, 73, 0.08)',
        }}
      >
        <div className="overflow-hidden">
          <Row items={row2} reverse />
        </div>
      </div>

    </section>
  )
}