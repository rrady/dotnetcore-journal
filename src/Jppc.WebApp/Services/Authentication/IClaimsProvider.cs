using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jppc.WebApp.Services.Authentication
{
    public interface IClaimsProvider
    {
        Task<IDictionary<string, string>> GetAsync(Guid userId);
    }
}
