using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Jppc.Core;
using Jppc.Infrastructure.PayPal.Client;

namespace Jppc.Infrastructure.PayPal
{
    public static class Extensions
    {
        private static readonly string SectionName = "PayPal";

        public static void AddPayPal(this IServiceCollection services)
        {
            IConfiguration configuration;
            using (var serviceProvider = services.BuildServiceProvider())
            {
                configuration = serviceProvider.GetService<IConfiguration>();
            }
            var section = configuration.GetSection(SectionName);
            var options = configuration.GetOptions<PayPalOptions>(SectionName);
            services.Configure<PayPalOptions>(section);
            services.AddSingleton(options);

            services.AddSingleton(typeof(IPayPalClient),
                service => PayPalClientFactory.Create(Enum.Parse<Mode>(options.Mode), options.ClientId, options.ClientSecret));
        }
    }
}
