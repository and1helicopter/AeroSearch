using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;

namespace webREST.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> Get([FromQuery]SearchParam searchParam)
        {
            var client = new RestClient("https://www.aviasales.com/adaptors/chains/rt_search_native_format");
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(
                new
                {
                    know_english = true,
                    trip_class = "Y",
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

            double part = 0;

            var list = new List<string>();

            while (part < 1)
            {
                part += 0.1;

                var client2 = new RestClient($"https://www.aviasales.com/searches_results_united?uuid={search_id}");
                var request2 = new RestRequest(Method.GET);

                IRestResponse response2 = client2.Execute(request2);

                if (!string.IsNullOrEmpty(response2?.Content)) list.Add(response2.Content);
            } 
            
            return new JsonResult(list);
        }

        private class SearchResponse
        {
            [JsonProperty("search_id", Required = Required.Default)]
            public string search_id { get; set; }
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