import { motion } from 'framer-motion'
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Zap,
  Moon,
  Sun,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border-b border-border px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, tasks, or team members..."
              className="pl-10 w-80"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs bg-muted rounded">⌘K</kbd>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Zap className="h-4 w-4" />
              Quick Add
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 p-1 rounded-lg hover:bg-accent transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                JD
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-foreground">
                  John Doe
                </div>
                <div className="text-xs text-muted-foreground">
                  Project Manager
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
