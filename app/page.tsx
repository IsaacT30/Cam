'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Fireworks from '@/components/Fireworks'
import WishModal from '@/components/WishModal'
import PhotoGallery from '@/components/PhotoGallery'
import BalloonButton from '@/components/BalloonButton'
import PasswordScreen from '@/components/PasswordScreen'
import Image from 'next/image'

type Page = 'home' | 'wishes' | 'gallery' | 'balloon'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [selectedWish, setSelectedWish] = useState<number | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const wishes = [
    'Que vas a comer a las horas que son y haras caso en todo lo que te digan tus papis',
    'Que dejaras el pasado atras y te enfocaras en el presente para construir un futuro lleno de felicidad',
    'Que esos pensamientos negativos que a veces te invaden se vayan y los reemplaces por amor propio y confianza en ti misma',
  ]

  if (!isAuthenticated) {
    return <PasswordScreen onSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full min-h-screen"
          >
            {/* SECCIÓN HERO */}
            <div className="w-full h-screen flex flex-col items-center justify-center relative"
              style={{
                backgroundColor: '#FFA500',
                backgroundImage: 'url(/assets/basketball.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'scroll',
              }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0">
                <Fireworks />
              </div>

              <div className="relative z-10 text-center px-4 space-y-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: -50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <h1 
                    className="text-6xl md:text-8xl font-black"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: '#ffffff',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.7), 0 2px 10px rgba(255, 200, 0, 0.5)',
                    }}
                  >
                    ¡FELIZ
                  </h1>
                  <h1 
                    className="text-6xl md:text-8xl font-black"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: '#ffffff',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.7), 0 2px 10px rgba(255, 200, 0, 0.5)',
                    }}
                  >
                    CUMPLEAÑOS PRINCESS!
                  </h1>
                </motion.div>

                {/* Photo Frame con imagen c1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative w-48 h-48 md:w-64 md:h-64 mx-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 rounded-3xl p-1"
                    style={{
                      boxShadow: '0 20px 60px rgba(255, 0, 110, 0.4)',
                    }}>
                    <div className="w-full h-full rounded-3xl overflow-hidden relative">
                      <Image
                        src="/assets/c1.jpeg"
                        alt="Foto de cumpleaños"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Decoraciones */}
                  <motion.div
                    animate={{ rotate: 360, y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-6 -left-6 text-6xl"
                  >
                    🎂
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360, y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-6 -right-6 text-6xl"
                  >
                    🎉
                  </motion.div>
                </motion.div>

                {/* Button to scroll */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.button
                    onClick={() => {
                      const element = document.getElementById('options-section')
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-300 to-orange-400 text-gray-900 font-bold rounded-full text-lg shadow-lg"
                  >
                    Continuar ↓
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* SECCIÓN OPCIONES */}
            <div 
              id="options-section"
              className="w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 relative"
            style={{
              backgroundImage: 'url(/assets/spiderman.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
            >
              <div className="absolute inset-0 bg-black/0" />
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-12 max-w-4xl relative z-10"
              >
                <h2 
                  className="text-5xl md:text-6xl font-black"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: '#ffffff',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(255, 200, 0, 0.5)',
                  }}
                >
                  VAMOS POR DONDE TU QUIERAS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Deseos */}
                  <motion.button
                    onClick={() => setCurrentPage('wishes')}
                    whileHover={{ scale: 1.08, rotateY: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-40 rounded-2xl overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-700" />
                    <div className="absolute inset-0 group-hover:opacity-100 opacity-90 transition-opacity bg-black/20" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-3">
                      <span className="text-5xl">🌟</span>
                      <span className="text-2xl font-bold text-white drop-shadow-lg">LO QUE QUIERO QUE ME JURES POR LA GARRITA</span>
                    </div>
                  </motion.button>

                  {/* Fotos */}
                  <motion.button
                    onClick={() => setCurrentPage('gallery')}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-40 rounded-2xl overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700" />
                    <div className="absolute inset-0 group-hover:opacity-100 opacity-90 transition-opacity bg-black/20" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-3">
                      <span className="text-5xl">📸</span>
                      <span className="text-2xl font-bold text-white drop-shadow-lg">LO MAS TOP QUE HASTA AHORA HE VIVIDO CONTIGO</span>
                    </div>
                  </motion.button>

                  {/* Sorpresa */}
                  <motion.button
                    onClick={() => setCurrentPage('balloon')}
                    whileHover={{ scale: 1.08, rotateY: -10 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-40 rounded-2xl overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-700" />
                    <div className="absolute inset-0 group-hover:opacity-100 opacity-90 transition-opacity bg-black/20" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-3">
                      <span className="text-5xl">🎈</span>
                      <span className="text-2xl font-bold text-white drop-shadow-lg">UNA PEQUEÑA SORPRESA!</span>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentPage === 'wishes' && (
          <motion.div
            key="wishes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen flex flex-col items-center justify-center p-6 relative"
            style={{
              backgroundImage: 'url(/assets/flores.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          >
            <div className="relative z-10 w-full max-w-4xl">
                  <h1 
                    className="text-5xl md:text-6xl font-black text-center mb-12"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: '#1a1a1a',
                      textShadow: '0 2px 8px rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    LO QUE ANHELO QUE CUMPLAS POR MI ESTE AÑO
                  </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {wishes.map((wish, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    onClick={() => setSelectedWish(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-8 rounded-2xl font-bold text-gray-900 cursor-pointer text-center h-48 flex items-center justify-center backdrop-blur-sm border-2 ${
                      index === 0
                        ? 'bg-rose-200/90 border-rose-400'
                        : index === 1
                        ? 'bg-purple-200/90 border-purple-400'
                        : 'bg-pink-200/90 border-pink-400'
                    }`}
                  >
                    <div>
                      <div 
                        className="text-5xl mb-3 font-black"
                        style={{ fontFamily: "'Poppins', sans-serif", color: '#1a1a1a' }}
                      >
                        ✨ #{index + 1}
                      </div>
                      <p className="text-lg font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>ME JURAS POR LA GARRITA?</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setCurrentPage('home')}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-full text-lg hover:bg-gray-800 transition-all"
              >
                ← Volver
              </motion.button>
            </div>

            {selectedWish !== null && (
              <WishModal
                wish={wishes[selectedWish]}
                wishNumber={selectedWish + 1}
                onClose={() => setSelectedWish(null)}
              />
            )}
          </motion.div>
        )}

        {currentPage === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen flex flex-col items-center justify-center p-6"
            style={{
              backgroundImage: 'url(/assets/flores.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          >
            <div className="relative z-10 w-full max-w-4xl">
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl md:text-6xl font-black text-center mb-12"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  color: '#1a1a1a',
                  textShadow: '0 2px 8px rgba(255, 255, 255, 0.8)',
                }}
              >
                LUGARES DONDE JAMAS ME OLVIDARE DE LO QUE VIVIMOS
              </motion.h1>

              <PhotoGallery />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center mt-12"
              >
                <button
                  onClick={() => setCurrentPage('home')}
                    className="w-full py-4 bg-yellow-300 text-gray-900 font-bold rounded-full text-lg hover:bg-yellow-400 transition-all shadow-lg"
                >
                  ← Volver
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentPage === 'balloon' && (
          <motion.div
            key="balloon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen flex flex-col items-center justify-center p-6 relative"
            style={{
              backgroundImage: 'url(/assets/chocolate.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay sutil para mejor contraste */}
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 text-center">
              <BalloonButton onBack={() => setCurrentPage('home')} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
