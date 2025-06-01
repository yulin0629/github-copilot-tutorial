// 工具函數 - 包含邏輯錯誤和效能問題
const fs = require('fs');
const path = require('path');

// Bug 1: 不安全的輸入驗證
function validateEmail(email) {
    // Bug 2: 過於簡單的正則表達式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Bug 3: 同步檔案操作
function writeLog(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${level.toUpperCase()}: ${message}\n`;
    
    try {
        // Bug 4: 使用同步 I/O
        fs.appendFileSync(path.join(__dirname, '../logs/error.log'), logEntry);
    } catch (error) {
        // Bug 5: 錯誤處理可能造成無限迴圈
        console.error('Failed to write log:', error);
    }
}

// Bug 6: 不安全的密碼驗證
function validatePassword(password) {
    // Bug 7: 硬編碼的驗證規則
    if (password.length < 8) {
        return { valid: false, message: 'Password too short' };
    }
    
    // Bug 8: 沒有檢查其他安全要求
    return { valid: true, message: 'Password is valid' };
}

// Bug 9: 記憶體洩漏風險
const cache = new Map();

function cacheData(key, data, ttl = 300000) { // 5分鐘
    // Bug 10: 沒有清理過期的快取
    cache.set(key, {
        data,
        expires: Date.now() + ttl
    });
}

function getCachedData(key) {
    const cached = cache.get(key);
    
    if (!cached) {
        return null;
    }
    
    // Bug 11: 沒有自動清理過期資料
    if (Date.now() > cached.expires) {
        cache.delete(key);
        return null;
    }
    
    return cached.data;
}

// Bug 12: 不安全的資料清理
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return input;
    }
    
    // Bug 13: 不完整的清理
    return input.replace(/<script>/gi, '');
}

// Bug 14: 效能問題的陣列處理
function processLargeArray(array) {
    // Bug 15: 同步處理大量資料
    return array.map(item => {
        // Bug 16: 不必要的複雜計算
        let result = JSON.parse(JSON.stringify(item));
        
        if (result.timestamp) {
            result.formattedDate = new Date(result.timestamp).toLocaleDateString();
        }
        
        return result;
    });
}

// Bug 17: 錯誤的錯誤處理
async function fetchExternalData(url) {
    try {
        // Bug 18: 沒有設定超時
        const response = await fetch(url);
        
        // Bug 19: 沒有檢查回應狀態
        const data = await response.json();
        
        return data;
    } catch (error) {
        // Bug 20: 重新拋出錯誤沒有額外資訊
        throw error;
    }
}

// Bug 21: 不安全的物件合併
function mergeObjects(target, source) {
    // Bug 22: 沒有防護 prototype pollution
    for (let key in source) {
        target[key] = source[key];
    }
    return target;
}

// Bug 23: 格式化錯誤
function formatCurrency(amount, currency = 'USD') {
    // Bug 24: 沒有處理無效輸入
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Bug 25: 日期處理錯誤
function addDays(date, days) {
    // Bug 26: 直接修改原始日期
    date.setDate(date.getDate() + days);
    return date;
}

// Bug 27: 不安全的隨機數生成
function generateToken() {
    // Bug 28: 使用 Math.random() 生成安全令牌
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

// Bug 29: 錯誤的分頁計算
function paginate(array, page, limit) {
    // Bug 30: 沒有驗證輸入參數
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
        data: array.slice(startIndex, endIndex),
        totalPages: Math.ceil(array.length / limit),
        currentPage: page,
        // Bug 31: 錯誤的計算
        hasNext: endIndex < array.length,
        hasPrev: page > 1
    };
}

// Bug 32: 導出時沒有適當的錯誤處理
module.exports = {
    validateEmail,
    writeLog,
    validatePassword,
    cacheData,
    getCachedData,
    sanitizeInput,
    processLargeArray,
    fetchExternalData,
    mergeObjects,
    formatCurrency,
    addDays,
    generateToken,
    paginate
};