using Catalog.Models;
using Catalog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Catalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly DBService _dbService;

        public ShopsController(DBService DBService)
        {
            _dbService = DBService;
        }

        [HttpGet]
        public ActionResult<List<Shop>> Get() =>
            _dbService.Shops.Get();

        [HttpGet("{id:length(24)}", Name = "GetShop")]
        public ActionResult<Shop> Get(string id)
        {
            var shop = _dbService.Shops.Get(id);

            if (shop == null)
            {
                return NotFound();
            }

            return shop;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Shop> Create(Shop shop)
        {
            if (ModelState.IsValid)
            {
                _dbService.Shops.Create(shop);
                return CreatedAtRoute("GetShop", new { id = shop.Id.ToString() }, shop);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(string id, Shop shopIn)
        {
            if (ModelState.IsValid)
            {
                var shop = _dbService.Shops.Get(id);

                if (shop == null)
                {
                    ModelState.AddModelError("Id", "Such shop id does not exist.");
                    return BadRequest(ModelState);
                }

                _dbService.Shops.Update(id, shopIn);

                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(string id)
        {
            var shop = _dbService.Shops.Get(id);

            if (shop == null)
            {
                ModelState.AddModelError("Id", "Such shop id does not exist.");
                return BadRequest(ModelState);
            }

            _dbService.Shops.Remove(shop.Id);

            return NoContent();
        }
    }
}
