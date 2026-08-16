using MediatR;
using Trippoma.Application.Favorites.DTOs;

namespace Trippoma.Application.Favorites.Queries.GetUserFavorites;

public record GetUserFavoritesQuery : IRequest<List<FavoritePlaceDto>>;