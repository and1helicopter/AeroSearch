using System.Threading.Tasks;
using AeroSearchREST.Models;
using Microsoft.AspNetCore.Mvc;

namespace AeroSearchREST.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class InitializeController : ControllerBase
    {
        private readonly AeroSearchContext _context;

        public InitializeController(AeroSearchContext context)
        {
            _context = context;
        }

        // GET: api/Initialize/All
        [HttpGet("All")]
        public async Task<ActionResult> GetAll()
        {
            await InitializeAirports.Get(_context);
            await InitializeCities.Get(_context);
            await InitializeArlines.Get(_context);
            await InitializeCountries.Get(_context); 
            return new OkResult();
        }

        // GET: api/Initialize/Airports
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("Airports")]
        public async Task<ActionResult> GetAirports()
        {
            return await InitializeAirports.Get(_context);
        }

        // GET: api/Initialize/Cities
        [HttpGet("Cities")]
        public async Task<ActionResult> GetCities()
        {
            return await InitializeCities.Get(_context);
        }

        // GET: api/Initialize/Arlines
        [HttpGet("Arlines")]
        public async Task<ActionResult> GetArlines()
        {
            return await InitializeArlines.Get(_context);
        }

        // GET: api/Initialize/Countries
        [HttpGet("Countries")]
        public async Task<ActionResult> GetCountries()
        {
            return await InitializeCountries.Get(_context);
        }
    }
}
