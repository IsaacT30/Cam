'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Fireworks from '@/components/Fireworks'
import Image from 'next/image'

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
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const totalClicks = 20

  useEffect(() => {
    // Crear el elemento de audio
    audioRef.current = new Audio('/assets/cumple.mp3')
    audioRef.current.loop = true

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // El navegador puede bloquear autoplay, ignorar el error
      })
    }
  }

  const handleBalloonClick = () => {
    if (clicks >= totalClicks || isPopped) return

    const newClicks = clicks + 1
    setClicks(newClicks)

    // Si llega a 20, reventar
    if (newClicks >= totalClicks) {
      setTimeout(() => {
        setIsPopped(true)
        setShowConfetti(true)
        playMusic()
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
    return 120 + percentage * 100
  }

  const photos = ['/assets/c2.jpeg', '/assets/c3.jpeg', '/assets/c4.jpeg', '/assets/c5.jpeg']

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 w-full px-4">
        {!isPopped && (
          <div className="flex flex-col items-center">
            {/* Solo el globo silueta que se infla */}
            <motion.button
              onClick={handleBalloonClick}
              disabled={clicks >= totalClicks}
              animate={{
                scale: 1 + (clicks / totalClicks) * 0.4,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              whileHover={clicks < totalClicks ? { scale: (1 + (clicks / totalClicks) * 0.4) * 1.05 } : {}}
              whileTap={clicks < totalClicks ? { scale: (1 + (clicks / totalClicks) * 0.4) * 0.98 } : {}}
              className="relative cursor-pointer transition-none"
              style={{
                width: `${getBalloonSize()}px`,
                height: `${getBalloonSize() * 1.2}px`,
              }}
            >
              {/* Globo con color rosa degradado */}
                <defs>
                  <linearGradient id="balloonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff69b4" />
                    <stop offset="50%" stopColor="#ff1493" />
                    <stop offset="100%" stopColor="#dc143c" />
                  </linearGradient>
                  <radialGradient id="balloonShine" cx="30%" cy="30%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </radialGradient>
                </defs>
                <ellipse
                  cx="50"
                  cy="45"
                  rx="40"
                  ry="45"
                  fill="url(#balloonGradient)"
                  stroke="#ff1493"
                  strokeWidth="2"
                  style={{
                    filter: 'drop-shadow(0 8px 20px rgba(255, 20, 147, 0.5))',
                  }}
                />
                {/* Brillo del globo */}
                <ellipse
                  cx="50"
                  cy="45"
                  rx="40"
                  ry="45"
                  fill="url(#balloonShine)"
                />
                {/* Nudo del globo */}
                <path
                  d="M45 90 Q50 95 55 90 L52 95 L48 95 Z"
                  fill="#ff1493"
                  stroke="#dc143c"
                  strokeWidth="1"
                />
                {/* Hilo del globo */}
                <path
                  d="M50 95 Q55 105 45 115 Q55 110 50 120"
                  fill="none"
                  stroke="#8B4513"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Brillo grande */}
                <ellipse
                  cx="35"
                  cy="30"
                  rx="10"
                  ry="15"
                  fill="rgba(255, 255, 255, 0.4)"
                  transform="rotate(-30 35 30)"
                />
                {/* Nudo del globo */}
                <path
                  d="M45 90 Q50 95 55 90 L52 95 L48 95 Z"
                  fill="transparent"
                  stroke="#ff69b4"
                  strokeWidth="2"
                />
                {/* Hilo del globo */}
                <path
                  d="M50 95 Q55 105 45 115 Q55 110 50 120"
                  fill="none"
                  stroke="#ff69b4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Brillo */}
                <ellipse
                  cx="35"
                  cy="30"
                  rx="8"
                  ry="12"
                  fill="rgba(255, 255, 255, 0.2)"
                  transform="rotate(-30 35 30)"
                />
              </svg>

              {/* Efecto de inflado */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{
                  boxShadow: clicks > 0 
                    ? `0 0 ${clicks * 3}px rgba(255, 105, 180, ${0.2 + clicks * 0.03}), inset 0 0 ${clicks * 2}px rgba(255, 105, 180, 0.1)`
                    : 'none',
                }}
              />
            </motion.button>
          </div>
        )}

        <AnimatePresence>
          {showLetter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6"
            >
              {/* Fotos izquierda - solo visible en desktop */}
              <div className="hidden lg:flex flex-col gap-3">
                {[photos[0], photos[1]].map((photo, index) => (
                  <motion.div
                    key={`left-${index}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    className="relative w-32 h-44 rounded-lg overflow-hidden border-4 border-pink-300 shadow-lg"
                    style={{
                      transform: index === 0 ? 'rotate(-5deg)' : 'rotate(3deg)',
                    }}
                  >
                    <Image
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Carta principal */}
              <motion.div
                className="p-4 md:p-6 lg:p-8 bg-white/95 backdrop-blur-sm rounded-3xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl shadow-2xl border-4 border-pink-300 max-h-[70vh] overflow-y-auto"
              >
                <motion.div
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <h3 
                    className="text-base sm:text-lg md:text-2xl lg:text-3xl font-black mb-3 md:mb-6 text-center"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: '#ff006e',
                    }}
                  >
                  ALGO QUE NO TE HABLARA ISAAC, TE HABLARA UN NIÑITO......
                  </h3>
                </motion.div>
                <div 
                  className="text-gray-800 leading-relaxed text-left font-medium text-xs sm:text-sm md:text-base"
                  style={{ fontFamily: "'Poppins', sans-serif", lineHeight: '1.6', textAlign: 'justify' }}
                >
                  <p className="mb-3">
                    BUENO... COMO TE DIJE POR CHAT.... AHORA SI SOY LIBRE DE HABLAR PORQUE ME PUSIERON LIMITE EN WHATSAPP,
                  </p>
                  <p className="mb-3">
                    NUEVAMENTE QUIERO QUE SEPAS QUE ESTOY MUY FELIZ DE PODER COMPARTIR UN AÑITO DE VIDA JUNTO A TI, HE CONOCIDO A CAMILA Y SE CUAL ES ESA NIÑA TAN BELLA.... PERO AHORA ME ESTAS ENSEÑANDO A CONOCER A VALENTINA Y ES ALGO QUE WOW NO CAMBIA EN NADA JAJAJA.... PORQUE PARA MI SIEMPRE SERAS CAMILA OKEY??.....Y DEPUES DE TODO Y MUCHO BLA BLA BLA Y TUS OK,MAÑANA (corazon verde, morado y blanco) Y MI PRIMITO CHIQUITO Y QUE PASIVA, Y TALES,
                  </p>
                  <p className="mb-3">
                    JAMAS TE LO HE DICHO Y PUES PIENSO QUE POR FIN A LLEGADO EL MOMENTO DE DECIRTE &quot;FELIZ CUMPLEAÑOS&quot;, A PASADO MILLONES DE SIGLOS Y MILLONES DE AÑOS TENGO EL GUSTO DE PODER DECIRTE ESO JAJAJAJA....QUE ORGULLO EL SABER QUE ERES UNA NIÑA QUE NO DA PROBLEMAS A NADIE Y SIEMPRES ESTAS PARA LAS PERSONAS QUE ESTAN A TU ALREDEDOR, EN ESTE DIA TAN ESPACIAL QUIERO DECIRTE QUE NUNCA CAMBIES QUE SIGAS SIENDO ESA NIÑA TAN LINDA QUE ERES, QUE JAMAS DEJES ESOS VALORES TAN BUENOS QUE TE HAN ENSEÑADO PAPI Y MAMI, QUE SABES QUE CUENTAS CON UN AMIGO PARA LAS QUE SEA, QUE SIEMPRE TENDRAS MI APOYO PARA LAS COSAS BUENAS COMO TE LO VIVO DICIENDO, QUE ESAS IDEITAS LOCAS QUE A VECES PASAN POR ESA CABAZITA SE VAYAN QUEDANDO ATRAS, PORQUE LOS AMIGOS NO SOLO SOMOS PARA JODER, TAMBIEN SOMOS APOYO PARA CUANDO NOS SENTIMOS MAL, SABES QUE ME GUSTA ESCUCHARTE DE LAS PENAS QUE TIENES POR LOS FEOS ESOS DE TUS NOVIOS JAJAJA....
                  </p>
                  <p className="mb-3">
                    POCO A POCO HE IDO CONOCIENDO LA NIÑA QUE ERES Y JAMAS ME ARREPENTIRE DE HABER PODIDO TENER UNA AMISTAD CONTIGO, YA 19 PRIMAVERAS, YA ESTAS VIEJITA, CUCHITA JAJAJA... LLEGASTE A LA EDAD EN LA QUE ADIOS TOBILLOS CADA MES JAJAJ... PIENSO QUE YA ES HORA DE QUE DEJES DE ANDAR ILUSIONANDO A LA GENTE PORQUE SI NO MUCHOS TEMAS QUE HABLAR EN EL -5 JAJAJA...
                  </p>
                  <p className="mb-3">
                    ESPERO QUE HOY TE FESTEJEN DE LO MEJOR Y QUE VIVA LA CUMPLEAÑERA........ SE QUE ESTO NO FUE LA GRAN COSA PERO PIENSO QUE CADA UNO PUEDE HACER ESPECIAL ALGO A SU MANERA Y CREO QUE HOY ME TOCO A LA MIA JAJAJA...
                  </p>
                  <p className="font-bold text-pink-600">
                    TE QUIERO MUCHISIMO CAMILITA HERMOSA................
                  </p>
                </div>
              </motion.div>

              {/* Fotos derecha - solo visible en desktop */}
              <div className="hidden lg:flex flex-col gap-3">
                {[photos[2], photos[3]].map((photo, index) => (
                  <motion.div
                    key={`right-${index}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    className="relative w-32 h-44 rounded-lg overflow-hidden border-4 border-pink-300 shadow-lg"
                    style={{
                      transform: index === 0 ? 'rotate(5deg)' : 'rotate(-3deg)',
                    }}
                  >
                    <Image
                      src={photo}
                      alt={`Foto ${index + 3}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Fotos en mobile - abajo de la carta */}
              <div className="flex lg:hidden gap-2 mt-4 flex-wrap justify-center">
                {photos.map((photo, index) => (
                  <motion.div
                    key={`mobile-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-lg overflow-hidden border-3 border-pink-300 shadow-lg"
                    style={{
                      transform: `rotate(${(index - 1.5) * 5}deg)`,
                    }}
                  >
                    <Image
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
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
            className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all mx-auto block"
          >
            ← Volver al Inicio
          </motion.button>
        )}
      </div>
    </>
  )
}
