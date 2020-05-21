using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Autofac;
using Nest;
using Jppc.Core;
using Jppc.Core.Domain;
using Jppc.Infrastructure.ElasticSearch.Repository;

namespace Jppc.Infrastructure.ElasticSearch
{
    public static class Extensions
    {
        private static readonly string SectionName = "ElasticSearch";

        public static void AddElasticSearch(this IServiceCollection services)
        {
            IConfiguration configuration;
            using (var serviceProvider = services.BuildServiceProvider())
            {
                configuration = serviceProvider.GetService<IConfiguration>();
            }
            var section = configuration.GetSection(SectionName);
            var options = configuration.GetOptions<ElasticSearchOptions>(SectionName);
            services.Configure<ElasticSearchOptions>(section);
            services.AddSingleton(options);

            services.AddSingleton(typeof(IElasticClient), service => CreateElasticClient(options));
        }

        public static void AddElasticRepository<TEntity>(this ContainerBuilder builder) where TEntity : class, IIdentifiable
            => builder.RegisterType<ElasticRepository<TEntity>>()
                .As<IElasticRepository<TEntity>>()
                .InstancePerLifetimeScope();

        private static ElasticClient CreateElasticClient(ElasticSearchOptions options)
        {
            var settings = new ConnectionSettings(new Uri(options.ConnectionString))
                .DefaultIndex(options.IndexName);

            var client = new ElasticClient(settings);
            return client;
        }
    }
}
