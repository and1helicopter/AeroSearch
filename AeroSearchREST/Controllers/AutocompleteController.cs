using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace webREST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutocompleteController : ControllerBase
    {     
        // GET: api/Autocomplete
        [HttpGet]
        public IEnumerable<string> Get(string  text, string lang)
        {
            lang = lang ?? "en";

            var client = new RestClient($"http://autocomplete.travelpayouts.com/places2?term={text}&locale={lang}&types[]=country,city");
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);

            return new string[] { "value1", "value2" };
        }
    }
}
