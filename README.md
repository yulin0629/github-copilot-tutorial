# GitHub Copilot 教學專案

這是一個 GitHub Copilot 完整教學專案，透過 8 個由淺入深的實作場景，讓您掌握 GitHub Copilot 的各種功能。

## 🤖 Agent 快速設置 (複製整段給 Agent)

<details>
<summary>📋 點擊展開 Agent 設置指令</summary>

```
請幫我設置 GitHub Copilot 教學專案環境：

1. 首先檢查目前位置並決定克隆位置：
   - 如果在 VS Code 中已有開啟的專案，請詢問我是否要在當前目錄的父目錄克隆
   - 如果沒有開啟專案，請詢問我想要克隆到哪個目錄
   - 建議的位置：~/projects/ 或 ~/Documents/GitHub/

2. 克隆專案（包含 submodule）：
   cd [選定的目錄]
   git clone --recursive https://github.com/yulin0629/github-copilot-tutorial.git
   cd github-copilot-tutorial

3. 如果場景 8 的 submodule 沒有正確下載，請執行：
   git submodule update --init --recursive

4. 檢查專案結構是否完整（應有 8 個場景資料夾）：
   - 01-first-experience/
   - 02-code-explanation/
   - 03-function-generation/
   - 04-debugging-assistant/
   - 05-unit-testing/
   - 06-code-refactoring/
   - 07-documentation/
   - 08-comprehensive-project/ (這是 git submodule)

5. 在 VS Code 中開啟克隆下來的專案資料夾：
   code .

6. 確認已安裝必要的 VS Code 擴充套件：
   - GitHub Copilot
   - GitHub Copilot Chat
   如果未安裝，請協助安裝

7. 檢查並設定 VS Code 的 Copilot 語言為繁體中文：
   檢查 settings.json 是否已有設定
   如果沒有，加入："github.copilot.chat.localeOverride": "zh-TW"

完成後請：
- 告訴我設置狀態
- 直接開啟 index.html 預覽教學內容
- 確認所有場景資料夾都正確載入
```

</details>

## 🔗 取得教學專案

```bash
git clone https://github.com/yulin0629/github-copilot-tutorial.git
cd github-copilot-tutorial
```

## 📋 前置需求

- Windows 10/11, Mac 作業系統
- Visual Studio Code（最新版本）
- GitHub 帳號
- 網路連線
- Git（用於下載專案）

## 📥 下載教學專案

### 方法 1：使用 Git Clone（推薦）
```bash
# 克隆專案（包含場景 8 的 submodule）
git clone --recursive https://github.com/yulin0629/github-copilot-tutorial.git

# 如果已經克隆但忘記加 --recursive，執行以下命令
cd github-copilot-tutorial
git submodule update --init --recursive
```

