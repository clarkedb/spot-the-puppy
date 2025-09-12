import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, children, className = '' }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4" onClick={onClose}>
      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} />

      {/* Modal Content - Desktop centered, Mobile drawer */}
      <div
        className={`fixed right-0 bottom-0 left-0 mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-slate-800 text-white shadow-2xl md:relative md:bottom-auto md:max-h-[85vh] md:max-w-lg md:rounded-lg lg:max-w-xl ${className} `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
