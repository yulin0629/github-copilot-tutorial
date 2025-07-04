# 場景 1：初次對話體驗

##  學習目標
- 了解 GitHub Copilot 的**基本 Chat 功能**
- 學習如何使用 **ask** 功能進行對話
- **理解 @workspace 的重要性和實際差異**
- 掌握**程式碼自動完成**的基礎操作
- 熟悉 Copilot Chat 介面和快捷鍵
- **建立使用 Copilot 的基礎認知**（為後續 Agent 學習打基礎）

## 場景說明
您是一位剛開始使用 GitHub Copilot 的開發者，想要了解這個工具的基本功能。這個階段**專注於傳統 Chat 功能**（0% Agent），通過簡單的對話體驗建立基礎認知，特別是 **@workspace 與一般對話的重要差異**。

## 初始專案結構
```
01-first-experience/
├── README.md (本檔案)
├── index.html
├── style.css
└── script.js (空白檔案，待完成)
```

## 事前準備：選擇正確的模型

在開始之前，請確認使用 **GPT-4.1** 模型：
1. 開啟 Copilot Chat (`Ctrl+Alt+I`)
2. 點擊 Chat 面板右上角的  設定圖示
3. 在 Model 選項中選擇 **GPT-4.1**
4. 確認顯示 "Using GPT-4.1"

 **為什麼選擇 GPT-4.1？**
- 更準確的程式碼生成
- 更好的專案理解能力
- Edit 模式效果最佳

##  Demo 劇本

### 階段 1：快速熟悉 Chat + @workspace 對比 (3分鐘)

#### 步驟 1：開啟並體驗基本 Chat
1. 在 VS Code 中開啟本資料夾 (`01-first-experience/`)
2. 按下 `Ctrl+Alt+I` (或 `Cmd+Option+I`) 開啟 Copilot Chat
3. **一般提問**：
```
你好！我想建立一個簡單的待辦事項網頁，請告訴我基本的檔案結構和需要的功能？
```
 **使用模式：Ask**

#### 步驟 2：體驗 @workspace 的差異
 **開啟新對話**
- 點擊 Chat 面板右上角的「+」或「New Chat」按鈕
- 或使用快捷鍵：`Ctrl+L`

```
@workspace 我想了解這個專案的結構，請告訴我現在有哪些檔案？
```
 **使用模式：Ask**

 **觀察差異**：
- **一般對話**：給通用建議
- **@workspace**：能看到實際檔案，給出針對性回答

### 階段 2：核心 Chat 功能展示 (4分鐘)

#### 步驟 3：**了解專案結構**
```
@workspace 這個專案有哪些檔案？每個檔案的用途是什麼？
```
 **使用模式：Ask**

#### 步驟 4：**獲取學習建議**
```
@workspace 我是初學者，想了解待辦事項應用通常有哪些功能？學習 JavaScript 時應該注意什麼？
```
 **使用模式：Ask**

### 階段 3：程式碼自動完成體驗 (3分鐘)

#### 步驟 5：體驗 Ghost Text（僅體驗，不深入實作）
1. 開啟 `script.js` 檔案
2. 在檔案最下方（註解後面）開始輸入：
   - 輸入：`// 學習 GitHub Copilot`，按 Enter 換行
   - 在下一行輸入：`console.log(`
   - 暫停 1-2 秒，觀察灰色的 Ghost Text 建議
3. 看到建議後，按 `Tab` 鍵接受
4. 繼續輸入 `// 待辦事項`，觀察新的建議

 **重點觀察**：
- Ghost Text 會以灰色文字顯示建議
- 按 `Tab` 接受，按 `Esc` 拒絕
- 建議會根據你的註解和程式碼上下文改變

### 階段 4：Edit 模式實作 (5分鐘)

#### 步驟 6：準備 Edit 模式的 Context
 **開啟新對話**
1. 在 Chat 視窗中，點擊輸入框左側的 **** 圖示
2. 選擇「Add Files」
3. 勾選以下檔案：
   - `index.html` (重要！讓 Copilot 了解 DOM 結構)
   - `script.js` (要編輯的檔案)
4. 確認檔案已加入（會顯示在輸入框上方）

 **為什麼要加入 index.html？**
讓 Copilot 看到按鈕和列表的 ID，才能生成正確的程式碼

#### 步驟 7：使用 Edit 模式完成功能
1. 在 Chat 上方選擇 **Edit** 模式（預設是 Ask）
2. 輸入簡單的指令：
```
實作待辦事項的新增功能，點擊按鈕要能新增項目到列表
```
 **使用模式：Edit**

3. Copilot 會顯示修改預覽
4. 檢視程式碼，確認使用了正確的 ID (`todoInput`, `addButton`, `todoList`)
5. 點擊 **Accept** 接受修改

#### 步驟 8：測試成果
1. 開啟 `index.html`：
   - **方法 1**：在檔案總管找到檔案，直接拖曳到瀏覽器
   - **方法 2**：如果有安裝 Live Server 擴充功能，右鍵選擇「Open with Live Server」
   - **方法 3**：在檔案總管雙擊 `index.html`，用預設瀏覽器開啟
