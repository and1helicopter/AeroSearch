using Microsoft.AspNetCore.Mvc;
using DB_Repository.Repositories;
using DB_Repository.Interfaces;
using Models;
using System.Threading.Tasks;

namespace web
{
    [Route("api/[controller]")]
    public class GeoAeroportController : Controller
    {
        IAeroRepository aeroRepository;

        public GeoAeroportController(IAeroRepository _aeroRepository)
        {
            aeroRepository = _aeroRepository;
        }

        [Route("Airoport")]
        [HttpGet]
        public async Task<GeoAiroport> GetGeoAiroport(double lat, double lon)
        {
            return await aeroRepository.GetAiroport(lat, lon);
        }
    }
}