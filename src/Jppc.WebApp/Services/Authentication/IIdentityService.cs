using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Jppc.Core.Authentication;
using Jppc.Core.Domain.Entities;

namespace Jppc.WebApp.Services.Authentication
{
    public interface IIdentityService
    {
        Task SignUpAsync(Guid id, string email, string firstName, string lastName, string password, string role = Role.User);

        Task<JsonWebToken> SignInAsync(string email, string password);

        Task ChangePasswordAsync(Guid userId, string currentPassword, string newPassword);

        Task<IEnumerable<User>> GetAllAsync();

        Task SetModeratorAsync(Guid id);
    }
}
