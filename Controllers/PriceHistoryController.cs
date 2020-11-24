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

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<PriceHistory> Create(PriceHistory price)
        {
            _dbService.PriceHistory.Create(price);

            return CreatedAtRoute("GetPriceHistory", new { id = price.Id.ToString() }, price);
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
