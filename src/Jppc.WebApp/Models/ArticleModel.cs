using System;
using Microsoft.AspNetCore.Http;

namespace Jppc.WebApp.Models
{
    public class ArticleModel
    {
        public Guid Id { get; }

        public string Name { get; set; }

        public string Description { get; set; }

        public IFormFile File { get; set; }

        public decimal Price { get; set; }

        public string Language { get; set; }
    }
}
