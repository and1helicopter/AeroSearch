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
        public Dictionary<string, JToken> variables;
    }

    public class SearchAeroRS_Proposal_Terms_Price_Converter : JsonConverter
    {
        public override object ReadJson(
            JsonReader reader,
            Type objectType,
            object existingValue,
            JsonSerializer serializer)
        {
            IDictionary<string, SearchAeroRS_Proposal_Terms_Price> result;

            if (reader.TokenType == JsonToken.StartArray)
            {
                JArray legacyArray = (JArray)JArray.ReadFrom(reader);

                result = legacyArray.ToDictionary(
                    el => el["Key"].ToString(),
                    el => JsonConvert.DeserializeObject<SearchAeroRS_Proposal_Terms_Price>(el["Value"].ToString()));
            }
            else
            {
                result = (IDictionary<string, SearchAeroRS_Proposal_Terms_Price>)
                        serializer.Deserialize(reader, typeof(IDictionary<string, SearchAeroRS_Proposal_Terms_Price>));
            }

            return result;
        }

        public override void WriteJson(
            JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override bool CanConvert(Type objectType)
        {
            return typeof(IDictionary<string, SearchAeroRS_Proposal_Terms_Price>).IsAssignableFrom(objectType);
        }

        public override bool CanWrite
        {
            get { return false; }
        }
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
        public DateTime arrivalTime;

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

        [JsonProperty("number", Required = Required.Default)]
        public string Number;

        [JsonProperty("trip_class", Required = Required.Default)]
        public string TripClass;
    }

    public class SearchAeroRS_GatesInfo
    {
        [JsonProperty("16", Required = Required.Default)]
        public SearchAeroRS_GatesInfo_Site Site;
    }

    public class SearchAeroRS_GatesInfo_Site
    {
        [JsonProperty("site", Required = Required.Default)]
        public string Site;
    }
}
