using System;
using Jppc.Core.Exceptions;

namespace Jppc.Core.Domain.Entities
{
    public class Article : BaseEntity
    {
        public string Name { get; private set; }

        public string Description { get; private set; }

        public string FileName { get; private set; }

        public byte[] Content { get; private set; }

        public decimal Price { get; private set; }

        public string Language { get; private set; }

        public int Hits { get; private set; }

        public bool Accepted { get; private set; }

        public Article(Guid id, string name, string description, string fileName,
            byte[] content, decimal price, string language, int hits = 0, bool accepted = false) : base(id)
        {
            Id = id;

            SetName(name);
            SetDescription(description);
            SetFile(fileName, content);
            SetPrice(price);
            SetLanguage(language);

            Hits = hits;
            Accepted = accepted;
        }

        public void SetName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new JppcException(Codes.InvalidArticleName,
                        $"Article name can not be empty.");
            }

            Name = name;
            SetUpdatedDate();
        }

        public void SetDescription(string description)
        {
            if (string.IsNullOrWhiteSpace(description))
            {
                throw new JppcException(Codes.InvalidArticleDescription,
                        $"Article description can not be empty.");
            }

            Description = description;
            SetUpdatedDate();
        }

        public void SetFile(string fileName, byte[] content)
        {
            if (string.IsNullOrWhiteSpace(fileName))
            {
                throw new JppcException(Codes.InvalidArticleFileName,
                        $"Article file name can not be empty.");
            }

            if (content == null || content.Length == 0)
            {
                throw new JppcException(Codes.InvalidArticleFileContent,
                    $"Article file content can not be empty.");
            }

            FileName = fileName;
            Content = content;
            SetUpdatedDate();
        }

        public void SetPrice(decimal price)
        {
            Price = price;
            SetUpdatedDate();
        }

        public void SetLanguage(string language)
        {
            if (string.IsNullOrWhiteSpace(language))
            {
                throw new JppcException(Codes.InvalidArticleLanguage,
                    $"Aticle language can not be empty.");
            }

            Language = language;
            SetUpdatedDate();
        }

        public void IncrementHits()
        {
            Hits += 1;
            SetUpdatedDate();
        }

        public void AcceptIt()
        {
            Accepted = true;
            SetUpdatedDate();
        }
    }
}
