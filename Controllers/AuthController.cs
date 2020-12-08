using Catalog.Models;
using Catalog.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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
        private readonly AuthOptions _authOptions;

        public AuthController(DBService DBService, AuthOptions authOptions)
        {
            _dbService = DBService;
            _authOptions = authOptions;
        }

        [HttpPost]
        [Route("register")]
        //[ValidateAntiForgeryToken]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Check if Username and Email are unique
                if (!_dbService.Users.IsUsernameUnique(model.Username))
                {
                    ModelState.AddModelError("IncorrectReg", "Such username is already exists.");
                    return BadRequest(ModelState);
                }
                if (model.Email != null && !_dbService.Users.IsEmailUnique(model.Email))
                {
                    ModelState.AddModelError("IncorrectReg", "This email is already registered.");
                    return BadRequest(ModelState);
                }
                // Try register user
                try
                {
                    _dbService.Users.RegisterNew(model);
                    return Ok();
                }
                catch (MongoException e)
                {
                    ModelState.AddModelError("IncorrectReg", e.Message);
                    return BadRequest(ModelState);
                }

            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("login")]
        //[ValidateAntiForgeryToken]
        public IActionResult Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                User user = _dbService.Users.Login(model);
                if (user != null)
                {
                    ClaimsIdentity identity = GetIdentity(user);

                    var now = DateTime.UtcNow;
                    // Create JWT
                    var jwt = new JwtSecurityToken(
                            issuer: _authOptions.JWTIssuer,
                            audience: _authOptions.JWTAudience,
                            notBefore: now,
                            claims: identity.Claims,
                            expires: now.Add(TimeSpan.FromMinutes(_authOptions.JWTLifespan)),
                            signingCredentials: new SigningCredentials(_authOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                    
                    string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                    // Send cookie with JWT to client
                    HttpContext.Response.Cookies.Append(_authOptions.JWTCookieName, encodedJwt,
                        new CookieOptions {
                            // Same lifetime as JWT have
                            MaxAge = TimeSpan.FromMinutes(_authOptions.JWTLifespan)
                    });

                    // Cut original user object, so new object doesnt have passHash and salt
                    UserCut userCut = new UserCut(user);
                    return Ok(userCut);
                }
                else
                {
                    ModelState.AddModelError("IncorrectLogin", "Such username is not found, or password to this username was wrong.");
                    return BadRequest(ModelState);
                }
            }
            return BadRequest(ModelState);
        }

        private ClaimsIdentity GetIdentity(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                //new Claim(ClaimsIdentity.DefaultNameClaimType, user.Name),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Username),
                //new Claim(ClaimsIdentity.DefaultNameClaimType, JsonConvert.SerializeObject(user.Favorites)),
                //new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role)
            };

            ClaimsIdentity id = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            return id;
        }

        [HttpPost]
        [Route("checkToken")]
        [Authorize]
        public IActionResult CheckToken()
        {
            try
            {
                // Get JWT token from header and remove "Bearer "
                string jwt = Request.Headers["Authorization"];
                jwt = jwt.Remove(0, 7);

                // Deserialize
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(jwt);
                var tokenS = handler.ReadToken(jwt) as JwtSecurityToken;

                // Get id of this authorized user
                var userId = tokenS.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;

                // Get this user and return cutted info
                User user = _dbService.Users.Get(userId);
                UserCut userCut = new UserCut(user);

                return Ok(userCut);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpGet]
        [Route("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete(_authOptions.JWTCookieName);
            return Ok();
        }
    }
}
