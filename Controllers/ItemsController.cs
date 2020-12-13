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

        [HttpPost("filter")]
        public ActionResult<List<Item>> GetFiltered(FilterModel filter)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var shopsAll = _dbService.Shops.Get();
            var shops = shopsAll;
            var categories = _dbService.Categories.Get();
            var priceHistory = _dbService.PriceHistory.Get();
            var items = _dbService.Items.Get();

            List<Item> resultItems = items;

            // Filter items by name (toLower both values)
            if(filter.Name.Length != 0)
            {
                resultItems = items.FindAll(i => i.Name.ToLower().Contains(
                    filter.Name.ToLower())
                );
            }
            // Filter items by categories
            if (filter.CategoriesId.Length > 0)
            {
                resultItems = resultItems.FindAll(i => {
                    foreach (string c in filter.CategoriesId)
                    {
                        if(i.Category_name == c)
                        {
                            return true;
                        }
                    }
                    return false;
                });
            }
            // Choose shops, that in filter
            if(filter.ShopsId.Length > 0)
            {
                shops = shops.FindAll(s => {
                    foreach (string id in filter.ShopsId)
                    {
                        if(s.Id == id)
                        {
                            return true;
                        }
                    }
                    return false;
                });
            }
            // Select all items, that sells at this shops
            resultItems = resultItems.FindAll(i => {
                if(_dbService.PriceHistory.ItemInShops(i, shops))
                {
                    return true;
                }
                return false;
            });

            // Order by min price (from all shops)
            List<PriceInfo> tempInfo = new List<PriceInfo>();

            if (filter.PriceAsc)
            {
                foreach (Item item in resultItems)
                {
                    var prices = _dbService.PriceHistory.GetPrices(item.Id, shopsAll);
                    // Get lowest price among all shops where in stock
                    prices = prices.OrderBy(price => price.Price).ToList();
                    var minPrice = prices.FirstOrDefault(price => price.Availability == true);
                    if (minPrice == null)
                    {
                        minPrice = prices.First();
                    }
                    tempInfo.Add(new PriceInfo() { Item = item, MinPrice = minPrice.Price });
                }
                // Sorted list of item + price ASC
                tempInfo = tempInfo.OrderBy(i => i.MinPrice).ToList();
                // Clear result items to write ordered list
                resultItems = new List<Item>();
                tempInfo.ForEach(t =>
                {
                    resultItems.Add(t.Item);
                });
            } else if (filter.PriceDesc)
            {
                foreach (Item item in resultItems)
                {
                    var prices = _dbService.PriceHistory.GetPrices(item.Id, shopsAll);//wrong order
                    // Get lowest price among all shops where in stock
                    prices = prices.OrderBy(price => price.Price).ToList();
                    var minPrice = prices.FirstOrDefault(price => price.Availability == true);
                    // If item is not in stock
                    if (minPrice == null)
                    {
                        minPrice = prices.First();
                    }
                    tempInfo.Add(new PriceInfo() { Item = item, MinPrice = minPrice.Price });
                }
                // Sorted list of item + price DESC
                tempInfo = tempInfo.OrderByDescending(i => i.MinPrice).ToList();
                // Clear result items to write ordered list
                resultItems = new List<Item>();
                tempInfo.ForEach(t =>
                {
                    resultItems.Add(t.Item);
                });
            }

            if(resultItems.Count == 0)
            {
                NotFound();
            }
            return resultItems;
        }

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
                    ModelState.AddModelError("Id", "Such item id does not exist.");
                    return BadRequest(ModelState);
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
                ModelState.AddModelError("Id", "Such item id does not exist.");
                return BadRequest(ModelState);
            }

            _dbService.Items.Remove(item.Id);

            return NoContent();
        }
    }
}
