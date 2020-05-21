using System;
using System.IO;
using Jppc.Core.Exceptions;

namespace Jppc.Core.Domain.Article
{
    public class Article : IIdentifiable
    {
        public Guid Id { get; private set; }

        public string Name { get; private set; }

        public int Number { get; private set; }

        public string FilePath { get; private set; }

        public string Language { get; private set; }

        public int Hits { get; private set; }

        public int PageStart { get; private set; }

        public int PageEnd { get; private set; }

        public bool Pending { get; private set; }

        public Guid IssueId { get; private set; }

        public Issue Issue { get; private set; }

        public Article(Guid id, string name, int number, string filePath, string language, int hits, int pageStart, int pageEnd, bool pending)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new JppcException(Codes.InvalidArticleName,
                        $"Invalid article name: '{name}'.");
            }

            if (string.IsNullOrEmpty(language))
            {
                throw new JppcException(Codes.InvalidArticleLanguage,
                        $"Invalid article language: '{language}'.");
            }

            if (string.IsNullOrEmpty(filePath) || !File.Exists(filePath))
            {
                throw new JppcException(Codes.InvalidArticleFilePath,
                        $"Invalid article file path: '{filePath}'.");
            }

            Id = id;
            Name = name;
            Number = number;
            FilePath = filePath;
            Language = language;
            Hits = hits;
            PageStart = pageStart;
            PageEnd = pageEnd;
            Pending = pending;
        }

        public void AcceptArticle()
        {
            this.Pending = false;
        }
    }
}
