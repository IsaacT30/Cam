'use client'

import { motion } from 'framer-motion'

const photos = [
  { id: 1, caption: 'DONDE CONOCI A CAMI' },
  { id: 2, caption: 'DONDE ESTOY CONOCIENDO A VALE' },
  { id: 3, caption: 'LO QUE COMPARTIMOS JUNTOS' },
  { id: 4, caption: 'ALGO QUE JAMAS ME OLVIDARE' },
]

export default function PhotoGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ y: -15, scale: 1.05 }}
          className="rounded-2xl overflow-hidden shadow-2xl bg-white"
          style={{
            boxShadow: '0 20px 50px rgba(255, 23, 68, 0.2)',
          }}
        >
          <div className="relative w-full h-64 flex items-center justify-center text-7xl" style={{ backgroundImage: `url(/assets/photo${photo.id}.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* REEMPLAZA photo${photo.id}.jpg CON TUS IMÁGENES: photo1.jpg, photo2.jpg, photo3.jpg, photo4.jpg */}
          </div>
          <div className="p-6 bg-white">
            <p 
              className="text-center font-bold text-rose-600"
              style={{ fontFamily: "'Satisfy', cursive", fontSize: '1.2rem' }}
            >
              {photo.caption}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
