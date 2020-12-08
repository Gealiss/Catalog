using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Catalog.Models;
using Catalog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly DBService _dbService;

        public ItemsController(DBService DBService)
        {
            _dbService = DBService;
        }

        [HttpGet]
        public ActionResult<List<Item>> Get() =>
            _dbService.Items.Get();

        [HttpGet("{id:length(24)}", Name = "GetItem")]
        public ActionResult<Item> Get(string id)
        {
            var item = _dbService.Items.Get(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Item> Create(Item item)
        {
            if (ModelState.IsValid)
            {
                if (_dbService.Categories.Get(item.Category_name) == null)
                {
                    ModelState.AddModelError("Category_name", "Such category does not exist.");
                    return BadRequest(ModelState);
                }
                _dbService.Items.Create(item);
                return CreatedAtRoute("GetItem", new { id = item.Id.ToString() }, item);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(string id, Item itemIn)
        {
            if (ModelState.IsValid)
            {
                if (_dbService.Categories.Get(itemIn.Category_name) == null)
                {
                    ModelState.AddModelError("Category_name", "Such category does not exist.");
                    return BadRequest(ModelState);
                }
                Item item = _dbService.Items.Get(id);

                if (item == null)
                {
                    return NotFound();
                }
                _dbService.Items.Update(id, itemIn);

                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(string id)
        {
            var item = _dbService.Items.Get(id);

            if (item == null)
            {
                return NotFound();
            }

            _dbService.Items.Remove(item.Id);

            return NoContent();
        }
    }
}
