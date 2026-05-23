import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import Timer from '../components/Timer'
import AnswerInput from '../components/AnswerInput'
import { useGameStore } from '../store/useGameStore'
import banco from '../data/banco.json'

export default function GameBoard() {
  const {
    estado, setNicho, getPerguntaAtual, getNichoAtual, getFaseAtual,
    pontos, erros, faseId, perguntaIndex, setEstado, proximaFase, resetarJogo
  } = useGameStore()

  if (estado === 'selecao_nicho') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 text-white">
        <GlassCard className="max-w-lg w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Escolha o Nicho</h2>
          <div className="grid grid-cols-2 gap-4">
            {banco.nichos.map((nicho) => (
              <motion.button
                key={nicho.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNicho(nicho.id)}
                className="glass rounded-2xl p-6 text-center"
                style={{ borderColor: nicho.cor, borderWidth: 2 }}
              >
                <div className="text-5xl mb-3">{nicho.icone}</div>
                <p className="font-bold text-lg">{nicho.nome}</p>
                <p className="text-xs text-white/60 mt-1">10 fases</p>
              </motion.button>
            ))}
          </div>
        </GlassCard>
      </div>
    )
  }

  if (estado === 'game_over') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 text-white">
        <GlassCard className="max-w-md w-full text-center space-y-6">
          <div className="text-7xl">💀</div>
          <h2 className="text-4xl font-black">Game Over</h2>
          <p className="text-xl">Você fez <span className="font-bold text-yellow-400">{pontos}</span> pontos</p>
          <div className="flex gap-3">
            <button onClick={resetarJogo} className="glass-btn flex-1">Menu</button>
            <button onClick={() => setEstado('selecao_nicho')} className="glass-btn flex-1">Tentar Outro</button>
          </div>
        </GlassCard>
      </div>
    )
  }

  if (estado === 'fase_concluida') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 text-white">
        <GlassCard className="max-w-md w-full text-center space-y-6">
          <div className="text-7xl">🏆</div>
          <h2 className="text-4xl font-black">Fase {faseId} Completa!</h2>
          <p className="text-xl">Pontos da fase: <span className="font-bold text-green-400">{pontos}</span></p>
          <div className="flex gap-3">
            <button onClick={() => setEstado('selecao_nicho')} className="glass-btn flex-1">Menu</button>
            <button onClick={proximaFase} className="glass-btn flex-1 bg-green-500/30">Próxima Fase</button>
          </div>
        </GlassCard>
      </div>
    )
  }

  if (estado === 'vitoria') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 text-white">
        <GlassCard className="max-w-md w-full text-center space-y-6">
          <div className="text-7xl">👑</div>
          <h2 className="text-4xl font-black">Zerou o Nicho!</h2>
          <p className="text-white/80">Você completou todas as 10 fases</p>
          <button onClick={() => setEstado('selecao_nicho')} className="glass-btn w-full">
            Escolher Outro Nicho
          </button>
        </GlassCard>
      </div>
    )
  }

  const pergunta = getPerguntaAtual()
  const nicho = getNichoAtual()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 pb-8 text-white">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center text-sm">
          <div className="glass rounded-xl px-4 py-2">
            <span className="font-bold text-yellow-400 text-lg">{pontos}</span> pts
          </div>
          <div className="glass rounded-xl px-4 py-2" style={{ color: nicho?.cor }}>
            <span className="text-lg">{nicho?.icone} {nicho?.nome}</span>
          </div>
          <div className="glass rounded-xl px-4 py-2">
            <span className="text-lg">❤️ {3 - erros}/3</span>
          </div>
        </div>

        <div className="glass rounded-xl px-4 py-3 text-center">
          <span className="text-lg font-semibold">Fase {faseId} - Pergunta {perguntaIndex + 1}/10</span>
        </div>

        <Timer />

        <AnimatePresence mode="wait">
          <motion.div key={pergunta?.id}>
            <GlassCard className="min-h-[200px] flex items-center p-8">
              <p className="text-2xl md:text-3xl font-bold text-center w-full">{pergunta?.texto}</p>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <AnswerInput />

        {pergunta?.dica && (
          <details className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-semibold text-lg">💡 Dica</summary>
            <p className="mt-3 text-white/80">{pergunta.dica}</p>
          </details>
        )}
      </div>
    </div>
  )
}
