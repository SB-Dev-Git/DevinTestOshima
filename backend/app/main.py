from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

app = FastAPI(title="Task Management API", version="1.0.0")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

tasks_db = {}

class TaskStatus:
    TODO = "todo"
    IN_PROGRESS = "in-progress"
    COMPLETED = "completed"

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = TaskStatus.TODO
    due_date: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[str] = None

class Task(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    status: str
    due_date: Optional[str] = None
    created_at: str
    updated_at: str

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/tasks", response_model=List[Task])
async def get_tasks():
    return list(tasks_db.values())

@app.post("/tasks", response_model=Task)
async def create_task(task: TaskCreate):
    if task.status not in [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    task_id = str(uuid.uuid4())
    current_time = datetime.now().isoformat()
    
    new_task = Task(
        id=task_id,
        title=task.title,
        description=task.description,
        status=task.status,
        due_date=task.due_date,
        created_at=current_time,
        updated_at=current_time
    )
    
    tasks_db[task_id] = new_task
    return new_task

@app.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: str):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    return tasks_db[task_id]

@app.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, task_update: TaskUpdate):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task_update.status and task_update.status not in [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    existing_task = tasks_db[task_id]
    update_data = task_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.now().isoformat()
    
    updated_task = existing_task.copy(update=update_data)
    tasks_db[task_id] = updated_task
    return updated_task

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    
    del tasks_db[task_id]
    return {"message": "Task deleted successfully"}
