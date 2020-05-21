using System.Collections.Generic;

namespace Jppc.Core.Authentication
{
    public interface IJwtHandler
    {
        JsonWebToken CreateToken(string userId, IDictionary<string, string> claims = null);

        JsonWebTokenPayload GetTokenPayload(string accessToken);
    }
}
