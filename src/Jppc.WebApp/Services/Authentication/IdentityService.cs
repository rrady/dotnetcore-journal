using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Jppc.Core.Authentication;
using Jppc.Core.Domain.Entities;
using Jppc.Core.Exceptions;
using Jppc.Infrastructure.EntityFramework.Repository;
using System.Collections.Generic;

namespace Jppc.WebApp.Services.Authentication
{
    public class IdentityService : IIdentityService
    {
        private readonly ISqlRepository<User> _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IJwtHandler _jwtHandler;
        private readonly ISqlRepository<RefreshToken> _refreshTokenRepository;
        private readonly IClaimsProvider _claimsProvider;

        public IdentityService(ISqlRepository<User> userRepository, IPasswordHasher<User> passwordHasher,
            IJwtHandler jwtHandler, ISqlRepository<RefreshToken> refreshTokenRepository, IClaimsProvider claimsProvider)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _jwtHandler = jwtHandler;
            _refreshTokenRepository = refreshTokenRepository;
            _claimsProvider = claimsProvider;
        }

        public async Task SignUpAsync(Guid id, string email, string firstName, string lastName, string password, string role = null)
        {
            var user = await _userRepository.GetAsync(u => u.Email == email);
            if (user != null)
                throw new JppcException(Codes.EmailInUse, $"Email: '{email}' is already in use.");

            if (string.IsNullOrWhiteSpace(role))
                role = Role.User;

            user = new User(id, email, firstName, lastName, role);
            user.SetPassword(password, _passwordHasher);
            await _userRepository.AddAsync(user);
        }

        public async Task<JsonWebToken> SignInAsync(string email, string password)
        {
            var user = await _userRepository.GetAsync(u => u.Email == email);
            if (user == null || !user.ValidatePassword(password, _passwordHasher))
                throw new JppcException(Codes.InvalidCredentials, "Invalid credentials.");

            var refreshToken = new RefreshToken(user, _passwordHasher);
            var claims = await _claimsProvider.GetAsync(user.Id);
            var jwt = _jwtHandler.CreateToken(user.Id.ToString("N"), claims);
            jwt.RefreshToken = refreshToken.Token;
            await _refreshTokenRepository.AddAsync(refreshToken);

            return jwt;
        }

        public async Task ChangePasswordAsync(Guid userId, string currentPassword, string newPassword)
        {
            var user = await _userRepository.GetAsync(userId);
            if (user == null)
                throw new JppcException(Codes.UserNotFound, $"User with id: '{userId}' was not found.");

            if (!user.ValidatePassword(currentPassword, _passwordHasher))
                throw new JppcException(Codes.InvalidCredentials, "Invalid current password.");

            user.SetPassword(newPassword, _passwordHasher);
            await _userRepository.UpdateAsync(user);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            var users = await _userRepository.FindAsync(user => user.Role == "user");

            return users;
        }

        public async Task SetModeratorAsync(Guid id)
        {
            var user = await _userRepository.GetAsync(id);
            user.SetRole(Role.Moderator);

            await _userRepository.UpdateAsync(user);
        }
    }
}
