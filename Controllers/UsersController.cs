using Catalog.Models;
using Catalog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DBService _dbService;

        public UsersController(DBService DBService)
        {
            _dbService = DBService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult<List<User>> Get() =>
            _dbService.Users.Get();

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        [Authorize(Roles = "Admin")]
        public ActionResult<User> Get(string id)
        {
            var user = _dbService.Users.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<User> Create(User user)
        {
            _dbService.Users.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(string id, User userIn)
        {
            var user = _dbService.Users.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _dbService.Users.Update(id, userIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(string id)
        {
            var user = _dbService.Users.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _dbService.Users.Remove(user.Id);

            return NoContent();
        }
    }
}
