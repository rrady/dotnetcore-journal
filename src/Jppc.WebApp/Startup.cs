using System;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using Jppc.Core.Authentication;
using Jppc.Core.Caching;
using Jppc.Core.Mvc;
using Jppc.Core.Domain.Entities;
using Jppc.Infrastructure.EntityFramework;
using Jppc.Infrastructure.ElasticSearch;
using Jppc.Infrastructure.PayPal;
using Jppc.WebApp.Dto;

namespace Jppc.WebApp
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public IContainer Container { get; private set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper();
            services.AddCacheStore();
            services.AddSqlContext();
            services.AddElasticSearch();
            services.AddPayPal();
            services.AddCustomMvc();
            services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(option =>
            {
                option.MultipartBodyLengthLimit = 209715200;
            });
            services.AddJwt();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            var builder = new ContainerBuilder();
            builder.RegisterAssemblyTypes(Assembly.GetEntryAssembly())
                .AsImplementedInterfaces();
            builder.Populate(services);
            builder.RegisterType<PasswordHasher<User>>().As<IPasswordHasher<User>>();
            builder.AddSqlRepository<User>();
            builder.AddSqlRepository<RefreshToken>();
            builder.AddSqlRepository<Article>();
            builder.AddSqlRepository<Payment>();
            builder.AddElasticRepository<ArticleDto>();
            Container = builder.Build();

            return new AutofacServiceProvider(Container);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseErrorHandler();
            app.UseAuthentication();
            app.UseAccessTokenValidator();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseMvc();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "build");
                }
            });
        }
    }
}
