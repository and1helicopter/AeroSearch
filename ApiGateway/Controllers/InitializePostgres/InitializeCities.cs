using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using AeroSearchREST.Models;

namespace AeroSearchREST.Controllers
{
    public static class InitializeCities
    {
        public static async Task<ActionResult> Get(AeroSearchContext _context)
        {
            var client = new RestClient("http://api.travelpayouts.com/data/ru/cities.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);

            var json = response.Content;

            if (string.IsNullOrEmpty(json)) return new ConflictResult();

            var cities = JsonConvert.DeserializeObject<List<CityJson>>(json);

            foreach (var city in cities)
            {
                if (string.IsNullOrEmpty(city?.Code) || string.IsNullOrEmpty(city?.NameEng?.NameEng) || string.IsNullOrEmpty(city?.NameRus) 
                    || string.IsNullOrEmpty(city?.Country_code) || city?.Coordinates == null) continue;

                var cityTemp = new City
                {
                    Code = city.Code,
                    NameEng = city.NameEng.NameEng,
                    NameRus = city.NameRus,
                    CountryCode = city.Country_code,
                    Latitude = city.Coordinates.Lat,
                    Longitude = city.Coordinates.Lon
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
            public string Code;

            [JsonProperty("name", Required = Required.Default)]
            public string NameRus;

            [JsonProperty("name_translations", Required = Required.Default)]
            public CityJson_Eng NameEng;

            [JsonProperty("coordinates", Required = Required.Default)]
            public CityJson_Coordinates Coordinates;

            [JsonProperty("country_code", Required = Required.Default)]
            public string Country_code;
        }

        private class CityJson_Eng
        {
            [JsonProperty("en", Required = Required.Default)]
            public string NameEng;
        }

        private class CityJson_Coordinates
        {
            [JsonProperty("lon", Required = Required.Default)]
            public double Lon;

            [JsonProperty("lat", Required = Required.Default)]
            public double Lat;
        }
    }
}
