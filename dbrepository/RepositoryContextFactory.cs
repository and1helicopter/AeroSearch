using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.EntityFrameworkCore;
using DB_Repository.Interfaces;

namespace DB_Repository
{
    public class RepositoryContextFactory : IRepositoryContextFactory
    {
        public RepositoryContext CreateDbContext(string connectionString)
        {
            var optionBuilder = new DbContextOptionsBuilder<RepositoryContext>();
            optionBuilder.UseSqlServer(connectionString);
            return new RepositoryContext(optionBuilder.Options);
        }
    }
}