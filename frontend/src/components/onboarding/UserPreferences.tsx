import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings,
  Palette,
  Bell,
  Layout,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useOnboarding } from './OnboardingContext'

interface PreferenceSection {
  id: string
  title: string
  description: string
  icon: any
  options: PreferenceOption[]
}

interface PreferenceOption {
  id: string
  label: string
  description: string
  type: 'toggle' | 'select' | 'radio'
  value: any
  options?: { value: any; label: string; icon?: any }[]
}

const preferencesSections: PreferenceSection[] = [
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize the look and feel of your dashboard',
    icon: Palette,
    options: [
      {
        id: 'theme',
        label: 'Theme',
        description: 'Choose your preferred color scheme',
        type: 'radio',
        value: 'dark',
        options: [
          { value: 'light', label: 'Light', icon: Sun },
          { value: 'dark', label: 'Dark', icon: Moon },
          { value: 'system', label: 'System', icon: Monitor },
        ],
      },
      {
        id: 'sidebarCollapsed',
        label: 'Sidebar',
        description: 'Start with sidebar collapsed',
        type: 'toggle',
        value: false,
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Control how and when you receive notifications',
    icon: Bell,
    options: [
      {
        id: 'notifications',
        label: 'Enable Notifications',
        description: 'Receive updates about your projects and tasks',
        type: 'toggle',
        value: true,
      },
      {
        id: 'soundEnabled',
        label: 'Sound Effects',
        description: 'Play sounds for notifications and interactions',
        type: 'toggle',
        value: true,
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy & Analytics',
    description: 'Control data collection and privacy settings',
    icon: Eye,
    options: [
      {
        id: 'analytics',
        label: 'Usage Analytics',
        description: 'Help improve the product by sharing anonymous usage data',
        type: 'toggle',
        value: true,
      },
      {
        id: 'crashReports',
        label: 'Crash Reports',
        description: 'Automatically send crash reports to help fix issues',
        type: 'toggle',
        value: true,
      },
    ],
  },
]

interface UserPreferencesProps {
  onComplete?: () => void
}

export function UserPreferences({ onComplete }: UserPreferencesProps) {
  const { state, updatePreferences, completeStep } = useOnboarding()
  const [preferences, setPreferences] = useState({
    theme: state.userPreferences.theme,
    sidebarCollapsed: state.userPreferences.sidebarCollapsed,
    notifications: state.userPreferences.notifications,
    soundEnabled: true,
    analytics: true,
    crashReports: true,
  })
  const [hasChanges, setHasChanges] = useState(false)

  const handlePreferenceChange = (optionId: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [optionId]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    updatePreferences({
      theme: preferences.theme,
      sidebarCollapsed: preferences.sidebarCollapsed,
      notifications: preferences.notifications,
    })
    completeStep('preferences-setup')
    setHasChanges(false)
    onComplete?.()
  }

  const handleReset = () => {
    setPreferences({
      theme: 'dark',
      sidebarCollapsed: false,
      notifications: true,
      soundEnabled: true,
      analytics: true,
      crashReports: true,
    })
    setHasChanges(true)
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-auto"
      >
        <Card className="border-2 border-primary/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Settings className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">
              Customize Your Experience
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Set up your preferences to make Zenith work perfectly for you
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {preferencesSections.map((section, sectionIndex) => {
              const SectionIcon = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
                >
                  <Card className="border border-border/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <SectionIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {section.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {section.options.map((option) => (
                        <div key={option.id} className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <label className="text-sm font-medium text-foreground">
                                {option.label}
                              </label>
                              <p className="text-xs text-muted-foreground mt-1">
                                {option.description}
                              </p>
                            </div>

                            {option.type === 'toggle' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handlePreferenceChange(
                                    option.id,
                                    !preferences[
                                      option.id as keyof typeof preferences
                                    ]
                                  )
                                }
                                className={`ml-4 ${
                                  preferences[
                                    option.id as keyof typeof preferences
                                  ]
                                    ? 'bg-primary text-primary-foreground'
                                    : ''
                                }`}
                              >
                                {preferences[
                                  option.id as keyof typeof preferences
                                ] ? (
                                  option.id === 'soundEnabled' ? (
                                    <Volume2 className="h-4 w-4" />
                                  ) : option.id === 'analytics' ||
                                    option.id === 'crashReports' ? (
                                    <Eye className="h-4 w-4" />
                                  ) : (
                                    <Layout className="h-4 w-4" />
                                  )
                                ) : option.id === 'soundEnabled' ? (
                                  <VolumeX className="h-4 w-4" />
                                ) : option.id === 'analytics' ||
                                  option.id === 'crashReports' ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Layout className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </div>

                          {option.type === 'radio' && option.options && (
                            <div className="flex gap-2 mt-2">
                              {option.options.map((radioOption) => {
                                const OptionIcon = radioOption.icon
                                return (
                                  <Button
                                    key={radioOption.value}
                                    variant={
                                      preferences[
                                        option.id as keyof typeof preferences
                                      ] === radioOption.value
                                        ? 'default'
                                        : 'outline'
                                    }
                                    size="sm"
                                    onClick={() =>
                                      handlePreferenceChange(
                                        option.id,
                                        radioOption.value
                                      )
                                    }
                                    className="flex items-center gap-2"
                                  >
                                    {OptionIcon && (
                                      <OptionIcon className="h-4 w-4" />
                                    )}
                                    {radioOption.label}
                                  </Button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to Defaults
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    completeStep('preferences-setup')
                    onComplete?.()
                  }}
                >
                  Skip for Now
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
