#!/bin/bash

# GitHub Copilot 教學分支管理腳本

set -e

LESSON_DATE=$(date +%Y%m%d)
DEMO_BRANCH="live-demo-${LESSON_DATE}"

show_help() {
    echo "GitHub Copilot 教學分支管理工具"
    echo ""
    echo "使用方法:"
    echo "  ./setup-lesson.sh [選項] [場景編號]"
    echo ""
    echo "選項:"
    echo "  start <場景>    開始新的教學 (例: start 4)"
    echo "  reset <場景>    重置到場景開始狀態"
    echo "  save <場景>     保存當前進度"
    echo "  list           顯示所有可用分支"
    echo "  demo           建立今日教學分支"
    echo ""
    echo "範例:"
    echo "  ./setup-lesson.sh demo          # 建立今日教學環境"
    echo "  ./setup-lesson.sh start 4       # 開始場景4教學"
    echo "  ./setup-lesson.sh reset 4       # 重置場景4到初始狀態"
    echo "  ./setup-lesson.sh save 4        # 保存場景4當前進度"
}

create_demo_branch() {
    echo "🚀 建立今日教學分支: ${DEMO_BRANCH}"
    
    # 確保在 main 分支
    git checkout main
    git pull origin main
    
    # 建立新的教學分支
    if git branch | grep -q "${DEMO_BRANCH}"; then
        echo "⚠️  分支 ${DEMO_BRANCH} 已存在，是否要刪除重建? [y/N]"
        read -r response
        if [[ "$response" == "y" || "$response" == "Y" ]]; then
            git branch -D "${DEMO_BRANCH}"
        else
            echo "❌ 取消操作"
            exit 1
        fi
    fi
    
    git checkout -b "${DEMO_BRANCH}"
    echo "✅ 教學分支 ${DEMO_BRANCH} 建立完成"
    echo "📖 現在可以開始教學了！"
}

start_lesson() {
    local lesson_num=$1
    local start_branch="lesson-step${lesson_num}-start"
    
    echo "📚 開始場景 ${lesson_num} 教學"
    
    # 檢查起始分支是否存在
    if ! git branch -r | grep -q "origin/${start_branch}"; then
        echo "❌ 找不到分支: ${start_branch}"
        echo "可用的分支:"
        git branch -r | grep "lesson-step" | sed 's/origin\///'
        exit 1
    fi
    
    # 確保在教學分支
    if ! git branch | grep -q "${DEMO_BRANCH}"; then
        echo "⚠️  請先建立教學分支: ./setup-lesson.sh demo"
        exit 1
    fi
    
    git checkout "${DEMO_BRANCH}"
    
    # 重置到起始狀態
    if [ -n "$lesson_num" ]; then
        echo "🔄 重置場景 ${lesson_num} 到初始狀態..."
        
        # 重置特定場景目錄
        local lesson_dir=$(printf "%02d" "$lesson_num")
        local lesson_folder=""
        
        case $lesson_num in
            1) lesson_folder="01-first-experience" ;;
            2) lesson_folder="02-code-explanation" ;;
            3) lesson_folder="03-function-generation" ;;
            4) lesson_folder="04-debugging-assistant" ;;
            5) lesson_folder="05-unit-testing" ;;
            6) lesson_folder="06-code-refactoring" ;;
            7) lesson_folder="07-documentation" ;;
            8) lesson_folder="08-comprehensive-project" ;;
            *) echo "❌ 無效的場景編號: $lesson_num"; exit 1 ;;
        esac
        
        # 從起始分支復原場景檔案
        git checkout "origin/${start_branch}" -- "${lesson_folder}/" 2>/dev/null || \
        git checkout "origin/lesson-templates" -- "${lesson_folder}/" 2>/dev/null || \
        echo "⚠️  找不到場景 ${lesson_num} 的起始狀態，使用當前狀態"
        
        echo "✅ 場景 ${lesson_num} 已重置到初始狀態"
    fi
    
    echo "🎯 準備開始場景 ${lesson_num} 教學！"
    echo "📂 工作目錄: ${lesson_folder}/"
}

reset_lesson() {
    local lesson_num=$1
    echo "🔄 重置場景 ${lesson_num}..."
    start_lesson "$lesson_num"
}

save_progress() {
    local lesson_num=$1
    local save_branch="lesson-step${lesson_num}-progress-${LESSON_DATE}"
    
    echo "💾 保存場景 ${lesson_num} 進度到分支: ${save_branch}"
    
    # 提交當前變更
    git add .
    git commit -m "保存場景 ${lesson_num} 教學進度 - $(date)" || echo "沒有變更需要提交"
    
    # 建立進度分支
    git checkout -b "${save_branch}"
    git push origin "${save_branch}"
    
    # 回到教學分支
    git checkout "${DEMO_BRANCH}"
    
    echo "✅ 進度已保存到分支: ${save_branch}"
}

list_branches() {
    echo "📋 可用的教學分支:"
    echo ""
    echo "🌟 主要分支:"
    git branch -r | grep -E "(main|lesson-templates)" | sed 's/origin\//  /'
    echo ""
    echo "📚 場景分支:"
    git branch -r | grep "lesson-step" | sed 's/origin\//  /'
    echo ""
    echo "🎭 教學分支:"
    git branch | grep "live-demo" | sed 's/^/  /'
    echo ""
    echo "💾 進度分支:"
    git branch -r | grep "progress" | sed 's/origin\//  /' | head -10
}

# 主程式邏輯
case "${1:-help}" in
    "demo")
        create_demo_branch
        ;;
    "start")
        if [ -z "$2" ]; then
            echo "❌ 請指定場景編號"
            show_help
            exit 1
        fi
        start_lesson "$2"
        ;;
    "reset")
        if [ -z "$2" ]; then
            echo "❌ 請指定場景編號"
            show_help
            exit 1
        fi
        reset_lesson "$2"
        ;;
    "save")
        if [ -z "$2" ]; then
            echo "❌ 請指定場景編號"
            show_help
            exit 1
        fi
        save_progress "$2"
        ;;
    "list")
        list_branches
        ;;
    "help"|*)
        show_help
        ;;
esac