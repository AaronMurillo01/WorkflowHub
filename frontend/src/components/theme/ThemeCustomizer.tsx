import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor, 
  Check, 
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
  Sparkles,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Theme {
  id: string
  name: string
  type: 'light' | 'dark' | 'auto'
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    border: string
  }
  custom?: boolean
}

interface PresetTheme extends Theme {
  description: string
  preview: string[]
}

const presetThemes: PresetTheme[] = [
  {
    id: 'default-light',
    name: 'Default Light',
    type: 'light',
    description: 'Clean and professional light theme',
    colors: {
      primary: '#3B82F6',
      secondary: '#64748B',
      accent: '#F1F5F9',
      background: '#FFFFFF',
      foreground: '#0F172A',
      muted: '#F8FAFC',
      border: '#E2E8F0'
    },
    preview: ['#3B82F6', '#64748B', '#F1F5F9', '#FFFFFF']
  },
  {
    id: 'default-dark',
    name: 'Default Dark',
    type: 'dark',
    description: 'Modern dark theme with excellent contrast',
    colors: {
      primary: '#3B82F6',
      secondary: '#94A3B8',
      accent: '#1E293B',
      background: '#0F172A',
      foreground: '#F8FAFC',
      muted: '#1E293B',
      border: '#334155'
    },
    preview: ['#3B82F6', '#94A3B8', '#1E293B', '#0F172A']
  },
  {
    id: 'ocean',
    name: 'Ocean',
    type: 'dark',
    description: 'Calming ocean-inspired theme',
    colors: {
      primary: '#06B6D4',
      secondary: '#67E8F9',
      accent: '#0C4A6E',
      background: '#0F172A',
      foreground: '#F0F9FF',
      muted: '#0C4A6E',
      border: '#075985'
    },
    preview: ['#06B6D4', '#67E8F9', '#0C4A6E', '#0F172A']
  },
  {
    id: 'forest',
    name: 'Forest',
    type: 'dark',
    description: 'Nature-inspired green theme',
    colors: {
      primary: '#10B981',
      secondary: '#6EE7B7',
      accent: '#064E3B',
      background: '#0F172A',
      foreground: '#F0FDF4',
      muted: '#064E3B',
      border: '#047857'
    },
    preview: ['#10B981', '#6EE7B7', '#064E3B', '#0F172A']
  },
  {
    id: 'sunset',
    name: 'Sunset',
    type: 'dark',
    description: 'Warm sunset colors for creativity',
    colors: {
      primary: '#F59E0B',
      secondary: '#FCD34D',
      accent: '#7C2D12',
      background: '#0F172A',
      foreground: '#FFFBEB',
      muted: '#7C2D12',
      border: '#D97706'
    },
    preview: ['#F59E0B', '#FCD34D', '#7C2D12', '#0F172A']
  },
  {
    id: 'purple',
    name: 'Purple',
    type: 'dark',
    description: 'Royal purple theme for elegance',
    colors: {
      primary: '#8B5CF6',
      secondary: '#C4B5FD',
      accent: '#4C1D95',
      background: '#0F172A',
      foreground: '#FAF5FF',
      muted: '#4C1D95',
      border: '#7C3AED'
    },
    preview: ['#8B5CF6', '#C4B5FD', '#4C1D95', '#0F172A']
  }
]

