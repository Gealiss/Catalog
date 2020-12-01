using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class JwtResponse
    {
        public JwtResponse() {  }
        public JwtResponse(User _user, string encodedJwt)
        {
            UserCut cut = new UserCut();
            cut.Id = _user.Id;
            cut.Name = _user.Name;
            cut.Username = _user.Username;
            cut.Email = _user.Email;
            cut.Role = _user.Role;

            user = cut;
            JwtToken = encodedJwt;
        }
        [Required]
        public string JwtToken;

        [Required]
        public object user;
    }
}
