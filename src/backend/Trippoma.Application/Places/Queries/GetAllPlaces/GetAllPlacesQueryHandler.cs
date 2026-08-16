using MediatR;
using Microsoft.EntityFrameworkCore;
using Trippoma.Application.Common.Interfaces;
using Trippoma.Application.Places.DTOs;

namespace Trippoma.Application.Places.Queries.GetAllPlaces;

public class GetAllPlacesQueryHandler : IRequestHandler<GetAllPlacesQuery, List<PlaceDto>>
{
    private readonly IAppDbContext _context;

    public GetAllPlacesQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PlaceDto>> Handle(GetAllPlacesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Places.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
            query = query.Where(p => p.Name.Contains(request.Search));

        if (!string.IsNullOrWhiteSpace(request.City))
            query = query.Where(p => p.City == request.City);

        if (request.CategoryId.HasValue)
            query = query.Where(p => p.CategoryId == request.CategoryId.Value);

        return await query
            .OrderBy(p => p.Name)
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
            .ToListAsync(cancellationToken);
    }
}
