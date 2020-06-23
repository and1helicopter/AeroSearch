using Newtonsoft.Json;

namespace AeroSearchREST.Models.Data
{
    [JsonObject(MemberSerialization.Fields)]
    public class Radius_Item
    {
        [JsonProperty] 
        public string Code { get; set; }
        [JsonProperty] 
        public Radius_Item_Position Position { get; set; }
    }

    public class Radius_Item_Position
    {
        [JsonProperty]
        public double Latitude { get; set; }
        [JsonProperty]
        public double Longitude { get; set; }
    }

}
