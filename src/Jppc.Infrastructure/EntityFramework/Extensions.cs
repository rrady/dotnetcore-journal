using System;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Autofac;
using Jppc.Core;
using Jppc.Core.Domain;
using Jppc.Infrastructure.EntityFramework.Repository;

namespace Jppc.Infrastructure.EntityFramework
{
    public static class Extensions
    {
        private static readonly string SectionName = "sql";

        public static void AddSqlContext(this IServiceCollection services)
        {
            IConfiguration configuration;
            using (var serviceProvider = services.BuildServiceProvider())
            {
                configuration = serviceProvider.GetService<IConfiguration>();
            }
            var section = configuration.GetSection(SectionName);
            var options = configuration.GetOptions<SqlOptions>(SectionName);
            services.Configure<SqlOptions>(section);
            services.AddSingleton(options);
            services.AddDbContext<JppcDbContext>(optionsAction => optionsAction.UseSqlServer(options.ConnectionString));
        }

        public static void AddSqlRepository<TEntity>(this ContainerBuilder builder) where TEntity : class, IIdentifiable
            => builder.RegisterType<SqlRepository<TEntity>>()
                .As<ISqlRepository<TEntity>>()
                .InstancePerLifetimeScope();

        public static PropertyBuilder<T> HasAggregateIdConversion<T>(this PropertyBuilder<T> builder)
            => builder.HasConversion(new AggregateIdValueConverter());

        private class AggregateIdValueConverter : ValueConverter<AggregateId, Guid>
        {
            public AggregateIdValueConverter() : this(p => p.Value, p => new AggregateId(p))
            {
            }

            private AggregateIdValueConverter(Expression<Func<AggregateId, Guid>> convertToProviderExpression,
                Expression<Func<Guid, AggregateId>> convertFromProviderExpression,
                ConverterMappingHints mappingHints = null) :
                base(convertToProviderExpression, convertFromProviderExpression, mappingHints)
            {
            }
        }
    }
}
