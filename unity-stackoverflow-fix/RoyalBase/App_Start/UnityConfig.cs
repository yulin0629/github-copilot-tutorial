using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.WebApi;
using RoyalBase.Service.YP;

namespace RoyalBase.App_Start
{
    /// <summary>
    /// Unity 容器設定類別
    /// 負責相依性注入的配置
    /// </summary>
    public static class UnityConfig
    {
        /// <summary>
        /// 註冊 Unity 容器
        /// </summary>
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            // 註冊相依性 - 修正版本，避免循環相依
            RegisterDependencies(container);

            // 設定 Web API 使用 Unity 作為相依性解析器
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }

        /// <summary>
        /// 註冊所有相依性
        /// </summary>
        /// <param name="container">Unity 容器</param>
        private static void RegisterDependencies(IUnityContainer container)
        {
            // 修正前的問題設定 - 會造成 StackOverflow
            /*
            // ❌ 錯誤的設定：會造成循環相依
            container.RegisterType<IYPOrderPickingOperationService, YPOrderPickingOperationService>(
                new InjectionConstructor(typeof(IYPOrderPickingOperationService))); // 自己相依自己！
            */

            // ✅ 修正後的正確設定
            // 1. 註冊基礎服務
            container.RegisterType<IDataRepository, DataRepository>(new ContainerControlledLifetimeManager());
            container.RegisterType<ILogger, Logger>(new ContainerControlledLifetimeManager());

            // 2. 註冊業務服務 - 正確的相依注入
            container.RegisterType<IYPOrderPickingOperationService, YPOrderPickingOperationService>(
                new ContainerControlledLifetimeManager(),
                new InjectionConstructor(typeof(IDataRepository), typeof(ILogger)));

            // 3. 註冊其他可能的服務
            // container.RegisterType<IOtherService, OtherService>();
        }

        /// <summary>
        /// 驗證容器設定是否正確
        /// 用於開發和測試階段檢查循環相依問題
        /// </summary>
        /// <returns>驗證結果</returns>
        public static bool ValidateContainer()
        {
            try
            {
                var container = new UnityContainer();
                RegisterDependencies(container);

                // 嘗試解析主要服務，檢查是否有循環相依
                var service = container.Resolve<IYPOrderPickingOperationService>();
                
                return service != null;
            }
            catch (Exception ex)
            {
                // 記錄驗證失敗的原因
                System.Diagnostics.Debug.WriteLine($"Unity 容器驗證失敗: {ex.Message}");
                
                // 檢查是否為循環相依錯誤
                if (ex is InvalidOperationException && ex.Message.Contains("circular"))
                {
                    System.Diagnostics.Debug.WriteLine("偵測到循環相依問題！");
                }
                
                return false;
            }
        }

        /// <summary>
        /// 取得設定的容器實例（供測試使用）
        /// </summary>
        /// <returns>Unity 容器實例</returns>
        public static IUnityContainer GetConfiguredContainer()
        {
            var container = new UnityContainer();
            RegisterDependencies(container);
            return container;
        }
    }

    /// <summary>
    /// 資料存取實作類別
    /// </summary>
    public class DataRepository : IDataRepository
    {
        public async Task<IEnumerable<OrderPickingOperationEntity>> GetOrderPickingOperationsAsync()
        {
            // 模擬資料存取
            await Task.Delay(10);
            return new List<OrderPickingOperationEntity>
            {
                new OrderPickingOperationEntity
                {
                    OrderNo = "ORD001",
                    ProductCode = "P001",
                    ProductName = "商品A",
                    Quantity = 10,
                    Status = 1,
                    Location = "A區",
                    CreatedDate = DateTime.Now.AddDays(-1)
                }
            };
        }

        public async Task<OrderPickingOperationEntity> GetOrderPickingOperationByOrderNoAsync(string orderNo)
        {
            // 模擬資料存取
            await Task.Delay(10);
            return new OrderPickingOperationEntity
            {
                OrderNo = orderNo,
                ProductCode = "P001",
                ProductName = "商品A",
                Quantity = 10,
                Status = 1,
                Location = "A區",
                CreatedDate = DateTime.Now.AddDays(-1)
            };
        }

        public async Task<bool> UpdateOrderPickingOperationStatusAsync(string orderNo, int status)
        {
            // 模擬資料更新
            await Task.Delay(10);
            return true;
        }
    }

    /// <summary>
    /// 日誌記錄實作類別
    /// </summary>
    public class Logger : ILogger
    {
        public void LogInfo(string message)
        {
            System.Diagnostics.Debug.WriteLine($"[INFO] {DateTime.Now:yyyy-MM-dd HH:mm:ss} {message}");
        }

        public void LogWarning(string message)
        {
            System.Diagnostics.Debug.WriteLine($"[WARNING] {DateTime.Now:yyyy-MM-dd HH:mm:ss} {message}");
        }

        public void LogError(string message, Exception ex = null)
        {
            System.Diagnostics.Debug.WriteLine($"[ERROR] {DateTime.Now:yyyy-MM-dd HH:mm:ss} {message}");
            if (ex != null)
            {
                System.Diagnostics.Debug.WriteLine($"Exception: {ex}");
            }
        }
    }
}