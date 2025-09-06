import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Badge } from '../ui/badge'
// Separator component not available - using custom styling instead
import {
  Plus,
  X,
  Users,
  Target,
  FileText,
  Tag,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

interface ProjectFormData {
  name: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  startDate: string
  endDate: string
  budget: string
  teamSize: string
  tags: string[]
  objectives: string[]
  requirements: string
  status: 'planning' | 'active' | 'on-hold' | 'completed'
}

interface ProjectCreationFormProps {
  onSubmit: (project: ProjectFormData) => void
  onCancel: () => void
  isOpen: boolean
}

const initialFormData: ProjectFormData = {
  name: '',
  description: '',
  category: '',
  priority: 'medium',
  startDate: '',
  endDate: '',
  budget: '',
  teamSize: '',
  tags: [],
  objectives: [],
  requirements: '',
  status: 'planning',
}

const categories = [
  'Web Development',
  'Mobile App',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Design',
  'Marketing',
  'Research',
]

export function ProjectCreationForm({
  onSubmit,
  onCancel,
  isOpen,
}: ProjectCreationFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentTag, setCurrentTag] = useState('')
  const [currentObjective, setCurrentObjective] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Project name must be at least 3 characters'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    } else if (
      formData.startDate &&
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      newErrors.endDate = 'End date must be after start date'
    }

    if (formData.budget && isNaN(Number(formData.budget))) {
      newErrors.budget = 'Budget must be a valid number'
    }

    if (
      formData.teamSize &&
      (isNaN(Number(formData.teamSize)) || Number(formData.teamSize) < 1)
    ) {
      newErrors.teamSize = 'Team size must be a positive number'
    }

    if (formData.objectives.length === 0) {
      newErrors.objectives = 'At least one objective is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSubmit(formData)
      setFormData(initialFormData)
      setErrors({})
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addObjective = () => {
    if (
      currentObjective.trim() &&
      !formData.objectives.includes(currentObjective.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        objectives: [...prev.objectives, currentObjective.trim()],
      }))
      setCurrentObjective('')
      if (errors.objectives) {
        setErrors((prev) => ({ ...prev, objectives: '' }))
      }
    }
  }

  const removeObjective = (objectiveToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((obj) => obj !== objectiveToRemove),
    }))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'high':
        return 'bg-orange-500'
      case 'urgent':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Create New Project
              </CardTitle>
              <CardDescription>
                Fill in the details below to create a new project
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Basic Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Project Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      placeholder="Enter project name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange('category', e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md text-sm bg-background ${
                        errors.category ? 'border-red-500' : 'border-input'
                      } focus:outline-none focus:ring-2 focus:ring-ring`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-xs text-red-500 flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.category}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange('description', e.target.value)
                    }
                    placeholder="Describe your project in detail"
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md text-sm bg-background resize-none ${
                      errors.description ? 'border-red-500' : 'border-input'
                    } focus:outline-none focus:ring-2 focus:ring-ring`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 flex items-center space-x-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-border my-6" />

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Project Details</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        handleInputChange('priority', e.target.value as any)
                      }
                      className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`h-2 w-2 rounded-full ${getPriorityColor(formData.priority)}`}
                      />
                      <span className="text-xs text-muted-foreground capitalize">
                        {formData.priority}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date *</label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        handleInputChange('startDate', e.target.value)
                      }
                      className={errors.startDate ? 'border-red-500' : ''}
                    />
                    {errors.startDate && (
                      <p className="text-xs text-red-500 flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.startDate}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date *</label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        handleInputChange('endDate', e.target.value)
                      }
                      className={errors.endDate ? 'border-red-500' : ''}
                    />
                    {errors.endDate && (
                      <p className="text-xs text-red-500 flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.endDate}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        handleInputChange('status', e.target.value as any)
                      }
                      className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="on-hold">On Hold</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Budget (USD)</span>
                    </label>
                    <Input
                      type="number"
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange('budget', e.target.value)
                      }
                      placeholder="Enter project budget"
                      className={errors.budget ? 'border-red-500' : ''}
                    />
                    {errors.budget && (
                      <p className="text-xs text-red-500 flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.budget}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Team Size</span>
                    </label>
                    <Input
                      type="number"
                      value={formData.teamSize}
                      onChange={(e) =>
                        handleInputChange('teamSize', e.target.value)
                      }
                      placeholder="Number of team members"
                      className={errors.teamSize ? 'border-red-500' : ''}
                    />
                    {errors.teamSize && (
                      <p className="text-xs text-red-500 flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.teamSize}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-border my-6" />

              {/* Tags and Objectives */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Tag className="h-5 w-5" />
                  <span>Tags & Objectives</span>
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex space-x-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) =>
                          e.key === 'Enter' && (e.preventDefault(), addTag())
                        }
                      />
                      <Button type="button" onClick={addTag} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center space-x-1"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Project Objectives *
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        value={currentObjective}
                        onChange={(e) => setCurrentObjective(e.target.value)}
                        placeholder="Add an objective"
                        onKeyPress={(e) =>
                          e.key === 'Enter' &&
                          (e.preventDefault(), addObjective())
                        }
                      />
                      <Button type="button" onClick={addObjective} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {errors.objectives && (
                      <p className="text-xs text-red-500 flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.objectives}</span>
                      </p>
                    )}
                    {formData.objectives.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {formData.objectives.map((objective, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{objective}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeObjective(objective)}
                              className="text-muted-foreground hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-border my-6" />

              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Additional Requirements
                </h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Technical Requirements & Notes
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) =>
                      handleInputChange('requirements', e.target.value)
                    }
                    placeholder="Specify any technical requirements, constraints, or additional notes"
                    rows={4}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </CardContent>

            <div className="flex items-center justify-end space-x-4 p-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Create Project</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  )
}
