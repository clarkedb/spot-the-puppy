import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, children, className = '' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center md:p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      />

      {/* Modal Content - Desktop centered, Mobile drawer */}
      <div
        className={`
          w-full max-w-md mx-auto
          md:max-w-lg
          lg:max-w-xl
          max-h-[90vh] md:max-h-[85vh] overflow-y-auto
          bg-slate-800 text-white shadow-2xl
          md:relative md:bottom-auto
          fixed bottom-0 left-0 right-0
          rounded-t-2xl md:rounded-lg
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
