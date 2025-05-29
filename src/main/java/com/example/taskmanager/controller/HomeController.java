package com.example.taskmanager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * ホームコントローラークラス
 * ルートURLへのアクセスを処理
 */
@Controller
public class HomeController {

    /**
     * ルートURLへのアクセスをタスク一覧にリダイレクト
     * @return リダイレクト先
     */
    @GetMapping("/")
    public String home() {
        return "redirect:/tasks";
    }
}
