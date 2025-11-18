import React from 'react'
import { cn } from '@/lib-web-circle/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('page-wrapper', className)} {...props}>
      {children}
    </div>
  )
}
