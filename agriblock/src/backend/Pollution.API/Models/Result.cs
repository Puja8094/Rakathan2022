namespace Pollution.API.Models
{
    public class Result
    {
        public DateTime DateTime { get; set; }
        public double AverageAQI { get; set; }
        public double AverageCO { get; set; }
        public double AverageNO { get; set; }
        public double AverageNO2 { get; set; }
        public double AverageO3 { get; set; }
        public double AverageSO2 { get; set; }
        public double AveragePM25 { get; set; }
        public double AveragePM10 { get; set; }
        public double AverageNH3 { get; set; }
    }
}
