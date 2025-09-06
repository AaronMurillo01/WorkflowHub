import { motion } from 'framer-motion'
import { ChartContainer } from '@/components/ui/chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const activityData = [
  { day: 'Mon', commits: 12, issues: 3, prs: 2 },
  { day: 'Tue', commits: 8, issues: 1, prs: 4 },
  { day: 'Wed', commits: 15, issues: 5, prs: 1 },
  { day: 'Thu', commits: 22, issues: 2, prs: 6 },
  { day: 'Fri', commits: 18, issues: 4, prs: 3 },
  { day: 'Sat', commits: 6, issues: 0, prs: 1 },
  { day: 'Sun', commits: 4, issues: 1, prs: 0 },
]

export function ActivityChart() {
  const maxCommits = Math.max(...activityData.map(d => d.commits))
  const maxIssues = Math.max(...activityData.map(d => d.issues))
  const maxPrs = Math.max(...activityData.map(d => d.prs))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          Weekly Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex justify-between items-end h-full space-x-1">
              {activityData.map((data, index) => (
                <motion.div
                  key={data.day}
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex flex-col items-center space-y-1 flex-1"
                >
                  <div className="flex flex-col items-center space-y-1 w-full">
                    {/* Commits */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.commits / maxCommits) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                      className="w-full bg-primary rounded-t-sm min-h-[4px]"
                    />
                    {/* Issues */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.issues / maxIssues) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
                      className="w-full bg-orange-500 rounded-sm min-h-[4px]"
                    />
                    {/* PRs */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.prs / maxPrs) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.6 }}
                      className="w-full bg-green-500 rounded-b-sm min-h-[4px]"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">{data.day}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-sm"></div>
                <span className="text-muted-foreground">Commits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                <span className="text-muted-foreground">Issues</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span className="text-muted-foreground">PRs</span>
              </div>
            </div>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
