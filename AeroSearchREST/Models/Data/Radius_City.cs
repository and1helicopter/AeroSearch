using Newtonsoft.Json;
using System.Collections.Generic;

namespace AeroSearchREST.Models.Data
{
    /// <summary>
    /// result of request radius
    /// </summary>
    /// <typeparam name="T"></typeparam>
    [JsonObject(MemberSerialization.Fields)]
    public class RadiusResult<T> where T : class 
    {
        /// <summary>
        /// status of result 
        /// </summary>
        [JsonProperty]
        public string Status { get; set; }
        /// <summary>
        /// description of result
        /// </summary>
        [JsonProperty]
        public string Text { get; set; }
        /// <summary>
        /// result
        /// </summary>
        [JsonProperty]
        public IEnumerable<T> Result { get; set; }
    }
    
    /// <summary>
    /// Information about airport within the radius
    /// </summary>
    [JsonObject(MemberSerialization.Fields)]
    public class RadiusItem
    {
        /// <summary>
        /// Code of airport
        /// </summary>
        [JsonProperty] 
        public string Code { get; set; }
        /// <summary>
        /// Name of airport
        /// </summary>
        [JsonProperty]
        public RadiusItemName Name { get; set; }
        /// <summary>
        /// Coordinate of airport
        /// </summary>
        [JsonProperty] 
        public RadiusItemPosition Position { get; set; }
    }

    /// <summary>
    /// Coordinate of airport
    /// </summary>
    public class RadiusItemPosition
    {
        /// <summary>
        /// Latitude
        /// </summary>
        [JsonProperty]
        public double Latitude { get; set; }
        /// <summary>
        /// Longitude
        /// </summary>
        [JsonProperty]
        public double Longitude { get; set; }
    }

    /// <summary>
    /// Name of airport
    /// </summary>
    public class RadiusItemName
    {
        /// <summary>
        /// Name of airport by russian
        /// </summary>
        [JsonProperty]
        public string Rus { get; set; }
        /// <summary>
        /// Name of airport by english
        /// </summary>
        [JsonProperty]
        public string Eng { get; set; }
    }
}
