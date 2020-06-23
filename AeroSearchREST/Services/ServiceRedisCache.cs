using Microsoft.Extensions.Configuration;
using StackExchange.Redis;
using System;

namespace AeroSearchREST
{
    public interface IServiceRedisCache
    {
        IDatabase Cache { get; }
    }

    public class ServiceRedisCache : IServiceRedisCache
    {
        private ConnectionMultiplexer redis;
        public IDatabase Cache
        { 
            get { return redis.GetDatabase(); } 
        }

        public ServiceRedisCache(string host)
        {
            //        option.InstanceName = Configuration.GetConnectionString("RedisInstance"); 
            redis = ConnectionMultiplexer.Connect(host);
        }
    }
}
