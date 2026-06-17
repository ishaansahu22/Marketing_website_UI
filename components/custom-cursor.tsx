'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsDesktop(false)
      return
    }

    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isCrosshair = target.closest && target.closest('.cursor-crosshair') !== null

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`
        dotRef.current.style.opacity = isCrosshair ? '0' : '1'
      }
      
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0) scale(${haloRef.current.dataset.hovering === 'true' ? 1.5 : 1})`
        haloRef.current.style.opacity = isCrosshair ? '0' : '1'
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isHoverable = window.getComputedStyle(target).cursor === 'pointer' || 
                          target.tagName.toLowerCase() === 'a' || 
                          target.tagName.toLowerCase() === 'button'
                          
      if (haloRef.current) {
        haloRef.current.dataset.hovering = isHoverable ? 'true' : 'false'
        haloRef.current.style.transform = haloRef.current.style.transform.replace(/scale\([0-9.]+\)/, `scale(${isHoverable ? 1.5 : 1})`)
      }
    }

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (haloRef.current) haloRef.current.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  if (!isDesktop) return null

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, body *:not(.cursor-crosshair):not(.cursor-crosshair *) {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Outer Halo */}
      <div
        ref={haloRef}
        data-hovering="false"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-2 border-[#59C749] opacity-0"
        style={{
          width: '40px',
          height: '40px',
          boxShadow: '0 0 15px rgba(89, 199, 73, 0.4), inset 0 0 10px rgba(89, 199, 73, 0.2)',
          transition: 'opacity 300ms, transform 150ms ease-out',
        }}
      />
      
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full bg-[#59C749] opacity-0"
        style={{
          width: '8px',
          height: '8px',
          boxShadow: '0 0 8px 2px rgba(89, 199, 73, 0.6)',
          transition: 'opacity 300ms',
        }}
      />
    </>
  )
}
