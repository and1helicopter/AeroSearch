using Newtonsoft.Json;
using System;

namespace AeroSearchREST.JSON
{
    public class SearchAeroRS
    {
        [JsonProperty("proposals", Required = Required.Default)]
        public SearchAeroRS_Proposal[] Proposals { get; set; }

        [JsonProperty("search_id", Required = Required.Default)]
        public string SearchId { get; set; }

        [JsonProperty("gates_info", Required = Required.Default)]
        public SearchAeroRS_GatesInfo GatesInfo { get; set; }
    }

    public class SearchAeroRS_Proposal
    {
        [JsonProperty("terms", Required = Required.Default)]
        public SearchAeroRS_Proposal_Terms Terms { get; set; }

        [JsonProperty("validating_carrier", Required = Required.Default)]
        public string ValidatingCarrier { get; set; }

        [JsonProperty("segment", Required = Required.Default)]
        public SearchAeroRS_Proposal_Segment[] Segment { get; set; }
    }

    public class SearchAeroRS_Proposal_Terms
    {
        [JsonProperty("16", Required = Required.Default)]
        public SearchAeroRS_Proposal_Terms_Price Price { get; set; }
    }

    public class SearchAeroRS_Proposal_Terms_Price
    {
        [JsonProperty("currency", Required = Required.Default)]
        public string Currency { get; set; }

        [JsonProperty("price", Required = Required.Default)]
        public int Price { get; set; }
    }

    public class SearchAeroRS_Proposal_Segment
    {
        [JsonProperty("flight", Required = Required.Default)]
        public SearchAeroRS_Proposal_Segment_Flight[] Flights { get; set; }
    }

    public class SearchAeroRS_Proposal_Segment_Flight
    {
        [JsonProperty("aircraft", Required = Required.Default)]
        public string Aircraft { get; set; }

        [JsonProperty("arrival", Required = Required.Default)]
        public string Arrival { get; set; }

        [JsonProperty("arrival_date", Required = Required.Default)]
        public DateTime ArrivalDate { get; set; }

        [JsonProperty("arrival_time", Required = Required.Default)]
        public DateTime arrivalTime { get; set; }

        [JsonProperty("delay", Required = Required.Default)]
        public int Delay { get; set; }

        [JsonProperty("departure", Required = Required.Default)]
        public string Departure { get; set; }

        [JsonProperty("departure_date", Required = Required.Default)]
        public DateTime DepartureDate { get; set; }

        [JsonProperty("departure_time", Required = Required.Default)]
        public DateTime DepartureTime { get; set; }

        [JsonProperty("duration", Required = Required.Default)]
        public int Duration { get; set; }

        [JsonProperty("number", Required = Required.Default)]
        public string Number { get; set; }

        [JsonProperty("trip_class", Required = Required.Default)]
        public string TripClass { get; set; }
    }

    public class SearchAeroRS_GatesInfo
    {
        [JsonProperty("16", Required = Required.Default)]
        public SearchAeroRS_GatesInfo_Site Site { get; set; }
    }

    public class SearchAeroRS_GatesInfo_Site
    {
        [JsonProperty("site", Required = Required.Default)]
        public string Site { get; set; }
    }
}
