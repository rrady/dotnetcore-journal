using System;
using System.Collections.Generic;
using System.IO;
using Jppc.Core.Exceptions;

namespace Jppc.Core.Domain.Article
{
    public class Issue : IIdentifiable
    {
        public Guid Id { get; private set; }

        public string Name { get; private set; }

        public string Description { get; private set; }

        public string PicturePath { get; private set; }

        public int Pages { get; private set; }

        public int Hits { get; private set; }

        public List<Article> Articles { get; private set; }

        public Issue(Guid id, string name, string description, string picturePath, int pages, int hits)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new JppcException(Codes.InvalidIssueName,
                        $"Invalid issue name: '{name}'.");
            }

            if (string.IsNullOrEmpty(description))
            {
                throw new JppcException(Codes.InvalidIssueDescription,
                        $"Invalid issue name: '{description}'.");
            }

            if (string.IsNullOrEmpty(picturePath) || !File.Exists(picturePath))
            {
                throw new JppcException(Codes.InvalidIssuePicturePath,
                        $"Invalid issue name: '{picturePath}'.");
            }

            Id = id;
            Name = name;
            Description = description;
            PicturePath = picturePath;
            Pages = pages;
            Hits = hits;
        }
    }
}
