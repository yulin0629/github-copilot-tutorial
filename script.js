// 複製 Agent 設置指令
async function copyAgentPrompt() {
    const promptElement = document.getElementById('agentPrompt');
    const button = event.target;
    const originalText = button.textContent;
    
    try {
        await navigator.clipboard.writeText(promptElement.textContent);
        button.textContent = '已複製';
        button.style.background = '#48bb78';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#007aff';
        }, 2000);
    } catch (err) {
        // 降級方案
        const textArea = document.createElement('textarea');
        textArea.value = promptElement.textContent;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            button.textContent = '已複製';
            button.style.background = '#48bb78';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#007aff';
            }, 2000);
        } catch (err) {
            button.textContent = '複製失敗';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
        
        document.body.removeChild(textArea);
    }
}

// 監聽 details 元素的開啟/關閉
document.addEventListener('DOMContentLoaded', function() {
    const detailsElement = document.querySelector('details');
    const copyButton = detailsElement.querySelector('button[onclick="copyAgentPrompt()"]');
    
    // 監聽 toggle 事件
    detailsElement.addEventListener('toggle', function() {
        if (detailsElement.open) {
            copyButton.style.display = 'block';
        } else {
            copyButton.style.display = 'none';
        }
    });
});

// 儲存和取得捲動位置
function saveScrollPosition(path, position) {
    localStorage.setItem(`scroll_${path}`, position);
}

function getScrollPosition(path) {
    return parseInt(localStorage.getItem(`scroll_${path}`) || '0');
}

// 儲存當前文件路徑
let currentMarkdownPath = '';

