// 計算器函數庫
// 這些函數需要完整的單元測試

/**
 * 基礎數學運算
 */
function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    return a + b;
}

function subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    return a - b;
}

function multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    return a * b;
}

function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
}

/**
 * 進階數學運算
 */
function power(base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    return Math.pow(base, exponent);
}

function sqrt(number) {
    if (typeof number !== 'number') {
        throw new Error('Parameter must be a number');
    }
    if (number < 0) {
        throw new Error('Cannot calculate square root of negative number');
    }
    return Math.sqrt(number);
}

function factorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        throw new Error('Parameter must be an integer');
    }
    if (n < 0) {
        throw new Error('Factorial is not defined for negative numbers');
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

/**
 * 陣列運算
 */
function sum(numbers) {
    if (!Array.isArray(numbers)) {
        throw new Error('Parameter must be an array');
    }
    if (numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((total, num) => {
        if (typeof num !== 'number') {
            throw new Error('All array elements must be numbers');
        }
        return total + num;
    }, 0);
}

function average(numbers) {
    if (!Array.isArray(numbers)) {
        throw new Error('Parameter must be an array');
    }
    if (numbers.length === 0) {
        throw new Error('Cannot calculate average of empty array');
    }
    return sum(numbers) / numbers.length;
}

function max(numbers) {
    if (!Array.isArray(numbers)) {
        throw new Error('Parameter must be an array');
    }
    if (numbers.length === 0) {
        throw new Error('Cannot find maximum of empty array');
    }
    return Math.max(...numbers);
}

function min(numbers) {
    if (!Array.isArray(numbers)) {
        throw new Error('Parameter must be an array');
    }
    if (numbers.length === 0) {
        throw new Error('Cannot find minimum of empty array');
    }
    return Math.min(...numbers);
}

/**
 * 複雜計算
 */
function quadraticFormula(a, b, c) {
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
        throw new Error('All parameters must be numbers');
    }
    if (a === 0) {
        throw new Error('Coefficient a cannot be zero in quadratic equation');
    }
    
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant < 0) {
        return { real: false, roots: [] };
    } else if (discriminant === 0) {
        const root = -b / (2 * a);
        return { real: true, roots: [root] };
    } else {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return { real: true, roots: [root1, root2] };
    }
}

function percentage(value, total) {
    if (typeof value !== 'number' || typeof total !== 'number') {
        throw new Error('Both parameters must be numbers');
    }
    if (total === 0) {
        throw new Error('Total cannot be zero');
    }
    return (value / total) * 100;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    power,
    sqrt,
    factorial,
    sum,
    average,
    max,
    min,
    quadraticFormula,
    percentage
};