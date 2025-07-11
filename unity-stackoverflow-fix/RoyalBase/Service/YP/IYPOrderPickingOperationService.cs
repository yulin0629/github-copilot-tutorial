using System.Collections.Generic;
using System.Threading.Tasks;

namespace RoyalBase.Service.YP
{
    /// <summary>
    /// YP 訂單揀貨作業服務介面
    /// 提供訂單揀貨相關的操作功能
    /// </summary>
    public interface IYPOrderPickingOperationService
    {
        /// <summary>
        /// 取得訂單揀貨作業清單
        /// </summary>
        /// <returns>訂單揀貨作業資料清單</returns>
        Task<List<OrderPickingOperationDto>> GetListAsync();

        /// <summary>
        /// 根據訂單編號取得揀貨作業
        /// </summary>
        /// <param name="orderNo">訂單編號</param>
        /// <returns>訂單揀貨作業資料</returns>
        Task<OrderPickingOperationDto> GetByOrderNoAsync(string orderNo);

        /// <summary>
        /// 更新揀貨作業狀態
        /// </summary>
        /// <param name="orderNo">訂單編號</param>
        /// <param name="status">新狀態</param>
        /// <returns>更新結果</returns>
        Task<bool> UpdateStatusAsync(string orderNo, int status);
    }

    /// <summary>
    /// 訂單揀貨作業資料傳輸物件
    /// </summary>
    public class OrderPickingOperationDto
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