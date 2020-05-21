using System;
using System.Collections.Generic;
using System.Text;

namespace Jppc.Core.Caching.CacheKeys
{
    public class TokenCacheKey : ICacheKey
    {
        public string Key { get; private set; }

        public TokenCacheKey(string key) => Key = key;
    }
}
