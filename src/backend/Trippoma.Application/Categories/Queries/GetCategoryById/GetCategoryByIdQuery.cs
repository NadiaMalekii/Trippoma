using MediatR;
using Trippoma.Application.Categories.DTOs;

namespace Trippoma.Application.Categories.Queries.GetCategoryById;

public record GetCategoryByIdQuery(Guid Id) : IRequest<CategoryDto>;