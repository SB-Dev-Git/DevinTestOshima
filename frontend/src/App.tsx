import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Calendar, CheckCircle, Clock, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'completed'
  due_date?: string
  created_at: string
  updated_at: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [formData, setFormData] = useState<{
    title: string
    description: string
    status: 'todo' | 'in-progress' | 'completed'
    due_date: string
  }>({
    title: '',
    description: '',
    status: 'todo',
    due_date: ''
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`)
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    }
  }

  const createTask = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || undefined,
          status: formData.status,
          due_date: formData.due_date || undefined,
        }),
      })
      if (response.ok) {
        await fetchTasks()
        resetForm()
        setIsCreateDialogOpen(false)
      }
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  const updateTask = async () => {
    if (!editingTask) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || undefined,
          status: formData.status,
          due_date: formData.due_date || undefined,
        }),
      })
      if (response.ok) {
        await fetchTasks()
        resetForm()
        setEditingTask(null)
      }
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await fetchTasks()
      }
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      due_date: ''
    })
  }

  const openEditDialog = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      due_date: task.due_date || ''
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '完了'
      case 'in-progress':
        return '進行中'
      default:
        return '未着手'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">タスク管理</h1>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                新しいタスク
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新しいタスクを作成</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">タイトル</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="タスクのタイトルを入力"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">説明</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="タスクの説明を入力（任意）"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">ステータス</label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">未着手</SelectItem>
                      <SelectItem value="in-progress">進行中</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">期限</label>
                  <Input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  />
                </div>
                <Button onClick={createTask} className="w-full">
                  作成
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    {task.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {getStatusText(task.status)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(task)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>タスクを削除しますか？</AlertDialogTitle>
                          <AlertDialogDescription>
                            この操作は取り消せません。タスク「{task.title}」を完全に削除します。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>キャンセル</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteTask(task.id)}>
                            削除
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {task.description && (
                  <p className="text-gray-600 mb-3">{task.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {task.due_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      期限: {task.due_date}
                    </div>
                  )}
                  <div>
                    作成: {new Date(task.created_at).toLocaleDateString('ja-JP')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {editingTask && (
          <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>タスクを編集</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">タイトル</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="タスクのタイトルを入力"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">説明</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="タスクの説明を入力（任意）"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">ステータス</label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">未着手</SelectItem>
                      <SelectItem value="in-progress">進行中</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">期限</label>
                  <Input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  />
                </div>
                <Button onClick={updateTask} className="w-full">
                  更新
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">まだタスクがありません</p>
            <p className="text-gray-400">「新しいタスク」ボタンをクリックして最初のタスクを作成しましょう</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
