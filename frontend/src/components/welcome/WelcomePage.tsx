import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Target,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Play,
  BookOpen,
  Settings,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface WelcomePageProps {
  userName?: string
  onGetStarted: () => void
  onTakeTour: () => void
}

const quickActions = [
  {
    title: 'Create Your First Project',
    description: 'Start organizing your work with a new project',
    icon: Target,
    action: 'create-project',
    color: 'bg-blue-500/10 text-blue-600 border-blue-200',
  },
  {
    title: 'Invite Team Members',
    description: 'Collaborate with your team on projects',
    icon: Users,
    action: 'invite-team',
    color: 'bg-green-500/10 text-green-600 border-green-200',
  },
  {
    title: 'Explore Analytics',
    description: 'View insights and track your progress',
    icon: TrendingUp,
    action: 'view-analytics',
    color: 'bg-purple-500/10 text-purple-600 border-purple-200',
  },
]

const features = [
  {
    title: 'Smart Project Management',
    description:
      'Organize tasks, set deadlines, and track progress with intelligent automation.',
    icon: Target,
    status: 'ready',
  },
  {
    title: 'Team Collaboration',
    description:
      'Work together seamlessly with real-time updates and communication tools.',
    icon: Users,
    status: 'ready',
  },
  {
    title: 'Advanced Analytics',
    description: 'Get insights into your productivity and project performance.',
    icon: TrendingUp,
    status: 'ready',
  },
  {
    title: 'AI Assistant',
    description: 'Get help and suggestions from our intelligent AI assistant.',
    icon: Zap,
    status: 'beta',
  },
]

export function WelcomePage({
  userName = 'there',
  onGetStarted,
  onTakeTour,
}: WelcomePageProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showFeatures, setShowFeatures] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    const featureTimer = setTimeout(() => setShowFeatures(true), 1000)
    return () => {
      clearInterval(timer)
      clearTimeout(featureTimer)
    }
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Zenith Dashboard
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold text-foreground mb-2">
              {getGreeting()}, {userName}! 👋
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Welcome to your new productivity hub. Everything you need to
              manage projects, collaborate with teams, and achieve your goals is
              right here.
            </p>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            Get Started Quickly
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const ActionIcon = action.icon
              return (
                <motion.div
                  key={action.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div
                        className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                      >
                        <ActionIcon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {action.description}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Features Overview */}
        <AnimatePresence>
          {showFeatures && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-semibold text-center mb-8">
                What You Can Do
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                  const FeatureIcon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FeatureIcon className="h-5 w-5 text-primary" />
                            </div>
                            <Badge
                              variant={
                                feature.status === 'ready'
                                  ? 'default'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {feature.status === 'ready' ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" /> Ready
                                </>
                              ) : (
                                <>
                                  <Sparkles className="h-3 w-3 mr-1" /> Beta
                                </>
                              )}
                            </Badge>
                          </div>
                          <CardTitle className="text-base">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="px-8 py-3 text-lg font-semibold"
            >
              <Target className="h-5 w-5 mr-2" />
              Start Your First Project
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onTakeTour}
              className="px-8 py-3 text-lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Take a Quick Tour
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <button className="flex items-center gap-2 hover:text-foreground transition-colors">
              <BookOpen className="h-4 w-4" />
              Documentation
            </button>
            <button className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
