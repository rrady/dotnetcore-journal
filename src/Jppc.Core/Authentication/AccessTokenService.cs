using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Jppc.Core.Caching;
using Jppc.Core.Caching.CacheKeys;

namespace Jppc.Core.Authentication
{
    public class AccessTokenService : IAccessTokenService
    {
        private readonly ICacheStore _cache;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IOptions<JwtOptions> _jwtOptions;

        public AccessTokenService(ICacheStore cache,
                IHttpContextAccessor httpContextAccessor,
                IOptions<JwtOptions> jwtOptions)
        {
            _cache = cache;
            _httpContextAccessor = httpContextAccessor;
            _jwtOptions = jwtOptions;
        }

        public async Task<bool> IsCurrentActiveToken()
            => await IsActiveAsync(GetCurrentAsync());

        public async Task DeactivateCurrentAsync(string userId)
            => await DeactivateAsync(userId, GetCurrentAsync());

        public async Task<bool> IsActiveAsync(string token)
            => string.IsNullOrWhiteSpace(await _cache.GetStringAsync(GetKey(token)));

        public async Task DeactivateAsync(string userId, string token)
        {
            await _cache.AddStringAsync(GetKey(token), "deactivated");
        }

        private string GetCurrentAsync()
        {
            var authorizationHeader = _httpContextAccessor
                .HttpContext.Request.Headers["authorization"];

            return authorizationHeader == StringValues.Empty
                ? string.Empty
                : authorizationHeader.Single().Split(' ').Last();
        }

        private static ICacheKey GetKey(string token)
            => new TokenCacheKey($"tokens:{token}");
    }
}
