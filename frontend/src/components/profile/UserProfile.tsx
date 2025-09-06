import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
// Avatar component not available - using custom styling instead
import { Badge } from '../ui/badge'
// Separator component not available - using custom styling instead
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Camera,
  Shield,
  Settings
} from 'lucide-react'

interface UserData {
  id: string
  name: string
  email: string
  phone: string
  location: string
  role: string
  department: string
  joinDate: string
  avatar?: string
  bio: string
  skills: string[]
  status: 'active' | 'away' | 'busy'
}

const initialUserData: UserData = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@zenith.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  role: 'Senior Developer',
  department: 'Engineering',
  joinDate: '2022-03-15',
  bio: 'Passionate full-stack developer with 5+ years of experience in building scalable web applications.',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
  status: 'active'
}

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const [userData, setUserData] = useState<UserData>(initialUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<UserData>(userData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!editData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!editData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!editData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!editData.role.trim()) {
      newErrors.role = 'Role is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      setUserData(editData)
      setIsEditing(false)
      setErrors({})
    }
  }

  const handleCancel = () => {
    setEditData(userData)
    setIsEditing(false)
    setErrors({})
  }

  const handleInputChange = (field: keyof UserData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'away': return 'Away'
      case 'busy': return 'Busy'
      default: return 'Unknown'
    }
  }

  if (!isOpen) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onClose} className="flex items-center space-x-2">
            <X className="h-4 w-4" />
            <span>Close</span>
          </Button>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <div className="h-24 w-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </div>
              {isEditing && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
              <div className={`absolute top-0 right-0 h-6 w-6 ${getStatusColor(userData.status)} rounded-full border-2 border-background`} />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl">{userData.name}</CardTitle>
              <CardDescription className="flex items-center justify-center space-x-2">
                <Badge variant="secondary">{getStatusText(userData.status)}</Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{userData.role}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>{userData.department}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(userData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="border-t border-border my-6" />
            <div>
              <h4 className="text-sm font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {userData.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>
              {isEditing ? 'Update your personal details below' : 'Your current personal information'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.div
                  key="view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.name}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.email}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Location</label>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{userData.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border my-6" />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Bio</label>
                    <p className="text-sm leading-relaxed">{userData.bio}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address *</label>
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email address"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number *</label>
                      <Input
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Enter your location"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role *</label>
                      <Input
                        value={editData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        placeholder="Enter your role"
                        className={errors.role ? 'border-red-500' : ''}
                      />
                      {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Input
                        value={editData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        placeholder="Enter your department"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                      value={editData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself"
                      rows={4}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}