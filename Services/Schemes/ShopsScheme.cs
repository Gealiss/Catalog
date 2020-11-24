using Catalog.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Services.Schemes
{
    public class ShopsScheme
    {
        private readonly IMongoCollection<Shop> shops;
        public ShopsScheme(IMongoCollection<Shop> _shops)
        {
            shops = _shops;
        }

        public List<Shop> Get() =>
            shops.Find(shop => true).ToList();

        public Shop Get(string id) =>
            shops.Find<Shop>(shop => shop.Id == id).FirstOrDefault();

        public Shop Create(Shop shop)
        {
            shops.InsertOne(shop);
            return shop;
        }

        public void Update(string id, Shop shopIn)
        {
            shopIn.Id = id;
            shops.ReplaceOne(shop => shop.Id == id, shopIn);
        }

        public void Remove(Shop shopIn) =>
            shops.DeleteOne(shop => shop.Id == shopIn.Id);

        public void Remove(string id) =>
            shops.DeleteOne(shop => shop.Id == id);
    }
}
