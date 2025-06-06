// 工具函數模組
// 這個檔案包含各種輔助函數

// 格式化貨幣
function formatCurrency(amount) {
    return `NT$ ${amount.toLocaleString('zh-TW')}`;
}

// 計算運費
// 滿 1000 元免運費，否則收取 60 元
function calculateShipping(subtotal) {
    const FREE_SHIPPING_THRESHOLD = 1000;
    const SHIPPING_FEE = 60;
    
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

// 產生唯一 ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 深拷貝物件
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 防抖函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 儲存到 localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('儲存失敗:', e);
        return false;
    }
}

// 從 localStorage 讀取
function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('讀取失敗:', e);
        return null;
    }
}

// 顯示通知訊息
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}