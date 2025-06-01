// 數據分析工具核心功能
// 這些函數需要完整的測試覆蓋

class DataProcessor {
    // 數據解析功能
    static parseData(input) {
        if (!input || typeof input !== 'string') {
            return [];
        }
        
        // 支援逗號分隔或換行分隔
        const rawData = input.trim()
            .split(/[,\n]/)
            .map(item => item.trim())
            .filter(item => item !== '');
            
        return rawData.map(item => parseFloat(item)).filter(num => !isNaN(num));
    }
    
    static validateNumbers(data) {
        if (!Array.isArray(data)) {
            return { valid: [], invalid: [] };
        }
        
        const valid = [];
        const invalid = [];
        
        data.forEach(item => {
            if (typeof item === 'number' && !isNaN(item) && isFinite(item)) {
                valid.push(item);
            } else {
                invalid.push(item);
            }
        });
        
        return { valid, invalid };
    }
    
    static cleanData(data) {
        const { valid } = this.validateNumbers(data);
        return valid;
    }
    
    // 基本統計功能
    static calculateSum(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return 0;
        }
        return data.reduce((sum, num) => sum + num, 0);
    }
    
    static calculateAverage(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return 0;
        }
        return this.calculateSum(data) / data.length;
    }
    
    static findMinMax(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return { min: null, max: null };
        }
        return {
            min: Math.min(...data),
            max: Math.max(...data)
        };
    }
    
    // 進階統計功能
    static calculateMedian(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return 0;
        }
        
        const sorted = [...data].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        return sorted[middle];
    }
    
    static calculateStandardDeviation(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return 0;
        }
        
        const mean = this.calculateAverage(data);
        const squaredDifferences = data.map(num => Math.pow(num - mean, 2));
        const variance = this.calculateAverage(squaredDifferences);
        return Math.sqrt(variance);
    }
    
    static calculateVariance(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return 0;
        }
        
        const mean = this.calculateAverage(data);
        const squaredDifferences = data.map(num => Math.pow(num - mean, 2));
        return this.calculateAverage(squaredDifferences);
    }
    
    static calculateRange(data) {
        const { min, max } = this.findMinMax(data);
        if (min === null || max === null) {
            return 0;
        }
        return max - min;
    }
    
    // 數據品質分析
    static findDuplicates(data) {
        if (!Array.isArray(data)) {
            return [];
        }
        
        const seen = new Set();
        const duplicates = new Set();
        
        data.forEach(item => {
            if (seen.has(item)) {
                duplicates.add(item);
            }
            seen.add(item);
        });
        
        return Array.from(duplicates);
    }
    
    static calculateCompleteness(originalData, cleanedData) {
        if (!Array.isArray(originalData) || originalData.length === 0) {
            return 100;
        }
        return (cleanedData.length / originalData.length) * 100;
    }
    
    static checkDataQuality(data) {
        const cleanData = this.cleanData(data);
        const duplicates = this.findDuplicates(cleanData);
        
        return {
            totalCount: data.length,
            validCount: cleanData.length,
            invalidCount: data.length - cleanData.length,
            duplicateCount: duplicates.length,
            completeness: this.calculateCompleteness(data, cleanData)
        };
    }
    
    // 進階分析
    static detectOutliers(data, method = 'iqr') {
        if (!Array.isArray(data) || data.length < 4) {
            return [];
        }
        
        const sorted = [...data].sort((a, b) => a - b);
        
        if (method === 'iqr') {
            const q1Index = Math.floor(sorted.length * 0.25);
            const q3Index = Math.floor(sorted.length * 0.75);
            const q1 = sorted[q1Index];
            const q3 = sorted[q3Index];
            const iqr = q3 - q1;
            
            const lowerBound = q1 - 1.5 * iqr;
            const upperBound = q3 + 1.5 * iqr;
            
            return data.filter(num => num < lowerBound || num > upperBound);
        }
        
        return [];
    }
    
    static calculateQuartiles(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return { q1: 0, q2: 0, q3: 0, iqr: 0 };
        }
        
        const sorted = [...data].sort((a, b) => a - b);
        const q1Index = Math.floor(sorted.length * 0.25);
        const q2Index = Math.floor(sorted.length * 0.5);
        const q3Index = Math.floor(sorted.length * 0.75);
        
        const q1 = sorted[q1Index];
        const q2 = sorted[q2Index];
        const q3 = sorted[q3Index];
        
        return {
            q1,
            q2,
            q3,
            iqr: q3 - q1
        };
    }
    
    static calculateSkewness(data) {
        if (!Array.isArray(data) || data.length < 3) {
            return 0;
        }
        
        const mean = this.calculateAverage(data);
        const stdDev = this.calculateStandardDeviation(data);
        
        if (stdDev === 0) return 0;
        
        const n = data.length;
        const skewness = data.reduce((sum, num) => {
            return sum + Math.pow((num - mean) / stdDev, 3);
        }, 0);
        
        return (n / ((n - 1) * (n - 2))) * skewness;
    }
    
    static calculateKurtosis(data) {
        if (!Array.isArray(data) || data.length < 4) {
            return 0;
        }
        
        const mean = this.calculateAverage(data);
        const stdDev = this.calculateStandardDeviation(data);
        
        if (stdDev === 0) return 0;
        
        const n = data.length;
        const kurtosis = data.reduce((sum, num) => {
            return sum + Math.pow((num - mean) / stdDev, 4);
        }, 0);
        
        return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * kurtosis - 
               (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
    }
}