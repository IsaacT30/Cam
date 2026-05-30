'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Fireworks from '@/components/Fireworks'

interface BalloonButtonProps {
  onBack: () => void
}

export default function BalloonButton({ onBack }: BalloonButtonProps) {
  const [clicks, setClicks] = useState(0)
  const [showLetter, setShowLetter] = useState(false)
  const [isPopped, setIsPopped] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const totalClicks = 20

  const handleBalloonClick = () => {
    if (clicks >= totalClicks || isPopped) return

    const newClicks = clicks + 1
    setClicks(newClicks)

    // Si llega a 20, reventar
    if (newClicks >= totalClicks) {
      setTimeout(() => {
        setIsPopped(true)
        createConfetti()
        setTimeout(() => {
          setShowLetter(true)
        }, 800)
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

    const confetti = Array.from({ length: 150 }, () => {
      const angle = Math.random() * Math.PI * 2
      const velocity = 5 + Math.random() * 12
      
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 5,
        life: 255,
        color: [
          '#ff1744', '#f50057', '#ff3d00',
          '#ff6f00', '#ffd600', '#76ff03',
          '#00e676', '#00bcd4', '#2196f3',
          '#3f51b5', '#673ab7', '#d32f2f',
          '#ff69b4', '#ff8c00'
        ][Math.floor(Math.random() * 14)],
        size: 4 + Math.random() * 8,
        shape: Math.random() > 0.5 ? 'circle' : 'square',
      }
    })

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      confetti.forEach((c, index) => {
        c.x += c.vx
        c.y += c.vy
        c.vy += 0.3
        c.life -= 2

        if (c.life > 0) {
          ctx.globalAlpha = c.life / 255
          ctx.fillStyle = c.color
          
          if (c.shape === 'circle') {
            ctx.beginPath()
            ctx.arc(c.x, c.y, c.size / 2, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.fillRect(c.x - c.size / 2, c.y - c.size / 2, c.size, c.size)
          }
        }
      })

      ctx.globalAlpha = 1

      if (confetti.some(c => c.life > 0)) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animate()
  }

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
          <>
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
          </>
        )}

        <AnimatePresence>
          {showLetter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="mt-8 md:mt-12 p-4 md:p-8 bg-white rounded-3xl max-w-sm md:max-w-2xl shadow-2xl border-4 border-pink-300 max-h-[90vh] overflow-y-auto"
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
