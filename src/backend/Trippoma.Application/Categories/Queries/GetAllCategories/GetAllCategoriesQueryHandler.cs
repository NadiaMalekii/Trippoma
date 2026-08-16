using MediatR;
using Trippoma.Application.Categories.DTOs;
using Trippoma.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Trippoma.Application.Categories.Queries.GetAllCategories;
public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, List<CategoryDto>>
{
    private readonly IAppDbContext _context;

    public GetAllCategoriesQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryDto>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _context.Categories.ToListAsync(cancellationToken);

        return categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
            IconUrl = c.IconUrl,
            Description = c.Description
        }).ToList();
    }
}