// 載入並顯示 Markdown
async function loadMarkdown(path, title) {
    const modal = document.getElementById('markdownModal');
    const body = document.getElementById('markdownBody');
    const container = body.parentElement;
    
    // 儲存當前路徑
    currentMarkdownPath = path;
    
    // 顯示 Modal
    modal.style.display = 'block';
    body.innerHTML = '<div class="markdown-loading">載入中...</div>';
    
    try {
        // Fetch Markdown 檔案，加入防快取參數
        const timestamp = new Date().getTime();
        const response = await fetch(`${path}?t=${timestamp}`, {
            cache: 'no-cache'
        });
        if (!response.ok) {
            throw new Error('無法載入文件');
        }
        
        const markdown = await response.text();
        
        // 使用 marked.js 轉換 Markdown 為 HTML
        const html = marked.parse(markdown);
        
        // 顯示內容
        body.innerHTML = html;
        
        // 為所有程式碼區塊添加複製按鈕
        addCopyButtons();
        
        // 恢復上次的捲動位置
        const savedPosition = getScrollPosition(path);
        if (savedPosition > 0) {
            // 使用 setTimeout 確保內容已經渲染
            setTimeout(() => {
                container.scrollTop = savedPosition;
            }, 100);
        } else {
            // 如果沒有儲存的位置，滾動到頂部
            container.scrollTop = 0;
        }
        
        // 監聽捲動事件，儲存位置
        container.onscroll = debounce(() => {
            if (currentMarkdownPath) {
                saveScrollPosition(currentMarkdownPath, container.scrollTop);
            }
        }, 300);
        
    } catch (error) {
        body.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #f00;">
                <h2>載入失敗</h2>
                <p>無法載入教學內容</p>
                <p style="color: #666; font-size: 0.9rem;">${error.message}</p>
            </div>
        `;
    }
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

// 關閉 Markdown Modal
function closeMarkdown() {
    const modal = document.getElementById('markdownModal');
    const container = document.getElementById('markdownBody').parentElement;
    
    // 儲存最後的捲動位置
    if (currentMarkdownPath) {
        saveScrollPosition(currentMarkdownPath, container.scrollTop);
    }
    
    // 清理事件監聽器
    container.onscroll = null;
    
    // 關閉 Modal
    modal.style.display = 'none';
}

// 點擊 Modal 外部關閉
window.onclick = function(event) {
    const modal = document.getElementById('markdownModal');
    if (event.target == modal) {
        closeMarkdown();
    }
}

// ESC 鍵關閉
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMarkdown();
    }
});

// 添加複製按鈕到程式碼區塊
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.markdown-content pre');
    
    codeBlocks.forEach((block, index) => {
        // 獲取程式碼語言類型
        const codeElement = block.querySelector('code');
        const classList = codeElement.className.split(' ');
        let language = '';
        classList.forEach(cls => {
            if (cls.startsWith('language-')) {
                language = cls.replace('language-', '').toUpperCase();
            }
        });
        
        // 創建按鈕容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'position: absolute; top: 5px; right: 5px; display: flex; gap: 5px; align-items: center;';
        
        // 如果有語言標示，添加語言標籤
        if (language) {
            const langLabel = document.createElement('span');
            langLabel.className = 'lang-label';
            langLabel.style.cssText = 'font-size: 12px; color: #666; background: #f0f0f0; padding: 2px 8px; border-radius: 3px;';
            langLabel.textContent = language;
            buttonContainer.appendChild(langLabel);
        }
        
        // 創建複製按鈕
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = '複製';
        button.setAttribute('data-code-index', index);
        
        // 複製功能
        button.addEventListener('click', async function() {
            const code = block.querySelector('code');
            let textToCopy = code.textContent || code.innerText;
            
            // 移除多餘的空白
            textToCopy = textToCopy.trim();
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // 顯示複製成功
                button.textContent = '已複製';
                button.classList.add('copied');
                
                // 2秒後恢復
                setTimeout(() => {
                    button.textContent = '複製';
                    button.classList.remove('copied');
                }, 2000);
                
            } catch (err) {
                // 降級方案：使用傳統方法
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    button.textContent = '已複製';
                    button.classList.add('copied');
                    
                    setTimeout(() => {
                        button.textContent = '複製';
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    button.textContent = '複製失敗';
                    setTimeout(() => {
                        button.textContent = '複製';
                    }, 2000);
                }
                
                document.body.removeChild(textArea);
            }
        });
        
        // 添加按鈕到容器
        buttonContainer.appendChild(button);
        
        // 添加容器到程式碼區塊
        block.appendChild(buttonContainer);
    });
}

// 生成 QR Code
window.onload = function() {
    const currentUrl = window.location.href;
    const qrcodeContainer = document.getElementById('qrcode');
    
    // 生成 QR Code
    new QRCode(qrcodeContainer, {
        text: currentUrl,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // 初始化場景滾動
    initScenarioScroll();
}

// 場景滾動功能
function initScenarioScroll() {
    const scenarioList = document.querySelector('.scenario-list');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const scenarioItems = document.querySelectorAll('.scenario-item');
    const scenarioWrapper = document.querySelector('.scenario-wrapper');
    
    if (!scenarioList || !scrollDots.length || !scenarioItems.length) return;
    
    // 計算每個項目的寬度和間距
    const itemWidth = scenarioItems[0].offsetWidth + 20; // 包含 gap
    
    // 更新滾動指示器
    function updateScrollIndicator() {
        const scrollLeft = scenarioList.scrollLeft;
        const scrollWidth = scenarioList.scrollWidth;
        const clientWidth = scenarioList.clientWidth;
        
        // 計算當前顯示的場景索引
        const currentIndex = Math.round(scrollLeft / itemWidth);
        
        // 更新指示器狀態
        scrollDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // 檢查滾動位置，控制左右漸變
        if (scrollLeft > 10) {
            scenarioWrapper.classList.add('scrolled');
        } else {
            scenarioWrapper.classList.remove('scrolled');
        }
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scenarioWrapper.classList.add('scrolled-end');
        } else {
            scenarioWrapper.classList.remove('scrolled-end');
        }
    }
    
    // 監聽滾動事件
    let scrollTimeout;
    scenarioList.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateScrollIndicator, 50);
    });
    
    // 點擊指示器滾動到對應場景
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const targetScroll = index * itemWidth;
            scenarioList.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        });
    });
    
    // 初始化指示器狀態
    updateScrollIndicator();
    
    // 添加觸摸滑動支持
    let startX = 0;
    let scrollLeftStart = 0;
    let isDragging = false;
    
    scenarioList.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - scenarioList.offsetLeft;
        scrollLeftStart = scenarioList.scrollLeft;
        scenarioList.style.cursor = 'grabbing';
    });
    
    scenarioList.addEventListener('mouseleave', () => {
        isDragging = false;
        scenarioList.style.cursor = 'grab';
    });
    
    scenarioList.addEventListener('mouseup', () => {
        isDragging = false;
        scenarioList.style.cursor = 'grab';
    });
    
    scenarioList.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scenarioList.offsetLeft;
        const walk = (x - startX) * 1.5;
        scenarioList.scrollLeft = scrollLeftStart - walk;
    });
}