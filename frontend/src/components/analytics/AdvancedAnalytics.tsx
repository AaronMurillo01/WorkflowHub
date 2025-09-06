import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Target,
  Clock,
  Users,
  Zap,
  Award,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Metric {
  id: string
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  format: 'number' | 'percentage' | 'currency' | 'time'
  description: string
  category: 'productivity' | 'quality' | 'collaboration' | 'performance'
}

interface Insight {
  id: string
  type: 'positive' | 'warning' | 'suggestion'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  action?: string
}

interface TimeRange {
  label: string
  value: string
  days: number
}

const timeRanges: TimeRange[] = [
  { label: 'Last 7 days', value: '7d', days: 7 },
  { label: 'Last 30 days', value: '30d', days: 30 },
  { label: 'Last 90 days', value: '90d', days: 90 },
  { label: 'Last year', value: '1y', days: 365 },
]

const mockMetrics: Metric[] = [
  {
    id: '1',
    name: 'Team Velocity',
    value: 42,
    change: 18.5,
    trend: 'up',
    format: 'number',
    description: 'Story points completed per sprint',
    category: 'productivity'
  },
  {
    id: '2',
    name: 'Code Quality Score',
    value: 94.2,
    change: 3.1,
    trend: 'up',
    format: 'percentage',
    description: 'Overall code quality based on automated analysis',
    category: 'quality'
  },
  {
    id: '3',
    name: 'Bug Resolution Time',
    value: 2.3,
    change: -15.2,
    trend: 'up',
    format: 'time',
    description: 'Average time to resolve bugs in days',
    category: 'performance'
  },
  {
    id: '4',
    name: 'Collaboration Index',
    value: 87.5,
    change: 8.3,
    trend: 'up',
    format: 'percentage',
    description: 'Team collaboration effectiveness score',
    category: 'collaboration'
  },
  {
    id: '5',
    name: 'Sprint Goal Completion',
    value: 91.2,
    change: 5.7,
    trend: 'up',
    format: 'percentage',
    description: 'Percentage of sprint goals achieved',
    category: 'productivity'
  },
  {
    id: '6',
    name: 'Code Review Coverage',
    value: 96.8,
    change: 2.1,
    trend: 'up',
    format: 'percentage',
    description: 'Percentage of code changes reviewed',
    category: 'quality'
  },
  {
    id: '7',
    name: 'Deployment Frequency',
    value: 12.4,
    change: 22.1,
    trend: 'up',
    format: 'number',
    description: 'Deployments per week',
    category: 'performance'
  },
  {
    id: '8',
    name: 'Team Satisfaction',
    value: 4.6,
    change: 0.3,
    trend: 'up',
    format: 'number',
    description: 'Average team satisfaction rating (1-5)',
    category: 'collaboration'
  }
]

const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'positive',
    title: 'Velocity Increase',
    description: 'Team velocity has increased by 18.5% this month, indicating improved productivity and process efficiency.',
    impact: 'high',
    action: 'Continue current practices and consider scaling successful strategies'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Code Review Bottleneck',
    description: 'Code review coverage is high but review time has increased by 40%. Consider adding more reviewers.',
    impact: 'medium',
    action: 'Assign additional reviewers to reduce bottlenecks'
  },
  {
    id: '3',
    type: 'suggestion',
    title: 'Deployment Optimization',
    description: 'Deployment frequency is good but could be improved with automated testing and CI/CD optimization.',
    impact: 'medium',
    action: 'Implement automated testing pipeline'
  },
  {
    id: '4',
    type: 'positive',
    title: 'Quality Improvement',
    description: 'Code quality score has consistently improved over the past 3 months, reaching 94.2%.',
    impact: 'high',
    action: 'Maintain current quality standards'
  }
]

const categoryColors = {
  productivity: 'bg-blue-500',
  quality: 'bg-green-500',
  collaboration: 'bg-purple-500',
  performance: 'bg-orange-500'
}

const categoryIcons = {
  productivity: Zap,
  quality: Award,
  collaboration: Users,
  performance: Activity
}

export function AdvancedAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[1])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showInsights, setShowInsights] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const formatValue = (metric: Metric) => {
    switch (metric.format) {
      case 'percentage':
        return `${metric.value}%`
      case 'currency':
        return `$${metric.value.toLocaleString()}`
      case 'time':
        return `${metric.value} days`
      default:
        return metric.value.toLocaleString()
    }
  }

  const filteredMetrics = selectedCategory === 'all' 
    ? mockMetrics 
    : mockMetrics.filter(m => m.category === selectedCategory)

  const categories = [
    { value: 'all', label: 'All Metrics', count: mockMetrics.length },
    { value: 'productivity', label: 'Productivity', count: mockMetrics.filter(m => m.category === 'productivity').length },
    { value: 'quality', label: 'Quality', count: mockMetrics.filter(m => m.category === 'quality').length },
    { value: 'collaboration', label: 'Collaboration', count: mockMetrics.filter(m => m.category === 'collaboration').length },
    { value: 'performance', label: 'Performance', count: mockMetrics.filter(m => m.category === 'performance').length },
  ]

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Advanced Analytics</h2>
          <p className="text-muted-foreground">Deep insights into your team's performance and productivity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground">Time Range:</span>
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={selectedTimeRange.value === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeRange(range)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground">Categories:</span>
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className="gap-2"
              >
                {category.label}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMetrics.map((metric, index) => {
          const CategoryIcon = categoryIcons[metric.category]
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.name}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <div className={cn("p-1 rounded", categoryColors[metric.category])}>
                      <CategoryIcon className="h-3 w-3 text-white" />
                    </div>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    ) : (
                      <Activity className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {formatValue(metric)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={cn(
                      "text-xs font-medium",
                      metric.change > 0 ? "text-green-500" : metric.change < 0 ? "text-red-500" : "text-gray-500"
                    )}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                    <span className="text-xs text-muted-foreground">vs last period</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              AI-Powered Insights
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInsights(!showInsights)}
            >
              {showInsights ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {showInsights && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {mockInsights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "p-4 rounded-lg border-l-4",
                      insight.type === 'positive' && "bg-green-50 border-green-500 dark:bg-green-950/20",
                      insight.type === 'warning' && "bg-yellow-50 border-yellow-500 dark:bg-yellow-950/20",
                      insight.type === 'suggestion' && "bg-blue-50 border-blue-500 dark:bg-blue-950/20"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-foreground">{insight.title}</h4>
                          <Badge 
                            variant={insight.impact === 'high' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {insight.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {insight.description}
                        </p>
                        {insight.action && (
                          <p className="text-sm font-medium text-foreground">
                            💡 {insight.action}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Productivity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Interactive chart would be here</p>
                <p className="text-xs">Velocity, completion rate, and efficiency metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Quality Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Interactive chart would be here</p>
                <p className="text-xs">Code quality, test coverage, and bug distribution</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
