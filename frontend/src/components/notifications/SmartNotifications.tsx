import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X, 
  Filter,
  Settings,
  Archive,
  MarkAsRead,
  Star,
  Clock,
  User,
  Calendar,
  MessageSquare,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckSquare,
  MoreHorizontal
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'ai_suggestion'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  title: string
  message: string
  timestamp: Date
  read: boolean
  starred: boolean
  archived: boolean
  category: 'project' | 'team' | 'system' | 'ai' | 'deadline'
  action?: {
    label: string
    onClick: () => void
  }
  aiInsight?: {
    confidence: number
    suggestion: string
    reasoning: string
  }
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'ai_suggestion',
    priority: 'high',
    title: 'AI Insight: Team Productivity',
    message: 'Your team\'s velocity has increased by 18% this week. Consider maintaining current practices and scaling successful strategies.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    read: false,
    starred: false,
    archived: false,
    category: 'ai',
    aiInsight: {
      confidence: 0.92,
      suggestion: 'Continue current practices',
      reasoning: 'Based on velocity trends and team feedback analysis'
    }
  },
  {
    id: '2',
    type: 'warning',
    priority: 'medium',
    title: 'Code Review Bottleneck',
    message: 'Code review time has increased by 40%. Consider adding more reviewers to reduce delays.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    starred: true,
    archived: false,
    category: 'project',
    action: {
      label: 'Assign Reviewers',
      onClick: () => console.log('Assign reviewers')
    }
  },
  {
    id: '3',
    type: 'success',
    priority: 'low',
    title: 'Deployment Successful',
    message: 'Version 2.1.3 has been successfully deployed to production.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: true,
    starred: false,
    archived: false,
    category: 'system'
  },
  {
    id: '4',
    type: 'error',
    priority: 'urgent',
    title: 'Build Failed',
    message: 'CI/CD pipeline failed due to test failures in authentication module.',
    timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    read: false,
    starred: false,
    archived: false,
    category: 'system',
    action: {
      label: 'View Details',
      onClick: () => console.log('View build details')
    }
  },
  {
    id: '5',
    type: 'info',
    priority: 'medium',
    title: 'Team Meeting Reminder',
    message: 'Sprint planning meeting starts in 15 minutes.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    read: true,
    starred: false,
    archived: false,
    category: 'team',
    action: {
      label: 'Join Meeting',
      onClick: () => console.log('Join meeting')
    }
  },
  {
    id: '6',
    type: 'ai_suggestion',
    priority: 'medium',
    title: 'AI Recommendation: Code Quality',
    message: 'Your code quality score is excellent (94.2%). Consider implementing automated testing for new features.',
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    read: false,
    starred: false,
    archived: false,
    category: 'ai',
    aiInsight: {
      confidence: 0.87,
      suggestion: 'Implement automated testing',
      reasoning: 'High code quality with room for improvement in test coverage'
    }
  },
  {
    id: '7',
    type: 'warning',
    priority: 'high',
    title: 'Deadline Approaching',
    message: 'Project "E-commerce Platform" deadline is in 3 days. 75% complete.',
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    read: false,
    starred: true,
    archived: false,
    category: 'deadline',
    action: {
      label: 'View Project',
      onClick: () => console.log('View project')
    }
  },
  {
    id: '8',
    type: 'info',
    priority: 'low',
    title: 'New Team Member',
    message: 'Emma Wilson has joined the project team.',
    timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
    read: true,
    starred: false,
    archived: false,
    category: 'team'
  }
]

const notificationIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertTriangle,
  ai_suggestion: Zap
}

const priorityColors = {
  low: 'text-gray-500',
  medium: 'text-blue-500',
  high: 'text-orange-500',
  urgent: 'text-red-500'
}

const typeColors = {
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  success: 'bg-green-500/20 text-green-400 border-green-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  error: 'bg-red-500/20 text-red-400 border-red-500/30',
  ai_suggestion: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
}

export function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred' | 'ai'>('all')
  const [showArchived, setShowArchived] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length
  const starredCount = notifications.filter(n => n.starred).length

  const filteredNotifications = notifications.filter(notification => {
    if (notification.archived && !showArchived) return false
    
    switch (filter) {
      case 'unread':
        return !notification.read
      case 'starred':
        return notification.starred
      case 'ai':
        return notification.type === 'ai_suggestion'
      default:
        return true
    }
  })

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const toggleStar = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, starred: !n.starred } : n
    ))
  }

  const archiveNotification = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, archived: true } : n
    ))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'project': return TrendingUp
      case 'team': return User
      case 'system': return Settings
      case 'ai': return Zap
      case 'deadline': return Calendar
      default: return MessageSquare
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="h-6 w-6 text-foreground" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-xs text-white font-bold">{unreadCount}</span>
              </motion.div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Smart Notifications</h2>
            <p className="text-muted-foreground">AI-powered insights and intelligent alerts</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <MarkAsRead className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground">Filter:</span>
            {[
              { value: 'all', label: 'All', count: notifications.length },
              { value: 'unread', label: 'Unread', count: unreadCount },
              { value: 'starred', label: 'Starred', count: starredCount },
              { value: 'ai', label: 'AI Insights', count: notifications.filter(n => n.type === 'ai_suggestion').length }
            ].map((filterOption) => (
              <Button
                key={filterOption.value}
                variant={filter === filterOption.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption.value as any)}
                className="gap-2"
              >
                {filterOption.label}
                <Badge variant="secondary" className="ml-1">
                  {filterOption.count}
                </Badge>
              </Button>
            ))}
            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowArchived(!showArchived)}
              >
                <Archive className="h-4 w-4 mr-2" />
                {showArchived ? 'Hide' : 'Show'} Archived
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredNotifications.map((notification, index) => {
            const Icon = notificationIcons[notification.type]
            const CategoryIcon = getCategoryIcon(notification.category)
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={cn(
                  "group relative",
                  !notification.read && "bg-primary/5 border-l-4 border-l-primary"
                )}
              >
                <Card className={cn(
                  "transition-all duration-200 hover:shadow-md",
                  !notification.read && "border-primary/20"
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          typeColors[notification.type]
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={cn(
                                "font-semibold text-foreground",
                                !notification.read && "font-bold"
                              )}>
                                {notification.title}
                              </h4>
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs", priorityColors[notification.priority])}
                              >
                                {notification.priority}
                              </Badge>
                              {notification.starred && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            
                            {/* AI Insight */}
                            {notification.aiInsight && (
                              <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg mb-2">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Zap className="h-4 w-4 text-purple-500" />
                                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                    AI Suggestion
                                  </span>
                                  <Badge variant="secondary" className="text-xs">
                                    {Math.round(notification.aiInsight.confidence * 100)}% confidence
                                  </Badge>
                                </div>
                                <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">
                                  💡 {notification.aiInsight.suggestion}
                                </p>
                                <p className="text-xs text-purple-500 dark:text-purple-500">
                                  {notification.aiInsight.reasoning}
                                </p>
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <CategoryIcon className="h-3 w-3" />
                                <span className="capitalize">{notification.category}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{getTimeAgo(notification.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleStar(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Star className={cn(
                                "h-4 w-4",
                                notification.starred ? "text-yellow-500 fill-current" : "text-muted-foreground"
                              )} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <CheckSquare className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => archiveNotification(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Archive className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        {notification.action && (
                          <div className="mt-3">
                            <Button
                              size="sm"
                              onClick={notification.action.onClick}
                              className="gap-2"
                            >
                              {notification.action.label}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
        
        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === 'all' ? 'You\'re all caught up!' : `No ${filter} notifications found.`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
