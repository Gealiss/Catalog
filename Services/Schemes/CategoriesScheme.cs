using Catalog.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Services.Schemes
{
    public class CategoriesScheme
    {
        private readonly IMongoCollection<Category> categories;
        public CategoriesScheme(IMongoCollection<Category> _categories)
        {
            categories = _categories;
        }

        public List<Category> Get() =>
            categories.Find(category => true).ToList();

        public Category Get(string name) =>
            categories.Find(category => category.Name.ToLower() == name.ToLower()).FirstOrDefault();

        public Category Create(Category category)
        {
            categories.InsertOne(category);
            return category;
        }

        public void Update(string name, Category categoryIn)
        {
            //TODO: update only given fields
            categoryIn.Name = name;
            categories.ReplaceOne(category => category.Name == name, categoryIn);
        }

        public void Remove(Category categoryIn) =>
            categories.DeleteOne(category => category.Name == categoryIn.Name);

        public void Remove(string name) =>
            categories.DeleteOne(category => category.Name == name);
    }
}
