using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Serilog;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LoggerService.Services
{
    public class RabbitMqConfiguration
    {
        public string HostName { get; set; }
        public int Port { get; set; }
        public string QueueName { get; set; }
        public string ExchangeName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string RoutingKey { get; set; }
    }

    public class RabbitMqService : BackgroundService
    {
        private IModel _channel;
        private IConnection _connection;
        private StatisticService _statisticService;
        private readonly int _port;
        private readonly string _hostName;
        private readonly string _queueName;
        private readonly string _userName;
        private readonly string _password;
        private readonly string _exchangeName;
        private readonly string _routingKey;

        public RabbitMqService(IOptions<RabbitMqConfiguration> rabbitMqOptions, StatisticService statisticService)
        {
            _hostName = rabbitMqOptions.Value.HostName;
            _queueName = rabbitMqOptions.Value.QueueName;
            _userName = rabbitMqOptions.Value.UserName;
            _password = rabbitMqOptions.Value.Password;
            _exchangeName = rabbitMqOptions.Value.ExchangeName;
            _port = rabbitMqOptions.Value.Port;
            _routingKey = rabbitMqOptions.Value.RoutingKey;
            _statisticService = statisticService;

            var factory = new ConnectionFactory
            {
                HostName = _hostName,
                UserName = _userName,
                Password = _password,
                Port = _port
            };

            //Declare RabbitMq ConnectionFactory
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.ExchangeDeclare(exchange: _exchangeName, type: ExchangeType.Direct);
            _channel.QueueDeclare(queue: _queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
            _channel.QueueBind(queue: _queueName, exchange: _exchangeName, routingKey: _routingKey);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (ch, ea) =>
            {
                var content = Encoding.UTF8.GetString(ea.Body.ToArray());
                //Обработка запроса

                _statisticService.IncrimentMessageCount();

                //Write to ElasticSearch
                Log.Information(content);

                _channel.BasicAck(ea.DeliveryTag, false);
            };

            _channel.BasicConsume(_queueName, false, consumer);

            return Task.CompletedTask;
        }

        public override void Dispose()
        {
            _channel.Close();
            _connection.Close();
            base.Dispose();
        }
    }
}
