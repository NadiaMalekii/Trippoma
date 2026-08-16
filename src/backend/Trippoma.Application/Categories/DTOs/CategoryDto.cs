namespace Trippoma.Application.Categories.DTOs;

public class CategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string? IconUrl { get; set; }
    public string? Description { get; set; }
}
