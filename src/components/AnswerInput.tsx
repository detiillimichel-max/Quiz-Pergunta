import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/useGameStore'
import { normalizar } from '../utils/normalizeString'

export default function AnswerInput() {
  const [resposta, setResposta] = useState('')
  const [feedback, setFeedback] = useState<'acerto' | 'erro' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { getPerguntaAtual, acertar, errar, estado } = useGameStore()

  useEffect(() => {
    inputRef.current?.focus()
    setResposta('')
    setFeedback(null)
  }, [getPerguntaAtual()?.id])

  const enviar = () => {
    if (!resposta.trim() || estado!== 'gameplay') return
    const pergunta = getPerguntaAtual()
    if (!pergunta) return

    const correto = normalizar(resposta) === normalizar(pergunta.resposta)
    setFeedback(correto? 'acerto' : 'erro')

    setTimeout(() => {
      correto? acertar() : errar()
    }, 600)
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && enviar()}
        disabled={!!feedback}
        placeholder="Digite sua resposta..."
        className="w-full glass rounded-2xl px-5 py-4 outline-none text-white placeholder:text-white/50 text-lg disabled:opacity-50"
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={enviar}
        disabled={!!feedback ||!resposta.trim()}
        className={`glass-btn w-full text-lg ${
          feedback === 'acerto'? 'bg-green-500/30' :
          feedback === 'erro'? 'bg-red-500/30' : ''
        }`}
      >
        {feedback === 'acerto'? '✓ Correto!' : feedback === 'erro'? '✗ Errado!' : 'Responder'}
      </motion.button>
    </div>
  )
}
