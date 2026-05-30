'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PasswordScreenProps {
  onSuccess: () => void
}

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export default function PasswordScreen({ onSuccess }: PasswordScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)
  const [stars, setStars] = useState<Star[]>([])

  const correctPassword = '3005'

  useEffect(() => {
    // Crear estrellas fugaces
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
    setStars(newStars)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const password = inputRef.current?.value || ''
    if (password === correctPassword) {
      onSuccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 1000)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      {/* Estrellas estáticas de fondo */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full pointer-events-none"
          style={{ 
            left: `${star.x}%`, 
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: 'white',
            boxShadow: `0 0 ${star.size * 2}px white`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Lluvia de estrellas fugaces */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: '-5%',
            boxShadow: '0 0 6px 2px rgba(255,255,255,0.8), 0 0 30px 4px rgba(255,200,100,0.5)',
          }}
          animate={{
            x: [0, 150],
            y: [0, 400],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.8 + Math.random() * 2,
            repeat: Infinity,
            repeatDelay: 3 + Math.random() * 4,
            ease: 'linear',
          }}
        />
      ))}

      {/* Texto flotante CAMI y VALE */}
      <motion.div
        className="absolute text-6xl md:text-8xl font-black opacity-10 pointer-events-none"
        style={{
          left: '10%',
          top: '20%',
          color: '#ff69b4',
          fontFamily: "'Poppins', sans-serif",
          textShadow: '0 0 30px rgba(255,105,180,0.5)',
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        CAMI
      </motion.div>

      <motion.div
        className="absolute text-6xl md:text-8xl font-black opacity-10 pointer-events-none"
        style={{
          right: '10%',
          bottom: '20%',
          color: '#ffd700',
          fontFamily: "'Poppins', sans-serif",
          textShadow: '0 0 30px rgba(255,215,0,0.5)',
        }}
        animate={{
          y: [0, 20, 0],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 4,
          delay: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        VALE
      </motion.div>

      {/* Fuegos artificiales simulados */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`firework-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
        >
          {Array.from({ length: 12 }).map((_, j) => (
            <motion.div
              key={`particle-${i}-${j}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ['#ff69b4', '#ffd700', '#00ffff', '#ff6347', '#7fff00'][i % 5],
                boxShadow: `0 0 10px ${['#ff69b4', '#ffd700', '#00ffff', '#ff6347', '#7fff00'][i % 5]}`,
              }}
              animate={{
                x: [0, Math.cos((j / 12) * Math.PI * 2) * 60],
                y: [0, Math.sin((j / 12) * Math.PI * 2) * 60],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.5 + 1,
                repeat: Infinity,
                repeatDelay: 4,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Contenido principal */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        {/* Corazón grande animado */}
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-8"
        >
          <span className="text-8xl md:text-9xl drop-shadow-2xl">💝</span>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-black text-white mb-4"
          style={{
            fontFamily: "'Poppins', sans-serif",
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          Hola Neni Cumpleañera
        </motion.h1>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-white/90 mb-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Ingresa la contraseña para ver tu sorpresa
        </motion.p>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-pink-300 mb-8"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          La clave es única 💕
        </motion.p>

        {/* Formulario */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-6"
        >
          <motion.div
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              ref={inputRef}
              type="password"
              placeholder="💕 Contraseña..."
              className={`w-64 md:w-80 px-6 py-4 text-xl text-center rounded-full border-4 outline-none transition-all ${
                error 
                  ? 'border-red-500 bg-red-100 text-red-900' 
                  : 'border-pink-400/50 bg-white/10 text-white placeholder-white/70 focus:border-pink-400 focus:bg-white/20'
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-white font-bold text-lg"
              >
                💔 Contraseña incorrecta, intenta de nuevo
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Entrar 💖
          </button>
        </motion.form>
      </motion.div>
    </div>
  )
}
