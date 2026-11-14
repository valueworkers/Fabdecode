import { motion } from 'framer-motion'

export default function Rise({ d = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: d, ease: 'easeOut' }}
      {...props}
    />
  )
}
