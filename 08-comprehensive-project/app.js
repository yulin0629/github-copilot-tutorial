// 場景8：Agent 專案總監 - 端到端自主開發
// 模擬 Agent 完全主導的專案開發流程

class AgentProjectDirector {
    constructor() {
        this.projectState = {
            phase: 'planning',
            progress: 0,
            startTime: null,
            isRunning: false,
            currentTask: '等待開始...',
            logs: [],
            metrics: {
                tasksCompleted: 0,
                linesOfCode: 0,
                testsWritten: 0,
                bugs: 0
            }
        };
        
        this.phases = [
            {
                id: 1,
                name: '需求分析',
                description: 'Agent 自主分析業務需求並制定產品規格',
                status: 'pending',
                tasks: [
                    '分析業務領域知識',
                    '制定功能需求清單',
                    '設計用戶故事',
                    '評估技術可行性'
                ],
                duration: 3000 // 模擬持續時間（毫秒）
            },
            {
                id: 2,
                name: '技術架構',
                description: 'Agent 設計全棧技術架構和開發環境',
                status: 'pending',
                tasks: [
                    '選擇技術棧',
                    '設計系統架構',
                    '規劃資料庫結構',
                    '配置開發環境'
                ],
                duration: 4000
            },
            {
                id: 3,
                name: '前端開發',
                description: 'Agent 自主開發用戶界面和交互邏輯',
                status: 'pending',
                tasks: [
                    '設計UI/UX界面',
                    '實現響應式佈局',
                    '開發交互功能',
                    '優化用戶體驗'
                ],
                duration: 6000
            },
            {
                id: 4,
                name: '後端開發',
                description: 'Agent 構建API服務和業務邏輯',
                status: 'pending',
                tasks: [
                    '建立API端點',
                    '實現業務邏輯',
                    '設計資料存取層',
                    '實現身份驗證'
                ],
                duration: 5000
            },
            {
                id: 5,
                name: '測試部署',
                description: 'Agent 自動化測試和部署流程',
                status: 'pending',
                tasks: [
                    '撰寫單元測試',
                    '執行整合測試',
                    '配置CI/CD',
                    '部署到生產環境'
                ],
                duration: 4000
            },
            {
                id: 6,
                name: '監控優化',
                description: 'Agent 持續監控和性能優化',
                status: 'pending',
                tasks: [
                    '設置性能監控',
                    '分析用戶反饋',
                    '優化系統性能',
                    '準備維護文檔'
                ],
                duration: 3000
            }
        ];
        
        this.init();
    }
    
    init() {
        this.updateUI();
        this.setupEventListeners();
        this.addLog('系統初始化完成', 'info');
        this.addLog('Agent 專案總監已準備就緒，等待開始指令...', 'info');
    }
    
    setupEventListeners() {
        document.getElementById('startProject')?.addEventListener('click', () => this.startProject());
        document.getElementById('pauseProject')?.addEventListener('click', () => this.pauseProject());
        document.getElementById('resetProject')?.addEventListener('click', () => this.resetProject());
        document.getElementById('monitorProject')?.addEventListener('click', () => this.showMonitoring());
    }
    
    startProject() {
        if (this.projectState.isRunning) {
            this.addLog('專案已在執行中...', 'warning');
            return;
        }
        
        this.projectState.isRunning = true;
        this.projectState.startTime = new Date();
        this.addLog('🚀 Agent 專案總監開始主導專案開發！', 'success');
        this.addLog('正在進行自主需求分析和技術決策...', 'info');
        
        this.executePhases();
    }
    
    pauseProject() {
        if (!this.projectState.isRunning) {
            this.addLog('專案目前不在執行狀態', 'warning');
            return;
        }
        
        this.projectState.isRunning = false;
        this.addLog('⏸️ 專案已暫停', 'warning');
        this.updateUI();
    }
    
    resetProject() {
        this.projectState = {
            phase: 'planning',
            progress: 0,
            startTime: null,
            isRunning: false,
            currentTask: '等待開始...',
            logs: [],
            metrics: {
                tasksCompleted: 0,
                linesOfCode: 0,
                testsWritten: 0,
                bugs: 0
            }
        };
        
        this.phases.forEach(phase => {
            phase.status = 'pending';
        });
        
        this.updateUI();
        this.addLog('🔄 專案已重置', 'info');
        this.addLog('Agent 專案總監重新待命中...', 'info');
    }
    
