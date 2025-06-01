// 遺留工具函數檔案
// 包含多種程式碼異味的工具函數

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 全域變數 - 程式碼異味 #1
var CONFIG = {};
var CACHE = {};
var LOGS = [];

// 過長且職責不明的函數 - 程式碼異味 #2
function processUserData(userData, type, options, callback) {
    var result = {};
    
    // 硬編碼值 - 程式碼異味 #3
    if (type === 'registration') {
        // 驗證邏輯混雜 - 程式碼異味 #4
        if (!userData.email || userData.email.indexOf('@') === -1 || userData.email.length < 5) {
            callback('Invalid email', null);
            return;
        }
        
        if (!userData.password || userData.password.length < 6 || userData.password.length > 50) {
            callback('Invalid password', null);
            return;
        }
        
        if (!userData.name || userData.name.length < 2 || userData.name.length > 100) {
            callback('Invalid name', null);
            return;
        }
        
        // 重複的邏輯 - 程式碼異味 #5
        userData.email = userData.email.toLowerCase().trim();
        userData.name = userData.name.trim();
        
        // 電話號碼驗證 - 硬編碼規則 - 程式碼異味 #6
        if (userData.phone) {
            userData.phone = userData.phone.replace(/\D/g, '');
            if (userData.phone.length !== 10 && userData.phone.length !== 11) {
                callback('Invalid phone number', null);
                return;
            }
        }
        
        result.userData = userData;
        result.timestamp = new Date().toISOString();
        result.type = 'registration';
        
    } else if (type === 'update') {
        // 重複的驗證邏輯 - 程式碼異味 #7
        if (userData.email && (userData.email.indexOf('@') === -1 || userData.email.length < 5)) {
            callback('Invalid email', null);
            return;
        }
        
        if (userData.password && (userData.password.length < 6 || userData.password.length > 50)) {
            callback('Invalid password', null);
            return;
        }
        
        if (userData.name && (userData.name.length < 2 || userData.name.length > 100)) {
            callback('Invalid name', null);
            return;
        }
        
        // 重複的清理邏輯 - 程式碼異味 #8
        if (userData.email) userData.email = userData.email.toLowerCase().trim();
        if (userData.name) userData.name = userData.name.trim();
        
        if (userData.phone) {
            userData.phone = userData.phone.replace(/\D/g, '');
            if (userData.phone.length !== 10 && userData.phone.length !== 11) {
                callback('Invalid phone number', null);
                return;
            }
        }
        
        result.userData = userData;
        result.timestamp = new Date().toISOString();
        result.type = 'update';
        
    } else if (type === 'login') {
        // 又是重複邏輯 - 程式碼異味 #9
        if (!userData.email || userData.email.indexOf('@') === -1) {
            callback('Invalid email', null);
            return;
        }
        
        if (!userData.password || userData.password.length < 1) {
            callback('Password required', null);
            return;
        }
        
        userData.email = userData.email.toLowerCase().trim();
        
        result.userData = userData;
        result.timestamp = new Date().toISOString();
        result.type = 'login';
    }
    
    // 日誌記錄 - 副作用 - 程式碼異味 #10
    LOGS.push({
        action: 'processUserData',
        type: type,
        timestamp: new Date().toISOString(),
        success: true
    });
    
    callback(null, result);
}

