import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BreadcrumbItem {
  label: string
  path: string
  icon?: any
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  onNavigate: (path: string) => void
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate('/')}
        className="h-8 px-2 hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const ItemIcon = item.icon

        return (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="flex items-center space-x-1"
          >
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="flex items-center space-x-1 font-medium text-foreground">
                {ItemIcon && <ItemIcon className="h-4 w-4" />}
                <span>{item.label}</span>
              </span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate(item.path)}
                className="h-8 px-2 hover:text-foreground transition-colors"
              >
                {ItemIcon && <ItemIcon className="h-4 w-4 mr-1" />}
                {item.label}
              </Button>
            )}
          </motion.div>
        )
      })}
    </nav>
  )
}
