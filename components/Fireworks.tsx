'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  size: number
}

class Firework {
  particles: Particle[] = []
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.createParticles()
  }

  createParticles() {
    const particleCount = 80
    const colors = [
      '#ff1744', '#f50057', '#ff3d00',
      '#ff6f00', '#ffd600', '#76ff03',
      '#00e676', '#00bcd4', '#2196f3',
      '#3f51b5', '#673ab7', '#d32f2f'
    ]

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount
      const velocity = 5 + Math.random() * 8
      
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 4
      })
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.15
      p.life -= 2
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(p => {
      if (p.life > 0) {
        ctx.globalAlpha = p.life / 100
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    })
    ctx.globalAlpha = 1
  }

  isAlive() {
    return this.particles.some(p => p.life > 0)
  }
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireworksRef = useRef<Firework[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      fireworksRef.current = fireworksRef.current.filter(f => f.isAlive())

      fireworksRef.current.forEach(f => {
        f.update()
        f.draw(ctx)
      })

      if (fireworksRef.current.length > 0) {
        animationId = requestAnimationFrame(animate)
      }
    }

    // Auto fireworks - generan explosiones cada 3-4 segundos
    const autoFireworks = () => {
      const createBurst = () => {
        for (let i = 0; i < 2; i++) {
          setTimeout(() => {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height * 0.5 + 100
            fireworksRef.current.push(new Firework(x, y))
            animate()
          }, i * 300)
        }
      }

      createBurst()
      setInterval(createBurst, 3500)
    }

    autoFireworks()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
    />
  )
}
