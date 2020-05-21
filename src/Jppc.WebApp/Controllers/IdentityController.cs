using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Jppc.Core.Authentication;
using Jppc.Core.Mvc;
using Jppc.WebApp.Models;
using Jppc.WebApp.Services.Authentication;
using System;

namespace Jppc.WebApp.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class IdentityController : BaseController
    {
        private readonly IIdentityService _identityService;

        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [JwtAuth]
        [HttpGet("me")]
        public IActionResult Get() => Content($"Your id: '{UserId:N}'.");

        [HttpPost("sign-up")]
        public async Task<IActionResult> SignUp(SignUpModel model)
        {
            model.BindId(m => m.Id);

            await _identityService.SignUpAsync(model.Id, model.Email, model.FirstName, model.LastName, model.Password, model.Role);

            return NoContent();
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignIn(SignInModel model) => 
            Ok(await _identityService.SignInAsync(model.Email, model.Password));

        [JwtAuth]
        [HttpPut("me/password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            await _identityService.ChangePasswordAsync(model.Bind(m => m.UserId, UserId).UserId, model.CurrentPassword, model.NewPassword);

            return NoContent();
        }

        [JwtAuth]
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _identityService.GetAllAsync();

            return Ok(users);
        }

        [JwtAuth]
        [HttpPost("{id}/moderator")]
        public async Task<IActionResult> SetModerator([FromRoute] Guid id)
        {
            await _identityService.SetModeratorAsync(id);

            return NoContent();
        }
    }
}
