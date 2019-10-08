namespace webREST.Models
{
    public class City
    {
        public int Id { get; set; }        
        public string Code { get; set; } 
        public string NameRus { get; set; }
        public string NameEng { get; set; }
        public string CountryCode { get; set; } //IATA Code
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
