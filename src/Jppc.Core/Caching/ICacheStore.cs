using System.Threading.Tasks;

namespace Jppc.Core.Caching
{
    public interface ICacheStore
    {
        Task AddAsync<TItem>(ICacheKey cachekey, TItem item);

        Task AddStringAsync(ICacheKey cachekey, string item);

        Task<TItem> GetAsync<TItem>(ICacheKey cachekey) where TItem : class;

        Task<string> GetStringAsync(ICacheKey cachekey);

        Task RemoveAsync(ICacheKey cacheKey);
    }
}
