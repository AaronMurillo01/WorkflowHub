import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Timer, 
  Target,
  TrendingUp,
  BarChart3,
  Calendar,
  Settings,
  PlayCircle,
  PauseCircle,
  StopCircle,
  RotateCcw,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  Zap,
  Coffee,
  Moon,
  Sun
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface TimeEntry {
  id: string
  project: string
  task: string
  startTime: Date
  endTime?: Date
  duration: number // in minutes
  description?: string
  tags: string[]
  isActive: boolean
}

interface Project {
  id: string
  name: string
  color: string
  totalTime: number
  isActive: boolean
}

interface ProductivityStats {
  totalTimeToday: number
  totalTimeWeek: number
  averageSessionLength: number
  focusScore: number
  breaksTaken: number
  productivityLevel: 'low' | 'medium' | 'high' | 'peak'
}

const mockProjects: Project[] = [
  { id: '1', name: 'E-commerce Platform', color: '#3B82F6', totalTime: 240, isActive: true },
  { id: '2', name: 'Mobile App', color: '#10B981', totalTime: 180, isActive: true },
  { id: '3', name: 'API Integration', color: '#F59E0B', totalTime: 120, isActive: false },
  { id: '4', name: 'Database Migration', color: '#EF4444', totalTime: 90, isActive: true },
]

const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    project: 'E-commerce Platform',
    task: 'Frontend Development',
    startTime: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    duration: 45,
    description: 'Working on user authentication UI',
    tags: ['frontend', 'react', 'ui'],
    isActive: true
  },
  {
    id: '2',
    project: 'Mobile App',
    task: 'API Integration',
    startTime: new Date(Date.now() - 1000 * 60 * 120),
    endTime: new Date(Date.now() - 1000 * 60 * 60),
    duration: 60,
    description: 'Connecting mobile app to backend APIs',
    tags: ['mobile', 'api', 'integration'],
    isActive: false
  },
  {
    id: '3',
    project: 'Database Migration',
    task: 'Data Migration Scripts',
    startTime: new Date(Date.now() - 1000 * 60 * 180),
    endTime: new Date(Date.now() - 1000 * 60 * 120),
    duration: 60,
    description: 'Writing migration scripts for user data',
    tags: ['database', 'migration', 'sql'],
    isActive: false
  }
]

