using Catalog.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Services.Schemes
{
    public class RolesScheme
    {
        private readonly IMongoCollection<Role> roles;
        public RolesScheme(IMongoCollection<Role> _roles)
        {
            roles = _roles;
        }

        public List<Role> Get() =>
            roles.Find(role => true).ToList();

        public Role Get(string name) =>
            roles.Find(role => role.Name == name).FirstOrDefault();

        public Role Create(Role role)
        {
            roles.InsertOne(role);
            return role;
        }

        public void Update(string name, Role roleIn)
        {
            //TODO: update only given fields
            //var filter = Builders<Role>.Filter.Eq("Id", id);
            //var update = Builders<Role>.Update.Set("class_id", 483);
            roleIn.Name = name;
            roles.ReplaceOne(role => role.Name == name, roleIn);
        }

        public void Remove(Role roleIn) =>
            roles.DeleteOne(role => role.Name == roleIn.Name);

        public void Remove(string name) =>
            roles.DeleteOne(role => role.Name == name);
    }
}
