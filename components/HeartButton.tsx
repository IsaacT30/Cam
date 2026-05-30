'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeartButtonProps {
  onBack: () => void
}

export default function HeartButton({ onBack }: HeartButtonProps) {
  const [clicks, setClicks] = useState(0)
  const [showLetter, setShowLetter] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const totalClicks = 50

  const handleHeartClick = () => {
    if (clicks >= totalClicks) return

    const newClicks = clicks + 1
    setClicks(newClicks)

    // Crear confeti
    if (canvasRef.current) {
      createConfetti()
    }

    // Si llega a 50, mostrar carta
    if (newClicks >= totalClicks) {
      setTimeout(() => {
        setShowLetter(true)
      }, 500)
    }
  }

  const createConfetti = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Crear confeti
    const confetti = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: -10,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 5 + 3,
      life: 200,
      color: [
        '#ff1744', '#f50057', '#ff3d00',
        '#ff6f00', '#ffd600', '#76ff03',
        '#00e676', '#00bcd4', '#2196f3'
      ][Math.floor(Math.random() * 9)],
    }))

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      confetti.forEach((c, index) => {
        c.x += c.vx
        c.y += c.vy
        c.vy += 0.2
        c.life -= 2

        if (c.life > 0) {
          ctx.globalAlpha = c.life / 200
          ctx.fillStyle = c.color
          ctx.beginPath()
          ctx.arc(c.x, c.y, 5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1

      if (confetti.some(c => c.life > 0)) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animate()
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10">
        <p className="text-white text-xl mb-8">Dale click 50 veces al corazón con pastel</p>

        <motion.button
          onClick={handleHeartClick}
          disabled={clicks >= totalClicks}
          whileHover={{ scale: clicks >= totalClicks ? 1 : 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-48 h-48 rounded-full flex items-center justify-center text-6xl cursor-pointer transition-opacity ${
            clicks >= totalClicks ? 'opacity-50' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, #ff69b4 0%, #ff1744 100%)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          }}
        >
          <span className="text-4xl">💗</span>
          <span className="text-3xl ml-2">🎂</span>
        </motion.button>

        <div className="text-white text-3xl font-bold mt-8">
          <span className="text-4xl">{clicks}</span> / {totalClicks}
        </div>

        <AnimatePresence>
          {showLetter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-12 p-8 bg-white rounded-2xl max-w-md shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-flower-strong mb-4 text-center">
                💌 Una Carta Para Ti 💌
              </h3>
              <p className="text-gray-700 leading-relaxed text-center italic">
                Querida Valentina Cami,

En este día tan especial, solo quería decirte lo mucho que significas para mí.

Eres una persona increíble, llena de luz y alegría. Tu amistad es un regalo que atesoro profundamente.

Que este año te traiga muchas sonrisas, muchas aventuras y todos los momentos felices que mereces.

¡Te quiero un montón! 💕

Feliz Cumpleaños, Neni.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
