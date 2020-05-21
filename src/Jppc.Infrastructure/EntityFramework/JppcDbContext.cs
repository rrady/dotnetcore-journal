using Microsoft.EntityFrameworkCore;
using Jppc.Core.Domain.Entities;

namespace Jppc.Infrastructure.EntityFramework
{
    public class JppcDbContext : DbContext
    {
        public JppcDbContext(DbContextOptions<JppcDbContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
