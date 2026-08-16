using MediatR;
using Trippoma.Application.Common.Interfaces;
using Trippoma.Application.Favorites.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Trippoma.Application.Favorites.Queries.GetUserFavorites;

public class GetUserFavoritesQueryHandler : IRequestHandler<GetUserFavoritesQuery, List<FavoritePlaceDto>>
{
    private readonly IAppDbContext _context;
    private readonly ICurrentUserService _currentUser;

    public GetUserFavoritesQueryHandler(IAppDbContext context, ICurrentUserService currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<List<FavoritePlaceDto>> Handle(GetUserFavoritesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Favorites
            .Where(f => f.UserId == _currentUser.UserId)
            .OrderByDescending(f => f.CreatedAt)
            .Select(f => new FavoritePlaceDto
            {
                PlaceId = f.PlaceId,
                Name = f.Place.Name,
                City = f.Place.City,
                MainImageUrl = f.Place.Images
                    .Where(i => i.IsMain)
                    .Select(i => i.ImageUrl)
                    .FirstOrDefault(),
                CreatedAt = f.CreatedAt
            })
            .ToListAsync(cancellationToken);
    }
}