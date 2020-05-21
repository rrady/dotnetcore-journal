using System;
using Microsoft.AspNetCore.Identity;
using Jppc.Core.Exceptions;

namespace Jppc.Core.Domain.Entities
{
    public class RefreshToken : IIdentifiable
    {
        public Guid Id { get; protected set; }

        public Guid UserId { get; private set; }

        public string Token { get; private set; }

        public DateTime CreateAt { get; private set; }

        public DateTime? RevokedAt { get; private set; }

        public bool Revoked => RevokedAt.HasValue;

        protected RefreshToken()
        {
        }

        public RefreshToken(User user, IPasswordHasher<User> passwordHasher)
        {
            Id = Guid.NewGuid();
            UserId = user.Id;
            CreateAt = DateTime.UtcNow;
            Token = CreateToken(user, passwordHasher);
        }

        public void Revoke()
        {
            if (Revoked)
            {
                throw new JppcException(Codes.RefreshTokenAlreadyRevoked,
                    $"Refresh token: '{Id}' was already revoked at '{RevokedAt}'.");
            }
            RevokedAt = DateTime.UtcNow;
        }

        private static string CreateToken(User user, IPasswordHasher<User> passwordHasher)
            => passwordHasher.HashPassword(user, Guid.NewGuid().ToString("N"))
                .Replace("=", string.Empty)
                .Replace("+", string.Empty)
                .Replace("/", string.Empty);
    }
}
