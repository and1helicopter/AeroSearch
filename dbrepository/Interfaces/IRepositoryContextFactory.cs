namespace DB_Repository.Interfaces
{
    public interface IRepositoryContextFactory                     
    {
        RepositoryContext CreateDbContext(string connectionString);
    }
    
}