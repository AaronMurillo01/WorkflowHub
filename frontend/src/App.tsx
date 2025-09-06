import { useState, useEffect } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { AIAssistant } from '@/components/ai/AIAssistant'
import { OnboardingProvider } from '@/components/onboarding/OnboardingContext'
import { WelcomeScreen } from '@/components/onboarding/WelcomeScreen'
import { GuidedTour } from '@/components/onboarding/GuidedTour'
import { UserPreferences } from '@/components/onboarding/UserPreferences'

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState<
    string | null
  >(null)

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem(
      'zenith-onboarding-completed'
    )
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
      setCurrentOnboardingStep('welcome')
    }
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setCurrentOnboardingStep(null)
    localStorage.setItem('zenith-onboarding-completed', 'true')
  }

  const handleStepChange = (step: string) => {
    setCurrentOnboardingStep(step)
  }

  const renderPage = () => {
    return <Dashboard />
  }

  const getPageSubtitle = () => {
    return "Welcome back! Here's what's happening with your projects."
  }

  return (
    <OnboardingProvider>
      <Layout subtitle={getPageSubtitle()}>{renderPage()}</Layout>
      <AIAssistant />

      {/* Onboarding Flow */}
      {showOnboarding && (
        <>
          {currentOnboardingStep === 'welcome' && (
            <WelcomeScreen onComplete={handleOnboardingComplete} />
          )}
          {currentOnboardingStep === 'tour' && (
            <GuidedTour
              onComplete={handleOnboardingComplete}
              onStepChange={handleStepChange}
            />
          )}
          {currentOnboardingStep === 'preferences' && (
            <UserPreferences onComplete={handleOnboardingComplete} />
          )}
        </>
      )}
    </OnboardingProvider>
  )
}

export default App
