import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Plus,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Settings,
  MessageSquare,
  Upload,
  Download,
  Share2,
} from 'lucide-react'

const quickActions = [
  {
    title: 'New Project',
    description: 'Create a new project',
    icon: Plus,
    color: 'bg-blue-500',
    action: () => console.log('New Project'),
  },
  {
    title: 'Add Task',
    description: 'Create a new task',
    icon: FileText,
    color: 'bg-green-500',
    action: () => console.log('Add Task'),
  },
  {
    title: 'Schedule Meeting',
    description: 'Book a team meeting',
    icon: Calendar,
    color: 'bg-purple-500',
    action: () => console.log('Schedule Meeting'),
  },
  {
    title: 'Invite Team',
    description: 'Add team members',
    icon: Users,
    color: 'bg-orange-500',
    action: () => console.log('Invite Team'),
  },
  {
    title: 'Generate Report',
    description: 'Create analytics report',
    icon: BarChart3,
    color: 'bg-pink-500',
    action: () => console.log('Generate Report'),
  },
  {
    title: 'Quick Settings',
    description: 'Access settings',
    icon: Settings,
    color: 'bg-indigo-500',
    action: () => console.log('Quick Settings'),
  },
]

const recentActions = [
  { title: 'Uploaded project files', time: '2 min ago', icon: Upload },
  { title: 'Shared project with team', time: '15 min ago', icon: Share2 },
  { title: 'Downloaded report', time: '1 hour ago', icon: Download },
  { title: 'Posted team message', time: '2 hours ago', icon: MessageSquare },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all duration-200"
                  onClick={action.action}
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">
                      {action.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              </motion.div>
            )
          })}
        </div>

        {/* Recent Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            Recent Actions
          </h4>
          <div className="space-y-2">
            {recentActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="p-1.5 bg-accent rounded-lg">
                    <Icon className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{action.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {action.time}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
