// 產品路由 - 包含效能和邏輯錯誤
const express = require('express');
const router = express.Router();

// Bug 1: 模擬產品資料 - 大量資料沒有適當處理
let products = [];

// Bug 2: 生成大量測試資料 - 會造成效能問題
for (let i = 1; i <= 10000; i++) {
    products.push({
        id: i,
        name: `Product ${i}`,
        description: `Description for product ${i}`.repeat(10), // Bug 3: 不必要的長描述
        price: Math.random() * 1000,
        category: ['electronics', 'clothing', 'books', 'food'][Math.floor(Math.random() * 4)],
        stock: Math.floor(Math.random() * 100),
        createdAt: new Date(),
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'] // Bug 4: 固定標籤
    });
}

// Bug 5: 獲取所有產品 - 沒有分頁，會返回大量資料
router.get('/', (req, res) => {
    // Bug 6: 同步處理大量資料
    const allProducts = products.map(product => {
        // Bug 7: 不必要的資料處理
        return {
            ...product,
            displayPrice: `$${product.price.toFixed(2)}`,
            availability: product.stock > 0 ? 'In Stock' : 'Out of Stock'
        };
    });
    
    // Bug 8: 沒有資料壓縮
    res.json(allProducts);
});

// Bug 9: 搜尋產品 - 效能問題
router.get('/search', (req, res) => {
    const { query, category, minPrice, maxPrice } = req.query;
    
    // Bug 10: 沒有輸入驗證
    // Bug 11: 低效的搜尋演算法
    let results = products.filter(product => {
        let matches = true;
        
        if (query) {
            // Bug 12: 區分大小寫的搜尋
            matches = matches && (
                product.name.includes(query) || 
                product.description.includes(query)
            );
        }
        
        if (category) {
            matches = matches && product.category === category;
        }
        
        if (minPrice) {
            // Bug 13: 沒有型別轉換
            matches = matches && product.price >= minPrice;
        }
        
        if (maxPrice) {
            // Bug 14: 沒有型別轉換
            matches = matches && product.price <= maxPrice;
        }
        
        return matches;
    });
    
    // Bug 15: 沒有限制搜尋結果數量
    res.json(results);
});

// Bug 16: 獲取單個產品 - 效能問題
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    // Bug 17: 低效的查找方式
    const product = products.find(p => p.id === parseInt(id));
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    // Bug 18: 不必要的相關產品查詢
    const relatedProducts = products.filter(p => 
        p.category === product.category && p.id !== product.id
    ).slice(0, 5);
    
    res.json({
        ...product,
        relatedProducts // Bug 19: 增加回應大小
    });
});

// Bug 20: 創建產品 - 缺少驗證
router.post('/', (req, res) => {
    const { name, description, price, category, stock } = req.body;
    
    // Bug 21: 沒有權限檢查
    // Bug 22: 沒有資料驗證
    
    const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1, // Bug 23: 低效的 ID 生成
        name,
        description,
        price: parseFloat(price), // Bug 24: 沒有錯誤處理
        category,
        stock: parseInt(stock), // Bug 25: 沒有錯誤處理
        createdAt: new Date(),
        tags: [] // Bug 26: 空標籤
    };
    
    products.push(newProduct);
    
    res.status(201).json(newProduct);
});

// Bug 27: 更新產品庫存 - 併發問題
router.patch('/:id/stock', (req, res) => {
    const { id } = req.params;
    const { quantity, operation } = req.body; // 'add' or 'subtract'
    
    const product = products.find(p => p.id === parseInt(id));
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    // Bug 28: 沒有併發控制
    if (operation === 'add') {
        product.stock += parseInt(quantity);
    } else if (operation === 'subtract') {
        // Bug 29: 沒有檢查庫存是否足夠
        product.stock -= parseInt(quantity);
    }
    
    // Bug 30: 負庫存問題
    res.json({ id: product.id, stock: product.stock });
});

// Bug 31: 獲取熱門產品 - 計算錯誤
router.get('/featured/popular', (req, res) => {
    // Bug 32: 沒有真實的受歡迎度指標
    const popularProducts = products
        .sort((a, b) => b.stock - a.stock) // Bug 33: 錯誤的排序邏輯
        .slice(0, 10)
        .map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            // Bug 34: 假的評分數據
            rating: Math.random() * 5,
            reviews: Math.floor(Math.random() * 1000)
        }));
    
    res.json(popularProducts);
});

// Bug 35: 刪除產品 - 沒有依賴檢查
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    // Bug 36: 沒有權限檢查
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    // Bug 37: 沒有檢查是否有待處理訂單
    products.splice(productIndex, 1);
    
    res.json({ message: 'Product deleted successfully' });
});

module.exports = router;