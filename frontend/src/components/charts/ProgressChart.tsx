import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const progressData = [
  { name: 'Frontend Development', progress: 85, color: 'bg-blue-500' },
  { name: 'Backend API', progress: 92, color: 'bg-green-500' },
  { name: 'Database Design', progress: 78, color: 'bg-purple-500' },
  { name: 'Testing Suite', progress: 65, color: 'bg-orange-500' },
  { name: 'Documentation', progress: 45, color: 'bg-pink-500' },
]

export function ProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Project Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {progressData.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">{item.name}</span>
              <span className="text-sm text-muted-foreground">{item.progress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                className={`h-2 rounded-full ${item.color}`}
              />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
