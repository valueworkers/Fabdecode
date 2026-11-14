import { motion } from 'framer-motion'

const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } }

export default function StaggerItem({ as = 'div', ...props }) {
  const Tag = motion[as]
  return <Tag variants={item} {...props} />
}
