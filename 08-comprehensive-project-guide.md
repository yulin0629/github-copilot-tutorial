# 場景 8：GitHub 自動化 Agent (100% Agent)

## 🎯 場景概述

### 為什麼需要獨立 Repo？
- 真實展示 Issue → PR 完整流程
- 學員體驗真實的 GitHub 協作
- 預置實際的功能需求和 Issues
- 避免影響主教學專案

### 獨立 Repo 資訊
1. **Repo 名稱**：`copilot-agent-demo-todo`
2. **專案類型**：待辦事項管理應用
3. **預置 Issues**：3-5 個實際功能需求和 Bug
4. **功能**：完整的 Issues 和 Pull Requests 功能

## 🚀 學習目標
- 體驗 **Agent 100% 主導**：AI 驅動從 Issue 到 PR 的完整開發流程
- 了解 `.github/instructions` 和 `.github/prompts` 的實際應用
- 學習如何讓 AI 成為真正的開發夥伴
- 見證 AI 如何理解需求、制定策略、實作功能並創建 PR

## 📋 教學重點

### 核心流程
1. **人類創建 Issue**：功能需求或 Bug
2. **Agent 完全接管**：
   - 讀取 Issue 內容
   - 查看 `.github/instructions` 取得開發規範
   - 制定解決方案
   - 實作功能
   - 創建 Pull Request
3. **人類審核 PR**：決定是否合併

## 🎬 Demo 腳本

### 步驟 1：展示獨立 GitHub Repository (2分鐘)

#### 展示內容
1. 開啟瀏覽器展示 `copilot-agent-demo-todo` repo
2. 展示已經準備好的 3-5 個 Issues
3. 簡單說明每個 Issue 的內容
4. 強調這些都是真實的 GitHub Issues

**預置 Issues 範例**：
- Issue #1: 添加清除已完成任務功能 (enhancement, good first issue)
- Issue #2: 修復刪除任務後 LocalStorage 不更新的問題 (bug)  
- Issue #3: 在標題顯示未完成任務數量 (enhancement)
- Issue #4: 添加鍵盤快捷鍵支援 (enhancement)

### 步驟 2：展示 Agent 自動化流程 (15分鐘)

#### Demo 1：讓 Agent 實作功能 - 從 Issue 到 PR

**Prompt：**
```
請查看我的 GitHub repo 中的 open issues，選擇 Issue #1 來實作

完成後請執行以下工作：
1. 分析這個 Issue 內容
2. 查看 .github 目錄的開發規範
3. 實作這個功能
4. 創建符合規範的 Pull Request

記得在 PR 中詳細說明
```

**使用模式：Agent**  
**開啟新對話**

**重點展示**：
- Agent 自動讀取 `.github/copilot-instructions.md`
- Agent 遵循專案的開發規範
- Agent 展示實作如何思考
- Agent 按 PR 規範創建完整的 PR

#### Demo 2：批次分析 - 評估所有 Issues

**Prompt：**
```
分析所有 open issues，為每個 issue 評估實作難度和時間
請提供一個優先順序建議，並說明理由
```

**使用模式：Agent**

**展示重點**：
- Agent 能批次分析多個 Issue
- Agent 能評估技術難度
- Agent 能提供策略建議

### 步驟 3：進階應用展示 (3分鐘)

#### 更多實際應用場景

##### 1. 批次處理
```
請處理所有標記為 'good first issue' 的問題，為每個創建獨立的 PR
```

##### 2. 文件更新
```
當功能 PR 合併後：
請檢查是否需要更新 README.md 說明新功能使用方式
```

##### 3. Code Review 協助
```
查看 PR #5
請提供這個 PR 的改進建議，包括程式碼品質和最佳實踐
```

## 💡 關鍵要點

### GitHub 工作流程整合
1. **真實的 Issue**：不是模擬，是真實的開發需求
2. **指令系統整合**：讓 Agent 理解專案規範
3. **完整的流程**：從 Agent 理解需求、實作到創建 PR
4. **實際的價值**：展示真實開發場景的效率提升

### 指令系統架構範例
```
.github/
├── copilot-instructions.md      # 全域指令
├── instructions/                 # 細部指令
│   ├── frontend.instructions.md # 前端規範
│   ├── testing.instructions.md  # 測試規範
│   └── pr.instructions.md       # PR 規範
└── prompts/                     # 提示模板
    ├── feature.prompt.md        # 功能開發
    ├── bugfix.prompt.md         # Bug 修復
    └── refactor.prompt.md       # 重構指南
```

### 實際應用場景
- **自動化 Code Review**：Agent 分析 PR 並提供建議
- **批次問題處理**：一次處理多個相關的 Issues
- **文件自動更新**：功能完成後自動更新相關文件
- **測試生成**：為新功能自動生成測試案例

## 🎯 學習成果

完成這個場景後，學員應該能：
- 理解 GitHub 工作流程的 AI 整合
- 掌握指令系統的設計和使用
- 達到 90% Agent 輔助的開發效率
- 建立自己的 AI 輔助開發流程
- 理解 AI 在團隊協作中的角色

## 📝 總結重點

### 從 0% 到 100% 的旅程
1. **場景 1-2 (0% Agent)**：建立基礎認知
2. **場景 3-4 (20-30% Agent)**：初步輔助開發
3. **場景 5-6 (50-60% Agent)**：深度應用
4. **場景 7-8 (80-100% Agent)**：完全自動化

### 核心洞察
- **AI 不是工具，是夥伴**：人類定義做什麼，AI 決定如何做
- **指令系統是關鍵**：好的指令系統讓 AI 更有效
- **給 AI 空間**：讓 AI 發揮創造力和解決問題的能力

### 未來展望
- **開發者角色轉變**：從寫程式到定義需求和審核
- **效率大幅提升**：專注於業務邏輯而非實作細節
- **持續學習**：AI 和人類共同成長

## 🚨 注意事項
1. **準備工作**：確保學員已經完成 Fork 和設置
2. **時間控制**：Agent 處理可能需要時間，控制好節奏
3. **備案準備**：準備好已完成的 PR 作為備用展示
4. **強調價值**：不斷提醒這是真實的開發場景，不是 Demo