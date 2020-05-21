using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Jppc.Core.Authentication;
using Jppc.Core.Domain.Entities;
using Jppc.Core.Exceptions;
using Jppc.Infrastructure.EntityFramework.Repository;

namespace Jppc.WebApp.Services.Authentication
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly ISqlRepository<User> _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IJwtHandler _jwtHandler;
        private readonly ISqlRepository<RefreshToken> _refreshTokenRepository;
        private readonly IClaimsProvider _claimsProvider;

        public RefreshTokenService(ISqlRepository<User> userRepository, IPasswordHasher<User> passwordHasher,
            IJwtHandler jwtHandler, ISqlRepository<RefreshToken> refreshTokenRepository, IClaimsProvider claimsProvider)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _jwtHandler = jwtHandler;
            _refreshTokenRepository = refreshTokenRepository;
            _claimsProvider = claimsProvider;
        }

        public async Task AddAsync(Guid userId)
        {
            var user = await _userRepository.GetAsync(userId);
            if (user == null)
                throw new JppcException(Codes.UserNotFound, $"User: '{userId}' was not found.");

            await _refreshTokenRepository.AddAsync(new RefreshToken(user, _passwordHasher));
        }

        public async Task<JsonWebToken> CreateAccessTokenAsync(string refreshToken)
        {
            var rToken = await _refreshTokenRepository.GetAsync(rt => rt.Token == refreshToken);
            if (rToken == null)
                throw new JppcException(Codes.RefreshTokenNotFound, "Refresh token was not found.");

            if (rToken.Revoked)
                throw new JppcException(Codes.RefreshTokenAlreadyRevoked, $"Refresh token : '{refreshToken}' was revoked.");

            var user = await _userRepository.GetAsync(rToken.UserId);
            if (user == null)
                throw new JppcException(Codes.UserNotFound, $"User: '{rToken.UserId}' was not found.");
            var claims = await _claimsProvider.GetAsync(user.Id);
            var jwt = _jwtHandler.CreateToken(user.Id.ToString("N"), claims);
            jwt.RefreshToken = rToken.Token;

            return jwt;
        }

        public async Task RevokeAsync(string refreshToken, Guid userId)
        {
            var rToken = await _refreshTokenRepository.GetAsync(rt => rt.Token == refreshToken);
            if (rToken == null || rToken.UserId != userId)
                throw new JppcException(Codes.RefreshTokenNotFound, "Refresh token was not found.");

            rToken.Revoke();
            await _refreshTokenRepository.UpdateAsync(rToken);
        }
    }
}
