using System;
using Newtonsoft.Json;

namespace Jppc.WebApp.Models
{
    public class CreatePaymentModel
    {
        public Guid Id { get; }

        public Guid UserId { get; }

        public Guid ArticleId { get; }

        [JsonConstructor]
        public CreatePaymentModel(Guid id, Guid userId, Guid articleId)
        {
            Id = id;
            UserId = userId;
            ArticleId = articleId;
        }
    }
}
