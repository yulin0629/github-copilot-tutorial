using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using RoyalBase.Service.YP;

namespace RoyalBase.Controllers.API
{
    /// <summary>
    /// YP 訂單揀貨作業 API 控制器
    /// 提供訂單揀貨作業相關的 RESTful API
    /// </summary>
    [RoutePrefix("api/YPOrderPickingOperation")]
    public class YPOrderPickingOperationController : ApiController
    {
        private readonly IYPOrderPickingOperationService _service;

        /// <summary>
        /// 建構函數
        /// </summary>
        /// <param name="service">訂單揀貨作業服務</param>
        public YPOrderPickingOperationController(IYPOrderPickingOperationService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        /// <summary>
        /// 取得訂單揀貨作業清單
        /// GET api/YPOrderPickingOperation/GetList
        /// </summary>
        /// <returns>訂單揀貨作業清單</returns>
        [HttpGet]
        [Route("GetList")]
        public async Task<IHttpActionResult> GetList()
        {
            try
            {
                var result = await _service.GetListAsync();
                
                if (result == null || result.Count == 0)
                {
                    return Ok(new
                    {
                        success = true,
                        message = "查無資料",
                        data = new List<OrderPickingOperationDto>()
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "取得資料成功",
                    data = result
                });
            }
            catch (Exception ex)
            {
                // 記錄錯誤日誌
                System.Diagnostics.Debug.WriteLine($"GetList API 發生錯誤: {ex.Message}");
                
                return InternalServerError(new Exception("取得訂單揀貨作業清單時發生錯誤，請稍後再試。"));
            }
        }

        /// <summary>
        /// 根據訂單編號取得揀貨作業
        /// GET api/YPOrderPickingOperation/GetByOrderNo/{orderNo}
        /// </summary>
        /// <param name="orderNo">訂單編號</param>
        /// <returns>訂單揀貨作業資料</returns>
        [HttpGet]
        [Route("GetByOrderNo/{orderNo}")]
        public async Task<IHttpActionResult> GetByOrderNo(string orderNo)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(orderNo))
                {
                    return BadRequest("訂單編號不能為空");
                }

                var result = await _service.GetByOrderNoAsync(orderNo);
                
                if (result == null)
                {
                    return NotFound();
                }

                return Ok(new
                {
                    success = true,
                    message = "取得資料成功",
                    data = result
                });
            }
            catch (Exception ex)
            {
                // 記錄錯誤日誌
                System.Diagnostics.Debug.WriteLine($"GetByOrderNo API 發生錯誤: {ex.Message}");
                
                return InternalServerError(new Exception("取得訂單揀貨作業資料時發生錯誤，請稍後再試。"));
            }
        }

        /// <summary>
        /// 更新揀貨作業狀態
        /// PUT api/YPOrderPickingOperation/UpdateStatus
        /// </summary>
        /// <param name="request">更新請求</param>
        /// <returns>更新結果</returns>
        [HttpPut]
        [Route("UpdateStatus")]
        public async Task<IHttpActionResult> UpdateStatus(UpdateStatusRequest request)
        {
            try
            {
                if (request == null || string.IsNullOrWhiteSpace(request.OrderNo))
                {
                    return BadRequest("請求參數不正確");
                }

                var result = await _service.UpdateStatusAsync(request.OrderNo, request.Status);
                
                return Ok(new
                {
                    success = result,
                    message = result ? "更新成功" : "更新失敗"
                });
            }
            catch (Exception ex)
            {
                // 記錄錯誤日誌
                System.Diagnostics.Debug.WriteLine($"UpdateStatus API 發生錯誤: {ex.Message}");
                
                return InternalServerError(new Exception("更新揀貨作業狀態時發生錯誤，請稍後再試。"));
            }
        }
    }

    /// <summary>
    /// 更新狀態請求模型
    /// </summary>
    public class UpdateStatusRequest
    {
        /// <summary>
        /// 訂單編號
        /// </summary>
        public string OrderNo { get; set; }

        /// <summary>
        /// 新狀態
        /// </summary>
        public int Status { get; set; }
    }
}