using Newtonsoft.Json;

namespace Jppc.WebApp.Models
{
    public class RefreshAccessTokenModel
    {
        public string Token { get; }

        [JsonConstructor]
        public RefreshAccessTokenModel(string token)
        {
            Token = token;
        }
    }
}
