using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AeroSearchREST.Models.Data
{
    public class SearchAero_Filtred
    {
        public string ShearchId;
        public decimal LowPrice;

        public List<SearchAero_Offer> Offers =  new List<SearchAero_Offer>();
        public List<SearchAero_Route> Routes = new List<SearchAero_Route>();
    }

    public class SearchAero
    {
        public string ShearchId;
        public SearchAero_Offer Offer;
        public List<SearchAero_Route> Routes = new List<SearchAero_Route>();
    }

    public class SearchAero_Offer
    {
        public decimal Price;
        public string Currency;
        public string Url;
    }

    public class SearchAero_Route
    {
        public List<SearchAero_Segment> Segment = new List<SearchAero_Segment>();
        public SearchAero_City Departure_City;
        public SearchAero_City Arrival_City;
        public DateTime Departure_DateTime;
        public DateTime Arrival_DateTime;
        public int Duration;
        public int StopCount;
    }

    public class SearchAero_Segment
    {
        public string Flight;
        public SearchAero_City Departure_City;
        public SearchAero_City Arrival_City;
        public DateTime Departure_DateTime;
        public DateTime Arrival_DateTime;
        public int Duration;
        public string Company;
        public string Aircraft;
    }

    public class SearchAero_City
    {
        public string Airport;
        public string City;
        public string Country;
    }
}
