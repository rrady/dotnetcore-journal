using Jppc.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Jppc.Infrastructure.EntityFramework.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(p => p.Id).HasAggregateIdConversion();
            builder.Property(p => p.Email).IsRequired();
            builder.HasIndex(p => p.Email).IsUnique();
        }
    }
}