2. 測試新增待辦事項功能：
   - 輸入文字
   - 點擊「新增」按鈕
   - 確認項目出現在列表中

 **Edit 模式關鍵學習**：
- 必須加入相關檔案作為 context
- Copilot 會根據 context 生成符合專案的程式碼
- 簡單的 prompt 就能完成功能

### 階段 5：UI 美化體驗 (5分鐘)

#### 步驟 9：使用 @workspace 分析現有樣式
 **開啟新對話**
1. 使用 @workspace 了解現有設計：
```
@workspace 請分析 style.css 的設計風格，包括配色、排版和整體視覺風格
```
 **使用模式：Ask**

#### 步驟 10：獲取樣式改進建議
```
@workspace 我想讓這個待辦事項應用看起來更現代化和專業，可以建議一些具體的 CSS 改進嗎？比如：
- 添加漸變背景
- 改進按鈕的互動效果
- 添加動畫和過渡效果
- 提升整體視覺層次
```
 **使用模式：Ask**

#### 步驟 11：使用 Edit 模式實作樣式改進
1. 點擊  圖示，選擇 `style.css` 檔案
2. 切換到 **Edit** 模式
3. 輸入具體的修改需求：
```
請幫我修改 style.css，實作以下改進：
1. 給 body 添加現代化的漸變背景
2. 為 .container 添加柔和的陰影和模糊效果
3. 改進按鈕樣式，添加懸停和點擊的動畫效果
4. 給待辦事項添加滑入動畫，讓新增項目更有動感
5. 優化整體配色，使用更專業的色彩搭配
```
 **使用模式：Edit**

4. 檢視 Copilot 的修改預覽
5. 點擊 **Accept** 接受修改

#### 步驟 12：測試視覺效果
1. 重新整理瀏覽器查看效果
2. 測試各種互動：
   - 按鈕懸停效果
   - 新增項目的動畫
   - 整體視覺層次的改善

 **樣式修改關鍵學習**：
- Copilot 能理解設計意圖並轉化為 CSS
- 可以一次性處理多個樣式需求
- 生成的程式碼包含現代 CSS 特性（動畫、漸變、陰影等）

###  重點觀察

#### **@workspace vs 一般對話差異**：
- **一般對話**：籠統建議，不了解專案脈絡
- **@workspace**：針對性強，程式碼可直接使用
- **效率差異**：@workspace 節省 50-70% 的溝通成本

#### **Chat 使用體驗**：
- **回應速度**：了解等待時間，學會耐心
- **需要明確指導**：問題越具體，答案越有用  
- **逐步建構**：傳統模式需要分步驟完成專案

#### **樣式修改體驗**：
- **視覺即時反饋**：修改立即可見，增強學習成就感
- **現代化設計**：Copilot 了解當前設計趨勢
- **完整性思考**：不只改單一元素，而是整體提升

##  重點提示

### **@workspace 最佳實踐**：
1. **永遠使用 @workspace**：這是最重要的聊天參與者
2. **讓 AI 先了解專案**：讓它分析現有結構
3. **要求針對性建議**：避免通用範例程式碼

### **Ask 模式使用技巧**：
1. **明確具體**：問題越具體，答案越精準
2. **提供上下文**：說明您的需求和限制
3. **迭代改進**：根據回答繼續深入詢問

### **常用提示詞範例**：
- `@workspace 請分析這個專案的結構`
- `@workspace 如何優化這個函數的效能？`
- `@workspace 這個錯誤在我的專案中如何解決？`
- `@workspace 根據現有架構提供最佳實踐建議`

### **Chat 管理技巧**：
- **何時開啟新對話**：切換不同主題或想要清晰對比時
- **如何開啟新對話**：點擊 Chat 面板上方的「新對話」按鈕
- **對話歷史**：Copilot 會記住同一對話中的上下文

##  Demo 重點
1. **@workspace 對比展示**：先不用 → 再使用，展現明顯差異
2. **快速開啟 Chat**：`Ctrl+Alt+I` 熟練操作
3. **專案感知能力**：展示 AI 如何理解專案結構
4. **Ghost Text 體驗**：灰色建議 → Tab 接受
5. **Edit 模式實作**：展示如何快速完成功能
6. **UI 美化能力**：展示 Copilot 的設計理解力
7. **建立基礎認知**：為後續 Agent 學習做準備

##  預期成果
完成本場景後，您應該：
- **深刻理解 @workspace 的重要性**
- 能夠開啟並使用 Copilot Chat
- 了解如何提出有效的問題
- 體驗基本的程式碼自動完成功能
- **建立對 GitHub Copilot 的基礎認知**（為後續學習做準備）

##  延伸練習
1. **對比測試**：同樣問題分別用一般對話和 @workspace 詢問
2. 請 @workspace 解釋它對專案結構的理解
3. 要求 @workspace 提供符合專案風格的不同實作方式

##  為下階段準備
- 第一階段建立了 @workspace 的基礎認知
- 第二階段將深入探索 @workspace 的程式碼解釋能力
- 第三階段開始引入 Agent 模式，展現更強大的功能