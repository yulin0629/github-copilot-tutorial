// 完成課程後的待辦事項應用程式
// 基本功能：新增、顯示待辦事項

let todos = [];
let nextId = 1;

// DOM 元素
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    renderTodos();
});

// 新增待辦事項
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) {
        alert('請輸入待辦事項內容');
        return;
    }
    
    const todo = {
        id: nextId++,
        text: text,
        completed: false
    };
    
    todos.push(todo);
    todoInput.value = '';
    renderTodos();
}

// 渲染待辦事項列表
function renderTodos() {
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-message">還沒有待辦事項，開始新增一個吧！</li>';
        return;
    }
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <button onclick="deleteTodo(${todo.id})" class="delete-button">刪除</button>
        `;
        todoList.appendChild(li);
    });
}

// 刪除待辦事項
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}