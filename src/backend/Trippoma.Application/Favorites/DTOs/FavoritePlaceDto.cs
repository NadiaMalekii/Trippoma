namespace Trippoma.Application.Favorites.DTOs;

public class FavoritePlaceDto
{
    public Guid PlaceId { get; set; }
    public string Name { get; set; } = default!;
    public string City { get; set; } = default!;
    public string? MainImageUrl { get; set; }
    public DateTime CreatedAt { get; set; }
}
