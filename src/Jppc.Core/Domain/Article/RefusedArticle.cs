using System;
using Jppc.Core.Exceptions;

namespace Jppc.Core.Domain.Article
{
    public class RefusedArticle : IIdentifiable
    {
        public Guid Id { get; private set; }

        public string Reason { get; private set; }

        public Guid ArticleId { get; private set; }

        public Article Article { get; private set; }

        public RefusedArticle(Guid id, string reason, Guid articleId)
        {
            if (string.IsNullOrEmpty(reason))
            {
                throw new JppcException(Codes.InvalidRefusedArticleReason,
                        $"Invalid article file path: '{reason}'.");
            }

            Id = id;
            Reason = reason;
            ArticleId = articleId;
        }
    }
}
