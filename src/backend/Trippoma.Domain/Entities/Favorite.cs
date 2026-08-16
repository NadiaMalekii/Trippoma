using Trippoma.Domain.Common;

namespace Trippoma.Domain.Entities;

public class Favorite : BaseEntity
{
    public Guid UserId { get; set; }
    public required User User { get; set; }
    public Guid PlaceId { get; set; }
    public required Place Place { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
