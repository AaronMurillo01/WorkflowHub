import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpTooltip } from '@/components/ui/HelpTooltip'
import { WelcomePage } from '@/components/welcome/WelcomePage'

export function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [userName, setUserName] = useState('User')

  useEffect(() => {
    // Check if this is the user's first visit after onboarding
    const hasSeenWelcome = localStorage.getItem('zenith-welcome-seen')
    const hasCompletedOnboarding = localStorage.getItem(
      'zenith-onboarding-completed'
    )

    if (hasCompletedOnboarding && !hasSeenWelcome) {
      setShowWelcome(true)
      // Get user name from preferences if available
      const userPrefs = localStorage.getItem('zenith-user-preferences')
      if (userPrefs) {
        const prefs = JSON.parse(userPrefs)
        setUserName(prefs.userName || 'User')
      }
    }
  }, [])

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    localStorage.setItem('zenith-welcome-seen', 'true')
  }

  const handleTakeTour = () => {
    setShowWelcome(false)
    localStorage.setItem('zenith-welcome-seen', 'true')
    // Could trigger guided tour here
  }

  if (showWelcome) {
    return (
      <WelcomePage
        userName={userName}
        onGetStarted={handleWelcomeComplete}
        onTakeTour={handleTakeTour}
      />
    )
  }
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-xl p-8 border border-primary/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Here's what's happening with your projects today.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Active Tasks</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Due Today</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Total Projects</CardTitle>
              <HelpTooltip
                title="Total Projects"
                content="Track your total projects metrics and performance over time."
                size="sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-sm text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-sm text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-sm text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                Recent Projects
              </h2>
              <p className="text-muted-foreground">
                Manage and track your project progress
              </p>
            </div>
            <HelpTooltip
              title="Project Management"
              content="Create, organize, and track your projects. Use the 'New Project' button to get started with templates and guided setup."
              position="right"
              size="md"
            />
          </div>
          <Button>New Project</Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>E-commerce Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Complete redesign of the customer-facing e-commerce platform.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">In Progress</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mobile App</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Native mobile application for iOS and Android.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Planning</span>
                <span className="text-sm text-muted-foreground">25%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Integration of third-party APIs for payment processing.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completed</span>
                <span className="text-sm text-muted-foreground">100%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
