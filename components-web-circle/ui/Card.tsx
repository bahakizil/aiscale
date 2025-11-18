import React from 'react'
import { cn } from '@/lib-web-circle/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'glow'
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'glass',
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        {
          'glass-card': variant === 'glass',
          'glow-card': variant === 'glow',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
