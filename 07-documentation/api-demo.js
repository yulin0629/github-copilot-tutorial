// API 文檔生成實驗室 - 演示邏輯
// 模擬 API 回應，展示文檔生成前的系統狀態

// 模擬 API 資料
const mockAPIResponses = {
    'users/register': {
        success: true,
        data: {
            id: 1,
            username: "testuser",
            email: "test@example.com",
            createdAt: new Date().toISOString()
        },
        message: "用戶註冊成功"
    },
    
    'users/login': {
        success: true,
        data: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            user: {
                id: 1,
                username: "testuser",
                email: "test@example.com"
            }
        },
        message: "登入成功"
    },
    
    'tasks': {
        success: true,
        data: [
            {
                id: 1,
                title: "完成 API 文檔",
                description: "為任務管理系統撰寫完整的 API 文檔",
                status: "in_progress",
                priority: "high",
                projectId: 1,
                assigneeId: 1,
                createdAt: "2025-06-01T10:00:00Z",
                updatedAt: "2025-06-02T14:30:00Z",
                dueDate: "2025-06-05T23:59:59Z"
            },
            {
                id: 2,
                title: "設計用戶介面",
                description: "設計任務管理的前端用戶介面",
                status: "pending",
                priority: "medium",
                projectId: 1,
                assigneeId: 2,
                createdAt: "2025-06-01T11:00:00Z",
                updatedAt: "2025-06-01T11:00:00Z",
                dueDate: "2025-06-10T23:59:59Z"
            },
            {
                id: 3,
                title: "實作用戶認證",
                description: "實作 JWT 基礎的用戶認證系統",
                status: "completed",
                priority: "high",
                projectId: 2,
                assigneeId: 1,
                createdAt: "2025-05-28T09:00:00Z",
                updatedAt: "2025-05-31T16:45:00Z",
                dueDate: "2025-06-01T23:59:59Z"
            }
        ],
        pagination: {
            page: 1,
            limit: 10,
            total: 3,
            totalPages: 1
        }
    },
    
    'tasks/create': {
        success: true,
        data: {
            id: 4,
            title: "新任務",
            description: "這是一個新建立的任務",
            status: "pending",
            priority: "medium",
            projectId: 1,
            assigneeId: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            dueDate: null
        },
        message: "任務建立成功"
    }
};

// 測試 API 功能
function testAPI() {
    const endpoint = document.getElementById('endpoint').value;
    const requestBody = document.getElementById('requestBody').value;
    const resultArea = document.getElementById('apiResult');
    
    // 顯示載入狀態
    resultArea.innerHTML = '正在請求 API...';
    
    // 模擬網路延遲
    setTimeout(() => {
        try {
            // 獲取模擬回應
            const response = mockAPIResponses[endpoint];
            
            if (!response) {
                throw new Error('找不到對應的 API 端點');
            }
            
            // 解析請求體（如果有的話）
            let parsedRequest = null;
            if (requestBody.trim()) {
                try {
                    parsedRequest = JSON.parse(requestBody);
                } catch (e) {
                    throw new Error('請求體 JSON 格式錯誤');
                }
            }
            
            // 根據端點處理特定邏輯
            let finalResponse = { ...response };
            
            if (endpoint === 'users/register' && parsedRequest) {
                finalResponse.data = {
                    ...finalResponse.data,
                    username: parsedRequest.username || finalResponse.data.username,
                    email: parsedRequest.email || finalResponse.data.email
                };
            }
            
            if (endpoint === 'tasks/create' && parsedRequest) {
                finalResponse.data = {
                    ...finalResponse.data,
                    title: parsedRequest.title || finalResponse.data.title,
                    description: parsedRequest.description || finalResponse.data.description,
                    priority: parsedRequest.priority || finalResponse.data.priority
                };
            }
            
            // 顯示成功回應
            resultArea.innerHTML = `<div style="color: #28a745; margin-bottom: 10px;">
                <strong>✅ API 回應成功 (200 OK)</strong>
            </div>
            <div style="color: #6c757d; margin-bottom: 10px;">
                <strong>端點:</strong> ${getEndpointMethod(endpoint)} /api/${endpoint.replace('/', '/')}
            </div>
            ${parsedRequest ? `<div style="color: #6c757d; margin-bottom: 10px;">
                <strong>請求體:</strong>
                ${JSON.stringify(parsedRequest, null, 2)}
            </div>` : ''}
            <div style="color: #6c757d; margin-bottom: 10px;">
                <strong>回應:</strong>
            </div>
            <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; border-left: 3px solid #28a745;">
                ${JSON.stringify(finalResponse, null, 2)}
            </div>`;
            
        } catch (error) {
            // 顯示錯誤回應
            resultArea.innerHTML = `<div style="color: #dc3545; margin-bottom: 10px;">
                <strong>❌ API 請求失敗 (400 Bad Request)</strong>
            </div>
            <div style="color: #6c757d; margin-bottom: 10px;">
                <strong>錯誤訊息:</strong>
            </div>
            <div style="background: #f8d7da; padding: 10px; border-radius: 4px; border-left: 3px solid #dc3545;">
                {
                  "success": false,
                  "error": "${error.message}",
                  "code": 400
                }
            </div>`;
        }
    }, 1000);
}

