// 資料庫連接模組 - 包含連接和配置錯誤
const mongoose = require('mongoose');

// Bug 1: 硬編碼的資料庫設定
const DB_CONFIG = {
    host: 'localhost',
    port: 27017,
    database: 'debugging_demo',
    // Bug 2: 明文儲存的認證資訊
    username: 'admin',
    password: 'password123'
};

// Bug 3: 不安全的連接字串建構
function buildConnectionString() {
    // Bug 4: 沒有處理特殊字符
    return `mongodb://${DB_CONFIG.username}:${DB_CONFIG.password}@${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`;
}

// Bug 5: 缺少連接選項
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Bug 6: 缺少重要的連接選項
    // maxPoolSize: 10,
    // serverSelectionTimeoutMS: 5000,
    // socketTimeoutMS: 45000,
};

// Bug 7: 沒有重試機制的連接函數
async function connectToDatabase() {
    try {
        const connectionString = buildConnectionString();
        
        // Bug 8: 沒有連接超時處理
        await mongoose.connect(connectionString, connectionOptions);
        
        console.log('Successfully connected to MongoDB');
        
        // Bug 9: 沒有設定連接事件監聽器
        
    } catch (error) {
        // Bug 10: 錯誤處理不完整
        console.error('Database connection error:', error.message);
        throw error;
    }
}

// Bug 11: 沒有優雅關閉函數
function disconnectFromDatabase() {
    // Bug 12: 沒有等待連接關閉
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
}

// Bug 13: 缺少連接狀態檢查
function getConnectionStatus() {
    // Bug 14: 返回內部實作細節
    return mongoose.connection.readyState;
}

// Bug 15: 沒有連接池監控
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    // Bug 16: 錯誤日誌不詳細
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
    // Bug 17: 沒有重連邏輯
});

// Bug 18: 沒有處理應用程式退出時的清理
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed through app termination');
        process.exit(0);
    });
});

// Bug 19: 導出的函數缺少錯誤處理
module.exports = {
    connectToDatabase,
    disconnectFromDatabase,
    getConnectionStatus,
    // Bug 20: 暴露內部配置
    DB_CONFIG
};