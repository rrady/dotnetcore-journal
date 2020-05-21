using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Jppc.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Jppc.Infrastructure.EntityFramework.Configurations
{
    public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            throw new NotImplementedException();
        }
    }
}
