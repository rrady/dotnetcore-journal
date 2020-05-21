using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Jppc.WebApp.Dto;

namespace Jppc.WebApp.Services.Items
{
    public interface IArticleService
    {
        Task AcceptAsync(Guid id);

        Task CreateAsync(Guid id, string name, string description, IFormFile file, decimal price, string language);

        Task DeleteAsync(Guid id);

        Task IncrementHitsAsync(Guid id);

        Task<ArticleDto> ReadAsync(Guid id);

        Task<IEnumerable<ArticleDto>> SearchAsync(string queryText);

        Task UpdateAsync(Guid id, string name, string description, IFormFile file, decimal price, string language);

        Task<byte[]> DownloadAsync(Guid id);

        Task<IEnumerable<ArticleDto>> GetPendingArticlesAsync();
    }
}
