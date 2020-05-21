using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Jppc.Core.Caching
{
    public static class Extensions
    {
        private static readonly string SectionName = "cache";

        public static void AddCacheStore(this IServiceCollection services)
        {
            IConfiguration configuration;
            using (var serviceProvider = services.BuildServiceProvider())
            {
                configuration = serviceProvider.GetService<IConfiguration>();
            }
            var section = configuration.GetSection(SectionName);
            var options = configuration.GetOptions<CacheOptions>(SectionName);
            services.Configure<CacheOptions>(section);
            services.AddSingleton(options);
            services.AddDistributedMemoryCache();
            services.AddSingleton<ICacheStore, MemoryCacheStore>();
        }
    }
}
