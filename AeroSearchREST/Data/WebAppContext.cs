using Microsoft.EntityFrameworkCore;
using AeroSearchREST.Models;

namespace AeroSearchREST.Models
{
    public class AeroSearchContext : DbContext
    {
        public AeroSearchContext (DbContextOptions<AeroSearchContext> options)
            : base(options)
        {
        }

        public DbSet<Country> Country { get; set; }

        public DbSet<City> City { get; set; }

        public DbSet<Airport> Airport { get; set; }

        public DbSet<Arline> Arline { get; set; }
    }
}
