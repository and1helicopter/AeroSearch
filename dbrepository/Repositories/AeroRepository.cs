using System.Collections.Generic;
using System.Threading.Tasks;
using DB_Repository.Interfaces;
using Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace DB_Repository.Repositories
{
    public class AeroRepository : BaseRepository, IAeroRepository
    {
        public AeroRepository(string _connectionString, IRepositoryContextFactory _contextFactory) : base(_connectionString, _contextFactory)
        {
            
        }

        public async Task<GeoAiroport> GetAiroport(double lat, double lon)
        {
            var result = new GeoAiroport();

            using(var _context = ContextFactory.CreateDbContext(ConnetionString))
            {
                var query = _context.GeoAiroports.AsQueryable();
                query = query.Where(_airoport => _airoport.Lat == lat && _airoport.Lon == lon);
                result = await query.FirstOrDefaultAsync();
            }

            return result;
        }

        public async Task<List<GeoAiroport>> GetAiroports(double lat, double lon)
        {
            var result = new List<GeoAiroport>();

            using(var _context = ContextFactory.CreateDbContext(ConnetionString))
            {
                var query = _context.GeoAiroports.AsQueryable();
                query = query.Where(_airoport => _airoport.Lat == lat && _airoport.Lon == lon);
                result = await query.ToListAsync();
            }

            return result;
        }
    }
}