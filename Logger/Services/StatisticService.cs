﻿namespace LoggerService.Services
{
    public class StatisticService : IStatisticService
    {
        private ulong messageCount;
        public StatisticService()
        {
            messageCount = 0;
        }

        public ulong GetMessageCount()
        {
            return messageCount;
        }

        public void IncrimentMessageCount()
        {
            messageCount++;
        }
    }

    interface IStatisticService
    {
        public ulong GetMessageCount();
        public void IncrimentMessageCount();

    }
}
