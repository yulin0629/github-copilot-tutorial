// 工具函數庫
// 包含各種實用的工具函數，需要完整測試

/**
 * 字串處理函數
 */
function capitalize(str) {
    if (typeof str !== 'string') {
        throw new Error('Parameter must be a string');
    }
    if (str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function truncate(str, maxLength, suffix = '...') {
    if (typeof str !== 'string') {
        throw new Error('First parameter must be a string');
    }
    if (typeof maxLength !== 'number' || maxLength < 0) {
        throw new Error('Max length must be a non-negative number');
    }
    
    if (str.length <= maxLength) {
        return str;
    }
    
    return str.slice(0, maxLength - suffix.length) + suffix;
}

function slugify(str) {
    if (typeof str !== 'string') {
        throw new Error('Parameter must be a string');
    }
    
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * 陣列處理函數
 */
function chunk(array, size) {
    if (!Array.isArray(array)) {
        throw new Error('First parameter must be an array');
    }
    if (typeof size !== 'number' || size <= 0) {
        throw new Error('Size must be a positive number');
    }
    
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

function unique(array) {
    if (!Array.isArray(array)) {
        throw new Error('Parameter must be an array');
    }
    return [...new Set(array)];
}

function flatten(array, depth = 1) {
    if (!Array.isArray(array)) {
        throw new Error('First parameter must be an array');
    }
    if (typeof depth !== 'number' || depth < 0) {
        throw new Error('Depth must be a non-negative number');
    }
    
    if (depth === 0) {
        return array.slice();
    }
    
    return array.reduce((acc, val) => {
        if (Array.isArray(val) && depth > 0) {
            acc.push(...flatten(val, depth - 1));
        } else {
            acc.push(val);
        }
        return acc;
    }, []);
}

/**
 * 物件處理函數
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    
    return cloned;
}

function pick(obj, keys) {
    if (typeof obj !== 'object' || obj === null) {
        throw new Error('First parameter must be an object');
    }
    if (!Array.isArray(keys)) {
        throw new Error('Second parameter must be an array');
    }
    
    const result = {};
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    
    return result;
}

function omit(obj, keys) {
    if (typeof obj !== 'object' || obj === null) {
        throw new Error('First parameter must be an object');
    }
    if (!Array.isArray(keys)) {
        throw new Error('Second parameter must be an array');
    }
    
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && !keys.includes(key)) {
            result[key] = obj[key];
        }
    }
    
    return result;
}

/**
 * 數字格式化函數
 */
function formatNumber(num, decimalPlaces = 2) {
    if (typeof num !== 'number') {
        throw new Error('First parameter must be a number');
    }
    if (typeof decimalPlaces !== 'number' || decimalPlaces < 0) {
        throw new Error('Decimal places must be a non-negative number');
    }
    
    return parseFloat(num.toFixed(decimalPlaces));
}

function formatCurrency(amount, currency = 'TWD', locale = 'zh-TW') {
    if (typeof amount !== 'number') {
        throw new Error('Amount must be a number');
    }
    
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * 日期處理函數
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    if (!(date instanceof Date)) {
        throw new Error('First parameter must be a Date object');
    }
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
}

function addDays(date, days) {
    if (!(date instanceof Date)) {
        throw new Error('First parameter must be a Date object');
    }
    if (typeof days !== 'number') {
        throw new Error('Second parameter must be a number');
    }
    
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * 防抖和節流函數
 */
function debounce(func, delay) {
    if (typeof func !== 'function') {
        throw new Error('First parameter must be a function');
    }
    if (typeof delay !== 'number' || delay < 0) {
        throw new Error('Delay must be a non-negative number');
    }
    
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, delay) {
    if (typeof func !== 'function') {
        throw new Error('First parameter must be a function');
    }
    if (typeof delay !== 'number' || delay < 0) {
        throw new Error('Delay must be a non-negative number');
    }
    
    let lastCall = 0;
    
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

module.exports = {
    capitalize,
    truncate,
    slugify,
    chunk,
    unique,
    flatten,
    deepClone,
    pick,
    omit,
    formatNumber,
    formatCurrency,
    formatDate,
    addDays,
    debounce,
    throttle
};