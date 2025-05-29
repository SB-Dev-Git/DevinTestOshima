package com.example.taskmanager.repository;

import com.example.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * タスクリポジトリインターフェース
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    /**
     * ステータスでタスクを検索
     * @param status タスクのステータス
     * @return タスクのリスト
     */
    List<Task> findByStatus(Task.TaskStatus status);
    
    /**
     * 優先度でタスクを検索
     * @param priority タスクの優先度
     * @return タスクのリスト
     */
    List<Task> findByPriority(Task.TaskPriority priority);
    
    /**
     * タイトルに特定の文字列を含むタスクを検索
     * @param keyword 検索キーワード
     * @return タスクのリスト
     */
    List<Task> findByTitleContaining(String keyword);
}
