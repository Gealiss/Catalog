using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class PriceInfo
    {
        [Required]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Item_id { get; set; }
        [Required]
        public string Shop { get; set; }
        [BsonDateTimeOptions]
        public DateTime DateTime { get; set; }
        [Range(0.01, 1000000000.0)]
        public double Price { get; set; }
        [Required]
        public bool Availability { get; set; }
    }
}
