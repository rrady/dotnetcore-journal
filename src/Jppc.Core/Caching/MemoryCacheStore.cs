using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Jppc.Core.Caching
{
    public class MemoryCacheStore : ICacheStore
    {
        private readonly IDistributedCache _cache;
        private readonly IOptions<CacheOptions> _cacheOptions;

        public MemoryCacheStore(IDistributedCache cache, IOptions<CacheOptions> cacheOptions)
        {
            _cache = cache;
            _cacheOptions = cacheOptions;
        }

        public async Task AddAsync<TItem>(ICacheKey cachekey, TItem item)
        {
            if (item == null)
                return;

            string itemJson = JsonConvert.SerializeObject(item);
            await this.AddStringAsync(cachekey, itemJson);
        }

        public async Task AddStringAsync(ICacheKey cachekey, string item)
        {
            if (string.IsNullOrEmpty(item))
                return;

            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow =
                            TimeSpan.FromMinutes(_cacheOptions.Value.ExpiryMinutes)
            };

            await this._cache.SetStringAsync(cachekey.Key, item, options);
        }

        public async Task<TItem> GetAsync<TItem>(ICacheKey cachekey) where TItem : class
        {
            string itemJson = await this.GetStringAsync(cachekey);
            if (string.IsNullOrEmpty(itemJson))
            {
                return null;
            }

            return JsonConvert.DeserializeObject<TItem>(itemJson);
        }

        public async Task<string> GetStringAsync(ICacheKey cachekey)
        {
            string item = await this._cache.GetStringAsync(cachekey.Key);
            if (string.IsNullOrEmpty(item))
            {
                return string.Empty;
            }

            return item;
        }

        public async Task RemoveAsync(ICacheKey cacheKey)
        {
            await this._cache.RemoveAsync(cacheKey.Key);
        }
    }
}
