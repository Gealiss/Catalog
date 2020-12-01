using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class UserCut
    {
        public UserCut() { }
        public UserCut(User user)
        {
            Id = user.Id;
            Name = user.Name;
            Username = user.Username;
            Email = user.Email;
            Role = user.Role;
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRequired]
        [RegularExpression(@"^[a-zA-Z\s]{3,50}$")]
        public string Name { get; set; }

        [BsonRequired]
        [RegularExpression(@"^[\w]{3,50}$")]
        public string Username { get; set; }

        [EmailAddress]
        [MinLength(3), MaxLength(100)]
        public string Email { get; set; }

        [BsonRequired]
        public string Role { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string[] Favorites { get; set; }
    }
}
