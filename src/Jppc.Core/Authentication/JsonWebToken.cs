using System.Collections.Generic;

namespace Jppc.Core.Authentication
{
    public class JsonWebToken
    {
        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }

        public long Expires { get; set; }

        public IDictionary<string, string> Claims { get; set; }
    }
}
