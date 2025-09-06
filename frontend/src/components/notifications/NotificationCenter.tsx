import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Bell, 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  User,
  GitCommit
} from 'lucide-react'

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Project Completed',
    message: 'E-commerce Platform Redesign has been successfully completed and deployed.',
    time: '2 minutes ago',
    unread: true,
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Deadline Approaching',
    message: 'Mobile App Development is due in 2 days. Consider reviewing progress.',
    time: '15 minutes ago',
    unread: true,
    icon: AlertTriangle,
    color: 'text-yellow-500'
  },
  {
    id: 3,
    type: 'info',
    title: 'New Team Member',
    message: 'Sarah Chen has been added to the Security Audit project.',
    time: '1 hour ago',
    unread: true,
    icon: User,
    color: 'text-blue-500'
  },
  {
    id: 4,
    type: 'commit',
    title: 'New Commit',
    message: 'Mike Johnson pushed 3 commits to feature/user-auth branch.',
    time: '2 hours ago',
    unread: false,
    icon: GitCommit,
    color: 'text-purple-500'
  },
  {
    id: 5,
    type: 'meeting',
    title: 'Meeting Reminder',
    message: 'Sprint Planning meeting starts in 30 minutes.',
    time: '3 hours ago',
    unread: false,
    icon: Calendar,
    color: 'text-indigo-500'
  },
  {
    id: 6,
    type: 'error',
    title: 'Build Failed',
    message: 'Database Migration build failed. Check logs for details.',
    time: '4 hours ago',
    unread: false,
    icon: AlertCircle,
    color: 'text-red-500'
  }
]

export function NotificationCenter() {
  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {notifications.map((notification, index) => {
              const Icon = notification.icon
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`p-4 border-b border-border/50 hover:bg-accent/50 transition-colors ${
                    notification.unread ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-accent ${notification.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground">
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        
        <div className="p-4 border-t border-border/50">
          <Button variant="outline" className="w-full">
            View All Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
