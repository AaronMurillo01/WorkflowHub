import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  MessageCircle, 
  Eye, 
  Edit3, 
  CheckCircle, 
  Clock,
  MoreHorizontal,
  Send,
  X,
  Smile,
  Paperclip,
  AtSign
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface User {
  id: string
  name: string
  avatar: string
  color: string
  status: 'online' | 'away' | 'busy'
  cursor?: { x: number; y: number }
  isTyping?: boolean
}

interface Comment {
  id: string
  user: User
  content: string
  timestamp: Date
  position?: { x: number; y: number }
  resolved: boolean
  replies?: Comment[]
}

interface LiveCollaborationProps {
  projectId: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    color: '#3B82F6',
    status: 'online',
    cursor: { x: 150, y: 200 },
    isTyping: false
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'MC',
    color: '#10B981',
    status: 'online',
    cursor: { x: 300, y: 150 },
    isTyping: true
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    avatar: 'AR',
    color: '#F59E0B',
    status: 'away',
    cursor: { x: 400, y: 300 },
    isTyping: false
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'EW',
    color: '#EF4444',
    status: 'online',
    cursor: { x: 200, y: 400 },
    isTyping: false
  }
]

const mockComments: Comment[] = [
  {
    id: '1',
    user: mockUsers[0],
    content: 'Great progress on the authentication module! Should we add 2FA support?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    position: { x: 250, y: 180 },
    resolved: false,
    replies: [
      {
        id: '1-1',
        user: mockUsers[1],
        content: 'Yes, that would be a great addition. I can work on that next week.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        resolved: false
      }
    ]
  },
  {
    id: '2',
    user: mockUsers[2],
    content: 'The API response time is slower than expected. We might need to optimize the database queries.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    position: { x: 350, y: 250 },
    resolved: true,
    replies: []
  },
  {
    id: '3',
    user: mockUsers[3],
    content: 'Love the new UI design! The color scheme is perfect.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    position: { x: 180, y: 350 },
    resolved: false,
    replies: []
  }
]

export function LiveCollaboration({ projectId }: LiveCollaborationProps) {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isCommenting, setIsCommenting] = useState(false)
  const [selectedComment, setSelectedComment] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => prev.map(user => ({
        ...user,
        cursor: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100
        },
        isTyping: Math.random() > 0.7
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        id: 'current-user',
        name: 'You',
        avatar: 'Y',
        color: '#8B5CF6',
        status: 'online'
      },
      content: newComment,
      timestamp: new Date(),
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      resolved: false,
      replies: []
    }

    setComments(prev => [...prev, comment])
    setNewComment('')
    setIsCommenting(false)
  }

  const handleResolveComment = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, resolved: true }
        : comment
    ))
  }

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: User['status']) => {
    switch (status) {
      case 'online': return 'Online'
      case 'away': return 'Away'
      case 'busy': return 'Busy'
      default: return 'Offline'
    }
  }

  return (
    <div className="space-y-6">
      {/* Live Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Live Collaboration
            <Badge variant="secondary" className="ml-2">
              {users.filter(u => u.status === 'online').length} online
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.avatar}
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                      getStatusColor(user.status)
                    )} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {getStatusText(user.status)}
                      {user.isTyping && ' • Typing...'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    Viewing
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Comments & Feedback
              <Badge variant="secondary" className="ml-2">
                {comments.filter(c => !c.resolved).length} active
              </Badge>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments ? 'Hide' : 'Show'} Comments
              </Button>
              <Button
                size="sm"
                onClick={() => setIsCommenting(true)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Add Comment
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-4 rounded-lg border transition-all duration-200",
                      comment.resolved 
                        ? "bg-muted/30 border-muted" 
                        : "bg-background border-border hover:border-primary/50",
                      selectedComment === comment.id && "ring-2 ring-primary/20"
                    )}
                    onClick={() => setSelectedComment(selectedComment === comment.id ? null : comment.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                          style={{ backgroundColor: comment.user.color }}
                        >
                          {comment.user.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-medium text-foreground">{comment.user.name}</p>
                            <span className="text-xs text-muted-foreground">
                              {comment.timestamp.toLocaleTimeString()}
                            </span>
                            {comment.resolved && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Resolved
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground mb-2">{comment.content}</p>
                          
                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-4 space-y-2">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start space-x-2 p-2 bg-muted/50 rounded">
                                  <div 
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                                    style={{ backgroundColor: reply.user.color }}
                                  >
                                    {reply.user.avatar}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <p className="text-sm font-medium text-foreground">{reply.user.name}</p>
                                      <span className="text-xs text-muted-foreground">
                                        {reply.timestamp.toLocaleTimeString()}
                                      </span>
                                    </div>
                                    <p className="text-sm text-foreground">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {!comment.resolved && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResolveComment(comment.id)}
                            className="h-8 w-8 p-0"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Comment Form */}
          <AnimatePresence>
            {isCommenting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 border border-border rounded-lg bg-muted/30"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">
                      Y
                    </div>
                    <span className="text-sm font-medium text-foreground">Add a comment</span>
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts, ask questions, or provide feedback..."
                      className="min-h-[80px]"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <AtSign className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsCommenting(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Live Cursors Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Cursors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={canvasRef}
            className="relative h-64 bg-muted/20 rounded-lg border-2 border-dashed border-border overflow-hidden"
          >
            {users.map((user) => (
              <motion.div
                key={user.id}
                className="absolute pointer-events-none"
                animate={{
                  x: user.cursor?.x || 0,
                  y: user.cursor?.y || 0,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: user.color }}
                  />
                  <div 
                    className="mt-1 px-2 py-1 rounded text-xs font-medium text-white shadow-lg"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.name}
                  </div>
                  {user.isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-xs text-muted-foreground"
                    >
                      typing...
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
