using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoyalBase.Service.YP
{
    /// <summary>
    /// YP 訂單揀貨作業服務實作
    /// 處理訂單揀貨相關的業務邏輯
    /// </summary>
    public class YPOrderPickingOperationService : IYPOrderPickingOperationService
    {
        // 原本有問題的程式碼 - 造成循環相依的原因
        // private readonly IYPOrderPickingOperationService _childService;

        // 修正後的程式碼 - 移除自我相依
        private readonly IDataRepository _dataRepository;
        private readonly ILogger _logger;

        /// <summary>
        /// 建構函數 - 修正後版本，移除循環相依
        /// </summary>
        /// <param name="dataRepository">資料存取層</param>
        /// <param name="logger">日誌記錄器</param>
        public YPOrderPickingOperationService(
            IDataRepository dataRepository,
            ILogger logger)
        {
            _dataRepository = dataRepository ?? throw new ArgumentNullException(nameof(dataRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        // 原本有問題的建構函數 - 會造成 StackOverflow
        /*
        public YPOrderPickingOperationService(IYPOrderPickingOperationService childService)
        {
            _childService = childService; // 這裡造成循環相依！
        }
        */

        /// <summary>
        /// 取得訂單揀貨作業清單
        /// </summary>
        /// <returns>訂單揀貨作業資料清單</returns>
        public async Task<List<OrderPickingOperationDto>> GetListAsync()
        {
            try
            {
                _logger.LogInfo("開始取得訂單揀貨作業清單");

                // 從資料庫取得資料
                var data = await _dataRepository.GetOrderPickingOperationsAsync();

                // 轉換為 DTO
                var result = data.Select(x => new OrderPickingOperationDto
                {
                    OrderNo = x.OrderNo,
                    ProductCode = x.ProductCode,
                    ProductName = x.ProductName,
                    Quantity = x.Quantity,
                    Status = x.Status,
                    Location = x.Location,
                    CreatedDate = x.CreatedDate,
                    CompletedDate = x.CompletedDate
                }).ToList();

                _logger.LogInfo($"成功取得 {result.Count} 筆訂單揀貨作業資料");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError("取得訂單揀貨作業清單時發生錯誤", ex);
                throw;
            }
        }

        /// <summary>
        /// 根據訂單編號取得揀貨作業
        /// </summary>
        /// <param name="orderNo">訂單編號</param>
        /// <returns>訂單揀貨作業資料</returns>
        public async Task<OrderPickingOperationDto> GetByOrderNoAsync(string orderNo)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(orderNo))
                    throw new ArgumentException("訂單編號不能為空", nameof(orderNo));

                _logger.LogInfo($"開始取得訂單 {orderNo} 的揀貨作業資料");

                var data = await _dataRepository.GetOrderPickingOperationByOrderNoAsync(orderNo);
                if (data == null)
                {
                    _logger.LogWarning($"找不到訂單 {orderNo} 的揀貨作業資料");
                    return null;
                }

                var result = new OrderPickingOperationDto
                {
                    OrderNo = data.OrderNo,
                    ProductCode = data.ProductCode,
                    ProductName = data.ProductName,
                    Quantity = data.Quantity,
                    Status = data.Status,
                    Location = data.Location,
                    CreatedDate = data.CreatedDate,
                    CompletedDate = data.CompletedDate
                };

                _logger.LogInfo($"成功取得訂單 {orderNo} 的揀貨作業資料");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"取得訂單 {orderNo} 揀貨作業資料時發生錯誤", ex);
                throw;
            }
        }

        /// <summary>
        /// 更新揀貨作業狀態
        /// </summary>
        /// <param name="orderNo">訂單編號</param>
        /// <param name="status">新狀態</param>
        /// <returns>更新結果</returns>
        public async Task<bool> UpdateStatusAsync(string orderNo, int status)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(orderNo))
                    throw new ArgumentException("訂單編號不能為空", nameof(orderNo));

                _logger.LogInfo($"開始更新訂單 {orderNo} 的揀貨作業狀態為 {status}");

                var result = await _dataRepository.UpdateOrderPickingOperationStatusAsync(orderNo, status);

                if (result)
                {
                    _logger.LogInfo($"成功更新訂單 {orderNo} 的揀貨作業狀態");
                }
                else
                {
                    _logger.LogWarning($"更新訂單 {orderNo} 的揀貨作業狀態失敗");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"更新訂單 {orderNo} 揀貨作業狀態時發生錯誤", ex);
                throw;
            }
        }
    }

    /// <summary>
    /// 資料存取介面
    /// </summary>
    public interface IDataRepository
    {
        Task<IEnumerable<OrderPickingOperationEntity>> GetOrderPickingOperationsAsync();
        Task<OrderPickingOperationEntity> GetOrderPickingOperationByOrderNoAsync(string orderNo);
        Task<bool> UpdateOrderPickingOperationStatusAsync(string orderNo, int status);
    }

    /// <summary>
    /// 日誌記錄介面
    /// </summary>
    public interface ILogger
    {
        void LogInfo(string message);
        void LogWarning(string message);
        void LogError(string message, Exception ex = null);
    }

    /// <summary>
    /// 訂單揀貨作業實體類別
    /// </summary>
    public class OrderPickingOperationEntity
    {
        public string OrderNo { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public int Status { get; set; }
        public string Location { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? CompletedDate { get; set; }
    }
}