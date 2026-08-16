using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Trippoma.Domain.Entities;

namespace Trippoma.Infrastructure.Persistence.Configurations;

public class PlaceImageConfiguration : IEntityTypeConfiguration<PlaceImage>
{
    public void Configure(EntityTypeBuilder<PlaceImage> builder)
    {
        builder.HasKey(pi => pi.Id);
        builder.Property(pi => pi.ImageUrl).IsRequired();

        builder.HasOne(pi => pi.Place)
            .WithMany(p => p.Images)
            .HasForeignKey(pi => pi.PlaceId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}