import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import { useGameStore } from '../store/useGameStore'

export default function Apresentacao() {
  const { setEstado, progresso } = useGameStore()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="max-w-md w-full text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="text-7xl"
        >
          🎯
        </motion.div>
        <h1 className="text-5xl font-black">OIO ONE</h1>
        <p className="text-white/80 text-lg">
          4 nichos × 10 fases × 10 perguntas = 400 desafios
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="glass rounded-xl p-3">
            <div className="text-2xl font-bold">{progresso.totalPontos}</div>
            <div className="text-white/60">Pontos totais</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-2xl font-bold">15s</div>
            <div className="text-white/60">Por pergunta</div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setEstado('selecao_nicho')}
          className="glass-btn w-full text-xl py-4"
        >
          Começar Jogo
        </motion.button>
      </GlassCard>
    </div>
  )
}
