'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PasswordScreenProps {
  onSuccess: () => void
}

export default function PasswordScreen({ onSuccess }: PasswordScreenProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([])

  const correctPassword = '3005'

  useEffect(() => {
    // Crear corazones flotantes
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setHearts(newHearts)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === correctPassword) {
      onSuccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 1000)
      setPassword('')
    }
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #ff6b9d 100%)',
      }}
    >
      {/* Corazones flotantes de fondo */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-4xl md:text-6xl opacity-20 pointer-events-none"
          style={{ left: `${heart.x}%` }}
          initial={{ y: '100vh', rotate: 0 }}
          animate={{ 
            y: '-100vh', 
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          💖
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
          ¡Hola Princesa! 👑
        </motion.h1>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-white/90 mb-8"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Ingresa la contraseña para ver tu sorpresa
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="💕 Contraseña..."
              className={`w-64 md:w-80 px-6 py-4 text-xl text-center rounded-full border-4 outline-none transition-all ${
                error 
                  ? 'border-red-500 bg-red-100' 
                  : 'border-white/50 bg-white/20 text-white placeholder-white/70 focus:border-white focus:bg-white/30'
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

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-pink-600 font-bold text-xl rounded-full shadow-xl hover:shadow-2xl transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Entrar 💖
          </motion.button>
        </motion.form>

        {/* Pista */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-white/80 hover:text-white underline transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {showHint ? 'Ocultar pista' : '¿Necesitas una pista? 🤔'}
          </button>
          
          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 text-white/90 text-lg bg-white/20 px-6 py-3 rounded-full inline-block"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                💡 Una fecha muy especial... 30/05 
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}
