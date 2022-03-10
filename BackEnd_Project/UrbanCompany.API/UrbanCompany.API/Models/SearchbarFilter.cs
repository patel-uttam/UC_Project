using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations; 
namespace UrbanCompany.API.Models
{
    public class SearchbarFilter
    {
        
        public string CategoryName { get; set; }
        [Key]
        public int CategoryId { get; set; }
    }
}
