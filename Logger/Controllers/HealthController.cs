using Microsoft.AspNetCore.Mvc;

namespace LoggerService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : Controller
    {
        [HttpGet("shallow")]
        public StatusCodeResult Shallow()
        {
            return new StatusCodeResult(200);
        }
    }
}
