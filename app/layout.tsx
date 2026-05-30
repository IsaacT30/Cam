import './globals.css'
import { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'PARA LA MAS PRINCESS',
  description: 'ALGO FUERA DE LO COMUN PARA UNA PERSONA FUERA DE LO COMUN',
  icons: {
    icon: '/assets/c4.jpeg',
    apple: '/assets/c4.jpeg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Feliz Cumple',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#ff69b4',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es" className="bg-white">
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  )
}