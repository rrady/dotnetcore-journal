using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Jppc.Core.Domain.Entities;
using Jppc.Infrastructure.EntityFramework.Repository;

namespace Jppc.WebApp.Services.Authentication
{
    public class ClaimsProvider : IClaimsProvider
    {
        private readonly ISqlRepository<User> _userRepository;

        public ClaimsProvider(ISqlRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IDictionary<string, string>> GetAsync(Guid userId)
        {
            var user = await _userRepository.GetAsync(userId);

            return await Task.FromResult(new Dictionary<string, string>()
            {
                {  "Id", user.Id.ToString("N") },
                {  "FirstName", user.FirstName },
                {  "LastName", user.LastName },
                {  "Role", user.Role }
            });
        }
    }
}
