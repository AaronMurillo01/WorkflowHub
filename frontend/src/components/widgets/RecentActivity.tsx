import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GitCommit, 
  GitPullRequest, 
  Bug, 
  CheckCircle, 
  User, 
  Clock,
  MessageSquare
} from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'commit',
    user: 'Sarah Chen',
    action: 'pushed 3 commits to',
    target: 'feature/user-auth',
    time: '2 minutes ago',
    icon: GitCommit,
    color: 'text-blue-500'
  },
  {
    id: 2,
    type: 'pr',
    user: 'Mike Johnson',
    action: 'opened a pull request for',
    target: 'bugfix/payment-gateway',
    time: '15 minutes ago',
    icon: GitPullRequest,
    color: 'text-green-500'
  },
  {
    id: 3,
    type: 'issue',
    user: 'Alex Rivera',
    action: 'reported an issue in',
    target: 'mobile-app',
    time: '1 hour ago',
    icon: Bug,
    color: 'text-red-500'
  },
  {
    id: 4,
    type: 'review',
    user: 'Emma Wilson',
    action: 'approved pull request',
    target: 'feature/dashboard-redesign',
    time: '2 hours ago',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    id: 5,
    type: 'comment',
    user: 'David Kim',
    action: 'commented on',
    target: 'issue #142',
    time: '3 hours ago',
    icon: MessageSquare,
    color: 'text-purple-500'
  },
  {
    id: 6,
    type: 'deploy',
    user: 'System',
    action: 'deployed version 2.1.0 to',
    target: 'production',
    time: '4 hours ago',
    icon: CheckCircle,
    color: 'text-blue-500'
  }
]

const getActivityBadge = (type: string) => {
  const badges = {
    commit: { label: 'Commit', variant: 'default' as const },
    pr: { label: 'PR', variant: 'secondary' as const },
    issue: { label: 'Issue', variant: 'destructive' as const },
    review: { label: 'Review', variant: 'outline' as const },
    comment: { label: 'Comment', variant: 'outline' as const },
    deploy: { label: 'Deploy', variant: 'default' as const }
  }
  return badges[type as keyof typeof badges] || { label: 'Activity', variant: 'outline' as const }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          const badge = getActivityBadge(activity.type)
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className={`p-2 rounded-full bg-accent ${activity.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">{activity.user}</span>
                  <Badge variant={badge.variant} className="text-xs">
                    {badge.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.action} <span className="font-medium text-foreground">{activity.target}</span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}
