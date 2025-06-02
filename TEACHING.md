# GitHub Copilot 教學分支管理指南

## 分支策略

### 核心分支
- **main**: 原始教學檔案，供學員下載使用
- **gh-pages**: GitHub Pages 部署分支，教學時在此分支進行修改

### 分支使用流程

#### 1. 課前準備
```bash
# 確保 gh-pages 分支與 main 同步
git checkout gh-pages
git merge main
git push origin gh-pages
```

#### 2. 教學進行時
```bash
# 切換到 gh-pages 分支進行 Live Demo
git checkout gh-pages

# 所有修改都在 gh-pages 分支上進行
# 學員仍從 main 分支下載原始檔案
```

#### 3. 課後處理
```bash
# 可選擇性地將有價值的改進合併回 main
git checkout main
git merge gh-pages --no-ff -m "feat: 合併教學改進"
git push origin main

# 或保持 gh-pages 作為教學歷史記錄
```

## GitHub Pages 配合

### 主要展示頁面
- **主頁**: https://yulin0629.github.io/github-copilot-tutorial/
- **場景1**: https://yulin0629.github.io/github-copilot-tutorial/01-first-experience/
- **場景2**: https://yulin0629.github.io/github-copilot-tutorial/02-code-explanation/
- **場景3**: https://yulin0629.github.io/github-copilot-tutorial/03-function-generation/
- **場景4**: https://yulin0629.github.io/github-copilot-tutorial/04-debugging-assistant/
- **場景5**: https://yulin0629.github.io/github-copilot-tutorial/05-unit-testing/
- **場景6**: https://yulin0629.github.io/github-copilot-tutorial/06-code-refactoring/
- **場景7**: https://yulin0629.github.io/github-copilot-tutorial/07-documentation/
- **場景8**: https://yulin0629.github.io/github-copilot-tutorial/08-comprehensive-project/

### GitHub Pages 設定
- 從 `gh-pages` 分支的根目錄部署
- 修改會即時反映在網站上

## 實際教學流程

### 1. 開始教學前
```bash
# 確認在 gh-pages 分支
git checkout gh-pages

# 確認與 main 同步
git pull origin gh-pages

# 開啟 Live Server 或預覽
# VS Code: 右鍵點擊 index.html → Open with Live Server
```

### 2. 教學過程中
```bash
# 展示場景 1：初次對話體驗
# 開啟 01-first-experience/index.html
# 使用 Agent 模式修改程式碼

# 即時提交修改（可選）
git add .
git commit -m "demo: 場景1 待辦事項功能實作"
```

### 3. 切換場景
```bash
# 直接開啟下一個場景的 index.html
# 例如：02-code-explanation/index.html

# 每個場景都是獨立的，不需要重置
```

### 4. 展示 Agent 能力時
```bash
# 使用 Agent 模式進行大規模修改
# 例如在場景 4 中修復所有 Bug
# 學員可以即時在瀏覽器中看到效果
```

## 教學技巧

### 保持原始檔案完整性
- **main 分支**永遠保持原始狀態
- 學員下載的是乾淨的初始專案
- 教師的修改只在 `gh-pages` 分支

### 即時展示效果
- 使用 Live Server 即時預覽修改
- GitHub Pages 自動部署最新改動
- 學員可以透過網址查看完成效果

### 版本控制最佳實踐
```bash
# 每個重要步驟都提交
git add .
git commit -m "demo: 完成購物車 Bug 修復"

# 定期推送到遠端
git push origin gh-pages
```

## 多場次教學

### 重置教學環境
```bash
# 如果需要為新場次重置
git checkout gh-pages
git reset --hard origin/main
git push origin gh-pages --force-with-lease

# 或建立新的教學分支
git checkout -b workshop-20250102
```

### 保存特定場次成果
```bash
# 建立標籤保存重要教學成果
git tag -a "workshop-20250102-complete" -m "2025/01/02 教學完整成果"
git push origin --tags
```

## 注意事項

### 1. 分支保護
- **絕不在 main 分支上直接教學**
- main 分支是學員的下載來源
- 保持其原始和完整性

### 2. Git 操作展示
- 可以展示 Git 操作給學員看
- 但強調重點是 GitHub Copilot
- 避免過多 Git 細節分散注意力

### 3. 瀏覽器快取
```bash
# 如果瀏覽器快取導致看不到更新
# 使用強制重新整理：
# Windows: Ctrl + F5
# Mac: Cmd + Shift + R
```

## 疑難排解

### GitHub Pages 沒更新
```bash
# 檢查 GitHub Actions 狀態
# 前往 repo 的 Actions 頁面查看部署狀態

# 強制推送觸發重新部署
git commit --allow-empty -m "trigger deploy"
git push origin gh-pages
```

### 意外修改了 main 分支
```bash
# 如果不小心在 main 分支修改
git checkout main
git reset --hard origin/main  # 小心使用！
```

### 需要比較修改前後
```bash
# 在瀏覽器開啟兩個分頁
# 分頁1: main 分支版本（GitHub 網頁）
# 分頁2: gh-pages 分支版本（GitHub Pages）
```

## 教學重點提醒

1. **Agent 模式是核心**
   - 場景 1-2：0% Agent（只用 Ask 模式）
   - 場景 3-4：逐步引入 Agent
   - 場景 5-8：Agent 成為主角

2. **Live Demo 效果**
   - 每次修改都能即時看到結果
   - 強調 Agent 的自主能力
   - 展示效率提升的對比

3. **保持簡潔**
   - 不要過度解釋 Git 操作
   - 專注於 GitHub Copilot 功能
   - 讓 Agent 展現其能力