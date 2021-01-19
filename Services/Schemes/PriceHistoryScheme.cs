using Catalog.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Services.Schemes
{
    public class PriceHistoryScheme
    {
        private readonly IMongoCollection<PriceHistory> priceHistory;
        public PriceHistoryScheme(IMongoCollection<PriceHistory> _priceHistory)
        {
            priceHistory = _priceHistory;
        }

        public List<PriceHistory> Get() =>
            priceHistory.Find(price => true).ToList();

        public PriceHistory Get(string id) =>
            priceHistory.Find(price => price.Id == id).FirstOrDefault();

        public PriceHistory Create(PriceHistory price)
        {
            priceHistory.InsertOne(price);
            return price;
        }

        public void Update(string id, PriceHistory priceIn)
        {
            priceIn.Id = id;
            priceHistory.ReplaceOne(price => price.Id == id, priceIn);
        }

        public void Remove(PriceHistory priceIn) =>
            priceHistory.DeleteOne(price => price.Id == priceIn.Id);

        public void Remove(string id) =>
            priceHistory.DeleteOne(price => price.Id == id);

        /// <summary>
        /// Get newest prices in each shop from list
        /// </summary>
        /// <param name="itemId">Item id to search prices for</param>
        /// <param name="shops">List of shops</param>
        /// <returns>List of prices</returns>
        public List<PriceHistory> GetPrices(string itemId, List<Shop> shops)
        {
            List<PriceHistory> resultPrices = new List<PriceHistory>();

            // Find all prices for this item, sort by date (desc)
            var prices = priceHistory.Find(price => price.Item_id == itemId).ToList();
            if(prices.Count == 0)
            {
                return resultPrices;
            }
            prices = prices.OrderByDescending(prices => prices.DateTime).ToList();
            
            shops.ForEach(shop => {
                // Pick first item price in this shop
                var price = prices.Find(price => price.Shop_id == shop.Id);
                if(price != null)
                {
                    resultPrices.Add(price);
                }
            });
            return resultPrices;
        }

        public bool ItemInShops(Item item, List<Shop> shops)
        {
            bool isInShops = false;

            // Find all prices for this item, sort by date (desc)
            var prices = priceHistory.Find(price => price.Item_id == item.Id).ToList();
            if (prices.Count == 0)
            {
                return isInShops;
            }
            prices = prices.OrderByDescending(prices => prices.DateTime).ToList();

            shops.ForEach(shop => {
                // Pick first item price in this shop
                var price = prices.Find(price => price.Shop_id == shop.Id);
                if (price != null)
                {
                    isInShops = true;
                }
            });
            return isInShops;
        }
    }
}
