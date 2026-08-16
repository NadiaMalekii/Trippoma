using Trippoma.Domain.Common;

namespace Trippoma.Domain.Entities;

public class Review : AuditableEntity
{
    public int Rating { get; set; }        
    public string? Comment { get; set; }
    public Guid UserId { get; set; }
    public required User User { get; set; }
    public Guid PlaceId { get; set; }
    public required Place Place { get; set; }
}
