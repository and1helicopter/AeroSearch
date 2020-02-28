using AeroSearchREST.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AeroSearchREST.Initialize
{
    public static class InitializeRedisCache
    {
        public static void Initialize(AeroSearchContext aeroSearchContext, IServiceRedisCache memoryCache)
        {
            //Достаем из БД аэропорты
            var airports = aeroSearchContext.Airport.ToList();

            //Достаем из БД города
            var cities = aeroSearchContext.City.ToList();

            //Засовываем аэропоты и города в кэш
            var redis = memoryCache.Cache;

            foreach (var airport in airports)
            {
                redis.GeoAdd("airports", new GeoEntry(airport.Longitude, airport.Latitude, airport.Code));
            }

            foreach (var city in cities)
            {
                redis.GeoAdd("cities", new GeoEntry(city.Longitude, city.Latitude, city.Code));
            }
        }
    }
}
