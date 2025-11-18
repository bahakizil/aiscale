import React from 'react'
import { cn } from '@/lib-web-circle/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning'
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'eyebrow',
        {
          'border-primary-400/20 bg-primary-400/10 text-primary-400': variant === 'default',
          'border-secondary-400/20 bg-secondary-400/10 text-secondary-400': variant === 'success',
          'border-orange-400/20 bg-orange-400/10 text-orange-400': variant === 'warning',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
