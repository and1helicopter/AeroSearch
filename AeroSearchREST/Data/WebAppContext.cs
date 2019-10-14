using Microsoft.EntityFrameworkCore;
using AeroSearchREST.Models;

namespace AeroSearchREST.Models
{
    public class WebAppContext : DbContext
    {
        public WebAppContext (DbContextOptions<WebAppContext> options)
            : base(options)
        {
        }

        public DbSet<Country> Country { get; set; }

        public DbSet<City> City { get; set; }

        public DbSet<Airport> Airport { get; set; }

        public DbSet<Arline> Arline { get; set; }
    }
}
