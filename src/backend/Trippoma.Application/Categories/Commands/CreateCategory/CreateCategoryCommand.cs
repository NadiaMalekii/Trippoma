using MediatR;

namespace Trippoma.Application.Categories.Commands.CreateCategory;

public record CreateCategoryCommand(string Name, string? IconUrl, string? Description) : IRequest<Guid>;