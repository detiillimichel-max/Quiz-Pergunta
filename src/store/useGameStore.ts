import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import banco from '../data/banco.json'

type Estado = 'apresentacao' | 'selecao_nicho' | 'gameplay' | 'game_over' | 'fase_concluida' | 'vitoria'

interface Progresso {
  fasesDesbloqueadas: Record<string, number>
  totalPontos: number
}

interface GameState {
  estado: Estado
  nichoId: string | null
  faseId: number
  perguntaIndex: number
  pontos: number
  erros: number
  tempo: number
  progresso: Progresso
  setEstado: (estado: Estado) => void
  setNicho: (id: string) => void
  proximaFase: () => void
  proximaPergunta: () => void
  acertar: () => void
  errar: () => void
  tick: () => void
  resetarJogo: () => void
  getPerguntaAtual: () => any
  getNichoAtual: () => any
  getFaseAtual: () => any
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      estado: 'apresentacao',
      nichoId: null,
      faseId: 1,
      perguntaIndex: 0,
      pontos: 0,
      erros: 0,
      tempo: 25,
      progresso: { fasesDesbloqueadas: {}, totalPontos: 0 },
      setEstado: (estado) => set({ estado }),
      setNicho: (id) => {
        const faseDesbloqueada = get().progresso.fasesDesbloqueadas[id] || 1
        const tempoInicial = faseDesbloqueada === 1? 25 : 15
        set({ nichoId: id, estado: 'gameplay', faseId: faseDesbloqueada, perguntaIndex: 0, erros: 0, tempo: tempoInicial, pontos: 0 })
      },
      proximaFase: () => {
        const { nichoId, faseId, pontos } = get()
        if (!nichoId) return
        const novaFase = faseId + 1
        const nicho = banco.nichos.find(n => n.id === nichoId)
        if (novaFase > nicho!.fases.length) {
          set({ estado: 'vitoria' })
          return
        }
        const tempoInicial = novaFase === 1? 25 : 15
        set((s) => ({
          faseId: novaFase,
          perguntaIndex: 0,
          tempo: tempoInicial,
          progresso: {
            fasesDesbloqueadas: {...s.progresso.fasesDesbloqueadas, [nichoId]: novaFase },
            totalPontos: s.progresso.totalPontos + pontos
          }
        }))
      },
      proximaPergunta: () => {
        const fase = get().getFaseAtual()
        const tempoInicial = get().faseId === 1? 25 : 15
        if (get().perguntaIndex + 1 >= fase?.perguntas.length) {
          set({ estado: 'fase_concluida' })
        } else {
          set((s) => ({ perguntaIndex: s.perguntaIndex + 1, tempo: tempoInicial }))
        }
      },
      acertar: () => {
        set((s) => ({ pontos: s.pontos + 10 }))
        get().proximaPergunta()
      },
      errar: () => {
        set((s) => {
          const novosErros = s.erros + 1
          if (novosErros >= 3) return { erros: novosErros, estado: 'game_over' }
          return { erros: novosErros }
        })
        if (get().estado === 'gameplay') get().proximaPergunta()
      },
      tick: () => {
        if (get().estado!== 'gameplay') return
        set((s) => {
          if (s.tempo <= 1) {
            get().errar()
            const tempoInicial = get().faseId === 1? 25 : 15
            return { tempo: tempoInicial }
          }
          return { tempo: s.tempo - 1 }
        })
      },
      resetarJogo: () => set({
        estado: 'apresentacao',
        nichoId: null,
        faseId: 1,
        perguntaIndex: 0,
        pontos: 0,
        erros: 0,
        tempo: 25
      }),
      getPerguntaAtual: () => {
        const { nichoId, faseId, perguntaIndex } = get()
        const nicho = banco.nichos.find(n => n.id === nichoId)
        const fase = nicho?.fases.find(f => f.id === faseId)
        return fase?.perguntas[perguntaIndex]
      },
      getNichoAtual: () => banco.nichos.find(n => n.id === get().nichoId),
      getFaseAtual: () => {
        const nicho = get().getNichoAtual()
        return nicho?.fases.find(f => f.id === get().faseId)
      }
    }),
    { name: 'Pakavra-quiz-v3' }
  )
)
