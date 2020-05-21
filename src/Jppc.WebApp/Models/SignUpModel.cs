using System;
using Newtonsoft.Json;

namespace Jppc.WebApp.Models
{
    public class SignUpModel
    {
        public Guid Id { get; }

        public string Email { get; }

        public string FirstName { get; }

        public string LastName { get; }

        public string Password { get; }

        public string Role { get; }

        [JsonConstructor]
        public SignUpModel(Guid id, string email, string firstName, string lastName, string password, string role)
        {
            Id = id;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Password = password;
            Role = role;
        }
    }
}
