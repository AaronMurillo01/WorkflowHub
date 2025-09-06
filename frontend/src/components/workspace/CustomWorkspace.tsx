import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Layout, 
  Plus, 
  Settings, 
  Save, 
  RotateCcw,
  Grid3X3,
  List,
  Maximize2,
  Minimize2,
  X,
  GripVertical,
  Eye,
  EyeOff
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Widget {
  id: string
  type: 'chart' | 'metric' | 'calendar' | 'tasks' | 'notes' | 'team' | 'activity'
  title: string
  position: { x: number; y: number; w: number; h: number }
  visible: boolean
  config: Record<string, any>
}

interface Workspace {
  id: string
  name: string
  widgets: Widget[]
  layout: 'grid' | 'list' | 'custom'
  isDefault: boolean
}

const availableWidgets = [
  {
    type: 'chart',
    title: 'Activity Chart',
    description: 'Visualize team activity and progress',
    icon: '📊',
    defaultSize: { w: 2, h: 2 }
  },
  {
    type: 'metric',
    title: 'Key Metrics',
    description: 'Display important project metrics',
    icon: '📈',
    defaultSize: { w: 1, h: 1 }
  },
  {
    type: 'calendar',
    title: 'Calendar',
    description: 'View upcoming events and deadlines',
    icon: '📅',
    defaultSize: { w: 2, h: 2 }
  },
  {
    type: 'tasks',
    title: 'Task List',
    description: 'Manage your daily tasks',
    icon: '✅',
    defaultSize: { w: 1, h: 2 }
  },
  {
    type: 'notes',
    title: 'Quick Notes',
    description: 'Jot down ideas and reminders',
    icon: '📝',
    defaultSize: { w: 1, h: 1 }
  },
  {
    type: 'team',
    title: 'Team Status',
    description: 'See who\'s online and what they\'re working on',
    icon: '👥',
    defaultSize: { w: 1, h: 1 }
  },
  {
    type: 'activity',
    title: 'Recent Activity',
    description: 'Latest updates and changes',
    icon: '🔄',
    defaultSize: { w: 2, h: 1 }
  }
]

const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'My Dashboard',
    layout: 'grid',
    isDefault: true,
    widgets: [
      {
        id: 'w1',
        type: 'chart',
        title: 'Project Progress',
        position: { x: 0, y: 0, w: 2, h: 2 },
        visible: true,
        config: { chartType: 'line', dataSource: 'projects' }
      },
      {
        id: 'w2',
        type: 'metric',
        title: 'Team Velocity',
        position: { x: 2, y: 0, w: 1, h: 1 },
        visible: true,
        config: { value: 42, change: 18 }
      },
      {
        id: 'w3',
        type: 'tasks',
        title: 'My Tasks',
        position: { x: 3, y: 0, w: 1, h: 2 },
        visible: true,
        config: { filter: 'assigned' }
      },
      {
        id: 'w4',
        type: 'team',
        title: 'Team Status',
        position: { x: 0, y: 2, w: 1, h: 1 },
        visible: true,
        config: { showOnline: true }
      },
      {
        id: 'w5',
        type: 'activity',
        title: 'Recent Activity',
        position: { x: 1, y: 2, w: 2, h: 1 },
        visible: true,
        config: { limit: 5 }
      }
    ]
  },
  {
    id: '2',
    name: 'Project Focus',
    layout: 'grid',
    isDefault: false,
    widgets: [
      {
        id: 'w6',
        type: 'chart',
        title: 'Sprint Burndown',
        position: { x: 0, y: 0, w: 3, h: 2 },
        visible: true,
        config: { chartType: 'burndown' }
      },
      {
        id: 'w7',
        type: 'calendar',
        title: 'Project Timeline',
        position: { x: 0, y: 2, w: 2, h: 2 },
        visible: true,
        config: { view: 'month' }
      },
      {
        id: 'w8',
        type: 'notes',
        title: 'Project Notes',
        position: { x: 2, y: 2, w: 1, h: 2 },
        visible: true,
        config: { projectId: 'current' }
      }
    ]
  }
]

