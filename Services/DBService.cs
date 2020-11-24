using Catalog.Models;
using Catalog.Services.Schemes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Services
{
    public class DBService
    {
        private readonly IMongoCollection<Item> _items;
        private readonly IMongoCollection<Shop> _shops;
        private readonly IMongoCollection<PriceHistory> _priceHistory;
        private readonly IMongoCollection<Category> _categories;
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<Role> _roles;

        public ItemsScheme Items;
        public ShopsScheme Shops;
        public PriceHistoryScheme PriceHistory;
        public CategoriesScheme Categories;
        public UsersScheme Users;
        public RolesScheme Roles;

        public DBService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);            

            //Collections
            _items = database.GetCollection<Item>(settings.ItemsCollectionName);
            _shops = database.GetCollection<Shop>(settings.ShopsCollectionName);
            _priceHistory = database.GetCollection<PriceHistory>(settings.PriceHistoryCollectionName);
            _categories = database.GetCollection<Category>(settings.CategoriesCollectionName);
            _users = database.GetCollection<User>(settings.UsersCollectionName);
            _roles = database.GetCollection<Role>(settings.RolesCollectionName);

            //Schemes to work with collections
            Items = new ItemsScheme(_items);
            Shops = new ShopsScheme(_shops);
            PriceHistory = new PriceHistoryScheme(_priceHistory);
            Categories = new CategoriesScheme(_categories);
            Users = new UsersScheme(_users);
            Roles = new RolesScheme(_roles);
        }

    }
}
