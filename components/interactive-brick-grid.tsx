'use client'

import { useEffect, useState } from 'react'

export function InteractiveBrickGrid() {
  const [mounted, setMounted] = useState(false)
  const [cols, setCols] = useState(0)
  const [rows, setRows] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Calculate how many bricks fit on the screen
    const updateGrid = () => {
      // Brick is 40px + 8px gap = 48px
      const brickSize = 48
      const width = window.innerWidth
      // Let's cap the height to roughly 400px so it's a nice horizontal block
      const height = Math.min(window.innerHeight * 0.4, 400)
      
      setCols(Math.floor(width / brickSize))
      setRows(Math.floor(height / brickSize))
    }

    updateGrid()
    window.addEventListener('resize', updateGrid)
    return () => window.removeEventListener('resize', updateGrid)
  }, [])

  if (!mounted) return <div className="h-[400px] w-full" /> // Placeholder

  const totalBricks = cols * rows

  return (
    <section className="relative w-full overflow-hidden bg-[#FFFDF1] py-12 flex flex-col items-center select-none cursor-crosshair">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#FFFDF1] via-transparent to-[#FFFDF1] z-10" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#FFFDF1] via-transparent to-[#FFFDF1] z-10" />
      
      <p className="absolute top-4 z-20 font-mono text-xs font-bold text-[#59C749]/50 tracking-[0.2em] uppercase">
        Paint your path
      </p>

      <div 
        className="flex flex-wrap justify-center gap-2 relative z-0"
        style={{ width: `${cols * 48}px` }}
      >
        {Array.from({ length: totalBricks }).map((_, i) => (
          <div key={i} className="paint-brick" />
        ))}
      </div>

      <style>{`
        .paint-brick {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          border: 2px solid rgba(89, 199, 73, 0.35);
          background-color: rgba(89, 199, 73, 0.04);
          transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .paint-brick::after {
          content: '';
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgba(89, 199, 73, 0.35);
          background-color: rgba(89, 199, 73, 0.04);
          transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .paint-brick:hover {
          background-color: #59C749;
          border-color: #59C749;
          transition: all 0s;
          transform: scale(1.15) translateY(-2px);
          z-index: 10;
          box-shadow: 0 8px 16px -4px rgba(89, 199, 73, 0.5);
        }

        .paint-brick:hover::after {
          background-color: #47A83A;
          border-color: #47A83A;
          transition: all 0s;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </section>
  )
}
