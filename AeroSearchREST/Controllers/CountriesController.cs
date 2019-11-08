using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using AeroSearchREST.Models;

namespace AeroSearchREST.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly AeroSearchContext _context;

        public CountriesController(AeroSearchContext context)
        {
            _context = context;
        }

        // GET: api/Countries
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var client = new RestClient("http://api.travelpayouts.com/data/ru/countries.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);

            var json = response.Content;

            if(string.IsNullOrEmpty(json)) return new ConflictResult();

            var countries = JsonConvert.DeserializeObject<List<CountryJson>>(json);

            foreach (var country in countries)
            {
                var countryTemp = new Country
                {
                    Code = country.code,
                    NameEng = country.nameEng.nameEng,
                    NameRus = country.nameRus
                };

                if(!_context.Country.Any(_country => _country.Code == countryTemp.Code))
                    _context.Country.Add(countryTemp);
            }

            await _context.SaveChangesAsync();

            return new OkResult();
        }

        private class CountryJson
        {
            [JsonProperty("name", Required = Required.Always)]
            public string nameRus;
            [JsonProperty("code", Required = Required.Always)]
            public string code;
            [JsonProperty("name_translations", Required = Required.Always)]
            public CountryJson_Eng nameEng;
        }

        private class CountryJson_Eng
        {
            [JsonProperty("en", Required = Required.Always)]
            public string nameEng;
        }    
    }
}
