// 產品資料模組
// 管理所有產品相關的資料和操作

// 產品資料庫
const PRODUCTS = [
    {
        id: 'p001',
        name: '手機殼',
        price: 299,
        image: '📱',
        category: '配件',
        stock: 50,
        description: '防摔保護，多色可選'
    },
    {
        id: 'p002',
        name: '充電線',
        price: 199,
        image: '🔌',
        category: '配件',
        stock: 35,
        description: '快速充電，耐用材質'
    },
    {
        id: 'p003',
        name: '藍牙喇叭',
        price: 799,
        image: '🔊',
        category: '3C',
        stock: 20,
        description: '360度環繞音效'
    },
    {
        id: 'p004',
        name: '手機支架',
        price: 159,
        image: '📲',
        category: '配件',
        stock: 45,
        description: '多角度調整，穩固耐用'
    },
    {
        id: 'p005',
        name: '無線滑鼠',
        price: 499,
        image: '🖱️',
        category: '3C',
        stock: 25,
        description: '靜音設計，續航持久'
    },
    {
        id: 'p006',
        name: '螢幕保護貼',
        price: 99,
        image: '🛡️',
        category: '配件',
        stock: 60,
        description: '鋼化玻璃，防刮防爆'
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
        <div class="product-image">${product.image}</div>
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