using System;
using Jppc.Core.Domain;

namespace Jppc.WebApp.Dto
{
    public class ArticleDto : IIdentifiable
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }
    }
}
