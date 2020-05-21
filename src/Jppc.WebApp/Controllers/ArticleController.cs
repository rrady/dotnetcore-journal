using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Jppc.Core.Authentication;
using Jppc.Core.Domain.Entities;
using Jppc.Core.Mvc;
using Jppc.WebApp.Models;
using Jppc.WebApp.Dto;
using Jppc.WebApp.Services.Items;

namespace Jppc.WebApp.Controllers
{
    [Route("api/article")]
    [ApiController]
    public class ArticleController : BaseController
    {
        private readonly IArticleService _articleService;
        
        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [JwtAuth]
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ArticleModel model)
        {
            model.BindId(m => m.Id);

            await _articleService.CreateAsync(model.Id, model.Name, model.Description, model.File, model.Price, model.Language);

            return NoContent();
        }

        [JwtAuth]
        [HttpGet]
        public async Task<IActionResult> Read()
        {
            var articles = await _articleService.SearchAsync("*");

            return Ok(articles);
        }

        [JwtAuth]
        [HttpPut]
        public async Task<IActionResult> Update([FromForm] ArticleModel model)
        {
            await _articleService.UpdateAsync(model.Id, model.Name, model.Description, model.File, model.Price, model.Language);

            return NoContent();
        }

        [JwtAuth]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            await _articleService.DeleteAsync(id);

            return NoContent();
        }

        [JwtAuth]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var article = await _articleService.ReadAsync(id);

            return Ok(article);
        }

        [JwtAuth]
        [HttpPost("search")]
        public async Task<IActionResult> Search([FromBody] SearchQueryModel model)
        {
            var articles = await _articleService.SearchAsync(model.QueryText);

            return Ok(articles);
        }

        [JwtAuth]
        [HttpPost("{id}/accept")]
        public async Task<IActionResult> Accept([FromRoute] Guid id)
        {
            await _articleService.AcceptAsync(id);

            return NoContent();
        }

        [JwtAuth]
        [HttpPost("{id}/hits")]
        public async Task<IActionResult> IncrementHits([FromRoute] Guid id)
        {
           await _articleService.IncrementHitsAsync(id);

            return NoContent();
        }

        [JwtAuth]
        [HttpGet("{id}/download")]
        public async Task<IActionResult> Download([FromRoute] Guid id)
        {
            var content = await _articleService.DownloadAsync(id);

            return Ok(content);
        }

        [JwtAuth]
        [HttpGet("pending")]
        public async Task<IActionResult> GetAllPending()
        {
            var articles = await _articleService.GetPendingArticlesAsync();

            return Ok(articles);
        }
    }
}
