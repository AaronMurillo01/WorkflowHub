import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Breadcrumbs } from '../navigation/Breadcrumbs'
import { UserProfile } from '../profile/UserProfile'
import { ProjectCreationForm } from '../projects/ProjectCreationForm'
import {
  BarChart3,
  FolderOpen,
  Settings,
  Users,
  Bell,
  Clock,
  User,
  Plus,
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
  subtitle?: string
}

interface Project {
  id: string
  name: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  startDate: string
  endDate: string
  budget: string
  teamSize: string
  tags: string[]
  objectives: string[]
  requirements: string
  status: 'planning' | 'active' | 'on-hold' | 'completed'
  createdAt: string
}

// Page Components
const DashboardPage = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
        <p className="text-3xl font-bold text-primary">24</p>
      </div>
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2">Active Tasks</h3>
        <p className="text-3xl font-bold text-blue-500">156</p>
      </div>
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2">Team Members</h3>
        <p className="text-3xl font-bold text-green-500">12</p>
      </div>
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
        <p className="text-3xl font-bold text-orange-500">87%</p>
      </div>
    </div>
  </div>
)

// ProjectsPage moved inside Layout component

const AnalyticsPage = () => (
  <div className="space-y-6">
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">Analytics Overview</h3>
      <p className="text-muted-foreground">
        Performance metrics and insights will be displayed here.
      </p>
    </div>
  </div>
)

const NotificationsPage = () => (
  <div className="space-y-6">
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">Notifications</h3>
      <div className="space-y-3">
        {[
          'New project assigned',
          'Task deadline approaching',
          'Team member joined',
          'System update available',
        ].map((notification, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
          >
            <Bell className="h-4 w-4 text-primary" />
            <span>{notification}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const WorkspacePage = () => (
  <div className="space-y-6">
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">Workspace</h3>
      <p className="text-muted-foreground">
        Collaborative workspace features coming soon.
      </p>
    </div>
  </div>
)

const TimeTrackerPage = () => (
  <div className="space-y-6">
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">Time Tracker</h3>
      <p className="text-muted-foreground">Track your time and productivity.</p>
    </div>
  </div>
)

const CollaborationPage = () => (
  <div className="space-y-6">
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
      <p className="text-muted-foreground">Real-time collaboration tools.</p>
    </div>
  </div>
)

// SettingsPage moved inside Layout component

export function Layout({ children, subtitle }: LayoutProps) {
  const [currentPath, setCurrentPath] = useState('/')
  const [showProfile, setShowProfile] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])

  // Page Components with access to state
  const ProjectsPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects and track progress.
          </p>
        </div>
        <button
          onClick={() => setShowProjectForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first project to get started
          </p>
          <button
            onClick={() => setShowProjectForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mx-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Create Project</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project) => (
            <div
              key={project.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{project.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    project.priority === 'urgent'
                      ? 'bg-red-100 text-red-800'
                      : project.priority === 'high'
                        ? 'bg-orange-100 text-orange-800'
                        : project.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                  }`}
                >
                  {project.priority}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{project.category}</span>
                <span
                  className={`px-2 py-1 rounded-full ${
                    project.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'planning'
                        ? 'bg-blue-100 text-blue-800'
                        : project.status === 'on-hold'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const SettingsPage = () => (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Profile Management</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your user profile and personal information
        </p>
        <button
          onClick={() => setShowProfile(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <User className="h-4 w-4" />
          <span>Edit Profile</span>
        </button>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Application Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Configure your application settings and preferences.
        </p>
      </div>
    </div>
  )

  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    // Handle special navigation cases
    if (path === '/profile') {
      setShowProfile(true)
    } else if (path === '/projects/new') {
      setShowProjectForm(true)
    }
  }

  const handleProfileClose = () => {
    setShowProfile(false)
    setCurrentPath('/dashboard')
  }

  const handleProjectFormSubmit = (projectData: any) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setProjects((prev) => [...prev, newProject])
    setShowProjectForm(false)
    setCurrentPath('/projects')
  }

  const handleProjectFormCancel = () => {
    setShowProjectForm(false)
    setCurrentPath('/projects')
  }

  const renderPageContent = () => {
    switch (currentPath) {
      case '/':
      case '/dashboard':
        return <DashboardPage />
      case '/projects':
        return <ProjectsPage />
      case '/analytics':
        return <AnalyticsPage />
      case '/notifications':
        return <NotificationsPage />
      case '/workspace':
        return <WorkspacePage />
      case '/time-tracker':
        return <TimeTrackerPage />
      case '/collaboration':
        return <CollaborationPage />
      case '/settings':
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  const getPageTitle = () => {
    switch (currentPath) {
      case '/':
      case '/dashboard':
        return 'Dashboard'
      case '/projects':
        return 'Projects'
      case '/analytics':
        return 'Analytics'
      case '/notifications':
        return 'Notifications'
      case '/workspace':
        return 'Workspace'
      case '/time-tracker':
        return 'Time Tracker'
      case '/collaboration':
        return 'Collaboration'
      case '/settings':
        return 'Settings'
      default:
        return 'Dashboard'
    }
  }

  const getBreadcrumbItems = () => {
    const pathSegments = currentPath.split('/').filter(Boolean)
    const items = []

    // Always include Dashboard as root
    items.push({ label: 'Dashboard', path: '/', icon: BarChart3 })

    if (pathSegments.length > 0 && currentPath !== '/') {
      let currentSegmentPath = ''
      pathSegments.forEach((segment) => {
        currentSegmentPath += `/${segment}`

        // Map segments to appropriate icons
        let icon = BarChart3
        let label = segment.charAt(0).toUpperCase() + segment.slice(1)

        switch (segment) {
          case 'projects':
            icon = FolderOpen
            break
          case 'analytics':
            icon = BarChart3
            break
          case 'notifications':
            icon = Bell
            break
          case 'workspace':
            icon = Users
            break
          case 'time-tracker':
            icon = Clock
            label = 'Time Tracker'
            break
          case 'collaboration':
            icon = Users
            break
          case 'settings':
            icon = Settings
            break
          case 'profile':
            icon = User
            break
          case 'new':
            icon = Plus
            break
          default:
            icon = BarChart3
        }

        items.push({
          label,
          path: currentSegmentPath,
          icon,
        })
      })
    }

    return items
  }

  return (
    <div className="h-screen bg-background flex">
      <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} subtitle={subtitle} />

        <motion.main
          className="flex-1 overflow-auto bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            {/* Breadcrumbs */}
            <div className="mb-6">
              <Breadcrumbs
                items={getBreadcrumbItems()}
                onNavigate={handleNavigate}
              />
            </div>

            {/* Page Content with Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPath}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {children || renderPageContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.main>

        {/* Profile Modal */}
        <UserProfile isOpen={showProfile} onClose={handleProfileClose} />

        {/* Project Creation Modal */}
        <ProjectCreationForm
          isOpen={showProjectForm}
          onSubmit={handleProjectFormSubmit}
          onCancel={handleProjectFormCancel}
        />
      </div>
    </div>
  )
}
