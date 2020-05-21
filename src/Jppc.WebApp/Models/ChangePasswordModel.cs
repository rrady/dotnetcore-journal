using System;
using Newtonsoft.Json;

namespace Jppc.WebApp.Models
{
    public class ChangePasswordModel
    {
        public Guid UserId { get; }

        public string CurrentPassword { get; }

        public string NewPassword { get; }

        [JsonConstructor]
        public ChangePasswordModel(Guid userId, string currentPassword, string newPassword)
        {
            UserId = userId;
            CurrentPassword = currentPassword;
            NewPassword = newPassword;
        }
    }
}
