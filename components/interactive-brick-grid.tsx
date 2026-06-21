'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

export function InteractiveBrickGrid() {
  const [mounted, setMounted] = useState(false)
  const [cols, setCols] = useState(0)
  const [rows, setRows] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)
  const isTouching = useRef(false)

  useEffect(() => {
    setMounted(true)
    const updateGrid = () => {
      const brickSize = 48
      const width = window.innerWidth
      const height = Math.min(window.innerHeight * 0.4, 400)
      
      setCols(Math.floor(width / brickSize))
      setRows(Math.floor(height / brickSize))
    }

    updateGrid()
    window.addEventListener('resize', updateGrid)
    return () => window.removeEventListener('resize', updateGrid)
  }, [])

  // Get the brick index from a touch/mouse coordinate
  const getBrickIndexFromPoint = useCallback((clientX: number, clientY: number): number | null => {
    const el = document.elementFromPoint(clientX, clientY)
    if (el && el.classList.contains('paint-brick')) {
      const index = el.getAttribute('data-index')
      return index !== null ? parseInt(index) : null
    }
    return null
  }, [])

  // Activate a brick by index using direct DOM manipulation for smooth performance
  const activateBrick = useCallback((index: number) => {
    const el = document.querySelector(`[data-index="${index}"]`)
    if (!el || el.classList.contains('paint-brick--active')) return

    el.classList.add('paint-brick--active')
    
    // Auto-fade: remove after 1.8s
    setTimeout(() => {
      el.classList.remove('paint-brick--active')
    }, 1800)
  }, [])

  // Touch handlers for mobile swipe painting
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isTouching.current = true
    const touch = e.touches[0]
    const index = getBrickIndexFromPoint(touch.clientX, touch.clientY)
    if (index !== null) activateBrick(index)
  }, [getBrickIndexFromPoint, activateBrick])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault() // Prevent scrolling while painting
    if (!isTouching.current) return
    const touch = e.touches[0]
    const index = getBrickIndexFromPoint(touch.clientX, touch.clientY)
    if (index !== null) activateBrick(index)
  }, [getBrickIndexFromPoint, activateBrick])

  const handleTouchEnd = useCallback(() => {
    isTouching.current = false
  }, [])

  // Mouse handler for desktop hover painting
  const handleMouseEnter = useCallback((index: number) => {
    activateBrick(index)
  }, [activateBrick])

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
        ref={gridRef}
        className="flex flex-wrap justify-center gap-2 relative z-0"
        style={{ width: `${cols * 48}px`, touchAction: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {Array.from({ length: totalBricks }).map((_, i) => (
          <div 
            key={i} 
            data-index={i}
            className="paint-brick"
            onMouseEnter={() => handleMouseEnter(i)}
          />
        ))}
      </div>

      <style>{`
        .paint-brick {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          border: 2px solid rgba(232, 124, 72, 0.35); /* #E87C48 */
          background-color: rgba(232, 124, 72, 0.04);
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
          border: 2px solid rgba(232, 124, 72, 0.35);
          background-color: rgba(232, 124, 72, 0.04);
          transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Desktop hover */
        .paint-brick:hover,
        .paint-brick--active {
          background-color: #E87C48;
          border-color: #E87C48;
          transition: all 0s;
          transform: scale(1.15) translateY(-2px);
          z-index: 10;
          box-shadow: 0 8px 16px -4px rgba(232, 124, 72, 0.5);
        }

        .paint-brick:hover::after,
        .paint-brick--active::after {
          background-color: #D66A36;
          border-color: #D66A36;
          transition: all 0s;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </section>
  )
}
