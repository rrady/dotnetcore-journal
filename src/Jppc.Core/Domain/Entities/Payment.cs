using System;

namespace Jppc.Core.Domain.Entities
{
    public class Payment : IIdentifiable
    {
        public Guid Id { get; private set; }

        public Guid ArticleId { get; private set; }

        public Guid UserId { get; private set; }

        public DateTime PaidDate { get; private set; }

        public Payment(Guid id, Guid articleId, Guid userId)
        {
            Id = id;
            ArticleId = articleId;
            UserId = userId;
            PaidDate = DateTime.Now;
        }
    }
}
