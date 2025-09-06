import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Phone,
  MapPin,
  Calendar
} from 'lucide-react'

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Lead Developer',
    avatar: 'SC',
    status: 'online',
    lastActive: '2 minutes ago',
    email: 'sarah.chen@company.com',
    location: 'San Francisco, CA',
    joinDate: 'Jan 2023',
    projects: 8,
    commits: 1247
  },
  {
    id: 2,
    name: 'Mike Johnson',
    role: 'Product Manager',
    avatar: 'MJ',
    status: 'away',
    lastActive: '1 hour ago',
    email: 'mike.johnson@company.com',
    location: 'New York, NY',
    joinDate: 'Mar 2023',
    projects: 12,
    commits: 892
  },
  {
    id: 3,
    name: 'Alex Rivera',
    role: 'UI/UX Designer',
    avatar: 'AR',
    status: 'online',
    lastActive: '5 minutes ago',
    email: 'alex.rivera@company.com',
    location: 'Austin, TX',
    joinDate: 'Feb 2023',
    projects: 6,
    commits: 634
  },
  {
    id: 4,
    name: 'Emma Wilson',
    role: 'DevOps Engineer',
    avatar: 'EW',
    status: 'offline',
    lastActive: '3 hours ago',
    email: 'emma.wilson@company.com',
    location: 'Seattle, WA',
    joinDate: 'Dec 2022',
    projects: 15,
    commits: 2103
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Backend Developer',
    avatar: 'DK',
    status: 'online',
    lastActive: '1 minute ago',
    email: 'david.kim@company.com',
    location: 'Los Angeles, CA',
    joinDate: 'Apr 2023',
    projects: 9,
    commits: 1456
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-500'
    case 'away': return 'bg-yellow-500'
    case 'offline': return 'bg-gray-500'
    default: return 'bg-gray-500'
  }
}

export function TeamMembers() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Team Members
          </CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-accent/50 transition-colors group"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                {member.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-foreground">{member.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {member.role}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {member.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Joined {member.joinDate}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span className="text-muted-foreground">{member.projects} projects</span>
                <span className="text-muted-foreground">{member.commits} commits</span>
                <span className="text-muted-foreground">Last active {member.lastActive}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
