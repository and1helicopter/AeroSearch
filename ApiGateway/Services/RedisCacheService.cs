using AeroSearchREST.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using StackExchange.Redis;
using System.Linq;

namespace AeroSearchREST
{
    public class RedisCacheConfiguration
    {
        public string HostName { get; set; }
        public int Port { get; set; }
        public string Instance { get; set; }
    }

    public interface IRedisCacheService
    {
        IDatabase CacheDb0 { get; }
        IDatabase CacheDb1 { get; }

    }

    public class RedisCacheService : IRedisCacheService
    {
        private ConnectionMultiplexer redis;
        public IDatabase CacheDb0
        { 
            get { return redis.GetDatabase(0); } 
        }
        public IDatabase CacheDb1
        {
            get { return redis.GetDatabase(1); }
        }

        public RedisCacheService(IOptions<RedisCacheConfiguration> options, IServiceScopeFactory serviceProvider)
        {
            redis = ConnectionMultiplexer.Connect($"{options.Value.HostName}:{options.Value.Port}");

            //Первая инициализация долго
            using (var scope = serviceProvider.CreateScope())
            {
                var aeroSearchContext = scope.ServiceProvider.GetRequiredService<AeroSearchContext>();

                var airports = aeroSearchContext.Airport.ToList();

                var cities = aeroSearchContext.City.ToList();

                foreach (var airport in airports)
                {
                    //Coordinate of airport
                    redis.GetDatabase(0).GeoAdd("airports", new GeoEntry(airport.Longitude, airport.Latitude, airport.Code));
                    //Airport in city
                    redis.GetDatabase(1).SetAdd(airport.CityCode, airport.Code);
                    //Rus name airoport
                    redis.GetDatabase(0).HashSet("airportsRU", airport.Code, airport.NameRus);
                    //Eng name airoport
                    redis.GetDatabase(0).HashSet("airportsEN", airport.Code, airport.NameEng);
                }

                foreach (var city in cities)
                {
                    //Coordinate of city
                    redis.GetDatabase(0).GeoAdd("cities", new GeoEntry(city.Longitude, city.Latitude, city.Code));
                    //Rus name city
                    redis.GetDatabase(0).HashSet("citiesRU", city.Code, city.NameRus);
                    //Eng name city
                    redis.GetDatabase(0).HashSet("citiesEN", city.Code, city.NameEng);
                }
            }
        }
    }
}
