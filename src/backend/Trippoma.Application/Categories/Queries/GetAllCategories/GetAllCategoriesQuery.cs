using MediatR;
using Trippoma.Application.Categories.DTOs;

namespace Trippoma.Application.Categories.Queries.GetAllCategories;

public record GetAllCategoriesQuery : IRequest<List<CategoryDto>>;