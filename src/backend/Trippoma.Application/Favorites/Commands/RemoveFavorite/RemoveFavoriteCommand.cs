using MediatR;

namespace Trippoma.Application.Favorites.Commands.RemoveFavorite;

public record RemoveFavoriteCommand(Guid PlaceId) : IRequest;