// 驗證函數庫
// 需要為各種驗證場景撰寫測試

/**
 * 基礎驗證函數
 */
function isEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function isPhoneNumber(phone) {
    if (typeof phone !== 'string') {
        return false;
    }
    // 支援台灣手機號碼格式
    const phoneRegex = /^09\d{8}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
}

function isURL(url) {
    if (typeof url !== 'string') {
        return false;
    }
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * 密碼驗證
 */
function validatePassword(password) {
    if (typeof password !== 'string') {
        return {
            valid: false,
            errors: ['Password must be a string']
        };
    }
    
    const errors = [];
    
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one digit');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * 信用卡驗證
 */
function validateCreditCard(cardNumber) {
    if (typeof cardNumber !== 'string') {
        return false;
    }
    
    // 移除空格和破折號
    const cleaned = cardNumber.replace(/[\s-]/g, '');
    
    // 檢查是否只包含數字
    if (!/^\d+$/.test(cleaned)) {
        return false;
    }
    
    // 檢查長度
    if (cleaned.length < 13 || cleaned.length > 19) {
        return false;
    }
    
    // Luhn 演算法驗證
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

/**
 * 年齡驗證
 */
function validateAge(birthDate, minAge = 0, maxAge = 150) {
    if (!(birthDate instanceof Date) && typeof birthDate !== 'string') {
        throw new Error('Birth date must be a Date object or string');
    }
    
    const birth = birthDate instanceof Date ? birthDate : new Date(birthDate);
    
    if (isNaN(birth.getTime())) {
        throw new Error('Invalid birth date');
    }
    
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return {
        age,
        valid: age >= minAge && age <= maxAge
    };
}

/**
 * 身分證字號驗證（台灣）
 */
function validateTaiwanID(id) {
    if (typeof id !== 'string') {
        return false;
    }
    
    if (!/^[A-Z]\d{9}$/.test(id)) {
        return false;
    }
    
    // 英文字母對應數字
    const letterMap = {
        'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16,
        'H': 17, 'I': 34, 'J': 18, 'K': 19, 'L': 20, 'M': 21, 'N': 22,
        'O': 35, 'P': 23, 'Q': 24, 'R': 25, 'S': 26, 'T': 27, 'U': 28,
        'V': 29, 'W': 32, 'X': 30, 'Y': 31, 'Z': 33
    };
    
    const firstLetter = id[0];
    const letterValue = letterMap[firstLetter];
    
    if (!letterValue) {
        return false;
    }
    
    // 檢查號碼計算
    let sum = Math.floor(letterValue / 10) + (letterValue % 10) * 9;
    
    for (let i = 1; i < 9; i++) {
        sum += parseInt(id[i]) * (9 - i);
    }
    
    const checkDigit = parseInt(id[9]);
    return (sum + checkDigit) % 10 === 0;
}

/**
 * 範圍驗證
 */
function isInRange(value, min, max, inclusive = true) {
    if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('All parameters must be numbers');
    }
    
    if (min > max) {
        throw new Error('Minimum value cannot be greater than maximum value');
    }
    
    if (inclusive) {
        return value >= min && value <= max;
    } else {
        return value > min && value < max;
    }
}

/**
 * 陣列驗證
 */
function validateArray(arr, validationFn) {
    if (!Array.isArray(arr)) {
        throw new Error('First parameter must be an array');
    }
    
    if (typeof validationFn !== 'function') {
        throw new Error('Second parameter must be a function');
    }
    
    const results = [];
    
    for (let i = 0; i < arr.length; i++) {
        try {
            const isValid = validationFn(arr[i]);
            results.push({
                index: i,
                value: arr[i],
                valid: Boolean(isValid)
            });
        } catch (error) {
            results.push({
                index: i,
                value: arr[i],
                valid: false,
                error: error.message
            });
        }
    }
    
    return {
        allValid: results.every(r => r.valid),
        results
    };
}

module.exports = {
    isEmail,
    isPhoneNumber,
    isURL,
    validatePassword,
    validateCreditCard,
    validateAge,
    validateTaiwanID,
    isInRange,
    validateArray
};