# GitHub Copilot 教學專案 - 專案指令

## 👤 專案作者
- **作者**: Yulin Wang (yulin0629)
- **GitHub**: https://github.com/yulin0629

## 📋 專案概述
建立一個完整的 GitHub Copilot 教學課程，時長 2 小時，專注於 **Agent 模式**的實際應用。

## 🎯 目標聽眾
- **PM (產品經理)**：了解 AI 輔助開發如何提升產品開發效率
- **SA (系統分析師)**：學習如何利用 AI 進行系統分析和架構設計
- **PG (程式設計師)**：掌握 AI 輔助編程的實際技能
- **VD (視覺設計師)**：了解如何與 AI 工具協作提升設計效率

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

### **核心工具和模式**
- **@workspace**：最重要的聊天參與者
- **Inline Chat** (`Ctrl+I`)：即時編輯輔助
- **Ghost Text**：智能程式碼建議

### **⚠️ GitHub Copilot 操作模式說明**
#### **Chat 模式** (Ctrl+Alt+I)
- **Ask**：純對話，獲取建議和指導，不會修改程式碼
- **Agent**：自主執行任務，多步驟操作，會直接修改檔案
- **Edit**：針對單一檔案的快速編輯，適合明確的修改需求

#### **模式使用指導**
- **場景 1-2**：只使用 **Ask 模式**，建立基礎認知
- **場景 3+**：逐步引入 **Agent 模式**，展示自主能力
- **Edit 模式**：當需要對單一檔案進行明確修改時使用（本教學較少使用）

#### **⚠️ Prompt 撰寫規範**
- **每個 Prompt 後必須加上模式指示**：
  - `💡 **使用模式：Ask**`
  - `💡 **使用模式：Agent**`
  - `💡 **使用模式：Edit**`（較少使用）
- **新對話指示**：需要時加上 `🔄 **開啟新對話**`
- **目的**：明確告訴學員在 VS Code 中應該選擇哪個模式和何時重新開始

## 📁 8 個漸進式學習場景

### **🌱 基礎階段** (建立認知) ⚠️ **0% Agent 嚴格執行**
1. **初次對話體驗** (0% Agent) - 傳統 Chat 功能，@workspace 認知建立
2. **程式碼解釋實作** (0% Agent) - @workspace 核心應用，程式碼理解

### **🚀 進階階段** (引入 Agent)
3. **函數生成** (20% Agent) - 體驗 Agent 協助編程
4. **偵錯輔助** (30% Agent) - Agent 智能診斷

### **🔥 專業階段** (Agent 主角)
5. **單元測試** (50% Agent) - Agent 測試策略
6. **程式碼重構** (60% Agent) - Agent 重構規劃

### **🎯 專家階段** (Agent 主導)
7. **文件生成** (80% Agent) - Agent 文件自動化
8. **GitHub 自動化 Agent** (100% Agent) - 完全自動化的 GitHub 工作流程

### **⚠️ 場景 8 特殊架構設計**
場景 8 使用**獨立的 GitHub Repository** (`copilot-agent-demo-todo`)：

#### **為什麼需要獨立 Repo？**
- **真實 GitHub 工作流程**：展示完整的 Issue → PR 流程
- **避免污染主專案**：教學修改不影響學員下載的原始檔案
- **預置測試 Issues**：可以準備 3-5 個實際的功能需求和 Bug
- **完整 GitHub 體驗**：學員看到真實的 GitHub 操作和自動化

#### **獨立 Repo 設定**
```
copilot-agent-demo-todo/
├── .github/
│   ├── copilot-instructions.md    # Agent 自動讀取的專案規範
│   └── instructions/              # 詳細指令檔案
├── index.html                     # 待辦事項應用
├── app.js                         # 核心邏輯
├── style.css                      # 樣式檔案
└── README.md                      # 專案說明
```

#### **教學流程**
1. **展示預置 Issues**：瀏覽器開啟獨立 repo 的 Issues 頁面
2. **Agent 完全接管**：從讀取 Issue 到創建 PR 的完整自動化
3. **真實 PR 審核**：學員看到實際的 Pull Request
4. **GitHub Pages 部署**：修改後的應用立即上線展示

