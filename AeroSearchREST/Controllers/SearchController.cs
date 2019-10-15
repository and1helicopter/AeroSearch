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
using AeroSearchREST.JSON;
using Newtonsoft.Json.Serialization;
using AeroSearchREST.Extentions;
using AeroSearchREST.Models.Data;

namespace AeroSearchREST.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly WebAppContext _context;

        public SearchController(WebAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ContentResult> Get([FromQuery]SearchParam searchParam)
        {
            var result = await GetAero(searchParam);

            var answer = new ContentResult();
            answer.Content = JsonConvert.SerializeObject(result);

            return answer;
        }


        [NonAction]
        public async Task<List<SearchAero_Filtred>> GetAero(SearchParam searchParam)
        {
            var client = new RestClient("https://www.aviasales.com/adaptors/chains/rt_search_native_format");
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(
                new
                {
                    know_english = true,
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

            var client2 = new RestClient($"https://www.aviasales.com/searches_results_united?uuid={search_id}");
            var request2 = new RestRequest(Method.GET);

            var list = new List<SearchAero>();

            for (int i = 0; i < 10; i++)
            {
                var response2 = await client2.ExecuteTaskAsync(request2);

                var listTemp = JsonConvert.DeserializeObject<List<SearchAeroRS>>(response2.Content);

                foreach (var item in listTemp)
                {
                    if (!item.Proposals.IsNullOrEmpty())
                    {
                        var siteTemp = item.GatesInfo.Site.FirstOrDefault().Value;
                        if (siteTemp["site"] == null) continue;
                        var site = siteTemp["site"].ToString();

                        var airoportTemp = item.Airports.Airports;

                        foreach (var offer in item.Proposals)
                        {
                            var priceTemp = offer.Terms.Variables.FirstOrDefault().Value;

                            var price = priceTemp["price"].ToString();
                            var currency = priceTemp["currency"].ToString();


                            var offerTEmp = new SearchAero()
                            {
                                ShearchId = item.SearchId,
                                Offer = new SearchAero_Offer()
                                {
                                    Price = Convert.ToDecimal(price),
                                    Currency = currency,
                                    Url = site,
                                },
                                Routes = offer.Segment.Select(_route => new SearchAero_Route()
                                {
                                    Arrival_City = new SearchAero_City()
                                    {
                                        Airport = airoportTemp[_route.Flights.FirstOrDefault().Arrival]["name"].ToString(),
                                        City = airoportTemp[_route.Flights.FirstOrDefault().Arrival]["city"].ToString(),
                                        Country = airoportTemp[_route.Flights.FirstOrDefault().Arrival]["country"].ToString()
                                    },
                                    Arrival_DateTime = _route.Flights.FirstOrDefault().ArrivalDate.Date
                                                     + _route.Flights.FirstOrDefault().ArrivalTime.TimeOfDay,
                                    Departure_City = new SearchAero_City()
                                    {
                                        Airport = airoportTemp[_route.Flights.FirstOrDefault().Departure]["name"].ToString(),
                                        City = airoportTemp[_route.Flights.FirstOrDefault().Departure]["city"].ToString(),
                                        Country = airoportTemp[_route.Flights.FirstOrDefault().Departure]["country"].ToString()
                                    },
                                    Departure_DateTime = _route.Flights.FirstOrDefault().DepartureDate.Date
                                                       + _route.Flights.FirstOrDefault().DepartureTime.TimeOfDay,
                                    Duration = _route.Flights.FirstOrDefault().Duration,
                                    StopCount = _route.Flights.Length - 1,
                                    Segment = _route.Flights.Select(_segment => new SearchAero_Segment()
                                    {
                                        Aircraft = _segment.Aircraft,
                                        Company = _segment.Carrier,
                                        Duration = _segment.Duration,
                                        Flight = _segment.TripClass + _segment.Carrier + _segment.Number,
                                        Arrival_City = new SearchAero_City()
                                        {
                                            Airport = airoportTemp[_segment.Arrival]["name"].ToString(),
                                            City = airoportTemp[_segment.Arrival]["city"].ToString(),
                                            Country = airoportTemp[_segment.Arrival]["country"].ToString()
                                        },
                                        Arrival_DateTime = _segment.ArrivalDate.Date + _segment.ArrivalTime.TimeOfDay,
                                        Departure_City = new SearchAero_City
                                        {
                                            Airport = airoportTemp[_segment.Departure]["name"].ToString(),
                                            City = airoportTemp[_segment.Departure]["city"].ToString(),
                                            Country = airoportTemp[_segment.Departure]["country"].ToString()
                                        },
                                        Departure_DateTime = _segment.DepartureDate.Date + _segment.DepartureTime.TimeOfDay
                                    }).ToList()
                                }).ToList(),
                            };

                            list.Add(offerTEmp);
                        }
                    }
                }
            }
            var answer = new ContentResult();
            var listAnswer = Filter(list);
                       
            return listAnswer;
        }

        [HttpGet("/{Radius}", Name = "Radius")]
        public async Task<ActionResult> GetRadius([FromQuery]SearchParam searchParam, int radius)
        {
            var name = searchParam.segments[0].origin;
            var cities = await _context.City.ToListAsync();
            var airports = await _context.Airport.ToListAsync();
            var origin = cities.FirstOrDefault(_city => _city.Code == name);
            var geo = new GeoCoordinate(origin.Latitude, origin.Longitude);
            var listCity = cities.Where(_city => IsInsideRadius(geo, new GeoCoordinate(_city.Latitude, _city.Longitude), radius * 1000)).ToList();
            var listAirports = new List<Airport>();
            foreach (var city in listCity)
            {
                var airport = airports.Where(_airport => _airport.CityCode == city.Code).ToList();
                listAirports.AddRange(airport);
            }

            var result = new List<SearchAero_Filtred>();

            foreach (var airport in listAirports)
            {
                var searchParamTemp = new SearchParam()
                {
                    adults = searchParam.adults,
                    children = searchParam.children,
                    infants = searchParam.infants,
                    segments = searchParam.segments.Select(_segment => new SearchParam_Segment()
                    {
                        date = _segment.date,
                        destination = _segment.destination == name ? airport.Code : _segment.destination,
                        origin = _segment.origin == name ? airport.Code : _segment.origin,
                    }).ToList()
                };

                var resultTemp = await GetAero(searchParamTemp);
                result.AddRange(resultTemp);
            }

            var answer = new ContentResult();
            var resultOrdered = result.OrderBy(_filter => _filter.LowPrice).ToList();
            answer.Content = JsonConvert.SerializeObject(resultOrdered);

            return answer;
        }


        [HttpGet("tests")]
        public async Task<ActionResult> Tests([FromQuery]SearchParam searchParam)
        {
            var cities = await _context.City.ToListAsync();

            var origin = cities.FirstOrDefault(_city => _city.Code == searchParam.segments[0].origin);

            var geo = new GeoCoordinate(origin.Latitude, origin.Longitude);                       

            var list = cities.Where(_city => IsInsideRadius(geo, new GeoCoordinate(_city.Latitude, _city.Longitude), 350 * 1000)).ToList();
            return new JsonResult(list);
        }

        private class SearchResponse
        {
            [JsonProperty("search_id", Required = Required.Default)]
            public string search_id { get; set; }
        }

        [NonAction]
        public List<SearchAero_Filtred> Filter(List<SearchAero> searchAeros)
        {
            var result = new List<SearchAero_Filtred>();

            foreach (var itemSearch in searchAeros)
            {
                var contains = false;
                var number_val = 0;

                for(var number = 0; number < result.Count; number++)
                {
                    if (itemSearch.Routes.Count != result[number].Routes.Count) continue;
                    else
                    {
                        var count = itemSearch.Routes.Count;
                        for(int i = 0; i < count; i++)
                        {
                            if (itemSearch.Routes[i].Segment.Count != result[number].Routes[i].Segment.Count)
                            {
                                contains = false;
                                break;
                            }
                            else
                            {
                                var countSegment = itemSearch.Routes[i].Segment.Count;

                                for (int j = 0; j < countSegment; j++)
                                {
                                    if (!itemSearch.Routes[i].Segment[j].Flight.Equals(result[number].Routes[i].Segment[j].Flight))
                                    {
                                        contains = false;
                                        break;
                                    }
                                    contains = true;
                                    number_val = number;
                                }
                            }
                        }
                    }

                    if (contains) break;
                }

                if (!contains)
                {
                    var filtred = new SearchAero_Filtred();
                    filtred.ShearchId = itemSearch.ShearchId;
                    filtred.Offers.Add(itemSearch.Offer);
                    filtred.Routes = itemSearch.Routes;

                    filtred.LowPrice = itemSearch.Offer.Price;

                    result.Add(filtred);
                }
                else
                {
                    result[number_val].Offers.Add(itemSearch.Offer);
                }
            }
            var resultOrdered = result.OrderBy(_filter => _filter.LowPrice).ToList();

            return resultOrdered;
        }


        [NonAction]
        public double GetDistance(GeoCoordinate geo_1, GeoCoordinate geo_2)
        {
            var d1 = geo_1.latitude * (Math.PI / 180.0);
            var num1 = geo_1.longitude * (Math.PI / 180.0);
            var d2 = geo_2.latitude * (Math.PI / 180.0);
            var num2 = geo_2.longitude * (Math.PI / 180.0) - num1;
            var d3 = Math.Pow(Math.Sin((d2 - d1) / 2.0), 2.0) + Math.Cos(d1) * Math.Cos(d2) * Math.Pow(Math.Sin(num2 / 2.0), 2.0);

            return 6376500.0 * (2.0 * Math.Atan2(Math.Sqrt(d3), Math.Sqrt(1.0 - d3)));
        }

        [NonAction]
        public bool IsInsideRadius(GeoCoordinate geo_1, GeoCoordinate geo_2, double radius)
        {
            return radius > GetDistance(geo_1, geo_2);
        }
    }

    public class GeoCoordinate
    {
        public double latitude { get; set; }
        public double longitude { get; set; }

        public GeoCoordinate(double _latitude, double _longitude)
        {
            latitude = _latitude;
            longitude = _longitude;
        }
    }


    public class SearchParam
    {
        public int adults { get; set; }
        public int children { get; set; }
        public int infants { get; set; }
        public List<SearchParam_Segment> segments { get; set; } = new List<SearchParam_Segment>();
    }

    public class SearchParam_Segment
    {
        public string date { get; set; }
        public string origin { get; set; }
        public string destination { get; set; }
    }
}