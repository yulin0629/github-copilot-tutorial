// 有多個 bug 的 Node.js API 伺服器
// 用於展示 GitHub Copilot 偵錯輔助功能

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Bug 1: 端口設定錯誤
const PORT = process.env.PORT || undefined; // 這會導致錯誤

// Bug 2: 中介軟體順序錯誤
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// Bug 3: 資料庫連接字串錯誤
const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/nonexistent';

// Bug 4: 缺少錯誤處理的資料庫連接
mongoose.connect(DB_URL);

// Bug 5: 路由載入錯誤
const userRoutes = require('./routes/users'); // 檔案可能不存在
const productRoutes = require('./routes/products'); // 檔案可能不存在

// Bug 6: 未定義的中介軟體
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Bug 7: 錯誤的路由處理
app.get('/', (req, res) => {
    // Bug 8: 未處理的非同步錯誤
    setTimeout(() => {
        res.status(200).json({
            message: 'API 伺服器運行中',
            version: '1.0.0',
            timestamp: new Date().toISOString()
        });
    }, 100);
});

// Bug 9: 缺少 404 處理
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Bug 10: 錯誤處理中介軟體問題
app.use((err, req, res, next) => {
    console.error(err.stack);
    // Bug 11: 沒有適當的錯誤回應
    res.status(500).send('Something broke!');
});

// Bug 12: 未處理的 Promise rejection
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // 應該要有適當的處理
});

// Bug 13: 啟動伺服器時沒有錯誤處理
app.listen(PORT, () => {
    console.log(`伺服器運行在端口 ${PORT}`);
    // Bug 14: 這裡會因為 PORT 是 undefined 而出錯
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`端口 ${PORT} 已被使用`);
    } else {
        console.error('伺服器啟動錯誤:', err);
    }
});

// Bug 15: 導出問題
module.exports = app;