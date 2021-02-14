using System;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace LoggerService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{environment}.json", true, true)
                .Build();

            //TODO: переделать на нормальное подключение к Elastic. Оставить только логи ошибок 
            Log.Logger = new LoggerConfiguration()
#if DEBUG
                .MinimumLevel.Information()
                .WriteTo.Console()
#else
                .MinimumLevel.Warning()
                //.WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri(configuration["Elastic:Uri"])) 
                //{ 
                //    AutoRegisterTemplate = true,
                //    IndexFormat = $"{Assembly.GetExecutingAssembly().GetName().Name.ToLower().Replace(".","-")}-{environment?.ToLower().Replace(".","-")}-{DateTime.UtcNow:dd-MM-yyyy}"
                //})
#endif
                .ReadFrom.Configuration(configuration)
                .CreateLogger();

            try
            {
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception exception)
            {
                Log.Fatal($"Failed to start {Assembly.GetExecutingAssembly().GetName().Name}", exception);
                throw;
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
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
