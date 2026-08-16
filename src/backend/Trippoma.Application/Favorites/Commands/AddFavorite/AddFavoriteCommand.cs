using MediatR;

namespace Trippoma.Application.Favorites.Commands.AddFavorite;

public record AddFavoriteCommand(Guid PlaceId) : IRequest;