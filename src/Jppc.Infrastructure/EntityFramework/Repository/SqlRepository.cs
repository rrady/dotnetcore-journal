using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Jppc.Core.Domain;
using Jppc.Infrastructure.Pagination;

namespace Jppc.Infrastructure.EntityFramework.Repository
{
    public class SqlRepository<TEntity> : ISqlRepository<TEntity> where TEntity : class, IIdentifiable
    {
        private readonly JppcDbContext _dbContext;

        public SqlRepository(JppcDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<TEntity> GetAsync(Guid id)
            => await GetAsync(e => e.Id == id);

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate)
            => await _dbContext.Set<TEntity>().Where(predicate).SingleOrDefaultAsync();

        public async Task AddAsync(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(TEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await GetAsync(id);
            _dbContext.Set<TEntity>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate)
            => await _dbContext.Set<TEntity>().AnyAsync(predicate);

        public async Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate)
            => await _dbContext.Set<TEntity>().Where(predicate).ToListAsync();

        public PagedResult<TEntity> Browse<TQuery>(Expression<Func<TEntity, bool>> predicate, TQuery query) where TQuery : PagedQueryBase
            => _dbContext.Set<TEntity>().Where(predicate).Paginate(query);
    }
}