// 混合職責的工具函數 - 程式碼異味 #11
function formatAndValidateProduct(product, action) {
    var errors = [];
    var formatted = {};
    
    // 硬編碼業務規則 - 程式碼異味 #12
    if (!product.name || product.name.length < 3 || product.name.length > 200) {
        errors.push('Product name must be between 3 and 200 characters');
    } else {
        formatted.name = product.name.trim();
    }
    
    if (!product.price || isNaN(product.price) || product.price <= 0 || product.price > 999999) {
        errors.push('Product price must be a positive number less than 1,000,000');
    } else {
        formatted.price = parseFloat(product.price).toFixed(2);
    }
    
    if (!product.description || product.description.length < 10 || product.description.length > 2000) {
        errors.push('Product description must be between 10 and 2000 characters');
    } else {
        formatted.description = product.description.trim();
    }
    
    if (!product.category || typeof product.category !== 'string') {
        errors.push('Product category is required');
    } else {
        formatted.category = product.category.toLowerCase().trim();
    }
    
    // SKU 生成邏輯混在驗證中 - 程式碼異味 #13
    if (action === 'create') {
        if (!product.sku) {
            formatted.sku = generateSKU(formatted.name, formatted.category);
        } else {
            if (product.sku.length < 3 || product.sku.length > 50) {
                errors.push('SKU must be between 3 and 50 characters');
            } else {
                formatted.sku = product.sku.toUpperCase().trim();
            }
        }
    }
    
    // 權重驗證 - 硬編碼 - 程式碼異味 #14
    if (product.weight) {
        if (isNaN(product.weight) || product.weight <= 0 || product.weight > 1000) {
            errors.push('Product weight must be between 0 and 1000 kg');
        } else {
            formatted.weight = parseFloat(product.weight);
        }
    }
    
    // 尺寸驗證 - 重複邏輯 - 程式碼異味 #15
    if (product.dimensions) {
        if (product.dimensions.length && (isNaN(product.dimensions.length) || product.dimensions.length <= 0)) {
            errors.push('Invalid length dimension');
        }
        if (product.dimensions.width && (isNaN(product.dimensions.width) || product.dimensions.width <= 0)) {
            errors.push('Invalid width dimension');
        }
        if (product.dimensions.height && (isNaN(product.dimensions.height) || product.dimensions.height <= 0)) {
            errors.push('Invalid height dimension');
        }
        
        if (product.dimensions.length) formatted.length = parseFloat(product.dimensions.length);
        if (product.dimensions.width) formatted.width = parseFloat(product.dimensions.width);
        if (product.dimensions.height) formatted.height = parseFloat(product.dimensions.height);
    }
    
    // 標籤處理 - 複雜邏輯 - 程式碼異味 #16
    if (product.tags) {
        if (Array.isArray(product.tags)) {
            formatted.tags = product.tags
                .filter(tag => typeof tag === 'string' && tag.trim().length > 0)
                .map(tag => tag.trim().toLowerCase())
                .slice(0, 10); // 最多 10 個標籤
        } else if (typeof product.tags === 'string') {
            formatted.tags = product.tags
                .split(',')
                .filter(tag => tag.trim().length > 0)
                .map(tag => tag.trim().toLowerCase())
                .slice(0, 10);
        }
    }
    
    // 記錄到全域 LOGS - 副作用 - 程式碼異味 #17
    LOGS.push({
        action: 'formatAndValidateProduct',
        productName: formatted.name,
        errors: errors,
        timestamp: new Date().toISOString()
    });
    
    return {
        valid: errors.length === 0,
        errors: errors,
        formatted: formatted
    };
}

// SKU 生成函數 - 複雜且不可預測 - 程式碼異味 #18
function generateSKU(name, category) {
    var namePrefix = name.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '');
    var categoryPrefix = category.substring(0, 2).toUpperCase().replace(/[^A-Z]/g, '');
    var timestamp = Date.now().toString().slice(-6);
    var random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    
    return namePrefix + categoryPrefix + timestamp + random;
}

// 文件操作函數 - 同步操作且缺乏錯誤處理 - 程式碼異味 #19
function saveDataToFile(data, filename) {
    try {
        var filePath = path.join(__dirname, '../data/', filename);
        
        // 不檢查目錄是否存在 - 程式碼異味 #20
        var jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonData);
        
        // 記錄到全域變數 - 副作用 - 程式碼異味 #21
        LOGS.push({
            action: 'saveDataToFile',
            filename: filename,
            size: jsonData.length,
            timestamp: new Date().toISOString()
        });
        
        return true;
    } catch (error) {
        // 錯誤處理不一致 - 程式碼異味 #22
        console.log('File save error:', error.message);
        return false;
    }
}

