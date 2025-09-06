import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface HelpTooltipProps {
  title: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  trigger?: 'hover' | 'click'
  className?: string
}

export function HelpTooltip({
  title,
  content,
  position = 'top',
  size = 'md',
  trigger = 'hover',
  className = '',
}: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const showTooltip = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible)
    } else {
      setIsVisible(true)
    }
  }

  const hideTooltip = () => {
    if (trigger === 'hover' && !isHovered) {
      setIsVisible(false)
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2'
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2'
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2'
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-48 text-xs'
      case 'md':
        return 'w-64 text-sm'
      case 'lg':
        return 'w-80 text-sm'
      default:
        return 'w-64 text-sm'
    }
  }

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-border'
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-border'
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-border'
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-border'
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-border'
    }
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground transition-colors"
        onClick={trigger === 'click' ? showTooltip : undefined}
        onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
        onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
      >
        <HelpCircle className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: position === 'top' ? 10 : -10,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? 10 : -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${getPositionClasses()}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false)
              if (trigger === 'hover') {
                setTimeout(hideTooltip, 100)
              }
            }}
          >
            <Card
              className={`${getSizeClasses()} border-2 border-primary/20 shadow-lg bg-background/95 backdrop-blur-sm`}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-foreground text-sm">
                    {title}
                  </h4>
                  {trigger === 'click' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => setIsVisible(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {content}
                </p>
              </CardContent>
            </Card>

            {/* Arrow */}
            <div
              className={`absolute w-0 h-0 border-4 ${getArrowClasses()}`}
              style={{
                borderTopColor:
                  position === 'bottom' ? 'transparent' : 'hsl(var(--border))',
                borderBottomColor:
                  position === 'top' ? 'transparent' : 'hsl(var(--border))',
                borderLeftColor:
                  position === 'right' ? 'transparent' : 'hsl(var(--border))',
                borderRightColor:
                  position === 'left' ? 'transparent' : 'hsl(var(--border))',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
