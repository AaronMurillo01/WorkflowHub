import { motion } from 'framer-motion'
import { Plus, Filter, Search, Grid, List, Calendar, Users, Tag, MoreHorizontal, Star, Eye, Edit, Trash2, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ProjectCard, Project } from '@/components/ProjectCard'

// Mock data - same as dashboard but with more projects
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    status: 'In Progress',
    lastUpdated: '2 hours ago',
    teamSize: 5,
    progress: 75,
    description: 'Complete redesign of the customer-facing e-commerce platform with modern UI/UX principles.'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    status: 'Planning',
    lastUpdated: '1 day ago',
    teamSize: 8,
    progress: 25,
    description: 'Native mobile application for iOS and Android with cross-platform compatibility.'
  },
  {
    id: '3',
    name: 'API Integration Project',
    status: 'Completed',
    lastUpdated: '3 days ago',
    teamSize: 3,
    progress: 100,
    description: 'Integration of third-party APIs for payment processing and user authentication.'
  },
  {
    id: '4',
    name: 'Database Migration',
    status: 'On Hold',
    lastUpdated: '1 week ago',
    teamSize: 4,
    progress: 60,
    description: 'Migration from legacy database system to modern cloud-based solution.'
  },
  {
    id: '5',
    name: 'Security Audit',
    status: 'In Progress',
    lastUpdated: '4 hours ago',
    teamSize: 2,
    progress: 40,
    description: 'Comprehensive security audit and vulnerability assessment of all systems.'
  },
  {
    id: '6',
    name: 'Performance Optimization',
    status: 'In Progress',
    lastUpdated: '6 hours ago',
    teamSize: 6,
    progress: 85,
    description: 'Optimizing application performance and reducing load times across all platforms.'
  },
  {
    id: '7',
    name: 'User Analytics Dashboard',
    status: 'Planning',
    lastUpdated: '2 days ago',
    teamSize: 4,
    progress: 15,
    description: 'Real-time analytics dashboard for tracking user behavior and engagement metrics.'
  },
  {
    id: '8',
    name: 'Content Management System',
    status: 'In Progress',
    lastUpdated: '1 day ago',
    teamSize: 7,
    progress: 55,
    description: 'Headless CMS solution for managing content across multiple channels and platforms.'
  },
  {
    id: '9',
    name: 'Automated Testing Suite',
    status: 'Completed',
    lastUpdated: '5 days ago',
    teamSize: 3,
    progress: 100,
    description: 'Comprehensive automated testing framework for all application components.'
  }
]

export function Projects() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Project Portfolio</h2>
          <p className="text-muted-foreground text-lg">Manage and organize your project portfolio with advanced tools</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Grid className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Users className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Star className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Hold</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Tag className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, tags, or team members..."
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Tag className="h-4 w-4" />
                All Tags
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                All Teams
              </Button>
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="sm" className="rounded-r-none">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-l-none border-l">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="default" className="gap-1">
              <Users className="h-3 w-3" />
              My Projects
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3 w-3" />
              Due This Week
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Star className="h-3 w-3" />
              Favorites
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Tag className="h-3 w-3" />
              High Priority
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid with Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-border/50 hover:border-border hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Star className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Status and Team */}
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={project.status === 'Completed' ? 'default' : 'outline'}
                    className={
                      project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                      project.status === 'Completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      project.status === 'On Hold' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-purple-500/20 text-purple-400 border-purple-500/30'
                    }
                  >
                    {project.status}
                  </Badge>
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
                
                {/* Footer with Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Updated {project.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" className="w-full sm:w-auto gap-2">
          <Plus className="h-4 w-4" />
          Load More Projects
        </Button>
      </div>
    </div>
  )
}
