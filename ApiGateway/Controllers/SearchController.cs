using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using AeroSearchREST.JSON;

//TODO: перенести в SearchService
namespace AeroSearchREST.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly IRedisCacheService _memoryCache;

        public SearchController(IRedisCacheService memoryCache)
        {
            _memoryCache = memoryCache;
        }

        [HttpPost]
        public async Task<JsonResult> Get([FromQuery]SearchParam searchParam)
        {
            searchParam.segments = new SearchParam_Segment[]
            {
                new SearchParam_Segment()
                {
                    date = "2020-12-12",
                    destination = "MOW",
                    origin = "LED"
                }
            };

            var client = new RestClient("https://www.aviasales.com/adaptors/chains/rt_search_native_format");
            var request = new RestRequest(Method.POST);           
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(
                new
                {
                    know_english = true,
                    currency = "rub",
                    passengers = new
                    {
                        searchParam.adults,
                        searchParam.children,
                        searchParam.infants
                    },
                    searchParam.segments
                });

            IRestResponse response = client.Execute(request);

            var search_id = JsonConvert.DeserializeObject<SearchResponse>(response.Content).search_id;

            var client2 = new RestClient($"https://www.aviasales.com/searches_results_united?uuid={search_id}");
            var request2 = new RestRequest(Method.GET);

            var list = new List<SearchAeroRS>();

            for (int i = 0; i < 10; i++)
            {
                var response2 = await client2.ExecuteTaskAsync(request2);

                var listTemp = JsonConvert.DeserializeObject<List<SearchAeroRS>>(response2.Content);

                foreach (var item in listTemp)
                {
                    if (item != null) list.Add(item);
                }
            }

            return Json(list);
        }

        //[HttpGet("tests")]
        //public async Task<ActionResult> Tests([FromQuery]SearchParam searchParam)
        //{
        //    var city = _memoryCache.Cache.
        //        _context.City.FirstOrDefault(_city => _city.Code == searchParam.segments[0].origin);

        //    var airports = await _context.Airport.Where(_airport => _airport.CityCode == city.Code).ToListAsync();

        //    foreach (var airport in airports)
        //    {
        //        var temp = _memoryCache.Cache.GeoRadius(airport.Code, airport.Longitude, airport.Latitude, 350, GeoUnit.Kilometers).ToList();

        //    }

        //    //var geo = new GeoCoordinate(origin.Latitude, origin.Longitude);

        //    //var list = cities.Where(_city => IsInsideRadius(geo, new GeoCoordinate(_city.Latitude, _city.Longitude), 350 * 1000)).ToList();
        //    return new JsonResult("");
        //}

        private class SearchResponse
        {
            [JsonProperty("search_id", Required = Required.Default)]
            public string search_id { get; set; }
        }

        [NonAction]
        public double GetDistance(GeoCoordinate geo_1, GeoCoordinate geo_2)
        {
            var d1 = geo_1.latitude * (Math.PI / 180.0);
            var num1 = geo_1.longitude * (Math.PI / 180.0);
            var d2 = geo_2.latitude * (Math.PI / 180.0);
            var num2 = geo_2.longitude * (Math.PI / 180.0) - num1;
            var d3 = Math.Pow(Math.Sin((d2 - d1) / 2.0), 2.0) + Math.Cos(d1) * Math.Cos(d2) * Math.Pow(Math.Sin(num2 / 2.0), 2.0);

            return 6376500.0 * (2.0 * Math.Atan2(Math.Sqrt(d3), Math.Sqrt(1.0 - d3)));
        }

        [NonAction]
        public bool IsInsideRadius(GeoCoordinate geo_1, GeoCoordinate geo_2, double radius)
        {
            return radius > GetDistance(geo_1, geo_2);
        }
    }

    public class GeoCoordinate
    {
        public double latitude { get; set; }
        public double longitude { get; set; }

        public GeoCoordinate(double _latitude, double _longitude)
        {
            latitude = _latitude;
            longitude = _longitude;
        }
    }


    public class SearchParam
    {
        public int adults { get; set; }
        public int children { get; set; }
        public int infants { get; set; }
        public SearchParam_Segment[] segments { get; set; }
    }

    public class SearchParam_Segment
    {
        public string date { get; set; }
        public string origin { get; set; }
        public string destination { get; set; }
    }
}