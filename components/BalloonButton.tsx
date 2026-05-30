'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Fireworks from '@/components/Fireworks'

interface BalloonButtonProps {
  onBack: () => void
}

interface ConfettiParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  size: number
  shape: 'circle' | 'square' | 'triangle' | 'star'
  rotation: number
  rotationSpeed: number
}

export default function BalloonButton({ onBack }: BalloonButtonProps) {
  const [clicks, setClicks] = useState(0)
  const [showLetter, setShowLetter] = useState(false)
  const [isPopped, setIsPopped] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confettiRef = useRef<ConfettiParticle[]>([])
  const animationRef = useRef<number>(0)

  const totalClicks = 20

  const handleBalloonClick = () => {
    if (clicks >= totalClicks || isPopped) return

    const newClicks = clicks + 1
    setClicks(newClicks)

    // Si llega a 20, reventar
    if (newClicks >= totalClicks) {
      setTimeout(() => {
        setIsPopped(true)
        setShowConfetti(true)
        createConfetti()
        setTimeout(() => {
          setShowLetter(true)
        }, 1200)
      }, 300)
    }
  }

  const createConfetti = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = [
      '#ff1744', '#f50057', '#ff3d00',
      '#ff6f00', '#ffd600', '#76ff03',
      '#00e676', '#00bcd4', '#2196f3',
      '#3f51b5', '#673ab7', '#d32f2f',
      '#ff69b4', '#ff8c00', '#FFD700',
      '#00FF7F', '#FF6347', '#9400D3'
    ]

    const shapes: ConfettiParticle['shape'][] = ['circle', 'square', 'triangle', 'star']

    // Crear confeti desde el centro (donde estaba el globo)
    confettiRef.current = Array.from({ length: 300 }, () => {
      const angle = Math.random() * Math.PI * 2
      const velocity = 8 + Math.random() * 18
      
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * velocity * (0.5 + Math.random()),
        vy: Math.sin(angle) * velocity - 8 - Math.random() * 5,
        life: 300 + Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 12,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
      }
    })

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const spikes = 5
      const outerRadius = size
      const innerRadius = size / 2
      let rot = Math.PI / 2 * 3
      const step = Math.PI / spikes

      ctx.beginPath()
      ctx.moveTo(x, y - outerRadius)

      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius)
        rot += step
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius)
        rot += step
      }
      ctx.lineTo(x, y - outerRadius)
      ctx.closePath()
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      confettiRef.current.forEach((c) => {
        c.x += c.vx
        c.y += c.vy
        c.vy += 0.25 // Gravedad
        c.vx *= 0.99 // Fricción
        c.life -= 1.5
        c.rotation += c.rotationSpeed

        if (c.life > 0) {
          ctx.save()
          ctx.translate(c.x, c.y)
          ctx.rotate(c.rotation)
          ctx.globalAlpha = Math.min(c.life / 150, 1)
          ctx.fillStyle = c.color
          ctx.shadowBlur = 5
          ctx.shadowColor = c.color
          
          switch (c.shape) {
            case 'circle':
              ctx.beginPath()
              ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2)
              ctx.fill()
              break
            case 'square':
              ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size)
              break
            case 'triangle':
              ctx.beginPath()
              ctx.moveTo(0, -c.size / 2)
              ctx.lineTo(-c.size / 2, c.size / 2)
              ctx.lineTo(c.size / 2, c.size / 2)
              ctx.closePath()
              ctx.fill()
              break
            case 'star':
              drawStar(ctx, 0, 0, c.size / 2)
              break
          }
          
          ctx.restore()
        }
      })

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      if (confettiRef.current.some(c => c.life > 0)) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animate()
  }

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const getBalloonSize = () => {
    const percentage = clicks / totalClicks
    return 150 + percentage * 100
  }

  const getBalloonScale = () => {
    return 1 + (clicks / totalClicks) * 0.3
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10">
        {!isPopped && (
          <div className="flex flex-col items-center">
            {/* Título animado */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-black text-white mb-6 text-center"
              style={{
                fontFamily: "'Poppins', sans-serif",
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              ¡Toca el globo hasta reventarlo! 🎈
            </motion.h2>

            {/* Contador de clicks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 px-6 py-2 bg-white/90 rounded-full shadow-lg"
            >
              <span className="text-lg font-bold text-pink-600">
                {clicks} / {totalClicks} toques
              </span>
            </motion.div>

            {/* Barra de progreso */}
            <div className="w-64 h-3 bg-white/30 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 to-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(clicks / totalClicks) * 100}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>

            <motion.button
              onClick={handleBalloonClick}
              disabled={clicks >= totalClicks}
              animate={{
                scale: getBalloonScale(),
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              whileHover={clicks < totalClicks ? { scale: getBalloonScale() * 1.05 } : {}}
              whileTap={clicks < totalClicks ? { scale: getBalloonScale() * 0.98 } : {}}
              className="relative flex items-center justify-center cursor-pointer transition-none rounded-full"
              style={{
                background: 'radial-gradient(135% 135% at 50% 0%, rgba(255, 105, 180, 0.8), rgba(255, 23, 68, 1))',
                boxShadow: `0 ${20 + clicks * 2}px ${50 + clicks * 3}px rgba(255, 23, 68, ${0.3 + clicks * 0.02})`,
                width: `${getBalloonSize()}px`,
                height: `${getBalloonSize()}px`,
                borderRadius: '50%',
              }}
            >
              <span className="text-6xl">🎈</span>
            </motion.button>

            {/* Texto de motivación */}
            <motion.p
              key={clicks}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 text-lg font-bold text-white"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              {clicks < 5 && '¡Dale, tu puedes! 💪'}
              {clicks >= 5 && clicks < 10 && '¡Sigue así! 🔥'}
              {clicks >= 10 && clicks < 15 && '¡Ya casi! 😍'}
              {clicks >= 15 && clicks < 20 && '¡Un poquito más! 🎉'}
            </motion.p>
          </div>
        )}

        <AnimatePresence>
          {showLetter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="mt-8 md:mt-12 p-4 md:p-8 bg-white/95 backdrop-blur-sm rounded-3xl max-w-sm md:max-w-2xl shadow-2xl border-4 border-pink-300 max-h-[80vh] overflow-y-auto"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <h3 
                  className="text-lg md:text-3xl font-black mb-4 md:mb-8 text-center"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: '#ff006e',
                  }}
                >
                ALGO QUE NO TE HABLARA ISAAC, TE HABLARA UN NIÑITO......
                </h3>
              </motion.div>
              <p 
                className="text-gray-800 leading-relaxed text-left font-medium text-xs md:text-base"
                style={{ fontFamily: "'Poppins', sans-serif", lineHeight: '1.6' }}
              >
                <div style={{ textAlign: "justify" }}>
BUENO... COMO TE DIJE POR CHAT.... AHORA SI SOY LIBRE DE HABLAR PORQUE ME PUSIERON LIMITE EN WHATSAPP,

NUEVAMENTE QUIERO QUE SEPAS QUE ESTOY MUY FELIZ DE PODER COMPARTIR UN AÑITO DE VIDA JUNTO A TI, HE 

CONOCIDO A CAMILA Y SE CUAL ES ESA NIÑA TAN BELLA.... PERO AHORA ME ESTAS ENSEÑANDO A CONOCER A VALENTINA

Y ES ALGO QUE WOW NO CAMBIA EN NADA JAJAJA.... PORQUE PARA MI SIEMPRE SERAS CAMILA OKEY??.....Y DEPUES DE TODO 

Y MUCHO BLA BLA BLA Y TUS OK,MAÑANA (corazon verde, morado y blanco) Y MI PRIMITO CHIQUITO Y QUE PASIVA, Y TALES,

JAMAS TE LO HE DICHO Y PUES PIENSO QUE POR FIN A LLEGADO EL MOMENTO DE DECIRTE "FELIZ CUMPLEAÑOS", A PASADO

MILLONES DE SIGLOS Y MILLONES DE AÑOS TENGO EL GUSTO DE PODER DECIRTE ESO JAJAJAJA....QUE ORGULLO 

EL SABER QUE ERES UNA NIÑA QUE NO DA PROBLEMAS A NADIE Y SIEMPRES ESTAS PARA LAS PERSONAS QUE ESTAN A 

TU ALREDEDOR, EN ESTE DIA TAN ESPACIAL QUIERO DECIRTE QUE NUNCA CAMBIES QUE SIGAS SIENDO ESA NIÑA TAN 

LINDA QUE ERES, QUE JAMAS DEJES ESOS VALORES TAN BUENOS QUE TE HAN ENSEÑADO PAPI Y MAMI, QUE SABES QUE 

CUENTAS CON UN AMIGO PARA LAS QUE SEA, QUE SIEMPRE TENDRAS MI APOYO PARA LAS COSAS BUENAS COMO TE LO VIVO

DICIENDO, QUE ESAS IDEITAS LOCAS QUE A VECES PASAN POR ESA CABAZITA SE VAYAN QUEDANDO ATRAS, PORQUE LOS 

AMIGOS NO SOLO SOMOS PARA JODER, TAMBIEN SOMOS APOYO PARA CUANDO NOS SENTIMOS MAL, SABES QUE ME GUSTA 

ESCUCHARTE DE LAS PENAS QUE TIENES POR LOS FEOS ESOS DE TUS NOVIOS JAJAJA.... POCO A POCO HE IDO CONOCIENDO

LA NIÑA QUE ERES Y JAMAS ME ARREPENTIRE DE HABER PODIDO TENER UNA AMISTAD CONTIGO, YA 19 PRIMAVERAS, YA 

ESTAS VIEJITA, CUCHITA JAJAJA... LLEGASTE A LA EDAD EN LA QUE ADIOS TOBILLOS CADA MES JAJAJ... PIENSO QUE YA

ES HORA DE QUE DEJES DE ANDAR ILUSIONANDO A LA GENTE PORQUE SI NO MUCHOS TEMAS QUE HABLAR EN EL -5 JAJAJA...

ESPERO QUE HOY TE FESTEJEN DE LO MEJOR Y QUE VIVA LA CUMPLEAÑERA........ SE QUE ESTO NO FUE LA GRAN COSA PERO 

PIENSO QUE CADA UNO PUEDE HACER ESPECIAL ALGO A SU MANERA Y CREO QUE HOY ME TOCO A LA MIA JAJAJA...

TE QUIERO MUCHISIMO CAMILITA HERMOSA................</div>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {isPopped && !showLetter && (
          <>
            <Fireworks />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-12 text-6xl"
            >
              🎉
            </motion.div>
          </>
        )}

        {showLetter && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={onBack}
            className="btn-nav mt-8"
          >
            ← Volver al Inicio
          </motion.button>
        )}
      </div>
    </>
  )
}
