using MediatR;
using Trippoma.Application.Categories.DTOs;
using Trippoma.Application.Common.Interfaces;
using Trippoma.Application.Common.NotFoundException;
using Trippoma.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Trippoma.Application.Categories.Queries.GetCategoryById;

public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, CategoryDto>
{
    private readonly IAppDbContext _context;

    public GetCategoryByIdQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<CategoryDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
    {
        var category = await _context.Categories
            .Where(c => c.Id == request.Id)
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                IconUrl = c.IconUrl,
                Description = c.Description
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (category is null)
            throw new NotFoundException(nameof(Category), request.Id);

        return category;
    }
}

