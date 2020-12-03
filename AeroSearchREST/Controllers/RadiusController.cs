using System;
using AeroSearchREST.Common;
using AeroSearchREST.Models;
using AeroSearchREST.Models.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System.Linq;

namespace AeroSearchREST.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class RadiusController : Controller
    {
        private readonly IRedisCacheService _memoryCache;

        /// <summary>
        /// Initilize Radius Controller
        /// </summary>
        /// <param name="memoryCache">redis cache param</param>
        public RadiusController(IRedisCacheService memoryCache)
        {
            _memoryCache = memoryCache;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="IATA"></param>
        /// <param name="Radius"></param>
        /// <returns></returns>
        [EnableCors("myAllowSpecificOrigins")]
        [HttpPost("City")]
        public JsonResult GetCitiesByRadius(string IATA, int Radius)
        {
            if (string.IsNullOrEmpty(IATA))
                return Json("empty");          

            var cities = _memoryCache.Cache.GeoRadius("cities", IATA.ToUpper(), Radius, GeoUnit.Kilometers)
                .Select(_city => new RadiusItem()
                {
                    Code = _city.Member.ToString(),
                    Position = new RadiusItemPosition()
                    {
                        Latitude = _city.Position.Value.Latitude,
                        Longitude = _city.Position.Value.Longitude
                    }
                }).ToList();

            return Json(cities);
        }

        /// <summary>
        /// Method will return array airport codes within the radius of the airport code (Search only from airports). 
        /// </summary>
        /// <param name="airoportCode">code of the airport</param>
        /// <param name="radius">searching radius</param>
        /// <returns>array airport codes</returns>
        /// <response code="200">200 OK</response>  
        /// <response code="400">400 Bad Request</response>  
        /// <response code="404">404 Not Found</response> 
        [EnableCors("myAllowSpecificOrigins")]
        [ProducesResponseType(typeof(RadiusResult<RadiusItem>) , 200)]
        [ProducesResponseType(typeof(RadiusResult<object>) , 400)]
        [ProducesResponseType(typeof(RadiusResult<object>) , 404)]
        [HttpPost("Airoport")]
        public JsonResult GetAiroportsByRadius(string airoportCode, int radius)
        {
            var result = new RadiusResult<RadiusItem>();

            try
            {
                 var airports = _memoryCache.Cache.GeoRadius("airports", airoportCode.ToUpper(), radius, GeoUnit.Kilometers)
                    .Select(_airoport => new RadiusItem()
                    {
                        Code = _airoport.Member.ToString(),
                        Name = new RadiusItemName()
                        {
                            Eng = _memoryCache.Cache.HashGet("airportsEN", _airoport.Member.ToString()).ToString(),
                            Rus = _memoryCache.Cache.HashGet("airportsRU", _airoport.Member.ToString()).ToString()
                        },
                        Position = new RadiusItemPosition()
                        {
                            Latitude = _airoport.Position.Value.Latitude,
                            Longitude = _airoport.Position.Value.Longitude
                        }
                    }).ToList();

                if (airports.IsNullOrEmpty())
                {
                    result.Status = "404";
                    result.Text = "404 Not Found";
                }
                else
                {
                    result.Status = "200";
                    result.Text = "200 OK";
                    result.Result = airports;
                }                

                return Json(result);
            }
            catch (System.Exception)
            {
                result.Status = "400";
                result.Text = "400 Bad Request";
                return Json(result) ;
            }         
        }

        /// <summary>
        /// Method will return array airport codes within the radius of the airport code or the city code. 
        /// </summary>
        /// <param name="code">code of the airport or the city</param>
        /// <param name="radius">searching radius</param>
        /// <returns>array airport codes</returns>
        /// <response code="200"></response>  
        /// <response code="400"></response>  
        /// <response code="404"></response> 
        [EnableCors("myAllowSpecificOrigins")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPost("")]
        public JsonResult GetArrayAiroportsByRadius(string code, double radius)
        {
            var airport = _memoryCache.Cache.GeoPosition("airports", code);
            double? lon = null;
            double? lat = null;

            if(airport == null)
            {
                var city = _memoryCache.Cache.GeoPosition("cities", code);

                if(city != null)
                {
                    lon = city.Value.Longitude;
                    lat = city.Value.Latitude;
                }
            }
            else
            {
                lon = airport.Value.Longitude;
                lat = airport.Value.Latitude;
            }

            if(lat == null || lon == null)
            {
                return Json(new { Status = "404", Text = "404 Not Found" });
            }

            //var airports = _memoryCache.Cache.GeoPosition("airports", new RedisValue() , radius, GeoUnit.Kilometers)
            //    .Select(_airoport => new Radius_Item()
            //    {
            //        Code = _airoport.Member.ToString(),
            //        Position = new Radius_Item_Position()
            //        {
            //            Latitude = _airoport.Position.Value.Latitude,
            //            Longitude = _airoport.Position.Value.Longitude
            //        }
            //    }).ToList();


            return Json(new { Status = "200", Text = "200 OK" });
        }
    }
}