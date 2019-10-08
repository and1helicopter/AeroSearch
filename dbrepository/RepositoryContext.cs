using System;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DB_Repository
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options){}

        public DbSet<GeoAiroport> GeoAiroports {get; set;}        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
