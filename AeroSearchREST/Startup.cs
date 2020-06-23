using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using AeroSearchREST.Models;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

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

            services.AddDbContext<AeroSearchContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ConnectionDB")));
            services.AddSingleton<IServiceRedisCache>(new ServiceRedisCache(Configuration.GetConnectionString("RedisHost")));
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
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AeroSearch API", Version = "v1" });
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
            }


            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = string.Empty;
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });            
        }

        public void Initialize()
        {

        }
    }
}
