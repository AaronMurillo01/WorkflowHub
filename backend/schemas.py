from pydantic import BaseModel
from typing import Literal
from datetime import datetime

class ProjectBase(BaseModel):
    name: str
    status: Literal["In Progress", "Completed", "On Hold", "Planning"]
    description: str
    team_size: int
    progress: int

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: str
    last_updated: str
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectUpdate(BaseModel):
    name: str | None = None
    status: Literal["In Progress", "Completed", "On Hold", "Planning"] | None = None
    description: str | None = None
    team_size: int | None = None
    progress: int | None = None

class StatsResponse(BaseModel):
    total_projects: int
    active_projects: int
    completed_projects: int
    team_members: int
