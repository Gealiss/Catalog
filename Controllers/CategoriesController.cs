﻿using System;
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
    public class CategoriesController : ControllerBase
    {
        private readonly DBService _dbService;

        public CategoriesController(DBService DBService)
        {
            _dbService = DBService;
        }

        [HttpGet]
        public ActionResult<List<Category>> Get() =>
            _dbService.Categories.Get();

        [HttpGet("{id:length(3,30)}", Name = "GetCategory")]
        public ActionResult<Category> Get(string id)
        {
            var category = _dbService.Categories.Get(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Category> Create(Category category)
        {
            if (ModelState.IsValid)
            {
                _dbService.Categories.Create(category);
                return CreatedAtRoute("GetCategory", new { id = category.Name }, category);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id:length(3,30)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(string id, Category categoryIn)
        {
            if (ModelState.IsValid)
            {
                var category = _dbService.Categories.Get(id);

                if (category == null)
                {
                    ModelState.AddModelError("Name", "Such category does not exist.");
                    return BadRequest(ModelState);
                }

                _dbService.Categories.Update(id, categoryIn);

                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id:length(3,30)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(string id)
        {
            var category = _dbService.Categories.Get(id);

            if (category == null)
            {
                ModelState.AddModelError("Name", "Such category does not exist.");
                return BadRequest(ModelState);
            }

            _dbService.Categories.Remove(category.Name);

            return NoContent();
        }
    }
}