const colorPresets = [
  { name: 'Blue', colors: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A'] },
  { name: 'Green', colors: ['#10B981', '#059669', '#047857', '#065F46'] },
  { name: 'Purple', colors: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6'] },
  { name: 'Orange', colors: ['#F59E0B', '#D97706', '#B45309', '#92400E'] },
  { name: 'Red', colors: ['#EF4444', '#DC2626', '#B91C1C', '#991B1B'] },
  { name: 'Pink', colors: ['#EC4899', '#DB2777', '#BE185D', '#9D174D'] },
  { name: 'Cyan', colors: ['#06B6D4', '#0891B2', '#0E7490', '#155E75'] },
  { name: 'Indigo', colors: ['#6366F1', '#4F46E5', '#4338CA', '#3730A3'] }
]

export function ThemeCustomizer() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(presetThemes[0])
  const [customTheme, setCustomTheme] = useState<Theme | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }, [currentTheme])

  const applyTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    setCustomTheme(null)
    setIsEditing(false)
  }

  const createCustomTheme = () => {
    const newTheme: Theme = {
      id: 'custom',
      name: 'Custom Theme',
      type: 'dark',
      colors: { ...currentTheme.colors },
      custom: true
    }
    setCustomTheme(newTheme)
    setIsEditing(true)
  }

  const updateCustomColor = (colorKey: keyof Theme['colors'], value: string) => {
    if (!customTheme) return
    
    setCustomTheme(prev => prev ? {
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      }
    } : null)
  }

  const saveCustomTheme = () => {
    if (!customTheme) return
    
    // In a real app, this would save to localStorage or backend
    localStorage.setItem('customTheme', JSON.stringify(customTheme))
    setCurrentTheme(customTheme)
    setIsEditing(false)
  }

  const resetToDefault = () => {
    setCurrentTheme(presetThemes[0])
    setCustomTheme(null)
    setIsEditing(false)
  }

  const exportTheme = () => {
    const themeData = {
      name: currentTheme.name,
      colors: currentTheme.colors,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const themeData = JSON.parse(e.target?.result as string)
        const importedTheme: Theme = {
          id: 'imported',
          name: themeData.name || 'Imported Theme',
          type: 'dark',
          colors: themeData.colors,
          custom: true
        }
        setCustomTheme(importedTheme)
        setCurrentTheme(importedTheme)
        setIsEditing(false)
      } catch (error) {
        console.error('Failed to import theme:', error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Theme Customizer</h2>
          <p className="text-muted-foreground">Personalize your workspace with custom themes and colors</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showPreview ? 'Hide' : 'Show'} Preview
          </Button>
          <Button variant="outline" size="sm" onClick={exportTheme}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={resetToDefault}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Current Theme Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Current Theme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                {Object.values(currentTheme.colors).slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{currentTheme.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentTheme.type === 'auto' ? 'System' : currentTheme.type === 'light' ? 'Light' : 'Dark'} theme
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {currentTheme.custom && (
                <Badge variant="secondary">Custom</Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={createCustomTheme}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preset Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Preset Themes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presetThemes.map((theme) => (
              <motion.div
                key={theme.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                  currentTheme.id === theme.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => applyTheme(theme)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex space-x-1">
                    {theme.preview.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{theme.name}</h4>
                    <p className="text-xs text-muted-foreground">{theme.description}</p>
                  </div>
                  {currentTheme.id === theme.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {theme.type === 'light' ? 'Light' : 'Dark'}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentTheme(theme)
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Theme Editor */}
      <AnimatePresence>
        {isEditing && customTheme && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Custom Theme Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Color Customization */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(customTheme.colors).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <label className="text-sm font-medium text-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => updateCustomColor(key as keyof Theme['colors'], e.target.value)}
                            className="w-12 h-8 rounded border border-border cursor-pointer"
                          />
                          <Input
                            value={value}
                            onChange={(e) => updateCustomColor(key as keyof Theme['colors'], e.target.value)}
                            className="flex-1 font-mono text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Color Presets */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Color Presets</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {colorPresets.map((preset) => (
                        <Button
                          key={preset.name}
                          variant="outline"
                          size="sm"
                          className="h-auto p-2 flex flex-col items-center space-y-1"
                          onClick={() => {
                            setCustomTheme(prev => prev ? {
                              ...prev,
                              colors: {
                                ...prev.colors,
                                primary: preset.colors[0],
                                secondary: preset.colors[1],
                                accent: preset.colors[2],
                                background: preset.colors[3]
                              }
                            } : null)
                          }}
                        >
                          <div className="flex space-x-1">
                            {preset.colors.map((color, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <span className="text-xs">{preset.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCustomTheme(null)}
                      >
                        Reset
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept=".json"
                        onChange={importTheme}
                        className="hidden"
                        id="import-theme"
                      />
                      <label htmlFor="import-theme">
                        <Button variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            Import
                          </span>
                        </Button>
                      </label>
                      <Button size="sm" onClick={saveCustomTheme}>
                        <Check className="h-4 w-4 mr-2" />
                        Save Theme
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Theme Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample Components */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Sample Card</h4>
                      <div className="p-4 rounded-lg border border-border bg-card">
                        <h5 className="font-semibold text-foreground mb-2">Card Title</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          This is a sample card to preview your theme colors.
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm">Primary</Button>
                          <Button variant="outline" size="sm">Secondary</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Sample Badges</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
