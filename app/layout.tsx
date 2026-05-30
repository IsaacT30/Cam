import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'PARA LA MAS PRINCESS',
  description: 'ALGO FUERA DE LO COMUN PARA UNA PERSONA FUERA DE LO COMUN',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-purple">{children}</body>
    </html>
  )
}
