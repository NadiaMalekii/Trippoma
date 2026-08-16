namespace Trippoma.Application.Places.DTOs;

public class PlaceImageDto
{
    public Guid Id { get; set; }
    public string ImageUrl { get; set; } = default!;
    public bool IsMain { get; set; }
    public int SortOrder { get; set; }
}
