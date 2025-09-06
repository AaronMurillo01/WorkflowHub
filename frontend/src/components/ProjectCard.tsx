import { motion } from 'framer-motion'
import { Calendar, Clock, MoreVertical, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface Project {
  id: string
  name: string
  status: 'In Progress' | 'Completed' | 'On Hold' | 'Planning'
  lastUpdated: string
  teamSize: number
  progress: number
  description: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

const statusColors = {
  'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
  'On Hold': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Planning': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-border">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium border",
              statusColors[project.status]
            )}>
              {project.status}
            </span>
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="h-3 w-3 mr-1" />
              {project.teamSize}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                className="bg-primary h-2 rounded-full"
              />
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Updated {project.lastUpdated}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Due soon</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

