// 產品資料模組
// 管理所有產品相關的資料和操作

// 產品資料庫
const PRODUCTS = [
    {
        id: 'p001',
        name: '無線藍牙耳機',
        price: 2500,
        image: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=藍牙耳機',
        category: '3C',
        stock: 15,
        description: '高品質音效，持久續航'
    },
    {
        id: 'p002',
        name: '機械式鍵盤',
        price: 3200,
        image: 'https://via.placeholder.com/200x200/E24A4A/FFFFFF?text=機械鍵盤',
        category: '3C',
        stock: 8,
        description: '青軸設計，打字手感極佳'
    },
    {
        id: 'p003',
        name: '人體工學滑鼠',
        price: 1200,
        image: 'https://via.placeholder.com/200x200/4AE290/FFFFFF?text=滑鼠',
        category: '3C',
        stock: 20,
        description: '符合人體工學，減少手腕負擔'
    },
    {
        id: 'p004',
        name: '筆記型電腦支架',
        price: 800,
        image: 'https://via.placeholder.com/200x200/E2A04A/FFFFFF?text=支架',
        category: '配件',
        stock: 25,
        description: '可調整高度，改善姿勢'
    },
    {
        id: 'p005',
        name: 'USB-C 集線器',
        price: 1500,
        image: 'https://via.placeholder.com/200x200/A04AE2/FFFFFF?text=集線器',
        category: '配件',
        stock: 12,
        description: '多合一擴充，支援4K輸出'
    },
    {
        id: 'p006',
        name: '無線充電板',
        price: 600,
        image: 'https://via.placeholder.com/200x200/4AE2A0/FFFFFF?text=充電板',
        category: '配件',
        stock: 30,
        description: '快速充電，支援多種裝置'
    }
];

// 取得所有產品
function getAllProducts() {
    return deepClone(PRODUCTS);
}

// 根據 ID 取得產品
function getProductById(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    return product ? deepClone(product) : null;
}

// 根據類別篩選產品
function getProductsByCategory(category) {
    return PRODUCTS.filter(p => p.category === category).map(p => deepClone(p));
}

// 檢查產品庫存
function checkStock(productId, quantity) {
    const product = PRODUCTS.find(p => p.id === productId);
    return product ? product.stock >= quantity : false;
}

// 更新產品庫存
function updateStock(productId, quantity) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product && product.stock >= quantity) {
        product.stock -= quantity;
        return true;
    }
    return false;
}

// 渲染產品列表
function renderProducts() {
    const productList = document.getElementById('productList');
    if (!productList) return;
    
    productList.innerHTML = '';
    
    PRODUCTS.forEach(product => {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
    });
}

// 建立產品卡片
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <p class="price">${formatCurrency(product.price)}</p>
        <p class="stock">庫存: ${product.stock}</p>
        <button class="add-to-cart-btn" data-product-id="${product.id}" 
                ${product.stock === 0 ? 'disabled' : ''}>
            ${product.stock === 0 ? '已售完' : '加入購物車'}
        </button>
    `;
    
    return card;
}

// 搜尋產品
function searchProducts(keyword) {
    keyword = keyword.toLowerCase();
    return PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    );
}

// 取得產品分類列表
function getCategories() {
    const categories = new Set(PRODUCTS.map(p => p.category));
    return Array.from(categories);
}