// API service for communicating with the FastAPI backend
const API_BASE_URL = 'http://localhost:8001/api'

export interface Project {
  id: string
  name: string
  status: 'In Progress' | 'Completed' | 'On Hold' | 'Planning'
  description: string
  team_size: number
  progress: number
  last_updated: string
  created_at: string
}

export interface Stats {
  total_projects: number
  active_projects: number
  completed_projects: number
  team_members: number
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects')
  }

  async getProject(id: string): Promise<Project> {
    return this.request<Project>(`/projects/${id}`)
  }

  async getProjectsByStatus(status: string): Promise<Project[]> {
    return this.request<Project[]>(`/projects/status/${status}`)
  }

  async createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    })
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    return this.request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    })
  }

  async deleteProject(id: string): Promise<void> {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    })
  }

  // Statistics
  async getStats(): Promise<Stats> {
    return this.request<Stats>('/stats')
  }
}

export const apiService = new ApiService()
