using Newtonsoft.Json;

namespace Pollution.API.Models
{    public partial class ApiResult
    {
        [JsonProperty("coord")]
        
        public Coord LocationCoordinates { get; set; }

        [JsonProperty("list")]
        public List[] PollutionData { get; set; }
    }

    public partial class Coord
    {
        [JsonProperty("lon")]
        public long Lon { get; set; }

        [JsonProperty("lat")]
        public long Lat { get; set; }
    }

    [JsonObject]
    public partial class List
    {
        [JsonProperty("main")]
        public Main Main { get; set; }

        [JsonProperty("components")]
        public Components Pollutants { get; set; }

        [JsonProperty("dt")]
        public long UnixDateTime { get; set; }

        public DateTime DateTime
        {
            get
            {
                return UnixTimeStampToDateTime(UnixDateTime);
            }
        }

        private DateTime UnixTimeStampToDateTime(long unixTimeStamp)
        {
            DateTime dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTime = dateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dateTime;
        }
    }

    public partial class Main
    {
        [JsonProperty("aqi")]
        public long AQI { get; set; }
    }

    public class Components
    {
        [JsonProperty("co")]
        public double CO { get; set; }

        [JsonProperty("no")]
        public double NO { get; set; }

        [JsonProperty("no2")]
        public double NO2 { get; set; }

        [JsonProperty("o3")]
        public double O3 { get; set; }

        [JsonProperty("so2")]
        public double SO2 { get; set; }

        [JsonProperty("pm2_5")]
        public double PM25 { get; set; }

        [JsonProperty("pm10")]
        public double PM10 { get; set; }

        [JsonProperty("nh3")]
        public double NH3 { get; set; }
    }
}
