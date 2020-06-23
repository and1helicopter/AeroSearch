using AeroSearchREST.Models;
using AeroSearchREST.Models.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System.Linq;

namespace AeroSearchREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RadiusController : Controller
    {
        private readonly AeroSearchContext _context;
        private readonly IServiceRedisCache _memoryCache;

        public RadiusController(AeroSearchContext context, IServiceRedisCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        [EnableCors("myAllowSpecificOrigins")]
        [HttpPost("City")]
        public JsonResult GetCitiesByRadius(string IATA, int Radius)
        {
            if (string.IsNullOrEmpty(IATA))
                return Json("empty");          

            var cities = _memoryCache.Cache.GeoRadius("cities", IATA.ToUpper(), Radius, GeoUnit.Kilometers)
                .Select(_city => new Radius_Item()
                {
                    Code = _city.Member.ToString(),
                    Position = new Radius_Item_Position()
                    {
                        Latitude = _city.Position.Value.Latitude,
                        Longitude = _city.Position.Value.Longitude
                    }
                }).ToList();

            return Json(cities); 
        }

        [HttpPost("Airoport")]
        public JsonResult GetAiroportsByRadius(string airoportCode, int radius)
        {
            var airports = _memoryCache.Cache.GeoRadius("airports", airoportCode.ToUpper(), radius, GeoUnit.Kilometers)
                .Select(_airoport => new Radius_Item()
                {
                    Code = _airoport.Member.ToString(),
                    Position = new Radius_Item_Position()
                    {
                        Latitude = _airoport.Position.Value.Latitude,
                        Longitude = _airoport.Position.Value.Longitude
                    }
                }).ToList();

            return Json(airports);
        }
    }
}