using System;
using System.Threading.Tasks;
using Jppc.Core.Authentication;

namespace Jppc.WebApp.Services.Authentication
{
    public interface IRefreshTokenService
    {
        Task AddAsync(Guid userId);

        Task<JsonWebToken> CreateAccessTokenAsync(string refreshToken);

        Task RevokeAsync(string refreshToken, Guid userId);
    }
}
