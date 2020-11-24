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
    }
}
