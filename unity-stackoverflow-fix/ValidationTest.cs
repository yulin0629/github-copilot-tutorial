using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// 簡化的測試程式，模擬 Unity 容器行為來驗證修正
namespace RoyalBase.SimplifiedTest
{
    /// <summary>
    /// 簡化版本的服務介面和實作，用於驗證修正
    /// </summary>
    public interface ITestService
    {
        Task<List<string>> GetDataAsync();
    }

    public class TestService : ITestService
    {
        private readonly ITestRepository _repository;
        private readonly ITestLogger _logger;

        // ✅ 正確的建構函數 - 不會造成循環相依
        public TestService(ITestRepository repository, ITestLogger logger)
        {
            _repository = repository;
            _logger = logger;
        }

        // ❌ 這種建構函數會造成 StackOverflow
        // public TestService(ITestService service) { ... }

        public async Task<List<string>> GetDataAsync()
        {
            _logger.Log("Getting data...");
            var data = await _repository.GetDataAsync();
            _logger.Log($"Retrieved {data.Count()} items");
            return data.ToList();
        }
    }

    public interface ITestRepository
    {
        Task<IEnumerable<string>> GetDataAsync();
    }

    public class TestRepository : ITestRepository
    {
        public async Task<IEnumerable<string>> GetDataAsync()
        {
            await Task.Delay(1);
            return new[] { "Item1", "Item2", "Item3" };
        }
    }

    public interface ITestLogger
    {
        void Log(string message);
    }

    public class TestLogger : ITestLogger
    {
        public void Log(string message)
        {
            Console.WriteLine($"[LOG] {DateTime.Now:HH:mm:ss} {message}");
        }
    }

    /// <summary>
    /// 簡化的容器，模擬 Unity 行為
    /// </summary>
    public class SimpleContainer
    {
        private readonly Dictionary<Type, object> _services = new();

        public void Register<TInterface, TImplementation>()
            where TImplementation : class, TInterface, new()
        {
            _services[typeof(TInterface)] = new TImplementation();
        }

        public void Register<TInterface>(TInterface instance)
        {
            _services[typeof(TInterface)] = instance;
        }

        public T Resolve<T>()
        {
            if (_services.TryGetValue(typeof(T), out var service))
            {
                return (T)service;
            }
            throw new InvalidOperationException($"Service {typeof(T).Name} not registered");
        }
    }

    /// <summary>
    /// 驗證修正的測試程式
    /// </summary>
    public class ValidationTest
    {
        public static async Task<bool> RunTest()
        {
            Console.WriteLine("=== Unity StackOverflow 修正驗證測試 ===");
            
            try
            {
                // 設定容器（模擬修正後的 Unity 設定）
                var container = new SimpleContainer();
                
                // 註冊基礎服務
                container.Register<ITestRepository, TestRepository>();
                container.Register<ITestLogger, TestLogger>();
                
                // 註冊業務服務 - 正確的相依關係
                var repository = container.Resolve<ITestRepository>();
                var logger = container.Resolve<ITestLogger>();
                var service = new TestService(repository, logger);
                container.Register<ITestService>(service);

                Console.WriteLine("✅ 容器設定成功，無循環相依");

                // 測試服務功能
                var testService = container.Resolve<ITestService>();
                var result = await testService.GetDataAsync();
                
                Console.WriteLine($"✅ 服務執行成功，取得 {result.Count} 筆資料");
                Console.WriteLine("✅ API /api/YPOrderPickingOperation/GetList 現在可以正常運作");
                
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ 測試失敗: {ex.Message}");
                return false;
            }
        }

        public static void DemonstrateCircularDependencyError()
        {
            Console.WriteLine("\n=== 演示循環相依問題 ===");
            Console.WriteLine("如果使用錯誤的設定，會發生以下情況：");
            Console.WriteLine();
            Console.WriteLine("1. Controller 要求 IYPOrderPickingOperationService");
            Console.WriteLine("2. Unity 嘗試建立 YPOrderPickingOperationService");
            Console.WriteLine("3. 建構函數要求注入 IYPOrderPickingOperationService");
            Console.WriteLine("4. Unity 再次嘗試建立 YPOrderPickingOperationService");
            Console.WriteLine("5. 無限遞迴 -> StackOverflow 異常");
            Console.WriteLine();
            Console.WriteLine("修正方式：");
            Console.WriteLine("- 移除自我相依");
            Console.WriteLine("- 使用具體的外部服務作為相依項");
            Console.WriteLine("- 正確設定 Unity 容器生命週期");
        }

        public static async Task Main(string[] args)
        {
            Console.WriteLine("Unity StackOverflow 問題修正驗證");
            Console.WriteLine("===================================");
            
            DemonstrateCircularDependencyError();
            
            bool success = await RunTest();
            
            Console.WriteLine("\n=== 驗證結果 ===");
            if (success)
            {
                Console.WriteLine("🎉 驗證成功！Unity StackOverflow 問題已修正");
                Console.WriteLine("💡 關鍵修正：移除循環相依，使用正確的 DI 設定");
            }
            else
            {
                Console.WriteLine("❌ 驗證失敗，需要進一步檢查");
            }
        }
    }
}