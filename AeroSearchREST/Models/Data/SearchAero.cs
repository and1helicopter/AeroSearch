using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AeroSearchREST.Models.Data
{
    public class SearchAero
    {
        public string Flight;

        public decimal Price;
        public string Currency;

        public string ShearchId;
        public string Url;

        public SearchAero_Segment[] Segment;
    }

    public class SearchAero_Segment
    {
        public SearchAero_Segment_City Departure_City;
        public SearchAero_Segment_City Arrival_City;
        public DateTime Departure_DateTime;
        public DateTime Arrival_DateTime;
        public int Duration;
        public string Company;
        public string Aircraft;
    }

    public class SearchAero_Segment_City
    {
        public string Airport;
        public string City;
        public string Country;
    }
}
