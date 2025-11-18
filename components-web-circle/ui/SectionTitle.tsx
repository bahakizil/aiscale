import React from 'react'
import { Badge } from './Badge'
import { cn } from '@/lib-web-circle/utils'

export interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  eyebrow,
  title,
  description,
  className,
}) => {
  return (
    <div className={cn('section-heading', className)}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2 className="heading-lg">{title}</h2>
      {description && <p className="body-lg mx-auto max-w-3xl">{description}</p>}
    </div>
  )
}
