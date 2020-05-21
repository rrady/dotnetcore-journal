using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nest;
using Jppc.Core.Domain;

namespace Jppc.Infrastructure.ElasticSearch.Repository
{
    public class ElasticRepository<TEntity> : IElasticRepository<TEntity> where TEntity : class, IIdentifiable
    {
        private readonly IElasticClient _elasticClient;

        public ElasticRepository(IElasticClient elasticClient)
        {
            _elasticClient = elasticClient;
        }

        public async Task AddAsync(TEntity entity)
        {
            await _elasticClient.IndexDocumentAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _elasticClient.DeleteAsync<TEntity>(id);
        }

        public async Task<List<TEntity>> SearchAsync(string queryText)
        {
            var result = await _elasticClient
                .SearchAsync<TEntity>(
                    s =>
                        s.From(0)
                        .Size(10)
                        .Query(q =>
                            q.QueryString(mm =>
                                mm.Query(queryText)
                                .Type(TextQueryType.BestFields)
                                .Fuzziness(Fuzziness.Auto)
                            )
                        )
                 );

            return result.Documents.ToList();
        }
    }
}
