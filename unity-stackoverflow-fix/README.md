# Unity StackOverflow 問題修正說明

## 問題描述
在呼叫 `/api/YPOrderPickingOperation/GetList` API 時，發生 **StackOverflow** 異常，原因是 Unity 容器的相依性注入設定存在循環相依問題。

## 問題根源分析

### 原本有問題的程式碼：

```csharp
// ❌ 錯誤的 Unity 設定 (UnityConfig.cs)
container.RegisterType<IYPOrderPickingOperationService, YPOrderPickingOperationService>(
    new InjectionConstructor(typeof(IYPOrderPickingOperationService))); // 自己相依自己！

// ❌ 對應的錯誤建構函數 (YPOrderPickingOperationService.cs)
public YPOrderPickingOperationService(IYPOrderPickingOperationService childService)
{
    _childService = childService; // 這裡造成循環相依！
}
```

### 問題執行流程：
1. Web API 呼叫 `/api/YPOrderPickingOperation/GetList`
2. Controller 嘗試從 Unity 容器解析 `IYPOrderPickingOperationService`
3. Unity 開始建立 `YPOrderPickingOperationService` 實例
4. 建構函數要求注入 `IYPOrderPickingOperationService`
5. Unity 再次嘗試建立 `YPOrderPickingOperationService` 實例
6. 形成無限遞迴，最終導致 **StackOverflow** 異常

## 修正方案

### ✅ 修正後的程式碼：

```csharp
// ✅ 正確的 Unity 設定 (UnityConfig.cs)
// 1. 註冊基礎服務
container.RegisterType<IDataRepository, DataRepository>(new ContainerControlledLifetimeManager());
container.RegisterType<ILogger, Logger>(new ContainerControlledLifetimeManager());

// 2. 註冊業務服務 - 正確的相依注入
container.RegisterType<IYPOrderPickingOperationService, YPOrderPickingOperationService>(
    new ContainerControlledLifetimeManager(),
    new InjectionConstructor(typeof(IDataRepository), typeof(ILogger)));

// ✅ 對應的正確建構函數 (YPOrderPickingOperationService.cs)
public YPOrderPickingOperationService(
    IDataRepository dataRepository,
    ILogger logger)
{
    _dataRepository = dataRepository ?? throw new ArgumentNullException(nameof(dataRepository));
    _logger = logger ?? throw new ArgumentNullException(nameof(logger));
}
```

## 修正重點

### 1. **移除自我相依**
- 原本：`YPOrderPickingOperationService` 依賴 `IYPOrderPickingOperationService`（自己）
- 修正：改為依賴具體的外部服務 `IDataRepository` 和 `ILogger`

### 2. **正確的生命週期管理**
- 使用 `ContainerControlledLifetimeManager` 確保服務為單例模式
- 避免重複建立實例造成的效能問題

### 3. **明確的建構函數注入**
- 使用 `InjectionConstructor` 明確指定要注入的參數類型
- 避免 Unity 自動推斷造成的歧義

## 驗證方法

執行測試程式驗證修正結果：

```csharp
// 驗證容器設定
bool isValid = UnityConfig.ValidateContainer();

// 測試服務解析
var container = UnityConfig.GetConfiguredContainer();
var service = container.Resolve<IYPOrderPickingOperationService>();

// 測試 API 功能
var result = await service.GetListAsync();
```

## 測試結果
- ✅ Unity 容器設定驗證通過
- ✅ 服務解析成功，無循環相依
- ✅ API `/api/YPOrderPickingOperation/GetList` 正常運作
- ✅ 所有業務功能測試通過

## 預防措施

### 1. **設計原則**
- 避免服務自我相依
- 遵循依賴倒置原則（DIP）
- 使用介面隔離原則

### 2. **開發實踐**
- 在 Unity 設定後立即執行驗證測試
- 使用自動化測試檢查循環相依
- 定期重構複雜的相依關係

### 3. **監控機制**
- 在啟動時執行容器驗證
- 記錄相依性解析的效能指標
- 設置異常監控和告警

## 相關檔案

- `RoyalBase/App_Start/UnityConfig.cs` - Unity 容器設定（主要修正）
- `RoyalBase/Service/YP/YPOrderPickingOperationService.cs` - 服務實作（建構函數修正）
- `RoyalBase/Service/YP/IYPOrderPickingOperationService.cs` - 服務介面
- `RoyalBase/Controllers/API/YPOrderPickingOperationController.cs` - API 控制器
- `RoyalBase/Tests/UnityConfigTests.cs` - 測試驗證程式

## 結論

透過移除循環相依和正確設定 Unity 容器，成功解決了 StackOverflow 問題。現在 `/api/YPOrderPickingOperation/GetList` API 可以正常運作，無任何效能或穩定性問題。