import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

import {
  Space_Grotesk,
  Inter,
  Space_Mono,
  Press_Start_2P,
  Silkscreen,
  Archivo_Black,
  Permanent_Marker,
  Caveat,
} from 'next/font/google'

import './globals.css'

const grotesk = Space_Grotesk({
  variable: '--font-grotesk',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

const display = Archivo_Black({
  variable: '--font-display-black',
  subsets: ['latin'],
  weight: ['400'],
})

const marker = Permanent_Marker({
  variable: '--font-marker',
  subsets: ['latin'],
  weight: ['400'],
})

const script = Caveat({
  variable: '--font-script',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const sans = Inter({
  variable: '--font-sans-inter',
  subsets: ['latin'],
})

const mono = Space_Mono({
  variable: '--font-mono-space',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const pixel = Press_Start_2P({
  variable: '--font-pixel',
  subsets: ['latin'],
  weight: ['400'],
})

const pixelAlt = Silkscreen({
  variable: '--font-pixel-alt',
  subsets: ['latin'],
  weight: ['400', '700'],
})

/* NEW FONTS */

const clash = localFont({
  src: './fonts/ClashDisplay-Bold.otf',
  variable: '--font-clash',
})

const boska = localFont({
  src: './fonts/Boska-Black.otf',
  variable: '--font-boska',
})

export const metadata: Metadata = {
  title: 'DayBricks — Build Your Perfect Day, Brick by Brick',
  description:
    'DayBricks is the travel agent in your pocket. Build and swap modular day-trip plans with interchangeable activity bricks. Coming soon to Google Play — join the waitlist.',
  generator: 'v0.app',
  keywords: [
    'DayBricks',
    'travel planner',
    'itinerary builder',
    'modular travel',
    'day trip planner',
  ],
  openGraph: {
    title: 'DayBricks — Build Your Perfect Day, Brick by Brick',
    description:
      'Modular itinerary generation. Swap a museum for a cafe without breaking your route or budget. Coming soon to Google Play.',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/brand/daybricks-favicon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFDF1',
}

import { CustomCursor } from '@/components/custom-cursor'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`
        ${grotesk.variable}
        ${display.variable}
        ${marker.variable}
        ${script.variable}
        ${sans.variable}
        ${mono.variable}
        ${pixel.variable}
        ${pixelAlt.variable}
        ${clash.variable}
        ${boska.variable}
        bg-background
      `}
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=tanker@400&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('daybricks-intro-played') === '1') {
                  document.documentElement.classList.add('skip-intro');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}