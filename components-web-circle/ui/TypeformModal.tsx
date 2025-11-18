'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface TypeformModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TypeformModal: React.FC<TypeformModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative h-[90vh] w-full max-w-4xl rounded-2xl bg-gray-900 p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="h-full w-full rounded-xl overflow-hidden">
          <iframe
            src="https://forms.gle/your-form-id"
            className="h-full w-full border-0"
            title="Application Form"
          />
        </div>
      </div>
    </div>
  )
}
