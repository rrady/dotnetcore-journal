using System;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using Jppc.Core.Exceptions;

namespace Jppc.Core.Domain.Entities
{
    public class User : BaseEntity
    {
        private static readonly Regex EmailRegex = new Regex(
            @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
            @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
            RegexOptions.IgnoreCase | RegexOptions.Compiled | RegexOptions.CultureInvariant);

        public string Email { get; private set; }

        public string FirstName { get; private set; }

        public string LastName { get; private set; }

        public string Role { get; private set; }

        public string PasswordHash { get; private set; }

        public User(Guid id, string email, string firstName, string lastName, string role) : base(id)
        {
            SetEmail(email);
            SetFirstName(firstName);
            SetLastName(lastName);
            SetRole(role);
        }

        public void SetEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new JppcException(Codes.InvalidEmail,
                    $"Email cannot be empty.");
            }

            if (!EmailRegex.IsMatch(email))
            {
                throw new JppcException(Codes.InvalidEmail,
                    $"Invalid email: '{email}'.");
            }

            Email = email.ToLowerInvariant();
            SetUpdatedDate();
        }

        public void SetFirstName(string firstName)
        {
            if (string.IsNullOrWhiteSpace(firstName))
            {
                throw new JppcException(Codes.InvalidFirstName,
                    $"First name can not be empty.");
            }

            FirstName = firstName;
            SetUpdatedDate();
        }

        public void SetLastName(string lastName)
        {
            if (string.IsNullOrWhiteSpace(lastName))
            {
                throw new JppcException(Codes.InvalidLastName,
                    $"Last name can not be empty.");
            }

            LastName = lastName;
            SetUpdatedDate();
        }

        public void SetRole(string role)
        {
            if (!Entities.Role.IsValid(role))
            {
                throw new JppcException(Codes.InvalidRole,
                    $"Invalid role: '{role}'.");
            }

            Role = role.ToLowerInvariant();
        }

        public void SetPassword(string password, IPasswordHasher<User> passwordHasher)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new JppcException(Codes.InvalidPassword,
                    "Password can not be empty.");
            }

            PasswordHash = passwordHasher.HashPassword(this, password);
        }

        public bool ValidatePassword(string password, IPasswordHasher<User> passwordHasher)
            => passwordHasher.VerifyHashedPassword(this, PasswordHash, password) != PasswordVerificationResult.Failed;
    }
}
