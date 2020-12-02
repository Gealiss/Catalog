using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Please, enter your username.")]
        [RegularExpression(@"^[\w]{3,50}$")]
        public string Username { get; set; }

        //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
        [Required(ErrorMessage = "Password is required.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")]
        public string Password { get; set; }
    }
}
