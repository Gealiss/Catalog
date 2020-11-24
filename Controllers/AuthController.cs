using Catalog.Models;
using Catalog.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Catalog.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DBService _dbService;

        public AuthController(DBService DBService)
        {
            _dbService = DBService;
        }

        [HttpPost]
        [Route("register")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    User user = _dbService.Users.RegisterNew(model);
                    await Authenticate(user);
                    return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
                }
                catch (MongoException e)
                {
                    return BadRequest(e.Message);
                }
                
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("login")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                User user = _dbService.Users.Login(model);
                if(user != null)
                {
                    await Authenticate(user);
                    return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
                } else
                {
                    return Problem(detail: "Such username is not found, or password to this username was wrong.", statusCode: 400);
                }
            }
            return BadRequest(ModelState);
        }

        private async Task Authenticate(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Name),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Username),
                //new Claim(ClaimsIdentity.DefaultNameClaimType, JsonConvert.SerializeObject(user.Favorites)),
                //new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role)
            };

            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }
    }
}
