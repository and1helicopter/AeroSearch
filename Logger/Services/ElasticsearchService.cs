using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoggerService.Services
{
    public class ElasticsearchService : IElasticsearchService
    {
        public void SendLog(LogInfo log)
        {
            //TODO: save log to elastic

        }
    }

    interface IElasticsearchService
    {
        void SendLog(LogInfo log);
    }

    public class LogInfo
    {
        public string level;
        public DateTime dateTime;
        public string source;
        public string message;
    }

}
