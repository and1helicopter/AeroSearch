using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using Serilog;
using Serilog.Exceptions;
using Serilog.Sinks.RabbitMQ;
using Serilog.Sinks.RabbitMQ.Sinks.RabbitMQ;
using Serilog.Formatting.Json;
using System;

namespace AeroSearchREST
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var appConfiguration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", false)
                .AddJsonFile($"appsettings.{environment}.json", true)
                .Build();

            //Getting the configuration for RabbitMq
            var rabbitMqOptions = appConfiguration.GetSection("RabbitMq");

            var config = new RabbitMQClientConfiguration()
            {
                Port = Convert.ToInt32(rabbitMqOptions.GetSection("Port").Value),
                Exchange = rabbitMqOptions.GetSection("ExchangeName").Value,
                Username = rabbitMqOptions.GetSection("UserName").Value,
                Password = rabbitMqOptions.GetSection("Password").Value,
                ExchangeType = ExchangeType.Direct,
                DeliveryMode = RabbitMQDeliveryMode.NonDurable,
                RouteKey = "logs",
            };

            var hostname = rabbitMqOptions.GetSection("HostName").Value;
            var queue = rabbitMqOptions.GetSection("QueueName").Value;

            //TODO: тут это не нужно
            //Declare RabbitMq ConnectionFactory
            var factory = new ConnectionFactory() { HostName = hostname, Port = config.Port, UserName = config.Username, Password = config.Password };
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.ExchangeDeclare(exchange: config.Exchange, type: config.ExchangeType);
                    channel.QueueDeclare(queue: queue, durable: false, exclusive: false, autoDelete: false, arguments: null);
                    channel.QueueBind(queue: queue, exchange: config.Exchange, routingKey: config.RouteKey);
                }
            }

            config.Hostnames.Add(hostname);
            var sinkConfiguration = new RabbitMQSinkConfiguration()
            {
                TextFormatter = new JsonFormatter()
            };

            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Warning()
                .Enrich.FromLogContext()
                .Enrich.WithExceptionDetails()
                .Enrich.WithMachineName()
                .Enrich.WithProperty("Environment", environment)
                .WriteTo.Console()
                .WriteTo.RabbitMQ(config, sinkConfiguration)
                .CreateLogger();

            try
            {
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseKestrel();
                })
                .ConfigureAppConfiguration(configuration =>
                {
                    configuration.AddJsonFile("appsettings.json", false, true);
                    configuration.AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", true, true);
                })
                .UseSerilog();
    }
}
