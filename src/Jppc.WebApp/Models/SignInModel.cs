using Newtonsoft.Json;

namespace Jppc.WebApp.Models
{
    public class SignInModel
    {
        public string Email { get; }

        public string Password { get; }

        [JsonConstructor]
        public SignInModel(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}
