﻿using System.Threading.Tasks;

namespace Jppc.Core.Authentication
{
    public interface IAccessTokenService
    {
        Task<bool> IsCurrentActiveToken();

        Task DeactivateCurrentAsync(string userId);

        Task<bool> IsActiveAsync(string token);

        Task DeactivateAsync(string userId, string token);
    }
}