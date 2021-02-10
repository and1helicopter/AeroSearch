using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using AeroSearchREST.Models;

namespace AeroSearchREST.Controllers
{
    public static class InitializeAirports
    {
        public static async Task<ActionResult> Get(AeroSearchContext _context)
        {
            var client = new RestClient("http://api.travelpayouts.com/data/ru/airports.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);

            var json = response.Content;

            if (string.IsNullOrEmpty(json)) return new ConflictResult();

            var airports = JsonConvert.DeserializeObject<List<AirportJson>>(json);

            foreach (var airport in airports)
            {
                if (string.IsNullOrEmpty(airport?.Code) || string.IsNullOrEmpty(airport?.NameEng?.NameEng) || string.IsNullOrEmpty(airport?.CountryCode)
                    || string.IsNullOrEmpty(airport?.CityCode) || airport.Coordinates == null) continue;

                var airportTemp = new Airport
                {
                    Code = airport.Code,
                    NameEng = airport.NameEng.NameEng,
                    NameRus = airport.NameRus ?? airport.NameEng.NameEng,
                    CountryCode = airport.CountryCode,
                    CityCode = airport.CityCode,
                    Latitude = airport.Coordinates?.Lat ?? 0,
                    Longitude = airport.Coordinates?.Lon ?? 0
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
            public string Code;

            [JsonProperty("name", Required = Required.Default)]
            public string NameRus;

            [JsonProperty("name_translations", Required = Required.Default)]
            public AirportJson_Eng NameEng;

            [JsonProperty("coordinates", Required = Required.Default)]
            public AirportJson_Coordinates Coordinates;

            [JsonProperty("country_code", Required = Required.Default)]
            public string CountryCode;

            [JsonProperty("city_code", Required = Required.Default)]
            public string CityCode;
        }

        private class AirportJson_Eng
        {
            [JsonProperty("en", Required = Required.Default)]
            public string NameEng;
        }

        private class AirportJson_Coordinates
        {
            [JsonProperty("lon", Required = Required.Default)]
            public double Lon;

            [JsonProperty("lat", Required = Required.Default)]
            public double Lat;
        }
    }
}
