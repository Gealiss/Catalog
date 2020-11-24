﻿using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Catalog
{
    static public class Crypto
    {
        // Get hash with generated salt
        static public string HashPassword(string password, out byte[] salt)
        {
            // generate a 128-bit salt using a secure PRNG
            salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            
            return hashed;
        }

        // Get hash with suggested salt
        static public string HashPassword(string password, string knownSalt)
        {
            // convert salt
            byte[] salt = Convert.FromBase64String(knownSalt);

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashed;
        }

        static public bool VerifyPassword(string password, string knownSalt, string knownHash)
        {
            if(HashPassword(password, knownSalt) == knownHash)
            {
                return true;
            } else
            {
                return false;
            }
        }
    }
}
