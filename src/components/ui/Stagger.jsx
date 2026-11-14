import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function Stagger({ as = 'div', ...props }) {
  const Tag = motion[as]
  return (
    <Tag variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} {...props} />
  )
}
