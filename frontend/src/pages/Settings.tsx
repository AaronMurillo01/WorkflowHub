import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Globe,
  Camera,
  Save,
  Download,
  Settings as SettingsIcon,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThemeCustomizer } from '@/components/theme/ThemeCustomizer'

const settingsSections = [
  {
    title: 'Profile',
    icon: User,
    description: 'Manage your personal information and preferences',
    items: [
      { label: 'Full Name', value: 'John Doe', type: 'text' },
      { label: 'Email', value: 'john.doe@example.com', type: 'email' },
      { label: 'Role', value: 'Project Manager', type: 'text' },
      { label: 'Department', value: 'Engineering', type: 'text' },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    description: 'Configure how you receive notifications',
    items: [
      { label: 'Email Notifications', value: 'Enabled', type: 'toggle' },
      { label: 'Push Notifications', value: 'Enabled', type: 'toggle' },
      { label: 'SMS Alerts', value: 'Disabled', type: 'toggle' },
      { label: 'Weekly Digest', value: 'Enabled', type: 'toggle' },
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    description: 'Manage your account security settings',
    items: [
      { label: 'Two-Factor Authentication', value: 'Enabled', type: 'toggle' },
      { label: 'Login Notifications', value: 'Enabled', type: 'toggle' },
      { label: 'Session Timeout', value: '30 minutes', type: 'select' },
      { label: 'Password Last Changed', value: '2 weeks ago', type: 'text' },
    ],
  },
  {
    title: 'Appearance',
    icon: Palette,
    description: 'Customize the look and feel of your dashboard',
    items: [
      { label: 'Theme', value: 'Dark', type: 'select' },
      { label: 'Language', value: 'English', type: 'select' },
      { label: 'Time Zone', value: 'UTC-8 (PST)', type: 'select' },
      { label: 'Date Format', value: 'MM/DD/YYYY', type: 'select' },
    ],
  },
  {
    title: 'Data & Privacy',
    icon: Database,
    description: 'Control your data and privacy settings',
    items: [
      { label: 'Data Export', value: 'Available', type: 'action' },
      { label: 'Data Retention', value: '2 years', type: 'select' },
      { label: 'Analytics Tracking', value: 'Enabled', type: 'toggle' },
      { label: 'Cookie Preferences', value: 'Manage', type: 'action' },
    ],
  },
  {
    title: 'Integrations',
    icon: Globe,
    description: 'Manage third-party integrations and API access',
    items: [
      { label: 'GitHub Integration', value: 'Connected', type: 'status' },
      { label: 'Slack Integration', value: 'Not Connected', type: 'status' },
      { label: 'API Access', value: 'Enabled', type: 'toggle' },
      { label: 'Webhook Endpoints', value: '2 Active', type: 'text' },
    ],
  },
]

const settingsTabs = [
  { id: 'general', label: 'General', icon: SettingsIcon },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Globe },
]

export function Settings() {
  const [activeTab, setActiveTab] = useState('general')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'theme':
        return <ThemeCustomizer />
      case 'notifications':
        return <div>Notifications settings coming soon...</div>
      case 'security':
        return <div>Security settings coming soon...</div>
      case 'integrations':
        return <div>Integrations settings coming soon...</div>
      default:
        return (
          <>
            {/* Profile Overview */}
            <Card className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                      JD
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground">
                      John Doe
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      Senior Project Manager
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline" className="gap-1">
                        <User className="h-3 w-3" />
                        Admin
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Shield className="h-3 w-3" />
                        Verified
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Member since Jan 2023
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Last active
                    </div>
                    <div className="font-medium text-foreground">
                      2 minutes ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {settingsSections.map((section, sectionIndex) => {
                const Icon = section.icon
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
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
                        {section.items.map((item, itemIndex) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: sectionIndex * 0.1 + itemIndex * 0.05,
                            }}
                            className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0"
                          >
                            <span className="text-sm font-medium text-foreground">
                              {item.label}
                            </span>
                            <div className="flex items-center space-x-2">
                              {item.type === 'text' && (
                                <span className="text-sm text-muted-foreground">
                                  {item.value}
                                </span>
                              )}
                              {item.type === 'email' && (
                                <span className="text-sm text-muted-foreground">
                                  {item.value}
                                </span>
                              )}
                              {item.type === 'toggle' && (
                                <div
                                  className={`w-10 h-5 rounded-full transition-colors ${
                                    item.value === 'Enabled'
                                      ? 'bg-primary'
                                      : 'bg-secondary'
                                  }`}
                                >
                                  <div
                                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                                      item.value === 'Enabled'
                                        ? 'translate-x-5'
                                        : 'translate-x-0.5'
                                    } mt-0.5`}
                                  />
                                </div>
                              )}
                              {item.type === 'select' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                >
                                  {item.value}
                                </Button>
                              )}
                              {item.type === 'action' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8"
                                >
                                  {item.value}
                                </Button>
                              )}
                              {item.type === 'status' && (
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    item.value === 'Connected' ||
                                    item.value === 'Enabled'
                                      ? 'bg-green-500/20 text-green-400'
                                      : 'bg-yellow-500/20 text-yellow-400'
                                  }`}
                                >
                                  {item.value}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </>
        )
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Settings & Preferences
          </h2>
          <p className="text-muted-foreground text-lg">
            Manage your account settings, preferences, and security
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b border-border">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div className="space-y-6">{renderTabContent()}</div>
    </div>
  )
}
