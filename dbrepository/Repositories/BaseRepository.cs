using DB_Repository.Interfaces;

namespace DB_Repository.Repositories
{
    public abstract class BaseRepository{
        protected string ConnetionString { get; }
        protected IRepositoryContextFactory ContextFactory {get;}

        public BaseRepository(string _connectionString, IRepositoryContextFactory _contextFactory)
        {
            ConnetionString = _connectionString;
            ContextFactory = _contextFactory;
        }
    }
}