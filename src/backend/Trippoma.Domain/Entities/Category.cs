using Trippoma.Domain.Common;

namespace Trippoma.Domain.Entities;

public class Category : AuditableEntity
{
    public required string Name { get; set; }
    public string? IconUrl { get; set; }
    public string? Description { get; set; }
    public ICollection<Place> Places { get; set; } = new List<Place>();
}