// 載入資料函數 - 同步且會阻塞 - 程式碼異味 #23
function loadDataFromFile(filename) {
    try {
        var filePath = path.join(__dirname, '../data/', filename);
        
        if (!fs.existsSync(filePath)) {
            console.log('File not found:', filename);
            return null;
        }
        
        var rawData = fs.readFileSync(filePath, 'utf8');
        var data = JSON.parse(rawData);
        
        // 副作用 - 程式碼異味 #24
        LOGS.push({
            action: 'loadDataFromFile',
            filename: filename,
            timestamp: new Date().toISOString()
        });
        
        return data;
    } catch (error) {
        console.log('File load error:', error.message);
        return null;
    }
}

// 加密工具函數 - 不安全的實作 - 程式碼異味 #25
function simpleEncrypt(text, key) {
    if (!key) {
        key = 'default_key_123'; // 預設密鑰 - 程式碼異味 #26
    }
    
    // 簡單 XOR 加密 - 不安全 - 程式碼異味 #27
    var encrypted = '';
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        var keyChar = key.charCodeAt(i % key.length);
        encrypted += String.fromCharCode(charCode ^ keyChar);
    }
    
    return Buffer.from(encrypted).toString('base64');
}

// 解密函數 - 重複邏輯 - 程式碼異味 #28
function simpleDecrypt(encryptedText, key) {
    if (!key) {
        key = 'default_key_123'; // 重複的預設值 - 程式碼異味 #29
    }
    
    try {
        var encrypted = Buffer.from(encryptedText, 'base64').toString();
        var decrypted = '';
        
        for (var i = 0; i < encrypted.length; i++) {
            var charCode = encrypted.charCodeAt(i);
            var keyChar = key.charCodeAt(i % key.length);
            decrypted += String.fromCharCode(charCode ^ keyChar);
        }
        
        return decrypted;
    } catch (error) {
        console.log('Decryption error:', error.message);
        return null;
    }
}

// 日期格式化 - 重新發明輪子 - 程式碼異味 #30
function formatDate(date, format) {
    if (!date) {
        date = new Date();
    }
    
    if (typeof date === 'string') {
        date = new Date(date);
    }
    
    if (!format) {
        format = 'YYYY-MM-DD'; // 預設格式 - 程式碼異味 #31
    }
    
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');
    
    // 手動字串替換 - 程式碼異味 #32
    var formatted = format;
    formatted = formatted.replace('YYYY', year);
    formatted = formatted.replace('MM', month);
    formatted = formatted.replace('DD', day);
    formatted = formatted.replace('HH', hours);
    formatted = formatted.replace('mm', minutes);
    formatted = formatted.replace('ss', seconds);
    
    return formatted;
}

// 深度複製函數 - 不完整的實作 - 程式碼異味 #33
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (Array.isArray(obj)) {
        var copy = [];
        for (var i = 0; i < obj.length; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }
    
    // 不處理其他特殊物件類型 - 程式碼異味 #34
    var copy = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    
    return copy;
}

// 清理函數 - 但不清理全域狀態 - 程式碼異味 #35
function clearCache() {
    CACHE = {};
    console.log('Cache cleared');
}

// 日誌查看函數 - 暴露內部狀態 - 程式碼異味 #36
function getLogs() {
    return LOGS;
}

// 清理日誌函數 - 沒有保護機制 - 程式碼異味 #37
function clearLogs() {
    LOGS = [];
    console.log('Logs cleared');
}

// 匯出所有函數 - 包括內部工具 - 程式碼異味 #38
module.exports = {
    processUserData,
    formatAndValidateProduct,
    generateSKU,
    saveDataToFile,
    loadDataFromFile,
    simpleEncrypt,
    simpleDecrypt,
    formatDate,
    deepCopy,
    clearCache,
    getLogs,
    clearLogs,
    // 意外匯出全域變數 - 程式碼異味 #39
    CONFIG,
    CACHE,
    LOGS
};