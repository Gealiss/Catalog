using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class Category
    {
        [BsonId]
        [RegularExpression(@"^[\w]{3,30}$")]
        public string Name { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }
    }
}
