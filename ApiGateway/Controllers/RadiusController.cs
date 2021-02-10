using AeroSearchREST.Common;
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
        /// Method will return array cities codes within the radius of the city code (Search only from cities).
        /// </summary>
        /// <param name="cityCode">code of the city</param>
        /// <param name="radius">searching radius</param>
        /// <returns>array city codes</returns>
        /// <response code="200">200 OK</response>  
        /// <response code="400">400 Bad Request</response>  
        /// <response code="404">404 Not Found</response> 
        [EnableCors("myAllowSpecificOrigins")]
        [ProducesResponseType(typeof(RadiusResult<RadiusItem>), 200)]
        [ProducesResponseType(typeof(RadiusResult<object>), 400)]
        [ProducesResponseType(typeof(RadiusResult<object>), 404)]
        [HttpGet("City")]
        public JsonResult GetCitiesByRadius(string cityCode, int radius)
        {
            var result = new RadiusResult<RadiusItem>();

            try
            {
                var cities = _memoryCache.CacheDb0.GeoRadius("cities", cityCode.ToUpper(), radius, GeoUnit.Kilometers)
                    .Select(_city => new RadiusItem()
                    {
                        Code = _city.Member.ToString(),
                        Name = new RadiusItemName()
                        {
                            Eng = _memoryCache.CacheDb0.HashGet("citiesEN", _city.Member.ToString()).ToString(),
                            Rus = _memoryCache.CacheDb0.HashGet("citiesRU", _city.Member.ToString()).ToString()
                        },
                        Position = new RadiusItemPosition()
                        {
                            Latitude = _city.Position.Value.Latitude,
                            Longitude = _city.Position.Value.Longitude
                        }
                    }).ToList();

                if (cities.IsNullOrEmpty())
                {
                    result.Status = "404";
                    result.Text = "404 Not Found";
                }
                else
                {
                    result.Status = "200";
                    result.Text = "200 OK";
                    result.Result = cities;
                }

                return Json(result);
            }
            catch (System.Exception)
            {
                result.Status = "400";
                result.Text = "400 Bad Request";
                return Json(result);
            }
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
        [HttpGet("Airoport")]
        public JsonResult GetAiroportsByRadius(string airoportCode, int radius)
        {
            var result = new RadiusResult<RadiusItem>();

            try
            {
                 var airports = _memoryCache.CacheDb0.GeoRadius("airports", airoportCode.ToUpper(), radius, GeoUnit.Kilometers)
                    .Select(_airoport => new RadiusItem()
                    {
                        Code = _airoport.Member.ToString(),
                        Name = new RadiusItemName()
                        {
                            Eng = _memoryCache.CacheDb0.HashGet("airportsEN", _airoport.Member.ToString()).ToString(),
                            Rus = _memoryCache.CacheDb0.HashGet("airportsRU", _airoport.Member.ToString()).ToString()
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
        [HttpGet("")]
        public JsonResult GetArrayAiroportsByRadius(string code, double radius)
        {
            var result = new RadiusResult<RadiusItem>();

            try
            {
                var airportCode = string.Empty;

                var airport = _memoryCache.CacheDb0.GeoPosition("airports", code);

                if (airport == null)
                {
                    var city = _memoryCache.CacheDb0.GeoPosition("cities", code);

                    if (city != null)
                    {
                        var airoports = _memoryCache.CacheDb1.SetMembers(code);

                        if (airoports.Any())
                        {
                            airportCode = airoports.FirstOrDefault();
                        }
                    }
                }
                else
                {
                    airportCode = code;
                }

                if (string.IsNullOrEmpty(airportCode))
                {
                    result.Status = "404";
                    result.Text = "404 Not Found";
                    return Json(result);
                }

                var airports = _memoryCache.CacheDb0.GeoRadius("airports", airportCode, radius, GeoUnit.Kilometers)
                   .Select(_airoport => new RadiusItem()
                   {
                       Code = _airoport.Member.ToString(),
                       Name = new RadiusItemName()
                       {
                           Eng = _memoryCache.CacheDb0.HashGet("airportsEN", _airoport.Member.ToString()).ToString(),
                           Rus = _memoryCache.CacheDb0.HashGet("airportsRU", _airoport.Member.ToString()).ToString()
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
                return Json(result);
            }
        }
    }
}