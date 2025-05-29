/**
 * タスク管理ツール用JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
    // アラートの自動非表示
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.style.opacity = '0';
            setTimeout(function() {
                alert.style.display = 'none';
            }, 500);
        }, 3000);
    });

    // 削除確認ダイアログ
    const deleteButtons = document.querySelectorAll('.delete-task');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            if (!confirm('このタスクを削除してもよろしいですか？')) {
                e.preventDefault();
            }
        });
    });

    // タスク検索機能
    const searchInput = document.getElementById('task-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const taskRows = document.querySelectorAll('.task-row');
            
            taskRows.forEach(function(row) {
                const title = row.querySelector('.task-title').textContent.toLowerCase();
                const description = row.querySelector('.task-description') ? 
                    row.querySelector('.task-description').textContent.toLowerCase() : '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // タスクフィルター機能
    const statusFilter = document.getElementById('status-filter');
    const priorityFilter = document.getElementById('priority-filter');
    
    function applyFilters() {
        const statusValue = statusFilter ? statusFilter.value : 'all';
        const priorityValue = priorityFilter ? priorityFilter.value : 'all';
        const taskRows = document.querySelectorAll('.task-row');
        
        taskRows.forEach(function(row) {
            const status = row.getAttribute('data-status');
            const priority = row.getAttribute('data-priority');
            
            const statusMatch = statusValue === 'all' || status === statusValue;
            const priorityMatch = priorityValue === 'all' || priority === priorityValue;
            
            if (statusMatch && priorityMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', applyFilters);
    }

    // 日付入力の初期値を今日に設定
    const dueDateInput = document.getElementById('dueDate');
    if (dueDateInput && !dueDateInput.value) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dueDateInput.value = `${year}-${month}-${day}`;
    }

    // タスク期限の色分け
    const dueDates = document.querySelectorAll('.due-date');
    dueDates.forEach(function(element) {
        const dueDate = new Date(element.getAttribute('data-date'));
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (dueDate < today) {
            element.classList.add('text-danger');
            element.classList.add('fw-bold');
        }
    });
});
