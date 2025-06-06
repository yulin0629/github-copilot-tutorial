// GitHub Copilot 熟練應用展示
// 完整的待辦事項功能 + 進階特性

let todos = [];
let todoIdCounter = 1;

// DOM 元素
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    showWelcomeMessage();
    setupEventListeners();
    setupKeyboardShortcuts();
    loadFromLocalStorage();
    renderTodos();
});

// 歡迎訊息
function showWelcomeMessage() {
    showNotification('🎉 歡迎使用 GitHub Copilot 熟練應用！', 'success');
    setTimeout(() => {
        showNotification('💡 試試看 Ctrl+Enter 快速新增', 'info');
    }, 2000);
}

// 設置事件監聽器
function setupEventListeners() {
    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTodo();
    });
    
    // 批量操作
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            toggleAllTodos();
        }
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            deleteCompleted();
        }
    });
}

// 快捷鍵設置
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            addTodo();
        }
    });
}

// 新增待辦事項
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) {
        showNotification('⚠️ 請輸入待辦事項內容', 'warning');
        return;
    }
    
    const todo = {
        id: todoIdCounter++,
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.push(todo);
    todoInput.value = '';
    saveToLocalStorage();
    renderTodos();
    showNotification('✅ 已新增待辦事項', 'success');
}

// 渲染待辦事項列表
function renderTodos() {
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-message">🎯 還沒有待辦事項，開始新增一個吧！</li>';
        return;
    }
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="todo-content">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="toggleTodo(${todo.id})">
                <span class="todo-text">${todo.text}</span>
                <small class="todo-date">${formatDate(todo.createdAt)}</small>
            </div>
            <div class="todo-actions">
                <button onclick="editTodo(${todo.id})" class="edit-btn">✏️</button>
                <button onclick="deleteTodo(${todo.id})" class="delete-btn">🗑️</button>
            </div>
        `;
        todoList.appendChild(li);
    });
    
    updateStats();
}

// 切換待辦事項狀態
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage();
        renderTodos();
        showNotification(todo.completed ? '✅ 已完成' : '🔄 已重新開啟', 'info');
    }
}

// 刪除待辦事項
function deleteTodo(id) {
    if (confirm('確定要刪除這個待辦事項嗎？')) {
        todos = todos.filter(t => t.id !== id);
        saveToLocalStorage();
        renderTodos();
        showNotification('🗑️ 已刪除待辦事項', 'info');
    }
}

// 編輯待辦事項
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        const newText = prompt('編輯待辦事項：', todo.text);
        if (newText && newText.trim()) {
            todo.text = newText.trim();
            saveToLocalStorage();
            renderTodos();
            showNotification('✏️ 已更新待辦事項', 'success');
        }
    }
}

// 批量操作：全選/取消全選
function toggleAllTodos() {
    const allCompleted = todos.every(t => t.completed);
    todos.forEach(t => t.completed = !allCompleted);
    saveToLocalStorage();
    renderTodos();
    showNotification(allCompleted ? '🔄 已全部重新開啟' : '✅ 已全部完成', 'info');
}

// 刪除已完成項目
function deleteCompleted() {
    const completedCount = todos.filter(t => t.completed).length;
    if (completedCount === 0) {
        showNotification('💡 沒有已完成的項目', 'info');
        return;
    }
    
    if (confirm(`確定要刪除 ${completedCount} 個已完成的項目嗎？`)) {
        todos = todos.filter(t => !t.completed);
        saveToLocalStorage();
        renderTodos();
        showNotification(`🗑️ 已刪除 ${completedCount} 個項目`, 'success');
    }
}

// 更新統計
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    
    document.title = `${pending > 0 ? `(${pending}) ` : ''}GitHub Copilot 熟練應用展示`;
}

// 本地存儲
function saveToLocalStorage() {
    localStorage.setItem('copilot-todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('copilot-todos');
    if (saved) {
        todos = JSON.parse(saved);
        todoIdCounter = Math.max(...todos.map(t => t.id), 0) + 1;
    }
}

// 通知系統
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 格式化日期
function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return '剛剛';
    if (diffMins < 60) return `${diffMins} 分鐘前`;
    if (diffHours < 24) return `${diffHours} 小時前`;
    if (diffDays < 7) return `${diffDays} 天前`;
    
    return date.toLocaleDateString('zh-TW');
}

// 初始化示例數據
setTimeout(() => {
    if (todos.length === 0) {
        showNotification('💡 提示：Ctrl+Enter 快速新增，Ctrl+A 全選，Ctrl+D 刪除已完成', 'info');
    }
}, 4000);