    async executePhases() {
        for (let i = 0; i < this.phases.length; i++) {
            if (!this.projectState.isRunning) break;
            
            const phase = this.phases[i];
            await this.executePhase(phase, i);
        }
        
        if (this.projectState.isRunning) {
            this.projectComplete();
        }
    }
    
    async executePhase(phase, phaseIndex) {
        phase.status = 'active';
        this.projectState.currentTask = phase.name;
        this.addLog(`📋 Phase ${phase.id}: ${phase.name} 開始執行`, 'info');
        this.updateUI();
        
        // 模擬執行每個任務
        for (let taskIndex = 0; taskIndex < phase.tasks.length; taskIndex++) {
            if (!this.projectState.isRunning) break;
            
            const task = phase.tasks[taskIndex];
            this.addLog(`  ⚡ 執行: ${task}`, 'info');
            
            // 模擬任務執行時間
            await this.sleep(phase.duration / phase.tasks.length);
            
            // 更新進度和指標
            this.projectState.metrics.tasksCompleted++;
            this.updateMetrics(phase.name, taskIndex);
            
            // 更新整體進度
            const totalTasks = this.phases.reduce((sum, p) => sum + p.tasks.length, 0);
            this.projectState.progress = Math.floor((this.projectState.metrics.tasksCompleted / totalTasks) * 100);
            
            this.updateUI();
        }
        
        if (this.projectState.isRunning) {
            phase.status = 'completed';
            this.addLog(`✅ Phase ${phase.id}: ${phase.name} 完成！`, 'success');
        }
    }
    
    updateMetrics(phaseName, taskIndex) {
        // 根據不同階段更新不同指標
        switch (phaseName) {
            case '前端開發':
            case '後端開發':
                this.projectState.metrics.linesOfCode += Math.floor(Math.random() * 200) + 50;
                break;
            case '測試部署':
                this.projectState.metrics.testsWritten += Math.floor(Math.random() * 10) + 3;
                this.projectState.metrics.bugs += Math.floor(Math.random() * 3);
                break;
        }
    }
    
    projectComplete() {
        this.projectState.isRunning = false;
        this.projectState.currentTask = '專案完成！';
        this.addLog('🎉 Agent 專案總監成功完成端到端開發！', 'success');
        this.addLog('專案已準備部署和交付', 'success');
        this.showProjectSummary();
        this.updateUI();
    }
    
    showProjectSummary() {
        const endTime = new Date();
        const duration = Math.floor((endTime - this.projectState.startTime) / 1000);
        
        this.addLog('📊 === 專案完成總結 ===', 'info');
        this.addLog(`⏱️  總開發時間: ${duration} 秒（模擬）`, 'info');
        this.addLog(`✅ 完成任務: ${this.projectState.metrics.tasksCompleted}`, 'info');
        this.addLog(`💻 程式碼行數: ${this.projectState.metrics.linesOfCode}`, 'info');
        this.addLog(`🧪 測試案例: ${this.projectState.metrics.testsWritten}`, 'info');
        this.addLog(`🐛 發現並修復的Bug: ${this.projectState.metrics.bugs}`, 'info');
        this.addLog('Agent 自主開發效率: 90% 以上！', 'success');
    }
    
    showMonitoring() {
        const monitoringData = {
            cpuUsage: Math.floor(Math.random() * 40) + 20,
            memoryUsage: Math.floor(Math.random() * 60) + 30,
            responseTime: Math.floor(Math.random() * 100) + 50,
            uptime: '99.9%'
        };
        
        this.addLog('📊 === 即時監控數據 ===', 'info');
        this.addLog(`🖥️  CPU使用率: ${monitoringData.cpuUsage}%`, 'info');
        this.addLog(`💾 記憶體使用: ${monitoringData.memoryUsage}%`, 'info');
        this.addLog(`⚡ 回應時間: ${monitoringData.responseTime}ms`, 'info');
        this.addLog(`🔄 系統運行時間: ${monitoringData.uptime}`, 'success');
    }
    
