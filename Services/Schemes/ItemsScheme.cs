using Catalog.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Services.Schemes
{
    public class ItemsScheme
    {
        private readonly IMongoCollection<Item> items;
        public ItemsScheme(IMongoCollection<Item> _items)
        {
            items = _items;
        }

        public List<Item> Get() =>
            items.Find(item => true).ToList();

        public Item Get(string id) =>
            items.Find(item => item.Id == id).FirstOrDefault();

        public Item Create(Item item)
        {
            items.InsertOne(item);
            return item;
        }

        public void Update(string id, Item itemIn)
        {
            //TODO: update only given fields
            //var filter = Builders<Item>.Filter.Eq("Id", id);
            //var update = Builders<Item>.Update.Set("class_id", 483);
            itemIn.Id = id;
            items.ReplaceOne(item => item.Id == id, itemIn);
        }

        public void Remove(Item itemIn) =>
            items.DeleteOne(item => item.Id == itemIn.Id);

        public void Remove(string id) =>
            items.DeleteOne(item => item.Id == id);
    }
}
