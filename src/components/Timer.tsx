import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/useGameStore'

export default function Timer() {
  const { tempo, tick, estado } = useGameStore()

  useEffect(() => {
    if (estado!== 'gameplay') return
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [estado, tick])

  const cor = tempo <= 5? '#EF4444' : tempo <= 10? '#F59E0B' : '#10B981'

  return (
    <div className="text-center">
      <motion.div
        key={tempo}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className="text-6xl font-black"
        style={{ color: cor }}
      >
        {tempo}
      </motion.div>
      <div className="w-full h-3 bg-white/20 rounded-full mt-3 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: cor }}
          initial={{ width: '100%' }}
          animate={{ width: `${(tempo / 15) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
