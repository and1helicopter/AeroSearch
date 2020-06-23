using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using AeroSearchREST.Models;

namespace AeroSearchREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly AeroSearchContext _context;

        public CitiesController(AeroSearchContext context)
        {
            _context = context;
        }

        // GET: api/Cities
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var client = new RestClient("http://api.travelpayouts.com/data/ru/cities.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);

            var json = response.Content;

            if (string.IsNullOrEmpty(json)) return new ConflictResult();

            var cities = JsonConvert.DeserializeObject<List<CityJson>>(json);

            foreach (var city in cities)
            {
                if (string.IsNullOrEmpty(city?.code) || string.IsNullOrEmpty(city?.nameEng?.nameEng) || string.IsNullOrEmpty(city?.nameRus) 
                    || string.IsNullOrEmpty(city?.country_code) || city?.coordinates == null) continue;

                var cityTemp = new City
                {
                    Code = city.code,
                    NameEng = city.nameEng.nameEng,
                    NameRus = city.nameRus,
                    CountryCode = city.country_code,
                    Latitude = city.coordinates.lat,
                    Longitude = city.coordinates.lon
                };

                if (!_context.City.Any(_city => _city.Code == cityTemp.Code))
                    _context.City.Add(cityTemp);
            }

            await _context.SaveChangesAsync();

            return new OkResult();
        }

        private class CityJson
        {
            [JsonProperty("code", Required = Required.Default)]
            public string code;

            [JsonProperty("name", Required = Required.Default)]
            public string nameRus;

            [JsonProperty("name_translations", Required = Required.Default)]
            public CityJson_Eng nameEng;

            [JsonProperty("coordinates", Required = Required.Default)]
            public CityJson_Coordinates coordinates;

            [JsonProperty("country_code", Required = Required.Default)]
            public string country_code;
        }

        private class CityJson_Eng
        {
            [JsonProperty("en", Required = Required.Default)]
            public string nameEng;
        }

        private class CityJson_Coordinates
        {
            [JsonProperty("lon", Required = Required.Default)]
            public double lon;

            [JsonProperty("lat", Required = Required.Default)]
            public double lat;
        }
    }
}
