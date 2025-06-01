// 用戶路由 - 包含多個錯誤
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Bug 1: 模擬的用戶資料（實際應該來自資料庫）
let users = [
    { id: 1, username: 'admin', email: 'admin@example.com', password: '$2b$10$hash...' },
    { id: 2, username: 'user1', email: 'user1@example.com', password: '$2b$10$hash...' }
];

// Bug 2: 缺少驗證中介軟體
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);
    
    // Bug 3: JWT_SECRET 可能未定義
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Bug 4: 獲取所有用戶 - 沒有分頁和過濾
router.get('/', (req, res) => {
    // Bug 5: 直接返回所有用戶資料（包含密碼）
    res.json(users);
});

// Bug 6: 獲取單個用戶 - 沒有錯誤處理
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id); // Bug 7: 型別不匹配
    res.json(user); // Bug 8: 如果找不到用戶會返回 undefined
});

// Bug 9: 創建用戶 - 缺少驗證
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    
    // Bug 10: 沒有檢查必填欄位
    // Bug 11: 沒有檢查用戶是否已存在
    
    try {
        // Bug 12: 可能的非同步錯誤
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = {
            id: users.length + 1, // Bug 13: 不安全的 ID 生成
            username,
            email,
            password: hashedPassword
        };
        
        users.push(newUser);
        
        // Bug 14: 返回了密碼雜湊
        res.status(201).json(newUser);
    } catch (error) {
        // Bug 15: 錯誤處理不完整
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Bug 16: 用戶登入 - 多個安全問題
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Bug 17: 沒有輸入驗證
    const user = users.find(u => u.username === username);
    
    if (!user) {
        // Bug 18: 資訊洩漏 - 透露用戶不存在
        return res.status(400).json({ error: 'User not found' });
    }
    
    try {
        // Bug 19: 密碼比較可能失敗
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            // Bug 20: 不一致的錯誤回應
            return res.status(400).json({ error: 'Invalid password' });
        }
        
        // Bug 21: JWT_SECRET 可能未定義
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({ token });
    } catch (error) {
        // Bug 22: 錯誤處理遺漏
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Bug 23: 更新用戶 - 缺少驗證和權限檢查
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    // Bug 24: 沒有檢查用戶權限
    // Bug 25: 沒有驗證更新資料
    
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Bug 26: 不安全的物件合併
    users[userIndex] = { ...users[userIndex], ...updates };
    
    res.json(users[userIndex]);
});

// Bug 27: 刪除用戶 - 缺少權限檢查
router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    
    // Bug 28: 沒有檢查是否為管理員
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Bug 29: 直接刪除，沒有軟刪除選項
    users.splice(userIndex, 1);
    
    res.json({ message: 'User deleted successfully' });
});

module.exports = router;