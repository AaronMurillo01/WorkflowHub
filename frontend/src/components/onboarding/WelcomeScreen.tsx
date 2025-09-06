import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Users,
  BarChart3,
  Settings,
  Play,
  SkipForward,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useOnboarding } from './OnboardingContext'

const welcomeSteps = [
  {
    id: 'welcome',
    title: 'Welcome to Zenith Dashboard! 🎉',
    subtitle: 'Your modern workspace for productivity and collaboration',
    description:
      'Get ready to supercharge your workflow with our intuitive dashboard designed for teams and individuals.',
    features: [
      { icon: Zap, text: 'AI-powered insights and automation' },
      { icon: Target, text: 'Goal tracking and progress monitoring' },
      { icon: Users, text: 'Real-time team collaboration' },
      { icon: BarChart3, text: 'Advanced analytics and reporting' },
    ],
  },
  {
    id: 'setup',
    title: "Let's Set Up Your Workspace",
    subtitle: 'Customize your experience in just a few steps',
    description:
      "We'll help you configure your dashboard to match your workflow and preferences.",
    features: [
      { icon: Settings, text: 'Personalize your dashboard layout' },
      { icon: CheckCircle, text: 'Configure notification preferences' },
      { icon: Target, text: 'Set up your first project goals' },
      { icon: Users, text: 'Invite team members (optional)' },
    ],
  },
]

interface WelcomeScreenProps {
  onComplete?: () => void
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const { completeStep, skipOnboarding, showGuidedTour } = useOnboarding()
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      completeStep('welcome-complete')
      showGuidedTour()
    }
  }

  const handleSkip = () => {
    skipOnboarding()
    onComplete?.()
  }

  const currentStepData = welcomeSteps[currentStep]

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl"
      >
        <Card className="border-2 border-primary/20 shadow-2xl">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: isAnimating ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isAnimating ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          Step {currentStep + 1} of {welcomeSteps.length}
                        </span>
                      </div>
                      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        {currentStepData.title}
                      </h1>
                      <p className="text-xl text-muted-foreground mb-6">
                        {currentStepData.subtitle}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {currentStepData.description}
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {currentStepData.features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                          <motion.div
                            key={feature.text}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-foreground font-medium">
                              {feature.text}
                            </span>
                          </motion.div>
                        )
                      })}
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        onClick={handleNext}
                        size="lg"
                        className="flex items-center gap-2"
                      >
                        {currentStep === welcomeSteps.length - 1 ? (
                          <>
                            <Play className="h-4 w-4" />
                            Start Tour
                          </>
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={handleSkip}
                        className="flex items-center gap-2"
                      >
                        <SkipForward className="h-4 w-4" />
                        Skip for now
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side - Visual */}
              <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 p-8 md:p-12 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  {/* Animated Dashboard Preview */}
                  <div className="w-80 h-60 bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                    <div className="h-12 bg-primary/5 border-b border-border flex items-center px-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-primary/20 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-muted rounded" />
                          <div className="h-2 bg-muted/60 rounded w-2/3" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-12 bg-muted/40 rounded" />
                        <div className="h-12 bg-muted/40 rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-muted/60 rounded" />
                        <div className="h-2 bg-muted/40 rounded w-4/5" />
                        <div className="h-2 bg-muted/60 rounded w-3/5" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Zap className="h-6 w-6 text-primary-foreground" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-4 -left-4 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Target className="h-5 w-5 text-white" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-8 pb-6">
              <div className="flex gap-2">
                {welcomeSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                      index <= currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
