using MediatR;
using Trippoma.Application.Common.Exceptions;
using Trippoma.Application.Common.Interfaces;
using Trippoma.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Trippoma.Application.Favorites.Commands.AddFavorite;

public class AddFavoriteCommandHandler : IRequestHandler<AddFavoriteCommand>
{
    private readonly IAppDbContext _context;
    private readonly ICurrentUserService _currentUser;

    public AddFavoriteCommandHandler(IAppDbContext context, ICurrentUserService currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task Handle(AddFavoriteCommand request, CancellationToken cancellationToken)
    {
        var placeExists = await _context.Places
            .AnyAsync(p => p.Id == request.PlaceId, cancellationToken);

        if (!placeExists)
            throw new NotFoundException(nameof(Place), request.PlaceId);

        var alreadyFavorited = await _context.Favorites
            .AnyAsync(f => f.UserId == _currentUser.UserId && f.PlaceId == request.PlaceId, cancellationToken);

        if (alreadyFavorited)
            throw new ConflictException("This place is already in your favorites.");

        var favorite = new Favorite
        {
            UserId = _currentUser.UserId,
            PlaceId = request.PlaceId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Favorites.Add(favorite);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
