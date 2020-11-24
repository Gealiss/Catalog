using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Catalog.Models;
using Catalog.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Catalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly DBService _dbService;

        public TestController(DBService DBService)
        {
            _dbService = DBService;
        }

        [HttpGet]
        public ActionResult<object> Get(string password)
        {
            byte[] salt;
            string hashed = Crypto.HashPassword(password, out salt);
            bool result = Crypto.VerifyPassword(password, Convert.ToBase64String(salt), hashed);
            var responce = new { pass = password, hash = hashed, res = result };

            return responce;
        }
    }
}
