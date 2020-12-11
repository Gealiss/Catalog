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
    public class PriceHistoryController : ControllerBase
    {
        private readonly DBService _dbService;

        public PriceHistoryController(DBService DBService)
        {
            _dbService = DBService;
        }

        [HttpGet]
        public ActionResult<List<PriceHistory>> Get() =>
            _dbService.PriceHistory.Get();

        [HttpGet("{id:length(24)}", Name = "GetPriceHistory")]
        public ActionResult<PriceHistory> Get(string id)
        {
            var price = _dbService.PriceHistory.Get(id);

            if (price == null)
            {
                return NotFound();
            }

            return price;
        }

        [HttpGet("minPrice/{itemId:length(24)}")]
        public ActionResult<PriceHistory> GetMinPrice(string itemId)
        {
            if(itemId == null)
            {
                return BadRequest();
            }
            // Get the newest price for this item in each shop, that sells it
            var shops = _dbService.Shops.Get();
            var prices = _dbService.PriceHistory.GetPrices(itemId, shops);

            // If count = 0 - no prices for this item was found on provided shops
            if (prices.Count == 0)
            {
                return NotFound();
            }

            // Get lowest price among all shops where in stock
            prices = prices.OrderBy(price => price.Price).ToList();
            var price = prices.FirstOrDefault(price => price.Availability == true);
            
            // If item is not in stock
            if(price == null)
            {
                price = prices.First();
            }

            return price;
        }

        [HttpGet("prices/{itemId:length(24)}")]
        public ActionResult<List<PriceHistory>> GetPrices(string itemId)
        {
            // Get the newest price for this item in each shop, that sells it
            var shops =_dbService.Shops.Get();
            // Available items first
            var prices = _dbService.PriceHistory.GetPrices(itemId, shops)
                .OrderBy(price => price.Availability).ToList();

            if (prices.Count == 0)
            {
                return NotFound();
            }

            return prices;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<PriceHistory> Create(PriceHistory price)
        {
            if (ModelState.IsValid)
            {
                _dbService.PriceHistory.Create(price);

                return CreatedAtRoute("GetPriceHistory", new { id = price.Id.ToString() }, price);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(string id, PriceHistory priceIn)
        {
            var price = _dbService.PriceHistory.Get(id);

            if (price == null)
            {
                return NotFound();
            }

            _dbService.PriceHistory.Update(id, priceIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(string id)
        {
            var price = _dbService.PriceHistory.Get(id);

            if (price == null)
            {
                return NotFound();
            }

            _dbService.PriceHistory.Remove(price.Id);

            return NoContent();
        }
    }
}
