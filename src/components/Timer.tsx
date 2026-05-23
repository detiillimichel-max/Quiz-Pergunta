import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/useGameStore'

export default function Timer() {
  const { tempo, tick, estado, faseId } = useGameStore()

  useEffect(() => {
    if (estado !== 'gameplay') return
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [estado, tick])

  const tempoMaximo = 25 // 25 segundos fixo pra todas as fases
  const cor = tempo <= 5 ? '#EF4444' : tempo <= 15 ? '#F59E0B' : '#10B981'

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
          animate={{ width: `${(tempo / tempoMaximo) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
