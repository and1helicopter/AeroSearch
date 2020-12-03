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
        IDatabase Cache { get; }
    }

    public class RedisCacheService : IRedisCacheService
    {
        private ConnectionMultiplexer redis;
        public IDatabase Cache
        { 
            get { return redis.GetDatabase(); } 
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
                    //Coordinate
                    redis.GetDatabase(0).GeoAdd("airports", new GeoEntry(airport.Longitude, airport.Latitude, airport.Code));
                    //Airoport in city
                    redis.GetDatabase(1).SetAdd(airport.CityCode, airport.Code);
                    //Rus name airoport
                    redis.GetDatabase(0).HashSet("airportsRU", airport.Code, airport.NameRus);
                    //Eng name airoport
                    redis.GetDatabase(0).HashSet("airportsEN", airport.Code, airport.NameEng);

                }

                foreach (var city in cities)
                {
                    redis.GetDatabase().GeoAdd("cities", new GeoEntry(city.Longitude, city.Latitude, city.Code));
                }
            }
        }
    }
}
