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
    public class ArlinesController : ControllerBase
    {
        private readonly AeroSearchContext _context;

        public ArlinesController(AeroSearchContext context)
        {
            _context = context;
        }

        // GET: api/Arlines
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var client = new RestClient("http://api.travelpayouts.com/data/ru/airlines.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);

            var json = response.Content;

            if (string.IsNullOrEmpty(json)) return new ConflictResult();

            var airlines = JsonConvert.DeserializeObject<List<ArlineJson>>(json);

            foreach (var airline in airlines)
            {
                if (string.IsNullOrEmpty(airline?.code) || string.IsNullOrEmpty(airline?.name?.nameEng)) continue;

                var airlineTemp = new Arline
                {
                    Code = airline.code,
                    Name = airline.name.nameEng,
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
            public string code;

            [JsonProperty("name_translations", Required = Required.Default)]
            public Arline_Eng name;
        }

        private class Arline_Eng
        {
            [JsonProperty("en", Required = Required.Default)]
            public string nameEng;
        }
    }
}
