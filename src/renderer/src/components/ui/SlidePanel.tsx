import { cn } from '@/lib/utils'
import React from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface SlidePanelProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  side?: 'left' | 'right'
  width?: string
  className?: string
}

export const SlidePanel: React.FC<SlidePanelProps> = ({
  open,
  onClose,
  children,
  side = 'left',
  width = '380px',
  className
}) => {
  const isRight = side === 'right'

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30"
            onClick={onClose}
          />

          {/* 侧边栏面板 */}
          <motion.div
            initial={{ x: isRight ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRight ? '100%' : '-100%' }}
            transition={{ duration: 0.25, ease: 'easeIn' }}
            style={{ width }}
            className={cn(
              'fixed top-0 z-50 flex h-full flex-col bg-[#f0f2f5] dark:bg-neutral-800',
              isRight ? 'right-0' : 'left-0',
              className
            )}
          >
            {/* 内容区域 */}
            <div className="flex h-full flex-col overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SlidePanel
