package com.example.taskmanager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * タスクエンティティクラス
 */
@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.NOT_STARTED;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority = TaskPriority.MEDIUM;

    /**
     * タスクステータス列挙型
     */
    public enum TaskStatus {
        NOT_STARTED, // 未着手
        IN_PROGRESS, // 進行中
        COMPLETED    // 完了
    }

    /**
     * タスク優先度列挙型
     */
    public enum TaskPriority {
        LOW,    // 低
        MEDIUM, // 中
        HIGH    // 高
    }
}
