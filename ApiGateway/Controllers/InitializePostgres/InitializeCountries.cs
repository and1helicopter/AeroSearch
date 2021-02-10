using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using AeroSearchREST.Models;

namespace AeroSearchREST.Controllers
{
    public static class InitializeCountries
    {
        public static async Task<ActionResult> Get(AeroSearchContext _context)
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
                    Code = country.Code,
                    NameEng = country.NameEng.NameEng,
                    NameRus = country.NameRus
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
            public string NameRus;
            [JsonProperty("code", Required = Required.Always)]
            public string Code;
            [JsonProperty("name_translations", Required = Required.Always)]
            public CountryJson_Eng NameEng;
        }

        private class CountryJson_Eng
        {
            [JsonProperty("en", Required = Required.Always)]
            public string NameEng;
        }    
    }
}
