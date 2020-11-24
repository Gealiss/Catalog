using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ItemsCollectionName { get; set; }
        public string ShopsCollectionName { get; set; }
        public string PriceHistoryCollectionName { get; set; }
        public string CategoriesCollectionName { get; set; }
        public string UsersCollectionName { get; set; }
        public string RolesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
    public interface IDatabaseSettings
    {
        string ItemsCollectionName { get; set; }
        string ShopsCollectionName { get; set; }
        string PriceHistoryCollectionName { get; set; }
        string CategoriesCollectionName { get; set; }
        string UsersCollectionName { get; set; }
        string RolesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
