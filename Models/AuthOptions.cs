using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class AuthOptions
    {
        public string JWTIssuer { get; set; }    // token publisher
        public string JWTAudience { get; set; }  // token recipient
        public string JWTSecretKey { get; set; }    // key for encryption
        public int JWTLifespan { get; set; } // token lifetime (1 min)
        public string JWTCookieName { get; set; }   // cookie for jwt name
        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JWTSecretKey));
        }
    }
}
