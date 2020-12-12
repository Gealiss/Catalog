using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Models
{
    public class FilterModel
    {
        public string Name { get; set; }
        public string[] CategoriesId { get; set; }
        public string[] ShopsId { get; set; }
        public bool PriceAsc { get; set; }
        public bool PriceDesc { get; set; }
    }
}
