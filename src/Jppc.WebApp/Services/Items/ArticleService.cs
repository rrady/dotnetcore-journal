using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using AutoMapper;
using Jppc.Core.Domain.Entities;
using Jppc.Core.Exceptions;
using Jppc.Infrastructure.EntityFramework.Repository;
using Jppc.Infrastructure.ElasticSearch.Repository;
using Jppc.WebApp.Dto;
using System.Linq;

namespace Jppc.WebApp.Services.Items
{
    public class ArticleService : IArticleService
    {
        private readonly ISqlRepository<Article> _articleSqlRepository;
        private readonly IElasticRepository<ArticleDto> _articleElasticRepository;
        private readonly IMapper _mapper;

        public ArticleService(ISqlRepository<Article> articleEfRepository,
            IElasticRepository<ArticleDto> articleEsRepository, IMapper mapper)
        {
            _articleSqlRepository = articleEfRepository;
            _articleElasticRepository = articleEsRepository;
            _mapper = mapper;
        }

        public async Task CreateAsync(Guid id, string name, string description,
            IFormFile file, decimal price, string language)
        {
            var article = await _articleSqlRepository.GetAsync(a => a.Name == name);
            if (article != null)
            {
                throw new JppcException(Codes.ArticleAlreadyExists,
                    $"Article: '{name}' already exists.");
            }

            byte[] content = null;
            using (Stream stream = file.OpenReadStream())
            {
                using (MemoryStream mStream = new MemoryStream())
                {
                    await stream.CopyToAsync(mStream);
                    content = mStream.ToArray();
                }
            }

            article = new Article(id, name, description, file.FileName, content, price, language);
            await _articleSqlRepository.AddAsync(article);
        }

        public async Task<ArticleDto> ReadAsync(Guid id)
        {
            var article = await _articleSqlRepository.GetAsync(id);
            if (article == null)
            {
                throw new JppcException(Codes.ArticleNotFound,
                    $"Article: '{id}' doesn't exists.");
            }

            var articleDto = _mapper.Map<ArticleDto>(article);
            return articleDto;
        }

        public async Task UpdateAsync(Guid id, string name, string description,
            IFormFile file, decimal price, string language)
        {
            var article = await _articleSqlRepository.GetAsync(id);
            if (article == null)
            {
                throw new JppcException(Codes.ArticleNotFound,
                    $"Article: '{id}' doesn't exists.");
            }

            byte[] content = null;
            using (Stream stream = file.OpenReadStream())
            {
                using (MemoryStream mStream = new MemoryStream())
                {
                    await stream.CopyToAsync(mStream);
                    content = mStream.ToArray();
                }
            }

            article.SetName(name);
            article.SetDescription(description);
            article.SetFile(file.FileName, content);
            article.SetPrice(price);
            article.SetLanguage(language);
            await _articleSqlRepository.UpdateAsync(article);

            var articleDto = _mapper.Map<ArticleDto>(article);
            await _articleElasticRepository.AddAsync(articleDto);
        }

        public async Task DeleteAsync(Guid id)
        {
            var article = await _articleSqlRepository.GetAsync(id);
            if (article == null)
            {
                throw new JppcException(Codes.ArticleNotFound,
                    $"Article: '{id}' doesn't exists.");
            }

            await _articleSqlRepository.DeleteAsync(id);
            await _articleElasticRepository.DeleteAsync(id);
        }

        public async Task AcceptAsync(Guid id)
        {
            var article = await _articleSqlRepository.GetAsync(id);
            if (article == null)
            {
                throw new JppcException(Codes.ArticleNotFound,
                    $"Article: '{id}' doesn't exists.");
            }

            article.AcceptIt();
            await _articleSqlRepository.UpdateAsync(article);

            var articleDto = _mapper.Map<ArticleDto>(article);
            await _articleElasticRepository.AddAsync(articleDto);
        }

        public async Task IncrementHitsAsync(Guid id)
        {
            var article = await _articleSqlRepository.GetAsync(id);
            if (article == null)
            {
                throw new JppcException(Codes.ArticleNotFound,
                    $"Article: '{id}' doesn't exists.");
            }

            article.IncrementHits();
            await _articleSqlRepository.UpdateAsync(article);
        }

        public async Task<IEnumerable<ArticleDto>> SearchAsync(string queryText)
        {
            if (string.IsNullOrWhiteSpace(queryText))
            {
                throw new JppcException(Codes.InvalidQueryText,
                    $"The query text can not be empty.");
            }

            var results = await _articleElasticRepository.SearchAsync(queryText);
            return results;
        }

        public async Task<IEnumerable<ArticleDto>> GetPendingArticlesAsync()
        {
            var results = await _articleSqlRepository.FindAsync(article => article.Accepted == false);

            var resultsDto = _mapper.Map<IList<Article>, IList<ArticleDto>>(results.ToList());

            return resultsDto;
        }

        public async Task<byte[]> DownloadAsync(Guid id)
        {
            var result = await _articleSqlRepository.GetAsync(id);

            return result.Content;
        }
    }
}
