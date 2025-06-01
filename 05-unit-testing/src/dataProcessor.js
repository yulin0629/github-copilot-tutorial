// 資料處理函數庫
// 包含非同步處理和複雜邏輯，需要特殊的測試策略

const axios = require('axios');

/**
 * 非同步資料獲取
 */
async function fetchUserData(userId) {
    if (typeof userId !== 'number' && typeof userId !== 'string') {
        throw new Error('User ID must be a number or string');
    }
    
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

async function fetchMultipleUsers(userIds) {
    if (!Array.isArray(userIds)) {
        throw new Error('User IDs must be an array');
    }
    
    const promises = userIds.map(id => fetchUserData(id));
    const results = await Promise.allSettled(promises);
    
    return results.map((result, index) => ({
        userId: userIds[index],
        status: result.status,
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason.message : null
    }));
}

/**
 * 資料轉換函數
 */
function transformUserData(userData) {
    if (!userData || typeof userData !== 'object') {
        throw new Error('User data must be an object');
    }
    
    const { id, name, email, phone, address, company } = userData;
    
    return {
        id,
        displayName: name,
        contact: {
            email,
            phone: phone ? phone.replace(/[^\d]/g, '') : null
        },
        location: address ? {
            city: address.city,
            coordinates: address.geo ? {
                lat: parseFloat(address.geo.lat),
                lng: parseFloat(address.geo.lng)
            } : null
        } : null,
        company: company ? company.name : null
    };
}

function aggregateUsersByCity(users) {
    if (!Array.isArray(users)) {
        throw new Error('Users must be an array');
    }
    
    return users.reduce((acc, user) => {
        if (!user.location || !user.location.city) {
            return acc;
        }
        
        const city = user.location.city;
        if (!acc[city]) {
            acc[city] = [];
        }
        
        acc[city].push(user);
        return acc;
    }, {});
}

/**
 * 資料過濾和排序
 */
function filterAndSortUsers(users, filters = {}, sortBy = 'displayName') {
    if (!Array.isArray(users)) {
        throw new Error('Users must be an array');
    }
    
    let filtered = users.filter(user => {
        if (filters.city && (!user.location || user.location.city !== filters.city)) {
            return false;
        }
        
        if (filters.hasEmail && !user.contact.email) {
            return false;
        }
        
        if (filters.company && user.company !== filters.company) {
            return false;
        }
        
        return true;
    });
    
    return filtered.sort((a, b) => {
        const aValue = getNestedValue(a, sortBy);
        const bValue = getNestedValue(b, sortBy);
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue);
        }
        
        return aValue - bValue;
    });
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : '';
    }, obj);
}

/**
 * 資料統計函數
 */
function calculateUserStatistics(users) {
    if (!Array.isArray(users)) {
        throw new Error('Users must be an array');
    }
    
    const total = users.length;
    const withEmail = users.filter(user => user.contact && user.contact.email).length;
    const withPhone = users.filter(user => user.contact && user.contact.phone).length;
    const withLocation = users.filter(user => user.location).length;
    const withCompany = users.filter(user => user.company).length;
    
    const cities = [...new Set(
        users
            .filter(user => user.location && user.location.city)
            .map(user => user.location.city)
    )];
    
    const companies = [...new Set(
        users
            .filter(user => user.company)
            .map(user => user.company)
    )];
    
    return {
        total,
        contact: {
            withEmail,
            withPhone,
            emailPercentage: total > 0 ? (withEmail / total) * 100 : 0,
            phonePercentage: total > 0 ? (withPhone / total) * 100 : 0
        },
        location: {
            withLocation,
            cities,
            cityCount: cities.length,
            locationPercentage: total > 0 ? (withLocation / total) * 100 : 0
        },
        company: {
            withCompany,
            companies,
            companyCount: companies.length,
            companyPercentage: total > 0 ? (withCompany / total) * 100 : 0
        }
    };
}

/**
 * 批次處理函數
 */
async function processBatch(items, processor, batchSize = 5) {
    if (!Array.isArray(items)) {
        throw new Error('Items must be an array');
    }
    if (typeof processor !== 'function') {
        throw new Error('Processor must be a function');
    }
    if (typeof batchSize !== 'number' || batchSize <= 0) {
        throw new Error('Batch size must be a positive number');
    }
    
    const results = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const promises = batch.map(item => processor(item));
        
        try {
            const batchResults = await Promise.all(promises);
            results.push(...batchResults);
        } catch (error) {
            throw new Error(`Batch processing failed at index ${i}: ${error.message}`);
        }
    }
    
    return results;
}

/**
 * 資料驗證和清理
 */
function validateAndCleanUserData(userData) {
    if (!userData || typeof userData !== 'object') {
        return { valid: false, errors: ['User data must be an object'] };
    }
    
    const errors = [];
    const cleaned = {};
    
    // 驗證 ID
    if (!userData.id) {
        errors.push('ID is required');
    } else {
        cleaned.id = userData.id;
    }
    
    // 驗證和清理 name
    if (!userData.displayName || typeof userData.displayName !== 'string') {
        errors.push('Display name is required and must be a string');
    } else {
        cleaned.displayName = userData.displayName.trim();
    }
    
    // 驗證 email
    if (userData.contact && userData.contact.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.contact.email)) {
            errors.push('Invalid email format');
        } else {
            cleaned.contact = cleaned.contact || {};
            cleaned.contact.email = userData.contact.email.toLowerCase().trim();
        }
    }
    
    // 驗證 phone
    if (userData.contact && userData.contact.phone) {
        const phoneRegex = /^\d{10,15}$/;
        if (!phoneRegex.test(userData.contact.phone)) {
            errors.push('Invalid phone format');
        } else {
            cleaned.contact = cleaned.contact || {};
            cleaned.contact.phone = userData.contact.phone;
        }
    }
    
    return {
        valid: errors.length === 0,
        errors,
        cleaned: errors.length === 0 ? cleaned : null
    };
}

module.exports = {
    fetchUserData,
    fetchMultipleUsers,
    transformUserData,
    aggregateUsersByCity,
    filterAndSortUsers,
    calculateUserStatistics,
    processBatch,
    validateAndCleanUserData
};