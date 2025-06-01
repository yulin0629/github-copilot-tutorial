module.exports = {
  testEnvironment: 'node',
  
  // 測試檔案匹配模式
  testMatch: [
    '**/tests/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // 覆蓋率收集
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!**/node_modules/**'
  ],
  
  // 覆蓋率報告格式
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html'
  ],
  
  // 覆蓋率閾值
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // 設定檔案
  setupFilesAfterEnv: [],
  
  // 模組路徑對應
  moduleNameMapping: {},
  
  // 忽略的檔案
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/'
  ],
  
  // 清理 mock
  clearMocks: true,
  
  // 測試超時設定
  testTimeout: 10000,
  
  // 詳細模式
  verbose: true
};