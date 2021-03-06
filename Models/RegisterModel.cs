﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Please, enter your username.")]
        [RegularExpression(@"^[\w]{3,50}$")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Please, enter your name.")]
        [RegularExpression(@"^[a-zA-Z\s]{3,50}$")]
        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")]
        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "Passwords does not match.")]
        public string ConfirmPassword { get; set; }
    }
}
