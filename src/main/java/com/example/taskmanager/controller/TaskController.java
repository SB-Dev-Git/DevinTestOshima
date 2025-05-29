package com.example.taskmanager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.view.RedirectView;

/**
 * Webインターフェース用のコントローラー
 * 静的HTMLファイルへのリダイレクトを処理
 */
@Controller
public class TaskController {

    /**
     * タスク一覧ページへのリダイレクト
     * @return リダイレクト先
     */
    @GetMapping("/tasks")
    public String index() {
        return "redirect:/index.html";
    }

    /**
     * タスク作成ページへのリダイレクト
     * @return リダイレクト先
     */
    @GetMapping("/tasks/new")
    public RedirectView newTask() {
        return new RedirectView("/task-form.html");
    }

    /**
     * タスク詳細ページへのリダイレクト
     * @param id タスクID
     * @return リダイレクト先
     */
    @GetMapping("/tasks/{id}")
    public RedirectView viewTask(@PathVariable Long id) {
        return new RedirectView("/task-detail.html?id=" + id);
    }

    /**
     * タスク編集ページへのリダイレクト
     * @param id タスクID
     * @return リダイレクト先
     */
    @GetMapping("/tasks/edit/{id}")
    public RedirectView editTask(@PathVariable Long id) {
        return new RedirectView("/task-form.html?id=" + id);
    }

    /**
     * タスク削除後のリダイレクト
     * @param id タスクID
     * @return リダイレクト先
     */
    @GetMapping("/tasks/delete/{id}")
    public RedirectView deleteTask(@PathVariable Long id) {
        return new RedirectView("/api/tasks/" + id);
    }
}