    updateUI() {
        // 更新階段狀態
        this.phases.forEach((phase, index) => {
            const phaseElement = document.querySelector(`[data-phase="${phase.id}"]`);
            if (phaseElement) {
                const statusElement = phaseElement.querySelector('.phase-status');
                if (statusElement) {
                    statusElement.textContent = this.getStatusText(phase.status);
                    statusElement.className = `phase-status ${phase.status}`;
                }
            }
        });
        
        // 更新進度條
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${this.projectState.progress}%`;
            progressFill.textContent = `${this.projectState.progress}%`;
        }
        
        // 更新指標
        this.updateMetricElements();
        
        // 更新當前任務
        const currentTaskElement = document.querySelector('.current-task');
        if (currentTaskElement) {
            currentTaskElement.textContent = this.projectState.currentTask;
        }
    }
    
    updateMetricElements() {
        const metrics = this.projectState.metrics;
        
        document.getElementById('tasksCompleted')?.textContent = metrics.tasksCompleted;
        document.getElementById('linesOfCode')?.textContent = metrics.linesOfCode.toLocaleString();
        document.getElementById('testsWritten')?.textContent = metrics.testsWritten;
        document.getElementById('bugsFixed')?.textContent = metrics.bugs;
    }
    
    getStatusText(status) {
        const statusMap = {
            'pending': '等待中',
            'active': '執行中',
            'completed': '已完成'
        };
        return statusMap[status] || status;
    }
    
    addLog(message, level = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = {
            timestamp,
            message,
            level
        };
        
        this.projectState.logs.push(logEntry);
        
        // 更新日誌顯示
        this.updateLogDisplay();
    }
    
    updateLogDisplay() {
        const outputContent = document.querySelector('.output-content');
        if (!outputContent) return;
        
        // 只顯示最近的20條日誌
        const recentLogs = this.projectState.logs.slice(-20);
        
        outputContent.innerHTML = recentLogs.map(log => `
            <div class="log-entry">
                <span class="log-timestamp">[${log.timestamp}]</span>
                <span class="log-level-${log.level}">${log.message}</span>
            </div>
        `).join('');
        
        // 自動滾動到底部
        outputContent.scrollTop = outputContent.scrollHeight;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 初始化應用
let agentDirector;

document.addEventListener('DOMContentLoaded', () => {
    agentDirector = new AgentProjectDirector();
    
    // 添加一些演示數據
    setTimeout(() => {
        agentDirector.addLog('Agent 專案總監系統已就緒', 'success');
        agentDirector.addLog('支援技術：React, Node.js, MongoDB, Docker', 'info');
        agentDirector.addLog('專案類型：智能專案管理 SaaS 平台', 'info');
        agentDirector.addLog('預計完成時間：25 秒（模擬加速）', 'info');
    }, 500);
});

// 項目預覽功能
function generateProjectPreview() {
    const previewFrame = document.querySelector('.preview-frame');
    if (!previewFrame) return;
    
    // 創建模擬的專案預覽
    previewFrame.innerHTML = `
        <div style="width: 100%; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; background: #4c51bf; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">PM</div>
                <div>
                    <h3 style="margin: 0; color: #2d3748;">智能專案管理平台</h3>
                    <p style="margin: 0; color: #718096; font-size: 0.9rem;">Agent 自主開發的 SaaS 應用</p>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div style="padding: 15px; background: #f7fafc; border-radius: 6px;">
                    <h4 style="margin: 0 0 10px 0; color: #4a5568;">專案概覽</h4>
                    <p style="margin: 0; font-size: 0.9rem; color: #718096;">12 個活躍專案</p>
                </div>
                <div style="padding: 15px; background: #f0fff4; border-radius: 6px;">
                    <h4 style="margin: 0 0 10px 0; color: #4a5568;">團隊績效</h4>
                    <p style="margin: 0; font-size: 0.9rem; color: #718096;">85% 任務完成率</p>
                </div>
            </div>
            <div style="background: #edf2f7; height: 100px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #718096;">
                📊 即時數據儀表板
            </div>
        </div>
    `;
}

// 模擬專案進度更新
function simulateProgressUpdate() {
    if (!agentDirector || !agentDirector.projectState.isRunning) return;
    
    const phases = ['規劃', '開發', '測試', '部署'];
    const currentPhase = phases[Math.floor(Math.random() * phases.length)];
    
    agentDirector.addLog(`🔄 ${currentPhase}階段進度更新...`, 'info');
    
    setTimeout(simulateProgressUpdate, 5000);
}