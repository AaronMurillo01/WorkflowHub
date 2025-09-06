import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  Menu,
  ChevronLeft,
  BarChart3,
  Bell,
  Layout,
  Timer,
  Users,
  Zap,
  Target,
  TrendingUp,
  Search,
  Command,
  ArrowRight,
  Keyboard,
  Star,
  Clock,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SidebarProps {
  currentPath: string
  onNavigate: (path: string) => void
}

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, badge: null, shortcut: '⌘1', category: 'main' },
  { path: '/projects', label: 'Projects', icon: FolderOpen, badge: null, shortcut: '⌘2', category: 'main' },
  { path: '/analytics', label: 'Analytics', icon: BarChart3, badge: 'AI', shortcut: '⌘3', category: 'main' },
  { path: '/notifications', label: 'Notifications', icon: Bell, badge: '3', shortcut: '⌘4', category: 'main' },
  { path: '/workspace', label: 'Workspace', icon: Layout, badge: 'New', shortcut: '⌘5', category: 'workspace' },
  { path: '/time-tracker', label: 'Time Tracker', icon: Timer, badge: null, shortcut: '⌘6', category: 'workspace' },
  {
    path: '/collaboration',
    label: 'Collaboration',
    icon: Users,
    badge: 'Live',
    shortcut: '⌘7',
    category: 'workspace'
  },
  { path: '/profile', label: 'Profile', icon: User, badge: null, shortcut: '⌘U', category: 'system' },
  { path: '/settings', label: 'Settings', icon: Settings, badge: null, shortcut: '⌘,', category: 'system' },
]

const quickActions = [
  { icon: Zap, label: 'AI Assistant', description: 'Get instant help', shortcut: '⌘K' },
  { icon: Target, label: 'Quick Goals', description: 'Set daily targets', shortcut: '⌘G' },
  { icon: TrendingUp, label: 'Performance', description: 'View insights', shortcut: '⌘P' },
]

const recentItems = [
  { icon: Clock, label: 'Recent Project Alpha', path: '/projects/alpha' },
  { icon: Star, label: 'Favorite Dashboard', path: '/analytics/main' },
  { icon: Clock, label: 'Team Meeting Notes', path: '/collaboration/meeting-1' },
]

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filter navigation items based on search
  const filteredItems = navigationItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault()
            setShowSearch(true)
            setTimeout(() => searchInputRef.current?.focus(), 100)
            break
          case 'b':
            e.preventDefault()
            setIsCollapsed(!isCollapsed)
            break
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
            e.preventDefault()
            const index = parseInt(e.key) - 1
            if (navigationItems[index]) {
              onNavigate(navigationItems[index].path)
            }
            break
          case ',':
            e.preventDefault()
            onNavigate('/settings')
            break
          case 'u':
            e.preventDefault()
            onNavigate('/profile')
            break
        }
      }
      if (e.key === 'Escape') {
        setShowSearch(false)
        setSearchQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCollapsed, onNavigate])

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-full bg-card border-r border-border flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-lg">
                    Z
                  </span>
                </div>
                <h1 className="text-xl font-semibold text-foreground">
                  Zenith
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center space-x-2">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowSearch(true)
                      setTimeout(() => searchInputRef.current?.focus(), 100)
                    }}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    title="Search (⌘K)"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8"
              title={isCollapsed ? 'Expand sidebar (⌘B)' : 'Collapse sidebar (⌘B)'}
            >
              {isCollapsed ? (
                <Menu className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && !isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  placeholder="Search navigation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setShowSearch(false)
                      setSearchQuery('')
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowSearch(false)
                    setSearchQuery('')
                  }}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                >
                  <Command className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h4
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2"
              >
                Main
              </motion.h4>
            )}
          </AnimatePresence>
          
          {(searchQuery ? filteredItems : navigationItems.filter(item => item.category === 'main')).map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path

            return (
              <motion.button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group relative',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
                whileHover={{ scale: 1.01, x: 2 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <div className="flex items-center space-x-3">
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center space-x-2"
                    >
                      {item.badge && (
                        <Badge
                          variant={
                            item.badge === 'AI'
                              ? 'default'
                              : item.badge === 'Live'
                                ? 'destructive'
                                : 'secondary'
                          }
                          className="text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground font-mono opacity-60">
                        {item.shortcut}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary-foreground rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Workspace Section */}
        {!searchQuery && (
          <div className="space-y-1 mt-6">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.h4
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2"
                >
                  Workspace
                </motion.h4>
              )}
            </AnimatePresence>
            
            {navigationItems.filter(item => item.category === 'workspace').map((item) => {
              const Icon = item.icon
              const isActive = currentPath === item.path

              return (
                <motion.button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group relative',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={cn(
                      "h-5 w-5 flex-shrink-0 transition-colors",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center space-x-2"
                      >
                        {item.badge && (
                          <Badge
                            variant={
                              item.badge === 'AI'
                                ? 'default'
                                : item.badge === 'Live'
                                  ? 'destructive'
                                  : 'secondary'
                            }
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground font-mono opacity-60">
                          {item.shortcut}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary-foreground rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        )}

        {/* Recent Items */}
        {!searchQuery && !isCollapsed && (
          <div className="space-y-1 mt-6">
            <motion.h4
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2"
            >
              Recent
            </motion.h4>
            
            {recentItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent/30 group"
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-4 w-4 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm truncate">{item.label}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity ml-auto" />
                </motion.button>
              )
            })}
          </div>
        )}
      </nav>

      {/* Quick Actions */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4"
          >
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                Quick Actions
              </h4>
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-accent/50 group border border-transparent hover:border-border/50"
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-200 shadow-sm">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {action.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                        {action.shortcut}
                      </span>
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 bg-background/50">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {/* Keyboard Shortcuts Hint */}
              <div className="flex items-center justify-between px-2 py-1.5 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center space-x-2">
                  <Keyboard className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Shortcuts</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 text-xs font-mono bg-background border border-border/50 rounded text-muted-foreground">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 text-xs font-mono bg-background border border-border/50 rounded text-muted-foreground">K</kbd>
                </div>
              </div>
              
              {/* Version */}
              <div className="text-xs text-muted-foreground text-center opacity-60">
                Zenith Dashboard v1.0.0
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Collapsed Footer */}
        {isCollapsed && (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowSearch(true)
                setTimeout(() => searchInputRef.current?.focus(), 100)
              }}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title="Search (⌘K)"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.aside>
  )
}