這種設計讓學員體驗**真正的 AI 驅動開發工作流程**，而不只是本地檔案修改。

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

### **由淺入深的學習路徑** ⚠️ **嚴格遵守**
- **前期**：建立基礎認知，**絕對不使用 Agent**
  - 場景 1：純對話體驗，重點是 @workspace 認知
  - 場景 2：程式碼解釋，@workspace 應用但無 Agent
- **中期**：逐步引入 Agent，展示價值差異  
- **後期**：深度應用 Agent，展示完整潛力

### **⚠️ 課程設計鐵律**
1. **嚴格按照 Agent 比例**：場景 1-2 必須是 0% Agent（只用 Ask）
2. **不可超前實作**：前期場景只能是對話和學習，不能進行複雜開發
3. **漸進式體驗**：每個階段都有明確的學習重點，不可混淆
4. **建立認知為主**：前期重點是讓學員理解工具價值，而非完成專案
5. **模式標示強制**：每個 Prompt 範例後必須標明 `💡 **使用模式：Ask**` 或 `💡 **使用模式：Agent**`
6. **新對話管理**：必要時指示學員 `🔄 **開啟新對話**`，避免上下文混淆
7. **輸入內容格式**：所有需要學員輸入的提示詞、程式碼片段都必須使用 code block 格式，方便複製
8. **Context 管理**：在修改教學內容時，必須考慮是否需要加入 @workspace 或其他 context 參與者
9. **Context 準備說明**：每個 Demo 步驟前都必須清楚說明 Context 準備（例如：需要開啟哪些檔案、是否需要加入 context 等）

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

### **多元內容整合原則**
- **自然融入**：將業務分析、文件生成等功能自然融入技術教學
- **展示完整價值**：不只寫程式，還能理解業務邏輯、產生各類文件
- **避免角色標籤**：讓所有學員都能發現對自己有用的功能
- **實用導向**：強調實際工作中的應用場景，如接手專案、產生報告等

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
- **重要限制**：Agent 和 Edit 模式不支援 @workspace，只有 Ask 模式可以使用
- **Context 管理**：Ask 模式可使用 @workspace 進行全專案分析，Agent/Edit 模式需明確指定檔案

### **時間控制**
- 2 小時課程需要精準控制內容
- 重點展示而非詳細教學每個功能
- 提供實用的 takeaway 工具和模板

## 📌 Git 分支管理策略

### **教學專案分支設計**
- **main 分支**：保持原始教學檔案，供學員下載使用
- **gh-pages 分支**：GitHub Pages 部署分支，教學時在此分支進行修改
  
### **分支使用流程**
1. **課前準備**：
   - 確保 `gh-pages` 分支與 `main` 同步
   - GitHub Pages 設定使用 `gh-pages` 分支
   
2. **教學進行時**：
   - 切換到 `gh-pages` 分支進行 Live Demo
   - 所有修改都在 `gh-pages` 分支上進行
   - 學員仍從 `main` 分支下載原始檔案
   
3. **課後處理**：
   - 可選擇性地將有價值的改進合併回 `main`
   - 或保持 `gh-pages` 作為教學歷史記錄

### **優點**
- 學員永遠能取得乾淨的初始專案
- 教師可以自由修改而不影響學員體驗
- GitHub Pages 即時展示修改效果
- 保留教學過程的完整記錄

### **⚠️ Git Commit 作者規範**

#### **重要：所有 commit 的作者必須是專案擁有者**
- **Author**: Yulin Wang <yulin@example.com>
- **純淨的 commit**：不添加額外的工具標註

#### **標準 Commit 格式**
```bash
git commit -m "feat: 功能描述

詳細說明..."
```

#### **為什麼這樣設計？**
- **專案擁有權明確**：Yulin Wang 是專案的唯一負責人和作者
- **保持簡潔**：commit 訊息專注於變更內容本身
- **專業呈現**：乾淨的 git 歷史記錄

## 🎯 預期成果

學員完成課程後將能夠：
- 熟練使用 GitHub Copilot Agent 模式
- 建立和管理指令檔案系統
- 設計有效的 Prompt Files
- 在實際專案中提升 30-50% 開發效率
- 建立團隊級的 AI 輔助開發流程