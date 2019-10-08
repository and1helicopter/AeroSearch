using System.Threading.Tasks;
using Models;
using System.Collections.Generic;

namespace DB_Repository.Interfaces
{
    public interface IAeroRepository
    {
        Task<GeoAiroport> GetAiroport(double lat ,double lon);

        Task<List<GeoAiroport>> GetAiroports(double lat ,double lon);

    }
}