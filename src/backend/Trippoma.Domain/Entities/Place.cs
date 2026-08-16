using Trippoma.Domain.Common;

namespace Trippoma.Domain.Entities;

public class Place : AuditableEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string City { get; set; }          
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public Guid CategoryId { get; set; }
    public required Category Category { get; set; }
    public double AverageRating { get; set; } = 0;
    public int ReviewsCount { get; set; } = 0;
    public ICollection<PlaceImage> Images { get; set; } = new List<PlaceImage>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
}