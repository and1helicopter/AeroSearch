using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RestSharp;
using AeroSearchREST.Models;

namespace AeroSearchREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirportsController : ControllerBase
    {
        private readonly WebAppContext _context;

        public AirportsController(WebAppContext context)
        {
            _context = context;
        }

        // GET: api/Airports
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var client = new RestClient("http://api.travelpayouts.com/data/ru/airports.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);

            var json = response.Content;

            if (string.IsNullOrEmpty(json)) return new ConflictResult();

            var airports = JsonConvert.DeserializeObject<List<AirportJson>>(json);

            foreach (var airport in airports)
            {
                if (string.IsNullOrEmpty(airport?.code) || string.IsNullOrEmpty(airport?.nameEng?.nameEng) || string.IsNullOrEmpty(airport?.countryCode)
                    || string.IsNullOrEmpty(airport?.cityCode) || airport.coordinates == null) continue;

                var airportTemp = new Airport
                {
                    Code = airport.code,
                    NameEng = airport.nameEng.nameEng,
                    NameRus = airport.nameRus ?? airport.nameEng.nameEng,
                    CountryCode = airport.countryCode,
                    CityCode = airport.cityCode,
                    Latitude = airport.coordinates?.lat ?? 0,
                    Longitude = airport.coordinates?.lon ?? 0
                };

                if (!_context.Airport.Any(_airport => _airport.Code == airportTemp.Code))
                    _context.Airport.Add(airportTemp);
            }

            await _context.SaveChangesAsync();

            return new OkResult();
        }

        private class AirportJson
        {
            [JsonProperty("code", Required = Required.Default)]
            public string code;

            [JsonProperty("name", Required = Required.Default)]
            public string nameRus;

            [JsonProperty("name_translations", Required = Required.Default)]
            public AirportJson_Eng nameEng;

            [JsonProperty("coordinates", Required = Required.Default)]
            public AirportJson_Coordinates coordinates;

            [JsonProperty("country_code", Required = Required.Default)]
            public string countryCode;

            [JsonProperty("city_code", Required = Required.Default)]
            public string cityCode;
        }

        private class AirportJson_Eng
        {
            [JsonProperty("en", Required = Required.Default)]
            public string nameEng;
        }

        private class AirportJson_Coordinates
        {
            [JsonProperty("lon", Required = Required.Default)]
            public double lon;

            [JsonProperty("lat", Required = Required.Default)]
            public double lat;
        }
    }
}
