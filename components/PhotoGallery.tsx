'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const photos = [
  { id: 4, src: '/assets/c4.jpeg', caption: 'DONDE CONOCI A CAMI' },
  { id: 5, src: '/assets/c5.jpeg', caption: 'DONDE ESTOY CONOCIENDO A VALE' },
  { id: 6, src: '/assets/c6.jpeg', caption: 'LO QUE COMPARTIMOS JUNTOS' },
  { id: 7, src: '/assets/c7.jpeg', caption: 'ALGO QUE JAMAS ME OLVIDARE' },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: index * 0.2, type: 'spring' }}
            whileHover={{ y: -15, scale: 1.08, rotateY: 5 }}
            onClick={() => setSelectedPhoto(photo)}
            className="rounded-2xl overflow-hidden shadow-2xl bg-white cursor-pointer group"
            style={{
              boxShadow: '0 20px 50px rgba(255, 23, 68, 0.3)',
            }}
          >
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div 
                className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              >
                <span className="text-sm font-bold">Click para ver 💖</span>
              </motion.div>
            </div>
            <div className="p-6 bg-white">
              <p 
                className="text-center font-bold text-rose-600"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem' }}
              >
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal para ver foto grande */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh]">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 bg-white text-center">
                <p 
                  className="text-2xl font-bold text-rose-600 mb-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {selectedPhoto.caption}
                </p>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-6 py-2 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-colors"
                >
                  Cerrar 💕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