export function CustomWorkspace() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces)
  const [currentWorkspace, setCurrentWorkspace] = useState(workspaces[0])
  const [showWidgetPanel, setShowWidgetPanel] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [draggedWidget, setDraggedWidget] = useState<Widget | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  const addWidget = useCallback((widgetType: string) => {
    const widgetTemplate = availableWidgets.find(w => w.type === widgetType)
    if (!widgetTemplate) return

    const newWidget: Widget = {
      id: `w${Date.now()}`,
      type: widgetType as any,
      title: widgetTemplate.title,
      position: { 
        x: 0, 
        y: 0, 
        w: widgetTemplate.defaultSize.w, 
        h: widgetTemplate.defaultSize.h 
      },
      visible: true,
      config: {}
    }

    setCurrentWorkspace(prev => ({
      ...prev,
      widgets: [...prev.widgets, newWidget]
    }))
    setShowWidgetPanel(false)
  }, [])

  const removeWidget = useCallback((widgetId: string) => {
    setCurrentWorkspace(prev => ({
      ...prev,
      widgets: prev.widgets.filter(w => w.id !== widgetId)
    }))
  }, [])

  const toggleWidgetVisibility = useCallback((widgetId: string) => {
    setCurrentWorkspace(prev => ({
      ...prev,
      widgets: prev.widgets.map(w => 
        w.id === widgetId ? { ...w, visible: !w.visible } : w
      )
    }))
  }, [])

  const updateWidgetPosition = useCallback((widgetId: string, position: { x: number; y: number; w: number; h: number }) => {
    setCurrentWorkspace(prev => ({
      ...prev,
      widgets: prev.widgets.map(w => 
        w.id === widgetId ? { ...w, position } : w
      )
    }))
  }, [])

  const saveWorkspace = useCallback(() => {
    setWorkspaces(prev => prev.map(w => 
      w.id === currentWorkspace.id ? currentWorkspace : w
    ))
    setIsEditing(false)
  }, [currentWorkspace])

  const resetWorkspace = useCallback(() => {
    const original = workspaces.find(w => w.id === currentWorkspace.id)
    if (original) {
      setCurrentWorkspace(original)
    }
    setIsEditing(false)
  }, [currentWorkspace.id, workspaces])

  const createNewWorkspace = useCallback(() => {
    const newWorkspace: Workspace = {
      id: `ws${Date.now()}`,
      name: 'New Workspace',
      layout: 'grid',
      isDefault: false,
      widgets: []
    }
    setWorkspaces(prev => [...prev, newWorkspace])
    setCurrentWorkspace(newWorkspace)
    setIsEditing(true)
  }, [])

  const renderWidget = (widget: Widget) => {
    if (!widget.visible) return null

    const widgetContent = () => {
      switch (widget.type) {
        case 'chart':
          return (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-sm font-medium text-foreground">{widget.title}</p>
                <p className="text-xs text-muted-foreground">Interactive chart</p>
              </div>
            </div>
          )
        case 'metric':
          return (
            <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
              <div className="text-3xl font-bold text-foreground mb-1">42</div>
              <p className="text-sm font-medium text-foreground">{widget.title}</p>
              <p className="text-xs text-green-600 dark:text-green-400">+18% this week</p>
            </div>
          )
        case 'calendar':
          return (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-2">📅</div>
                <p className="text-sm font-medium text-foreground">{widget.title}</p>
                <p className="text-xs text-muted-foreground">Calendar view</p>
              </div>
            </div>
          )
        case 'tasks':
          return (
            <div className="h-full p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-2xl mb-1">✅</div>
                <p className="text-sm font-medium text-foreground">{widget.title}</p>
              </div>
              <div className="space-y-2">
                {['Review code', 'Update docs', 'Fix bug'].map((task, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        case 'notes':
          return (
            <div className="h-full p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-2xl mb-1">📝</div>
                <p className="text-sm font-medium text-foreground">{widget.title}</p>
              </div>
              <textarea 
                className="w-full h-20 text-xs bg-transparent border-none resize-none focus:outline-none"
                placeholder="Quick notes..."
                defaultValue="Remember to update the API docs"
              />
            </div>
          )
        case 'team':
          return (
            <div className="h-full p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-2xl mb-1">👥</div>
                <p className="text-sm font-medium text-foreground">{widget.title}</p>
              </div>
              <div className="space-y-2">
                {['Sarah', 'Mike', 'Alex'].map((name, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        case 'activity':
          return (
            <div className="h-full p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-2xl mb-1">🔄</div>
                <p className="text-sm font-medium text-foreground">{widget.title}</p>
              </div>
              <div className="space-y-2">
                {['Code pushed', 'PR merged', 'Deploy completed'].map((activity, i) => (
                  <div key={i} className="text-xs text-foreground">
                    {activity}
                  </div>
                ))}
              </div>
            </div>
          )
        default:
          return <div>Unknown widget</div>
      }
    }

    return (
      <motion.div
        key={widget.id}
        className={cn(
          "relative group",
          isEditing && "cursor-move"
        )}
        style={{
          gridColumn: `span ${widget.position.w}`,
          gridRow: `span ${widget.position.h}`
        }}
        drag={isEditing}
        dragMomentum={false}
        onDragStart={() => setDraggedWidget(widget)}
        onDragEnd={(_, info) => {
          // Calculate new position based on drag
          const newPosition = {
            ...widget.position,
            x: Math.round(info.point.x / 50),
            y: Math.round(info.point.y / 50)
          }
          updateWidgetPosition(widget.id, newPosition)
          setDraggedWidget(null)
        }}
        whileDrag={{ scale: 1.05, zIndex: 1000 }}
      >
        <Card className="h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeWidget(widget.id)}
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleWidgetVisibility(widget.id)}
                  className="h-6 w-6 p-0"
                >
                  <Eye className="h-3 w-3" />
                </Button>
                {isEditing && (
                  <div className="cursor-grab">
                    <GripVertical className="h-3 w-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2 h-full">
            {widgetContent()}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Custom Workspace</h2>
          <p className="text-muted-foreground">Personalize your dashboard with drag-and-drop widgets</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowWidgetPanel(!showWidgetPanel)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Widget
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Layout
              </>
            ) : (
              <>
                <Layout className="h-4 w-4 mr-2" />
                Edit Layout
              </>
            )}
          </Button>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetWorkspace}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Workspace Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">Workspace:</span>
            {workspaces.map((workspace) => (
              <Button
                key={workspace.id}
                variant={currentWorkspace.id === workspace.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentWorkspace(workspace)}
                className="gap-2"
              >
                {workspace.name}
                {workspace.isDefault && (
                  <Badge variant="secondary" className="text-xs">Default</Badge>
                )}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={createNewWorkspace}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Widget Panel */}
      <AnimatePresence>
        {showWidgetPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Available Widgets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availableWidgets.map((widget) => (
                    <Button
                      key={widget.type}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                      onClick={() => addWidget(widget.type)}
                    >
                      <div className="text-2xl">{widget.icon}</div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{widget.title}</div>
                        <div className="text-xs text-muted-foreground">{widget.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workspace Grid */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-foreground">{currentWorkspace.name}</h3>
              <Badge variant="outline">
                {currentWorkspace.widgets.filter(w => w.visible).length} widgets
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div 
            className={cn(
              "grid gap-4 min-h-[400px]",
              isEditing ? "grid-cols-4" : "grid-cols-4"
            )}
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridAutoRows: '100px'
            }}
          >
            {currentWorkspace.widgets.map(renderWidget)}
          </div>
          
          {currentWorkspace.widgets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Layout className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No widgets yet</h3>
              <p className="text-muted-foreground mb-4">
                Add widgets to customize your workspace
              </p>
              <Button onClick={() => setShowWidgetPanel(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Widget
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
