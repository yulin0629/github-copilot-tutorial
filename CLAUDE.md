# GitHub Copilot 教學專案 - 專案指令

## 📋 專案概述
建立一個完整的 GitHub Copilot 教學課程，時長 2 小時，專注於 **Agent 模式**的實際應用。

## 🎯 目標聽眾
- **PM (產品經理)**：了解 AI 輔助開發如何提升產品開發效率
- **SA (系統分析師)**：學習如何利用 AI 進行系統分析和架構設計
- **PG (程式設計師)**：掌握 AI 輔助編程的實際技能

## 🚀 核心功能重點

### **Agent 模式 (50% 內容重點)**
- Agent 自主開發能力
- 多步驟任務規劃和執行
- 跨檔案協調修改
- 自我修正和迭代改進

### **2025 年最新功能**
- **Next Edit Suggestions (NES)**：預測下一步編輯
- **Code Completion**：GPT-4.1 增強程式碼補全
- **多指令檔案系統**：`.github/instructions/*.instructions.md`
- **Prompt Files**：`.github/prompts/*.prompt.md`

### **核心工具**
- **@workspace**：最重要的聊天參與者
- **Inline Chat** (`Ctrl+I`)：即時編輯輔助
- **Ghost Text**：智能程式碼建議

## 📁 8 個漸進式學習場景

### **🌱 基礎階段** (建立認知)
1. **初次對話體驗** (0% Agent) - 傳統 Chat 功能
2. **程式碼解釋實作** (0% Agent) - @workspace 核心應用

### **🚀 進階階段** (引入 Agent)
3. **函數生成** (20% Agent) - 體驗 Agent 協助編程
4. **偵錯輔助** (30% Agent) - Agent 智能診斷

### **🔥 專業階段** (Agent 主角)
5. **單元測試** (50% Agent) - Agent 測試策略
6. **程式碼重構** (60% Agent) - Agent 重構規劃

### **🎯 專家階段** (Agent 主導)
7. **文件生成** (80% Agent) - Agent 文件自動化
8. **綜合專案開發** (90% Agent) - Agent 完全主導

## 🏗️ 技術架構

### **指令系統架構**
```
.github/
├── copilot-instructions.md          # 全域指令 (自動載入)
├── instructions/                    # 多指令檔案系統
│   ├── javascript.instructions.md   # JavaScript 規範
│   ├── testing.instructions.md      # 測試規範
│   └── agent-mode.instructions.md   # Agent 專用指令
└── prompts/                        # 可重複使用模板
    ├── react-component.prompt.md    # React 元件生成
    ├── api-testing.prompt.md        # API 測試生成
    ├── security-review.prompt.md    # 安全檢查
    └── refactoring.prompt.md        # 重構指南
```

### **VS Code 配置**
```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "github.copilot.chat.codeGeneration.instructions": [
    { "file": "./.github/instructions/javascript.instructions.md" },
    { "file": "./.github/instructions/testing.instructions.md" },
    { "file": "./.github/instructions/agent-mode.instructions.md" }
  ],
  "github.copilot.nextEditSuggestions.enabled": true
}
```

## 📚 課程設計原則

### **由淺入深的學習路徑**
- **前期**：建立基礎認知，不使用 Agent
- **中期**：逐步引入 Agent，展示價值差異  
- **後期**：深度應用 Agent，展示完整潛力

### **實戰導向**
- 每個場景都有具體的程式碼範例
- 包含完整的 Demo 劇本和 Prompt
- 強調效率對比：傳統方式 vs Agent 方式

### **可視化學習體驗**
- **前端場景 (1-3)**：Web 應用，學員可直接在瀏覽器看到修改結果
- **後端場景 (4-8)**：包含 HTML 展示頁面，視覺化展示程式邏輯
- **即時反饋**：每次修改都能立即看到效果，增強學習成就感
- **GitHub Pages 整合**：整個教學專案可線上瀏覽，便於分享和展示

### **場景設計模式**
- **含 Bug 的初始程式碼**：刻意設計多種類型的問題
- **Agent 診斷體驗**：讓 Agent 自主發現和分析問題
- **系統性修復**：展示 Agent 如何制定修復策略
- **完整功能驗證**：修復後的應用完全可用

### **實際教學設計範例：場景 4 偵錯助手**
```
專案結構：
04-debugging-assistant/
├── index.html      # 購物車應用界面
├── style.css       # 美觀的 CSS 樣式
├── script.js       # 含 10 個 Bug 的 JavaScript
└── README.md       # Agent 30% 偵錯劇本

教學流程：
1. 學員先體驗有問題的購物車應用
2. @workspace 請 Agent 分析所有 Bug
3. Agent 制定系統性修復策略
4. Agent 分批修復相關問題
5. 學員看到完全正常運作的應用
```

**關鍵設計原則**：每個修改都有**立即可見的效果**，學員可以：
- 在瀏覽器中測試原本的 Bug
- 看到 Agent 修復後的結果
- 理解每個修復的實際價值

### **團隊協作重點**
- 展示如何在團隊中使用指令檔案
- 程式碼風格和開發規範的統一
- Prompt Files 的分享和重複使用

## ⚠️ 重要限制和注意事項

### **Visual Studio 支援**
- 本課程專注於 VS Code
- Visual Studio 的 Copilot 功能相對有限
- 可簡單提及但不作為重點

### **功能穩定性**
- 斜槓指令 (/) 有穩定性問題，不建議使用
- 專注於自然語言對話和 Agent 模式
- @workspace 是唯一真正有價值的聊天參與者

### **時間控制**
- 2 小時課程需要精準控制內容
- 重點展示而非詳細教學每個功能
- 提供實用的 takeaway 工具和模板

## 🎯 預期成果

學員完成課程後將能夠：
- 熟練使用 GitHub Copilot Agent 模式
- 建立和管理指令檔案系統
- 設計有效的 Prompt Files
- 在實際專案中提升 30-50% 開發效率
- 建立團隊級的 AI 輔助開發流程