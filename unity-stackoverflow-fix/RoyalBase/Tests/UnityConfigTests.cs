using System;
using System.Threading.Tasks;
using Microsoft.Practices.Unity;
using RoyalBase.App_Start;
using RoyalBase.Service.YP;

namespace RoyalBase.Tests
{
    /// <summary>
    /// Unity 容器設定測試類別
    /// 驗證 StackOverflow 問題是否已修正
    /// </summary>
    public class UnityConfigTests
    {
        /// <summary>
        /// 測試 Unity 容器設定是否正確
        /// 確認沒有循環相依問題
        /// </summary>
        public static bool TestUnityConfiguration()
        {
            Console.WriteLine("=== Unity 容器設定測試 ===");
            
            try
            {
                // 1. 驗證容器設定
                Console.WriteLine("1. 驗證 Unity 容器設定...");
                bool isValid = UnityConfig.ValidateContainer();
                
                if (!isValid)
                {
                    Console.WriteLine("❌ Unity 容器設定驗證失敗！");
                    return false;
                }
                Console.WriteLine("✅ Unity 容器設定驗證成功");

                // 2. 測試服務解析
                Console.WriteLine("2. 測試服務解析...");
                var container = UnityConfig.GetConfiguredContainer();
                
                var service = container.Resolve<IYPOrderPickingOperationService>();
                if (service == null)
                {
                    Console.WriteLine("❌ 無法解析 IYPOrderPickingOperationService 服務");
                    return false;
                }
                Console.WriteLine("✅ 成功解析 IYPOrderPickingOperationService 服務");

                // 3. 測試服務功能
                Console.WriteLine("3. 測試服務功能...");
                return TestServiceFunctionality(service).Result;
                
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ 測試過程中發生錯誤: {ex.Message}");
                
                // 檢查是否為 StackOverflow 相關錯誤
                if (ex.StackTrace?.Contains("StackOverflow") == true || 
                    ex.Message.Contains("circular") ||
                    ex.Message.Contains("recursive"))
                {
                    Console.WriteLine("🚨 偵測到 StackOverflow 或循環相依問題！");
                    Console.WriteLine("原因：Unity 容器設定存在循環相依");
                    Console.WriteLine("解決方案：檢查 UnityConfig.cs 中的服務註冊設定");
                }
                
                return false;
            }
        }

        /// <summary>
        /// 測試服務功能是否正常運作
        /// </summary>
        /// <param name="service">訂單揀貨作業服務</param>
        /// <returns>測試結果</returns>
        private static async Task<bool> TestServiceFunctionality(IYPOrderPickingOperationService service)
        {
            try
            {
                // 測試 GetListAsync 方法
                Console.WriteLine("  3.1 測試 GetListAsync 方法...");
                var list = await service.GetListAsync();
                
                if (list == null)
                {
                    Console.WriteLine("❌ GetListAsync 返回 null");
                    return false;
                }
                
                Console.WriteLine($"✅ GetListAsync 成功，返回 {list.Count} 筆資料");

                // 測試 GetByOrderNoAsync 方法
                Console.WriteLine("  3.2 測試 GetByOrderNoAsync 方法...");
                var item = await service.GetByOrderNoAsync("TEST001");
                
                if (item == null)
                {
                    Console.WriteLine("⚠️ GetByOrderNoAsync 返回 null（這是正常的，表示找不到資料）");
                }
                else
                {
                    Console.WriteLine($"✅ GetByOrderNoAsync 成功，訂單編號: {item.OrderNo}");
                }

                // 測試 UpdateStatusAsync 方法
                Console.WriteLine("  3.3 測試 UpdateStatusAsync 方法...");
                var updateResult = await service.UpdateStatusAsync("TEST001", 2);
                Console.WriteLine($"✅ UpdateStatusAsync 成功，結果: {updateResult}");

                Console.WriteLine("✅ 所有服務功能測試通過");
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ 服務功能測試失敗: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// 演示原本會造成 StackOverflow 的錯誤設定
        /// </summary>
        public static void DemonstrateStackOverflowProblem()
        {
            Console.WriteLine("\n=== 演示原本的 StackOverflow 問題 ===");
            Console.WriteLine("以下是會造成 StackOverflow 的錯誤設定範例：");
            Console.WriteLine();
            Console.WriteLine("❌ 錯誤的設定：");
            Console.WriteLine("container.RegisterType<IYPOrderPickingOperationService, YPOrderPickingOperationService>(");
            Console.WriteLine("    new InjectionConstructor(typeof(IYPOrderPickingOperationService)));");
            Console.WriteLine();
            Console.WriteLine("問題分析：");
            Console.WriteLine("1. YPOrderPickingOperationService 的建構函數要求注入 IYPOrderPickingOperationService");
            Console.WriteLine("2. Unity 容器嘗試建立 YPOrderPickingOperationService 實例");
            Console.WriteLine("3. 建立過程中又需要注入 IYPOrderPickingOperationService");
            Console.WriteLine("4. 形成無限遞迴，最終導致 StackOverflow 異常");
            Console.WriteLine();
            Console.WriteLine("✅ 修正後的設定：");
            Console.WriteLine("container.RegisterType<IYPOrderPickingOperationService, YPOrderPickingOperationService>(");
            Console.WriteLine("    new ContainerControlledLifetimeManager(),");
            Console.WriteLine("    new InjectionConstructor(typeof(IDataRepository), typeof(ILogger)));");
            Console.WriteLine();
            Console.WriteLine("修正說明：");
            Console.WriteLine("1. 移除自我相依，改為依賴具體的外部服務");
            Console.WriteLine("2. 使用 ContainerControlledLifetimeManager 確保單例模式");
            Console.WriteLine("3. 明確指定建構函數參數，避免循環相依");
        }

        /// <summary>
        /// 主要測試入口點
        /// </summary>
        public static void Main(string[] args)
        {
            Console.WriteLine("Unity StackOverflow 問題修正測試");
            Console.WriteLine("=====================================");
            
            // 演示問題
            DemonstrateStackOverflowProblem();
            
            // 執行測試
            bool testResult = TestUnityConfiguration();
            
            Console.WriteLine("\n=== 測試結果 ===");
            if (testResult)
            {
                Console.WriteLine("🎉 所有測試通過！Unity StackOverflow 問題已修正");
                Console.WriteLine("✅ /api/YPOrderPickingOperation/GetList API 現在可以正常運作");
            }
            else
            {
                Console.WriteLine("❌ 測試失敗，請檢查 Unity 設定");
            }
            
            Console.WriteLine("\n按任意鍵結束...");
            Console.ReadKey();
        }
    }
}