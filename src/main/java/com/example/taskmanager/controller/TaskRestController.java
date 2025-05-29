package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * タスクのREST APIを提供するコントローラー
 */
@RestController
@RequestMapping("/api/tasks")
public class TaskRestController {

    private final TaskService taskService;

    @Autowired
    public TaskRestController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * すべてのタスクを取得
     * @return タスクのリスト
     */
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.findAllTasks();
    }

    /**
     * 指定されたIDのタスクを取得
     * @param id タスクID
     * @return タスク情報
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.findTaskById(id);
        return task.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * 新しいタスクを作成
     * @param task 作成するタスク情報
     * @return 作成されたタスク
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }

    /**
     * 既存のタスクを更新
     * @param id 更新するタスクのID
     * @param taskDetails 更新内容
     * @return 更新されたタスク
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Optional<Task> existingTask = taskService.findTaskById(id);
        
        if (existingTask.isPresent()) {
            Task task = existingTask.get();
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setDueDate(taskDetails.getDueDate());
            task.setStatus(taskDetails.getStatus());
            task.setPriority(taskDetails.getPriority());
            
            return ResponseEntity.ok(taskService.saveTask(task));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * タスクを削除
     * @param id 削除するタスクのID
     * @return 削除結果
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Optional<Task> task = taskService.findTaskById(id);
        
        if (task.isPresent()) {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * ステータスでタスクをフィルタリング
     * @param status タスクのステータス
     * @return フィルタリングされたタスクのリスト
     */
    @GetMapping("/status/{status}")
    public List<Task> getTasksByStatus(@PathVariable String status) {
        return taskService.findTasksByStatus(status);
    }

    /**
     * 優先度でタスクをフィルタリング
     * @param priority タスクの優先度
     * @return フィルタリングされたタスクのリスト
     */
    @GetMapping("/priority/{priority}")
    public List<Task> getTasksByPriority(@PathVariable String priority) {
        return taskService.findTasksByPriority(priority);
    }
}
