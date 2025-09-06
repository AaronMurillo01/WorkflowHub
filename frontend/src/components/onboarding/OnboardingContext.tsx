import React, { createContext, useContext, useState, useEffect } from 'react'

interface OnboardingState {
  isFirstTime: boolean
  currentStep: number
  completedSteps: string[]
  showTour: boolean
  userPreferences: {
    theme: 'light' | 'dark' | 'system'
    sidebarCollapsed: boolean
    notifications: boolean
    tourCompleted: boolean
  }
}

interface OnboardingContextType {
  state: OnboardingState
  startOnboarding: () => void
  completeStep: (stepId: string) => void
  skipOnboarding: () => void
  showGuidedTour: () => void
  hideGuidedTour: () => void
  updatePreferences: (
    preferences: Partial<OnboardingState['userPreferences']>
  ) => void
  resetOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
)

const ONBOARDING_STORAGE_KEY = 'zenith-onboarding-state'

const defaultState: OnboardingState = {
  isFirstTime: true,
  currentStep: 0,
  completedSteps: [],
  showTour: false,
  userPreferences: {
    theme: 'dark',
    sidebarCollapsed: false,
    notifications: true,
    tourCompleted: false,
  },
}

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<OnboardingState>(() => {
    const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY)
    return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState
  })

  useEffect(() => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const startOnboarding = () => {
    setState((prev) => ({
      ...prev,
      isFirstTime: true,
      currentStep: 0,
      showTour: true,
    }))
  }

  const completeStep = (stepId: string) => {
    setState((prev) => ({
      ...prev,
      completedSteps: [...prev.completedSteps, stepId],
      currentStep: prev.currentStep + 1,
    }))
  }

  const skipOnboarding = () => {
    setState((prev) => ({
      ...prev,
      isFirstTime: false,
      showTour: false,
      userPreferences: {
        ...prev.userPreferences,
        tourCompleted: true,
      },
    }))
  }

  const showGuidedTour = () => {
    setState((prev) => ({ ...prev, showTour: true }))
  }

  const hideGuidedTour = () => {
    setState((prev) => ({ ...prev, showTour: false }))
  }

  const updatePreferences = (
    preferences: Partial<OnboardingState['userPreferences']>
  ) => {
    setState((prev) => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, ...preferences },
    }))
  }

  const resetOnboarding = () => {
    setState(defaultState)
    localStorage.removeItem(ONBOARDING_STORAGE_KEY)
  }

  const value: OnboardingContextType = {
    state,
    startOnboarding,
    completeStep,
    skipOnboarding,
    showGuidedTour,
    hideGuidedTour,
    updatePreferences,
    resetOnboarding,
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
