// Task Manager API - 缺乏文檔的複雜系統
// 這是一個功能完整但完全缺乏文檔的任務管理 API

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 模擬資料庫
const db = {
    users: [],
    tasks: [],
    projects: [],
    sessions: []
};

// 中間件
function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        next();
    };
}

// 用戶相關 API
router.post('/api/users/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (db.users.find(u => u.email === email)) {
        return res.status(409).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        id: db.users.length + 1,
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        role: 'user'
    };
    
    db.users.push(user);
    
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ 
        success: true, 
        data: userWithoutPassword 
    });
});

router.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = db.users.find(u => u.email === email);
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
    );
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ 
        success: true,
        data: { token, user: userWithoutPassword }
    });
});

router.get('/api/users/profile', auth, (req, res) => {
    const user = db.users.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, data: userWithoutPassword });
});

router.put('/api/users/profile', auth, async (req, res) => {
    const user = db.users.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const { username, email, currentPassword, newPassword } = req.body;
    
    if (newPassword) {
        if (!currentPassword || !await bcrypt.compare(currentPassword, user.password)) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }
        user.password = await bcrypt.hash(newPassword, 10);
    }
    
    if (username) user.username = username;
    if (email) user.email = email;
    user.updatedAt = new Date().toISOString();
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, data: userWithoutPassword });
});

// 任務相關 API
router.get('/api/tasks', auth, (req, res) => {
    const { page = 1, limit = 10, status, priority, projectId, search } = req.query;
    
    let filteredTasks = db.tasks.filter(t => 
        t.assigneeId === req.userId || 
        t.creatorId === req.userId ||
        t.shared
    );
    
    if (status) filteredTasks = filteredTasks.filter(t => t.status === status);
    if (priority) filteredTasks = filteredTasks.filter(t => t.priority === priority);
    if (projectId) filteredTasks = filteredTasks.filter(t => t.projectId === parseInt(projectId));
    if (search) {
        const searchLower = search.toLowerCase();
        filteredTasks = filteredTasks.filter(t => 
            t.title.toLowerCase().includes(searchLower) ||
            t.description?.toLowerCase().includes(searchLower)
        );
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
    
    res.json({
        success: true,
        data: paginatedTasks,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: filteredTasks.length,
            totalPages: Math.ceil(filteredTasks.length / limit)
        }
    });
});

router.post('/api/tasks', auth, (req, res) => {
    const { title, description, priority = 'medium', projectId, dueDate } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    const task = {
        id: db.tasks.length + 1,
        title,
        description,
        status: 'pending',
        priority,
        projectId: projectId || null,
        assigneeId: req.userId,
        creatorId: req.userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dueDate: dueDate || null,
        tags: [],
        comments: [],
        attachments: []
    };
    
    db.tasks.push(task);
    res.status(201).json({ success: true, data: task });
});

router.put('/api/tasks/:id', auth, (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = db.tasks.find(t => t.id === taskId);
    
    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (task.assigneeId !== req.userId && task.creatorId !== req.userId) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    
    const updates = req.body;
    const allowedUpdates = ['title', 'description', 'status', 'priority', 'dueDate', 'assigneeId'];
    
    Object.keys(updates).forEach(key => {
        if (allowedUpdates.includes(key)) {
            task[key] = updates[key];
        }
    });
    
    task.updatedAt = new Date().toISOString();
    res.json({ success: true, data: task });
});

router.delete('/api/tasks/:id', auth, (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = db.tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
    
    const task = db.tasks[taskIndex];
    if (task.creatorId !== req.userId) {
        return res.status(403).json({ error: 'Only creator can delete task' });
    }
    
    db.tasks.splice(taskIndex, 1);
    res.json({ success: true, message: 'Task deleted' });
});

router.post('/api/tasks/:id/comments', auth, (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = db.tasks.find(t => t.id === taskId);
    
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    const comment = {
        id: task.comments.length + 1,
        userId: req.userId,
        content: req.body.content,
        createdAt: new Date().toISOString()
    };
    
    task.comments.push(comment);
    res.status(201).json({ success: true, data: comment });
});

// 項目相關 API
router.get('/api/projects', auth, (req, res) => {
    const userProjects = db.projects.filter(p => 
        p.ownerId === req.userId || 
        p.members.includes(req.userId)
    );
    
    res.json({ success: true, data: userProjects });
});

router.post('/api/projects', auth, (req, res) => {
    const { name, description } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: 'Project name is required' });
    }
    
    const project = {
        id: db.projects.length + 1,
        name,
        description,
        ownerId: req.userId,
        members: [req.userId],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        settings: {
            isPublic: false,
            allowGuestAccess: false
        }
    };
    
    db.projects.push(project);
    res.status(201).json({ success: true, data: project });
});

router.get('/api/projects/:id/tasks', auth, (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = db.projects.find(p => p.id === projectId);
    
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (!project.members.includes(req.userId)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    
    const projectTasks = db.tasks.filter(t => t.projectId === projectId);
    res.json({ success: true, data: projectTasks });
});

router.post('/api/projects/:id/members', auth, (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = db.projects.find(p => p.id === projectId);
    
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.ownerId !== req.userId) {
        return res.status(403).json({ error: 'Only owner can add members' });
    }
    
    const { userId } = req.body;
    if (!db.users.find(u => u.id === userId)) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    if (!project.members.includes(userId)) {
        project.members.push(userId);
        project.updatedAt = new Date().toISOString();
    }
    
    res.json({ success: true, data: project });
});

// 統計 API
router.get('/api/stats/dashboard', auth, (req, res) => {
    const userTasks = db.tasks.filter(t => 
        t.assigneeId === req.userId || t.creatorId === req.userId
    );
    
    const stats = {
        totalTasks: userTasks.length,
        completedTasks: userTasks.filter(t => t.status === 'completed').length,
        pendingTasks: userTasks.filter(t => t.status === 'pending').length,
        inProgressTasks: userTasks.filter(t => t.status === 'in_progress').length,
        overdueTasks: userTasks.filter(t => 
            t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
        ).length,
        tasksByPriority: {
            high: userTasks.filter(t => t.priority === 'high').length,
            medium: userTasks.filter(t => t.priority === 'medium').length,
            low: userTasks.filter(t => t.priority === 'low').length
        },
        recentActivity: userTasks
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 5)
    };
    
    res.json({ success: true, data: stats });
});

// 錯誤處理
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = router;