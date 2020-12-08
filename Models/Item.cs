using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class Item
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required]
        [RegularExpression(@"^[\w][\w ]{2,49}$")]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"^[\w]{3,30}$")]
        public string Category_name { get; set; }

        [MaxLength(200)]
        public string Img { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }
    }
}
