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
  trail: { x: number; y: number }[]
}

interface RocketParticle {
  x: number
  y: number
  vy: number
  targetY: number
  color: string
  trail: { x: number; y: number; alpha: number }[]
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
    const particleCount = 120
    const colors = [
      '#ff1744', '#f50057', '#ff3d00',
      '#ff6f00', '#ffd600', '#76ff03',
      '#00e676', '#00bcd4', '#2196f3',
      '#3f51b5', '#673ab7', '#d32f2f',
      '#ff69b4', '#FFD700', '#00FF7F',
      '#FF6347', '#9400D3', '#00CED1'
    ]

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3
      const velocity = 4 + Math.random() * 10
      
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 120 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 5,
        trail: []
      })
    }
  }

  update() {
    this.particles.forEach(p => {
      // Guardar posición anterior para el trail
      p.trail.push({ x: p.x, y: p.y })
      if (p.trail.length > 8) p.trail.shift()
      
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.12
      p.vx *= 0.98
      p.life -= 1.5
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(p => {
      if (p.life > 0) {
        // Dibujar trail
        p.trail.forEach((point, i) => {
          const alpha = (i / p.trail.length) * (p.life / 120) * 0.5
          ctx.globalAlpha = alpha
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(point.x, point.y, p.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
        })

        // Dibujar partícula principal con brillo
        ctx.globalAlpha = p.life / 120
        ctx.shadowBlur = 15
        ctx.shadowColor = p.color
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
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
  const rocketsRef = useRef<RocketParticle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number
    let isAnimating = false

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizar y dibujar cohetes
      rocketsRef.current = rocketsRef.current.filter(r => {
        r.trail.push({ x: r.x, y: r.y, alpha: 1 })
        if (r.trail.length > 15) r.trail.shift()
        
        r.y += r.vy
        r.vy *= 0.98
        
        // Dibujar trail del cohete
        r.trail.forEach((point, i) => {
          ctx.globalAlpha = (i / r.trail.length) * 0.6
          ctx.fillStyle = r.color
          ctx.beginPath()
          ctx.arc(point.x + (Math.random() - 0.5) * 2, point.y, 2, 0, Math.PI * 2)
          ctx.fill()
        })
        
        // Dibujar cohete
        ctx.globalAlpha = 1
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Explotar cuando llega al objetivo
        if (r.y <= r.targetY) {
          fireworksRef.current.push(new Firework(r.x, r.y))
          return false
        }
        return true
      })

      fireworksRef.current = fireworksRef.current.filter(f => f.isAlive())

      fireworksRef.current.forEach(f => {
        f.update()
        f.draw(ctx)
      })

      ctx.globalAlpha = 1

      if (fireworksRef.current.length > 0 || rocketsRef.current.length > 0) {
        animationId = requestAnimationFrame(animate)
      } else {
        isAnimating = false
      }
    }

    const launchRocket = () => {
      const colors = ['#ff1744', '#ffd600', '#00e676', '#2196f3', '#ff69b4', '#FFD700']
      rocketsRef.current.push({
        x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
        y: canvas.height,
        vy: -12 - Math.random() * 5,
        targetY: Math.random() * canvas.height * 0.4 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: []
      })
      
      if (!isAnimating) {
        isAnimating = true
        animate()
      }
    }

    // Lanzar fuegos artificiales más frecuentemente
    const autoFireworks = () => {
      // Lanzar 2-3 cohetes iniciales
      for (let i = 0; i < 3; i++) {
        setTimeout(() => launchRocket(), i * 400)
      }
      
      // Continuar lanzando cada 1.5-2.5 segundos
      const interval = setInterval(() => {
        const count = Math.random() > 0.5 ? 2 : 1
        for (let i = 0; i < count; i++) {
          setTimeout(() => launchRocket(), i * 300)
        }
      }, 1500 + Math.random() * 1000)

      return interval
    }

    const interval = autoFireworks()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      clearInterval(interval)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    />
  )
}
