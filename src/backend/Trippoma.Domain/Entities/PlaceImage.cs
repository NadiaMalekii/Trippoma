using Trippoma.Domain.Common;

namespace Trippoma.Domain.Entities;

public class PlaceImage : BaseEntity
{
    public required string ImageUrl { get; set; }
    public bool IsMain { get; set; } = false;
    public int SortOrder { get; set; }
    public Guid PlaceId { get; set; }
    public required Place Place { get; set; }
}
