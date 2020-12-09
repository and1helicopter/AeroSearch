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
using Serilog.Events;

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

            config.Hostnames.Add(rabbitMqOptions.GetSection("HostName").Value);
            var sinkConfiguration = new RabbitMQSinkConfiguration()
            {
                TextFormatter = new JsonFormatter()
            };

            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .Enrich.WithExceptionDetails()
                .Enrich.WithMachineName()
                .Enrich.WithProperty("Environment", environment)
                //.MinimumLevel.Debug()
                //.MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
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
