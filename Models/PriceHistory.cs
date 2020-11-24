using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class PriceHistory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRequired]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Item_Id { get; set; }
        [BsonRequired]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Shop_Id { get; set; }
        [BsonDateTimeOptions]
        public DateTime DateTime { get; set; } = DateTime.Now;
        [Range(0.01, 1000000000.0)]
        public float Price { get; set; }
        [BsonRequired]
        public bool Availability { get; set; }
    }
}