### 方法 2：下載 ZIP 檔案
1. 前往 [專案頁面](https://github.com/yulin0629/github-copilot-tutorial)
2. 點擊綠色的「Code」按鈕
3. 選擇「Download ZIP」
4. 解壓縮到您想要的資料夾

> ⚠️ **注意**：如果使用 ZIP 下載，場景 8 需要另外處理（因為它是 git submodule）：
> - 前往 [場景 8 範例專案](https://github.com/yulin0629/copilot-agent-demo-todo)
> - 下載 ZIP 並解壓縮，覆蓋 `08-comprehensive-project` 整個資料夾

### 💡 關於場景 8 的特殊說明
場景 8 使用 git submodule 連結到獨立的 GitHub repository，這是為了：
- 展示真實的 GitHub 工作流程（Issue → PR）
- 讓學員體驗完整的 AI 自動化開發
- 可以在獨立 repo 中預置測試用的 Issues

## 🚀 安裝與設定指南（Windows）

### 步驟 1：安裝 Visual Studio Code

1. 前往 [VS Code 官網](https://code.visualstudio.com/)
2. 下載 Windows 或 Mac 版本的安裝檔
3. 執行安裝程式，使用預設選項即可

### 步驟 2：取得 GitHub Copilot 訂閱

GitHub Copilot 於 2025 年 6 月更新方案，提供三種主要選擇：

#### 🆓 免費方案 (GitHub Copilot Free)
- **完全免費**，無需信用卡
- 每月 **2,000 次**程式碼完成建議
- 每月 **50 次** Copilot Chat 對話請求
- 支援基本 AI 模型（GPT-4o、o3-mini、Gemini 2.0）
- **不支援**進階 AI 模型（GPT-4.5、o3）
- **無法購買**額外進階請求

#### 💼 專業方案 (GitHub Copilot Pro)
- **月付 $10** 或 **年付 $100**
- **無限制**程式碼補全
- 每月 **300 次進階請求**
- 支援進階模型但**不含 GPT-4.5 與 o3**
- 超額可購買額外進階請求（**$0.04/次**）
- 完整 Copilot 擴展功能

#### 🚀 專業增強方案 (GitHub Copilot Pro+)
- **月付 $39** 或 **年付 $390**
- **無限制**程式碼補全
- 每月 **1,500 次進階請求**
- **完整支援**所有進階 AI 模型（包含 GPT-4.5、o3）
- 超額可購買額外進階請求（**$0.04/次**）
- 優先使用最新功能和模型預覽

#### 🎓 學生/教師方案
- 驗證身份後可免費使用（相當於 Pro 方案）
- 前往 [GitHub Education](https://education.github.com/) 申請

> ⚠️ **重要更新**：自 2025 年 6 月 4 日起，所有方案的「進階請求」正式開始計費和限制。

### 步驟 3：安裝 GitHub Copilot 擴充套件

#### 方法 1：透過 VS Code 擴充套件市集
1. 開啟 VS Code
2. 按下 `Ctrl+Shift+X` (`Cmd+Shift+X`) 開啟擴充套件市集
3. 搜尋「**GitHub Copilot**」
4. 安裝由 GitHub 官方提供的擴充套件
5. 安裝「**GitHub Copilot Chat**」擴充套件（用於聊天功能）

#### 方法 2：直接安裝連結
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)

### 步驟 4：登入 GitHub 帳號

1. 重新啟動 VS Code
2. 點擊 VS Code 右下角的 **Copilot 圖示**
3. 選擇「**Sign in to GitHub**」
4. 在瀏覽器中完成 GitHub 登入流程
5. 授權 VS Code 存取您的 GitHub 帳號
6. 返回 VS Code，選擇您要使用的訂閱方案

### 步驟 5：設定中文語言（重要！）

為了獲得最佳的中文使用體驗，請務必設定語言：

#### 設定 Copilot Chat 為繁體中文
1. 按下 `Ctrl+,` (`Cmd+,`) 開啟 VS Code 設定
2. 搜尋「**github.copilot.chat.localeOverride**」
3. 將值設定為 `**zh-TW**`

或直接編輯 `settings.json`：
```json
{
  "github.copilot.chat.localeOverride": "zh-TW"
}
```

#### 可選：設定 VS Code 介面語言
1. 按下 `F1` 或 `Ctrl+Shift+P` (`Cmd+Shift+P`) 開啟指令面板
2. 輸入 `Configure Display Language`
3. 選擇「中文(繁體) (zh-tw)」
4. 重新啟動 VS Code

### 步驟 6：最佳化設定

在 `settings.json` 中新增以下設定：
```json
{
  "github.copilot.chat.localeOverride": "zh-TW",
  "github.copilot.enable": true,
  "github.copilot.editor.enableAutoCompletions": true,
  "github.copilot.chat.useProjectTemplates": true
}
```

### 步驟 7：驗證安裝

✅ **檢查清單：**
- 右下角狀態列出現 Copilot 圖示且顯示為已啟用
- 新建一個 `.js` 或 `.py` 檔案，開始輸入程式碼時會看到自動建議
- 按下 `Ctrl+Alt+I` (`Cmd+Option+I`) 可以開啟 Copilot Chat 視窗
- 按下 `Ctrl+I` (`Cmd+I`) 可以使用 inline chat 功能
- **Copilot Chat 回應為繁體中文**

> 💡 **提示：** 如果沒有看到建議，請確認您已經登入 GitHub 並選擇了適當的訂閱方案。如果 Chat 不是中文回應，請檢查語言設定。

## 📚 課程大綱 (2小時精華版)

本教學分為 8 個精簡場景，專注於 **GitHub Copilot Agent 模式**的實際應用：

### 🎯 **核心重點：Agent Mode**
- **自主開發**：Agent 可以獨立完成複雜任務
- **多步驟規劃**：自動分解和執行開發流程
- **智能決策**：基於專案脈絡做出技術選擇

### ⏱️ **漸進式學習路徑**

#### 🌱 **基礎階段** - 建立 Copilot 使用基礎

#### 1. [初次對話體驗](./01-first-experience/) (10分鐘)
- **傳統 Chat 功能**：基本對話和程式碼建議
- **實作重點**：使用 ask 功能建立簡單待辦事項，建立基礎認知

#### 2. [程式碼解釋與 Inline Edit](./02-code-explanation/) (15分鐘)  
- **@workspace 核心功能 + Inline Edit**：理解專案架構並快速修改
- **實作重點**：購物車系統分析，掌握 Inline Edit (Ctrl+I) 技巧

#### 🚀 **進階階段** - 引入 Agent 輔助

#### 3. [函數生成](./03-function-generation/) (10分鐘)
- **Inline Chat + 初步 Agent**：體驗 Agent 協助編程
- **實作重點**：對比手動 vs Agent 生成函數的效率差異

#### 4. [靈活運用三種模式的偵錯助手](./04-debugging-assistant/) (15分鐘)
- **Ask + Edit + Agent 模式整合**：學習三種模式的最佳使用時機
- **實作重點**：購物車 Bug 修復，體驗模式切換的效率差異

#### 🔥 **專業階段** - Agent 成為主角

#### 5. [Agent 測試策略師](./05-unit-testing/) (15分鐘)
- **Agent 自主設計**：Agent 制定完整測試架構和策略
- **實作重點**：數據分析工具測試套件，Agent 主導測試規劃

#### 6. [Agent 重構架構師](./06-code-refactoring/) (15分鐘)
- **Agent 主導重構**：Agent 負責大規模代碼重構和架構設計
- **實作重點**：遺留電商系統現代化改造，Agent 作為首席架構師

#### 🎯 **專家階段** - Agent 主導開發

#### 7. [Agent 文檔大師](./07-documentation/) (10分鐘)
- **Agent 文檔專家**：Agent 作為技術文檔專家，自動化文檔體系
- **實作重點**：任務管理 API 系統文檔生成，完整技術文檔體系

#### 8. [GitHub 自動化 Agent](./08-comprehensive-project/) (25分鐘)
- **⭐ Agent Mode 完全主導**：從 GitHub Issue 到 Pull Request 的完整自動化流程
- **實作重點**：Agent 自主處理 Issue 分析、功能實作、測試驗證、PR 創建

### 🚀 **學習成果**
- 掌握 Agent Mode 的核心使用方法
- 理解 Agent 與傳統 Chat 的差異  
- 學會設計有效的 Agent 任務指令
- 體驗 AI 驅動的自主開發流程

## 🏗️ **專案結構**

```
github-copilot-tutorial/
├── 📁 .github/                          # GitHub 配置檔案
│   ├── copilot-instructions.md          # 🔧 全域 Copilot 指令 (自動載入)
│   ├── instructions/                    # 📋 多指令檔案系統
│   │   ├── javascript.instructions.md   # JavaScript 程式碼風格
│   │   ├── testing.instructions.md      # 測試撰寫規範
│   │   └── agent-mode.instructions.md   # Agent 模式專用指令
│   └── prompts/                        # 🎯 可重複使用的 Prompt Files
│       ├── react-component.prompt.md    # React 元件生成器
│       ├── api-testing.prompt.md        # API 測試套件生成器
│       ├── security-review.prompt.md    # 程式碼安全檢查
│       ├── refactoring.prompt.md        # 程式碼重構指南
│       └── README.md                   # Prompt Files 使用指南
├── 📁 .vscode/                          # VS Code 工作區設定
│   └── settings.json                   # 🔧 多指令檔案載入配置
├── 📁 01-first-experience/              # 🌱 場景 1：初次對話體驗 (0% Agent)
├── 📁 02-code-explanation/              # 🌱 場景 2：程式碼解釋實作 (0% Agent)
├── 📁 03-function-generation/           # 🚀 場景 3：函數生成 (20% Agent)
├── 📁 04-debugging-assistant/           # 🚀 場景 4：偵錯輔助 (30% Agent)
├── 📁 05-unit-testing/                  # 🔥 場景 5：單元測試 (50% Agent)
├── 📁 06-code-refactoring/              # 🔥 場景 6：程式碼重構 (60% Agent)
├── 📁 07-documentation/                 # 🎯 場景 7：文件生成 (80% Agent)
├── 📁 08-comprehensive-project/         # 🎯 場景 8：綜合專案開發 (90% Agent)
├── 📄 README.md                        # 📖 主要說明檔案
└── 📄 CLAUDE.md                        # 🤖 Claude 專案指令檔案
```

### 🔧 **配置檔案說明**

#### **自訂指令系統**
- **`.github/copilot-instructions.md`**: 專案全域指令，自動套用到每個 Copilot 請求
- **`.github/instructions/`**: 分類管理的多個指令檔案，可組合使用
- **`.vscode/settings.json`**: VS Code 配置，自動載入多個指令檔案

#### **Prompt Files 系統**
- **`.github/prompts/`**: 可重複使用的任務模板，支援 Agent/Edit/Ask 三種模式
- **任務特定**: 每個 prompt file 針對特定開發任務優化

## 🎯 學習目標

完成本教學後，您將能夠：
- ✅ 熟練使用 GitHub Copilot 的各種功能
- ✅ 提升開發效率 30-50%
- ✅ 撰寫更高品質的程式碼
- ✅ 快速理解和維護既有專案
- ✅ 自動化重複性工作

## 🛠️ Copilot 功能總覽

### 🚀 **2025 年最新功能**

#### 🔮 **Next Edit Suggestions (NES)** - 預測下一步編輯
- **自動預測**：基於您當前的編輯，預測下一個編輯位置和內容
- **智能重構**：重新命名變數時，自動建議更新所有相關位置
- **錯誤修正**：自動捕捉和建議修正常見錯誤
- **啟用方式**：設定 `github.copilot.nextEditSuggestions.enabled: true`

#### 🤖 **Agent 模式** - AI 自主開發
- **多步驟規劃**：Agent 可以自主分解複雜任務
- **自我修正**：識別錯誤並自動修復
- **跨檔案操作**：在多個檔案間進行協調修改
- **終端整合**：自動執行必要的命令

#### 📋 **自訂指令系統** - 個人化 AI 助手
- **全域指令**：`.github/copilot-instructions.md` 自動載入到每個請求
- **多指令檔案**：`.github/instructions/*.instructions.md` 分類管理指令
- **Prompt Files**：`.github/prompts/*.prompt.md` 可重複使用的任務模板
- **團隊協作**：統一的開發規範和程式碼風格
- **智能配置**：VS Code settings 自動載入多個指令檔案

#### ⚡ **增強程式碼補全** - GPT-4.1 預設模型
- **Ghost Text**：即時顯示 AI 建議的灰色文字
- **多模型選擇**：GPT-4.1 (預設)、Claude Sonnet 4、o3、Gemini 2.0 Flash
- **智能推理**：o3 系列模型提供深度邏輯推理能力
- **視覺支援**：可以解析螢幕截圖和圖片
- **無限使用**：付費用戶可無限使用 GPT-4.1，不計入進階請求配額

### 📋 **基本快捷鍵**

| 功能 | Windows 快捷鍵 | Mac 快捷鍵 | 說明 |
|------|---------------|-----------|------|
| **Ghost Text 接受** | `Tab` | `Tab` | 接受 AI 建議的灰色文字 |
| **多重建議** | `Ctrl+Enter` | `Cmd+Enter` | 查看最多 10 個不同建議 |
| **開啟 Chat** | `Ctrl+Alt+I` | `Cmd+Option+I` | 開啟 AI 聊天視窗 |
| **Inline Chat** | `Ctrl+I` | `Cmd+I` | 在編輯器內直接對話 |
| **下一個建議** | `Alt+]` | `Option+]` | 切換到下一個建議 |
| **上一個建議** | `Alt+[` | `Option+[` | 切換到上一個建議 |
| **拒絕建議** | `Esc` | `Esc` | 拒絕當前建議 |
| **觸發建議** | `Alt+\` | `Option+\` | 手動觸發程式碼建議 |
| **接受單字** | `Ctrl+→` | `Cmd+→` | 只接受建議的下一個單字 |

## 💡 **2025 年使用技巧**

### 🚀 **Agent 模式最佳實踐**
1. **明確任務描述**：給 Agent 清楚的整體目標，讓它自主規劃步驟
2. **信任 Agent 判斷**：讓 Agent 自己決定技術方案和實作細節
3. **檢視 Agent 輸出**：Agent 完成後檢查結果，並提供回饋改進

### 🔮 **Next Edit Suggestions 技巧**
1. **保持編輯節奏**：NES 會根據您的編輯模式預測下一步
2. **使用 Tab 導航**：按 Tab 鍵快速跳轉到建議的編輯位置
3. **信任智能預測**：NES 通常能準確預測重構和修正需求

### 📋 **自訂指令系統**
1. **全域指令**：`.github/copilot-instructions.md` 自動套用到所有請求
2. **多指令檔案**：`.github/instructions/` 分類管理不同領域的指令
3. **VS Code 配置**：`.vscode/settings.json` 設定載入多個指令檔案
4. **Prompt Files**：`.github/prompts/` 建立可重複使用的任務模板

### ⚡ **程式碼補全優化**
1. **善用 Ghost Text**：觀察灰色建議文字，按 Tab 接受
2. **多重建議**：按 `Ctrl+Enter` 查看更多選項
3. **上下文提供**：清楚的註解和變數命名提升建議品質

### 🎯 **功能組合使用**
1. **Ask 模式 + @workspace**：深入分析整個專案結構和關係
2. **Agent 模式 + 檔案選擇**：針對特定檔案執行複雜任務
3. **自訂指令 + NES**：指令確保風格一致，NES 提升編輯效率
4. **Chat + Inline**：大方向用 Chat 討論，具體實作用 Inline Chat

## ⚠️ 關於斜槓指令（/ 指令）

**Agent 模式**的推出讓傳統斜槓指令變得過時。本教學專注於 Agent 模式和自然語言對話，不涵蓋斜槓指令的使用。

## 📞 關於聊天參與者 (@)

### ✅ 值得學習的參與者

**@workspace** - **唯一重點掌握的參與者**
- 分析整個專案結構和程式碼關係
- 找出跨檔案的函數引用和依賴
- 理解專案架構和設計模式
- 協助重構和程式碼優化

**使用範例：**
```
@workspace 這個專案的主要架構是什麼？
@workspace 找出所有呼叫 getUserData 函數的地方
@workspace 建議如何重構這個模組的結構
```

### ⚠️ 其他參與者實用性有限
**@terminal、@vscode、@github** 等其他參與者實用性不高，建議專注學習 **@workspace** 即可。

### ⚠️ **重要限制**
- **Agent 和 Edit 模式不支援 @workspace**
- 只有 **Ask 模式**可以使用 @workspace 進行全專案分析
- Agent/Edit 模式需要透過 📎 明確選擇要處理的檔案

## ⚙️ **重要 VS Code 設定**

### **必要核心設定**
```json
{
  // 基本功能
  "github.copilot.chat.localeOverride": "zh-TW",          // 繁體中文回應
  
  // Agent 模式 (重點功能)
  "github.copilot.chat.agent.thinkingTool": true,        // Agent 思考工具
  
  // 自訂指令系統 (重點功能)
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "github.copilot.chat.codeGeneration.instructions": [
    { "file": "./.github/instructions/javascript.instructions.md" },
    { "file": "./.github/instructions/testing.instructions.md" },
    { "file": "./.github/instructions/agent-mode.instructions.md" }
  ],
  
  // @workspace 支援與智能路由控制
  "chat.detectParticipant.enabled": false               // 關閉自動路由，避免 "rerun without" 問題
}
```

### **可選增強設定**
```json
{
  // 2025 新功能 (可選)
  "github.copilot.nextEditSuggestions.enabled": true,    // 下一步編輯建議
  "github.copilot.chat.edits.temporalContext.enabled": true, // 時間脈絡編輯
  
  // Chat 增強 (可選)
  "github.copilot.chat.followUps": "always",             // 總是顯示後續問題
  "github.copilot.chat.scopeSelection": true,            // 符號範圍提示
  "github.copilot.chat.search.semanticTextResults": true // 語義搜尋結果
}
```

## 📞 支援與協助

如遇到問題，請參考：
- [GitHub Copilot 官方文件](https://docs.github.com/copilot)
- [VS Code Copilot 指南](https://code.visualstudio.com/docs/copilot/overview)

---

開始您的 GitHub Copilot 學習之旅吧！🚀