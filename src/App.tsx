import { AnimatePresence } from 'framer-motion'
import Apresentacao from './views/Apresentacao'
import GameBoard from './views/GameBoard'
import { useGameStore } from './store/useGameStore'

export default function App() {
  const { estado } = useGameStore()

  return (
    <AnimatePresence mode="wait">
      {estado === 'apresentacao'? <Apresentacao key="home" /> : <GameBoard key="game" />}
    </AnimatePresence>
  )
}
