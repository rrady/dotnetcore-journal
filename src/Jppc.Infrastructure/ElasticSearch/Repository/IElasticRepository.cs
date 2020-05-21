using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Jppc.Core.Domain;

namespace Jppc.Infrastructure.ElasticSearch.Repository
{
    public interface IElasticRepository<TEntity> where TEntity : IIdentifiable
    {
        Task AddAsync(TEntity entity);

        Task DeleteAsync(Guid id);

        Task<List<TEntity>> SearchAsync(string queryText);
    }
}
