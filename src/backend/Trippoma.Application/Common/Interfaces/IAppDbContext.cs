using Microsoft.EntityFrameworkCore;
using Trippoma.Domain.Entities;

namespace Trippoma.Application.Common.Interfaces;

public interface IAppDbContext
{
    DbSet<User> Users { get; }
    DbSet<Category> Categories { get; }
    DbSet<Place> Places { get; }
    DbSet<PlaceImage> PlaceImages { get; }
    DbSet<Favorite> Favorites { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}