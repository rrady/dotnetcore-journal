using System;
using Newtonsoft.Json;

namespace Jppc.WebApp.Models
{
    public class RevokeTokenModel
    {
        public Guid UserId { get; }

        public string Token { get; }

        [JsonConstructor]
        public RevokeTokenModel(Guid userId, string token)
        {
            UserId = userId;
            Token = token;
        }
    }
}