const productivityLevels = {
  low: { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/20', label: 'Low Focus' },
  medium: { color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-950/20', label: 'Medium Focus' },
  high: { color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20', label: 'High Focus' },
  peak: { color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/20', label: 'Peak Performance' }
}

export function TimeTracker() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(mockTimeEntries)
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [taskDescription, setTaskDescription] = useState('')
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectColor, setNewProjectColor] = useState('#3B82F6')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const productivityStats: ProductivityStats = {
    totalTimeToday: timeEntries.reduce((total, entry) => total + entry.duration, 0),
    totalTimeWeek: timeEntries.reduce((total, entry) => total + entry.duration, 0) * 5, // Mock week data
    averageSessionLength: timeEntries.length > 0 ? timeEntries.reduce((total, entry) => total + entry.duration, 0) / timeEntries.length : 0,
    focusScore: 87,
    breaksTaken: 3,
    productivityLevel: 'high' as const
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    if (!selectedProject) return

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      project: selectedProject.name,
      task: taskDescription || 'General Work',
      startTime: new Date(),
      duration: 0,
      description: taskDescription,
      tags: [],
      isActive: true
    }

    setCurrentEntry(newEntry)
    setTimeEntries(prev => [...prev, newEntry])
    setIsRunning(true)
    setElapsedTime(0)
  }

  const pauseTimer = () => {
    setIsRunning(false)
    if (currentEntry) {
      setTimeEntries(prev => prev.map(entry => 
        entry.id === currentEntry.id 
          ? { ...entry, duration: entry.duration + elapsedTime / 60 }
          : entry
      ))
    }
  }

  const stopTimer = () => {
    setIsRunning(false)
    if (currentEntry) {
      setTimeEntries(prev => prev.map(entry => 
        entry.id === currentEntry.id 
          ? { 
              ...entry, 
              endTime: new Date(),
              duration: entry.duration + elapsedTime / 60,
              isActive: false
            }
          : entry
      ))
      setCurrentEntry(null)
      setElapsedTime(0)
    }
  }

  const addProject = () => {
    if (!newProjectName.trim()) return

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      color: newProjectColor,
      totalTime: 0,
      isActive: true
    }

    setProjects(prev => [...prev, newProject])
    setNewProjectName('')
    setShowAddProject(false)
  }

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId))
    if (selectedProject?.id === projectId) {
      setSelectedProject(projects[0])
    }
  }

  const getProductivityIcon = (level: string) => {
    switch (level) {
      case 'low': return <Coffee className="h-4 w-4" />
      case 'medium': return <Sun className="h-4 w-4" />
      case 'high': return <Zap className="h-4 w-4" />
      case 'peak': return <Target className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getProductivityAdvice = (level: string) => {
    switch (level) {
      case 'low': return 'Take a break and come back refreshed'
      case 'medium': return 'Good focus! Try to eliminate distractions'
      case 'high': return 'Excellent focus! Keep up the great work'
      case 'peak': return 'Peak performance! This is your optimal working time'
      default: return 'Start tracking your time to get insights'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Time Tracker</h2>
          <p className="text-muted-foreground">Track your productivity and optimize your workflow</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Main Timer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Active Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            {/* Timer Display */}
            <div className="space-y-2">
              <div className="text-6xl font-mono font-bold text-foreground">
                {formatTime(elapsedTime)}
              </div>
              {currentEntry && (
                <div className="text-lg text-muted-foreground">
                  {currentEntry.project} • {currentEntry.task}
                </div>
              )}
            </div>

            {/* Project Selection */}
            {!isRunning && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm font-medium text-foreground">Project:</span>
                  <div className="flex items-center space-x-2">
                    {projects.map((project) => (
                      <Button
                        key={project.id}
                        variant={selectedProject?.id === project.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                        className="gap-2"
                      >
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: project.color }}
                        />
                        {project.name}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddProject(true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="max-w-md mx-auto">
                  <Input
                    placeholder="What are you working on?"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="text-center"
                  />
                </div>
              </div>
            )}

            {/* Timer Controls */}
            <div className="flex items-center justify-center space-x-4">
              {!isRunning ? (
                <Button
                  size="lg"
                  onClick={startTimer}
                  disabled={!selectedProject}
                  className="gap-2"
                >
                  <PlayCircle className="h-5 w-5" />
                  Start Timer
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={pauseTimer}
                    className="gap-2"
                  >
                    <PauseCircle className="h-5 w-5" />
                    Pause
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={stopTimer}
                    className="gap-2"
                  >
                    <StopCircle className="h-5 w-5" />
                    Stop
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Productivity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Time</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.floor(productivityStats.totalTimeToday / 60)}h {productivityStats.totalTimeToday % 60}m
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Focus Score</p>
                <p className="text-2xl font-bold text-foreground">{productivityStats.focusScore}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Session</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.floor(productivityStats.averageSessionLength)}m
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Breaks</p>
                <p className="text-2xl font-bold text-foreground">{productivityStats.breaksTaken}</p>
              </div>
              <Coffee className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Productivity Level */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-3 rounded-full",
                productivityLevels[productivityStats.productivityLevel].bg
              )}>
                {getProductivityIcon(productivityStats.productivityLevel)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {productivityLevels[productivityStats.productivityLevel].label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getProductivityAdvice(productivityStats.productivityLevel)}
                </p>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={cn(
                "text-sm",
                productivityLevels[productivityStats.productivityLevel].color
              )}
            >
              {productivityStats.focusScore}% Focus
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Time Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Time Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: projects.find(p => p.name === entry.project)?.color || '#3B82F6'
                    }}
                  />
                  <div>
                    <p className="font-medium text-foreground">{entry.project}</p>
                    <p className="text-sm text-muted-foreground">{entry.task}</p>
                    {entry.description && (
                      <p className="text-xs text-muted-foreground">{entry.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {Math.floor(entry.duration)}m
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.startTime.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {entry.isActive && (
                      <Badge variant="default" className="text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                        Active
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddProject(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-card rounded-lg shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Add New Project</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-foreground">Color:</span>
                  {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'].map((color) => (
                    <button
                      key={color}
                      className={cn(
                        "w-8 h-8 rounded-full border-2",
                        newProjectColor === color ? "border-foreground" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewProjectColor(color)}
                    />
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddProject(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={addProject}>
                    Add Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
