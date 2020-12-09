using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using AeroSearchREST.Models;
using Microsoft.OpenApi.Models;
using System.IO;
using System;
using System.Reflection;
using Serilog;

namespace AeroSearchREST
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string MyAllowSpecificOrigins = "myAllowSpecificOrigins";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // Use a PostgreSQL database
            var postgreConnectionString = Configuration.GetSection("PostgreSQL").GetSection("ConnectionStrings").Value;
            services.AddDbContext<AeroSearchContext>(options => options.UseLazyLoadingProxies().UseNpgsql(postgreConnectionString));

            //Singleton т.к. один кэш постянный на все приложение
            services.Configure<RedisCacheConfiguration>(Configuration.GetSection("Redis"));
            services.AddSingleton<IRedisCacheService, RedisCacheService>();

            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:9001").AllowAnyHeader().AllowAnyMethod();
                    });
            });

            //services.AddDistributedRedisCache(option =>
            //    {
            //        option.Configuration = Configuration.GetConnectionString("RedisHost");
            //        option.InstanceName = Configuration.GetConnectionString("RedisInstance");
            //    });

            services.AddSwaggerGen(c =>
            {
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
                c.SwaggerDoc("v1", new OpenApiInfo 
                { 
                    Title = "AeroSearch API", 
                    Version = "v1",
                    Description = "API to air search",
                    Contact = new OpenApiContact()
                    {
                        Name = "Denis Zaika",
                        Email = "and1helicopter@mail.ru"
                    }
                });
            });
        }


        //API token:     eb8a6267a4e794733a266041cc3d85c0
        //Marker   :     243531

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                    c.RoutePrefix = string.Empty;
                });
            }

            app.UseSerilogRequestLogging();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });            
        }
    }
}
