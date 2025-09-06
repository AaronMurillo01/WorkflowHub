from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn

from schemas import Project, ProjectCreate, ProjectUpdate, StatsResponse
from data import get_projects, get_project_by_id, get_projects_by_status, get_stats

# Create FastAPI instance
app = FastAPI(
    title="Zenith Dashboard API",
    description="A modern project management API for the Zenith Dashboard",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to Zenith Dashboard API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "API is running"}

@app.get("/api/projects", response_model=List[Project])
async def get_all_projects():
    """Get all projects"""
    return get_projects()

@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a specific project by ID"""
    project = get_project_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.get("/api/projects/status/{status}", response_model=List[Project])
async def get_projects_by_status_endpoint(status: str):
    """Get projects filtered by status"""
    valid_statuses = ["In Progress", "Completed", "On Hold", "Planning"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    return get_projects_by_status(status)

@app.get("/api/stats", response_model=StatsResponse)
async def get_dashboard_stats():
    """Get dashboard statistics"""
    stats = get_stats()
    return StatsResponse(**stats)

@app.post("/api/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    """Create a new project (mock implementation)"""
    # In a real application, this would save to a database
    new_project = Project(
        id=str(len(get_projects()) + 1),
        **project.dict(),
        last_updated="Just now",
        created_at="2024-01-01T00:00:00Z"
    )
    return new_project

@app.put("/api/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_update: ProjectUpdate):
    """Update a project (mock implementation)"""
    existing_project = get_project_by_id(project_id)
    if not existing_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # In a real application, this would update the database
    update_data = project_update.dict(exclude_unset=True)
    updated_project = existing_project.copy(update=update_data)
    return updated_project

@app.delete("/api/projects/{project_id}")
async def delete_project(project_id: str):
    """Delete a project (mock implementation)"""
    existing_project = get_project_by_id(project_id)
    if not existing_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # In a real application, this would delete from the database
    return {"message": f"Project {project_id} deleted successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
