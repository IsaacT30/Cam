'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AudioControllerProps {
  src: string
}

export default function AudioController({ src }: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Configurar el audio para loop infinito
    audio.loop = true
    audio.volume = 0.7

    // Intentar reproducir automáticamente
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        // Si falla el autoplay, esperar interacción del usuario
        const handleInteraction = async () => {
          try {
            await audio.play()
            setIsPlaying(true)
            document.removeEventListener('click', handleInteraction)
            document.removeEventListener('touchstart', handleInteraction)
            document.removeEventListener('keydown', handleInteraction)
          } catch (err) {
            console.log('Error playing audio:', err)
          }
        }

        document.addEventListener('click', handleInteraction)
        document.addEventListener('touchstart', handleInteraction)
        document.addEventListener('keydown', handleInteraction)

        return () => {
          document.removeEventListener('click', handleInteraction)
          document.removeEventListener('touchstart', handleInteraction)
          document.removeEventListener('keydown', handleInteraction)
        }
      }
    }

    playAudio()
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false
        setIsMuted(false)
      } else {
        audioRef.current.muted = true
        setIsMuted(true)
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      
      {/* Botón de silencio flotante */}
      <motion.button
        onClick={toggleMute}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all"
        style={{
          background: isMuted 
            ? 'linear-gradient(135deg, #6b7280 0%, #374151 100%)' 
            : 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
          boxShadow: isMuted 
            ? '0 4px 20px rgba(107, 114, 128, 0.4)' 
            : '0 4px 20px rgba(236, 72, 153, 0.4)',
        }}
        title={isMuted ? 'Activar música' : 'Silenciar música'}
      >
        {isMuted ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-7 w-7 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" 
            />
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-7 w-7 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
            />
          </svg>
        )}
      </motion.button>

      {/* Indicador de "Toca para activar música" si no está reproduciendo */}
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-6 z-50 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
        >
          <p className="text-sm font-medium text-gray-700">
            🎵 Toca para activar la música
          </p>
        </motion.div>
      )}
    </>
  )
}
