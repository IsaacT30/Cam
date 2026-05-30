'use client'

import { motion } from 'framer-motion'

interface WishModalProps {
  wish: string
  wishNumber: number
  onClose: () => void
}

export default function WishModal({ wish, wishNumber, onClose }: WishModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.6, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <h2 
            className="text-4xl md:text-5xl font-black mb-8 text-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: 'linear-gradient(135deg, #ff006e 0%, #fb5607 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ✨ Deseo #{wishNumber}
          </h2>
        </motion.div>
        
        <p 
          className="text-lg md:text-xl text-gray-800 leading-relaxed mb-10 text-center font-medium"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          "{wish}"
        </p>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-full font-bold hover:shadow-lg transition-shadow"
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Cerrar ←
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
