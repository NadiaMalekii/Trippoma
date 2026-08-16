using MediatR;
using Microsoft.EntityFrameworkCore;
using Trippoma.Application.Common.Interfaces;
using Trippoma.Application.Common.NotFoundException;
using Trippoma.Application.Places.DTOs;
using Trippoma.Domain.Entities;

namespace Trippoma.Application.Places.Queries.GetPlaceById;

public class GetPlaceByIdQueryHandler : IRequestHandler<GetPlaceByIdQuery, PlaceDto>
{
    private readonly IAppDbContext _context;

    public GetPlaceByIdQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<PlaceDto> Handle(GetPlaceByIdQuery request, CancellationToken cancellationToken)
    {
        var place = await _context.Places
                   .Where(p => p.Id == request.Id)
                   .Select(p => new PlaceDto
                   {
                       Id = p.Id,
                       Name = p.Name,
                       Description = p.Description,
                       City = p.City,
                       Latitude = p.Latitude,
                       Longitude = p.Longitude,
                       CategoryId = p.CategoryId,
                       CategoryName = p.Category.Name,
                       Images = p.Images
                           .OrderByDescending(i => i.IsMain)
                           .ThenBy(i => i.SortOrder)
                           .Select(i => new PlaceImageDto
                           {
                               Id = i.Id,
                               ImageUrl = i.ImageUrl,
                               IsMain = i.IsMain,
                               SortOrder = i.SortOrder
                           })
                           .ToList()
                   })
                   .FirstOrDefaultAsync(cancellationToken);

        if (place is null)
            throw new NotFoundException(nameof(Place), request.Id);

        return place;
    }
}