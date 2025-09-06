import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle,
  Lightbulb,
  MousePointer,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useOnboarding } from './OnboardingContext'

interface TourStep {
  id: string
  title: string
  description: string
  target: string
  position: 'top' | 'bottom' | 'left' | 'right'
  action?: string
  tip?: string
}

const tourSteps: TourStep[] = [
  {
    id: 'sidebar',
    title: 'Navigation Sidebar',
    description:
      'Your main navigation hub. Access all features and pages from here. You can collapse it by clicking the menu button.',
    target: 'aside',
    position: 'right',
    action: 'Try collapsing and expanding the sidebar',
    tip: 'Pro tip: Use keyboard shortcut Cmd/Ctrl + B to toggle the sidebar',
  },
  {
    id: 'dashboard-stats',
    title: 'Dashboard Overview',
    description:
      'Get a quick overview of your key metrics and project statistics at a glance.',
    target: '[data-tour="stats-grid"]',
    position: 'bottom',
    tip: 'These cards update in real-time as your projects progress',
  },
  {
    id: 'projects-section',
    title: 'Recent Projects',
    description:
      'View and manage your most recent projects. Click on any project card to see detailed information.',
    target: '[data-tour="projects-section"]',
    position: 'top',
    action: 'Click "New Project" to create your first project',
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    description:
      'Access frequently used features quickly from the sidebar. These shortcuts save you time.',
    target: '[data-tour="quick-actions"]',
    position: 'right',
    tip: 'AI Assistant can help you with tasks and answer questions',
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    description:
      'Your intelligent helper is always available. Ask questions, get suggestions, or request help with your workflow.',
    target: '[data-tour="ai-assistant"]',
    position: 'left',
    action: 'Try asking the AI assistant a question',
  },
]

interface GuidedTourProps {
  onComplete?: () => void
  onStepChange?: (step: string) => void
}

export function GuidedTour({ onComplete }: GuidedTourProps) {
  const { state, hideGuidedTour, completeStep, updatePreferences } =
    useOnboarding()
  const [currentStep, setCurrentStep] = useState(0)
  const [highlightElement, setHighlightElement] = useState<Element | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const currentTourStep = tourSteps[currentStep]

  useEffect(() => {
    if (!state.showTour) return

    const updateHighlight = () => {
      const element = document.querySelector(currentTourStep.target)
      if (element) {
        setHighlightElement(element)
        const rect = element.getBoundingClientRect()

        // Calculate tooltip position based on step position preference
        let x = rect.left + rect.width / 2
        let y = rect.top + rect.height / 2

        switch (currentTourStep.position) {
          case 'top':
            y = rect.top - 20
            break
          case 'bottom':
            y = rect.bottom + 20
            break
          case 'left':
            x = rect.left - 20
            break
          case 'right':
            x = rect.right + 20
            break
        }

        setTooltipPosition({ x, y })

        // Scroll element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    updateHighlight()
    window.addEventListener('resize', updateHighlight)
    return () => window.removeEventListener('resize', updateHighlight)
  }, [currentStep, currentTourStep, state.showTour])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      completeTour()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const completeTour = () => {
    completeStep('guided-tour-complete')
    updatePreferences({ tourCompleted: true })
    hideGuidedTour()
    onComplete?.()
  }

  const skipTour = () => {
    hideGuidedTour()
    onComplete?.()
  }

  if (!state.showTour) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Highlight */}
      {highlightElement && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: highlightElement.getBoundingClientRect().left - 4,
            top: highlightElement.getBoundingClientRect().top - 4,
            width: highlightElement.getBoundingClientRect().width + 8,
            height: highlightElement.getBoundingClientRect().height + 8,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full border-2 border-primary rounded-lg shadow-lg shadow-primary/25"
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-2 border-primary/50 rounded-lg"
          />
        </div>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed z-50"
          style={{
            left: Math.max(
              20,
              Math.min(window.innerWidth - 400, tooltipPosition.x - 200)
            ),
            top: Math.max(
              20,
              Math.min(window.innerHeight - 300, tooltipPosition.y - 150)
            ),
          }}
        >
          <Card className="w-96 border-2 border-primary/20 shadow-xl">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {currentTourStep.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Step {currentStep + 1} of {tourSteps.length}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={skipTour}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentTourStep.description}
                </p>

                {currentTourStep.action && (
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <MousePointer className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">
                      {currentTourStep.action}
                    </span>
                  </div>
                )}

                {currentTourStep.tip && (
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground">
                      {currentTourStep.tip}
                    </span>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex gap-1">
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep
                          ? 'bg-primary'
                          : index < currentStep
                            ? 'bg-primary/60'
                            : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  size="sm"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  {currentStep === tourSteps.length - 1 ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Finish
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
