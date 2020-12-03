namespace AeroSearchREST.Models
{
    public class Country
    {
        public int Id { get; set; }        
        public string Code { get; set; } //IATA Code
        public string NameRus { get; set; }
        public string NameEng { get; set; }
    }
}
