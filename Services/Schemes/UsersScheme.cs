using Catalog.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Services.Schemes
{
    public class UsersScheme
    {
        private readonly IMongoCollection<User> users;
        public UsersScheme(IMongoCollection<User> _users)
        {
            users = _users;
        }

        public List<User> Get() =>
            users.Find(user => true).ToList();

        public User Get(string id) =>
            users.Find(user => user.Id == id).FirstOrDefault();

        public User Create(User user)
        {
            users.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn)
        {
            //TODO: update only given fields
            //var filter = Builders<User>.Filter.Eq("Id", id);
            //var update = Builders<User>.Update.Set("class_id", 483);
            userIn.Id = id;
            users.ReplaceOne(user => user.Id == id, userIn);
        }

        public void Remove(User userIn) =>
            users.DeleteOne(user => user.Id == userIn.Id);

        public void Remove(string id) =>
            users.DeleteOne(user => user.Id == id);

        public User RegisterNew(RegisterModel model)
        {
            byte[] salt;
            string passHash = Crypto.HashPassword(model.Password, out salt);

            string defaultRole = "Basic";

            User user = new User
            {
                Name = model.Name,
                Username = model.Username,
                Email = model.Email,
                Role = defaultRole,
                PassHash = passHash,
                Salt = Convert.ToBase64String(salt)
            };

            users.InsertOne(user);
            return user;
        }

        public User Login(LoginModel model)
        {
            byte[] salt;
            string passHash = Crypto.HashPassword(model.Password, out salt);

            User user = users.Find(user => user.Username == model.Username).FirstOrDefault();
            if(user != null)
            {
                if(Crypto.VerifyPassword(model.Password, user.Salt, user.PassHash))
                {
                    return user;
                }
            }
            return null;
        }

        /// <summary>
        /// Check if provided Username is unique.
        /// </summary>
        /// <param name="username">Provided username</param>
        /// <returns>True: if Username is unique.</returns>
        public bool IsUsernameUnique(string username)
        {
            if(users.Find(user => user.Username == username).FirstOrDefault() != null)
            {
                return false;
            }
            return true;
        }
        /// <summary>
        /// Check if provided Email is unique.
        /// </summary>
        /// <param name="email">Provided email</param>
        /// <returns>True: if Email is unique.</returns>
        public bool IsEmailUnique(string email)
        {
            if (users.Find(user => user.Email == email).FirstOrDefault() != null)
            {
                return false;
            }
            return true;
        }
    }
}
