package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * タスク管理サービスクラス
 */
@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * すべてのタスクを取得
     * @return タスクのリスト
     */
    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * 指定されたIDのタスクを取得
     * @param id タスクID
     * @return タスク情報
     */
    public Optional<Task> findTaskById(Long id) {
        return taskRepository.findById(id);
    }

    /**
     * タスクを保存
     * @param task 保存するタスク
     * @return 保存されたタスク
     */
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * タスクを削除
     * @param id 削除するタスクのID
     */
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    /**
     * ステータスでタスクを検索
     * @param statusStr タスクのステータス文字列
     * @return タスクのリスト
     */
    public List<Task> findTasksByStatus(String statusStr) {
        try {
            Task.TaskStatus status = Task.TaskStatus.valueOf(statusStr);
            return taskRepository.findByStatus(status);
        } catch (IllegalArgumentException e) {
            return List.of(); // 無効なステータスの場合は空リストを返す
        }
    }

    /**
     * 優先度でタスクを検索
     * @param priorityStr タスクの優先度文字列
     * @return タスクのリスト
     */
    public List<Task> findTasksByPriority(String priorityStr) {
        try {
            Task.TaskPriority priority = Task.TaskPriority.valueOf(priorityStr);
            return taskRepository.findByPriority(priority);
        } catch (IllegalArgumentException e) {
            return List.of(); // 無効な優先度の場合は空リストを返す
        }
    }

    /**
     * キーワードでタスクを検索
     * @param keyword 検索キーワード
     * @return タスクのリスト
     */
    public List<Task> searchTasks(String keyword) {
        return taskRepository.findByTitleContaining(keyword);
    }
}
