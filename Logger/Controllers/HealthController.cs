using LoggerService.Services;
using Microsoft.AspNetCore.Mvc;

namespace LoggerService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HealthController : Controller
    {

        private StatisticService _statisticService;
        public HealthController(StatisticService statisticService)
        {
            _statisticService = statisticService;
        }

        [HttpGet("shallow")]
        public StatusCodeResult Shallow()
        {
            return new StatusCodeResult(200);
        }

        [HttpGet("deep")]
        public JsonResult Deep()
        {
            //statistic 
            var result = new DeepInformation
            {
                MessageCount = _statisticService.GetMessageCount()
            };

            return new JsonResult(result);
        }
    }

    public class DeepInformation
    {
        public ulong MessageCount { get; set; }
    }    
}
