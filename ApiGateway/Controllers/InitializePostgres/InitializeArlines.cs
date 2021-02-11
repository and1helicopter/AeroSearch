using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using AeroSearchREST.Models;

namespace AeroSearchREST.Controllers
{
    public static class InitializeArlines
    {
        public static async Task<ActionResult> Get(AeroSearchContext _context)
        {
            var client = new RestClient("http://api.travelpayouts.com/data/ru/airlines.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);

            var json = response.Content;

            if (string.IsNullOrEmpty(json)) return new ConflictResult();

            var airlines = JsonConvert.DeserializeObject<List<ArlineJson>>(json);

            foreach (var airline in airlines)
            {
                if (string.IsNullOrEmpty(airline?.Code) || string.IsNullOrEmpty(airline?.Name?.NameEng)) continue;

                var airlineTemp = new Arline
                {
                    Code = airline.Code,
                    Name = airline.Name.NameEng,
                };

                if (!_context.Arline.Any(_airline => _airline.Code == airlineTemp.Code))
                    _context.Arline.Add(airlineTemp);
            }

            await _context.SaveChangesAsync();

            return new OkResult();
        }

        private class ArlineJson
        {
            [JsonProperty("code", Required = Required.Default)]
            public string Code;

            [JsonProperty("name_translations", Required = Required.Default)]
            public Arline_Eng Name;
        }

        private class Arline_Eng
        {
            [JsonProperty("en", Required = Required.Default)]
            public string NameEng;
        }
    }
}
