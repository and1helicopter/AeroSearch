using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace AeroSearchREST.JSON
{
    public class SearchAeroRS
    {
        [JsonProperty("proposals", Required = Required.Default)]
        public SearchAeroRS_Proposal[] Proposals;

        [JsonProperty("search_id", Required = Required.Default)]
        public string SearchId;

        [JsonProperty("gates_info", Required = Required.Default)]
        public SearchAeroRS_GatesInfo GatesInfo;

        [JsonProperty("airports", Required = Required.Default)]
        public SearchAeroRS_Airports Airports;
    }

    public class SearchAeroRS_Proposal
    {
        [JsonProperty("terms", Required = Required.Default)]
        public SearchAeroRS_Proposal_Terms Terms;

        [JsonProperty("validating_carrier", Required = Required.Default)]
        public string ValidatingCarrier;

        [JsonProperty("segment", Required = Required.Default)]
        public SearchAeroRS_Proposal_Segment[] Segment;
    }

    public class SearchAeroRS_Proposal_Terms
    {
      //  [JsonConverter(typeof(SearchAeroRS_Proposal_Terms_Price_Converter))]
        [JsonExtensionData]
        public Dictionary<string, JToken> Variables;
    }  

    public class SearchAeroRS_Proposal_Terms_Price
    {
        [JsonProperty("currency", Required = Required.Default)]
        public string Currency;

        [JsonProperty("price", Required = Required.Default)]
        public int Price;
    }

    public class SearchAeroRS_Proposal_Segment
    {
        [JsonProperty("flight", Required = Required.Default)]
        public SearchAeroRS_Proposal_Segment_Flight[] Flights;
    }

    public class SearchAeroRS_Proposal_Segment_Flight
    {
        [JsonProperty("aircraft", Required = Required.Default)]
        public string Aircraft;

        [JsonProperty("arrival", Required = Required.Default)]
        public string Arrival;

        [JsonProperty("arrival_date", Required = Required.Default)]
        public DateTime ArrivalDate;

        [JsonProperty("arrival_time", Required = Required.Default)]
        public DateTime ArrivalTime;

        [JsonProperty("delay", Required = Required.Default)]
        public int Delay;

        [JsonProperty("departure", Required = Required.Default)]
        public string Departure;

        [JsonProperty("departure_date", Required = Required.Default)]
        public DateTime DepartureDate;

        [JsonProperty("departure_time", Required = Required.Default)]
        public DateTime DepartureTime;

        [JsonProperty("duration", Required = Required.Default)]
        public int Duration;

        [JsonProperty("operating_carrier", Required = Required.Default)]
        public string Carrier;

        [JsonProperty("number", Required = Required.Default)]
        public string Number;

        [JsonProperty("trip_class", Required = Required.Default)]
        public string TripClass;
    }

    public class SearchAeroRS_GatesInfo
    {
        [JsonExtensionData]
        public Dictionary<string, JToken> Site;
    }

    public class SearchAeroRS_GatesInfo_Site
    {
        [JsonProperty("site", Required = Required.Default)]
        public string Site;
    }

    public class SearchAeroRS_Airports
    {
        [JsonExtensionData]
        public Dictionary<string, JToken> Airports;
    }

    public class SearchAeroRS_Airports_Airport 
    {
        [JsonProperty("name", Required = Required.Default)]
        public int Name;

        [JsonProperty("city", Required = Required.Default)]
        public string City;

        [JsonProperty("country", Required = Required.Default)]
        public string Country;

        [JsonProperty("time_zone", Required = Required.Default)]
        public string TimeZone;


        //[JsonProperty("country", Required = Required.Default)]
        //public double Country;


        //[JsonProperty("country", Required = Required.Default)]
        //public double Country;
    }
}
