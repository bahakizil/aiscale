'use client'

import React, { useState } from 'react'
import { Button, ButtonProps } from './Button'

interface CheckoutButtonProps extends Omit<ButtonProps, 'onClick'> {
  children: React.ReactNode
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ children, ...props }) => {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const { url, error } = await response.json()

      if (error) {
        alert('Bir hata oluştu: ' + error)
        return
      }

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button {...props} onClick={handleCheckout} disabled={loading}>
      {loading ? 'Yönlendiriliyor...' : children}
    </Button>
  )
}