// 獲取端點的 HTTP 方法
function getEndpointMethod(endpoint) {
    const methods = {
        'users/register': 'POST',
        'users/login': 'POST',
        'tasks': 'GET',
        'tasks/create': 'POST'
    };
    return methods[endpoint] || 'GET';
}

// 更新請求體範例
function updateRequestBodyExample() {
    const endpoint = document.getElementById('endpoint').value;
    const requestBodyArea = document.getElementById('requestBody');
    
    const examples = {
        'users/register': `{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securePassword123"
}`,
        'users/login': `{
  "email": "test@example.com",
  "password": "password123"
}`,
        'tasks': '',
        'tasks/create': `{
  "title": "新的任務",
  "description": "這是一個新建立的任務描述",
  "priority": "high",
  "projectId": 1,
  "dueDate": "2025-06-15T23:59:59Z"
}`
    };
    
    requestBodyArea.value = examples[endpoint] || '';
    requestBodyArea.placeholder = examples[endpoint] ? '請求體 JSON' : '此端點不需要請求體';
}

// 頁面載入完成後的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 監聽端點選擇變化
    const endpointSelect = document.getElementById('endpoint');
    endpointSelect.addEventListener('change', updateRequestBodyExample);
    
    // 初始化請求體範例
    updateRequestBodyExample();
    
    console.log('📚 API 文檔生成實驗室已載入');
    console.log('🤖 等待 Agent 80% 模式展示文檔生成能力！');
    
    // 模擬文檔狀態檢查
    setTimeout(() => {
        console.log('📋 文檔狀態檢查：');
        console.log('  ❌ API 參考文檔：缺失');
        console.log('  ❌ 開發者指南：缺失');
        console.log('  ❌ 程式碼註解：缺失');
        console.log('  ❌ 部署文檔：缺失');
        console.log('  ❌ 測試文檔：缺失');
        console.log('  ❌ 架構說明：缺失');
        console.log('🎯 Agent 任務：自動生成完整文檔體系');
    }, 2000);
});

// 模擬文檔生成進度（供 Agent 調用）
function simulateDocumentationProgress(type) {
    const docCard = document.querySelector(`[data-doc-type="${type}"]`);
    if (docCard) {
        docCard.classList.remove('missing');
        docCard.classList.add('available');
        docCard.querySelector('.status').textContent = '✅ 已生成';
        docCard.querySelector('p').textContent = `${type} 已由 Agent 自動生成`;
    }
}

// 展示 Agent 生成的文檔結果
function showGeneratedDocumentation(docs) {
    console.log('🎉 Agent 文檔生成完成！');
    docs.forEach(doc => {
        console.log(`📄 ${doc.type}：${doc.status}`);
        if (doc.preview) {
            console.log(`   預覽：${doc.preview.substring(0, 100)}...`);
        }
    });
}