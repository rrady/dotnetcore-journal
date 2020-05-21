using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Jppc.Core.Authentication;
using Jppc.Core.Mvc;
using Jppc.WebApp.Models;
using Jppc.WebApp.Services.Authentication;

namespace Jppc.WebApp.Controllers
{
    [Route("api/auth")]
    [ApiController]
    [JwtAuth]
    public class TokensController : BaseController
    {
        private readonly IAccessTokenService _accessTokenService;
        private readonly IRefreshTokenService _refreshTokenService;

        public TokensController(IAccessTokenService accessTokenService, IRefreshTokenService refreshTokenService)
        {
            _accessTokenService = accessTokenService;
            _refreshTokenService = refreshTokenService;
        }

        [AllowAnonymous]
        [HttpPost("tokens/{refreshToken}/refresh")]
        public async Task<IActionResult> RefreshAccessToken(string refreshToken, RefreshAccessTokenModel model)
            => Ok(await _refreshTokenService.CreateAccessTokenAsync(model.Bind(m => m.Token, refreshToken).Token));

        [HttpPost("tokens/revoke")]
        public async Task<IActionResult> RevokeAccessToken(RevokeTokenModel model)
        {
            await _accessTokenService.DeactivateCurrentAsync(model.Bind(m => m.UserId, UserId).UserId.ToString("N"));

            return NoContent();
        }

        [HttpPost("tokens/{refreshToken}/revoke")]
        public async Task<IActionResult> RevokeRefreshToken(string refreshToken, RevokeTokenModel model)
        {
            await _refreshTokenService.RevokeAsync(model.Bind(m => m.Token, refreshToken).Token,
                model.Bind(m => m.UserId, UserId).UserId);

            return NoContent();
        }
    }
}
