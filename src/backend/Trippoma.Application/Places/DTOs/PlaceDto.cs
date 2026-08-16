namespace Trippoma.Application.Places.DTOs;

public class PlaceDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string City { get; set; } = default!;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = default!;
    public List<PlaceImageDto> Images { get; set; } = new();
}
