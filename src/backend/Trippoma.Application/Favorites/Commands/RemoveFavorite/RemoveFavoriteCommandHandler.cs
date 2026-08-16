using MediatR;
using Trippoma.Application.Common.Exceptions;
using Trippoma.Application.Common.Interfaces;
using Trippoma.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Trippoma.Application.Favorites.Commands.RemoveFavorite;

public class RemoveFavoriteCommandHandler : IRequestHandler<RemoveFavoriteCommand>
{
    private readonly IAppDbContext _context;
    private readonly ICurrentUserService _currentUser;

    public RemoveFavoriteCommandHandler(IAppDbContext context, ICurrentUserService currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task Handle(RemoveFavoriteCommand request, CancellationToken cancellationToken)
    {
        var favorite = await _context.Favorites
            .FirstOrDefaultAsync(f => f.UserId == _currentUser.UserId && f.PlaceId == request.PlaceId, cancellationToken);

        if (favorite is null)
            throw new NotFoundException(nameof(Favorite), request.PlaceId);

        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync(cancellationToken);
    }
}