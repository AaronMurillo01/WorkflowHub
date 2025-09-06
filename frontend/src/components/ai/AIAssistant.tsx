import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Send,
  X,
  Lightbulb,
  TrendingUp,
  Calendar,
  Users,
  FileText,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
}

const quickActions = [
  {
    icon: TrendingUp,
    label: 'Project Status',
    prompt: 'Show me the status of all my projects',
  },
  {
    icon: Calendar,
    label: 'Schedule',
    prompt: 'What meetings do I have today?',
  },
  { icon: Users, label: 'Team', prompt: 'Who is working on what this week?' },
  {
    icon: FileText,
    label: 'Reports',
    prompt: 'Generate a project progress report',
  },
  {
    icon: Zap,
    label: 'Optimize',
    prompt: 'Suggest ways to improve team productivity',
  },
  { icon: Lightbulb, label: 'Ideas', prompt: 'Give me creative project ideas' },
]

const aiSuggestions = [
  'Create a new project for Q1 2024',
  'Set up automated testing for the mobile app',
  'Schedule a team retrospective meeting',
  'Review code quality metrics',
  'Plan the next sprint',
  'Analyze team performance trends',
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        "Hello! I'm your AI project assistant. I can help you manage projects, analyze data, generate reports, and provide insights. What would you like to know?",
      timestamp: new Date(),
      suggestions: aiSuggestions,
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        suggestions:
          Math.random() > 0.5 ? aiSuggestions.slice(0, 3) : undefined,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('project') && lowerMessage.includes('status')) {
      return "Based on your current projects, here's the status overview:\n\n• E-commerce Platform: 75% complete, on track for delivery\n• Mobile App: 25% complete, planning phase\n• API Integration: 100% complete, ready for deployment\n• Database Migration: 60% complete, currently on hold\n\nWould you like me to dive deeper into any specific project?"
    }

    if (lowerMessage.includes('meeting') || lowerMessage.includes('schedule')) {
      return 'Here are your upcoming meetings:\n\n• Team Standup: Today at 9:00 AM\n• Project Review: Tomorrow at 2:00 PM\n• Client Presentation: Friday at 10:00 AM\n\nI can help you schedule new meetings or reschedule existing ones. What would you like to do?'
    }

    if (lowerMessage.includes('team') || lowerMessage.includes('who')) {
      return 'Current team assignments:\n\n• Sarah Johnson: E-commerce Platform (Lead Developer)\n• Mike Chen: Mobile App (Frontend)\n• Alex Rodriguez: API Integration (Backend)\n• Emma Wilson: Database Migration (DevOps)\n• David Kim: Security Audit (Security Lead)\n\nTeam velocity is up 18% this sprint. Would you like to see detailed performance metrics?'
    }

    if (lowerMessage.includes('report') || lowerMessage.includes('analytics')) {
      return "Here's your project progress report:\n\n📊 **Key Metrics:**\n• 6 active projects\n• 87% sprint goal completion\n• 42 story points completed\n• 94% code quality score\n\n📈 **Trends:**\n• 15% increase in completed tasks\n• 8% growth in team productivity\n• 3% improvement in code quality\n\nWould you like me to generate a detailed PDF report?"
    }

    if (lowerMessage.includes('optimize') || lowerMessage.includes('improve')) {
      return 'Here are my recommendations to boost productivity:\n\n🚀 **Quick Wins:**\n• Implement daily standups (15% efficiency gain)\n• Use pair programming for complex features\n• Set up automated testing (reduces bugs by 40%)\n\n📋 **Process Improvements:**\n• Adopt agile methodology for better planning\n• Use time tracking for accurate estimates\n• Implement code review guidelines\n\nWould you like me to create an action plan for these improvements?'
    }

    if (lowerMessage.includes('idea') || lowerMessage.includes('creative')) {
      return 'Here are some innovative project ideas based on current trends:\n\n💡 **AI-Powered Features:**\n• Smart project recommendations\n• Automated code review system\n• Predictive analytics dashboard\n\n🎨 **User Experience:**\n• Voice-controlled project management\n• AR/VR project visualization\n• Real-time collaboration tools\n\n🔧 **Technical Innovations:**\n• Microservices architecture migration\n• Edge computing implementation\n• Blockchain-based project tracking\n\nWhich area interests you most?'
    }

    return (
      "I understand you're asking about: " +
      userMessage +
      "\n\nI can help you with:\n• Project management and tracking\n• Team collaboration and communication\n• Data analysis and reporting\n• Process optimization\n• Creative brainstorming\n\nCould you be more specific about what you'd like to know?"
    )
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt)
    handleSendMessage(prompt)
  }

  const handleSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <>
      {/* Floating AI Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-md h-[600px] bg-card rounded-t-xl shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      AI Assistant
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Powered by AI
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                      {message.suggestions && (
                        <div className="mt-2 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs p-1 hover:bg-accent"
                              onClick={() => handleSuggestion(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted text-foreground rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        />
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-border">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs justify-start"
                        onClick={() => handleQuickAction(action.prompt)}
                      >
                        <action.icon className="h-3 w-3 mr-1" />
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1"
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handleSendMessage(input)
                    }
                  />
                  <Button
                    onClick={() => handleSendMessage(input)}
                    disabled={!input.trim() || isTyping}
                    size="icon"
                    className="h-10 w-10"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
