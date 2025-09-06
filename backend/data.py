from datetime import datetime, timedelta
from typing import List
from schemas import Project

# Mock data for projects
mock_projects_data = [
    {
        "id": "1",
        "name": "E-commerce Platform Redesign",
        "status": "In Progress",
        "description": "Complete redesign of the customer-facing e-commerce platform with modern UI/UX principles.",
        "team_size": 5,
        "progress": 75,
        "last_updated": "2 hours ago",
        "created_at": datetime.now() - timedelta(days=15)
    },
    {
        "id": "2",
        "name": "Mobile App Development",
        "status": "Planning",
        "description": "Native mobile application for iOS and Android with cross-platform compatibility.",
        "team_size": 8,
        "progress": 25,
        "last_updated": "1 day ago",
        "created_at": datetime.now() - timedelta(days=7)
    },
    {
        "id": "3",
        "name": "API Integration Project",
        "status": "Completed",
        "description": "Integration of third-party APIs for payment processing and user authentication.",
        "team_size": 3,
        "progress": 100,
        "last_updated": "3 days ago",
        "created_at": datetime.now() - timedelta(days=30)
    },
    {
        "id": "4",
        "name": "Database Migration",
        "status": "On Hold",
        "description": "Migration from legacy database system to modern cloud-based solution.",
        "team_size": 4,
        "progress": 60,
        "last_updated": "1 week ago",
        "created_at": datetime.now() - timedelta(days=45)
    },
    {
        "id": "5",
        "name": "Security Audit",
        "status": "In Progress",
        "description": "Comprehensive security audit and vulnerability assessment of all systems.",
        "team_size": 2,
        "progress": 40,
        "last_updated": "4 hours ago",
        "created_at": datetime.now() - timedelta(days=10)
    },
    {
        "id": "6",
        "name": "Performance Optimization",
        "status": "In Progress",
        "description": "Optimizing application performance and reducing load times across all platforms.",
        "team_size": 6,
        "progress": 85,
        "last_updated": "6 hours ago",
        "created_at": datetime.now() - timedelta(days=20)
    },
    {
        "id": "7",
        "name": "User Analytics Dashboard",
        "status": "Planning",
        "description": "Real-time analytics dashboard for tracking user behavior and engagement metrics.",
        "team_size": 4,
        "progress": 15,
        "last_updated": "2 days ago",
        "created_at": datetime.now() - timedelta(days=5)
    },
    {
        "id": "8",
        "name": "Content Management System",
        "status": "In Progress",
        "description": "Headless CMS solution for managing content across multiple channels and platforms.",
        "team_size": 7,
        "progress": 55,
        "last_updated": "1 day ago",
        "created_at": datetime.now() - timedelta(days=12)
    },
    {
        "id": "9",
        "name": "Automated Testing Suite",
        "status": "Completed",
        "description": "Comprehensive automated testing framework for all application components.",
        "team_size": 3,
        "progress": 100,
        "last_updated": "5 days ago",
        "created_at": datetime.now() - timedelta(days=25)
    },
    {
        "id": "10",
        "name": "Cloud Infrastructure Setup",
        "status": "In Progress",
        "description": "Setting up scalable cloud infrastructure with auto-scaling and load balancing.",
        "team_size": 5,
        "progress": 70,
        "last_updated": "3 hours ago",
        "created_at": datetime.now() - timedelta(days=18)
    }
]

def get_projects() -> List[Project]:
    """Get all projects"""
    return [Project(**project) for project in mock_projects_data]

def get_project_by_id(project_id: str) -> Project | None:
    """Get a specific project by ID"""
    for project_data in mock_projects_data:
        if project_data["id"] == project_id:
            return Project(**project_data)
    return None

def get_projects_by_status(status: str) -> List[Project]:
    """Get projects filtered by status"""
    return [Project(**project) for project in mock_projects_data if project["status"] == status]

def get_stats() -> dict:
    """Get dashboard statistics"""
    projects = get_projects()
    total_projects = len(projects)
    active_projects = len([p for p in projects if p.status == "In Progress"])
    completed_projects = len([p for p in projects if p.status == "Completed"])
    team_members = sum(p.team_size for p in projects)
    
    return {
        "total_projects": total_projects,
        "active_projects": active_projects,
        "completed_projects": completed_projects,
        "team_members": team_members
    }
