import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function GlassCard({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`glass rounded-3xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}
